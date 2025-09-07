import type { Metadata } from "next";
// Removed: import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/lib/theme';
import MainLayout from "@/components/layout/MainLayout";
import { AppConfigurationProvider } from "@/context/AppConfigurationContext";

// Removed: const inter = Inter({ subsets: ["latin"] });

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
      {/* Removed className={inter.className} from the body tag */}
      <body>
        <AppConfigurationProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <MainLayout>{children}</MainLayout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AppConfigurationProvider>
      </body>
    </html>
  );
}
