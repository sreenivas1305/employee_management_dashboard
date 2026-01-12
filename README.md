# Employee Management Dashboard

A modern, responsive Employee Management Dashboard built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Overview

This is a comprehensive Employee Management System that allows users to:
- Authenticate with login credentials
- View and manage employee information
- Add, edit, and delete employees
- Search and filter employees by name, gender, and status
- View dashboard summary with employee statistics
- Print employee lists
- Upload and preview employee profile images

## Tech Stack Used

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage
- **Authentication**: Mock authentication with localStorage

## Features Implemented

### 1. Authentication (Step 1)
- **Login Page**: Clean, modern login interface
- **Basic Authentication**: Email and password validation
- **Mock Login**: Pre-configured demo credentials
- **Session Management**: User data stored in localStorage
- **Protected Routes**: Dashboard access restricted to authenticated users
- **Auto-redirect**: Unauthenticated users redirected to login

**Demo Credentials:**
- Email: `admin@example.com`
- Password: `password123`

### 2. Employee Management Dashboard (Step 2)

#### Dashboard Summary
- **Total Employees Count**: Displays total number of employees
- **Active vs Inactive Count**: Shows count of active and inactive employees (bonus feature)
- **Visual Cards**: Color-coded summary cards with icons

#### Employee List Display
Comprehensive table showing:
- Employee ID
- Profile Image (with preview)
- Full Name
- Gender
- Date of Birth
- Age (calculated from DOB)
- State
- Active/Inactive Status
- Action Buttons (Edit, Delete, Print)

#### Employee Form
Add/Edit employee with:
- Full Name (required)
- Gender dropdown (Male, Female, Other)
- Date of Birth (required)
- Profile Image upload with preview
- State selection dropdown (all 50 US states)
- Active/Inactive toggle
- Form validation
- Image preview before save

#### Search & Filter
- **Search by Name**: Real-time search functionality
- **Filter by Gender**: Dropdown filter for gender
- **Filter by Status**: Filter for Active/Inactive employees
- **Combined Filtering**: Multiple filters work together

#### Actions
- **Add Employee**: Button to add new employees
- **Edit Employee**: Edit existing employee details
- **Delete Employee**: Delete with confirmation dialog
- **Print List**: Print employee list functionality

## Project Structure

```
employee-management/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page (redirects to login)
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Dashboard page
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── ProtectedRoute.tsx        # Route protection wrapper
│   │   ├── Header.tsx                # Header with user info and logout
│   │   ├── DashboardSummary.tsx      # Summary cards component
│   │   ├── SearchAndFilter.tsx       # Search and filter component
│   │   ├── EmployeeTable.tsx         # Employee list table
│   │   └── EmployeeForm.tsx          # Employee form (add/edit)
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces
│   ├── lib/
│   │   └── mockData.ts              # Mock data and constants
│   └── utils/
│       ├── auth.ts                  # Authentication utilities
│       └── storage.ts               # Employee storage utilities
├── public/
│   └── images/                      # Image assets
├── package.json
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
└── next.config.ts                   # Next.js configuration
```

## Mock Data

The application includes 6 pre-populated employees with:
- Unique IDs
- Full names
- Gender information
- Date of birth
- US States
- Profile images (using DiceBear avatar API)
- Active/Inactive status

All employee data is stored in browser's localStorage, persisting across sessions.

## Steps to Run Locally

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to project directory:**
   ```bash
   cd employee-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - You'll be redirected to the login page
   - Use credentials: `admin@example.com` / `password123`

### Build for Production

```bash
npm run build
npm run start
```

## UI/UX Features

- **Modern Design**: Clean, professional interface with gradient headers
- **Color Palette**: Blue and green accent colors for visual hierarchy
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Visual feedback during login
- **Error Handling**: Form validation with error messages
- **Confirmation Dialogs**: Delete confirmation to prevent accidents
- **Image Previews**: Profile image preview before saving
- **Empty States**: User-friendly messages when no employees found
- **Print Optimization**: Print-specific styling for employee lists
- **Hover Effects**: Interactive elements with smooth transitions

## Key Implementation Details

### Authentication
- Basic authentication with mock data
- No real backend API (uses localStorage)
- Session persists until logout
- Protected routes prevent unauthorized access

### Data Persistence
- Uses browser localStorage for data persistence
- Employee data survives page refreshes
- Search and filter results update in real-time
- Image data stored as Base64 in localStorage

### Validation
- Required field validation on form submit
- Email format validation on login
- Date of birth validation
- Age calculated automatically from DOB

## Assumptions & Design Decisions

1. **Mock Authentication**: Used localStorage instead of backend API as per requirements
2. **Local Storage**: All employee data stored locally (suitable for single-user demo)
3. **Image Handling**: Images stored as Base64 strings in localStorage (works for demo, not suitable for production with large datasets)
4. **DiceBear API**: Default avatars use external API for placeholder images
5. **US States Only**: Limited to US states in dropdown (can be expanded)
6. **No Real Database**: This is a frontend-only application
7. **Browser Storage Limit**: Limited by localStorage capacity (~5-10MB)

## Future Enhancements

- Backend API integration
- Real database (MongoDB, PostgreSQL, etc.)
- User authentication with JWT tokens
- Multiple user roles and permissions
- Email notifications
- Excel export functionality
- Advanced reporting and analytics
- Pagination for large datasets
- Dark mode support
- Internationalization (i18n)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for educational purposes.
