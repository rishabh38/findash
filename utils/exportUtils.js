import { formatDate } from "./formatters";

/**
 * Export transactions as CSV
 */
export const exportAsCSV = (transactions, filename = "transactions") => {
  const headers = ["ID", "Date", "Description", "Category", "Type", "Amount", "Note"];
  const rows = transactions.map((t) => [
    t.id,
    formatDate(t.date, "long"),
    `"${t.description}"`,
    t.category,
    t.type,
    t.amount,
    `"${t.note || ""}"`,
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv");
};

/**
 * Export transactions as JSON
 */
export const exportAsJSON = (transactions, filename = "transactions") => {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, `${filename}.json`, "application/json");
};

/**
 * Helper: trigger browser download
 */
const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
