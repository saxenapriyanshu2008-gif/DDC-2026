import Intro from './components/Intro';
import Countdown from './components/Countdown';
import VideoPlayer from './components/VideoPlayer';

const SKYLINE = [
  { w: 1, h: '60px' }, { w: 0.6, h: '110px' }, { w: 1.2, h: '80px' },
  { w: 0.5, h: '120px' }, { w: 1, h: '70px' }, { w: 2, h: '40px' },
  { w: 0.7, h: '100px' }, { w: 1.4, h: '64px' }, { w: 0.5, h: '116px' },
  { w: 1, h: '76px' },
];

const GALLERY = [
  { img: 'bennett.jpg', alt: 'Bennett University', label: 'Where it goes down', title: 'Bennett University' },
  { img: 'city.jpg', alt: 'The City', label: 'Quiet. Not for long.', title: 'The City' },
  { img: 'zero-talking.jpg', alt: 'Zero Talking', label: 'House rule', title: 'Zero Talking' },
  { img: 'getaway.jpg', alt: 'The Getaway Laptop', label: 'Mission 01', title: 'The Getaway Laptop' },
  { img: 'winners.jpg', alt: 'Round 1 Winners', label: 'Fastest crew wins', title: 'Round 1 Winners' },
  { img: 'busted.jpg', alt: 'Busted', label: 'Three shots and you are out', title: 'Busted' },
  { img: 'stakeout.jpg', alt: 'The Stakeout', label: 'Mission 02', title: 'The Stakeout' },
  { img: 'shush.jpg', alt: 'Classified', label: 'Mission 03', title: 'Classified' },
  { img: 'title.jpg', alt: 'Drink. Derive. Code.', label: "DDC'26", title: 'Drink. Derive. Code.' },
  { img: 'stall.jpg', alt: 'The ACM Stall', label: 'Find us on the day', title: 'The ACM Stall' },
];

export default function Home() {
  return (
    <>
      <Intro />

      <header className="site-header container">
        <div className="brand">
          <img src="/assets/acm-bennett-logo.png" alt="ACM Bennett" className="brand__logo" />
          <div className="brand__uni">
            <span className="brand__name">Bennett University</span>
            <span className="brand__sub">ACM Student Chapter</span>
          </div>
          <div className="brand__mark">DDC<span>.</span>26</div>
        </div>
        <nav className="nav" aria-label="Main">
          <a href="#teaser">Teaser</a>
          <a href="#missions">Missions</a>
          <a href="#gallery">Gallery</a>
          <a href="#join">Register</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__sky" aria-hidden="true" />
        <div className="hero__sun" aria-hidden="true" />
        <div className="hero__stripes" aria-hidden="true" />
        <div className="hero__skyline" aria-hidden="true">
          {SKYLINE.map((s, i) => (
            <i key={i} style={{ '--w': s.w, '--h': s.h, '--i': i }} />
          ))}
        </div>
        <div className="hero__content container">
          <p className="eyebrow">ACM Student Chapter &middot; Bennett University presents</p>
          <div className="hero__lockup">
            <h1 className="sr-only">Drink Derive Code</h1>
            <img className="hero__roman" src="/assets/roman-iii.png" alt="Drink Derive Code III" />
          </div>
          <Countdown target="2026-10-29T10:00:00+05:30" />
          <div className="actions">
            <a href="#join" className="btn btn--solid">Register your crew</a>
            <a href="#teaser" className="btn btn--ghost">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M4 2l10 6-10 6z" fill="currentColor" /></svg>
              Watch teaser
            </a>
          </div>
        </div>
      </section>

      <section className="details container" aria-label="Event details">
        <div className="details__grid">
          <div className="details__item"><span>Date</span><strong>29 Oct 2026</strong></div>
          <div className="details__item"><span>Location</span><strong>[VENUE TBA]</strong></div>
          <div className="details__item"><span>Crew size</span><strong>2 players</strong></div>
          <div className="details__item"><span>Missions</span><strong>3 rounds</strong></div>
        </div>
      </section>

      <section id="teaser" className="section container">
        <div className="section__head section__head--split">
          <div>
            <p className="eyebrow">Teaser 1</p>
            <h2 className="h2">The city is waiting.</h2>
          </div>
          <p className="section__note">Two players. One laptop. Three missions. Turn the sound up, it is cut to the beat.</p>
        </div>
        <VideoPlayer src="/assets/ddc-2026-trailer.mp4" poster="/assets/trailer-poster.jpg" label="DDC 2026 official trailer" />
      </section>

      <section id="missions" className="section container">
        <div className="section__head">
          <p className="eyebrow">The job</p>
          <h2 className="h2">Three missions.<br />One crew walks out.</h2>
        </div>
        <div className="missions">
          <article className="mission mission--pink">
            <div className="mission__top"><span className="mission__num">01</span><span className="mission__label">Mission</span></div>
            <h3 className="mission__title">The Getaway Laptop</h3>
            <p>You and your partner sit back to back with one laptop. One player codes while a 15 second timer runs. When it hits zero, the laptop switches hands, finished or not. Keep switching until every problem is solved.</p>
            <ul>
              <li>No talking, signals or notes to your partner</li>
              <li>Break the rule and you take a sour shot</li>
              <li>Fastest crew to solve every problem wins the mission</li>
            </ul>
            <a className="mission__btn" href="[ROUND 1 LINK]">Round 1<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h11M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </article>
          <article className="mission mission--orange">
            <div className="mission__top"><span className="mission__num">02</span><span className="mission__label">Mission</span></div>
            <h3 className="mission__title">The Stakeout</h3>
            <p>You get a few minutes with a secret file you have never seen. Read it, lock it in your head, then hand it back. After that comes the questioning, and the only thing you have is what you remember.</p>
            <ul>
              <li>Unseen passage, short reading time</li>
              <li>No notes, no phones</li>
              <li>Most correct answers wins the mission</li>
            </ul>
            <a className="mission__btn" href="[ROUND 2 LINK]">Round 2<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18"><path d="M3 9h11M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </article>
          <article className="mission mission--teal">
            <div className="mission__top"><span className="mission__num">03</span><span className="mission__label">Mission</span></div>
            <h3 className="mission__title">Classified</h3>
            <p>Nobody gets the brief for this one. Only the crews still standing find out what the final job is, and they find out on the day.</p>
            <div className="redacted">REDACTED</div>
          </article>
        </div>
      </section>

      <section id="heat" className="section container">
        <div className="heat">
          <div className="heat__text">
            <p className="eyebrow">Heat rules</p>
            <h2 className="h2 h2--sm">Three shots<br />and you&rsquo;re busted.</h2>
            <p>Every time your crew talks or signals during a mission, your heat goes up by one and you drink an amla or sour shot. Heat carries across all missions. Hit three and your crew is out of the game.</p>
          </div>
          <div>
            <div className="heat__meter">
              <div className="heat__box heat__box--1"><strong>1</strong><span>Warning</span></div>
              <div className="heat__box heat__box--2"><strong>2</strong><span>Hot</span></div>
              <div className="heat__box heat__box--3"><strong>3</strong><span>Busted</span></div>
            </div>
            <p className="heat__note">Shots are small and non-alcoholic. Tell us at registration if you can&rsquo;t have them and we&rsquo;ll give you a time penalty instead.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery" aria-label="Gallery">
        <div className="gallery__pin">
          <div className="container gallery__head">
            <p className="eyebrow">Gallery</p>
            <h2 className="h2">Explore the city.</h2>
          </div>
          <div className="gallery__viewport">
            <div className="gallery__track">
              {GALLERY.map((c, i) => (
                <figure key={i} className="gcard">
                  <img src={`/assets/gallery/${c.img}`} alt={c.alt} loading="lazy" />
                  <figcaption><span>{c.label}</span><strong>{c.title}</strong></figcaption>
                </figure>
              ))}
              {GALLERY.map((c, i) => (
                <figure key={`dup-${i}`} className="gcard" aria-hidden="true">
                  <img src={`/assets/gallery/${c.img}`} alt="" loading="lazy" />
                  <figcaption><span>{c.label}</span><strong>{c.title}</strong></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="join">
        <div className="container join__inner">
          <p className="eyebrow">Join the crew</p>
          <h2 className="h2 h2--xl">Find a partner.<br /><span className="accent">Keep your mouth shut.</span></h2>
          <p>Registrations open soon. Teams of two, open to all Bennett students.</p>
          <a href="[REGISTRATION LINK]" className="btn btn--solid">Register now</a>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <img src="/assets/acm-bennett-logo.png" alt="ACM Bennett" />
            <span>DDC 2026 &middot; ACM Student Chapter, Bennett University, Greater Noida</span>
          </div>
          <span>Contact: [CONTACT EMAIL]</span>
        </div>
      </footer>
    </>
  );
}
