export default class ApiError extends Error {
    statusCode: number;
    name: string;
  
    constructor(name: string, statusCode: number, message: string) {
      super(message);
      this.name = name;
      this.statusCode = statusCode;
    }
  }