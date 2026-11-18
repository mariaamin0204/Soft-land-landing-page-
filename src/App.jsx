import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Play, Apple, Check, Mail, Phone, MapPin } from "lucide-react";

import phoneBack from "./assets/phone-back.png";
import phoneFront from "./assets/phone-front.png";
import feat1 from "./assets/feature-1.png";
import feat2 from "./assets/feature-2.png";
import feat3 from "./assets/feature-3.png";
import stepsImg from "./assets/steps.png";
import ft1 from "./assets/ft-1.png";
import ft2 from "./assets/ft-2.png";
import ft3 from "./assets/ft-3.png";
import ft4 from "./assets/ft-4.png";
import g1 from "./assets/gal-1.png";
import g2 from "./assets/gal-2.png";
import g3 from "./assets/gal-3.png";
import g4 from "./assets/gal-4.png";
import g5 from "./assets/gal-5.png";
import g6 from "./assets/gal-6.png";
import g7 from "./assets/gal-7.png";
import g8 from "./assets/gal-8.png";
import g9 from "./assets/gal-9.png";
import g10 from "./assets/gal-10.png";
import t1 from "./assets/t-1.png";
import t2 from "./assets/t-2.png";
import t3 from "./assets/t-3.png";
import t4 from "./assets/t-4.png";
import t5 from "./assets/t-5.png";

const LINKS = [["home", "Home"], ["about", "About"], ["features", "Features"], ["pricing", "Pricing"]];
const GAL = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10];

/* ---------- hooks ---------- */
function useScrolled(offset = 40) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > offset);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [offset]);
  return s;
}
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
function useVisible() {
  const calc = () => {
    const w = window.innerWidth;
    return w >= 1200 ? 7 : w >= 992 ? 5 : w >= 640 ? 3 : 1;
  };
  const [v, setV] = useState(calc);
  useEffect(() => {
    const f = () => setV(calc());
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}

/* ---------- shared svg style ---------- */
const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" };

/* ---------- Navbar ---------- */
function Navbar() {
  const scrolled = useScrolled();
  const active = useScrollSpy([...LINKS.map((l) => l[0]), "contact"]);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const go = () => { setOpen(false); setDd(false); };
  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="container nav__in">
        <a href="#home" className="logo">SoftLand</a>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        <nav className={`menu ${open ? "menu--open" : ""}`}>
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={go} className={active === id ? "active" : ""}>{label}</a>
          ))}
          <div className={`dd ${dd ? "dd--open" : ""}`} onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)}>
            <a href="#!" onClick={(e) => { e.preventDefault(); setDd(!dd); }}>Dropdown <ChevronDown size={14} /></a>
            <ul>
              {["Dropdown 1", "Deep Dropdown", "Dropdown 2", "Dropdown 3", "Dropdown 4"].map((d) => <li key={d}><a href="#!" onClick={(e) => e.preventDefault()}>{d}</a></li>)}
            </ul>
          </div>
          <a href="#contact" onClick={go} className={active === "contact" ? "active" : ""}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Phones (2 images, animate on load) ---------- */
function Phones() {
  return (
    <div className="phones">
      <img src={phoneBack} alt="App screen" className="phone phone--back" />
      <img src={phoneFront} alt="App screen" className="phone phone--front" />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__in">
        <div className="hero__txt">
          <h1>Promote Your App with SoftLand</h1>
          <p>We are team of talented designers making websites with Bootstrap</p>
          <div className="stores">
            <a href="#!" className="store"><Play size={14} /> Google Play</a>
            <a href="#!" className="store"><Apple size={14} /> App Store</a>
          </div>
        </div>
        <Phones />
      </div>
    </section>
  );
}

/* ---------- About ---------- */
const ICONS = {
  building: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <rect x="22" y="6" width="18" height="36" rx="1" />
      <rect x="6" y="26" width="16" height="16" rx="1" />
      <path d="M3 42h42M27 14h2M33 14h2M27 20h2M33 20h2M27 26h2M33 26h2M27 32h2M33 32h2M11 31h2M17 31h2M11 37h2M17 37h2" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <rect x="9" y="9" width="30" height="34" rx="4" />
      <rect x="18" y="5" width="12" height="7" rx="2" />
      <path d="M14 28h6l3-8 4 14 3-6h4" />
    </svg>
  ),
  command: (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.6">
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <path d="M7 6v36h36M14 34l9-9 6 6 12-14M32 17h9v9" />
    </svg>
  ),
};

function About() {
  const items = [
    ["building", "Eius provident", "Magni repellendus vel ullam hic officia accusantium ipsa dolor omnis dolor voluptatem"],
    ["clipboard", "Rerum aperiam", "Autem saepe animi et aut aspernatur culpa facere. Rerum saepe rerum voluptates quia"],
    ["command", "Veniam omnis", "Omnis perferendis molestias culpa sed. Recusandae quas possimus. Quod consequatur corrupti"],
    ["chart", "Delares sapiente", "Sint et dolor voluptas minus possimus nostrum. Reiciendis commodi eligendi omnis quideme lorenda"],
  ];
  return (
    <section id="about" className="ab">
      <div className="container ab__in">
        <div className="ab__txt reveal left">
          <span className="ab__pill">About Us</span>
          <h2>Ducimus rerum libero reprehenderit cumque</h2>
          <p>Ipsa sint sit. Quis ducimus tempore dolores impedit et dolor cumque alias maxime. Enim reiciendis minus et rerum hic non. Dicta quas cum quia maiores iure. Quidem nulla qui assumenda incidunt voluptatem tempora deleniti soluta.</p>
          <a href="#features" className="ab__btn">
            Read More
            <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
        <div className="ab__cards">
          {items.map(([k, t, d], i) => (
            <div key={t} className="abox reveal up" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="ab__icon">{ICONS[k]}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Save your time (3 cards with icons) ---------- */
const FICONS = {
  server: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <rect x="6" y="9" width="36" height="13" rx="6" />
      <rect x="6" y="26" width="36" height="13" rx="6" />
      <path d="M12 15.5h2M12 32.5h2M19 15.5h10M19 32.5h10" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <circle cx="24" cy="24" r="7" />
      <path d="M24 6v5M24 37v5M6 24h5M37 24h5M11.3 11.3l3.5 3.5M33.2 33.2l3.5 3.5M11.3 36.7l3.5-3.5M33.2 14.8l3.5-3.5" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 48 48" {...stroke} strokeWidth="2.2">
      <rect x="7" y="9" width="34" height="32" rx="4" />
      <path d="M7 19h34M16 5v8M32 5v8M16 32h3M23 32h3M30 26h3M30 32h3" />
    </svg>
  ),
};

function SaveTime() {
  const cards = [
    [feat1, "server", "Explore Your Team", "Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."],
    [feat2, "sun", "Digital Whiteboard", "Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."],
    [feat3, "calendar", "Design To Development", "Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."],
  ];
  return (
    <section id="save-time" className="fs">
      <div className="fs__wrap">
        <div className="fs__head reveal up">
          <h2>Save your time to using SoftLand</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>
        <div className="fs__grid">
          {cards.map(([img, ic, t, d], i) => (
            <div key={t} className="fcard reveal up" style={{ transitionDelay: `${i * 150}ms` }}>
              <img src={img} alt={t} className="fcard__img" />
              <div className="fs__icon">{FICONS[ic]}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Steps (01 / 02 / 03) ---------- */
function Steps() {
  const steps = [
    ["01", "Sign Up", "Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et consectetur ducimus vero placeat"],
    ["02", "Repellat Nihil", "Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest"],
    ["03", "Ad ad velit qui", "Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis"],
  ];
  return (
    <section id="steps" className="st">
      <div className="st__wrap">
        <img src={stepsImg} alt="Steps illustration" className="st__img reveal up" />
        <div className="st__grid">
          {steps.map(([n, t, d], i) => (
            <div key={n} className="st__card reveal up" style={{ transitionDelay: `${i * 150}ms` }}>
              <span className="st__num">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features (4 alternating rows) ---------- */
const CHECK = (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.6"><path d="M4 12.5l5 5L20 6.5" /></svg>
);
const LOREM_IT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const LOREM_P = "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

function Features() {
  const rows = [
    { img: ft1, flip: false, title: "Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.", italic: LOREM_IT,
      list: ["Ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit.", "Ullam est qui quos consequatur eos accusamus."] },
    { img: ft2, flip: true, title: "Corporis temporibus maiores provident", italic: LOREM_IT, text: LOREM_P },
    { img: ft3, flip: false, title: "Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas",
      text: "Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia minima quod. Sunt saepe odit aut quia voluptatem hic voluptas dolor doloremque.",
      list: ["Ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Duis aute irure dolor in reprehenderit in voluptate velit.", "Facilis ut et voluptatem aperiam. Autem soluta ad fugiat."] },
    { img: ft4, flip: true, title: "Quas et necessitatibus eaque impedit ipsum animi consequatur incidunt in", italic: LOREM_IT, text: LOREM_P },
  ];
  return (
    <section id="features" className="ft">
      <div className="ft__wrap">
        <div className="ft__head reveal up">
          <h2>Features</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>
        {rows.map((r, i) => {
          const img = (
            <div className="ft__img reveal up"><img src={r.img} alt={r.title} /></div>
          );
          const txt = (
            <div className="ft__txt reveal up">
              <h3>{r.title}</h3>
              {r.italic && <p className="it">{r.italic}</p>}
              {r.text && <p>{r.text}</p>}
              {r.list && (
                <ul>{r.list.map((x) => <li key={x}>{CHECK}<span>{x}</span></li>)}</ul>
              )}
            </div>
          );
          return (
            <div key={i} className={`ft__row ${r.flip ? "ft__row--flip" : ""}`}>
              {r.flip ? <>{txt}{img}</> : <>{img}{txt}</>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Gallery (carousel) ---------- */
function Gallery() {
  const n = GAL.length;
  const vis = useVisible();
  const half = Math.floor(vis / 2);
  const mid = Math.floor(n / 2);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 3000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section id="gallery" className="gal">
      <div className="gal__head reveal up">
        <h2>Gallery</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
      <div
        className="gal__track reveal up"
        style={{ "--n": vis }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="gal__sizer"><img src={GAL[0]} alt="" /></div>
        {GAL.map((src, i) => {
          const off = ((i - active + n + mid) % n) - mid;
          const hidden = Math.abs(off) > half;
          return (
            <div
              key={i}
              className={`gal__slide ${off === 0 ? "is-active" : ""}`}
              style={{
                "--off": off,
                "--sc": off === 0 ? 1.1 : 1,
                opacity: hidden ? 0 : 1,
                pointerEvents: hidden ? "none" : "auto",
                zIndex: off === 0 ? 2 : 1,
              }}
              onClick={() => setActive(i)}
            >
              <img src={src} alt={`App screen ${i + 1}`} />
            </div>
          );
        })}
      </div>
      <div className="gal__dots">
        {GAL.map((_, i) => (
          <button key={i} className={i === active ? "on" : ""} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const QUOTE = (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
  </svg>
);
const STAR = (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);
const TESTI = [
  { img: t1, name: "Saul Goodman", role: "Ceo & Founder", text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper." },
  { img: t2, name: "Sara Wilsson", role: "Designer", text: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa." },
  { img: t3, name: "Jena Karlis", role: "Store Owner", text: "Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim." },
  { img: t4, name: "Matt Brandon", role: "Freelancer", text: "Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam." },
  { img: t5, name: "John Larson", role: "Entrepreneur", text: "Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid." },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % TESTI.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTI[i];
  return (
    <section id="testimonials" className="tm">
      <div className="tm__head reveal up">
        <h2>Testimonials</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>
      <div
        className="tm__body reveal up"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="tm__slide" key={i}>
          <img className="tm__img" src={t.img} alt={t.name} />
          <h3>{t.name}</h3>
          <h4>{t.role}</h4>
          <div className="tm__stars">
            {[0, 1, 2, 3, 4].map((s) => <span key={s}>{STAR}</span>)}
          </div>
          <p className="tm__quote">
            <span className="qi qi--l">{QUOTE}</span>
            {t.text}
            <span className="qi qi--r">{QUOTE}</span>
          </p>
        </div>
        <div className="tm__dots">
          {TESTI.map((_, k) => (
            <button key={k} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const plans = [["Free", "0", ["Aida dere", "Nec feugiat nisl", "Nulla at volutpat dola"]], ["Business", "19", ["Aida dere", "Nec feugiat nisl", "Nulla at volutpat dola", "Pharetra massa"], true], ["Developer", "29", ["Aida dere", "Nec feugiat nisl", "Nulla at volutpat dola", "Pharetra massa", "Massa ultricies mi"]]];
  return (
    <section id="pricing" className="sec">
      <div className="container">
        <div className="head reveal up"><span className="eyebrow">Pricing</span><h2>Check our Pricing</h2><p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p></div>
        <div className="grid3">
          {plans.map(([n, p, items, pop], i) => (
            <div key={n} className={`card price reveal up ${pop ? "pop" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <h3>{n}</h3><div className="amt"><sup>$</sup>{p}<small>/ month</small></div>
              <ul>{items.map((x) => <li key={x}><Check size={16} /> {x}</li>)}</ul>
              <a href="#contact" className="btn">Buy Now</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ (accordion) ---------- */
const FAQS = [
  ["Non consectetur a erat nam at lectus urna duis?", "Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non."],
  ["Feugiat scelerisque varius morbi enim nunc faucibus?", "Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eleifend leo."],
  ["Dolor sit amet consectetur adipiscing elit pellentesque?", "Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus."],
  ["Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?", "Aperiam itaque sit optio et deleniti eos nihil quidem cumque. Voluptas dolores accusantium dolor. Sed autem iure quis dolorem voluptas cupiditate. Dolore eum et saepe unde necessitatibus."],
  ["Tempus quam pellentesque nec nam aliquam sem et tortor?", "Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in."],
  ["Perspiciatis quod quo quos nulla quo illum ullam?", "Enim ea facilis quaerat voluptas quidem et dolorem. Quis et consequatur non sed in suscipit sequi. Distinctio ipsam dolore et. Quia aperiam qui consequatur ut voluptatem quam repellendus."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq">
      <div className="faq__wrap">
        <div className="faq__head reveal up">
          <h2>Frequently Asked Questions</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>
        <div className="faq__list reveal up">
          {FAQS.map(([q, a], i) => {
            const on = open === i;
            return (
              <div key={q} className={`faq__item ${on ? "is-open" : ""}`}>
                <button className="faq__q" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on}>
                  <span>{q}</span>
                  <svg viewBox="0 0 16 16" {...stroke} strokeWidth="1.3"><path d="M5.5 2.5l5.5 5.5-5.5 5.5" /></svg>
                </button>
                <div className="faq__a"><div><p>{a}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="sec sec--grey">
      <div className="container">
        <div className="head reveal up"><span className="eyebrow">Contact</span><h2>Contact Us</h2><p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p></div>
        <div className="contact">
          <div className="info reveal left">
            {[[MapPin, "Address", "A108 Adam Street, New York, NY 535022"], [Phone, "Call Us", "+1 5589 55488 55"], [Mail, "Email Us", "info@example.com"]].map(([I, t, d]) => (
              <div key={t}><I className="ico" size={22} /><span><b>{t}</b><br />{d}</span></div>
            ))}
          </div>
          <form className="card form reveal up" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="row"><input required placeholder="Your Name" /><input required type="email" placeholder="Your Email" /></div>
            <input required placeholder="Subject" />
            <textarea required rows="5" placeholder="Message" />
            <button className="btn" type="submit">Send Message</button>
            {sent && <p className="ok">Your message has been sent. Thank you!</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
const SOCIALS = [
  ["X", (
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
    </svg>
  )],
  ["Facebook", (
    <svg viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7.6" fill="currentColor" />
      <text x="8.7" y="13.2" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif" fill="#559bce">f</text>
    </svg>
  )],
  ["Instagram", (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1.7" y="1.7" width="12.6" height="12.6" rx="3.6" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="12" cy="4" r=".6" fill="currentColor" />
    </svg>
  )],
  ["Skype", (
    <svg viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7.6" fill="currentColor" />
      <text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="Arial, sans-serif" fill="#559bce">S</text>
    </svg>
  )],
  ["LinkedIn", (
    <svg viewBox="0 0 16 16">
      <rect x="1" y="1" width="14" height="14" rx="2.6" fill="currentColor" />
      <text x="8" y="11.9" textAnchor="middle" fontSize="8.8" fontWeight="700" fontFamily="Arial, sans-serif" fill="#559bce">in</text>
    </svg>
  )],
];

function Footer() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <h3>SoftLand</h3>
        <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
        <div className="foot__social">
          {SOCIALS.map(([name, icon]) => (
            <a key={name} href="#!" aria-label={name} onClick={(e) => e.preventDefault()}>{icon}</a>
          ))}
        </div>
      </div>
      <div className="foot__bottom">
        <p>Copyright <b>SoftLand</b> All Rights Reserved</p>
        <p className="credit">Designed by <a href="https://bootstrapmade.com/" target="_blank" rel="noreferrer">BootstrapMade</a></p>
      </div>
    </footer>
  );
}

/* ---------- Back to top button ---------- */
function ScrollTop() {
  const show = useScrolled(400);
  return (
    <a href="#home" className={`totop ${show ? "show" : ""}`} aria-label="Back to top">
      <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </a>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <Navbar />
      <Hero /><About /><SaveTime /><Steps /><Features /><Gallery /><Testimonials /><Pricing /><Faq /><Contact />
      <Footer />
      <ScrollTop />
    </>
  );
}