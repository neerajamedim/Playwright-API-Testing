import { test, expect } from '@playwright/test';

//test case 1
test('should be able to create a booking', async ({ request }) => {
    const response = await request.post('/booking', {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-01",
                "checkout": "2023-06-15"
            },
            "additionalneeds": "Breakfast"
        }
    });
    console.log(await response.json());
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody.bookingid).toEqual(expect.any(Number));
    expect(responseBody.booking.depositpaid).toEqual(expect.any(Boolean));
    expect(responseBody.bookingid).not.toBeNull();
     // Response time should be less than 2 seconds

    console.log(responseBody.bookingid);
    expect(responseBody.booking).toHaveProperty("firstname", "Jim");
    expect(responseBody.booking).toHaveProperty("lastname", "Brown");
    expect(responseBody.booking).toHaveProperty("totalprice", 111);
    expect(responseBody.booking).toHaveProperty("depositpaid", true);
});
