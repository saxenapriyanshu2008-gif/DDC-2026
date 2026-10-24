# DDC 2026: Drink. Derive. Code 3.

Event website for **DDC 3.02026**, run by the ACM Student Chapter at Bennett University on 29 October 2026.

Two players. One laptop. Zero talking. Three missions:

1. **The Getaway Laptop**: relay coding on one laptop with 15 second turns. Fastest crew to solve everything wins.
2. **The Stakeout**: read a secret file, hand it back, answer from memory.
3. **Classified**: revealed on the day.

Talk during a mission and you take an amla or sour shot. Three shots and your crew is busted.

## What's in here

| Path | What it does |
| --- | --- |
| `app/page.tsx` | The page (server component) |
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/globals.css` | All styling (site + intro) |
| `app/components/Intro.tsx` | Opening intro with Skip and Sound on |
| `app/components/Countdown.tsx` | Live countdown to the event |
| `app/components/VideoPlayer.tsx` | Trailer video, pauses when scrolled away |
| `public/assets/` | Logo, Bennett banner, trailer video and poster |

## Run it

```
npm install
npm run dev
```

## Deploy

```
npm run build
```

Deploy the `.next` output to Vercel, or use any Node hosting that supports Next.js.

## Still to fill in

Search `index.html` for `[` to find the venue, registration link, contact email and crew names.

---

Designed and built by Priyanshu Saxena for the ACM Student Chapter, Bennett University.
