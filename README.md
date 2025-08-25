# Authentication Assignment

A simple responsive authentication flow built with Next.js, TypeScript, and SCSS Modules.

## 🚀 Features

- **Authentication Flow**: Complete login/logout functionality
- **Form Validation**: Schema-based validation using Zod
- **Responsive Design**: Mobile-first approach with SCSS Modules
- **Type Safety**: Full TypeScript implementation
- **Reusable Components**: Custom Input and Button components
- **State Management**: Context API for authentication state
- **Modern UI**: Beautiful gradients and smooth animations

## 📋 Requirements Met

### ✅ Authentication Pages
- `/auth` → Login page with phone number validation
- `/dashboard` → Dashboard with welcome message and user info

### ✅ Technical Requirements
- **Next.js App Router**: ✅ Implemented
- **TypeScript**: ✅ Full type safety
- **SCSS Modules**: ✅ With proper nesting support
- **Form Validation**: ✅ Zod schema validation
- **Phone Validation**: ✅ Iranian mobile numbers (11 digits starting with "09")
- **API Integration**: ✅ RandomUser.me API
- **State Management**: ✅ Context API + localStorage
- **Responsive Design**: ✅ Mobile-first approach

### ✅ Component Architecture
- **Reusable Components**: ✅ Input and Button components
- **forwardRef**: ✅ Used for controlled inputs
- **React Hooks**: ✅ Custom hooks for business logic
- **TypeScript Safety**: ✅ Proper interfaces and types
- **Scalable Structure**: ✅ Clean architecture with separation of concerns
- **Service Layer**: ✅ API calls abstracted into services
- **Custom Hooks**: ✅ Business logic separated from UI components

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.0 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Form Handling**: React Hook Form + Zod
- **State Management**: React Context API
- **API**: RandomUser.me for user data

## 📁 Project Structure

```
app/
├── api/
│   └── auth/
│       └── login/
│           └── route.ts      # API handler for login
├── auth/
│   ├── page.tsx              # Login page (UI only)
│   └── schemas.ts            # Form validation schemas
├── dashboard/
│   └── page.tsx              # Dashboard page (UI only)
├── components/
│   ├── Input.tsx             # Reusable input component
│   ├── Button.tsx            # Reusable button component
│   └── Loading.tsx           # Loading component
├── constants/
│   ├── api.ts                # API configuration constants
│   └── routes.ts             # Route constants
├── hooks/
│   ├── useAuth.tsx           # Authentication context
│   ├── useAuthActions.ts     # Authentication business logic
│   └── useRouteProtection.ts # Route protection logic
├── i18n/
│   ├── useTranslation.ts     # Translation hook
│   └── TranslationProvider.tsx # Translation context
├── locales/
│   └── en.ts                 # English text content
├── services/
│   └── authService.ts        # API service layer
├── styles/
│   ├── Auth.module.scss      # Login page styles
│   ├── Button.module.scss    # Button component styles
│   ├── Dashboard.module.scss # Dashboard page styles
│   ├── Input.module.scss     # Input component styles
│   └── Loading.module.scss   # Loading component styles
├── types/
│   └── index.ts              # TypeScript interfaces
├── utils/
│   ├── api.ts                # HTTP request utilities
│   └── storage.ts            # localStorage utilities
├── layout.tsx                # Root layout with providers
└── page.tsx                  # Home page with redirects
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Usage

1. **Access the app**: Visit `http://localhost:3000`
2. **Login**: Enter a valid Iranian phone number (format: 09XXXXXXXXX)
3. **Dashboard**: View user information and welcome message
4. **Logout**: Click the logout button to return to login

## 🎨 Design Features

- **Responsive Layout**: Works on all screen sizes
- **Modern UI**: Gradient backgrounds and smooth transitions
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation feedback

## 🔒 Authentication Flow

1. User enters phone number on `/auth`
2. Form validates Iranian mobile number format
3. On submit, fetches random user from RandomUser.me API
4. Stores user data in localStorage and Context
5. Redirects to `/dashboard`
6. Dashboard displays user information
7. Logout clears data and redirects to `/auth`

## 📝 Form Validation

- **Phone Number**: Must be 11 digits starting with "09"
- **Required Fields**: All form fields are required
- **Real-time Feedback**: Immediate validation messages
- **Schema-based**: Uses Zod for type-safe validation

## 🎯 Key Components

### Input Component
- `forwardRef` for controlled inputs
- Error and helper text support
- Responsive design
- TypeScript props interface

### Button Component
- Multiple variants (primary, secondary, outline)
- Different sizes (small, medium, large)
- Loading state with spinner
- Disabled state handling

### Auth Context
- User state management
- localStorage persistence
- Loading states
- Login/logout functions

## 🏗️ Architecture Overview

### **Service Layer** (`/services`)
- **AuthService**: Handles all authentication API calls
- Encapsulates business logic and API communication
- Provides clean interfaces for components

### **Custom Hooks** (`/hooks`)
- **useAuth**: Context provider for authentication state
- **useAuthActions**: Business logic for login/logout actions
- **useRouteProtection**: Route protection and navigation logic

### **Utils** (`/utils`)
- **api.ts**: HTTP request utilities with error handling and retry logic
- **storage.ts**: localStorage abstraction with error handling

### **Constants** (`/constants`)
- **api.ts**: API endpoints and configuration
- **routes.ts**: Route definitions and protection rules

### **Internationalization** (`/i18n`)
- **useTranslation**: Simplified translation hook for English only
- **TranslationProvider**: Context provider for text management
- **locales/en.ts**: Centralized text content for all UI elements

### **Components** (`/components`)
- Pure UI components with no business logic
- Reusable across the application
- Props-driven with proper TypeScript interfaces
- No hardcoded text - all text comes from translation system

## 🔧 Customization

The application is built with scalability in mind:

- **Easy to extend**: Add new pages and components
- **Themeable**: SCSS variables for easy styling changes
- **Type-safe**: Full TypeScript coverage
- **Modular**: Reusable components and hooks

## 📄 License

This project is created for educational purposes as part of an authentication assignment.
