import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { TaskResult } from "./task";


export class TaskService {
  public spawn: typeof spawn = spawn;

  public getTestMessage(): string {
    return "Testing TaskService";
  }

  public async runScript(scriptName: string, recipeUrl?: string): Promise<TaskResult> {
    try {
      const result = await this.runPythonScript(scriptName, recipeUrl);
      return { result };
    } catch (error) {
      console.error('Script execution failed:', error);
      return { result: null };
    }
  }

  private runPythonScript(scriptName: string, recipeUrl?: string): Promise<TaskResult> {
    return new Promise((resolve, reject) => {
      const args = [`./src/tasks/scripts/${scriptName}.py`, recipeUrl].filter(Boolean) as string[];
      const python: ChildProcessWithoutNullStreams = this.spawn('python3', args);
      let rawData = '';

      python.stdout.on('data', (data: Buffer) => {
        console.log('Receiving data from python script...');
        rawData += data.toString();  // Accumulate data in rawData
      });

      python.stderr.on('data', (data: Buffer) => {
        console.error('Error from python script:', data.toString());
      });

      python.on('error', (err: Error) => {
        console.error('Failed to start python script:', err);
        reject(err);
      });

      python.on('close', (code: number) => {
        console.log(`Python script closed with code ${code}`);
        if (rawData) {
          try {
            const result = JSON.parse(rawData);
            resolve(result);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            reject(error);
          }
        } else {
          reject(new Error('No data received from Python script'));
        }
      });
    })
    
  }
}