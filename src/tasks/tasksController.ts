import { Controller, Get, Path, Query, Route } from "tsoa";
import { TaskService } from "./taskService";
import { TaskResult } from "./task";

@Route("tasks")
export class TasksController extends Controller {
  @Get("{scriptName}")
  public async runScript(
    @Path() scriptName: string,
    @Query() recipeUrl?: string
  ): Promise<TaskResult> {
    return new TaskService().runScript(scriptName, recipeUrl);
  }
}