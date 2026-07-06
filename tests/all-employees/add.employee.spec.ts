import { test, expect } from '@playwright/test';
import { EmployeePage } from '../../pages/employee.page';
import { generateEmployeeData } from '../../utils/test-data';

test.describe('Employee Module - CRUD Operations', () => {

  // ============================================
  // TC_EMP_001: Navigate to All Employees Grid View
  // ============================================
  test('TC_EMP_001: Navigate to All Employees Grid View', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.verifyOnEmployeesPage();
    await expect(page.getByRole('heading', { name: 'All Employees' })).toBeVisible();
  });

  // ============================================
  // TC_EMP_002: Add Employee as Draft from Grid View
  // ============================================
  test('TC_EMP_002: Add Employee as Draft from Grid View', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const { firstName, lastName, email } = generateEmployeeData('John');

    await employeePage.navigateToAllEmployees();
    await employeePage.openAddEmployeeForm();
    await employeePage.fillRequiredFields(firstName, lastName, email);
    await employeePage.saveAsDraft();

    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employees');
    await employeePage.switchToListView();
    await employeePage.draftEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.searchEmployee(email);
    await employeePage.verifyEmployeeInList(firstName, email);
  });

  // ============================================
  // TC_EMP_003: Add Employee with Save & Invite from Grid View
  // ============================================
  test('TC_EMP_003: Add Employee with Save & Invite from Grid View', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const { firstName, lastName, email } = generateEmployeeData('Mary');

    await employeePage.navigateToAllEmployees();
    await employeePage.openAddEmployeeForm();
    await employeePage.fillRequiredFields(firstName, lastName, email);
    await employeePage.saveAndInvite();

    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employees');
    await employeePage.switchToListView();
    await employeePage.allEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.searchEmployee(email);
    await employeePage.verifyEmployeeInList(firstName, email);
  });

  // ============================================
  // TC_EMP_004: Add Employee with missing required fields
  // ============================================
  test('TC_EMP_004: Add Employee with missing required fields', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.openAddEmployeeForm();
    await employeePage.saveAndInvite();

    // Should stay on Add Employee page - not navigate away
    await employeePage.verifyOnAddEmployeePage();
  });

  // ============================================
  // TC_EMP_005: Cancel Add Employee returns to list
  // ============================================
  test('TC_EMP_005: Cancel Add Employee returns to list', async ({ page }) => {
    const employeePage = new EmployeePage(page);

    await employeePage.navigateToAllEmployees();
    await employeePage.openAddEmployeeForm();
    await employeePage.cancel();

    await employeePage.verifyOnEmployeesPage();
  });

  // ============================================
  // TC_EMP_006: Add Employee as Draft from List View
  // ============================================
  test('TC_EMP_006: Add Employee as Draft from List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const { firstName, lastName, email } = generateEmployeeData('John');

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();
    await employeePage.openAddEmployeeForm();
    await employeePage.fillRequiredFields(firstName, lastName, email);
    await employeePage.saveAsDraft();

    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employee/employee-list-view');
    await employeePage.draftEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.searchEmployee(email);
    await employeePage.verifyEmployeeInList(firstName, email);
  });

  // ============================================
  // TC_EMP_007: Add Employee with Save & Invite from List View
  // ============================================
  test('TC_EMP_007: Add Employee with Save & Invite from List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const { firstName, lastName, email } = generateEmployeeData('Mary');

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();
    await employeePage.openAddEmployeeForm();
    await employeePage.fillRequiredFields(firstName, lastName, email);
    await employeePage.saveAndInvite();

    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employee/employee-list-view');
    await employeePage.allEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.searchEmployee(email);
    await employeePage.verifyEmployeeInList(firstName, email);
  });

  // ============================================
  // TC_EMP_008: Add Employee with all fields from List View
  // ============================================
  test('TC_EMP_008: Add Employee with all fields from List View', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const { firstName, lastName, email } = generateEmployeeData('Mary');
    const timestamp = Date.now();

    await employeePage.navigateToAllEmployees();
    await employeePage.switchToListView();
    await employeePage.openAddEmployeeForm();

    await employeePage.fillAllFields(firstName, lastName, email, {
      userGroup: 'Manager',
      dobMonth: '1',
      dobYear: '2002',
      dobDay: 'Tuesday, February 12th,',
      empNumber: `EMP${timestamp}`,
      candidateNumber: `CAN${timestamp}`,
      phone: '0112345678',
      mobile: '0712345678',
      extNumber: '101',
      description: 'Test employee description',
      qualification: 'Bachelor of Science',
      requiresRenewal: true,
      renewalDueDate: {
        month: '1',                             
        year: '2042',
        day: 'Thursday, February 13th,',        
  },
      skill: 'Communication',
      careerInterest: 'Aspiring to grow in leadership roles',
    });

    await employeePage.saveAndInvite();

    await expect(page).toHaveURL('https://test-astec-yca-v2.ycalabs.com/employee/employee-list-view');
    await employeePage.allEmployeesTab().click();
    await page.waitForLoadState('networkidle');

    await employeePage.searchEmployee(email);
    await employeePage.verifyEmployeeInList(firstName, email);
  });

});