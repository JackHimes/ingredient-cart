provider "aws" {
  region = "us-east-1"
}

# Elastic Container Repo
resource "aws_ecr_repository" "ingredient-cart" {
  name = "ingredient-cart"
}


resource "aws_ecr_lifecycle_policy" "ingredient-cart-policy" {
  repository = aws_ecr_repository.ingredient-cart.name

  policy = jsonencode(
    {
      "rules" : [
        {
          "rulePriority" : 1,
          "description" : "Expire oldest images when image count > 3",
          "selection" : {
            "tagStatus" : "any",
            "countType" : "imageCountMoreThan",
            "countNumber" : 3
          },
          "action" : {
            "type" : "expire"
          }
        }
      ]
  })
}

# Elastic Container Service Cluster
resource "aws_ecs_cluster" "ingredient-cart-cluster" {
  name = "ingredient-cart-cluster"
}

resource "aws_ecs_service" "ingredient-cart-prod" {
  name            = "ingredient-cart-prod"
  cluster         = aws_ecs_cluster.ingredient-cart-cluster.id
  task_definition = aws_ecs_task_definition.ingredient-cart-prod.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets = [
      aws_default_subnet.default_subnet_a.id,
      aws_default_subnet.default_subnet_b.id,
      aws_default_subnet.default_subnet_c.id
    ]
    assign_public_ip = true
    security_groups  = [aws_security_group.service_security_group.id]
  }

  force_new_deployment = true

  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name   = aws_ecs_task_definition.ingredient-cart-prod.family
    container_port   = 3333
  }
}

resource "aws_security_group" "service_security_group" {
  name   = "ecs-security-group"
  vpc_id = aws_default_vpc.default_vpc.id
  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
    security_groups = [aws_security_group.load_balancer_security_group.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_task_definition" "ingredient-cart-prod" {
  family = "ingredient-cart-prod"
  container_definitions = jsonencode(
    [{
      "name"      = "ingredient-cart-prod",
      "image"     = "${aws_ecr_repository.ingredient-cart.repository_url}",
      "memory"    = 512,
      "cpu"       = 256
      "essential" = true,
      "portMappings" = [
        {
          "containerPort" = 3333,
          "hostPort"      = 3333,
          "protocol"      = "tcp"
        }
      ],
      "logConfiguration" = {
        "logDriver" = "awslogs",
        "options" = {
          "awslogs-group"         = "${var.cloudwatch_group}",
          "awslogs-region"        = "us-east-1",
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }]
  )
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_cloudwatch_log_group" "ingredient-cart-logs" {
  name = var.cloudwatch_group

  tags = {
    Environment = "production"
    Application = "ingredient-cartApi"
  }
}

resource "aws_cloudwatch_log_stream" "ingredient-cart-logs" {
  name           = "ingredient-cart-logs"
  log_group_name = aws_cloudwatch_log_group.ingredient-cart-logs.name
}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "us-east-1a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "us-east-1b"
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = "us-east-1c"
}

resource "aws_alb" "application_load_balancer" {
  name               = "prod-load-balancer"
  load_balancer_type = "application"
  subnets            = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}", "${aws_default_subnet.default_subnet_c.id}"]
  security_groups    = ["${aws_security_group.load_balancer_security_group.id}"]
}

resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb_target_group" "target_group" {
  name        = "target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
  health_check {
    matcher = "200,301,302"
    path    = "/ping"
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

variable "cloudwatch_group" {
  description = "CloudWatch group name."
  type        = string
  default     = "ingredient-cart-logs"
}
