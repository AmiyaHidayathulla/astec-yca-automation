import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/employee.page';

test.describe('Employee Module - Navigation', () => {

  // ============================================
  // TC_EMP_001: Navigate to All Employees page
  // ============================================
  test('TC_EMP_001: Navigate to All Employees page', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();

    // Verify URL
    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employees');

    // Verify page heading
    await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
  });

  // ============================================
  // TC_EMP_002: All Employees Grid View controls are visible
  // ============================================
  test('TC_EMP_002: All Employees Grid View controls are visible', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();

    // Verify List View button is visible
    await expect(employeePage.listViewButton()).toBeVisible();

    // Verify Add Employee button is visible
    await expect(employeePage.addEmployeeButton()).toBeVisible();

    // Verify search controls are visible
    await expect(page.getByPlaceholder('Search')).toBeVisible();
  });

  // ============================================
  // TC_EMP_003: Navigate to List View
  // ============================================
  test('TC_EMP_003: Navigate to List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    // Verify URL changed to List View
    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employee/employee-list-view');

    // Verify Grid View button is visible
    await expect(employeePage.gridViewButton()).toBeVisible();

    // Verify Add Employee button is visible
    await expect(employeePage.addEmployeeButton()).toBeVisible();

    // Verify search controls are visible
    await expect(employeePage.searchInput()).toBeVisible();
  });

});