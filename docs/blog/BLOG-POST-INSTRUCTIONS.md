# Blog Post Template – Instructions for AI & Editors

Use this with **`blog/posts/post-template.html`** to create new SEO-optimized articles. Copy it to `blog/posts/[SLUG].html` (same folder) and replace all placeholders. The template uses `../../styles.css` so it loads correctly from `posts/`. Follow these rules for top-tier SEO and consistent UX.

---

## 1. When to Use This

- Creating a **new blog post** under `blog/posts/`.
- You have: **topic**, **target audience**, and (optional) **primary keyword**.
- Output: one new HTML file filled from the template + updates to `blog/index.html` and related posts on 1–2 existing articles.

---

## 2. Your Input (What to Provide)

Give **topic**, **primary keyword**, and **target audience**. Optionally add section ideas or a specific angle. The rest (meta, structure, FAQ, CTAs) follows the template and SEO rules below.

**Example — "How Much Does a Custom Website Cost in 2026":**

| Input | Value |
|-------|--------|
| **Topic** | How much a custom website costs in 2026 |
| **Slug** | `custom-website-cost-2026` (filename: `custom-website-cost-2026.html`) |
| **Primary keyword** | custom website cost 2026 (or "how much does a custom website cost") |
| **Target audience** | Small business owners, startups, and decision‑makers planning a new or redesigned site |
| **Angle / sections** | What drives cost, typical price ranges, what’s included, how to budget, when to hire vs DIY |

Use this as the pattern: **Topic** → **Slug** (lowercase, hyphens) → **Primary keyword** (for H1, first paragraph, one H2, meta) → **Target audience** (tones the copy) → **Sections** (optional; guide the H2s).

---

## 3. File Naming & URL

- **Filename:** `[topic-or-keyword].html` — lowercase, hyphens, no spaces (e.g. `web-performance-tips.html`, `why-choose-framer.html`).
- **No dates in the URL** — keeps URLs evergreen.
- **Slug** = filename without `.html` (use everywhere: canonical, og:url, hreflang, schema).

---

## 4. SEO Requirements (Non-Negotiable)

### Meta & Titles

- **Meta title:** ≤ 60 characters. Include primary keyword near the start; add benefit or year if it fits (e.g. "How to X (Step-by-Step 2025)").
- **Meta description:** ≤ 155 characters. One clear sentence with primary keyword and a CTA or outcome (e.g. "Learn how to… so you can…").
- **Canonical:** `https://www.virtualcreators.io/blog/posts/[SLUG].html`
- **OG & Twitter:** Same title and description as meta; image can stay `vc-logo-32x32.png` unless you have a dedicated hero image.

### Schema (Structured Data)

- **BreadcrumbList:** 3 items — Home, Blog, [Article title].
- **BlogPosting:** headline, description, image, author (Kjell de Ruiter), publisher (VirtualCreators), `datePublished`, `dateModified` (ISO 8601), `mainEntityOfPage`, `keywords` (array, 5–8), `articleSection`, `wordCount` (actual count).
- **FAQPage:** Exactly the same 5 (or more) questions that appear in the on-page FAQ. Each `Question` has `name` and `acceptedAnswer.text`. Match wording to the visible FAQ so rich results are valid.

### Keywords

- **Primary keyword:** In H1, first paragraph, one H2, and meta description.
- **Secondary keywords (5–10):** In H2/H3, body, and `keywords` meta + BlogPosting schema. Use naturally; avoid stuffing.

### Content Structure for SEO

- **One H1 per page** — the article title.
- **H2** for main sections; **H3** for subsections. Use `id` on each H2/H3 that appears in the TOC (e.g. `id="section-name"`).
- **Internal links:** 2–4 to relevant pages (services `../../index.html#services`, work `../../index.html#work`, contact `../../index.html#contact`, other posts in `posts/`). Use descriptive anchor text.
- **First paragraph:** Include primary keyword in the first 100 words; hook + value.

---

## 5. Template Placeholders to Replace

When filling `post-template.html`, replace every placeholder as follows. Save the new file as `blog/posts/[SLUG].html`.

| Placeholder | Example | Rules |
|-------------|---------|--------|
| `[POST_SLUG]` | `web-performance-tips` | Filename without .html; use in all URLs and schema. |
| `[PAGE_TITLE]` | How to Speed Up Your Site (2025 Guide) | ≤60 chars; include primary keyword. |
| `[META_DESCRIPTION]` | Learn how to speed up your website with… | ≤155 chars; one sentence, CTA or outcome. |
| `[KEYWORDS_META]` | web performance, page speed, Core Web Vitals, … | Comma-separated; 5–10 phrases. |
| `[CATEGORY_BADGE]` | Web Development | One category; shown in hero. |
| `[DATE_DISPLAY]` | January 20, 2026 | Publication date, human format. |
| `[DATE_PUBLISHED_ISO]` | 2026-01-20T00:00:00Z | Same date, ISO 8601. |
| `[UPDATED_DISPLAY]` | Updated: January 25, 2026 | Last update; optional. |
| `[DATE_MODIFIED_ISO]` | 2026-01-25T00:00:00Z | Same as updated; or same as published if no update. |
| `[READ_TIME]` | 8 min read | Estimate: ~200 words/min. |
| `[H1_TITLE]` | How to Speed Up Your Website (2025 Guide) | Match or mirror meta title; one H1. |
| `[EXCERPT]` | One or two sentences summarizing the post… | Hero subtitle; 1–2 sentences. |
| `[ARTICLE_SECTION]` | Technology | For schema; e.g. Technology, Design, Business. |
| `[WORD_COUNT]` | 1200 | Actual word count of article body. |
| `[BREADCRUMB_TITLE]` | How to Speed Up Your Website | Short title for BreadcrumbList item 3. |
| `REPLACE_WITH_KEYWORD_ARRAY` | `["web performance", "page speed", "Core Web Vitals"]` | In BlogPosting schema: JSON array of 5–8 keyword strings. |

**Optional:** If you don’t use a separate “updated” date, set `[UPDATED_DISPLAY]` to the same as `[DATE_DISPLAY]` and `[DATE_MODIFIED_ISO]` to `[DATE_PUBLISHED_ISO]`.

Then fill:

- **TOC:** Update the `<ol class="blog-toc-list">` with one `<li><a href="#section-id">Section Title</a></li>` per major H2 (and optionally one for the FAQ). Each target H2/H3 must have the matching `id`.
- **Article body:** Intro, then 5–8 sections with H2/H3, short paragraphs (2–4 sentences), bullet or numbered lists where useful. Add one **tip box** (`.blog-tip-box`) or **framework block** (`.blog-framework`) if it fits. Include 2–4 internal links with descriptive anchor text.
- **Mid-article CTA:** One `.blog-inline-cta` with a short headline, one sentence, and button "Book a free strategy call" → `../../index.html#contact`. Adapt the headline to the topic (e.g. "Want to speed up your site?").
- **FAQ:** One `<section id="[SLUG]-faq" class="blog-faq-section">` with 5 (or more) `.blog-faq-item` Q&As. Each has an `<h3>` (question) and `<p>` (answer). Questions should be phrased for featured snippets (e.g. "How do I…?", "What is…?", "Why does…?").
- **FAQPage schema:** Mirror the same 5+ Q&As in a `<script type="application/ld+json">` FAQPage block in `<head>`.
- **End CTA:** `.blog-end-cta-inner` with heading, one sentence, and two buttons: primary "Schedule a project call" → `../../index.html#contact`, secondary "View case studies" → `../../projects/index.html`. Adapt heading/copy to topic.
- **Related posts:** 3 cards. Each card: link to another post in `posts/`, category label, title, excerpt (short), date, read time. Use existing posts; do not link to the current post.

---

## 6. Content Quality Checklist

- [ ] Primary keyword in H1, first paragraph, one H2, and meta description.
- [ ] Meta title ≤60 chars, meta description ≤155 chars.
- [ ] All H2s (and TOC targets) have unique `id`s; TOC links match (e.g. `#section-id`).
- [ ] Paragraphs 2–4 sentences; lists used where they aid scanning.
- [ ] 2–4 internal links with descriptive anchor text.
- [ ] 5+ FAQ questions; same Q&As in HTML and FAQPage schema.
- [ ] BlogPosting + BreadcrumbList schema filled; dates ISO 8601; wordCount accurate.
- [ ] One mid-article CTA and one end-of-article CTA; copy fits the topic.
- [ ] Related posts: 3 cards pointing to other existing posts.

---

## 7. After Publishing the New Post

1. **Blog index (`blog/index.html`):** Add a new post card in the grid (same structure as existing cards: gradient placeholder, badges, date, title, excerpt, link to `posts/[SLUG].html`).
2. **Related posts on other articles:** On 1–2 existing posts (e.g. the AI post, or the most relevant one), add this new post as one of the 3 related cards (and remove or rotate one existing card so you keep 3 total).
3. **Translations (optional):** If using `data-translate`, add keys to `translations.js` for EN and NL.

---

## 8. Prompt You Can Give an AI

Copy this block and **replace only the input lines** (Topic, Slug, Primary keyword, Target audience) for each new post. The example below is filled for "How Much Does a Custom Website Cost in 2026."

```
Create a new SEO blog post for the VirtualCreators site using:

1. Template: docs/blog/posts/post-template.html — copy to docs/blog/posts/[SLUG].html and fill all placeholders.
2. Instructions: docs/blog/BLOG-POST-INSTRUCTIONS.md — follow every SEO and structure rule (sections 1–7).

Your input:
- Topic: How much a custom website costs in 2026
- Slug: custom-website-cost-2026
- Primary keyword: custom website cost 2026
- Target audience: Small business owners, startups, and decision-makers planning a new or redesigned website
- Tone: Professional but approachable; first-person where it fits (Kjell/author).

Deliverables:
- One complete HTML file at docs/blog/posts/custom-website-cost-2026.html with all placeholders replaced, TOC updated to match H2s, 5+ FAQ Q&As + FAQPage schema, mid and end CTAs, and 3 related posts (use existing posts).
- Meta title ≤60 chars and meta description ≤155 chars.
- Optional: one post card snippet for blog/index.html.
```

For another post, change only: **Topic**, **Slug**, **Primary keyword**, **Target audience**, and the output filename in Deliverables.

---

## 9. Reference: Layout Overview

- **Hero:** Badge row (category) → then one row (date · updated · read time) → H1 → excerpt → author line ("Kjell de Ruiter … UX/UI Designer & Web Developer").
- **Body:** Sticky TOC (left, desktop) + article (right). Article: intro, H2/H3 sections, tip/framework block if needed, mid-article CTA, more sections, FAQ section, end CTA.
- **Related:** 3 cards (same style as blog index: gradient top + badges, dark bottom with date, title, excerpt).
- **Footer:** "Back to Blog" link, then site footer.

Keeping this structure consistent ensures every new post is top-tier SEO and matches the existing blog UX.
