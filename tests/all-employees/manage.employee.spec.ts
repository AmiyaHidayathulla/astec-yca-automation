import { test, expect } from '@playwright/test';

test.describe('Employee Module', () => {

  test('TC_EMP_001: Navigate to All Employees page', async ({ page }) => {
    await page.goto('/home');

    // Click Employee in the sidebar
    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();

    // Verify URL changed to employee page
    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employees');

    // Verify page heading
    await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
  });

  test('TC_EMP_002: All Employees list is visible', async ({ page }) => {
    await page.goto('/home');

    // Click Employee in sidebar
    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();

    // Verify List View button is visible
    await expect(page.getByRole('button', { name: 'List View' })).toBeVisible();

    // Verify Add Employee button is visible
    await expect(page.getByRole('button', { name: 'Add Employee' })).toBeVisible();

    // Verify search controls are visible
    await expect(page.getByPlaceholder('Search')).toBeVisible();
  });

  test('TC_EMP_002: Navigate to list view', async ({ page }) => {
    await page.goto('/home');

    // Click Employee in sidebar
    await page.getByRole('button', { name: 'Employee' }).click();
    await page.getByRole('link', { name: 'All Employees' }).click();
    await page.getByRole('button', { name: 'List View' }).click();

      // Verify URL changed to List view of Employee page
    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employee/employee-list-view');

    // Verify Grid View button is visible
    await expect(page.getByRole('button', { name: 'Grid View' })).toBeVisible();

    // Verify Add Employee button is visible
    await expect(page.getByRole('button', { name: 'Add Employee' })).toBeVisible();

    // Verify search controls are visible
    await expect(page.getByPlaceholder('Search name / email')).toBeVisible();
  });

  

});