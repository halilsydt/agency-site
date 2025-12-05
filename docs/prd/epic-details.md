# Epic Details

## Epic 1: Project Foundation & Core Layout

**Goal:** Establish the technical foundation, implement the design system, and create reusable layout components. Deliver a deployable skeleton site with working navigation that demonstrates the project is live and functional.

### Story 1.1: Project Setup and Configuration

As a **developer**,
I want **a fully configured Next.js project with Tailwind CSS and proper tooling**,
so that **I can begin building components with consistent styling and development practices**.

**Acceptance Criteria:**
1. Next.js project initialized with TypeScript configuration
2. Tailwind CSS installed and configured with custom theme (colors, fonts, spacing based on PRD branding)
3. ESLint and Prettier configured for code consistency
4. Project structure established (components/, pages/, styles/, public/, content/)
5. Git repository initialized with .gitignore
6. Basic README with project setup instructions
7. `npm run dev` successfully starts development server
8. `npm run build` successfully generates static export

### Story 1.2: Design System Foundation

As a **developer**,
I want **a design system with reusable tokens and base components**,
so that **all pages maintain visual consistency with the brand guidelines**.

**Acceptance Criteria:**
1. Tailwind config includes brand colors (Blue primary, Orange accent, neutrals)
2. Typography scale configured with chosen rounded sans-serif font (Nunito/Poppins/Quicksand)
3. Spacing and border-radius tokens defined for consistent rounded aesthetic
4. Base button component created (primary, secondary, outline variants)
5. Base link/anchor styles defined
6. Container/wrapper component with max-width and responsive padding
7. All tokens documented in a simple style guide page (dev reference, can be hidden in prod)

### Story 1.3: Header and Navigation Component

As a **visitor**,
I want **a sticky header with clear navigation**,
so that **I can easily navigate to any page from anywhere on the site**.

**Acceptance Criteria:**
1. Sticky header that remains visible on scroll
2. Logo placeholder (linked to homepage)
3. Main navigation items: Services (dropdown), Pricing, About, Contact
4. Services dropdown with Amazon Services and Etsy Services links
5. Mobile hamburger menu that opens/closes smoothly
6. Mobile menu displays all navigation items
7. Active page indicator in navigation
8. Header meets accessibility requirements (keyboard navigable, proper ARIA)

### Story 1.4: Footer Component

As a **visitor**,
I want **a footer with contact information and quick links**,
so that **I can find key information and navigate from the bottom of any page**.

**Acceptance Criteria:**
1. Footer displays logo and brief tagline
2. Contact information section (email, location if applicable)
3. Social links (Instagram, LinkedIn, Twitter/X) with icons
4. Quick links to main pages
5. Email signup form placeholder (integration in Epic 3)
6. Links to Privacy Policy and Terms of Service
7. Copyright notice with current year
8. Responsive layout (stacked on mobile, columns on desktop)

### Story 1.5: Base Layout and Initial Deployment

As a **developer**,
I want **a working base layout deployed to production**,
so that **we have a live URL and can demonstrate progress throughout development**.

**Acceptance Criteria:**
1. Layout component combines Header + main content + Footer
2. Minimal homepage with hero section placeholder ("Coming Soon" or basic content)
3. Site deployed to Vercel/Netlify with automatic deploys from main branch
4. HTTPS working with valid SSL certificate
5. Site loads in under 3 seconds
6. Basic meta tags (title, description) configured
7. Favicon placeholder added

---

## Epic 2: Homepage & Service Pages

**Goal:** Build the complete homepage that tells the agency's story and converts visitors, plus the two platform-specific service pages that detail Amazon and Etsy offerings.

### Story 2.1: Homepage Hero Section

As a **visitor**,
I want **an impactful hero section that immediately communicates the agency's value**,
so that **I understand what this agency does and feel compelled to learn more**.

**Acceptance Criteria:**
1. Headline communicating honest, results-driven positioning
2. Subheadline expanding on the value proposition
3. Illustration placeholder (or actual illustration if available)
4. Primary CTA button ("Book Free Consultation" or similar)
5. Secondary CTA option ("View Pricing" or "Learn More")
6. Responsive layout (image/text arrangement adapts to screen size)
7. Hero section is visually compelling with brand colors and typography

### Story 2.2: Homepage Services Overview Section

As a **visitor**,
I want **to see a clear overview of services organized by platform**,
so that **I can quickly navigate to the services relevant to my marketplace**.

**Acceptance Criteria:**
1. Section headline (e.g., "Services for Amazon & Etsy Sellers")
2. Two prominent cards: Amazon Services and Etsy Services
3. Each card has platform icon/illustration, brief description, and CTA link
4. Cards link to respective service pages
5. Visual distinction between the two platforms
6. Responsive: cards stack on mobile, side-by-side on desktop

### Story 2.3: Homepage How It Works Section

As a **visitor**,
I want **to understand the consulting process**,
so that **I know what to expect if I engage with the agency**.

**Acceptance Criteria:**
1. Section headline (e.g., "How It Works")
2. 3-4 steps displayed with icons/numbers
3. Each step has title and brief description
4. Steps: Book Consultation → Get Custom Strategy → Implement & Grow (or similar)
5. Visual flow connecting the steps
6. Responsive layout

### Story 2.4: Homepage Why Choose Us Section

As a **visitor**,
I want **to understand what differentiates this agency**,
so that **I can trust they're different from hype-driven competitors**.

**Acceptance Criteria:**
1. Section headline (e.g., "Why Choose Us")
2. 3-4 differentiators with icons
3. Key points: Honest approach, Real results, Transparent pricing, Platform expertise
4. Brief supporting text for each point
5. Visually distinct from other sections
6. Responsive layout

### Story 2.5: Homepage Results/Proof Section

As a **visitor**,
I want **to see evidence of real client results**,
so that **I can trust the agency delivers on its promises**.

**Acceptance Criteria:**
1. Section headline (e.g., "Real Results from Real Clients")
2. Space for 2-4 anonymized dashboard screenshots
3. Brief caption/context for each result (e.g., "Amazon seller: 3x sales in 6 months")
4. Placeholder images if real screenshots not yet available
5. Clean gallery/grid layout
6. Responsive display

### Story 2.6: Homepage Reviews Section

As a **visitor**,
I want **to read testimonials from previous clients**,
so that **I can hear from others who have worked with the agency**.

**Acceptance Criteria:**
1. Section headline (e.g., "What Our Clients Say")
2. 2-4 testimonial cards
3. Each card has quote text, client name/business (can be anonymized), platform (Amazon/Etsy)
4. Placeholder content if real testimonials not yet available
5. Clean card-based layout
6. Responsive display

### Story 2.7: Homepage Pricing Preview Section

As a **visitor**,
I want **to see a preview of pricing on the homepage**,
so that **I know the agency is transparent and can quickly assess affordability**.

**Acceptance Criteria:**
1. Section headline (e.g., "Transparent Pricing")
2. Brief text emphasizing no hidden costs
3. Starting prices or package teasers for Amazon and Etsy
4. Prominent CTA to full Pricing page
5. Mention of bundle discount as incentive
6. Responsive layout

### Story 2.8: Homepage FAQ Preview Section

As a **visitor**,
I want **to see answers to common questions on the homepage**,
so that **I can get quick answers without navigating away**.

**Acceptance Criteria:**
1. Section headline (e.g., "Common Questions")
2. 3-5 most common FAQ items with expandable answers
3. Accordion/collapsible component for Q&A
4. Link to full FAQ page for more questions
5. Responsive and accessible (keyboard operable)

### Story 2.9: Amazon Services Page

As an **Amazon seller**,
I want **a dedicated page detailing all Amazon-specific services**,
so that **I can understand exactly how the agency can help my Amazon business**.

**Acceptance Criteria:**
1. Page hero with Amazon-focused headline and context
2. List of all Amazon services with descriptions:
   - Account Opening & Setup
   - Product Listing Optimization
   - Amazon Advertising (PPC)
   - Store Optimization
   - Troubleshooting & Account Health
3. Each service has icon, title, and 2-3 sentence description
4. CTA to book consultation or view pricing
5. Consistent styling with homepage
6. SEO meta tags specific to Amazon services

### Story 2.10: Etsy Services Page

As an **Etsy seller**,
I want **a dedicated page detailing all Etsy-specific services**,
so that **I can understand exactly how the agency can help my Etsy shop**.

**Acceptance Criteria:**
1. Page hero with Etsy-focused headline and context
2. List of all Etsy services with descriptions:
   - Shop Setup & Configuration
   - SEO & Search Optimization
   - Etsy Marketing & Promotion
   - Listing Optimization
   - Shop Management & Growth
3. Each service has icon, title, and 2-3 sentence description
4. CTA to book consultation or view pricing
5. Consistent styling with homepage
6. SEO meta tags specific to Etsy services

---

## Epic 3: Content Pages & Integrations

**Goal:** Complete all remaining content pages and integrate all third-party services for forms, booking, email capture, and analytics.

### Story 3.1: Pricing Page

As a **visitor**,
I want **to see all pricing packages clearly displayed**,
so that **I can choose the right service level for my needs and budget**.

**Acceptance Criteria:**
1. Page headline emphasizing transparent pricing
2. Amazon Packages section with 2-3 tiers (e.g., Starter, Growth, Premium)
3. Etsy Packages section with 2-3 tiers
4. Each package shows: name, price, included services, CTA
5. Bundle discount prominently highlighted (both platforms)
6. Visual hierarchy making popular/recommended option stand out
7. CTAs link to contact/booking
8. Responsive pricing cards
9. Placeholder prices if final pricing not confirmed

### Story 3.2: About Us Page

As a **visitor**,
I want **to learn about the agency and team**,
so that **I can trust I'm working with experienced professionals**.

**Acceptance Criteria:**
1. Page headline and intro paragraph
2. Agency story/mission section
3. "Our Approach" section reinforcing honest, results-driven philosophy
4. Team section (if applicable) or founder story
5. Experience highlights (years of experience, clients helped, etc.)
6. Professional but approachable tone
7. CTA to contact or book consultation
8. SEO meta tags

### Story 3.3: Contact Page with Form Integration

As a **visitor**,
I want **to easily contact the agency with questions**,
so that **I can get answers before committing to a consultation**.

**Acceptance Criteria:**
1. Page headline and brief intro
2. Contact form with fields: Name, Email, Platform (Amazon/Etsy/Both), Message
3. Form integrated with form service (Formspree/Netlify Forms/Basin)
4. Form validation (required fields, email format)
5. Success message on submission
6. Error handling for failed submissions
7. Contact email displayed as alternative
8. Responsive form layout

### Story 3.4: Consultation Booking Integration

As a **visitor**,
I want **to book a free consultation directly on the website**,
so that **I can schedule a time that works for me without back-and-forth emails**.

**Acceptance Criteria:**
1. Calendly or Cal.com embed on Contact page
2. Booking widget styled to match site design (as much as platform allows)
3. Clear heading indicating free consultation
4. Booking confirmation works correctly
5. Calendar shows available slots
6. Mobile-friendly booking experience

### Story 3.5: Email Signup Integration

As a **visitor**,
I want **to subscribe to updates without booking a consultation**,
so that **I can stay informed while I make my decision**.

**Acceptance Criteria:**
1. Email signup form in footer (all pages)
2. Optional: dedicated signup section on Contact page
3. Integration with email marketing platform (Mailchimp/ConvertKit/Buttondown)
4. Simple form: email field + submit button
5. Success message on subscription
6. Error handling for invalid email or failed submission
7. GDPR-friendly (brief consent text if needed)

### Story 3.6: FAQ Page

As a **visitor**,
I want **to find answers to common questions**,
so that **I can resolve concerns without needing to contact the agency**.

**Acceptance Criteria:**
1. Page headline
2. 5-10 FAQ items covering common questions
3. Accordion component for expandable answers
4. Categories if needed (General, Amazon, Etsy, Pricing)
5. CTA at bottom to contact if question not answered
6. Accessible accordion (keyboard operable, ARIA attributes)
7. SEO-friendly (questions visible to crawlers)

### Story 3.7: Analytics Integration

As a **business owner**,
I want **analytics tracking on the website**,
so that **I can measure traffic, conversions, and user behavior**.

**Acceptance Criteria:**
1. Google Analytics 4 or Plausible installed
2. Pageview tracking on all pages
3. Event tracking for key actions:
   - Contact form submission
   - Consultation booking initiated
   - Email signup
   - Pricing page views
4. Conversion goals configured (if using GA4)
5. Analytics respects cookie consent (if implemented)
6. Verified data is being collected correctly

---

## Epic 4: Polish, Legal & Launch Prep

**Goal:** Complete all legal requirements, perform quality assurance, optimize for production, and prepare the site for public launch.

### Story 4.1: Privacy Policy Page

As a **visitor**,
I want **to read the privacy policy**,
so that **I understand how my data is collected and used**.

**Acceptance Criteria:**
1. Privacy Policy page accessible from footer
2. Content covers: data collection, cookies, third-party services, user rights
3. Mentions specific integrations (analytics, form services, email marketing)
4. Formatted for readability (headings, sections)
5. Last updated date displayed
6. Placeholder content acceptable if legal review pending

### Story 4.2: Terms of Service Page

As a **visitor**,
I want **to read the terms of service**,
so that **I understand the terms of engaging with the agency**.

**Acceptance Criteria:**
1. Terms of Service page accessible from footer
2. Content covers: service terms, disclaimers, liability limitations
3. Formatted for readability
4. Last updated date displayed
5. Placeholder content acceptable if legal review pending

### Story 4.3: Cookie Consent Implementation

As a **visitor**,
I want **to control cookie preferences**,
so that **my privacy preferences are respected (GDPR compliance)**.

**Acceptance Criteria:**
1. Cookie consent banner appears on first visit
2. Options to accept or decline non-essential cookies
3. Analytics only loads if consent given (or use privacy-focused alternative like Plausible)
4. Consent preference saved (doesn't re-prompt on every page)
5. Link to Privacy Policy from consent banner
6. Banner styling matches site design
7. Can be disabled/simplified if targeting non-EU audience only

### Story 4.4: SEO Optimization

As a **business owner**,
I want **the website optimized for search engines**,
so that **potential clients can find us through organic search**.

**Acceptance Criteria:**
1. Unique title and meta description for each page
2. Open Graph tags for social sharing
3. Semantic HTML structure (proper heading hierarchy)
4. Image alt text for all meaningful images
5. sitemap.xml generated and submitted
6. robots.txt configured appropriately
7. Structured data for organization (JSON-LD)
8. Lighthouse SEO score > 90

### Story 4.5: Accessibility Audit and Fixes

As a **visitor with disabilities**,
I want **the website to be accessible**,
so that **I can use the site regardless of my abilities**.

**Acceptance Criteria:**
1. Lighthouse Accessibility score > 90
2. All interactive elements keyboard accessible
3. Focus indicators visible
4. Color contrast meets WCAG AA (4.5:1 for text)
5. All images have appropriate alt text
6. Forms have proper labels
7. ARIA attributes used correctly where needed
8. Screen reader testing completed (at least one screen reader)

### Story 4.6: Cross-Browser and Responsive Testing

As a **visitor**,
I want **the website to work correctly on my device and browser**,
so that **I have a good experience regardless of how I access the site**.

**Acceptance Criteria:**
1. Tested on Chrome, Firefox, Safari, Edge (latest versions)
2. Tested on mobile (iOS Safari, Android Chrome)
3. Tested at breakpoints: mobile (375px), tablet (768px), desktop (1024px+)
4. All pages render correctly without layout breaks
5. All interactive elements function correctly
6. Images load and display properly
7. Forms submit correctly on all browsers
8. Bug fixes for any issues discovered

### Story 4.7: Performance Optimization

As a **visitor**,
I want **the website to load quickly**,
so that **I don't abandon the site due to slow performance**.

**Acceptance Criteria:**
1. Lighthouse Performance score > 90
2. Page load time < 3 seconds on broadband
3. Images optimized (WebP format, responsive sizes)
4. Fonts optimized (subset, preload)
5. JavaScript bundle minimized
6. CSS purged of unused styles
7. Caching headers configured
8. Core Web Vitals pass (LCP, FID, CLS)

### Story 4.8: Production Launch Checklist

As a **developer**,
I want **all launch requirements verified**,
so that **the site is ready for public announcement**.

**Acceptance Criteria:**
1. Custom domain configured and working
2. SSL certificate valid
3. All placeholder content replaced with real content
4. All links working (no 404s)
5. Forms tested and receiving submissions
6. Booking integration working
7. Analytics receiving data
8. Social links correct
9. Legal pages published
10. Favicon and social images uploaded
11. Site submitted to Google Search Console
12. Backup/recovery plan documented
