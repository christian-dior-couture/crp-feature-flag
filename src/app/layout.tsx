import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/theme';
import MainLayout from "@/components/layout/MainLayout";
import { AppProvider } from "@/context/AppContext"; // Import the AppProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bolt Feature Flags",
  description: "A comprehensive feature flag management solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider> {/* Wrap the entire app with the provider */}
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <MainLayout>
                {children}
              </MainLayout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AppProvider>
      </body>
    </html>
  );
}
