export const CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Housing",
  "Travel",
  "Education",
  "Personal Care",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

export const CATEGORY_COLORS = {
  "Food & Dining": "#f59e0b",
  Transport: "#3b82f6",
  Shopping: "#8b5cf6",
  Entertainment: "#ec4899",
  Healthcare: "#10b981",
  Utilities: "#06b6d4",
  Housing: "#f97316",
  Travel: "#84cc16",
  Education: "#6366f1",
  "Personal Care": "#e879f9",
  Salary: "#10b981",
  Freelance: "#34d399",
  Investment: "#fbbf24",
  Other: "#94a3b8",
};

export const CATEGORY_ICONS = {
  "Food & Dining": "🍜",
  Transport: "🚗",
  Shopping: "🛍️",
  Entertainment: "🎬",
  Healthcare: "💊",
  Utilities: "💡",
  Housing: "🏠",
  Travel: "✈️",
  Education: "📚",
  "Personal Care": "💆",
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
  Other: "📦",
};

let idCounter = 1;
const makeId = () => String(idCounter++).padStart(4, "0");

const tx = (date, desc, amount, category, type, note = "") => ({
  id: `TXN-${makeId()}`,
  date,
  description: desc,
  amount,
  category,
  type, // 'income' | 'expense'
  note,
});

export const INITIAL_TRANSACTIONS = [
  // ── January 2025 ──────────────────────────────────────────
  tx("2025-01-01", "Monthly Salary", 85000, "Salary", "income", "January salary credit"),
  tx("2025-01-02", "House Rent", 18000, "Housing", "expense", "Jan rent payment"),
  tx("2025-01-03", "Grocery Store", 2800, "Food & Dining", "expense"),
  tx("2025-01-05", "Electricity Bill", 1200, "Utilities", "expense"),
  tx("2025-01-06", "Uber Ride", 320, "Transport", "expense"),
  tx("2025-01-08", "Netflix Subscription", 649, "Entertainment", "expense"),
  tx("2025-01-10", "Pharmacy", 540, "Healthcare", "expense"),
  tx("2025-01-12", "Online Shopping", 3400, "Shopping", "expense", "Winter clothes"),
  tx("2025-01-14", "Restaurant Dinner", 1800, "Food & Dining", "expense"),
  tx("2025-01-15", "Freelance Project", 22000, "Freelance", "income", "Web project"),
  tx("2025-01-18", "Petrol", 2200, "Transport", "expense"),
  tx("2025-01-20", "Gym Membership", 1500, "Personal Care", "expense"),
  tx("2025-01-22", "Movie Tickets", 700, "Entertainment", "expense"),
  tx("2025-01-25", "Doctor Visit", 800, "Healthcare", "expense"),
  tx("2025-01-28", "Internet Bill", 999, "Utilities", "expense"),
  tx("2025-01-30", "Mutual Fund SIP", 5000, "Investment", "expense", "SIP investment"),

  // ── February 2025 ─────────────────────────────────────────
  tx("2025-02-01", "Monthly Salary", 85000, "Salary", "income"),
  tx("2025-02-02", "House Rent", 18000, "Housing", "expense"),
  tx("2025-02-04", "Grocery Store", 3100, "Food & Dining", "expense"),
  tx("2025-02-05", "Valentine's Dinner", 4200, "Food & Dining", "expense"),
  tx("2025-02-07", "Electricity Bill", 1050, "Utilities", "expense"),
  tx("2025-02-10", "Online Course", 4999, "Education", "expense", "React advanced course"),
  tx("2025-02-12", "Freelance Invoice", 15000, "Freelance", "income"),
  tx("2025-02-14", "Gift Shopping", 5500, "Shopping", "expense"),
  tx("2025-02-18", "Metro Card Recharge", 500, "Transport", "expense"),
  tx("2025-02-20", "Mobile Recharge", 499, "Utilities", "expense"),
  tx("2025-02-22", "Spa Session", 2200, "Personal Care", "expense"),
  tx("2025-02-25", "Investment Return", 3500, "Investment", "income", "Dividend received"),
  tx("2025-02-28", "Mutual Fund SIP", 5000, "Investment", "expense"),

  // ── March 2025 ────────────────────────────────────────────
  tx("2025-03-01", "Monthly Salary", 85000, "Salary", "income"),
  tx("2025-03-02", "House Rent", 18000, "Housing", "expense"),
  tx("2025-03-03", "Grocery Store", 2600, "Food & Dining", "expense"),
  tx("2025-03-05", "Cab Booking", 450, "Transport", "expense"),
  tx("2025-03-08", "Holi Celebration", 2800, "Entertainment", "expense"),
  tx("2025-03-10", "Electricity Bill", 1100, "Utilities", "expense"),
  tx("2025-03-12", "New Laptop", 85000, "Shopping", "expense", "MacBook Air M2"),
  tx("2025-03-15", "Freelance Project", 30000, "Freelance", "income"),
  tx("2025-03-18", "Medical Checkup", 2500, "Healthcare", "expense"),
  tx("2025-03-20", "Online Shopping", 2100, "Shopping", "expense"),
  tx("2025-03-22", "Zomato Order", 650, "Food & Dining", "expense"),
  tx("2025-03-25", "Weekend Trip Goa", 12000, "Travel", "expense", "Goa trip expenses"),
  tx("2025-03-28", "Petrol", 2000, "Transport", "expense"),
  tx("2025-03-30", "Mutual Fund SIP", 5000, "Investment", "expense"),
  tx("2025-03-31", "Bonus", 25000, "Salary", "income", "Q1 performance bonus"),

  // ── April 2025 ────────────────────────────────────────────
  tx("2025-04-01", "Monthly Salary", 85000, "Salary", "income"),
  tx("2025-04-02", "House Rent", 18000, "Housing", "expense"),
  tx("2025-04-04", "Grocery Store", 2900, "Food & Dining", "expense"),
  tx("2025-04-06", "Uber", 380, "Transport", "expense"),
  tx("2025-04-08", "Electricity Bill", 1350, "Utilities", "expense"),
  tx("2025-04-10", "Spotify Premium", 119, "Entertainment", "expense"),
  tx("2025-04-12", "Freelance Invoice", 18000, "Freelance", "income"),
  tx("2025-04-14", "IPL Match Tickets", 3500, "Entertainment", "expense"),
  tx("2025-04-16", "Pharmacy", 720, "Healthcare", "expense"),
  tx("2025-04-18", "Amazon Shopping", 4800, "Shopping", "expense"),
  tx("2025-04-20", "Swiggy Order", 420, "Food & Dining", "expense"),
  tx("2025-04-22", "Haircut & Grooming", 600, "Personal Care", "expense"),
  tx("2025-04-25", "Mutual Fund SIP", 5000, "Investment", "expense"),
  tx("2025-04-28", "Internet Bill", 999, "Utilities", "expense"),

  // ── May 2025 ──────────────────────────────────────────────
  tx("2025-05-01", "Monthly Salary", 85000, "Salary", "income"),
  tx("2025-05-02", "House Rent", 18000, "Housing", "expense"),
  tx("2025-05-04", "Grocery Store", 3200, "Food & Dining", "expense"),
  tx("2025-05-06", "Bus Pass", 650, "Transport", "expense"),
  tx("2025-05-08", "Summer Clothes", 7500, "Shopping", "expense"),
  tx("2025-05-10", "AC Service", 1800, "Utilities", "expense"),
  tx("2025-05-12", "Freelance Project", 25000, "Freelance", "income"),
  tx("2025-05-14", "Book Purchase", 1200, "Education", "expense"),
  tx("2025-05-16", "Restaurant", 2100, "Food & Dining", "expense"),
  tx("2025-05-18", "Investment Return", 4200, "Investment", "income"),
  tx("2025-05-20", "Petrol", 2400, "Transport", "expense"),
  tx("2025-05-22", "Dental Checkup", 3500, "Healthcare", "expense"),
  tx("2025-05-25", "Manali Trip", 18000, "Travel", "expense", "Manali vacation"),
  tx("2025-05-28", "Mutual Fund SIP", 5000, "Investment", "expense"),
  tx("2025-05-30", "Electricity Bill", 1600, "Utilities", "expense"),

  // ── June 2025 ─────────────────────────────────────────────
  tx("2025-06-01", "Monthly Salary", 85000, "Salary", "income"),
  tx("2025-06-02", "House Rent", 18000, "Housing", "expense"),
  tx("2025-06-04", "Grocery Store", 2750, "Food & Dining", "expense"),
  tx("2025-06-06", "Cab Rides", 900, "Transport", "expense"),
  tx("2025-06-08", "Electricity Bill", 1800, "Utilities", "expense", "Summer surge"),
  tx("2025-06-10", "New Sneakers", 6500, "Shopping", "expense"),
  tx("2025-06-12", "Freelance Invoice", 20000, "Freelance", "income"),
  tx("2025-06-14", "Concert Tickets", 4000, "Entertainment", "expense"),
  tx("2025-06-16", "Pharmacy", 380, "Healthcare", "expense"),
  tx("2025-06-18", "Yoga Classes", 2000, "Personal Care", "expense"),
  tx("2025-06-20", "Online Course", 2999, "Education", "expense"),
  tx("2025-06-22", "Swiggy Order", 580, "Food & Dining", "expense"),
  tx("2025-06-25", "Investment Return", 5100, "Investment", "income"),
  tx("2025-06-28", "Mutual Fund SIP", 5000, "Investment", "expense"),
  tx("2025-06-30", "Quarter-end Bonus", 20000, "Salary", "income"),
];

export const ROLES = {
  ADMIN: "admin",
  VIEWER: "viewer",
};

// Demo account — only this account gets pre-loaded with mock transactions
export const DEMO_ACCOUNT = {
  email: "demo@fintrack.com",
  name: "Demo User",
  passwordHash: "d3ad9315b7be5dd53b31a273b3b3aba5defe700808305aa16a3062b76658a791", // "demo123"
  userHash: "0070fe56",
  createdAt: "2025-01-01T00:00:00.000Z",
};
