# Authentication Assignment

A simple responsive authentication flow built with Next.js, TypeScript, and SCSS Modules.

## 🚀 Features

- **Authentication Flow**: Complete login/logout functionality
- **Form Validation**: Schema-based validation using Zod
- **Responsive Design**: Mobile-first approach with SCSS Modules
- **Type Safety**: Full TypeScript implementation
- **Reusable Components**: Custom Input and Button components
- **State Management**: Context API for authentication state + localStorage persistence
- **Server Redirects**: Server components verify a signed cookie to redirect without flicker

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
- **Server Redirects**: ✅ Cookie-verified redirects on `/`, `/auth`, `/dashboard`

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
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
│       ├── login/route.ts      # Login: fetch random user + set signed cookie
│       └── logout/route.ts     # Logout: clear signed cookie
├── auth/
│   ├── page.tsx                # Server wrapper: redirects if already authed
│   └── pageClient.tsx          # Client UI: login form + validation
├── dashboard/
│   ├── page.tsx                # Server wrapper: protects route by cookie
│   └── pageClient.tsx          # Client UI: renders user from localStorage/context
├── components/
│   ├── Input.tsx               # Reusable input component
│   ├── Button.tsx              # Reusable button component
│   └── Loading.tsx             # Loading component
├── constants/
│   ├── api.ts                  # API configuration constants
│   └── routes.ts               # Route constants
├── hooks/
│   ├── useAuth.tsx             # Authentication context
│   ├── useAuthActions.ts       # Authentication business logic (login/logout)
│   └── useRouteProtection.ts   # (Legacy) client guard, still used in UI where needed
├── i18n/
│   ├── useTranslation.ts       # Translation hook
│   └── TranslationProvider.tsx # Translation context
├── locales/
│   └── en.ts                   # English text content
├── services/
│   └── authService.ts          # API service layer
├── styles/
│   ├── Auth.module.scss        # Login page styles
│   ├── Button.module.scss      # Button component styles
│   ├── Dashboard.module.scss   # Dashboard page styles
│   ├── Input.module.scss       # Input component styles
│   └── Loading.module.scss     # Loading component styles
├── types/
│   └── index.ts                # TypeScript interfaces
├── utils/
│   ├── api.ts                  # HTTP request utilities
│   ├── storage.ts              # localStorage utilities (typed)
│   └── authCookie.ts           # Signed cookie utilities for SSR redirects
├── layout.tsx                  # Root layout with providers
└── page.tsx                    # Home: server redirect based on signed cookie
```

## 🔐 Authentication Model

- **LocalStorage (assignment requirement):**
  - The fetched RandomUser is saved in `localStorage` and mirrored in the Auth Context for client rendering.
- **Signed Cookie (SSR redirects):**
  - On successful login, a minimal httpOnly signed cookie (`auth=<value>.<hmac>`) is set by the login route.
  - Server components (`/`, `/auth`, `/dashboard`) verify the signature to allow/deny access and perform redirects without client flicker.
  - On logout, the cookie is cleared by the logout route and local storage is cleared client-side.

This keeps user data in localStorage (as required) while leveraging Next.js server redirects for a smooth UX and preventing forged cookies.

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

## 🔧 Environment Variables

Optional but recommended for cookie signing:

- `AUTH_COOKIE_SECRET` – secret used to sign the auth cookie (HMAC-SHA256)
- `RANDOM_USER_API_URL` – override RandomUser API base (`https://randomuser.me/api`)
- `RANDOM_USER_RESULTS` – results count (default `1`)
- `RANDOM_USER_NATIONALITY` – nationality filter (default `us`)

Create a `.env.local` with:

```env
AUTH_COOKIE_SECRET=your-strong-secret
```

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

## 🔒 Flow Summary

1. `/auth` (server) checks cookie → redirects to `/dashboard` if signed and valid.
2. On submit, login route fetches a user, sets signed cookie; client stores user in localStorage/context; redirect to `/dashboard`.
3. `/dashboard` (server) checks cookie; renders UI client that reads user from localStorage/context.
4. Logout clears localStorage and the signed cookie; redirects to `/auth`.

## 📝 Form Validation

- **Phone Number**: Must be 11 digits starting with "09"
- **Schema-based**: Uses Zod for type-safe validation

## 🎯 Key Components

- **Input**: `forwardRef`, error/helper text, responsive
- **Button**: Variants, sizes, loading state, disabled handling
- **Auth Context**: User state, localStorage persistence, login/logout

## 🏗️ Architecture Notes

- **Service Layer**: `AuthService` encapsulates API calls.
- **Server Redirects**: Use `redirect()` in server components to eliminate flicker.
- **Cookie Security**: Cookies are httpOnly and signed; signature is verified server-side.
