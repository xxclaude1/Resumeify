# Resumeify — Product Requirements Document

## Vision
A free, professional resume builder that helps job seekers create polished resumes in minutes — while collecting high-value workforce intelligence data (career trajectories, skills, salary expectations, company information, job search timing signals) surfaced through an admin dashboard and exported for sale.

## Design Inspiration
Based on resume-now.com:
- Clean landing page with hero section, template gallery, feature cards, trust badges
- Step-by-step wizard flow (not a single long form)
- Live preview of the resume updating in real-time as you type (shown on the left/right side)
- Multiple professional templates to choose from
- Final step: choose template, download PDF

---

## User Flow

### Landing Page (`/`)
- Hero: "Australia's Top Resume Builder" (localised), big CTAs: "Create your resume" / "Upload existing"
- Trust bar: logos of companies people have gotten hired at
- Template gallery: 6-8 template previews in a grid, clickable
- Features section: "35+ Template Designs", "Enhance with AI", "Resume Review", "Cover Letter Builder", "Resume Tracking"
- FAQ section
- Footer with links

### Resume Builder Wizard (`/create`)
**Step 1 — Personal Info**
- Full name, email, phone, location (city, state/region, country, postcode)
- LinkedIn URL (optional)
- Professional title / headline
- Professional summary / objective (textarea)

**Step 2 — Work Experience**
- Add multiple entries, each with:
  - Job title, company name, location
  - Start date, end date (or "Currently working here" toggle)
  - Description / bullet points (rich text or line-by-line)
- Can reorder entries

**Step 3 — Education**
- Add multiple entries:
  - Degree, field of study, institution name, location
  - Start date, graduation date (or expected)
  - GPA (optional), honors (optional)

**Step 4 — Skills**
- Add skills as tags/chips
- Skill level selector (optional): Beginner, Intermediate, Advanced, Expert
- Suggested skills based on job title (hardcoded suggestions)

**Step 5 — Additional Sections** (optional, pick which to include)
- Certifications (name, issuer, date)
- Languages (language, proficiency level)
- Projects (name, description, URL)
- Volunteer experience (role, organization, dates, description)
- Awards & achievements
- References (name, title, company, contact)

**Step 6 — Template & Download**
- Template picker: 8 templates (Classic, Modern, Minimal, Executive, Creative, Tech, Academic, Bold)
- Live preview updates with selected template
- "Download PDF" button
- "Save Resume" button (creates account or saves to existing)

### Live Preview
- Shown alongside the form at all times (desktop: right side panel, mobile: toggle)
- Updates in real-time as user types
- Shows the resume exactly as it will look in PDF
- Scaled down to fit the panel

### User Dashboard (`/dashboard`)
- List of saved resumes
- Quick actions: edit, duplicate, download PDF, delete
- Account settings

### Admin Dashboard (`/admin`)
Same structure as Invoiceify:
- **Overview**: total resumes, total users, top industries, top skills, avg experience years
- **All Resumes**: searchable list, click to expand, "Full View" button showing ALL collected data
- **Session Explorer**: form sessions with behavioral data
- **Network Intel**: IP geolocation, ISP, org, timezone
- **Behavioral**: field timings, drop-off analysis, scroll depth
- **Workforce Intel**: (NEW — unique to Resumeify)
  - Top companies people are leaving
  - Most common job titles
  - Skills frequency / trending skills
  - Education breakdown (universities, degrees)
  - Career trajectory patterns (job title progressions)
  - Salary distribution (if collected)
  - Geographic job seeker distribution
  - Industry breakdown
- **Export Data**: CSV, JSON, XLSX with ALL fields

---

## Data Collection (The Real Product)

### Resume Data (stored raw, never anonymized)
- Full name, email, phone, location
- Professional headline, summary
- Complete work history: job titles, companies, dates, descriptions
- Complete education: degrees, institutions, dates
- All skills with proficiency levels
- Certifications, languages, projects, volunteer, awards, references
- Template choice, download count

### Derived Intelligence Fields
- `yearsOfExperience` — calculated from work history dates
- `currentCompany` — most recent (no end date) employer
- `currentTitle` — most recent job title
- `previousCompanies` — list of past employers
- `careerLevel` — inferred: Entry/Mid/Senior/Executive
- `industryDetected` — keyword-matched from titles + descriptions
- `skillCount` — total skills listed
- `topSkills` — first 5 skills (user considers most important)
- `educationLevel` — highest: High School/Associate/Bachelor/Master/PhD
- `hasCertifications` — boolean
- `languageCount` — number of languages
- `resumeCompleteness` — % of optional sections filled

### Session & Behavioral Data (same as Invoiceify)
- IP address, IP geolocation (country, city, ISP, org, timezone)
- Device fingerprint (canvas, WebGL, audio hashes, screen, GPU, CPU, memory)
- Behavioral tracking (field timings, edit counts, scroll depth, tab switches, rage clicks, paste detection)
- UTM parameters, traffic source, referrer, landing page
- Returning visitor detection via fingerprint hash

---

## Database Schema (Prisma)

### Models
- **User** — email, name, password, provider, role, createdAt
- **Resume** — userId?, all resume fields (personal info, headline, summary), status, templateId, downloadCount, metadata fields (IP, userAgent, ipGeo, detected fields)
- **WorkExperience** — resumeId, jobTitle, company, location, startDate, endDate, isCurrent, description, sortOrder
- **Education** — resumeId, degree, fieldOfStudy, institution, location, startDate, endDate, gpa, honors, sortOrder
- **Skill** — resumeId, name, level, sortOrder
- **Certification** — resumeId, name, issuer, date
- **Language** — resumeId, name, proficiency
- **Project** — resumeId, name, description, url
- **FormSession** — same as Invoiceify (all tracking fields)
- **FormFieldLog** — same as Invoiceify

### Admin Models
- **ResumeEvent** — resumeId, eventType (created, downloaded, updated, shared), metadata

---

## Templates (8 total)
1. **Classic** — Traditional, serif fonts, clean lines
2. **Modern** — Sans-serif, blue accent, two-column
3. **Minimal** — Lots of whitespace, monochrome
4. **Executive** — Dark header, gold accents, formal
5. **Creative** — Colorful sidebar, icons for sections
6. **Tech** — Monospace elements, skill bars, GitHub-style
7. **Academic** — Publications-friendly, formal layout
8. **Bold** — Large name, bright accent colors

---

## Implementation Phases

### Phase 1: Foundation
- Next.js project setup (done)
- Prisma schema + migration
- Landing page (hero, templates, features, FAQ)
- Basic auth (signup, login, NextAuth)

### Phase 2: Resume Builder
- Wizard context + state management
- Steps 1-6 with all fields
- Live preview component
- Template system (8 templates)
- PDF generation with @react-pdf/renderer

### Phase 3: Data Collection Engine
- collector.ts (fingerprint, referral, behavioral tracker) — port from Invoiceify
- session-logger.ts — port from Invoiceify
- API routes: POST/PUT sessions, POST/GET/DELETE resumes
- IP geolocation on save
- Wire behavioral tracking into wizard

### Phase 4: Admin Dashboard
- Admin layout + sidebar
- Overview page with stats
- All Resumes page with full view modal (ALL data)
- Session Explorer
- Network Intel
- Behavioral Analytics
- Workforce Intelligence (unique analytics)
- Export Data (CSV, JSON, XLSX)

### Phase 5: Polish & Deploy
- Netlify deployment config
- Mobile responsive
- SEO meta tags
- Performance optimization
