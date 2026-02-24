# Resumeify

## What This Is
A free resume builder that provides genuine value (create professional resumes from templates, download as PDF) while building a flywheel data collection engine. The real value is the workforce intelligence data: career trajectories, skills, salary expectations, job search timing signals, company departures — collected and surfaced via an admin dashboard, ready for export and sale.

## Tech Stack
- **Framework:** Next.js 16+ (App Router) with TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js v5 (beta)
- **PDF Generation:** @react-pdf/renderer
- **Data Export:** xlsx (multi-sheet Excel workbooks)
- **Deployment:** Netlify
- **URL:** tryresumify.com (planned)

## Architecture Principles
- Data collection is the core mission — every field, every interaction is captured
- The user-facing product must be genuinely useful and polished
- Step-by-step wizard flow with live preview (like Invoiceify)
- Admin dashboard shows ALL collected data with full view modals and comprehensive exports
- Same data collection patterns as Invoiceify: IP geolocation, device fingerprinting, behavioral tracking, UTM/referral tracking, session logging

## Project Structure
```
app/
├── api/          # API endpoints (resumes, sessions, auth)
├── admin/        # Admin dashboard pages
├── dashboard/    # User dashboard (saved resumes)
├── create/       # Resume builder wizard
├── login/        # Auth pages
└── signup/
components/
├── wizard/       # Resume builder step components
├── admin/        # Admin dashboard components
└── landing/      # Landing page sections
lib/              # Utilities, DB client, helpers, collector, session-logger
types/            # TypeScript type definitions
prisma/           # Database schema and migrations
scripts/          # Build scripts (Netlify)
```

## Conventions
- Use kebab-case for file names
- Use PascalCase for components
- Use camelCase for functions and variables
- API routes return consistent JSON: `{ success: boolean, data?: any, error?: string }`
- All DB queries go through Prisma — no raw SQL
- Same data collection approach as Invoiceify (collector.ts, session-logger.ts)

## Key Decisions Log
- 2026-02-25: Project created. Same stack as Invoiceify (proven to work well).
- 2026-02-25: Name: Resumeify / tryresumify.com. Focus: workforce intelligence data collection.
