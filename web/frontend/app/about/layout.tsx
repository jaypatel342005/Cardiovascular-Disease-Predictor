import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Jay Patel",
  description: "Portfolio of Jay Patel - Full Stack Developer and AI/ML Enthusiast specializing in Next.js, Python, and Machine Learning.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jay Patel",
    "url": "https://cardio-ai-predictor.vercel.app/about",
    "image": "https://ik.imagekit.io/ExpenseManager/jaypatel.jpg?updatedAt=1767358147818",
    "jobTitle": "Full Stack Developer & ML Engineer",
    "sameAs": [
      "https://github.com/jaypatel342005",
      "https://www.linkedin.com/in/jaypatel345/",
      "https://www.kaggle.com/jaypatel345",
      "https://instagram.com/ll_jay.patel.345_ll"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
