import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CardioAI - Advanced Heart Disease Prediction",
    template: "%s | CardioAI"
  },
  description: "Advanced ML-powered health risk assessment using XGBoost and Random Forest models. Get instant heart disease predictions with 73%+ accuracy.",
  keywords: ["Machine Learning", "Healthcare AI", "Heart Disease Prediction", "Cardiovascular Health", "XGBoost", "Medical AI"],
  authors: [{ name: "Jay Patel", url: "https://github.com/jaypatel342005" }],
  creator: "Jay Patel",
  metadataBase: new URL("https://cardio-ai-predictor.vercel.app"), // Replace with actual domain if known, or localhost for now
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cardio-ai-predictor.vercel.app",
    title: "CardioAI - Advanced Heart Disease Prediction",
    description: "Analyze your heart health with our advanced machine learning algorithms.",
    siteName: "CardioAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CardioAI - Heart Disease Prediction",
    description: "AI-powered cardiovascular risk assessment tool.",
    creator: "@jaypatel345", 
  },
  alternates: {
    canonical: "https://cardio-ai-predictor.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CardioAI",
    "url": "https://cardio-ai-predictor.vercel.app",
    "description": "Advanced ML-powered health risk assessment using XGBoost and Random Forest models.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cardio-ai-predictor.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
