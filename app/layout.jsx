import "./globals.css";
import ReduxProvider from "@/store/Provider";
import HydrationWrapper from "@/components/common/HydrationWrapper";

export const metadata = {
  title: "FinTrack — Finance Dashboard",
  description: "Personal Finance Dashboard built with Next.js, Tailwind, and Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        <ReduxProvider>
          <HydrationWrapper>{children}</HydrationWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
