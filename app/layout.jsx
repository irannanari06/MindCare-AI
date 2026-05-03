import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export const metadata = {
  title: "MindCare AI",
  description: "An AI mental wellness companion for emotional support and resources."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AppProviders>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
