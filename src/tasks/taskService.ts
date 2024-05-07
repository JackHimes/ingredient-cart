import { spawn } from "child_process";
import { TaskResult } from "./task";


export class TaskService {
  public async runScript(scriptName: string, recipeUrl?: string): Promise<TaskResult> {
    let result: TaskResult
    try {
      result = await this.runPythonScript(scriptName, recipeUrl); 
    } catch (error) {
      result = { result: error }
    }

    return result
  }

  private runPythonScript(scriptName: string, recipeUrl?: string): Promise<TaskResult> {
    return new Promise((resolve, reject) => {
      let result: any;
      
      const args = [`./src/tasks/scripts/${scriptName}.py`, recipeUrl].filter(Boolean) as string[];
      const python = spawn('python3', args);

      python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        result = data.toString().replace(/'/g, '"').replace(/\n/g,'').replace('None', 'null');
      });

      python.on('error', (err) => {
        console.log(err);
        reject(err)
      })
  
      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        if(result){
          try {
            const parsedResult = JSON.parse(result);
            resolve({ result: parsedResult });
          } catch (error) {
            console.error('Error parsing JSON:', error);
            resolve({ result: null });
          }      
        }
      });
    })
    
  }
}