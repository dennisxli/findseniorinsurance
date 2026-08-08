"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { captureAttribution, LeadAttribution, trackFunnelEvent } from "@/app/lib/attribution";

export type CoverageChoice = "final-expense" | "medicare" | "both";

type LeadFormProps = {
  sourcePage: string;
  defaultCoverage?: CoverageChoice;
  heading?: string;
};

type FormState = {
  coverage: CoverageChoice | "";
  zip: string;
  ageRange: string;
  qualification: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredCallTime: string;
  consent: boolean;
  website: string;
};

const initialForm: FormState = {
  coverage: "",
  zip: "",
  ageRange: "",
  qualification: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredCallTime: "",
  consent: false,
  website: "",
};

const qualificationContent: Record<CoverageChoice, { question: string; options: string[] }> = {
  "final-expense": {
    question: "How much coverage are you considering?",
    options: ["Under $10,000", "$10,000–$20,000", "$20,000–$30,000", "$30,000 or more", "I’m not sure"],
  },
  medicare: {
    question: "Where are you in your Medicare journey?",
    options: ["Turning 65 within 6 months", "Already enrolled in Medicare", "Reviewing coverage during an enrollment period", "Helping a family member", "I’m not sure"],
  },
  both: {
    question: "Which would you like to discuss first?",
    options: ["Final expense", "Medicare insurance", "Both equally", "I’m not sure"],
  },
};

const coverageLabels: Record<CoverageChoice, string> = {
  "final-expense": "Final expense",
  medicare: "Medicare insurance",
  both: "Both",
};

export default function LeadForm({
  sourcePage,
  defaultCoverage,
  heading = "Start your free guidance request",
}: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    ...initialForm,
    coverage: defaultCoverage ?? "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const attributionRef = useRef<LeadAttribution | null>(null);
  const formStartedRef = useRef(false);

  const supportPhoneDisplay = process.env.NEXT_PUBLIC_SUPPORT_PHONE_DISPLAY || "(800) 555-0147";
  const supportPhoneHref = process.env.NEXT_PUBLIC_SUPPORT_PHONE_HREF || "+18005550147";

  useEffect(() => {
    attributionRef.current = captureAttribution(sourcePage);
  }, [sourcePage]);

  const selectedCoverage = form.coverage || defaultCoverage || "both";
  const qualification = useMemo(
    () => qualificationContent[selectedCoverage],
    [selectedCoverage],
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function goToStep(nextStep: number) {
    if (step === 1 && (!form.coverage || !/^\d{5}$/.test(form.zip))) {
      setError("Please choose a coverage type and enter a five-digit ZIP code.");
      return;
    }

    if (step === 2 && (!form.ageRange || !form.qualification)) {
      setError("Please select your age range and answer the guidance question.");
      return;
    }

    trackFunnelEvent("lead_step_completed", {
      completed_step: step,
      coverage: form.coverage,
      source_page: sourcePage,
    });
    setError("");
    setStep(nextStep);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.consent) {
      setError("Please review and accept the contact consent to continue.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          attribution: attributionRef.current ?? captureAttribution(sourcePage),
        }),
      });

      if (!response.ok) throw new Error("Lead delivery failed");

      setSubmitted(true);
      trackFunnelEvent("lead_submitted", {
        coverage: form.coverage,
        source_page: sourcePage,
      });
    } catch {
      setError("We couldn’t save your request right now. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-card success-message" role="status" tabIndex={-1}>
        <span className="success-icon" aria-hidden="true">✓</span>
        <p className="form-step">REQUEST RECEIVED</p>
        <h3>Thank you. Your request is on its way.</h3>
        <p>A licensed insurance professional can contact you to discuss your request.</p>
        <div className="success-callout">
          <span>Prefer to talk now?</span>
          <a href={`tel:${supportPhoneHref}`} onClick={() => trackFunnelEvent("post_submit_phone_clicked", { source_page: sourcePage })}>
            Call {supportPhoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card lead-form-card" id="lead-form">
      <div className="form-progress" aria-label={`Step ${step} of 3`}>
        <div className="form-progress-copy"><strong>Step {step} of 3</strong><span>{step === 1 ? "Where to start" : step === 2 ? "Your priorities" : "How to reach you"}</span></div>
        <div className="form-progress-track" aria-hidden="true"><span style={{ width: `${(step / 3) * 100}%` }} /></div>
      </div>

      <form
        onSubmit={handleSubmit}
        onFocus={() => {
          if (formStartedRef.current) return;
          formStartedRef.current = true;
          trackFunnelEvent("lead_form_started", { source_page: sourcePage });
        }}
      >
        <p className="form-step">THREE SHORT STEPS</p>
        <h3>{heading}</h3>

        {step === 1 && (
          <div className="form-panel">
            {!defaultCoverage ? (
              <fieldset>
                <legend>What would you like help with?</legend>
                <div className="radio-grid">
                  {(Object.keys(coverageLabels) as CoverageChoice[]).map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="coverage"
                        value={value}
                        checked={form.coverage === value}
                        onChange={() => updateField("coverage", value)}
                        required
                      />
                      <span>{coverageLabels[value]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : (
              <div className="selected-product"><span>Guidance requested</span><strong>{coverageLabels[defaultCoverage]}</strong></div>
            )}

            <label>ZIP code
              <input
                type="text"
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                maxLength={5}
                value={form.zip}
                onChange={(event) => updateField("zip", event.target.value.replace(/\D/g, ""))}
                required
              />
              <span className="field-help">Your ZIP helps identify options available where you live.</span>
            </label>

            <button className="submit-button" type="button" onClick={() => goToStep(2)}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-panel">
            <label>Age range
              <select name="ageRange" required value={form.ageRange} onChange={(event) => updateField("ageRange", event.target.value)}>
                <option value="" disabled>Select one</option>
                <option>50–59</option>
                <option>60–64</option>
                <option>65–69</option>
                <option>70–79</option>
                <option>80 or older</option>
              </select>
            </label>

            <fieldset>
              <legend>{qualification.question}</legend>
              <div className="qualification-grid">
                {qualification.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="qualification"
                      value={option}
                      checked={form.qualification === option}
                      onChange={() => updateField("qualification", option)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-navigation">
              <button className="form-back" type="button" onClick={() => setStep(1)}>Back</button>
              <button className="submit-button" type="button" onClick={() => goToStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-panel">
            <div className="field-row">
              <label>First name<input type="text" name="firstName" autoComplete="given-name" value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} required /></label>
              <label>Last name<input type="text" name="lastName" autoComplete="family-name" value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} required /></label>
            </div>

            <label>Phone number<input type="tel" name="phone" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required /></label>
            <label>Email address <span className="optional">(optional)</span><input type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} /></label>
            <label>Best time to call <span className="optional">(optional)</span>
              <select name="preferredCallTime" value={form.preferredCallTime} onChange={(event) => updateField("preferredCallTime", event.target.value)}>
                <option value="">Any time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Early evening</option>
              </select>
            </label>

            <label className="honeypot" aria-hidden="true">Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => updateField("website", event.target.value)} /></label>

            <label className="consent-label">
              <input type="checkbox" name="consent" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} required />
              <span>
                By checking this box and submitting, I provide my prior express written consent for Find Senior Insurance and the licensed insurance partners matched to my request to contact me about insurance products by telephone and text message, including through automated technology or an artificial or prerecorded voice. Consent is not a condition of purchase. Message and data rates may apply. I may revoke consent at any time. See the <a href="/privacy" target="_blank">Privacy Policy</a>.
              </span>
            </label>

            <div className="form-navigation">
              <button className="form-back" type="button" onClick={() => setStep(2)}>Back</button>
              <button className="submit-button" type="submit" disabled={submitting}>{submitting ? "Sending securely…" : "Help Me Compare My Options"}</button>
            </div>
            <p className="form-fine-print">Your information is used to respond to your insurance request.</p>
          </div>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}
      </form>
    </div>
  );
}
