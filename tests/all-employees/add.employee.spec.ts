import { test, expect } from '@playwright/test';

test.describe('Employee Module - CRUD Operations', () => {

  // ============================================
  // NAVIGATE TO ALL EMPLOYEES
  // ============================================
  test('TC_EMP_001: Navigate to All Employees List View', async ({ page }) => {
    await page.goto('/home');
    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await expect(page).toHaveURL(/.*employees.*/);
    await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
  });

  // ============================================
  // ADD EMPLOYEE - SAVE AS DRAFT (from List View)
  // ============================================
  test('TC_EMP_002: Add Employee as Draft from List View', async ({ page }) => {
    await page.goto('/home');

    // Navigate to All Employees
   await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await page.waitForLoadState('networkidle');

    // Click Add Employee button
    await page.getByRole('button', { name: 'Add Employee' }).click();

    // Verify Add New Employee page
    await expect(page.getByRole('heading', { name: 'Add New Employee' })).toBeVisible();


  // Generate unique data for every test run
const timestamp = Date.now();
const firstName = `John${timestamp}`;
const lastName = `TestDraft${timestamp}`;
const email = `john.test${timestamp}@ycalabs.com`;

// Fill required fields
await page.locator('#field-firstName').getByTestId('input-input').fill(firstName);
await page.locator('#field-lastName').getByTestId('input-input').fill(lastName);
await page.locator('input[type="email"]').fill(email);

// Select Department dropdown
await page.locator('#field-department').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();

// Select Position dropdown
await page.locator('#field-position').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();

// Select Location dropdown
await page.locator('#field-location').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();

    // Click Save as Draft
    await page.getByRole('button', { name: 'Save as draft' }).click();
    await page.waitForLoadState('networkidle');

//     // Navigate to Draft Employees tab and verify
//    await page.getByRole('button', { name: 'Employee' }).click();
//     await page.getByRole('link', { name: 'All Employees' }).click();
//     await page.waitForLoadState('networkidle');

    // Click Draft Employees tab
    await page.getByRole('button', { name: 'List View' }).click();
    await page.getByRole('button', { name: /Draft Employees/ }).click();
    await page.waitForLoadState('networkidle');

    // Verify the draft employee appears in the list
    
    await page.getByPlaceholder('Search name / email').fill(email);
    await page.waitForLoadState('networkidle');

// Then verify
await expect(page.getByText(firstName)).toBeVisible();
await expect(page.getByText(email)).toBeVisible();
  });

  // ============================================
  // ADD EMPLOYEE - SAVE & INVITE (from List View)
  // ============================================
  test('TC_EMP_003: Add Employee with Save & Invite from List View', async ({ page }) => {
    await page.goto('/home');

    // Navigate to All Employees
    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await page.waitForLoadState('networkidle');

    // Click Add Employee button
    await page.getByRole('button', { name: 'Add Employee' }).click();

    // Verify Add New Employee page
    await expect(page.getByRole('heading', { name: 'Add New Employee' })).toBeVisible();

    // Generate unique data for every test run
const timestamp = Date.now();
const firstName = `Mary${timestamp}`;
const lastName = `TestDraft${timestamp}`;
const email = `mary.test${timestamp}@ycalabs.com`;

// Fill required fields
await page.locator('#field-firstName').getByTestId('input-input').fill(firstName);
await page.locator('#field-lastName').getByTestId('input-input').fill(lastName);
await page.locator('input[type="email"]').fill(email);

// Select Department dropdown
await page.locator('#field-department').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();

// Select Position dropdown
await page.locator('#field-position').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();

// Select Location dropdown
await page.locator('#field-location').getByTestId('popover-popover-primitive.trigger').click();
await page.getByRole('option').first().click();
    // Click Save & Invite
    await page.getByRole('button', { name: 'Save & Invite' }).click();
    await page.waitForLoadState('networkidle');

    // // Navigate back to All Employees
    // await page.getByRole('link', { name: 'Employee' }).click();
    // await page.getByRole('link', { name: 'All Employees' }).click();
    // await page.waitForLoadState('networkidle');

    // Click All Employees tab
    await page.getByRole('button', { name: 'List View' }).click();
    await page.getByRole('button', { name: /All Employees/ }).click();
    await page.waitForLoadState('networkidle');

    // Verify employee appears in All Employees list
    await page.getByPlaceholder('Search name / email').fill(email);
await page.waitForLoadState('networkidle');

// Then verify
await expect(page.getByText(firstName)).toBeVisible();
await expect(page.getByText(email)).toBeVisible();
  });



  // ============================================
  // NEGATIVE - Add Employee with missing fields
  // ============================================
  test('TC_EMP_006: Add Employee with missing required fields', async ({ page }) => {
    await page.goto('/home');

    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Add Employee' }).click();

    // Click Save without filling anything
    await page.getByRole('button', { name: 'Save & Invite' }).click();

    // Should stay on Add Employee page - not navigate away
    await expect(page.getByRole('heading', { name: 'Add New Employee' })).toBeVisible();
  });

  // ============================================
  // CANCEL Add Employee
  // ============================================
  test('TC_EMP_007: Cancel Add Employee returns to list', async ({ page }) => {
    await page.goto('/home');

    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Add Employee' }).click();

    // Fill some data
    await page.locator('#field-firstName').getByTestId('input-input').fill('Cancel');
    await page.locator('#field-lastName').getByTestId('input-input').fill('Test');

    // Click Cancel
    await page.getByRole('button', { name: 'Cancel' }).click();

    // Should return to employees list
    await expect(page).toHaveURL(/.*employees.*/);
  });

});