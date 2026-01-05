import { test, expect } from '@playwright/test';

test('should be get specific booking details', async ({ request }) => {
    const response = await request.get('/booking/1410');
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});
