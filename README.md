# Cooper Counseling LLC website

Static multi-page website redesign using HTML, CSS, and JavaScript.

Pages: Home, Meet Tricia, Therapy, Professional Consultations, Resources, and Contact.

## Important before launch

The Contact page embeds Cooper Counseling's production Hushmail Secure Contact Form. Hushmail loads its own form and handles submissions directly; this website does not collect or process inquiry data. Confirm that test submissions reach Tricia's Hushmail account before treating the migration as complete.

All source content, geographic claims, credentials, emergency language, and consultation details should be reviewed by Patricia Cooper before publication.

## Production SEO

Production: https://www.coopercounselingsc.com/

Netlify serves clean routes: `/about`, `/services`, `/professional-consultations`, `/resources`, and `/contact`. `_redirects` consolidates static aliases and the exact public Netlify hostname. Deploy-preview hostnames are preserved. Include `_redirects`, `_headers`, and `404.html` when deploying.

See [SEO-LAUNCH-REPORT.md](SEO-LAUNCH-REPORT.md) for validation results, metadata, geographic information awaiting clinician confirmation, and manual Search Console/Business Profile instructions. Development audit: `node scripts/audit-seo.mjs`; live audit: `node scripts/audit-seo.mjs --live` (Windows curl). Deploy only public website files and assets, not documentation, scripts, or unrelated folders.
