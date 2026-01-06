import { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "CardioAI Creator - Jay Patel",
  description: "Learn more about the creator of CardioAI, Jay Patel - a Full Stack Developer and AI/ML enthusiast.",
  openGraph: {
    title: "CardioAI Creator - Jay Patel",
    description: "Discover the projects, skills, and background of Jay Patel.",
    url: "https://cardio-ai-predictor.vercel.app/about",
    images: [
      {
        url: "https://ik.imagekit.io/ExpenseManager/jaypatel.jpg?updatedAt=1767358147818",
        width: 800,
        height: 600,
        alt: "Jay Patel",
      },
    ],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jay Patel",
    "url": "https://cardio-ai-predictor.vercel.app/about",
    "image": "https://ik.imagekit.io/ExpenseManager/jaypatel.jpg?updatedAt=1767358147818",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer and AI/ML Enthusiast specializing in web applications and machine learning.",
    "sameAs": [
      "https://github.com/jaypatel342005",
      "https://www.linkedin.com/in/jaypatel345/",
      "https://www.kaggle.com/jaypatel345",
      "https://instagram.com/ll_jay.patel.345_ll",
      "https://www.facebook.com/jay.patel.14838",
      "https://www.threads.com/@ll_jay.patel.345_ll"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
