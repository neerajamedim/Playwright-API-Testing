import { test, expect } from '@playwright/test';
import bookingDetails from '../test-data/booking-details.json';

//testcase 2
test('should be able to create a booking', async ({ request }) => {
    const response = await request.post('/booking', {
        data: bookingDetails // Using external JSON data
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json()
    expect(responseBody.booking).toHaveProperty("firstname", "Jim");
    expect(responseBody.booking).toHaveProperty("lastname", "Brown");
    expect(responseBody.booking).toHaveProperty("totalprice", 111);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
});
