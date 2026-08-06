"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const coverageOptions = [
  {
    value: "final-expense",
    eyebrow: "LIFE INSURANCE",
    title: "Final Expense Insurance",
    description:
      "Explore coverage designed to help your family with funeral costs, medical bills, and other end-of-life expenses.",
    bullets: ["Simple coverage options", "Plans for a range of health histories"],
    action: "Explore final expense",
  },
  {
    value: "medicare",
    eyebrow: "HEALTH INSURANCE",
    title: "Medicare Insurance",
    description:
      "Understand private Medicare insurance options that may help with the health care costs and benefits important to you.",
    bullets: ["Clear, one-on-one guidance", "Compare available plan choices"],
    action: "Explore Medicare insurance",
  },
];

const faqs = [
  {
    question: "Is your service really free?",
    answer:
      "Yes. There is no cost to request information or speak with a licensed insurance agent, and you are never obligated to enroll in a plan.",
  },
  {
    question: "Will I be pressured to buy something?",
    answer:
      "Our goal is to help you understand your choices. You decide if and when a policy is right for you. Requesting information does not require you to make a purchase.",
  },
  {
    question: "Can I get help if I already have coverage?",
    answer:
      "Absolutely. You can request a review to better understand your current coverage and learn whether other options may be available in your area.",
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
}

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="trust-strip">
        <div className="page-width trust-strip-inner">
          <span>Free service</span>
          <span aria-hidden="true">•</span>
          <span>No obligation</span>
          <span aria-hidden="true">•</span>
          <span>Personal help from licensed insurance agents</span>
        </div>
      </div>

      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#top" aria-label="Find Senior Insurance home">
            <span className="brand-mark" aria-hidden="true">FSI</span>
            <span className="brand-copy">
              <strong>Find Senior</strong>
              <span>Insurance</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#coverage">Coverage</a>
            <a href="#how-it-works">How it works</a>
            <a href="#faq">Questions</a>
          </nav>

          <button className="header-cta" type="button" onClick={() => scrollToForm()}>
            Get free help
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="page-width hero-grid">
            <div className="hero-copy">
              <p className="section-kicker">INSURANCE GUIDANCE FOR YOUR NEXT CHAPTER</p>
              <h1>Find coverage you can feel good about.</h1>
              <p className="hero-lede">
                Get straightforward help comparing life and health insurance options for seniors—at your pace, with no obligation.
              </p>
              <div className="hero-actions">
                <button className="primary-button" type="button" onClick={() => scrollToForm()}>
                  Find my options
                </button>
                <a className="text-link" href="#coverage">
                  See coverage types <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="reassurance-list" aria-label="Service benefits">
                <li><span aria-hidden="true">✓</span> Easy-to-understand explanations</li>
                <li><span aria-hidden="true">✓</span> Plans based on your needs and location</li>
                <li><span aria-hidden="true">✓</span> Your choice, from start to finish</li>
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
                <span className="photo-note-icon" aria-hidden="true">✓</span>
                <p><strong>Friendly, personal guidance</strong><br />Speak with a licensed insurance agent.</p>
              </div>
              <p className="photo-credit">Photo by Gustavo Fring / Pexels</p>
            </div>
          </div>
        </section>

        <section className="confidence-bar" aria-label="What to expect">
          <div className="page-width confidence-grid">
            <div><strong>Free</strong><span>There is no cost to compare</span></div>
            <div><strong>Simple</strong><span>Plain answers, not insurance jargon</span></div>
            <div><strong>Personal</strong><span>Help based on what matters to you</span></div>
          </div>
        </section>

        <section className="coverage-section" id="coverage">
          <div className="page-width">
            <div className="section-heading centered-heading">
              <p className="section-kicker">START WITH WHAT YOU NEED</p>
              <h2>Two important ways to protect what matters</h2>
              <p>We make it easier to learn about coverage without making you sort through it alone.</p>
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
              <p className="section-kicker">A CLEARER WAY FORWARD</p>
              <h2>Getting help should feel simple.</h2>
              <p>
                You do not have to become an insurance expert. Tell us a little about what you are looking for, and a licensed agent can help you understand the next step.
              </p>
              <button className="secondary-button" type="button" onClick={() => scrollToForm()}>
                Start my free request
              </button>
            </div>
            <ol className="steps-list">
              <li>
                <span className="step-number">1</span>
                <div><h3>Tell us what you need</h3><p>Answer a few basic questions about the type of coverage you want.</p></div>
              </li>
              <li>
                <span className="step-number">2</span>
                <div><h3>Connect with a licensed agent</h3><p>Ask questions and discuss plans that may be available where you live.</p></div>
              </li>
              <li>
                <span className="step-number">3</span>
                <div><h3>Choose with confidence</h3><p>Take your time. You decide whether any option is right for you.</p></div>
              </li>
            </ol>
          </div>
        </section>

        <section className="request-section" id="request-help">
          <div className="page-width request-grid">
            <div className="request-copy">
              <p className="section-kicker">FREE, PERSONALIZED HELP</p>
              <h2>Let&apos;s find the right place to start.</h2>
              <p className="request-lede">
                Complete this short form and a licensed insurance professional can contact you to discuss your options.
              </p>
              <div className="what-you-get">
                <h3>What you can expect</h3>
                <ul>
                  <li><span aria-hidden="true">✓</span> A friendly conversation about your needs</li>
                  <li><span aria-hidden="true">✓</span> Clear answers to your questions</li>
                  <li><span aria-hidden="true">✓</span> No cost and no obligation to enroll</li>
                </ul>
              </div>
              <p className="government-note">
                <strong>Looking for official Medicare information?</strong><br />Visit Medicare.gov or call 1-800-MEDICARE.
              </p>
            </div>

            <div className="form-card">
              {submitted ? (
                <div className="success-message" role="status" tabIndex={-1}>
                  <span className="success-icon" aria-hidden="true">✓</span>
                  <p className="form-step">REQUEST RECEIVED</p>
                  <h3>Thank you. We&apos;re ready to help.</h3>
                  <p>A licensed insurance professional will contact you to talk through your request.</p>
                  <button className="secondary-button" type="button" onClick={() => setSubmitted(false)}>
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="form-step">TAKES ABOUT 2 MINUTES</p>
                  <h3>Request your free insurance review</h3>

                  <fieldset>
                    <legend>What would you like help with?</legend>
                    <div className="radio-grid">
                      <label>
                        <input type="radio" name="coverage" value="final-expense" required />
                        <span>Final expense</span>
                      </label>
                      <label>
                        <input type="radio" name="coverage" value="medicare" required />
                        <span>Medicare insurance</span>
                      </label>
                      <label>
                        <input type="radio" name="coverage" value="both" required />
                        <span>Both</span>
                      </label>
                    </div>
                  </fieldset>

                  <div className="field-row">
                    <label>First name<input type="text" name="firstName" autoComplete="given-name" required /></label>
                    <label>Last name<input type="text" name="lastName" autoComplete="family-name" required /></label>
                  </div>

                  <div className="field-row">
                    <label>ZIP code<input type="text" name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} required /></label>
                    <label>Age range
                      <select name="ageRange" required defaultValue="">
                        <option value="" disabled>Select one</option>
                        <option>50–59</option>
                        <option>60–64</option>
                        <option>65–69</option>
                        <option>70–79</option>
                        <option>80 or older</option>
                      </select>
                    </label>
                  </div>

                  <label>Phone number<input type="tel" name="phone" inputMode="tel" autoComplete="tel" required /></label>
                  <label>Email address <span className="optional">(optional)</span><input type="email" name="email" autoComplete="email" /></label>

                  <label className="consent-label">
                    <input type="checkbox" name="consent" required />
                    <span>
                      I agree that Find Senior Insurance and its insurance partners may contact me at the phone number provided about insurance products, including by phone or text using automated technology. Consent is not a condition of purchase. Message and data rates may apply.
                    </span>
                  </label>

                  <button className="submit-button" type="submit">Request my free review</button>
                  <p className="form-fine-print">Your information is used to respond to your insurance request.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="page-width faq-grid">
            <div className="faq-heading">
              <p className="section-kicker">COMMON QUESTIONS</p>
              <h2>Answers you can understand.</h2>
              <p>Good decisions start with clear information. Here are a few things people often ask us.</p>
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
            <div><p className="section-kicker">MOVE FORWARD WITH CLARITY</p><h2>Let&apos;s make insurance feel easier.</h2></div>
            <button className="light-button" type="button" onClick={() => scrollToForm()}>Find my options</button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-main">
            <a className="brand footer-brand" href="#top" aria-label="Find Senior Insurance home">
              <span className="brand-mark" aria-hidden="true">FSI</span>
              <span className="brand-copy"><strong>Find Senior</strong><span>Insurance</span></span>
            </a>
            <p>Helping seniors find clear, personal guidance for life and health insurance.</p>
            <div className="footer-links">
              <a href="#coverage">Coverage</a>
              <a href="#how-it-works">How it works</a>
              <a href="#faq">Questions</a>
              <a href="#privacy">Privacy &amp; terms</a>
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
        Get free help
      </button>
    </div>
  );
}
