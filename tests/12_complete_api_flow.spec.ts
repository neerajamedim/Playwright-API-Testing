import { test, expect } from '@playwright/test';
import tokenrequest from '../test-data/token-requestbody.json';
import bookingDetails from '../test-data/booking-details.json';
 
const BASE_URL = 'https://restful-booker.herokuapp.com';
 
let token: string;
let bookingId: number;
 
test.describe.serial('Restful Booker API Flow', () => {
 
  /* -------------------- GENERATE TOKEN -------------------- */
  test('Generate Token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth`, {
      data: tokenrequest
    });
 
    expect(response.status()).toBe(200);
 
    const body = await response.json();
    token = body.token;
 
    console.log('Token:', token);
  });
 
  /* -------------------- CREATE BOOKING -------------------- */
  test('Create Booking', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: bookingDetails
    });
 
    expect(response.status()).toBe(200);
 
    const body = await response.json();
    bookingId = body.bookingid;
 
    console.log('Booking ID:', bookingId);
  });
 
  /* -------------------- GET ALL BOOKINGS -------------------- */
  test('Get All Bookings', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`);
    expect(response.status()).toBe(200);
 
    console.log(await response.json());
  });
 
  /* -------------------- GET BOOKING BY ID -------------------- */
  test('Get Booking By ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(response.status()).toBe(200);
 
    console.log(await response.json());
  });
 
  /* -------------------- GET BOOKING BY QUERY -------------------- */
  test('Get Booking By Firstname & Lastname', async ({ request }) => {
    const response = await request.get(
      `${BASE_URL}/booking?firstname=Neeraja&lastname=Medim`
    );
 
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
 
  /* -------------------- UPDATE BOOKING (PUT) -------------------- */
  test('Update Booking using PUT', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: '2023-06-01',
          checkout: '2023-06-15'
        },
        additionalneeds: 'Breakfast'
      }
    });
 
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
 
  /* -------------------- PARTIAL UPDATE (PATCH) -------------------- */
  test('Update Booking using PATCH', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'Sim',
        lastname: 'Son',
        totalprice: 333,
        depositpaid: false
      }
    });
 
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });
 
  /* -------------------- DELETE BOOKING -------------------- */
  test('Delete Booking', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      }
    });
 
    expect(response.status()).toBe(201);
  });
 
});