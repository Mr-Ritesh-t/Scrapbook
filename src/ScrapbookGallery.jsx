import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Lato:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --pink-50: #fff0f5;
    --pink-100: #ffe0ec;
    --pink-200: #ffc0d9;
    --pink-300: #ff8fb5;
    --pink-400: #ff5c92;
    --lavender-50: #f5f0ff;
    --lavender-100: #ede0ff;
    --lavender-200: #d8c0ff;
    --cream: #fffaf5;
    --warm-white: #fffcf8;
    --peach: #fff3ee;
  }

  body { background: transparent; }

  .scrapbook-section {
    background: linear-gradient(135deg, #fff5f9 0%, #fdf0ff 30%, #fff8f0 60%, #f5f0ff 100%);
    min-height: 100vh;
    padding: 60px 20px 80px;
    position: relative;
    overflow: hidden;
    font-family: 'Lato', sans-serif;
  }

  /* ── floating background hearts ── */
  .bg-float {
    position: absolute;
    pointer-events: none;
    z-index: 0;
    animation: floatUp linear infinite;
    opacity: 0;
  }
  @keyframes floatUp {
    0%   { transform: translateY(0) rotate(0deg) scale(1);   opacity: 0; }
    10%  { opacity: 0.35; }
    90%  { opacity: 0.2; }
    100% { transform: translateY(-110vh) rotate(25deg) scale(1.2); opacity: 0; }
  }

  /* ── sparkle dots ── */
  .sparkle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: twinkle ease-in-out infinite;
  }
  @keyframes twinkle {
    0%, 100% { transform: scale(0.6); opacity: 0.3; }
    50%       { transform: scale(1.4); opacity: 0.9; }
  }

  /* ── header ── */
  .section-header {
    text-align: center;
    margin-bottom: 56px;
    position: relative;
    z-index: 2;
  }
  .header-deco {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 10px;
  }
  .header-line {
    height: 1.5px;
    width: 80px;
    background: linear-gradient(90deg, transparent, #f472b6, transparent);
    border-radius: 2px;
  }
  .header-heart-icon {
    font-size: 22px;
    animation: heartbeat 1.6s ease-in-out infinite;
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14%       { transform: scale(1.3); }
    28%       { transform: scale(1); }
    42%       { transform: scale(1.2); }
  }
  .section-title {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(38px, 7vw, 62px);
    font-weight: 700;
    background: linear-gradient(135deg, #e91e8c 0%, #c026d3 40%, #9333ea 80%, #e879a0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    letter-spacing: -0.5px;
  }
  .section-subtitle {
    font-family: 'Caveat', cursive;
    font-size: clamp(17px, 2.5vw, 22px);
    color: #b06090;
    margin-top: 10px;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  .title-flowers {
    margin-top: 14px;
    display: flex;
    justify-content: center;
    gap: 8px;
    font-size: 20px;
    animation: gentleSway 3s ease-in-out infinite;
  }
  @keyframes gentleSway {
    0%, 100% { transform: rotate(-3deg); }
    50%       { transform: rotate(3deg); }
  }

  /* ── grid ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 22px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    align-items: start;
  }

  /* ── base card ── */
  .card {
    position: relative;
    border-radius: 3px;
    transition: transform 0.35s cubic-bezier(.23,1.4,.32,1), box-shadow 0.35s ease;
    cursor: pointer;
    will-change: transform;
  }
  .card:hover { z-index: 10; }

  /* ── polaroid ── */
  .polaroid {
    background: #fffcf8;
    padding: 12px 12px 36px;
    box-shadow: 2px 4px 18px rgba(200,100,160,0.18), 0 1px 3px rgba(0,0,0,0.08);
    border: 1px solid rgba(255,200,220,0.4);
  }
  .polaroid:hover {
    transform: scale(1.07) rotate(0deg) !important;
    box-shadow: 4px 10px 32px rgba(180,80,140,0.28), 0 2px 6px rgba(0,0,0,0.1);
  }
  .polaroid-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: linear-gradient(135deg, #ffd6e8 0%, #e8c0f0 50%, #c0d4f8 100%);
    border-radius: 1px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .polaroid-img-wide {
    aspect-ratio: 4 / 3;
  }
  .polaroid-img-tall {
    aspect-ratio: 3 / 4;
  }
  .polaroid-caption {
    font-family: 'Caveat', cursive;
    font-size: 15px;
    color: #c06090;
    text-align: center;
    margin-top: 8px;
    line-height: 1.3;
    font-weight: 600;
  }

  /* tape strips */
  .tape {
    position: absolute;
    height: 22px;
    background: rgba(255, 220, 230, 0.65);
    border: 1px solid rgba(255,180,200,0.5);
    border-radius: 2px;
    z-index: 3;
    backdrop-filter: blur(1px);
  }
  .tape-top-center { width: 55px; top: -11px; left: 50%; transform: translateX(-50%) rotate(-2deg); }
  .tape-top-left   { width: 48px; top: -11px; left: 14%; transform: rotate(-8deg); }
  .tape-top-right  { width: 48px; top: -11px; right: 14%; transform: rotate(6deg); }
  .tape-lavender   { background: rgba(220, 190, 255, 0.65); border-color: rgba(190,150,240,0.5); }
  .tape-peach      { background: rgba(255, 220, 190, 0.65); border-color: rgba(240,190,150,0.5); }

  /* heart sticker */
  .heart-sticker {
    position: absolute;
    font-size: 18px;
    z-index: 4;
    animation: stickerWiggle 2.5s ease-in-out infinite;
  }
  @keyframes stickerWiggle {
    0%, 100% { transform: rotate(-10deg) scale(1); }
    50%       { transform: rotate(10deg) scale(1.15); }
  }

  /* ── love letter card ── */
  .letter-card {
    background: linear-gradient(145deg, #fff9fc 0%, #ffeef5 60%, #f8f0ff 100%);
    border: 1.5px solid rgba(255,180,210,0.5);
    border-radius: 4px;
    padding: 22px 20px 20px;
    box-shadow: 2px 4px 16px rgba(200,100,160,0.14), inset 0 0 30px rgba(255,220,235,0.3);
    position: relative;
    overflow: visible;
  }
  .letter-card:hover {
    transform: scale(1.05) rotate(0deg) !important;
    box-shadow: 4px 8px 28px rgba(180,80,140,0.22);
  }
  .letter-lines {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    overflow: hidden;
    pointer-events: none;
  }
  .letter-lines::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(transparent, transparent 27px, rgba(220,160,190,0.12) 27px, rgba(220,160,190,0.12) 28px);
    margin-top: 28px;
  }
  .letter-envelope-icon {
    font-size: 20px;
    margin-bottom: 10px;
    display: block;
  }
  .letter-text {
    font-family: 'Caveat', cursive;
    font-size: 16px;
    color: #9b4d72;
    line-height: 1.65;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
  .letter-sig {
    font-family: 'Dancing Script', cursive;
    font-size: 15px;
    color: #d06090;
    margin-top: 12px;
    text-align: right;
    position: relative;
    z-index: 1;
  }

  /* ── note / diary card ── */
  .note-card {
    background: #fffde7;
    border: 1.5px solid rgba(255, 220, 150, 0.6);
    border-radius: 2px;
    padding: 18px 16px 16px;
    box-shadow: 2px 4px 14px rgba(200,160,60,0.12);
    position: relative;
  }
  .note-card::before {
    content: '';
    position: absolute;
    top: 0; left: 28px;
    width: 1.5px; height: 100%;
    background: rgba(255,150,150,0.25);
    border-radius: 1px;
  }
  .note-card:hover {
    transform: scale(1.05) rotate(0deg) !important;
    box-shadow: 3px 7px 22px rgba(200,160,60,0.22);
  }
  .note-text {
    font-family: 'Caveat', cursive;
    font-size: 16px;
    color: #8b5c2a;
    line-height: 1.7;
    font-weight: 500;
    padding-left: 14px;
  }
  .note-date {
    font-family: 'Caveat', cursive;
    font-size: 12px;
    color: #c09060;
    margin-bottom: 8px;
    padding-left: 14px;
  }

  /* ── photo + note side card ── */
  .side-card {
    background: #fffcf8;
    border: 1px solid rgba(255,200,220,0.4);
    box-shadow: 2px 4px 18px rgba(200,100,160,0.15);
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }
  .side-card:hover {
    transform: scale(1.05) !important;
    box-shadow: 4px 8px 28px rgba(180,80,140,0.22);
  }
  .side-card-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: linear-gradient(135deg, #ffd0e8 0%, #d0c0f0 50%, #c0e8ff 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .side-card-body {
    padding: 14px 16px 16px;
  }
  .side-card-caption {
    font-family: 'Caveat', cursive;
    font-size: 16px;
    color: #b06080;
    font-weight: 600;
    line-height: 1.4;
  }
  .side-card-sub {
    font-family: 'Caveat', cursive;
    font-size: 13px;
    color: #c090aa;
    margin-top: 4px;
  }

  /* ── image placeholder content ── */
  .img-placeholder-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: rgba(180,100,140,0.5);
    font-family: 'Caveat', cursive;
    font-size: 13px;
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
  }
  .img-placeholder-icon { font-size: 28px; opacity: 0.6; }

  /* ── glow ring on some cards ── */
  .glow-ring::after {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 6px;
    border: 2px solid rgba(240,100,160,0.25);
    animation: glowPulse 2.5s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50%       { opacity: 0.8; transform: scale(1.02); }
  }

  /* ── fade-in scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px) rotate(var(--tilt, 0deg));
    transition: opacity 0.65s ease, transform 0.65s cubic-bezier(.23,1.4,.32,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0) rotate(var(--tilt, 0deg));
  }

  /* ── floating card animation ── */
  .float-card {
    animation: cardFloat ease-in-out infinite;
  }
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0) rotate(var(--tilt, 0deg)); }
    50%       { transform: translateY(-6px) rotate(var(--tilt, 0deg)); }
  }

  /* ── responsive col spans ── */
  .col-3  { grid-column: span 3; }
  .col-4  { grid-column: span 4; }
  .col-6  { grid-column: span 6; }
  .col-8  { grid-column: span 8; }
  .col-12 { grid-column: span 12; }

  @media (max-width: 900px) {
    .gallery-grid { grid-template-columns: repeat(6, 1fr); gap: 16px; }
    .col-3  { grid-column: span 3; }
    .col-4  { grid-column: span 3; }
    .col-6  { grid-column: span 6; }
    .col-8  { grid-column: span 6; }
    .col-12 { grid-column: span 6; }
  }
  @media (max-width: 600px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .col-3, .col-4, .col-6, .col-8, .col-12 { grid-column: span 2; }
    .scrapbook-section { padding: 40px 14px 60px; }
  }

  /* ── decorative doodle flowers ── */
  .flower-doodle {
    position: absolute;
    font-size: 28px;
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
    animation: spinSlow 12s linear infinite;
  }
  @keyframes spinSlow {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ── bottom ribbon ── */
  .ribbon-bottom {
    text-align: center;
    margin-top: 56px;
    position: relative;
    z-index: 2;
  }
  .ribbon-text {
    font-family: 'Dancing Script', cursive;
    font-size: clamp(20px, 3vw, 28px);
    background: linear-gradient(135deg, #d946a8, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  /* ── custom img overlay gradient ── */
  .img-overlay {
    position: absolute;
    inset: 0;
    opacity: 0.55;
    pointer-events: none;
  }
`;

/* ─── Floating background hearts ─── */
function FloatingHearts() {
  const hearts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 4.3) % 90}%`,
    size: 10 + (i % 5) * 5,
    dur: 12 + (i % 7) * 3,
    delay: (i * 1.1) % 14,
    char: ["❤️","💕","💗","💖","💓","✨","⭐","💫"][i % 8],
  }));
  return (
    <>
      {hearts.map(h => (
        <div
          key={h.id}
          className="bg-float"
          style={{
            left: h.left,
            bottom: "-40px",
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.char}
        </div>
      ))}
    </>
  );
}

/* ─── Sparkle dots ─── */
function Sparkles() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${(i * 13.7) % 100}%`,
    left: `${(i * 17.3 + 7) % 100}%`,
    size: 3 + (i % 4),
    dur: 2 + (i % 4) * 0.8,
    delay: (i * 0.4) % 4,
    color: ["#f9a8d4","#c4b5fd","#fda4af","#fbcfe8","#ddd6fe","#fde68a"][i % 6],
  }));
  return (
    <>
      {dots.map(d => (
        <div
          key={d.id}
          className="sparkle"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── Image placeholder ─── */
function ImgPlaceholder({ gradient, emoji = "📷" }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span style={{ fontSize: 32, opacity: 0.45 }}>{emoji}</span>
      <span
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 12,
          color: "rgba(160,80,120,0.5)",
        }}
      >
        your photo here
      </span>
    </div>
  );
}

/* ─── Reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Individual card wrappers ─── */
function PolaroidCard({ col, tilt = 0, delay = 0, glow, tape = "center", tapeColor, caption, gradient, emoji, imgClass, floatDelay, children }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card polaroid reveal ${visible ? "visible" : ""} ${glow ? "glow-ring" : ""} ${col}`}
      style={{
        "--tilt": `${tilt}deg`,
        transitionDelay: `${delay}s`,
        animationDelay: `${floatDelay ?? delay}s`,
        animationDuration: `${3 + (delay % 2)}s`,
      }}
    >
      <div className={`tape tape-top-${tape} ${tapeColor ?? ""}`} />
      {glow && <span className="heart-sticker" style={{ top: -12, right: -10 }}>💗</span>}
      <div className={`polaroid-img ${imgClass ?? ""}`} style={{ position: "relative" }}>
        <ImgPlaceholder gradient={gradient} emoji={emoji} />
        {children}
      </div>
      <div className="polaroid-caption">{caption}</div>
    </div>
  );
}

function LetterCard({ col, tilt = 0, delay = 0, text, sig, tape, tapeColor, star }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card letter-card reveal ${visible ? "visible" : ""} ${col}`}
      style={{ "--tilt": `${tilt}deg`, transitionDelay: `${delay}s` }}
    >
      {tape && <div className={`tape tape-top-${tape} ${tapeColor ?? ""}`} />}
      {star && <span style={{ position: "absolute", top: 10, right: 14, fontSize: 18, opacity: 0.6 }}>✨</span>}
      <div className="letter-lines" />
      <span className="letter-envelope-icon">💌</span>
      <p className="letter-text">{text}</p>
      <p className="letter-sig">{sig ?? "— with all my love 🌸"}</p>
    </div>
  );
}

function NoteCard({ col, tilt = 0, delay = 0, date, text }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card note-card reveal ${visible ? "visible" : ""} ${col}`}
      style={{ "--tilt": `${tilt}deg`, transitionDelay: `${delay}s` }}
    >
      <div className="tape tape-top-left tape-peach" />
      {date && <p className="note-date">{date}</p>}
      <p className="note-text">{text}</p>
    </div>
  );
}

function SideCard({ col, tilt = 0, delay = 0, glow, gradient, caption, sub, emoji, children }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`card side-card reveal ${visible ? "visible" : ""} ${glow ? "glow-ring" : ""} ${col}`}
      style={{ "--tilt": `${tilt}deg`, transitionDelay: `${delay}s` }}
    >
      <div className="tape tape-top-center tape-lavender" />
      <div className="side-card-img" style={{ position: "relative" }}>
        <ImgPlaceholder gradient={gradient} emoji={emoji} />
        {children}
      </div>
      <div className="side-card-body">
        <p className="side-card-caption">{caption}</p>
        {sub && <p className="side-card-sub">{sub}</p>}
      </div>
      {glow && <span className="heart-sticker" style={{ bottom: 8, right: 10, top: "auto", fontSize: 14 }}>💕</span>}
    </div>
  );
}

/* ─── Main Component ─── */
export default function ScrapbookGallery() {
  return (
    <>
      <style>{style}</style>
      <section className="scrapbook-section">
        {/* bg elements */}
        <FloatingHearts />
        <Sparkles />
        <span className="flower-doodle" style={{ top: "8%", left: "3%" }}>🌸</span>
        <span className="flower-doodle" style={{ top: "25%", right: "2%", animationDirection: "reverse" }}>🌺</span>
        <span className="flower-doodle" style={{ bottom: "15%", left: "6%", fontSize: 22 }}>🌷</span>
        <span className="flower-doodle" style={{ bottom: "30%", right: "5%", fontSize: 20 }}>✿</span>

        {/* ── Header ── */}
        <header className="section-header">
          <div className="header-deco">
            <div className="header-line" />
            <span className="header-heart-icon">💖</span>
            <div className="header-line" />
          </div>
          <h1 className="section-title">Little Pieces of You ❤️</h1>
          <p className="section-subtitle">
            A collection of moments, smiles, and memories that mean the world to me.
          </p>
          <div className="title-flowers">🌸 🌷 🌼 🌺 🌸</div>
        </header>

        {/* ── Gallery Grid ── */}
        <div className="gallery-grid">

          {/* Row 1 */}
          <PolaroidCard
            col="col-3" tilt={-3} delay={0}
            caption="My pretty girl 💕"
            gradient="linear-gradient(135deg,#ffd6e8 0%,#f0c0f0 100%)"
            emoji="🌸"
            tape="left" glow
          >
            <img src="4.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <PolaroidCard
            col="col-4" tilt={2} delay={0.1}
            caption="How can someone be this beautiful? 🥹"
            gradient="linear-gradient(135deg,#ffe0b2 0%,#f8bbd0 50%,#e1bee7 100%)"
            emoji="💫"
            imgClass="polaroid-img-wide"
            tape="center" tapeColor="tape-lavender"
          >
            <img src="9.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <LetterCard
            col="col-3" tilt={4} delay={0.15}
            text="If beauty had a face, it would look like you. Every single glance at your photo makes my heart skip a beat ✨"
            tape="right" star
          />
          <PolaroidCard
            col="col-2" tilt={-5} delay={0.2}
            caption="🌷"
            gradient="linear-gradient(160deg,#d8b4fe 0%,#fbcfe8 100%)"
            emoji="💜"
          >
            <img src="16.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>

          {/* Row 2 */}
          <NoteCard
            col="col-3" tilt={2} delay={0.25}
            date="📅 a random tuesday"
            text="Sometimes I just stare at your pictures and smile like an absolute fool. And I don't even mind. 😊"
          />
          <SideCard
            col="col-6" tilt={-1} delay={0.3}
            gradient="linear-gradient(120deg,#fce4ec 0%,#e8d5f0 50%,#d4e8ff 100%)"
            caption="One smile = my whole day better ☀️"
            sub="you don't even know what you do to me"
            glow emoji="✨"
          >
            <img src="3.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </SideCard>
          <PolaroidCard
            col="col-3" tilt={5} delay={0.35}
            caption="Bae being too cute again 😩💕"
            gradient="linear-gradient(135deg,#ffd0e8 0%,#d0c8f8 100%)"
            emoji="🥰"
            imgClass="polaroid-img-tall"
            tape="center"
          >
            <img src="8.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>

          {/* Row 3 */}
          <PolaroidCard
            col="col-4" tilt={-2} delay={0.4}
            caption="Every picture of you feels so special 📸"
            gradient="linear-gradient(135deg,#c8f0e8 0%,#d0e8ff 50%,#f0d8ff 100%)"
            emoji="💙"
            imgClass="polaroid-img-wide"
            tape="left" tapeColor="tape-peach"
          >
            <img src="14.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <LetterCard
            col="col-4" tilt={-4} delay={0.45}
            text="Even through a screen, you still manage to make my heart race like crazy. How do you do that so effortlessly? 🥺💕"
            sig="— always yours 💓"
            tape="center"
          />
          <PolaroidCard
            col="col-4" tilt={3} delay={0.5}
            caption="My favorite face in the whole world 🌎💗"
            gradient="linear-gradient(135deg,#fff0a0 0%,#ffd6e8 50%,#e8c0f8 100%)"
            emoji="⭐"
            imgClass="polaroid-img-wide"
            tape="right" glow
          >
            <img src="7.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>

          {/* Row 4 */}
          <PolaroidCard
            col="col-3" tilt={6} delay={0.55}
            caption="just... you. 💌"
            gradient="linear-gradient(135deg,#fbc2eb 0%,#a18cd1 100%)"
            emoji="🌙"
            imgClass="polaroid-img-tall"
            tape="left" tapeColor="tape-lavender"
          >
            <img src="23.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <NoteCard
            col="col-3" tilt={-2} delay={0.6}
            date="📅 literally every day"
            text="You make distance feel softer. Knowing you exist in this world is enough to make everything okay. 🌸"
          />
          <PolaroidCard
            col="col-3" tilt={-5} delay={0.65}
            caption="Always camera-ready ✨📷"
            gradient="linear-gradient(135deg,#d4e8ff 0%,#f0c8f8 100%)"
            emoji="💫"
            tape="center"
          >
            <img src="5.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <LetterCard
            col="col-3" tilt={4} delay={0.7}
            text="You are the kind of beautiful that doesn't need a filter. Raw, real, and absolutely breathtaking. 🌺"
            sig="— so in love with you 💞"
            star
          />

          {/* Row 5 */}
          <SideCard
            col="col-4" tilt={-1} delay={0.75}
            gradient="linear-gradient(135deg,#ffecd2 0%,#fcb69f 50%,#fbc2eb 100%)"
            caption="This one's my absolute favorite 🥰"
            sub="saved it as my wallpaper and never looked back"
            emoji="🌅"
          >
            <img src="21.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </SideCard>
          <PolaroidCard
            col="col-4" tilt={3} delay={0.8}
            caption="You + sunshine = this 🌞💛"
            gradient="linear-gradient(135deg,#fff9c4 0%,#ffccbc 50%,#f8bbd0 100%)"
            emoji="☀️"
            imgClass="polaroid-img-wide"
            tape="center" tapeColor="tape-peach" glow
          >
            <img src="10.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <PolaroidCard
            col="col-4" tilt={-4} delay={0.85}
            caption="I could look at this forever 💖"
            gradient="linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 50%,#fbc2eb 100%)"
            emoji="🌟"
            imgClass="polaroid-img-wide"
            tape="left"
          >
            <img src="25.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>

          {/* Row 6 — wide card + letter */}
          <LetterCard
            col="col-6" tilt={1} delay={0.9}
            text="I don't know how I got lucky enough to have someone like you in my life. But I'm so, so grateful. Thank you for existing, for smiling, for being you. 💕✨🌸"
            sig="— yours completely 🌹"
            tape="center" star
          />
          <PolaroidCard
            col="col-3" tilt={-3} delay={0.95}
            caption="Prettiest human alive, no debate 👑"
            gradient="linear-gradient(135deg,#fddb92 0%,#d1fdff 50%,#f9c5d1 100%)"
            emoji="👑"
            imgClass="polaroid-img-tall"
            tape="right" tapeColor="tape-lavender" glow
          >
            <img src="28.jpeg" alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          </PolaroidCard>
          <NoteCard
            col="col-3" tilt={5} delay={1}
            date="📅 every single morning"
            text="First thought when I wake up? You. Last thought before I sleep? Also you. It's always you. 🌙"
          />

        </div>

        {/* ── Bottom ribbon ── */}
        <div className="ribbon-bottom">
          <div className="header-deco" style={{ marginBottom: 10 }}>
            <div className="header-line" />
            <span style={{ fontSize: 24 }}>🌹</span>
            <div className="header-line" />
          </div>
          <p className="ribbon-text">
            Made with love, for the one who makes everything better. 💖
          </p>
          <div style={{ marginTop: 12, fontSize: 22 }}>
            🌸 💕 ✨ 💌 ✨ 💕 🌸
          </div>
        </div>
      </section>
    </>
  );
}
