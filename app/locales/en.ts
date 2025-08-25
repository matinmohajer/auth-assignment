export const en = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    refresh: 'Refresh',
    retry: 'Retry',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
  },
  auth: {
    login: {
      title: 'Welcome Back',
      subtitle: 'Please enter your phone number to continue',
      phoneNumber: {
        label: 'Phone Number',
        placeholder: '09XXXXXXXXX',
        helperText: 'Enter your 11-digit Iranian mobile number',
        required: 'Phone number is required',
        invalid: 'Phone number must be 11 digits starting with "09"',
      },
      button: 'Login',
      error: {
        failed: 'Login failed',
        network: 'Network error occurred',
        invalidCredentials: 'Invalid credentials',
      },
    },
    logout: {
      button: 'Logout',
      success: 'Successfully logged out',
    },
    validation: {
      required: 'This field is required',
      invalidFormat: 'Invalid format',
      minLength: 'Minimum {min} characters required',
      maxLength: 'Maximum {max} characters allowed',
    },
  },
  dashboard: {
    title: 'Welcome to the Dashboard',
    welcome: 'Hello {name}! You have successfully logged in to your dashboard.',
    description: 'This is a simple authentication flow demonstration.',
    userInfo: {
      email: 'Email',
      location: 'Location',
      phone: 'Phone',
      age: 'Age',
      gender: 'Gender',
    },
  },
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    help: 'Help',
    about: 'About',
  },
  errors: {
    network: 'Network error occurred',
    server: 'Server error occurred',
    notFound: 'Page not found',
    unauthorized: 'Unauthorized access',
    forbidden: 'Access forbidden',
    timeout: 'Request timeout',
    unknown: 'Unknown error occurred',
  },
  messages: {
    redirecting: 'Redirecting...',
    processing: 'Processing...',
    saving: 'Saving...',
    deleting: 'Deleting...',
    loading: 'Loading...',
  },
} as const;

export type LocaleKey = keyof typeof en;
export type NestedLocaleKey<T> = T extends keyof typeof en
  ? keyof typeof en[T]
  : never;
