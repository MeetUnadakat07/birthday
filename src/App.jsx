import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Star, Sparkles, Gift, Volume2, VolumeX, ArrowRight, X,
} from "lucide-react";

/* ============================================================
   FOR MANSI — a small universe built by her best friend
   ============================================================ */

const REASONS = [
  "Because you make every conversation feel safe — I can say literally anything without being judged.",
  "Because your laugh is loud enough to fix a bad day.",
  "Because you sat right in front of me at Spark and turned exam stress into inside jokes.",
  "Because you say exactly what you think — no filters, no fake-nice.",
  "Because you genuinely want good things for everyone around you.",
  "Because you're the most fun-loving person I know, hands down.",
  "Because your confidence makes the people around you a little braver too.",
  "Because you never stopped learning, growing, becoming more you.",
  "Because four years in, you still feel like home.",
  "Because you survived JEE prep with me and somehow we laugh about it now.",
  "Because \"my bro\" fits you better than any other title ever could.",
  "Because you show up. Every single time, no matter what.",
  "Because you make ordinary Tuesdays feel like an event.",
  "Because you listen without waiting for your turn to talk.",
  "Because you're proof that real friendships don't need filters.",
  "Because you dream big and somehow make me believe in my own dreams too.",
  "Because you turned a classroom bench into one of my favorite memories.",
  "Because you're exactly who you say you are — always, everywhere.",
  "Because being around you is the closest thing to always being understood.",
  "Because you deserve every good thing this next decade has to offer. All of it.",
];

const MEMORIES = [
  {
    title: "Spark, Second Bench",
    text: "Two benches, one group, and you sitting right ahead of me pretending to listen to the lecture. Ninety percent of what I remember from that class isn't physics — it's whatever you turned around and whispered to me.",
  },
  {
    title: "The JEE Grind",
    text: "Mock tests, syllabus panic, 'we're never getting through this' at 11pm — and somehow you made even that phase feel survivable. Bad days felt shorter when you were having them with me.",
  },
  {
    title: "Zero-Filter Diaries",
    text: "You have never once said something you didn't mean, and you've never once hidden something you did. It's rare. It's also, honestly, one of my favorite things about you.",
  },
  {
    title: "The Deep-Talk Kind of Days",
    text: "From ridiculous fun stories to actual 3am-energy conversations about careers and futures and everything in between — we've never run out of things to talk about. Not once, in four years.",
  },
  {
    title: "Just Existing Near You",
    text: "No occasion needed. Just you, me, and whatever nonsense we were up to. Some of my favorite memories aren't even 'moments' — they're just ordinary time spent with you.",
  },
];

const TIMELINE = [
  { year: "Year 1", label: "Spark", text: "Two benches, one group, and a friendship that started somewhere between a lecture and a laugh." },
  { year: "Year 2", label: "The Grind", text: "JEE prep tested both of us — and somehow made the friendship sturdier, not weaker." },
  { year: "Year 3", label: "Everything Else", text: "Careers, futures, chaos, comfort — the talks got deeper and the friendship got easier." },
  { year: "Year 4", label: "Right Now", text: "Still my go-to person for literally anything. Still no filters needed. Still my bro." },
];

const PHOTO_SEEDS = [101, 102, 103, 104, 105, 106];

const LETTER_LINES = [
  "Mansi,",
  "It's been four years since a lecture bench at Spark quietly turned into one of the best decisions of my life — sitting near you.",
  "You're the one person I can tell literally anything to. Fun stories, dumb thoughts, real fears, future plans — all of it, without ever once worrying you'll judge me for it.",
  "You say exactly what you think, you want good things for everyone around you, and you're somehow the same genuine person in every single room you walk into. No filters. Just you.",
  "We survived JEE together, we've laughed more than I can count, and somewhere in between all of it, you became family — the kind I chose.",
  "So today isn't just about turning 20. It's me telling you, properly, that your friendship means more to me than I probably show.",
  "Here's to the next decade being loud, lucky, and entirely yours.",
  "Happy Birthday, my bro.",
];

/* ---------------- Global styling ---------------- */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Quicksand:wght@400;500;600;700&family=Caveat:wght@500;600;700&display=swap');

    .mb-root {
      --pink-50:  #fff3f8;
      --pink-100: #ffe3ef;
      --pink-200: #ffc9e0;
      --pink-300: #ffa9cd;
      --pink-500: #f472a8;
      --lav-100:  #efe7ff;
      --lav-200:  #ddccff;
      --lav-300:  #c3aef4;
      --lav-500:  #9a7fe0;
      --cream:    #fffaf5;
      --gold:     #f0c46a;
      --ink:      #5a3a52;
      --ink-soft: #8a6b83;
      font-family: 'Quicksand', sans-serif;
      color: var(--ink);
      position: relative;
      width: 100%;
      min-height: 100vh;
      overflow-x: hidden;
      background: radial-gradient(ellipse 80% 60% at 20% 0%, var(--lav-100) 0%, transparent 60%),
                  radial-gradient(ellipse 80% 60% at 80% 100%, var(--pink-100) 0%, transparent 60%),
                  var(--cream);
    }
    .mb-display { font-family: 'Fraunces', serif; }
    .mb-script { font-family: 'Caveat', cursive; }

    .mb-grain::before {
      content: "";
      position: fixed; inset: 0; pointer-events: none; z-index: 1;
      opacity: 0.035; mix-blend-mode: multiply;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .mb-btn {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      letter-spacing: 0.03em;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 30px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--pink-300), var(--lav-300));
      color: #fff;
      box-shadow: 0 8px 24px -8px rgba(244, 114, 168, 0.55);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .mb-btn:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 12px 30px -8px rgba(244,114,168,0.65); }
    .mb-btn:active { transform: translateY(0) scale(0.98); }
    .mb-btn.ghost {
      background: rgba(255,255,255,0.6);
      color: var(--ink);
      border: 1.5px solid var(--lav-200);
      box-shadow: none;
    }

    .mb-glass {
      background: rgba(255,255,255,0.55);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(255,255,255,0.7);
      box-shadow: 0 20px 60px -20px rgba(154, 127, 224, 0.35);
    }

    .mb-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--lav-200); transition: all .3s ease; }
    .mb-dot.active { background: var(--pink-500); width: 22px; border-radius: 5px; }

    ::selection { background: var(--pink-200); color: var(--ink); }

    @keyframes floatY { 0%,100% { transform: translateY(0) rotate(var(--r,0deg)); } 50% { transform: translateY(-22px) rotate(var(--r,0deg)); } }
    @keyframes drift { 0% { transform: translateY(110vh) translateX(0) rotate(0deg); opacity:0; } 8% { opacity:1; } 92% { opacity:1; } 100% { transform: translateY(-15vh) translateX(var(--dx,40px)) rotate(360deg); opacity:0; } }
    @keyframes sparkle { 0%,100% { opacity:0.2; transform: scale(0.7);} 50% { opacity:1; transform: scale(1.15);} }
    @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity:1; } 100% { transform: translateY(110vh) rotate(540deg); opacity:0.9; } }
  `}</style>
);

/* ---------------- Background atmosphere ---------------- */

const Sparkles2 = ({ count = 18 }) => {
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 4,
      dur: 2.5 + Math.random() * 3,
    }))
  ).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {items.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff, var(--gold))",
            animation: `sparkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const FloatingBalloons = ({ count = 7 }) => {
  const colors = ["var(--pink-300)", "var(--lav-300)", "var(--pink-200)", "var(--lav-200)", "#ffd9ec"];
  const items = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 6,
      dur: 9 + Math.random() * 7,
      color: colors[i % colors.length],
      size: 46 + Math.random() * 26,
    }))
  ).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {items.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.left}%`,
            bottom: -140,
            width: b.size,
            height: b.size * 1.25,
            animation: `drift ${b.dur}s linear ${b.delay}s infinite`,
            "--dx": `${(Math.random() - 0.5) * 120}px`,
          }}
        >
          <div style={{
            width: "100%", height: "100%", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            background: `radial-gradient(circle at 32% 28%, #fff8, transparent 40%), ${b.color}`,
            boxShadow: "inset -6px -8px 16px rgba(0,0,0,0.08)",
          }} />
          <div style={{ width: 2, height: 34, background: "rgba(90,58,82,0.35)", margin: "0 auto" }} />
        </div>
      ))}
    </div>
  );
};

const ConfettiBurst = ({ trigger, count = 60 }) => {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const colors = ["#f472a8", "#c3aef4", "#f0c46a", "#ffc9e0", "#ddccff"];
    const arr = Array.from({ length: count }, (_, i) => ({
      id: `${trigger}-${i}`,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      dur: 2.4 + Math.random() * 1.6,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
      rotate: Math.random() * 360,
      shape: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 4200);
    return () => clearTimeout(t);
  }, [trigger]); // eslint-disable-line
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: p.shape,
            animation: `fall ${p.dur}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

const FireworksCanvas = ({ active }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const colors = ["#f472a8", "#c3aef4", "#f0c46a", "#ff9fce", "#e6d6ff"];
    const spawn = () => {
      const cx = canvas.width * (0.2 + Math.random() * 0.6);
      const cy = canvas.height * (0.15 + Math.random() * 0.4);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const n = 26 + Math.floor(Math.random() * 14);
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n;
        const speed = 1.6 + Math.random() * 2.4;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, color,
        });
      }
    };
    let spawnTimer = setInterval(spawn, 850);
    spawn();
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= 0.012;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      particles = particles.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); clearInterval(spawnTimer); window.removeEventListener("resize", resize); };
  }, [active]);
  if (!active) return null;
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }} />;
};

/* ---------------- Shared shell ---------------- */

const sceneVariants = {
  enter: { opacity: 0, y: 40, scale: 0.98 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.45, ease: "easeIn" } },
};

const Scene = ({ children, center = true }) => (
  <motion.section
    variants={sceneVariants}
    initial="enter"
    animate="center"
    exit="exit"
    style={{
      minHeight: "100dvh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      padding: "80px 20px 120px",
      position: "relative",
      zIndex: 3,
    }}
  >
    {children}
  </motion.section>
);

const NavDots = ({ total, current }) => (
  <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 40, display: "flex", gap: 7 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className={`mb-dot ${i === current ? "active" : ""}`} />
    ))}
  </div>
);

const BackButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.9 }}
    className="mb-glass"
    style={{
      position: "fixed", top: 18, left: 18, zIndex: 70,
      width: 40, height: 40, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", border: "none",
    }}
    aria-label="Go back"
  >
    <ArrowRight size={16} color="var(--ink-soft)" style={{ transform: "rotate(180deg)" }} />
  </motion.button>
);

const Continue = ({ onClick, label = "Continue" }) => (
  <motion.button
    className="mb-btn"
    onClick={onClick}
    whileTap={{ scale: 0.96 }}
    style={{ marginTop: 44 }}
  >
    {label} <ArrowRight size={18} />
  </motion.button>
);

/* ---------------- Scene 1: Intro / Envelope ---------------- */

const IntroScene = ({ onOpen }) => {
  const [opening, setOpening] = useState(false);
  return (
    <Scene>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
        className="mb-script"
        style={{ fontSize: 22, color: "var(--ink-soft)", marginBottom: 6 }}
      >
        a small something for
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
        className="mb-display"
        style={{ fontSize: "clamp(2.4rem, 8vw, 4rem)", fontWeight: 600, color: "var(--pink-500)", textAlign: "center", marginBottom: 40 }}
      >
        Mansi
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, rotate: opening ? 8 : 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        whileHover={{ scale: 1.05, rotate: -3 }}
        onClick={() => { setOpening(true); setTimeout(onOpen, 650); }}
        style={{
          border: "none", cursor: "pointer", background: "none", position: "relative",
          width: 150, height: 105,
        }}
        aria-label="Open envelope"
      >
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: "linear-gradient(160deg, var(--pink-100), var(--lav-100))",
          border: "1.5px solid var(--pink-200)",
          boxShadow: "0 18px 40px -14px rgba(244,114,168,0.5)",
        }} />
        <motion.div
          animate={{ rotateX: opening ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "58%",
            background: "linear-gradient(160deg, var(--pink-300), var(--lav-300))",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top",
            borderRadius: "10px 10px 0 0",
          }}
        />
        <Heart size={22} color="var(--pink-500)" fill="var(--pink-500)" style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)" }} />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
        style={{ marginTop: 26, color: "var(--ink-soft)", fontSize: 15, letterSpacing: "0.02em" }}
      >
        tap the envelope, bro
      </motion.p>
    </Scene>
  );
};

/* ---------------- Scene 2: Hero ---------------- */

const HeroScene = ({ onNext }) => (
  <Scene>
    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
      <Sparkles size={34} color="var(--gold)" style={{ marginBottom: 10 }} />
    </motion.div>
    <motion.h1
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.9 }}
      className="mb-display"
      style={{ fontSize: "clamp(2.6rem, 9vw, 5rem)", fontWeight: 600, textAlign: "center", lineHeight: 1.05, color: "var(--ink)" }}
    >
      Happy 20th<br /><span style={{ color: "var(--pink-500)" }}>Birthday</span>
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
      className="mb-script" style={{ fontSize: 28, color: "var(--lav-500)", marginTop: 14 }}
    >
      my bro. my person. my best friend.
    </motion.p>
    <motion.p
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
      style={{ maxWidth: 480, textAlign: "center", marginTop: 20, color: "var(--ink-soft)", fontSize: 16, lineHeight: 1.6 }}
    >
      A new decade starts for you today. I put together a little something —
      go on, keep going.
    </motion.p>
    <Continue onClick={onNext} />
  </Scene>
);

/* ---------------- Scene 3: Letter (lines appear one by one) ---------------- */

const LetterScene = ({ onNext }) => {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= LETTER_LINES.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 400 : 1000);
    return () => clearTimeout(t);
  }, [shown]);
  const done = shown >= LETTER_LINES.length;
  return (
    <Scene>
      <div className="mb-glass" style={{ maxWidth: 640, width: "100%", borderRadius: 26, padding: "44px 34px" }}>
        <p className="mb-script" style={{ fontSize: 22, color: "var(--lav-500)", marginBottom: 18 }}>a letter, of sorts —</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {LETTER_LINES.slice(0, shown).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={i === LETTER_LINES.length - 1 ? "mb-display" : ""}
              style={{
                fontSize: i === 0 ? 20 : 16.5,
                lineHeight: 1.75,
                color: i === LETTER_LINES.length - 1 ? "var(--pink-500)" : "var(--ink)",
                fontWeight: i === LETTER_LINES.length - 1 ? 600 : 500,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
      {done && <Continue onClick={onNext} />}
    </Scene>
  );
};

/* ---------------- Scene 4: Cake ---------------- */

const CakeScene = ({ onNext, onFireworks }) => {
  const [cut, setCut] = useState(false);
  const handleCut = () => {
    if (cut) return;
    setCut(true);
    onFireworks();
  };
  return (
    <Scene>
      <p className="mb-script" style={{ fontSize: 24, color: "var(--lav-500)", marginBottom: 6 }}>make a wish, bro</p>
      <h2 className="mb-display" style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", marginBottom: 34, textAlign: "center" }}>
        go ahead, cut the cake
      </h2>

      <motion.button
        onClick={handleCut}
        whileHover={{ scale: cut ? 1 : 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{ border: "none", background: "none", cursor: cut ? "default" : "pointer", position: "relative" }}
        aria-label="Cut the cake"
      >
        <svg width="220" height="200" viewBox="0 0 220 200">
          <ellipse cx="110" cy="176" rx="92" ry="16" fill="var(--pink-100)" />
          <motion.g
            animate={cut ? { x: -14, rotate: -3 } : { x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <rect x="20" y="120" width="86" height="52" rx="8" fill="#ffd9ec" />
            <rect x="20" y="120" width="86" height="14" fill="#fff" opacity="0.6" />
          </motion.g>
          <motion.g
            animate={cut ? { x: 14, rotate: 3 } : { x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          >
            <rect x="114" y="120" width="86" height="52" rx="8" fill="#ffc9e0" />
            <rect x="114" y="120" width="86" height="14" fill="#fff" opacity="0.6" />
          </motion.g>
          <rect x="30" y="86" width="160" height="40" rx="10" fill="var(--lav-200)" />
          <rect x="30" y="86" width="160" height="12" fill="#fff" opacity="0.5" />
          {[55, 90, 125, 160].map((x, i) => (
            <g key={i}>
              <rect x={x} y="62" width="6" height="26" rx="3" fill="#fff4d6" />
              <motion.ellipse
                cx={x + 3} cy="58" rx="5" ry="8" fill="var(--gold)"
                animate={cut ? { opacity: 0.3, scale: 0.6 } : { opacity: [1, 0.6, 1], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.1, repeat: cut ? 0 : Infinity, delay: i * 0.15 }}
              />
            </g>
          ))}
          <AnimatePresence>
            {cut && (
              <motion.text
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                x="110" y="150" textAnchor="middle" fontSize="11" fontFamily="Fraunces, serif" fill="var(--pink-500)"
              >
                for you 💗
              </motion.text>
            )}
          </AnimatePresence>
        </svg>
      </motion.button>

      <AnimatePresence>
        {cut && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-glass"
            style={{ maxWidth: 460, marginTop: 30, borderRadius: 20, padding: "24px 26px", textAlign: "center" }}
          >
            <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--ink)" }}>
              Whatever you wished for — I hope the universe was listening.
              And if it wasn't, I'll help you go get it myself.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {cut && <Continue onClick={onNext} />}
    </Scene>
  );
};

/* ---------------- Scene 5: Memories (click stars) ---------------- */

const MemoriesScene = ({ onNext }) => {
  const [open, setOpen] = useState(null);
  const [seen, setSeen] = useState([]);
  const reveal = (i) => { setOpen(i); if (!seen.includes(i)) setSeen((s) => [...s, i]); };
  return (
    <Scene>
      <p className="mb-script" style={{ fontSize: 24, color: "var(--lav-500)" }}>tap a star</p>
      <h2 className="mb-display" style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", marginBottom: 8, textAlign: "center" }}>
        a few memories worth keeping
      </h2>
      <p style={{ color: "var(--ink-soft)", marginBottom: 30, fontSize: 14 }}>{seen.length}/{MEMORIES.length} unlocked</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 22, justifyContent: "center", maxWidth: 560 }}>
        {MEMORIES.map((m, i) => (
          <motion.button
            key={i}
            onClick={() => reveal(i)}
            whileHover={{ scale: 1.15, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label={`Reveal memory ${i + 1}`}
          >
            <Star
              size={44}
              color={seen.includes(i) ? "var(--gold)" : "var(--lav-300)"}
              fill={seen.includes(i) ? "var(--gold)" : "none"}
              style={{ animation: `floatY ${3 + i * 0.3}s ease-in-out infinite`, "--r": `${i % 2 === 0 ? -6 : 6}deg` }}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(90,58,82,0.35)", backdropFilter: "blur(4px)", zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mb-glass"
              style={{ maxWidth: 420, borderRadius: 22, padding: "30px 28px", position: "relative" }}
            >
              <button onClick={() => setOpen(null)} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)" }}>
                <X size={20} />
              </button>
              <p className="mb-display" style={{ color: "var(--pink-500)", fontSize: 21, fontWeight: 600, marginBottom: 10 }}>{MEMORIES[open].title}</p>
              <p style={{ fontSize: 15.5, lineHeight: 1.7 }}>{MEMORIES[open].text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {seen.length === MEMORIES.length && <Continue onClick={onNext} />}
    </Scene>
  );
};

/* ---------------- Scene 6: 20 Reasons ---------------- */

const ReasonsScene = ({ onNext }) => (
  <Scene center={false}>
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <p className="mb-script" style={{ fontSize: 24, color: "var(--lav-500)" }}>20 for 20</p>
      <h2 className="mb-display" style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)" }}>reasons you're kind of amazing</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16, maxWidth: 900, width: "100%" }}>
      {REASONS.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          whileHover={{ y: -4, rotate: i % 2 === 0 ? -1 : 1 }}
          className="mb-glass"
          style={{ borderRadius: 16, padding: "18px 18px", fontSize: 14.5, lineHeight: 1.55 }}
        >
          <span className="mb-display" style={{ color: "var(--pink-500)", fontWeight: 600, fontSize: 13 }}>{String(i + 1).padStart(2, "0")}</span>
          <p style={{ marginTop: 6 }}>{r}</p>
        </motion.div>
      ))}
    </div>
    <Continue onClick={onNext} />
  </Scene>
);

/* ---------------- Scene 7: Timeline ---------------- */

const TimelineScene = ({ onNext }) => (
  <Scene>
    <p className="mb-script" style={{ fontSize: 24, color: "var(--lav-500)" }}>four years, mapped out</p>
    <h2 className="mb-display" style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", marginBottom: 36, textAlign: "center" }}>our little timeline</h2>
    <div style={{ maxWidth: 560, width: "100%", position: "relative", paddingLeft: 26 }}>
      <div style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 2, background: "linear-gradient(var(--pink-300), var(--lav-300))" }} />
      {TIMELINE.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          style={{ position: "relative", marginBottom: 30 }}
        >
          <div style={{ position: "absolute", left: -26, top: 4, width: 12, height: 12, borderRadius: "50%", background: "var(--pink-500)", boxShadow: "0 0 0 4px var(--pink-100)" }} />
          <p style={{ fontSize: 12.5, letterSpacing: "0.08em", color: "var(--lav-500)", fontWeight: 700, textTransform: "uppercase" }}>{t.year} — {t.label}</p>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, marginTop: 4 }}>{t.text}</p>
        </motion.div>
      ))}
    </div>
    <Continue onClick={onNext} />
  </Scene>
);

/* ---------------- Scene 8: Photo Gallery ---------------- */

const GalleryScene = ({ onNext }) => (
  <Scene center={false}>
    <div style={{ textAlign: "center", marginBottom: 26 }}>
      <p className="mb-script" style={{ fontSize: 24, color: "var(--lav-500)" }}>a wall of us</p>
      <h2 className="mb-display" style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)" }}>(placeholders for now — swap in our real photos!)</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 16, maxWidth: 760, width: "100%" }}>
      {PHOTO_SEEDS.map((seed, i) => (
        <motion.div
          key={seed}
          initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -4 : 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
          viewport={{ once: true }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="mb-glass"
          style={{ borderRadius: 12, padding: 10, paddingBottom: 22 }}
        >
          <div style={{ borderRadius: 6, overflow: "hidden", aspectRatio: "1/1", background: "var(--lav-100)" }}>
            <img
              src={`https://picsum.photos/seed/mansi${seed}/300/300`}
              alt="memory placeholder"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </div>
          <p className="mb-script" style={{ textAlign: "center", fontSize: 15, marginTop: 6, color: "var(--ink-soft)" }}>us, someday soon</p>
        </motion.div>
      ))}
    </div>
    <Continue onClick={onNext} />
  </Scene>
);

/* ---------------- Scene 9: Finale ---------------- */

const FinaleScene = ({ onNext }) => (
  <Scene>
    <Sparkles size={30} color="var(--gold)" />
    <h2 className="mb-display" style={{ fontSize: "clamp(2rem,7vw,3.4rem)", textAlign: "center", marginTop: 14, lineHeight: 1.15 }}>
      Here's to <span style={{ color: "var(--pink-500)" }}>20</span>,<br /> and everything after it.
    </h2>
    <p style={{ maxWidth: 520, textAlign: "center", marginTop: 20, fontSize: 16.5, lineHeight: 1.75, color: "var(--ink)" }}>
      May this decade give you every success you're chasing, every trip you're
      dreaming of, and people who love you as loudly as you love them. Thank you
      for four years of zero-filter honesty, endless laughter, and always,
      always showing up.
    </p>
    <p className="mb-script" style={{ fontSize: 26, color: "var(--lav-500)", marginTop: 26 }}>
      happy birthday, my bro. I love you (platonically, fiercely, always).
    </p>
    <Continue onClick={onNext} label="One more thing" />
  </Scene>
);

/* ---------------- Scene 10: Secret ending ---------------- */

const SecretScene = () => {
  const [open, setOpen] = useState(false);
  return (
    <Scene>
      {!open ? (
        <>
          <p style={{ color: "var(--ink-soft)", marginBottom: 18, fontSize: 15 }}>psst — one last thing.</p>
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.92 }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Open secret gift"
          >
            <Gift size={64} color="var(--pink-500)" />
          </motion.button>
          <p className="mb-script" style={{ fontSize: 18, color: "var(--lav-500)", marginTop: 12 }}>open it</p>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-glass"
          style={{ maxWidth: 480, borderRadius: 22, padding: "32px 30px", textAlign: "center" }}
        >
          <p className="mb-display" style={{ fontSize: 20, color: "var(--pink-500)", fontWeight: 600, marginBottom: 12 }}>P.S.</p>
          <p style={{ fontSize: 16, lineHeight: 1.75 }}>
            I built this whole thing because you deserve to feel, at least once,
            exactly how much you mean to me. Not just a friend — family. My bro,
            for the next decade and every one after that.
          </p>
          <p className="mb-script" style={{ fontSize: 24, marginTop: 16, color: "var(--lav-500)" }}>— always in your corner</p>
        </motion.div>
      )}
    </Scene>
  );
};

/* ---------------- Music toggle ---------------- */

const MusicToggle = ({ playing, onToggle }) => (
  <motion.button
    onClick={onToggle}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.9 }}
    className="mb-glass"
    style={{
      position: "fixed", top: 18, right: 18, zIndex: 70,
      width: 46, height: 46, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", border: "none",
    }}
    aria-label={playing ? "Mute music" : "Play music"}
  >
    {playing ? <Volume2 size={19} color="var(--pink-500)" /> : <VolumeX size={19} color="var(--ink-soft)" />}
  </motion.button>
);

/* ---------------- Main App ---------------- */

const SCENES = ["intro", "hero", "letter", "cake", "memories", "reasons", "timeline", "gallery", "finale", "secret"];

export default function App() {
  const [index, setIndex] = useState(0);
  const [confettiTick, setConfettiTick] = useState(0);
  const [fireworksOn, setFireworksOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const melodyTimerRef = useRef(null);

  // Set this to a real file (e.g. "/your-song.mp3") once you have one.
  // Until then, the music button plays a small original synthesized tune
  // instead of a licensed track, so nothing gets copied illegally.
  const REAL_SONG_SRC = "";

  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, SCENES.length - 1)), []);
  const goBack = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // --- Tiny original melody synth (fallback when no real song is set) ---
  const NOTES = [523.25, 587.33, 659.25, 523.25, 659.25, 783.99, 659.25, 587.33]; // simple cheerful loop
  const playNote = (ctx, freq, startTime, duration) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  };
  const startSynthMelody = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    let step = 0;
    const scheduleLoop = () => {
      const now = ctx.currentTime + 0.05;
      NOTES.forEach((freq, i) => playNote(ctx, freq, now + i * 0.4, 0.38));
      step++;
    };
    scheduleLoop();
    melodyTimerRef.current = setInterval(scheduleLoop, NOTES.length * 400);
  };
  const stopSynthMelody = () => {
    if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
    if (audioCtxRef.current) audioCtxRef.current.suspend();
  };

  useEffect(() => () => { stopSynthMelody(); if (audioCtxRef.current) audioCtxRef.current.close(); }, []);

  useEffect(() => {
    if (SCENES[index] === "hero") {
      setConfettiTick((t) => t + 1);
    }
    if (SCENES[index] === "finale") {
      setFireworksOn(true);
      const t = setTimeout(() => setFireworksOn(false), 9000);
      return () => clearTimeout(t);
    }
  }, [index]);

  const handleOpenIntro = () => {
    goNext();
    // Start music on first real user interaction (browser autoplay policies require this)
    if (REAL_SONG_SRC && audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().then(() => setMusicOn(true)).catch(() => setMusicOn(false));
    } else {
      startSynthMelody();
      setMusicOn(true);
    }
  };

  const toggleMusic = () => {
    if (REAL_SONG_SRC && audioRef.current) {
      if (musicOn) { audioRef.current.pause(); setMusicOn(false); }
      else { audioRef.current.play().then(() => setMusicOn(true)).catch(() => {}); }
      return;
    }
    if (musicOn) { stopSynthMelody(); setMusicOn(false); }
    else { startSynthMelody(); setMusicOn(true); }
  };

  const handleCakeFireworks = () => {
    setFireworksOn(true);
    setConfettiTick((t) => t + 1);
    setTimeout(() => setFireworksOn(false), 3200);
  };

  const scene = SCENES[index];

  return (
    <div className="mb-root mb-grain">
      <GlobalStyle />
      {/*
        Add your own birthday song by setting REAL_SONG_SRC above to a file path,
        e.g. REAL_SONG_SRC = "/your-song.mp3". It will automatically take over
        from the synthesized placeholder melody.
      */}
      {REAL_SONG_SRC && <audio ref={audioRef} src={REAL_SONG_SRC} loop />}

      <Sparkles2 />
      <FloatingBalloons />
      <ConfettiBurst trigger={confettiTick} />
      <FireworksCanvas active={fireworksOn} />

      {scene !== "intro" && <MusicToggle playing={musicOn} onToggle={toggleMusic} />}
      {index > 1 && scene !== "secret" && <BackButton onClick={goBack} />}

      <AnimatePresence mode="wait">
        {scene === "intro" && <IntroScene key="intro" onOpen={handleOpenIntro} />}
        {scene === "hero" && <HeroScene key="hero" onNext={goNext} />}
        {scene === "letter" && <LetterScene key="letter" onNext={goNext} />}
        {scene === "cake" && <CakeScene key="cake" onNext={goNext} onFireworks={handleCakeFireworks} />}
        {scene === "memories" && <MemoriesScene key="memories" onNext={goNext} />}
        {scene === "reasons" && <ReasonsScene key="reasons" onNext={goNext} />}
        {scene === "timeline" && <TimelineScene key="timeline" onNext={goNext} />}
        {scene === "gallery" && <GalleryScene key="gallery" onNext={goNext} />}
        {scene === "finale" && <FinaleScene key="finale" onNext={goNext} />}
        {scene === "secret" && <SecretScene key="secret" />}
      </AnimatePresence>

      {scene !== "intro" && <NavDots total={SCENES.length - 1} current={index - 1} />}
    </div>
  );
}
