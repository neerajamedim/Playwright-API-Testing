import { test, request } from '@playwright/test';

test.describe('Understanding request.newContext', () => {

  test('Basic usage of request.newContext', async () => {
    // Create a new API request context
    const context = await request.newContext();

    // Make a GET request to a public API
    const response = await context.get('https://jsonplaceholder.typicode.com/posts/1');

    // Assert the response status
    test.expect(response.status()).toBe(200);

    // Get the response body as JSON
    const data = await response.json();
    console.log('Response data:', data);

    // Assert some data
    test.expect(data.id).toBe(1);
    test.expect(data.title).toBeDefined();

    // Close the context
    await context.dispose();
  });

  test('Using newContext with options', async () => {
    // Create a new context with custom options
    const context = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Authorization': 'Bearer your-token-here', // Example header
        'User-Agent': 'Playwright-API-Test'
      },
      timeout: 10000, // 10 seconds timeout
      ignoreHTTPSErrors: false // Set to true if testing with self-signed certificates
    });

    // Make a request using the baseURL
    const response = await context.get('/posts/1'); // Full URL: https://jsonplaceholder.typicode.com/posts/1

    test.expect(response.status()).toBe(200);

    const data = await response.json();
    test.expect(data.id).toBe(1);

    // Close the context
    await context.dispose();
  });

  test('Making different types of requests', async () => {
    const context = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
          'User-Agent': 'Playwright-API-Test',
          'Accept': 'application/json'
      }
    
    });

    // GET request
    const getResponse = await context.get('/posts/1');
    test.expect(getResponse.status()).toBe(200);

    // POST request
    const postResponse = await context.post('/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    });
    test.expect(postResponse.status()).toBe(201);

    const newPost = await postResponse.json();
    console.log('Created post:', newPost);

    // PUT request to update
    const putResponse = await context.put(`/posts/${newPost.id}`, {
      data: {
        id: newPost.id,
        title: 'updated title',
        body: 'updated body',
        userId: 1
      }
    });
    test.expect(putResponse.status()).toBe(200);

    // DELETE request
    const deleteResponse = await context.delete(`/posts/${newPost.id}`);
    test.expect(deleteResponse.status()).toBe(200);

    await context.dispose();
  });

  test('Handling cookies and storage state', async () => {
    const context = await request.newContext({
      extraHTTPHeaders: {
        'Cookie': 'sessionId=abc123'
      }
    });

    // Make a request (custom headers/cookies will be sent)
    const response = await context.get('https://jsonplaceholder.typicode.com/posts/1');
    test.expect(response.status()).toBe(200);

    console.log('Request made with custom headers');

    await context.dispose();
  });

});
