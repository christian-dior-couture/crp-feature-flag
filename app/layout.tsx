import './globals.css';

export interface PageProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: PageProps) {
  return (
    <html lang="en">
      <head>
        <title>FeatureFlag Manager</title>
        <meta name="description" content="Manage feature flags across all environments" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
