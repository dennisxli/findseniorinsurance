import type { Metadata } from "next";
import ProductLandingPage from "@/app/components/ProductLandingPage";

export const metadata: Metadata = {
  title: "Medicare Insurance Guidance | Find Senior Insurance",
  description: "Organize the questions that matter when considering private Medicare insurance choices, including doctors, prescriptions, benefits, and costs.",
  alternates: { canonical: "/medicare-insurance" },
};

export default function MedicareInsurancePage() {
  return <ProductLandingPage product="medicare" />;
}
