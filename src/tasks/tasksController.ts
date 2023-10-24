import {
  Controller,
  Get,
  Path,
  Route,
} from "tsoa";

import { TaskService } from "./taskService";
import { TaskResult } from "./task";

@Route("tasks")
export class TasksController extends Controller {
  @Get("{scriptName}")
  public async runScript(
    @Path() scriptName: string
  ): Promise<TaskResult> {
    return new TaskService().runScript(scriptName);
  }
}