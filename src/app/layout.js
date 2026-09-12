import "./globals.css";

export const metadata = {
  title: "Omega LMS | Next-Gen Learning & Live Classroom",
  description: "High-performance full-stack educational platform with live video, analytics metrics, and real-time interaction.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 selection:bg-orange-100 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}
