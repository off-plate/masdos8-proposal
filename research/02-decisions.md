# Review decisions, 2026-08-11

Michael's call after the first full round. **Do not resurrect anything on the cut list
without asking him.** The files stay in git history and nowhere else.

## Level 2, still in play

| | Concept | Why it survived |
|---|---|---|
| gate-2 | Centre lockup | Their badge dead centre over the real room |
| gate-3 | Torn bands | Stacked bands with a CSS torn edge |
| shop-3 | Bone and black | Light ground, hard rules, classic |
| shop-7 | Scatter | Off-grid price tags, tilted plates, spinning badge |
| shop-8 | Split stage | Fixed photo stage, scrolling column, cross-fade |

## Cut

gate-1, shop-1, shop-2, shop-4, shop-5, shop-6.

## Carry forward, explicitly requested

These two are the reason two of the cut pages existed, and Michael asked for both to
continue into the next set even though their parent pages are gone.

1. **The sticky reservation bar** (from shop-4 and shop-5).
   A bar pinned to the bottom of the viewport at every scroll position, carrying the real
   service list with real prices, a date, and a button that composes a WhatsApp message.
   Michael: "I like your sticky idea of reservation and would like to see this element in
   other variants."
   The working implementation is in git at the shop-4 and shop-5 files: a `<select>` of the
   real services with `data-p` prices, a date input defaulted to tomorrow, a live summary
   line, and a `wa.me` link built from both.

2. **Shop-6's palette.**
   Light bone ground `#FBFAF7`, navy ink `#16283F`, burnt orange `#D2762A`, black and white
   photography, 2px radius, serif display. Michael: "I like the colors, again one of the
   future variations should expand on this color."
   Note this is close to shop-3's territory, so a variant built on it should differ from
   shop-3 structurally, not only in palette. Deriving one page from another by find and
   replace has already been rejected twice on this project.

## Standing constraints on this project

- **English only** from 2026-08-11. The CZ/EN switch is dropped.
- Every price is real, from their own booking system. Nothing invented.
- Reviews are genuine Google reviews, quoted with names. 4.8 from 225.
- The Zlatá firma 2025 award is real and is on their plaque, not on their current website.
- Their real badge appears in the header of every page.
- Tattoo and permanent makeup are parked; gateways route to the barbershop.
- Boxy, strictly gridded layouts have been rejected twice. Off-grid and motion-led is the
  direction.

---

# Round 2, 2026-08-11 evening

Michael's feedback on the Level 2 set, and what was done about it.

| His note | What changed |
|---|---|
| Gate 2: the three columns should take half the page | `body{grid-template-rows:minmax(0,1fr) minmax(0,1fr)}`. The doors hold the bottom half and each shows its own photograph at rest, not only on hover. |
| Gate 3: the cutouts are not aligned to each other | The seam is now one cut. Each band except the last is masked with a repeating wedge along its bottom, the next band is pulled up by exactly that distance with a straight top, and earlier bands paint above later ones. Both seams share the same 40px phase. First band top and last band bottom stay flat. |
| Shop 3: the sticky bar should not go to WhatsApp, it is not aligned, design it better | Rebuilt as a reservation bar: one baseline, every control 48px, live total on the right, then name and phone, then a reference number. No `wa.me` link remains anywhere on the page. On a phone it collapses to an 86px summary line that expands when tapped. |
| Shop 7: the hero text should be further left, everything should share one alignment and consistent sizes | One rail for the whole page. `.hd--in` indents are gone, every section heading is one size, and the hero text block no longer auto-centres inside its own max-width, which was what pushed it to the middle of the screen. |
| Shop 7: the images are very ugly, make it more of a gallery | Nine curated stock photographs on a 12 column grid with fixed row height, so every edge lands on the same line. Click opens a lightbox with keyboard navigation. The old "everything here left this room" headline had to go with them: it claimed provenance the stock photography does not have. |
| Shop 7: the price approach is right but it looks floaty, the boxes should be next to each other, these are services you have to sell | The rows touch, share rules and have no pills. The list sits against a sticky photograph that swaps to whatever row you are on, and each row opens the booking with that service selected. |
| Shop 7: the reservations icon is great, it should say Reservations | The ring reads RESERVATIONS · MASDOS8, and it opens a real booking sheet rather than WhatsApp: service, day, a slot grid with taken slots struck through, name, phone, live total, reference. |
| Shop 7: in their own words needs about ten references on a slider | Ten real Google reviews, advancing every five seconds with a progress hairline, pausing on hover and focus, dead under reduced motion. |
| Shop 7: find us is missing a map | OpenStreetMap embed, keyless, inverted to sit on the dark page, with our own pin over the exact address. |
| Shop 8: show me how a visitor switches between the three services | See below. |

## The service switcher, shop 8

The problem: a visitor lands on the gateway, picks barbershop, and is then inside one service
with no way across to the other two.

The answer is a single control in the same place on every page, top left, next to the badge, in
the fixed stage so it never scrolls away. It shows the service you are in, and opens a menu of
all three with a one-line description and a from-price, plus a way back to the gateway. On a
phone the stage scrolls away, so the switcher becomes fixed top right and the wordmark stands
down for it.

**Tattoo and permanent makeup are now real pages**, not placeholders, so the switch can be felt
rather than described. All three are generated by `tools/shop8.mjs` from one template. The
switcher is defined once in that file, which is the one-edit test the web-ship skill demands:
changing the switcher is one edit, in one place, for all three pages.

## Gate fixes made during this round

Two `slop-lint` rules were producing false positives and were fixed rather than waived:

- `dot-grid-mask` fired on any `mask-image: radial-gradient`. Feathering a photograph is
  ordinary craft; the tell is a tiled dot or grid background fading under a mask. The rule now
  needs the tiled pattern to be present in the file.
- `neon-glow` fired on `box-shadow: 0 0 0 14px`, which is a ring with no blur, not a glow. The
  match must now start the shadow.

Both were regression-tested against a fixture that still trips them for the real patterns.
The frosted-glass errors were real: every `backdrop-filter: blur()` was removed and the
surfaces made more opaque instead. The build is `0 errors, 16 warnings`, the warnings being
photo overlay gradients, the tilted marquee and the outlined wordmark, all deliberate.

## Mobile pass, all Level 3 pages

Audited in WebKit at 393x852 and 320x568, every page, scrolled to the bottom first.
`tools/` note: the audit script lives in the session scratchpad, not the repo.

Fixed:
- The index could not fit its rows at 320. It wraps below 620px now.
- Shop 3's price list forced a 320px track inside a padded shell, so it overflowed by 18px
  at 320. `minmax(min(320px,100%),1fr)`.
- Footer and contact links were 19 to 23px tall. Every one is a 44px hit box on a phone.
- Copy at 11.5 and 12px in footers, captions and stat labels is 13px or more on a phone.
- Gate 3's phone number in the gold bar was a 22px target. 44px, and the bar grows to fit.
- Shop 7's portrait was pinned left and sat above the headline on a phone: an inline
  `style="margin:0"` was beating the centring rule. The words come first now, then the
  portrait, and the footer carries enough bottom padding that the badge covers nothing.
- Shop 3's award seal still read "Zlatá firma", and the address still said Praha.

Two audit false positives were fixed in the tool rather than accepted: elements clipped by an
ancestor with `overflow:hidden` (shop 8's crossfading stage photographs sit at scale 1.04) are
no longer reported as overflow.

Final state: 16 page and size combinations, zero findings. slop-lint 0 errors. Every
interactive claim retested on a phone: drawer, booking sheet full width, slot grid, lightbox
with 48px controls, review slider, service switcher.

## Gate 3 cut, 2026-08-12

Michael dropped it after seeing the interlocking seam working. **Gate 2 is the only gateway.**
Shop 3's badge and footer links were repointed to it. The torn-seam technique stays in git
history at the commit above if it is ever wanted for something else.

---

# Round 3, 2026-08-12. Typography, the story, and the About pages

**Gate 2 is the finalist for the entrance.** Gate 3 is gone.

## Typefaces

Michael: shop 3's body face "looks like AI slop" and shop 8's pairing did not work either.
Researched what barbershop lettering actually is, which is 19th century vernacular: Clarendon
slabs, condensed wood type, sign-painter serifs. Both replacements are Fontshare, self-hosted,
and were checked with Czech diacritics rendered before anything was built on them.

| | Display | Text | Why |
|---|---|---|---|
| shop 3 | **Bespoke Slab** 500/700 | **Switzer** 400/500/700 | A Clarendon-style slab is how a barber's window is lettered. Bespoke Slab ships **old-style figures only**, which dance above and below the line, so a rule was set: words in the slab, every number in the grotesque. |
| shop 8 | **Zodiak** 700/900 | **Cabinet Grotesk** 400/500/700 | A modern antique with real bite, lining figures, and nothing in common with shop 3 or shop 7. |

Bebas Neue, Synonym, Panchang and Ranade are removed from the repo.

## Shop 8 takes shop 3's gold

`--gold #C79A2E` on dark, `--gold-d #7E5C10` for text on the paper ground, `--gold-l #E3BA5A`
for hover. The red is gone. Every accent was checked against its real composited background.

## Subtitles

Every kicker above a heading and every helper line under a card title is gone from shop 3,
shop 7 and shop 8. Where a kicker carried a real fact it moved rather than died: shop 7's
address is now a stat, its review count is the heading itself, and shop 8's address sits in
the stage foot next to the phone number.

## The About pages, one per template

Their own story, from `masdos8.com/o-nas`, verified and translated:

- José Luis is Dominican and the **fourth generation** of barbers: father, grandfather,
  great-grandfather. He started as a child.
- He moved to the Czech Republic, worked in several salons, then opened his own.
- He tattoos as well as cuts, which is why the shop is two trades under one badge.
- **The name.** *Más dos* is Spanish for more than two, "because in life we are never alone".
  The eight is infinity, a cycle with no end and no limits.
- The team grows by training new barbers in the shop.

Every page ends on the **Golden Company 2025** plaque, shot in the shop, plus José holding it.
No founding year appears anywhere, because none is published. One was drafted onto shop 7's
hero as an outlined word and removed before it shipped.

## Gates

slop-lint 0 errors. Mobile audit 20 page and size combinations, 0 findings. Contrast checked on
every page against composited backgrounds, 0 findings, which caught four real failures on
shop 3: cream labels on gold buttons at 2.67, the award seal, the stat band on near-black, and
the review stars. The contrast checker itself was treating a 7% overlay as an opaque ground and
was fixed to composite properly.

## Shop 3 cut, 2026-08-12

Killed the day after its typography was replaced. **Two directions remain: shop 7 and shop 8**,
both with an About page, plus gate 2 as the entrance.

Gate 2's three doors used to point at shop 3 and at two dead `#` links. They now point into
shop 8's barbershop, tattoo and permanent makeup pages, so the gateway works end to end for the
first time. If shop 7 wins instead, the barbershop door is a one-line change.

Bespoke Slab and Switzer went with it. Both are still in git history and both are worth keeping
in mind: the slab is the most barbershop-looking face of anything tried here, and the rule it
forced, words in the slab and numbers in the grotesque, is a good rule for any face with
old-style figures.
