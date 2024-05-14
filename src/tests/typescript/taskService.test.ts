// taskService.test.ts

import { expect } from 'chai';
import { TaskService } from '../../tasks/taskService';

describe('TaskService', () => {
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
  });

  it('should return the correct welcome message', () => {
    const message = taskService.getTestMessage();
    expect(message).to.equal("Testing TaskService");
  });
});
