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
