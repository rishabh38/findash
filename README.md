# FinTrack — Finance Dashboard

A clean, interactive **personal finance dashboard** built with **Next.js 14**, **Tailwind CSS**, and **Redux Toolkit**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 📁 Folder Structure

```
finance-dashboard/
├── app/                        # Next.js App Router pages
│   ├── layout.jsx              # Root layout with Redux Provider + theme hydration
│   ├── page.jsx                # Redirects / → /dashboard
│   ├── dashboard/page.jsx      # Dashboard overview
│   ├── transactions/page.jsx   # Transactions list
│   └── insights/page.jsx       # Insights & analytics
│
├── components/
│   ├── common/                 # Reusable UI components (used across all pages)
│   │   ├── PageLayout.jsx      # Sidebar + Navbar wrapper (used on every page)
│   │   ├── Sidebar.jsx         # Navigation sidebar with role switcher
│   │   ├── Navbar.jsx          # Top header bar
│   │   ├── SummaryCard.jsx     # KPI/stat card
│   │   ├── Badge.jsx           # TypeBadge & CategoryBadge
│   │   ├── Modal.jsx           # Generic modal dialog
│   │   ├── Button.jsx          # Multi-variant button
│   │   ├── EmptyState.jsx      # Empty/no-results state
│   │   ├── RoleSwitcher.jsx    # Admin / Viewer toggle
│   │   ├── ThemeToggle.jsx     # Dark / Light mode toggle
│   │   └── HydrationWrapper.jsx# Bootstraps Redux state from localStorage
│   │
│   ├── charts/                 # Recharts-based visualizations
│   │   ├── BalanceTrendChart.jsx       # Area chart — running balance
│   │   ├── SpendingBreakdownChart.jsx  # Donut chart — by category
│   │   └── MonthlyComparisonChart.jsx  # Bar chart — income vs expense
│   │
│   ├── dashboard/
│   │   └── RecentTransactions.jsx      # Latest transactions widget
│   │
│   ├── transactions/
│   │   ├── TransactionTable.jsx        # Full table with pagination
│   │   ├── TransactionFilters.jsx      # Search, filter, sort controls
│   │   ├── TransactionRow.jsx          # Individual table row
│   │   └── TransactionModal.jsx        # Add / Edit modal form
│   │
│   └── insights/
│       ├── InsightCard.jsx             # Reusable insight KPI card
│       └── CategorySpendingBars.jsx    # Horizontal progress bars
│
├── store/                      # Redux Toolkit
│   ├── index.js                # configureStore with all reducers
│   ├── Provider.jsx            # <Provider store={store}> wrapper
│   └── slices/
│       ├── transactionsSlice.js # Transactions CRUD + localStorage
│       ├── filtersSlice.js      # Search / filter / sort state
│       ├── roleSlice.js         # RBAC role (admin | viewer)
│       └── themeSlice.js        # Dark / light mode
│
├── data/
│   └── mockData.js             # 80+ mock transactions, categories, colors, icons
│
├── utils/
│   ├── formatters.js           # Currency (₹ INR), dates, grouping, stats helpers
│   └── exportUtils.js          # CSV and JSON export helpers
│
├── tailwind.config.js          # Custom colors, fonts, animations
├── app/globals.css             # Base styles, component classes, scrollbars
└── README.md
```

---

## ✅ Features Implemented

### 1. Dashboard Overview
- **Summary cards**: Net Balance, Total Income, Total Expenses, Top Category — all in **₹ INR**
- **Balance Trend** — area chart showing running net balance over time
- **Spending Breakdown** — donut chart grouped by category
- **Monthly Overview** — grouped bar chart (income vs expenses)
- **Recent Transactions** — last 8 transactions with quick-view

### 2. Transactions Section
- Full table with **Date, Description, Amount (₹), Category, Type**
- **Search** across description, category, note, and ID
- **Filters**: type (income/expense), category, date range
- **Sort**: newest/oldest/highest/lowest amount
- **Pagination** (15 per page)
- **Admin only**: Add, Edit, Delete transactions via modal form
- **Export** filtered results as CSV or JSON

### 3. Role-Based UI (RBAC — frontend simulated)
- **Admin**: full access — can add, edit, delete transactions
- **Viewer**: read-only — all action buttons hidden
- Role switcher available in the sidebar (persisted to localStorage)

### 4. Insights Section
- **Savings Rate** with trend indicator
- **Average monthly income & expense**
- **Best savings month**
- **Income-to-expense ratio**
- **Top spending category**
- **Monthly comparison table** (last 6 months)
- **Category spending bars** (visual progress bars by category)
- **Auto-generated observations** with positive/warning/neutral tags

### 5. State Management (Redux Toolkit)
- `transactionsSlice` — all transaction CRUD + localStorage persistence
- `filtersSlice` — search, filter, sort state
- `roleSlice` — current role, persisted
- `themeSlice` — dark/light mode, persisted

### 6. Optional Enhancements
- ✅ **Dark Mode** (default) with light mode toggle, persisted
- ✅ **Data persistence** via localStorage
- ✅ **Export functionality** — CSV and JSON
- ✅ **Animations** — staggered slide-up, fade-in, smooth transitions
- ✅ **Responsive** — mobile sidebar, responsive grid layout
- ✅ **Empty states** — graceful handling of no-data scenarios
- ✅ **Indian currency** — ₹ INR with `en-IN` locale formatting (compact: K/L)

---

## 🎨 Design Decisions

- **Aesthetic**: Dark luxury — deep navy/slate + amber gold accents
- **Typography**: Plus Jakarta Sans (UI) + DM Mono (numbers/data)
- **Charts**: Recharts with custom tooltips and gradients
- **Icons**: Lucide React

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14 | React framework (App Router) |
| React | 18 | UI |
| Redux Toolkit | 2.x | State management |
| React-Redux | 9.x | Redux bindings |
| Recharts | 2.x | Data visualizations |
| Tailwind CSS | 3.x | Styling |
| Lucide React | 0.44x | Icons |
