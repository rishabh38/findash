/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (amount, compact = false) => {
  if (compact) {
    if (Math.abs(amount) >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (Math.abs(amount) >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateStr, format = "medium") => {
  const date = new Date(dateStr);
  if (format === "short") {
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  }
  if (format === "long") {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Get month name from a date string
 */
export const getMonthYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

/**
 * Get month name only
 */
export const getMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", { month: "short" });
};

/**
 * Get YYYY-MM from a date string (for grouping)
 */
export const getMonthKey = (dateStr) => dateStr.slice(0, 7);

/**
 * Sort comparator for dates
 */
export const sortByDate = (a, b, asc = true) => {
  const diff = new Date(a.date) - new Date(b.date);
  return asc ? diff : -diff;
};

/**
 * Sort comparator for amounts
 */
export const sortByAmount = (a, b, asc = true) => {
  return asc ? a.amount - b.amount : b.amount - a.amount;
};

/**
 * Compute summary stats from a list of transactions
 */
export const computeSummary = (transactions) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
};

/**
 * Group transactions by month key and compute totals
 */
export const groupByMonth = (transactions) => {
  const groups = {};
  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!groups[key]) {
      groups[key] = { month: key, income: 0, expense: 0, label: getMonthYear(t.date) };
    }
    if (t.type === "income") groups[key].income += t.amount;
    else groups[key].expense += t.amount;
  });
  return Object.values(groups).sort((a, b) => a.month.localeCompare(b.month));
};

/**
 * Group expense transactions by category
 */
export const groupByCategory = (transactions) => {
  const groups = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      if (!groups[t.category]) {
        groups[t.category] = { category: t.category, total: 0, count: 0 };
      }
      groups[t.category].total += t.amount;
      groups[t.category].count += 1;
    });
  return Object.values(groups).sort((a, b) => b.total - a.total);
};

/**
 * Get balance trend data (running balance)
 */
export const getBalanceTrend = (transactions) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  let balance = 0;
  const result = [];
  const monthSeen = new Set();

  sorted.forEach((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;
    const monthKey = getMonthKey(t.date);
    if (!monthSeen.has(monthKey)) {
      monthSeen.add(monthKey);
    }
    result.push({ date: t.date, balance, label: formatDate(t.date, "short") });
  });

  // Deduplicate to one point per day (last transaction of that day)
  const byDay = {};
  result.forEach((r) => {
    byDay[r.date] = r;
  });
  return Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Get change percentage between two values
 */
export const getChangePercent = (current, previous) => {
  if (!previous || previous === 0) return null;
  return (((current - previous) / Math.abs(previous)) * 100).toFixed(1);
};
