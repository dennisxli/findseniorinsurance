"use client";

import Image from "next/image";
import Link from "next/link";
import LeadForm, { CoverageChoice } from "@/app/components/LeadForm";
import { trackFunnelEvent } from "@/app/lib/attribution";

type ProductKey = Exclude<CoverageChoice, "both">;

const productContent = {
  "final-expense": {
    sourcePage: "final-expense-paid-landing",
    eyebrow: "FINAL EXPENSE GUIDANCE FOR SENIORS",
    title: "Understand final expense coverage before you choose.",
    lede: "Get help looking beyond the monthly price to understand benefit amounts, waiting periods, health questions, and what may fit your family and budget.",
    formHeading: "Compare final expense options with a guide",
    points: [
      ["Know what the policy may cover", "Understand benefit amounts, limitations, and the questions worth asking before you apply."],
      ["Keep the premium manageable", "Think through a monthly budget that can remain comfortable over time."],
      ["Protect the people you care about", "Focus the conversation on funeral costs, remaining bills, and your family’s needs."],
    ],
    note: "Final expense insurance is a type of life insurance. Product availability, premiums, benefits, limitations, and eligibility vary by carrier, state, and applicant.",
  },
  medicare: {
    sourcePage: "medicare-paid-landing",
    eyebrow: "MEDICARE INSURANCE GUIDANCE",
    title: "Make sense of private Medicare insurance choices.",
    lede: "Get help organizing the questions that matter—your doctors, prescriptions, expected costs, benefits, and the options available where you live.",
    formHeading: "Compare Medicare insurance options with a guide",
    points: [
      ["Start with your health care priorities", "Keep doctors, prescriptions, travel, benefits, and budget at the center of the discussion."],
      ["Understand the tradeoffs", "Learn which costs and coverage details deserve a closer look before you decide."],
      ["Choose on your timetable", "Discuss available private insurance options with a licensed professional without an obligation to enroll."],
    ],
    note: "Find Senior Insurance is not affiliated with or endorsed by the U.S. government or the federal Medicare program. For official information, visit Medicare.gov or call 1-800-MEDICARE.",
  },
} satisfies Record<ProductKey, {
  sourcePage: string;
  eyebrow: string;
  title: string;
  lede: string;
  formHeading: string;
  points: string[][];
  note: string;
}>;

export default function ProductLandingPage({ product }: { product: ProductKey }) {
  const content = productContent[product];

  function scrollToLead() {
    document.getElementById("lead-request")?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackFunnelEvent("lead_cta_clicked", { coverage: product, source_page: content.sourcePage });
  }

  return (
    <div className="site-shell product-landing">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header product-header">
        <div className="page-width header-inner">
          <Link className="brand" href="/" aria-label="Find Senior Insurance home">
            <Image className="brand-mark" src="/logo-mark.png" alt="" width={58} height={58} priority />
            <span className="brand-copy"><strong>Find Senior Insurance</strong><span>Navigate with confidence</span></span>
          </Link>
          <button className="header-cta" type="button" onClick={scrollToLead}>Help Me Compare My Options</button>
        </div>
      </header>

      <main id="main-content">
        <section className="product-hero">
          <div className="page-width product-hero-grid">
            <div>
              <p className="section-kicker">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className="hero-lede">{content.lede}</p>
              <button className="primary-button" type="button" onClick={scrollToLead}>Help Me Compare My Options</button>
              <p className="product-microcopy">Free guidance request. No obligation to enroll.</p>
            </div>
            <div className="product-hero-image">
              <Image
                src="/senior-couple.jpg"
                alt="A senior couple talking together at home"
                fill
                priority
                sizes="(max-width: 760px) calc(100vw - 34px), 480px"
              />
              <div className="product-image-note"><Image src="/logo-mark.png" alt="" width={42} height={42} /><strong>Plain-English guidance centered on you</strong></div>
            </div>
          </div>
        </section>

        <section className="product-value-section" aria-labelledby="product-value-heading">
          <div className="page-width">
            <div className="centered-heading product-value-heading">
              <p className="section-kicker">WHAT TO LOOK AT BEFORE YOU CHOOSE</p>
              <h2 id="product-value-heading">Clear questions lead to better conversations.</h2>
            </div>
            <div className="product-value-grid">
              {content.points.map(([title, description], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="product-lead-section" id="lead-request">
          <div className="page-width product-lead-grid">
            <div className="product-lead-copy">
              <p className="section-kicker">START WITH YOUR PRIORITIES</p>
              <h2>Three short steps to request guidance.</h2>
              <p>Tell us where you are and what matters most. Your answers help make the conversation more useful from the start.</p>
              <ul className="reassurance-list">
                <li><span aria-hidden="true">✓</span> Senior-focused, plain-English guidance</li>
                <li><span aria-hidden="true">✓</span> A licensed insurance professional can follow up</li>
                <li><span aria-hidden="true">✓</span> You decide whether to move forward</li>
              </ul>
              <p className="government-note">{content.note}</p>
            </div>
            <LeadForm sourcePage={content.sourcePage} defaultCoverage={product} heading={content.formHeading} />
          </div>
        </section>
      </main>

      <footer className="site-footer product-footer">
        <div className="page-width">
          <div className="product-footer-links"><Link href="/">Find Senior Insurance home</Link><Link href="/privacy">Privacy Policy</Link></div>
          <div className="footer-disclosures">
            <p>Find Senior Insurance is a private insurance referral service and is not affiliated with or endorsed by the U.S. government, the federal Medicare program, or any state government agency. We connect consumers with licensed insurance professionals.</p>
            <p>© {new Date().getFullYear()} Find Senior Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button className="mobile-sticky-cta" type="button" onClick={scrollToLead}>Help Me Compare My Options</button>
    </div>
  );
}
