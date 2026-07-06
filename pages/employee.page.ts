import { Page, expect } from '@playwright/test';

export class EmployeePage {
  constructor(private page: Page) {}

  // ============================================
  // Locators - Navigation
  // ============================================
  employeeMenuButton = () => this.page.getByRole('button', { name: 'Employee', exact: true });
  allEmployeesLink = () => this.page.getByRole('link', { name: 'All Employees' });
  addEmployeeButton = () => this.page.getByRole('button', { name: 'Add Employee' });
  listViewButton = () => this.page.getByRole('button', { name: 'List View' });
  gridViewButton = () => this.page.getByRole('button', { name: 'Grid View' });

  // ============================================
  // Locators - Tabs
  // ============================================
  allEmployeesTab = () => this.page.getByRole('button', { name: /All Employees/ });
  draftEmployeesTab = () => this.page.getByRole('button', { name: /Draft Employees/ });

  // ============================================
  // Locators - Required Form Fields
  // ============================================
  firstNameInput = () => this.page.locator('#field-firstName').getByTestId('input-input');
  lastNameInput = () => this.page.locator('#field-lastName').getByTestId('input-input');
  emailInput = () => this.page.locator('input[type="email"]');
  departmentDropdown = () => this.page.locator('#field-department').getByTestId('popover-popover-primitive.trigger');
  positionDropdown = () => this.page.locator('#field-position').getByTestId('popover-popover-primitive.trigger');
  locationDropdown = () => this.page.locator('#field-location').getByTestId('popover-popover-primitive.trigger');

  // ============================================
  // Locators - Optional Form Fields
  // ============================================
  userGroupDropdown = () => this.page.locator('#field-userGroup').getByTestId('popover-popover-primitive.trigger');
  dateOfBirth = () => this.page.getByTestId('custom-date-picker-input');
  dobMonthSelect = () => this.page.getByLabel('Choose the Month');    
  dobYearSelect = () => this.page.getByLabel('Choose the Year');      
  empNumber = () => this.page.getByTestId('input-input').nth(3);
  candidateNumber = () => this.page.getByTestId('input-input').nth(4);
  phoneNumber = () => this.page.locator('input[inputmode="numeric"]').nth(0);   
  mobileNumber = () => this.page.locator('input[inputmode="numeric"]').nth(1);  
  extNumber = () => this.page.locator('input[inputmode="numeric"]').nth(2);     
  empDescription = () => this.page.getByTestId('textarea-textarea').first();
  qualification = () => this.page.getByRole('textbox', { name: 'Enter qualification' });
  renewalCheckbox = () => this.page.getByTestId('checkbox-input');
  renewalDatePickerTrigger = () => this.page.getByRole('textbox', { name: 'Select course date' });
  renewalMonthSelect = () => this.page.getByLabel('Choose the Month');
  renewalYearSelect = () => this.page.getByLabel('Choose the Year');
  addSkill = () => this.page.getByRole('textbox', { name: 'Enter skill' });
  profilePicture = () => this.page.getByRole('button', { name: 'Change Profile Picture' });
  cv = () => this.page.getByTestId('image-upload-crop-img');
  careerInterest = () => this.page.getByTestId('textarea-textarea').nth(1);

  // ============================================
  // Locators - Search & Buttons
  // ============================================
  searchInput = () => this.page.getByPlaceholder('Search name / email');
  saveAsDraftButton = () => this.page.getByRole('button', { name: 'Save as draft' });
  saveAndInviteButton = () => this.page.getByRole('button', { name: 'Save & Invite' });
  cancelButton = () => this.page.getByRole('button', { name: 'Cancel' });

  // ============================================
  // Actions - Navigation
  // ============================================
  async navigateToAllEmployees() {
    await this.page.goto('/home');
    await this.employeeMenuButton().click();
    await this.allEmployeesLink().click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchToListView() {
    await this.listViewButton().click();
    await this.page.waitForLoadState('networkidle');
  }

  async switchToGridView() {
    await this.gridViewButton().click();
    await this.page.waitForLoadState('networkidle');
  }

  async openAddEmployeeForm() {
    await this.addEmployeeButton().click();
    await expect(this.page.getByRole('heading', { name: 'Add New Employee' })).toBeVisible();
  }

  // ============================================
  // Actions - Form Filling
  // ============================================
  async fillRequiredFields(firstName: string, lastName: string, email: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.emailInput().fill(email);
    await this.departmentDropdown().click();
    await this.page.getByRole('option').first().click();
    await this.positionDropdown().click();
    await this.page.getByRole('option').first().click();
    await this.locationDropdown().click();
    await this.page.getByRole('option').first().click();
  }

  async selectDateOfBirth(month: string, year: string, dayLabel: string) {  
    await this.dateOfBirth().click();
    await this.dobMonthSelect().selectOption(month);
    await this.dobYearSelect().selectOption(year);
    await this.page.getByRole('button', { name: dayLabel }).click();
  }

  async selectRenewalDueDate(month: string, year: string, dayLabel: string) {
  await this.renewalDatePickerTrigger().click();
  await this.renewalMonthSelect().selectOption(month);
  await this.renewalYearSelect().selectOption(year);
  await this.page.getByRole('button', { name: dayLabel }).click();
}

  async fillAllFields(   
    firstName: string,
    lastName: string,
    email: string,
    options: {
      userGroup?: string;
      dobMonth?: string;
      dobYear?: string;
      dobDay?: string;
      empNumber?: string;
      candidateNumber?: string;
      phone?: string;
      mobile?: string;
      extNumber?: string;
      description?: string;
      qualification?: string;
      requiresRenewal?: boolean;
      renewalDueDate?: {
      month: string;
      year: string;
      day: string;
};
      skill?: string;
      careerInterest?: string;
    } = {}
  ) {
    await this.fillRequiredFields(firstName, lastName, email);

    if (options.userGroup) {
      await this.userGroupDropdown().click();
      await this.page.getByText(options.userGroup).click();
    }
    if (options.dobMonth && options.dobYear && options.dobDay) {
      await this.selectDateOfBirth(options.dobMonth, options.dobYear, options.dobDay);
    }
    if (options.empNumber) {
      await this.empNumber().fill(options.empNumber);
    }
    if (options.candidateNumber) {
      await this.candidateNumber().fill(options.candidateNumber);
    }
    if (options.phone) {
      await this.phoneNumber().fill(options.phone);
    }
    if (options.mobile) {
      await this.mobileNumber().fill(options.mobile);
    }
    if (options.extNumber) {
      await this.extNumber().fill(options.extNumber);
    }
    if (options.description) {
      await this.empDescription().fill(options.description);
    }
    if (options.qualification) {
      await this.qualification().fill(options.qualification);
      await this.page.getByRole('heading', { name: 'Add New Employee' }).click();
      await this.page.waitForLoadState('domcontentloaded');
    }
    if (options.requiresRenewal) {
  await this.renewalCheckbox().check();
  if (options.renewalDueDate) {
    await this.selectRenewalDueDate(
      options.renewalDueDate.month,
      options.renewalDueDate.year,
      options.renewalDueDate.day
    );
  }
}
    if (options.skill) {
      await this.addSkill().fill(options.skill);
    }
    if (options.careerInterest) {
      await this.careerInterest().fill(options.careerInterest);
    }
  }

  // ============================================
  // Actions - Save/Cancel
  // ============================================
  async saveAsDraft() {
    await this.saveAsDraftButton().click();
    await this.page.waitForLoadState('networkidle');
  }

  async saveAndInvite() {
    await this.saveAndInviteButton().click();
    await this.page.waitForLoadState('networkidle');
  }

  async cancel() {
    await this.cancelButton().click();
  }

  // ============================================
  // Actions - Verification
  // ============================================
  async searchEmployee(email: string) {
    await this.searchInput().fill(email);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyEmployeeInList(firstName: string, email: string) {
    await expect(this.page.getByText(firstName)).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async verifyOnEmployeesPage() {
    await expect(this.page).toHaveURL(/.*employees.*/);
  }

  async verifyOnAddEmployeePage() { // 
    await expect(this.page.getByRole('heading', { name: 'Add New Employee' })).toBeVisible();
  }
}