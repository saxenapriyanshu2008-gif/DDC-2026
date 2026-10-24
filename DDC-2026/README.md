# DDC 2026: Drink. Derive. Code.

Event website for **DDC 2026**, run by the ACM Student Chapter at Bennett University on 29 October 2026.

Two players. One laptop. Zero talking. Three missions:

1. **The Getaway Laptop**: relay coding on one laptop with 15 second turns. Fastest crew to solve everything wins.
2. **The Stakeout**: read a secret file, hand it back, answer from memory.
3. **Classified**: revealed on the day.

Talk during a mission and you take an amla or sour shot. Three shots and your crew is busted.

## What's in here

| File | What it does |
| --- | --- |
| `index.html` | The page. Links everything below. |
| `css/style.css` | Site styling |
| `css/intro.css` | Opening intro styling |
| `js/main.js` | Live countdown, pauses the trailer when scrolled away |
| `js/intro.js` | Opening intro (ACM Bennett presents, DDC'26) with Skip and Sound on |
| `assets/` | Logo, Bennett banner, trailer video and poster |

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy

Drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or turn on GitHub Pages for this repo (Settings > Pages > Deploy from branch > `main` / root).

## Still to fill in

Search `index.html` for `[` to find the venue, registration link, contact email and crew names.

---

Designed and built by Priyanshu Saxena for the ACM Student Chapter, Bennett University.
