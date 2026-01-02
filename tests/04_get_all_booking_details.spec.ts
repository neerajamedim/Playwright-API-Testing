import { test, expect } from '@playwright/test';

test('should be get all the booking details', async ({ request }) => {
    const startTime = performance.now();
    const response = await request.get('/booking');
    const responseTime = performance.now() - startTime;
    console.log(await response.json());
    console.log(`Response time: ${responseTime}ms`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000); // Response should complete within 2 seconds
});