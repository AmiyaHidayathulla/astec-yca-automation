export const TestData = {
  baseUrl: 'https://test-astec-yca-v2.ycalabs.com',
  validUser: {
    username: 'emp1811@ycalabs.com',
    password: '12345678',
  },
};

export function generateEmployeeData(prefix: string) {
  const timestamp = Date.now();
  return {
    firstName: `${prefix}${timestamp}`,
    lastName: `TestDraft${timestamp}`,
    email: `${prefix.toLowerCase()}.test${timestamp}@ycalabs.com`,
  };
}