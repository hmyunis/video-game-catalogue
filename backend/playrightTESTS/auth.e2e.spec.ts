import { test, expect, chromium } from '@playwright/test';

test('should create a new User', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name=username]', 'Beleir121');
  await page.fill('input[name=password]', 'LASTstanding');
  await page.fill('input[name=Confirmpassword]', 'LASTstanding');
  await page.click('button[type=submit]');

  await page.waitForResponse((response) => response.status() === 201);
});
test('should create a new User', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/signup');

  await page.fill('input[name=username]', 'Beleir121');
  await page.fill('input[name=password]', 'LASTstanding');
  await page.fill('input[name=Confirmpassword]', 'LAng');
  await page.click('button[type=submit]');

  await page.waitForResponse((response) => response.status() === 400);
});

test('should create a new User', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:3000/signin');

  await page.fill('input[name=username]', 'Beleir121');
  await page.fill('input[name=password]', 'LASTsta');
  await page.fill('input[name=Confirmpassword]', '');
  await page.click('button[type=submit]');

  await page.waitForResponse((response) => response.status() === 400);
});
