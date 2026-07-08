import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/employee.page';

test.describe('Employee List View Operations', () => {

  // ============================================
  // TC_LST_001: Navigate to List View
  // ============================================
  test('TC_LST_001: Navigate to List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await expect(page).toHaveURL(/.*employee-list-view.*/);
    await expect(page.getByRole('heading', { name: 'Employee List View' })).toBeVisible();
  });

  // ============================================
  // TC_LST_002: All Employees tab shows employees
  // ============================================
  test('TC_LST_002: All Employees tab shows employees', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();
    await employeePage.allEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.verifyEmployeeCountGreaterThan(0);
  });

  // ============================================
  // TC_LST_003: Search employee by name
  // ============================================
  test('TC_LST_003: Search employee by name', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await employeePage.searchByName('Mary');
    await employeePage.verifySearchResults('mary');
  });

  // ============================================
  // TC_LST_004: Search employee by email
  // ============================================
  test('TC_LST_004: Search employee by email', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await employeePage.searchByName('mary.test');
    await employeePage.verifySearchResults('mary.test');
  });

  // ============================================
  // TC_LST_005: Search with no results
  // ============================================
  test('TC_LST_005: Search with no matching results', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await employeePage.searchByName('XYZNOTFOUND123');
    await page.waitForLoadState('networkidle');

    // Verify no employees shown
    const count = await employeePage.getEmployeeCount();
    expect(count).toBe(0);
  });

  // ============================================
  // TC_LST_006: Filter by Department
  // ============================================
  test('TC_LST_006: Filter employees by Department', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await employeePage.filterByDepartment('Accounting');

    await employeePage.verifyEmployeeCountGreaterThan(0);
  });

  // ============================================
  // TC_LST_007: Filter by User Group
  // ============================================
  test('TC_LST_007: Filter employees by User Group', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    await employeePage.filterByUserGroup('Employee');

    await employeePage.verifyEmployeeCountGreaterThan(0);
  });

  // ============================================
  // TC_LST_008: View Employee details
  // ============================================
  test('TC_LST_008: View Employee details from list', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    // Click view on first employee (row index 1 - skipping header)
    await employeePage.clickViewEmployee(0);

    // Verify navigated to employee detail page
    await expect(page).toHaveURL(/.*employee.*/);
  });

  // ============================================
  // TC_LST_009: Edit Employee from list
  // ============================================
  test('TC_LST_009: Edit Employee from list', async ({ page }) => {
  const employeePage = new EmployeePage(page);

  await employeePage.navigateToAllEmployees();
  await employeePage.switchToListView();

  await employeePage.clickEditEmployee(0);
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/.*edit-employee.*/);
  await expect(page.getByText('EDIT EMPLOYEE')).toBeVisible();
});

  // ============================================
  // TC_LST_010: Draft Employees tab
  // ============================================
  test('TC_LST_010: Draft Employees tab shows draft employees', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();
    await employeePage.draftEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.verifyEmployeeCountGreaterThan(0);
  });

  // ============================================
  // TC_LST_011: Switch between tabs
  // ============================================
  test('TC_LST_011: Switch between All Employees and Draft tabs', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    // Go to Draft tab
    await employeePage.draftEmployeesTab().click();
    await page.waitForLoadState('networkidle');
    await expect(employeePage.draftEmployeesTab()).toBeVisible();

    // Switch back to All Employees tab
    await employeePage.allEmployeesTab().click();
    await page.waitForLoadState('networkidle');
    await expect(employeePage.allEmployeesTab()).toBeVisible();
  });

  // ============================================
  // TC_LST_012: Switch to Grid View from List View
  // ============================================
  test('TC_LST_012: Switch to Grid View from List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();

    // Switch back to Grid View
    await employeePage.switchToGridView();

    await expect(page).toHaveURL(/.*employees.*/);
    await expect(employeePage.listViewButton()).toBeVisible();
  });

});