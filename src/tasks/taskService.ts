import { spawn } from "child_process";
import { TaskResult } from "./task";


export class TaskService {
  public async runScript(scriptName: string): Promise<TaskResult> {
    return await this.runPythonScript(scriptName);
  }

  private runPythonScript(scriptName: string): Promise<TaskResult> {
    return new Promise((resolve, reject) => {
      let result: any;

      const python = spawn('python3', [`./src/tasks/scripts/${scriptName}.py`]);

      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        result = data.toString();
      });

      python.on('error', (err) => {
        console.log(err);
        reject(err)
      })
  
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        resolve({ result: result })
      });
    })
    
  }
}