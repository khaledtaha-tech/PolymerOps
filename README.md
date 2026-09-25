# PolymerOps Hub

Bilingual Arabic/English B2B platform for plastics manufacturing services. Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL.

## Site map

- `/ar`, `/en`: landing page
- `/:locale/services`, `/:locale/services/:slug`: service catalog and details
- `/:locale/consulting`: consulting overview
- `/:locale/software`, `/:locale/software/:slug`: tools and availability
- `/:locale/materials`, `/:locale/materials/:slug`: materials guidance
- `/:locale/talent`: separate factory and candidate paths
- `/:locale/insights`, `/:locale/insights/:slug`: technical knowledge
- `/:locale/request`: intake form; `/privacy`, `/terms`, `/contact`
- `/admin`: protected dashboard for branding, content, and requests

## Setup

1. Install Node.js 20+ and PostgreSQL.
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and a random `SESSION_SECRET` of at least 32 characters.
4. Generate a password hash: `node -e "const c=require('node:crypto');const s=c.randomBytes(16).toString('hex');const p=process.argv[1];console.log(s+':'+c.scryptSync(p,s,64).toString('hex'))" 'YOUR_PASSWORD'`. Avoid entering a production password directly in shell history; use a secure method for production.
5. Apply `db/schema.sql` to the database, then optionally apply `db/seed.sql` for a small set of explicitly generic educational content. Example: `psql "$DATABASE_URL" -f db/schema.sql`.
6. `npm run dev` and open `http://localhost:3000`.

Change the brand name in `/admin`. Add or edit content in `/admin/content`; draft items stay private. The initial catalog intentionally contains no software products, prices, testimonials, performance metrics, or invented clients. Add real products only after approval.

## Requests and attachments

Requests are stored in PostgreSQL and reviewed at `/admin/requests`. An optional PDF of up to 2 MB is stored privately in PostgreSQL and can be downloaded only by a signed-in administrator. Do not store attachments in `/public`.

Set `NOTIFY_WEBHOOK_URL` to send a minimal new-request event (`id` and type) to your notification integration. To enable automatic customer acknowledgment and optional administrator notification, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, and `ADMIN_NOTIFY_EMAIL`. Use an address approved by your SMTP provider. If SMTP is not configured, the form still stores the request and shows a receipt; email delivery is not claimed. If SMTP fails after a successful database commit, the request remains available in the admin dashboard.

## Deployment

Deploy on a Node.js host with a persistent PostgreSQL database. Run schema and optional seed SQL before starting. Configure HTTPS and the environment variables on the host. A static hosting plan or PHP-only hosting will not run this application as built. Review the draft legal pages against your actual business entity and data policy before public launch.
