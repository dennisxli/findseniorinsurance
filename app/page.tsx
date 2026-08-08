"use client";

import Image from "next/image";
import LeadForm from "@/app/components/LeadForm";
import { trackFunnelEvent } from "@/app/lib/attribution";

const coverageOptions = [
  {
    value: "final-expense",
    eyebrow: "LIFE INSURANCE",
    title: "Final Expense Insurance",
    description:
      "Look beyond the monthly price and understand how coverage may support the people you care about when it matters most.",
    bullets: ["Understand benefit amounts and waiting periods", "Consider what fits your family and budget"],
    action: "Navigate final expense",
  },
  {
    value: "medicare",
    eyebrow: "HEALTH INSURANCE",
    title: "Medicare Insurance",
    description:
      "Make sense of private Medicare insurance choices by focusing on the doctors, prescriptions, benefits, and costs that matter to you.",
    bullets: ["Know which questions to ask before choosing", "Explore options available where you live"],
    action: "Navigate Medicare insurance",
  },
];

const faqs = [
  {
    question: "What makes Find Senior Insurance different?",
    answer:
      "We help you look at the whole picture across final expense and Medicare insurance. Our process begins with your priorities, explains the tradeoffs in plain language, and keeps the final decision where it belongs—with you.",
  },
  {
    question: "Is your guidance really free?",
    answer:
      "Yes. There is no cost to request information or speak with a licensed insurance agent, and you are never obligated to enroll in a plan.",
  },
  {
    question: "Will I be pressured to buy something?",
    answer:
      "No. Our role is to help you understand the choices and questions in front of you. You decide if and when a policy is right for you. Requesting guidance does not require you to make a purchase.",
  },
  {
    question: "Can I get help if I already have coverage?",
    answer:
      "Absolutely. A review can help you understand what you already have, identify questions worth asking, and learn whether other options may be available in your area.",
  },
  {
    question: "Do you represent Medicare or the government?",
    answer:
      "No. Find Senior Insurance is not affiliated with or endorsed by the U.S. government or the federal Medicare program. We connect consumers with licensed insurance professionals.",
  },
];

function scrollToForm(coverage?: string) {
  if (coverage) {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="coverage"][value="${coverage}"]`,
    );
    input?.click();
  }
  document.getElementById("request-help")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  trackFunnelEvent("lead_cta_clicked", { coverage, source_page: "homepage" });
}

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#top" aria-label="Find Senior Insurance home">
            <Image className="brand-mark" src="/logo-mark.png" alt="" width={58} height={58} priority />
            <span className="brand-copy">
              <strong>Find Senior Insurance</strong>
              <span>Navigate with confidence</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#why-us">Why us</a>
            <a href="#coverage">Coverage</a>
            <a href="#how-it-works">How it works</a>
          </nav>

          <button className="header-cta" type="button" onClick={() => scrollToForm()}>
            Help Me Compare My Options
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <p className="section-kicker">YOUR GUIDE. YOUR ADVOCATE. YOUR CHOICE.</p>
              <h1>A clearer path through life &amp; Medicare insurance.</h1>
              <p className="hero-lede">
                Senior insurance can be complicated. We help you understand the tradeoffs, ask the right questions, and find options that fit your life—not the other way around.
              </p>
              <div className="hero-actions">
                <button className="primary-button" type="button" onClick={() => scrollToForm()}>
                  Help Me Compare My Options
                </button>
                <a className="text-link" href="#why-us">
                  Why we&apos;re different <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="reassurance-list" aria-label="Service benefits">
                <li><span aria-hidden="true">✓</span> We start with your priorities—not a plan</li>
                <li><span aria-hidden="true">✓</span> We translate fine print into plain English</li>
                <li><span aria-hidden="true">✓</span> You stay in control from start to finish</li>
              </ul>
            </div>

            <div className="hero-visual">
              <div className="photo-frame">
                <Image
                  src="/senior-couple.jpg"
                  alt="A senior couple laughing together at home"
                  fill
                  priority
                  sizes="(max-width: 760px) calc(100vw - 34px), (max-width: 960px) 42vw, 500px"
                />
              </div>
              <div className="photo-note">
                <Image src="/logo-mark.png" alt="" width={42} height={42} aria-hidden="true" />
                <p><strong>An advocate in your corner</strong><br />Clear guidance centered on what matters to you.</p>
              </div>
              <p className="photo-credit">Photo by Gustavo Fring / Pexels</p>
            </div>
          </div>
        </section>

        <section className="difference-section" id="why-us">
          <div className="page-width">
            <div className="difference-intro">
              <p className="section-kicker">WHY FIND SENIOR INSURANCE</p>
              <h2>Insurance guidance built around the person—not the policy.</h2>
              <p>Most insurance sites begin with products. We begin with your life, your concerns, and the people you want to protect.</p>
            </div>
            <div className="difference-grid">
              <article>
                <span className="difference-number">01</span>
                <h3>See the whole picture</h3>
                <p>One trusted place to navigate final expense and Medicare insurance instead of sorting through disconnected advice.</p>
              </article>
              <article>
                <span className="difference-number">02</span>
                <h3>Understand the tradeoffs</h3>
                <p>We turn insurance language into clear questions about cost, coverage, timing, doctors, prescriptions, and family needs.</p>
              </article>
              <article>
                <span className="difference-number">03</span>
                <h3>Keep the choice yours</h3>
                <p>We help you prepare for a productive conversation with a licensed agent—without rushing the decision.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="coverage-section" id="coverage">
          <div className="page-width">
            <div className="section-heading centered-heading">
              <p className="section-kicker">ONE GUIDE FOR THE ROAD AHEAD</p>
              <h2>Two important decisions. One trusted place to start.</h2>
              <p>Navigate coverage for your health and your family without being sent from site to site or left to decode it alone.</p>
            </div>

            <div className="coverage-grid">
              {coverageOptions.map((option, index) => (
                <article className="coverage-card" key={option.value}>
                  <div className={`coverage-icon coverage-icon-${index + 1}`} aria-hidden="true">
                    {index === 0 ? "♥" : "+"}
                  </div>
                  <p className="card-eyebrow">{option.eyebrow}</p>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                  <ul>
                    {option.bullets.map((bullet) => (
                      <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>
                    ))}
                  </ul>
                  <button className="card-link" type="button" onClick={() => scrollToForm(option.value)}>
                    {option.action} <span aria-hidden="true">→</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section" id="how-it-works">
          <div className="page-width process-grid">
            <div className="process-intro">
              <p className="section-kicker">HOW WE ADVOCATE FOR YOU</p>
              <h2>Guidance that starts with your life, not a product.</h2>
              <p>
                You do not need to become an insurance expert. We help you organize what matters, understand the choices, and enter the next conversation with confidence.
              </p>
              <button className="secondary-button" type="button" onClick={() => scrollToForm()}>
                Start with my priorities
              </button>
            </div>
            <ol className="steps-list">
              <li>
                <span className="step-number">1</span>
                <div><h3>Start with your priorities</h3><p>Tell us what you want to protect, what feels unclear, and the type of help you need.</p></div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div><h3>Untangle the choices</h3><p>Get plain-English context and practical questions to help you understand the tradeoffs.</p></div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div><h3>Move forward on your terms</h3><p>Connect with a licensed agent to discuss available options. Take your time; the choice remains yours.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="request-section" id="request-help">
          <div className="page-width request-grid">
            <div className="request-copy">
              <p className="section-kicker">YOUR QUESTIONS COME FIRST</p>
              <h2>Tell us where insurance feels unclear.</h2>
              <p className="request-lede">
                Share a little about what you need. A licensed insurance professional can contact you to help you discuss available options and next steps.
              </p>
              <div className="what-you-get">
                <h3>What your conversation can cover</h3>
                <ul>
                  <li><span aria-hidden="true">✓</span> The people, costs, and benefits that matter to you</li>
                  <li><span aria-hidden="true">✓</span> Questions about your current or future coverage</li>
                  <li><span aria-hidden="true">✓</span> Options available in your area, with no obligation to enroll</li>
                </ul>
              </div>
              <p className="government-note">
                <strong>Looking for official Medicare information?</strong><br />Visit Medicare.gov or call 1-800-MEDICARE.
              </p>
            </div>

            <LeadForm sourcePage="homepage" />
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="page-width faq-grid">
            <div className="faq-heading">
              <p className="section-kicker">CLEAR ANSWERS, NO RUNAROUND</p>
              <h2>Know what to expect before you begin.</h2>
              <p>Good decisions start with clear information—and enough room to make the choice your own.</p>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="page-width closing-inner">
            <div><p className="section-kicker">A BETTER WAY THROUGH INSURANCE</p><h2>Clarity for the road ahead.</h2></div>
            <button className="light-button" type="button" onClick={() => scrollToForm()}>Help Me Compare My Options</button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <a className="brand footer-brand" href="#top" aria-label="Find Senior Insurance home">
              <Image className="brand-mark" src="/logo-mark.png" alt="" width={58} height={58} />
              <span className="brand-copy"><strong>Find Senior Insurance</strong><span>Navigate with confidence</span></span>
            </a>
            <p>Helping seniors navigate life and Medicare insurance with clarity, confidence, and a guide on their side.</p>
            <div className="footer-links">
              <a href="#coverage">Coverage</a>
              <a href="#how-it-works">How it works</a>
              <a href="#faq">Questions</a>
              <a href="/privacy">Privacy Policy</a>
            </div>
          </div>
          <div className="footer-disclosures" id="privacy">
            <p>
              Find Senior Insurance is a private insurance referral service and is not affiliated with or endorsed by the U.S. government, the federal Medicare program, or any state government agency. We do not offer every plan available in your area. Currently, we represent organizations that offer products in select areas. Please contact Medicare.gov, 1-800-MEDICARE, or your local State Health Insurance Assistance Program (SHIP) to get information on all of your options.
            </p>
            <p>
              Product availability, benefits, premiums, and eligibility requirements vary by carrier, plan, state, and applicant. Nothing on this site is a promise of coverage, benefits, or savings. Final expense insurance is a type of life insurance and may include limitations or exclusions. A licensed insurance agent can provide complete product details.
            </p>
            <p>© {new Date().getFullYear()} Find Senior Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <button className="mobile-sticky-cta" type="button" onClick={() => scrollToForm()}>
        Help Me Compare My Options
      </button>
    </div>
  );
}
