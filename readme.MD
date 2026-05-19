# Personal Finance Dashboard

Build a React web application that helps users track income, expenses, savings goals, and monthly spending insights.

## Tech Stack

- React
- TypeScript
- React Router
- LocalStorage or mocked API
- CSS Modules / Tailwind / SCSS
- Optional: Recharts for charts

## Core Features

### 1. Dashboard Page

Show:

- Total balance
- Monthly income
- Monthly expenses
- Savings progress
- Recent transactions
- Spending chart by category

### 2. Transactions Page

User should be able to:

- Add a transaction
- Edit a transaction
- Delete a transaction
- Filter by:
  - income
  - expense
  - category
  - date range
- Search by title
  Transaction fields:

- title
- amount
- type: income / expense
- category
- date
- note

### 3. Savings Goals Page

User should be able to:

- Create savings goal
- Edit goal
- Delete goal
- Add saved amount
- See progress percentage
  Goal fields:

- goal name
- target amount
- current amount
- deadline

### 4. Reports Page

Show simple analytics:

- Expenses by category
- Income vs expenses
- Monthly trend
- Highest spending category

## UI Requirements

- Clean responsive layout
- Sidebar navigation
- Mobile-friendly design
- Empty states
- Loading states
- Error states
- Form validation
- Confirmation modal before delete

## Technical Requirements

### Components

Create reusable components:

- Button
- Input
- Select
- Modal
- Card
- Table
- ChartCard
- EmptyState

### State

Use React state or Context API.

### Data Persistence

Store data in localStorage.

### Routing

Create routes:

```
/
/transactions
/goals
/reports
```

### Validation

Validate:

- required fields
- positive amount
- valid date
- target amount greater than current amount

## Acceptance Criteria

The task is complete when:

- User can create, edit, delete transactions.
- User can create, edit, delete savings goals.
- Dashboard updates automatically after data changes.
- Reports are calculated from real app data.
- Data remains after page refresh.
- App works correctly on desktop and mobile.
- Code is split into reusable components.
- There are no console errors.

## Bonus Tasks

- Add dark mode
- Add export to CSV
- Add category icons
- Add unit tests
- Add charts with Recharts
- Add TypeScript interfaces for all data models
