# Cooper Counseling LLC: production SEO report

Completed September 18, 2026. Production: https://www.coopercounselingsc.com/

The existing design, navigation labels, logo, photographs, human-focused H1s, treatment copy, and Hushmail embed were preserved. No DNS, email, MX, SPF, DKIM, DMARC, or Wix subscription changes were made. SEO cannot guarantee rankings or indexing.

## 1. Problems found

- Social sharing metadata was incomplete: four pages lacked social titles/descriptions, and all pages lacked sharing images and Twitter card metadata.
- No JSON-LD connected the practice, clinician, website, and services.
- Canonicals and sitemap entries used `.html` aliases while Netlify also served clean routes. Both versions returned 200 before consolidation.
- The public Netlify hostname provided another accessible copy of the site.
- Author metadata identified Patricia instead of website developer Alexander Scott.
- Images lacked intrinsic width/height attributes. Below-fold homepage portrait already used lazy loading.
- CSS used a Google Fonts `@import`, creating an additional discovery chain.
- Missing pages used Netlify's generic 404 rather than helpful practice navigation.
- Some small green text had insufficient contrast on pale backgrounds; the resource strip eyebrow also needed a light color on its dark background.
- Indexed search results still exposed older Wix copy with geographic/licensure claims that conflict with the user's later clarification. Those claims were not copied into current service-area metadata.

No duplicate primary titles/descriptions, broken internal destinations, broken fragment links, duplicate H1s, or index-blocking robots rules were found. Shared navigation/footer text is normal, not problematic duplicate content. Resources and Contact are short but useful purpose-specific pages, not doorway pages.

## 2. Changes made

- Wrote unique purpose-specific titles and descriptions, all descriptions 149 to 158 characters.
- Added complete Open Graph and Twitter summary cards using the existing 512px PNG logo asset. No social account handles were invented.
- Added stable connected entity identifiers for Cooper Counseling LLC and Patricia Cooper, with Tricia as an alternate name.
- Added Alexander Scott as website developer/creator, distinct from the clinician and practice publisher.
- Naturally clarified the clinician's full identity once in the homepage introduction and About introduction.
- Standardized navigation destinations, canonicals, social URLs, and sitemap URLs on existing clean routes.
- Added permanent redirects for static aliases and the exact production Netlify hostname.
- Added a branded, accessible 404 with useful navigation and an actual HTTP 404 response. Only this error page is noindexed.
- Added image dimensions and asynchronous decoding, retained lazy loading below the fold, and preloaded the existing hero image on the two hero pages.
- Replaced font `@import` with direct stylesheet links and connection hints. Retained the same fonts and appearance.
- Added finite asset caching, active-page accessibility markers, an explicitly labeled contact-form region, and small-text contrast improvements within the existing palette.
- Added repeatable validation in `scripts/audit-seo.mjs`.

South Carolina remains factual biographical context on About and its description, not a claim of current licensure or statewide service. The homepage title intentionally does not append a service location until Tricia confirms the current professional scope.

## 3 and 4. Final page titles and descriptions

### Home: `/`

Title: OCD & Anxiety Therapy | Cooper Counseling LLC

Description: Explore OCD and anxiety telehealth therapy with Patricia "Tricia" Cooper at Cooper Counseling LLC, including ERP, I-CBT, ACT, and family support for all ages.

### Meet Tricia: `/about`

Title: Patricia "Tricia" Cooper, LCPC, LPC | Cooper Counseling LLC

Description: Meet Patricia "Tricia" Cooper, LCPC, LPC, the OCD and anxiety therapist at Cooper Counseling LLC. Learn about her approach and South Carolina history.

### Therapy: `/services`

Title: OCD & Anxiety Therapy: ERP, I-CBT & ACT | Cooper Counseling LLC

Description: Learn about ERP, I-CBT, ACT, and CBT for OCD and anxiety at Cooper Counseling LLC, with individual and family support for children, teens, and adults.

### Professional Consultations: `/professional-consultations`

Title: OCD & ERP Professional Consultations | Patricia Cooper

Description: Explore professional consultations with Patricia Cooper for clinicians working with OCD and anxiety, including case discussion and ERP-informed support.

### Resources: `/resources`

Title: OCD, Anxiety & Crisis Resources | Cooper Counseling LLC

Description: Find OCD education, family support, and crisis resources from Cooper Counseling LLC, including the International OCD Foundation and Crisis Text Line.

### Contact: `/contact`

Title: Contact Cooper Counseling LLC | Patricia "Tricia" Cooper

Description: Contact Patricia "Tricia" Cooper at Cooper Counseling LLC through a secure Hushmail form. Ask about therapy or professional consultations, or call Tricia.

## 5. Structured data

Every important page contains a connected JSON-LD graph:

- Organization: Cooper Counseling LLC, production URL, real logo/photo, confirmed phone.
- Person: Patricia Cooper, alternate name Tricia Cooper, confirmed job title, existing LCPC/LPC description, treatment topics, and `worksFor` relationship.
- WebSite: practice publisher and separate developer/creator.
- Page-specific WebPage, AboutPage, or ContactPage.
- Service entities on Therapy and Professional Consultations, with the practice as provider and distinct service descriptions.

Organization was used rather than inventing a public office or LocalBusiness address. No ratings, reviews, license numbers, awards, social profiles, geographic service areas, or unconfirmed founder status were added. Schema.org notes that the general ProfessionalService type is deprecated, so it was not used. [Schema.org reference](https://schema.org/ProfessionalService)

All six page graphs were parsed and checked locally, then combined by stable entity ID and tested in Schema.org's validator: zero errors and zero warnings. This validates the vocabulary, not eligibility for every Google rich result. [Google structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

## 6. Sitemap

https://www.coopercounselingsc.com/sitemap.xml returns 200 and contains exactly the six indexable clean production routes. It excludes the 404, aliases, private previews, obsolete Wix sitemap, and Netlify URLs. Significant-update dates are September 18, 2026. Unnecessary priority hints were removed. [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

## 7. Robots

https://www.coopercounselingsc.com/robots.txt returns 200, allows crawling, and references the production sitemap. It does not block pages, CSS, JavaScript, or images. No verification token was fabricated.

## 8. Canonicals

All six use `https://www.coopercounselingsc.com` plus their clean route. No canonical references Wix, Netlify, or localhost. HTTPS and www are preferred. Sitemap, social URLs, and internal navigation agree with this preference.

## 9. Old Wix routes and redirects

Recovered the actual old Wix `sitemap.xml` and `pages-sitemap.xml` using its previous hosting address without changing DNS. The old sitemap listed `/`, `/about`, `/contact`, and `/resources`. Those routes already have direct equivalents and remain 200; no old-route redirects were needed. Search results also corroborated the old `/about` route. No guessed `/about-us` or other speculative redirects were created.

New permanent redirects in `_redirects`:

| Source | Destination |
| --- | --- |
| `https://cooper-counseling-client-preview.netlify.app/*` | `https://www.coopercounselingsc.com/:splat` |
| `/index.html` | `/` |
| `/index` | `/` |
| `/about.html` | `/about` |
| `/services.html` | `/services` |
| `/professional-consultations.html` | `/professional-consultations` |
| `/resources.html` | `/resources` |
| `/contact.html` | `/contact` |

All seven route redirects returned 301 with the expected destination. The public Netlify hostname returned 301 preserving the requested route. Existing Netlify domain handling returned 301 from apex HTTPS to www HTTPS, and from HTTP to HTTPS. Clean destinations returned 200 with no redirect loops. Deploy-specific preview hostnames are excluded from the hostname redirect. Unmatched pages return 404, not a homepage redirect. [Netlify redirect documentation](https://docs.netlify.com/manage/routing/redirects/overview/)

## 10. Performance and accessibility

Existing efficient AVIF assets were retained unchanged: logo 4,947 bytes, hero 174,099 bytes, portrait 27,281 bytes. No visual-quality tradeoff was needed.

Image dimensions reserve layout space; explicit portrait CSS preserves their prior responsive appearance. Below-fold lazy loading was retained. Hero preload improves early image discovery. Fonts use direct loading, preconnect, and the existing `display=swap` behavior. Small site JavaScript remains deferred. Hushmail's generated script remains untouched and direct from HTTPS.

Asset cache headers were verified live: seven days for `/assets/*`, one day for favicon. CSS/JS and HTML retain revalidation to avoid stale releases; non-fingerprinted files are not marked immutable.

Semantic landmarks, descriptive alt text, heading hierarchy, skip link, native menu button, current-page markers, and labeled secure-form region were checked. Small-text contrast was improved without redesigning. Mobile menu expanded correctly. All six production pages were tested at 390px with no horizontal overflow and one H1. Contact also fit 768px tablet width and the desktop viewport. Crisis guidance remains separate and visible. No console errors were observed in these checks.

This was a source, network, layout, and browser audit, not a certified WCAG audit or measured Lighthouse score. No field Core Web Vitals or representative 28-day CrUX dataset was obtained. Check Search Console Core Web Vitals after traffic accumulates; do not infer an LCP, INP, or CLS score from these improvements alone. The third-party form and fonts remain external performance dependencies by design.

## 11. Content opportunities intentionally not created

- Clinician-reviewed answers about telehealth eligibility, costs/insurance, scheduling, consultation format, and response expectations.
- A substantive OCD/ERP educational page if Tricia can provide original, useful material beyond the current Therapy sections. Do not split current content into thin duplicate pages.
- Professional consultation FAQs distinguishing consultation from therapy, formal supervision, certification, and CE credit, using confirmed terms only.
- Verified professional directory/profile links that reinforce the same clinician and business identity.
- A location statement only after verifying current practice location and lawful telehealth availability.

No new geographic landing pages, invented testimonials, fake reviews, keyword blocks, or ranking promises were added.

## 12. Information to obtain from Tricia

- Current active credentials, issuing boards, license status, and states where clients may legally receive telehealth care.
- Whether South Carolina is the current practice base or only historical context, and the exact wording she approves.
- Whether any genuine face-to-face client contact or public office exists; the website currently says telehealth only.
- Business-name spelling, public phone, public email, hours, and any approved public address.
- Therapy fees, insurance/payment details, age eligibility, consultation availability, expected response times, and professional consultation format/terms.
- Confirmed official directory listings, social profiles, memberships, training, and any credentials she wants published.
- Approval of all counseling content. Website development authorship does not establish clinical authorship or independent review.

## 13. Exact Google Search Console setup

1. Sign in to [Google Search Console](https://search.google.com/search-console) using Tricia's business-controlled Google account.
2. Open the property selector and choose Add property. Select Domain, enter `coopercounselingsc.com` without protocol or www, then Continue.
3. Copy Google's unique DNS TXT verification value. Do not generate or guess it.
4. In Wix's domain DNS editor, add a NEW TXT record at the root host (`@` or blank, as Wix's editor requires). Paste Google's complete value. Do not replace existing TXT records and do not touch nameservers, A/CNAME routing, MX, SPF, DKIM, or DMARC.
5. Save that one verification record, return to Search Console, and click Verify. If propagation is incomplete, wait and retry. Keep the verification TXT after success. These are manual instructions only; no DNS verification record was added in this SEO task. [Google ownership verification instructions](https://support.google.com/webmasters/answer/9008080)
6. In the verified property, open Sitemaps. Submit `https://www.coopercounselingsc.com/sitemap.xml`. Check its status and discovered URLs later. [Google sitemap submission guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
7. Use the URL Inspection box for `https://www.coopercounselingsc.com/`. Select Test live URL. If accessible and indexable, choose Request indexing.
8. Repeat URL Inspection, Test live URL, and Request indexing individually for:
   - `https://www.coopercounselingsc.com/services`
   - `https://www.coopercounselingsc.com/about`
   - `https://www.coopercounselingsc.com/professional-consultations`
   - `https://www.coopercounselingsc.com/resources`
   - `https://www.coopercounselingsc.com/contact`
9. Do not request indexing of `.html` aliases, 404 URLs, or Netlify previews. Monitor Page indexing for exclusions and Google-selected canonicals, then Performance for impressions and search queries. Requests do not guarantee immediate indexing. [Google URL Inspection instructions](https://support.google.com/webmasters/answer/9012289)

No Change of Address request is needed merely for changing hosting while keeping the same domain.

## 14. Google Business Profile actions, manual only

First verify eligibility. Google's guidelines require in-person customer contact; online-only businesses generally are not eligible. Telehealth is not equivalent to visiting clients at their locations. A hidden-address service-area listing is not a workaround for an online-only practice. Do not invent an office, use a mailbox/virtual office, or publish a private home address just to obtain a listing. [Google eligibility guidance](https://support.google.com/business/answer/13763036?hl=en), [Google getting-started guidance](https://support.google.com/business/answer/7039811?hl=en)

If Tricia confirms genuine qualifying in-person services, have her claim or update the legitimate listing using the actual business name, appropriate accurate category, real phone, production website, correct hours, approved photographs, and only truthful location/service-area details. Follow Google's verification process herself. Do not append keywords to the business name or create duplicate listings. Do not solicit confidential patient disclosures in public reviews or respond with treatment information. Have Tricia review professional ethics/privacy requirements before any review activity.

If the practice remains telehealth only, focus on organic search, credible clinician directories, consistent verified professional profiles, and useful reviewed content rather than creating an ineligible Business Profile.

## 15. External limits and remaining work

- Search engines need time to recrawl the redesigned site; search results currently retain older Wix copy. Search Console submission helps discovery but cannot force results.
- A shared business name increases ambiguity. Consistent real clinician identity and trustworthy third-party directory references matter beyond website metadata.
- Current licensure/service geography is not confirmed, limiting safe location-specific optimization.
- Search Console access, indexing status, manual actions, historical backlinks, and directory consistency were not available for account-level audit. Do not assume a penalty or lack of backlinks without evidence.
- Google Business Profile eligibility may limit map visibility if the practice is exclusively online.
- No links, directory edits, profile creations, reviews, or external communications were performed.

## Final deployment and validation

Website changes committed and pushed to the existing GitHub repository. Deployed to the existing Netlify production project; production deploy ID `6aad85f75671618e53dbdd98`.

- All six pages: 200, unique metadata, one H1, production clean-route canonical.
- Sitemap, robots, CSS, JS, favicon, manifest, and public image assets: 200.
- Internal paths and fragment links: passed local validation; route destinations passed live network checks.
- Crisis Text Line and IOCDF resource links: 200.
- Hushmail embed script: HTTPS 200; secure form rendered on the production Contact page.
- Hushmail source embed compared against the prior revision: unchanged. No test inquiry was submitted during this SEO task.
- No important page contains noindex or is robots-blocked. Only the true 404 is noindexed.
- Schema.org combined entity/page validation: zero errors and warnings.
- Mobile navigation and page-width checks: passed. No console errors observed.
- HTTPS, apex, static aliases, and production Netlify hostname redirects: verified.
- Netlify public badge script: absent from production page source.
- A browser visit and ordinary network request both reached the Netlify production site without a forced address override by the end of testing. Some earlier network checks explicitly targeted Netlify during DNS propagation and retained full TLS verification.

The repeatable local/live audit is `scripts/audit-seo.mjs`; it is a development tool and is not deployed with the public website. The unrelated untracked `website-resume-publish/` folder was preserved and excluded from deployment.
