import { test, expect } from '@playwright/test';
import { config } from '../config/env.config';

test('User appears in UI after creation', async ({ page, request }) => {
  // Step 1: Create user via API
  await request.post('/users', {
    data: {
      name: 'Neeraja',
      role: 'QA'
    }
  });
  // Step 2: Open UI
  await page.goto(config.baseURL);
  // Step 3: Verify user in UI
  await expect(page.getByText('Neeraja')).toBeVisible();
});

//Case 2: Check server state AFTER UI actions
//Example: Place order via UI, verify via API
test('Order is saved in backend', async ({ page, request }) => {

  // UI action
  await page.goto('/shop');
  await page.click('#placeOrder');

  // Backend validation
  const response = await request.get('/orders/latest');
  const order = await response.json();

  expect(order.status).toBe('PLACED');
});
