# Find Senior Insurance

A senior-friendly lead-generation website for final expense life insurance and
Medicare insurance guidance. The experience emphasizes clear language, large
type, strong contrast, simple navigation, and an accessible insurance request
form.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

The local address is printed when the development server starts.

## Validation

```bash
npm test
```

The test command creates the production build and verifies that the main
coverage, lead form, and consumer disclosure content render correctly.

## Current scope

- Main senior insurance landing experience
- Dedicated final expense and Medicare paid-traffic pages
- Accessible three-step lead form with conditional qualification
- First-touch and last-touch campaign attribution
- HubSpot form delivery plus optional generic webhook delivery
- Google Analytics funnel events when configured
- Privacy, TCPA-style communications, Medicare, and product disclosures

Copy `.env.example` to `.env.local` for development and add the same required
values to Vercel before collecting real consumer information. The form will not
show a successful submission until a configured destination accepts the lead.
See `docs/lead-funnel.md` for HubSpot setup, attribution fields, pipeline stages,
and revenue reporting.
