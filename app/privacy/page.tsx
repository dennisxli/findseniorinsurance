import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Find Senior Insurance",
  description: "Learn how Find Senior Insurance collects, uses, and shares information submitted through our insurance guidance service.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-width">
          <Link className="brand" href="/" aria-label="Find Senior Insurance home">
            <Image className="brand-mark" src="/logo-mark.png" alt="" width={58} height={58} priority />
            <span className="brand-copy"><strong>Find Senior Insurance</strong><span>Navigate with confidence</span></span>
          </Link>
          <Link className="legal-home-link" href="/">Return to home</Link>
        </div>
      </header>

      <main className="legal-width legal-content">
        <p className="section-kicker">PRIVACY &amp; COMMUNICATIONS</p>
        <h1>Privacy Policy</h1>
        <p className="legal-effective">Effective date: August 8, 2026</p>
        <p>
          This Privacy Policy explains how Find Senior Insurance (“we,” “us,” or “our”) collects, uses, discloses, and protects information when you visit findseniorinsurance.com, request insurance guidance, or otherwise communicate with us. By using the website, you acknowledge the practices described here.
        </p>

        <section>
          <h2>Information we collect</h2>
          <p>We may collect information you provide directly, including your name, telephone number, email address, ZIP code, age range, insurance interests, preferred contact time, qualification responses, consent choices, and the content of communications with us or a licensed insurance professional.</p>
          <p>We may also collect technical and marketing information, including IP address, browser and device information, referring website, pages visited, timestamps, cookies, campaign parameters, and advertising identifiers such as GCLID, FBCLID, or MSCLKID.</p>
        </section>

        <section>
          <h2>How we use information</h2>
          <p>We may use information to:</p>
          <ul>
            <li>respond to your request and connect you with a licensed insurance professional;</li>
            <li>identify insurance interests and options that may be available in your area;</li>
            <li>operate, secure, troubleshoot, and improve the website and lead-request process;</li>
            <li>measure advertising, campaign, and referral performance;</li>
            <li>prevent fraud, spam, misuse, or duplicate submissions;</li>
            <li>maintain records of consent, requests, communications, and transactions; and</li>
            <li>comply with legal obligations and enforce our rights.</li>
          </ul>
        </section>

        <section id="insurance-partners">
          <h2>How we share information</h2>
          <p>Find Senior Insurance is a lead-generation and insurance referral service. When you request guidance, we may share your information with one or more licensed insurance agents, agencies, carriers, and other insurance partners that may respond to your request. Those organizations may use your information to contact you, evaluate your needs, discuss insurance products, and maintain their own business and compliance records.</p>
          <p>We may also share information with service providers that support hosting, customer relationship management, communications, call tracking, analytics, advertising measurement, fraud prevention, data security, and professional services. These providers may process information on our behalf under their own contractual and legal obligations.</p>
          <p>We may disclose information when required by law, to protect rights or safety, in connection with a business transaction, or with your direction or consent. We do not promise that information submitted for an insurance request will remain solely with Find Senior Insurance because sharing it with an appropriate insurance professional is a central purpose of the service.</p>
        </section>

        <section>
          <h2>Telephone and text-message consent</h2>
          <p>When you check the consent box and submit a request, you provide prior express written consent for Find Senior Insurance and the licensed insurance partners matched to your request to contact you about insurance products at the telephone number you provided. Contact may include telemarketing calls and text messages made using automated technology, an automatic telephone dialing system, or an artificial or prerecorded voice.</p>
          <p>Your consent is not a condition of purchasing any product or service. Message and data rates may apply, and message frequency may vary. You may revoke consent at any time through any reasonable method that clearly communicates your request. You may reply STOP, QUIT, END, REVOKE, OPT OUT, CANCEL, or UNSUBSCRIBE to a text message, or ask a caller not to contact you again. A request to stop communications will be processed as required by applicable law.</p>
          <p>Submitting a request does not guarantee that an insurance product is available or that a particular agent, agency, or carrier will contact you.</p>
        </section>

        <section>
          <h2>Cookies and advertising attribution</h2>
          <p>We may use cookies, local storage, tags, and similar technologies to remember first-touch and recent campaign information, understand how visitors use the website, measure funnel performance, prevent misuse, and connect a lead or eventual transaction to its marketing source. Third-party analytics and advertising services may set or read their own identifiers according to their policies.</p>
          <p>You can adjust browser settings to limit cookies or clear local storage. Some measurement features may not function as intended after doing so.</p>
        </section>

        <section>
          <h2>Data retention and security</h2>
          <p>We retain information for as long as reasonably necessary for the purposes described in this policy, including responding to requests, maintaining consent and compliance records, resolving disputes, preventing fraud, and supporting business reporting. Retention periods may vary by data type and legal requirement.</p>
          <p>We use reasonable administrative, technical, and organizational safeguards designed to protect information. No website, network, or storage system can be guaranteed completely secure.</p>
        </section>

        <section>
          <h2>Your privacy choices</h2>
          <p>Depending on where you live, you may have rights to request access, correction, deletion, or information about certain uses and disclosures of personal information. You may also have rights to opt out of certain targeted advertising, sales, or sharing of personal information. We may need to verify your identity before completing a request.</p>
          <p>To make a privacy request or ask a question, email <a href="mailto:privacy@findseniorinsurance.com">privacy@findseniorinsurance.com</a>. To stop telephone or text communications, you may also use any reasonable opt-out method described above.</p>
        </section>

        <section>
          <h2>Children, external sites, and Medicare</h2>
          <p>This service is intended for adults and is not directed to children under 13. The website may link to third-party sites that operate under their own privacy practices.</p>
          <p>Find Senior Insurance is a private insurance referral service. It is not affiliated with or endorsed by the U.S. government, the federal Medicare program, or any state government agency. For official Medicare information, visit Medicare.gov or call 1-800-MEDICARE.</p>
        </section>

        <section>
          <h2>Policy changes</h2>
          <p>We may update this policy as our practices or legal obligations change. The effective date at the top will identify the latest version. We will not use previously collected information in a materially different way without providing notice or obtaining consent when required.</p>
        </section>

        <section>
          <h2>Contact us</h2>
          <p>Questions about this policy may be sent to <a href="mailto:privacy@findseniorinsurance.com">privacy@findseniorinsurance.com</a>.</p>
        </section>
      </main>

      <footer className="legal-footer"><div className="legal-width">© {new Date().getFullYear()} Find Senior Insurance. All rights reserved.</div></footer>
    </div>
  );
}
