import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('should be able to create a booking with random dates', async ({ request }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const price = faker.number.int({ min: 100, max: 5000 });

  const checkinDate = faker.date.future(); // future date
  const checkoutDate = faker.date.soon({ days: 10, refDate: checkinDate }); // after check-in

  const formatDate = (date: Date) =>date.toISOString().split('T')[0]; // YYYY-MM-DD

  const response = await request.post('/booking', {
    data: {
      firstname: firstName,
      lastname: lastName,
      totalprice: price,
      depositpaid: true,
      bookingdates: {
        checkin: formatDate(checkinDate),
        checkout: formatDate(checkoutDate),
      },
      additionalneeds: 'Breakfast',
    },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  console.log(`Created booking for ${firstName} ${lastName} from ${formatDate(checkinDate)} to ${formatDate(checkoutDate)} with ${responseBody.bookingid}`);
  expect(responseBody.booking.firstname).toBe(firstName);
  expect(responseBody.booking.bookingdates.checkin).toBe(formatDate(checkinDate));
  expect(responseBody.booking.bookingdates.checkout).toBe(formatDate(checkoutDate));
});