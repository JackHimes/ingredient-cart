import { expect } from 'chai';
import { TaskService } from '../../tasks/taskService';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('TaskService', () => {
  let taskService: TaskService;
  let mock: MockAdapter;

  beforeEach(() => {
    taskService = new TaskService();
    mock = new MockAdapter(axios); 
  });

  afterEach(() => {
    mock.restore();  
  });

  it('should return the correct welcome message', () => {
    const message = taskService.getTestMessage();
    expect(message).to.equal('Testing TaskService');
  });

  it('should call scrape_recipe endpoint with GET request', async () => {
    const mockRecipeUrl = 'https://www.101cookbooks.com/nicoise-salad/';
    mock.onGet(`http://0.0.0.0:8000/tasks/scrape_recipe?recipeUrl=${encodeURIComponent(mockRecipeUrl)}`)
        .reply(200, { title: 'Nicoise Salad', ingredients: ['Tuna', 'Potatoes'] });

    const result = await taskService.runScript('scrape_recipe', mockRecipeUrl);

    expect(result.result).to.deep.equal({ title: 'Nicoise Salad', ingredients: ['Tuna', 'Potatoes'] });
  });

  it('should call process endpoint with POST request', async () => {
    const mockText = 'Add 2 cups of chopped onions and 1 teaspoon of salt.';
    mock.onPost('http://0.0.0.0:8000/process', { text: mockText })
        .reply(200, { entities: [{ text: '2 cups', label: 'Quantity' }, { text: 'onions', label: 'Ingredient' }] });

    const result = await taskService.runScript('parse_ingredient', mockText);

    expect(result.result).to.deep.equal({
      entities: [{ text: '2 cups', label: 'Quantity' }, { text: 'onions', label: 'Ingredient' }]
    });
  });

  it('should throw an error for unknown script', async () => {
    try {
      await taskService.runScript('unknown_script');
    } catch (error) {
      expect((error as Error).message).to.equal('Unknown script name');
    }
  });
});