# Ibnnak — Online Library

A **read-online library** + owner dashboard, adapted from the Fabrics by Sobia
build (the Sobia shop is a separate site and is **not** touched by anything
here). Same engine — pages, admin dashboard, Firestore, ImgBB photo uploads —
fully re-branded and re-themed for books, with Quotations, Videos and a
dedicated Palmistry section.

**Ibnnak is not a shop. Nothing is for sale on the site.** Visitors browse
books and **read them free on the website** in an on-site reader.
**Downloading** a book's file is the only paid action — and the price is
never shown while browsing: it appears only on that book's separate
download page.

**Want to see the design first?** Open `preview.html` — a self-contained demo
with sample books, quotations, videos and articles; each menu item opens as
its own page in a new tab, mirroring the live structure, including the book
page, the reader and the paid-download page. For the dashboard, open
`admin-preview.html`. Nothing in the previews is in the live site.

## How reading & downloading work

- Every book card (home teaser, Books page, Palmistry page) opens the book's
  own page, `book.html?id=…` — cover gallery, title, author, category, page
  count, description, and two buttons: **Read Online** and **Download**.
  No price and no download button appear anywhere before this page, and no
  price appears on this page either.
- **Read Online** → `read.html?id=…`, the on-site reader. The book's uploaded
  photos are its pages (first photo = cover, the rest = pages, in order),
  shown one at a time with Prev/Next and a "Page X of N" indicator. If a book
  has a **Read URL** instead, that link is embedded in an iframe viewer.
- **Download** → `download.html?id=…`, the only page that shows money: the
  book's **download price**, the owner's payment instructions
  (`paymentNote`), and a **Pay & Download** button that points to the
  owner's `paymentLink` when one is set. The book's file URL
  (`downloadUrl`) is rendered **only on this page**, as the post-payment
  step ("Already paid? → Download your book") — it appears in no other
  page's markup or links.

## Site structure

The top navigation is exactly these six, on every page — and every item is
its **own separate page**. Nothing is stacked as a section on the landing
page; the home page only carries teasers that link out.

1. **Home Page** — `index.html`: hero, Quotation of the Day, a "Fresh on
   the Shelves" teaser (first 4 books) and a "Latest Articles" teaser
   (first 3 articles), plus category cards — the teasers and cards all
   link out to the pages below (category cards open the Books page
   pre-filtered).
2. **Books** — `books.html`: the full library — all books, category filter,
   live search and sorting (newest / title / author). Cards carry cover,
   category, title and author only — no prices, no buttons.
3. **Articles** — `articles.html`: the full article list. Every article
   opens on its own page, `post.html?id=…`, in a **new tab** — never on
   the landing page.
4. **Quotations** — `quotations.html`: quotation cards from the `quotations`
   collection. One quotation is also featured on the home page each day
   ("Quotation of the Day", rotating daily through the owner's own
   collection — there is no hardcoded default quotation once the site is
   connected; if the collection is empty, the strip simply hides).
5. **Videos** — `videos.html`: video cards (YouTube thumbnail + title) from
   the `videos` collection; clicking opens the video on YouTube in a new tab.
6. **Palmistry** — `palmistry.html`: an intro (editable, see below), the
   books in the **Palmistry** category, and every article tagged
   **Palmistry**.

Plus the three per-book pages: `book.html`, `read.html`, `download.html`
(see "How reading & downloading work" above).

## Files

| File | What it is |
|---|---|
| `index.html` | Landing page: hero, Quotation of the Day, book/article teasers + category cards that link out |
| `books.html` | The full library — book grid, category filter, live search, sort |
| `book.html` | A book's own page — gallery, details, Read Online + Download buttons (no price) |
| `read.html` | The online reader — page-image viewer (or embedded Read URL) |
| `download.html` | The paid-download page — the ONLY page showing the download price and the file URL |
| `articles.html` | Article list — cards open `post.html` in a new tab |
| `post.html` | Single article page (opened in a new tab from article cards) |
| `quotations.html` | Quotations page |
| `videos.html` | Videos page |
| `palmistry.html` | Palmistry page (intro + Palmistry books + Palmistry articles) |
| `admin.html` | Owner dashboard (sign-in required) |
| `firebase-config.js` | Firebase project config — **placeholders until go-live** |
| `firestore.rules` / `storage.rules` | Security rules to paste into the Firebase console |
| `preview.html` | Standalone design demo with sample content — mirrors the page-per-section structure and the read/paid-download flow (do not deploy as the library) |
| `admin-preview.html` | Standalone demo of the owner dashboard (design approval only) |

## Data (Firestore collections)

| Collection | Fields | Managed in |
|---|---|---|
| `products` | name (book title), **author**, categoryId, description, **images[]** (cover first, then the book's readable pages, in order; `imageUrl` kept as legacy fallback), **readUrl** (optional — external reader/PDF link; overrides page photos), **downloadUrl** (the book file — rendered only on `download.html`), **downloadPrice** (number — shown only on `download.html`), **pageCount** (optional) | Dashboard → Books |
| `categories` | name, parentId, order | Dashboard → Categories |
| `posts` | title, body, imageUrl, **tag** (tag an article `Palmistry` to feature it on the Palmistry page) | Dashboard → Blog |
| `quotations` | text, author | Dashboard → Quotations |
| `videos` | title, youtubeUrl, description | Dashboard → Videos |
| `siteContent/main` | heroTitle, heroSubtitle, announcement, aboutText, **palmistryIntro**, **paymentNote** (payment instructions shown on the download page), **paymentLink** (optional — where the Pay & Download button points) | Dashboard → Site Content |

## The model change (shop → library)

This build began as a conversion of the Sobia *shop*, and was then corrected
to a library. What that removed and added:

- **Removed — all selling machinery:** prices on cards and the book view,
  sale prices and SALE badges, the cart/bag drawer and counts, format
  options and the "Select Options" buying flow, and the entire WhatsApp
  ordering flow (floating button, order messages, per-page CTAs). There
  is no checkout anywhere on the site.
- **Kept:** the theme (warm paper-cream, ink-green + amber, Fraunces serif)
  with dark/light toggle, the six-page navigation, live search, category
  filters, and the wishlist hearts — now labelled **Saved** (bookmarks in
  the visitor's own browser, localStorage; no accounts, no data collected).
- **Added — the book's own page** (`book.html`), the **online reader**
  (`read.html`, page photos or an embedded Read URL), and the **paid
  download page** (`download.html`) described above.
- **Admin book form** now matches the model: Title, Author, Category,
  **Cover & Page Photos**, Description, **Read URL (optional)**,
  **Download File URL**, **Download Price**, **Pages (optional)**. The old
  Price / Sale Price / Format fields are gone.
- **Site Content** carries `paymentNote` + `paymentLink` instead of any
  WhatsApp ordering setup.
- **Categories:** when no categories exist yet, the library shows seeded
  defaults — Islamic Books, Psychology, Self-Help, Fiction & Novels,
  History, Children's Books, **Palmistry**. The owner can rename/delete/add
  real ones in the dashboard at any time.
- **Firebase:** config is placeholders with TODO comments — Ibnnak gets its
  own project. Without a backend every page degrades gracefully: elegant
  empty states, no crashes. The ImgBB upload key in `admin.html` is also a
  placeholder — Ibnnak needs its **own** free ImgBB key.

## Go-live steps still needed

1. **Firebase project** — create a new project at
   <https://console.firebase.google.com> (do not reuse the Sobia one).
   - Enable **Firestore Database** (production mode) and paste
     `firestore.rules` into Firestore → Rules. (The existing rules already
     cover the `quotations` and `videos` collections — public read,
     signed-in write.)
   - Enable **Authentication → Email/Password**, and create the owner's
     login user.
   - Add a Web app (`</>`) and paste its config into `firebase-config.js`,
     replacing every `PASTE_YOUR_*` value.
2. **ImgBB key** — create a free account at <https://api.imgbb.com> and paste
   the API key over `PASTE_YOUR_IMGBB_API_KEY` in `admin.html` (cover/page
   photo uploads fail until this is done).
3. **GitHub repo + Pages** — create a repo (e.g. `ibnnak`), push this
   folder's files, then Settings → Pages → deploy from the main branch.
   The library will be at `https://<username>.github.io/ibnnak/`, the
   dashboard at `…/admin.html`, and the section/book pages at
   `…/books.html`, `…/book.html`, `…/read.html`, `…/download.html`,
   `…/articles.html`, `…/quotations.html`, `…/videos.html`,
   `…/palmistry.html`.
4. **Payment setup** — sign in to the dashboard → Site Content → write the
   **payment instructions** (paymentNote: how visitors pay you for a
   download) and, if you have one, a **payment link** (paymentLink) for the
   Pay & Download button. No payment setup is needed for reading — reading
   is free.
5. **Content** — in the dashboard: adjust categories if wanted, add real
   books (title, author, cover + page photos in reading order — or a Read
   URL — plus the download file URL and download price), publish articles
   (tag the palmistry ones `Palmistry`), add quotations (these feed the
   home-page Quotation of the Day) and videos, and write the Palmistry
   page intro in Site Content. Everything appears on the site immediately.

## Notes

- No customer accounts and no customer-data collection: the Saved list
  lives in the visitor's own browser (localStorage), same as before.
- Reading is always free and needs no sign-in. Only the file download is
  paid, and its price exists only on `download.html`.
- `preview.html` and `admin-preview.html` are design-approval only — delete
  them from the repo before going live if you don't want the demos public.
