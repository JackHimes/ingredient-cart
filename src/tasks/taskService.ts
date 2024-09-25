import axios from 'axios';
import { TaskResult } from './task';

export class TaskService {
  public getTestMessage(): string {
    return "Testing TaskService";
  }

  // Updated to call the new pyservice-api instead of running Python scripts
  public async runScript(scriptName: string, recipeUrl?: string): Promise<TaskResult> {
    try {
      let result;
      
      if (scriptName === "parse_ingredient") {
        // For parsing ingredients (POST request)
        result = await this.callPyServiceApiPost('/process', { text: recipeUrl });
      } else if (scriptName === "scrape_recipe") {
        // For scraping recipe (GET request with query parameter)
        result = await this.callPyServiceApiGet('/tasks/scrape_recipe', recipeUrl);
      } else {
        throw new Error('Unknown script name');
      }
      
      return { result };
    } catch (error) {
      console.error('API execution failed:', error);
      return { result: null };
    }
  }

  private async callPyServiceApiGet(endpoint: string, recipeUrl?: string): Promise<any> {
    if (!recipeUrl) {
      throw new Error('Recipe URL is required');
    }
    
    const apiUrl = `http://127.0.0.1:5000${endpoint}?recipeUrl=${encodeURIComponent(recipeUrl)}`;
    const response = await axios.get(apiUrl);
    return response.data;
  }

  // Function to handle POST requests (for process/parse_ingredient)
  private async callPyServiceApiPost(endpoint: string, data: any): Promise<any> {
    const apiUrl = `http://127.0.0.1:5000${endpoint}`;
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
}