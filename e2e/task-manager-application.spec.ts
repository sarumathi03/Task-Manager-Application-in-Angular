import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

  test('Login Successful with Valid Credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('saru');
    await page.getByTestId('password-input').fill('saru01');
    await page.getByTestId('submit-button').click();
    await expect(page).toHaveURL(/\/home/);
  });

  test('Error message for Invalid Credentials', async ({ page }) => {
    await page.getByTestId('username-input').fill('saru');
    await page.getByTestId('password-input').fill('saru12');
    await page.getByTestId('submit-button').click();
    await expect(page.getByTestId('error-message')).toBeVisible();
  });

});

test.describe('Task Manager Testcase (Authenticated)', () => {
  test.use({ storageState: 'auth.json' });

  test('Create a new task successfully', async ({ page }) => {
    await page.goto('http://localhost:4200/home/createtask');

    await page.getByTestId('title_input').fill('Playwright Task');
    await page.getByTestId('duedate_input').fill('2025-08-15');
    await page.getByTestId('description_input').fill('Automated test task using Playwright');
    await page.getByTestId('priority_input').selectOption('high');
    await page.getByTestId('reminder_check').check();
    await page.getByTestId('submit_button').click();
    await expect(page).toHaveURL(/\/home\/tasklist/);
    
  });

  test('Edit a task', async ({ page }) => {
  
  await page.goto('http://localhost:4200/home/edit/1'); 

  await page.getByTestId('title_input').fill('Updated Task Title');
  await page.getByTestId('duedate_input').fill('2025-08-20');
  await page.getByTestId('description_input').fill('Updated task description.');
  await page.getByTestId('priority_input').selectOption('medium');
  const reminder = await page.getByTestId('reminder_check');
  const isChecked = await reminder.isChecked();
  if (!isChecked) {
    await reminder.check();
  }
  await page.getByTestId('submit_button').click();
  await expect(page).toHaveURL(/\/home\/tasklist/);
  await expect(page.getByText('Task updated successfully!')).toBeVisible();
});


  test('Delete a task', async ({ page }) => {
  await page.goto('http://localhost:4200/home/tasklist');
  await page.getByTestId('delete_icon').first().click(); 
});

});