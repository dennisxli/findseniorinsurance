import type { Metadata } from "next";
import ProductLandingPage from "@/app/components/ProductLandingPage";

export const metadata: Metadata = {
  title: "Final Expense Insurance Guidance | Find Senior Insurance",
  description: "Understand final expense insurance costs, benefit amounts, waiting periods, and family considerations with senior-focused guidance.",
  alternates: { canonical: "/final-expense" },
};

export default function FinalExpensePage() {
  return <ProductLandingPage product="final-expense" />;
}
