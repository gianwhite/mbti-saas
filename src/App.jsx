import { useState, useCallback, useEffect, useRef, Component, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { supabase } from './supabase.js';
import {
  identifyUser, resetUser,
  trackTestStarted, trackTestCompleted,
  trackPaywallSeen, trackCheckoutStarted, trackSubscriptionActivated,
  trackTabOpened, trackAdvisorMessage, trackShareClicked,
  trackSignUp, trackLogin,
} from './analytics.js';

// ─────────────────────────────────────────────
// ERROR BOUNDARY
// ─────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "2rem", textAlign: "center", color: "#ff6b6b", maxWidth: "500px", margin: "0 auto" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
          <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Algo salió mal</h2>
          <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "1.5rem" }}>{this.state.error.message}</p>
          <button onClick={() => window.location.reload()} style={{ background: "#6C63FF", color: "#fff", border: "none", borderRadius: "8px", padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: 600 }}>
            Reiniciar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
// ─────────────────────────────────────────────
// AUTH CONTEXT
// ─────────────────────────────────────────────
const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }

function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) identifyUser(u.id, u.email);
      else resetUser();
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = (email, password) =>
    supabase.auth.signUp({ email, password });

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, ready, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────
// AUTH MODAL  (Login / Signup)
// ─────────────────────────────────────────────
function AuthModal({ onClose, onSuccess, title = "Crea tu cuenta", initialMode = "signup" }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode]       = useState(initialMode); // "signup" | "login"
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%", background: "#0f0f0f", border: "1px solid #222",
    borderRadius: "8px", padding: "0.75rem 1rem", color: "#fff",
    fontSize: "0.9rem", marginBottom: "0.65rem", outline: "none",
    boxSizing: "border-box",
  };

  const handleSubmit = async () => {
    setError("");
    if (!email || !email.includes("@")) { setError("Email inválido"); return; }
    if (password.length < 6) { setError("La contraseña debe tener al menos 6 caracteres"); return; }
    if (mode === "signup" && password !== confirm) { setError("Las contraseñas no coinciden"); return; }

    setLoading(true);
    try {
      const { error: err } = mode === "signup"
        ? await signUp(email, password)
        : await signIn(email, password);

      if (err) {
        if (err.message.includes("already registered")) setError("Este email ya tiene cuenta. Inicia sesión.");
        else if (err.message.includes("Invalid login")) setError("Email o contraseña incorrectos.");
        else setError(err.message);
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        setError("");
        trackSignUp();
        const { error: loginErr } = await signIn(email, password);
        if (!loginErr) onSuccess?.();
        else setError("Cuenta creada. Inicia sesión.");
      } else {
        trackLogin();
        onSuccess?.();
      }
    } catch (e) {
      setError("Error inesperado. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "1rem" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "20px", padding: "2rem", maxWidth: "400px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,transparent,#6C63FF,transparent)", borderRadius: "20px 20px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.3rem", textAlign: "center" }}>
          {mode === "signup" ? title : "Iniciar sesión"}
        </h2>
        <p style={{ color: "#555", fontSize: "0.8rem", textAlign: "center", marginBottom: "1.5rem" }}>
          {mode === "signup" ? "Crea tu cuenta para acceder a tu análisis" : "Bienvenido de vuelta"}
        </p>

        <input type="email" placeholder="tu@email.com" value={email}
          onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder={mode === "signup" ? "Contraseña (mín. 6 caracteres)" : "Contraseña"} value={password}
          onChange={e => setPassword(e.target.value)} style={inputStyle} />
        {mode === "signup" && (
          <input type="password" placeholder="Confirmar contraseña" value={confirm}
            onChange={e => setConfirm(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ ...inputStyle, marginBottom: "1rem" }} />
        )}
        {mode === "login" && (
          <div style={{ marginBottom: "1rem" }} />
        )}

        {error && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} className="btn-primary" style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg,#6C63FF,#9b59b6)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Procesando..." : mode === "signup" ? "Crear cuenta →" : "Entrar →"}
        </button>

        <p style={{ color: "#555", fontSize: "0.78rem", textAlign: "center", marginTop: "1rem" }}>
          {mode === "signup" ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
          <button onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }}
            style={{ background: "none", border: "none", color: "#6C63FF", cursor: "pointer", fontSize: "0.78rem", textDecoration: "underline" }}>
            {mode === "signup" ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
}

import { RAW_QUESTIONS, seededShuffle, calculateResult } from './data/questions.js';
import { TYPE_ANALYSIS } from './data/analysis.js';
import { TYPE_PROFESSIONAL } from './data/professional.js';
import { TYPES } from './data/types.js';

const QUESTIONS = seededShuffle(RAW_QUESTIONS);
const PRICE_DISPLAY = import.meta.env.VITE_PRICE_DISPLAY || '$19';

const LIKERT = [
  { value: 1, label: "Totalmente en desacuerdo" },
  { value: 2, label: "En desacuerdo" },
  { value: 3, label: "Lev. en desacuerdo" },
  { value: 4, label: "Neutral" },
  { value: 5, label: "Lev. de acuerdo" },
  { value: 6, label: "De acuerdo" },
  { value: 7, label: "Totalmente de acuerdo" },
];

const TABS = [
  { id: "perfil",         label: "Perfil",         icon: "◎", desc: "Tus dimensiones y puntuaciones",   free: true  },
  { id: "advisor",        label: "Advisor IA",     icon: "✦", desc: "Pregunta lo que quieras",          free: false },
  { id: "psicologia",     label: "Psicología",     icon: "🧬", desc: "Funciones cognitivas profundas",   free: false },
  { id: "vinculos",       label: "Vínculos",       icon: "💞", desc: "Apego y lenguajes del amor",       free: false },
  { id: "fortalezas",     label: "Fortalezas",     icon: "⚡", desc: "Tus mayores activos personales",   free: false },
  { id: "atraccion",      label: "Atracción",      icon: "🔥", desc: "Qué te hace magnético/a",          free: false },
  { id: "compatibilidad", label: "Compatibilidad", icon: "♾", desc: "Tipos y dinámicas relacionales",   free: false },
  { id: "profesional",    label: "Profesional",    icon: "💼", desc: "Carrera, liderazgo y entorno",     free: false },
];

// ─────────────────────────────────────────────
// UI ATOMS
// ─────────────────────────────────────────────
function Tag({ children, color = "#6C63FF" }) {
  return (
    <span style={{
      display: "inline-block", background: color + "22", color,
      border: `1px solid ${color}44`, borderRadius: "6px",
      padding: "2px 8px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em",
    }}>{children}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div className="card-hover" style={{
      background: "#111", border: "1px solid #1e1e1e",
      borderRadius: "14px", padding: "1.25rem", marginBottom: "0.85rem", ...style,
    }}>{children}</div>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "#888", fontSize: "0.75rem", letterSpacing: "0.1em" }}>PREGUNTA {current} DE {total}</span>
        <span style={{ color: "#888", fontSize: "0.75rem" }}>{pct}%</span>
      </div>
      <div style={{ height: "3px", background: "#222", borderRadius: "2px" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#6C63FF,#ff6b6b)", borderRadius: "2px", transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function DimensionBar({ dim, data }) {
  const labels = { EI: "Energía", SN: "Percepción", TF: "Decisiones", JP: "Estructura" };
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "#aaa", fontSize: "0.8rem", flexShrink: 0 }}>{labels[dim]}</span>
        <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, flexShrink: 0 }}>{data.letter} — {data.pct}%</span>
      </div>
      <div style={{ height: "6px", background: "#1e1e1e", borderRadius: "4px" }}>
        <div style={{ height: "100%", width: `${data.pct}%`, background: "linear-gradient(90deg,#6C63FF,#ff6b6b)", borderRadius: "4px", transition: "width 1s ease" }} />
      </div>
      <span style={{ color: "#555", fontSize: "0.75rem" }}>{data.label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// PAYWALL MODAL
// ─────────────────────────────────────────────
function PaywallModal({ type, onClose }) {
  const { user } = useAuth();
  const info = TYPES[type] || { color: "#6C63FF" };
  const [step, setStep]       = useState(user ? "checkout" : "auth"); // "auth" | "checkout"
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  // If user logs in during this modal, advance to checkout
  useEffect(() => { if (user && step === "auth") setStep("checkout"); }, [user]);

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');
    trackCheckoutStarted(type);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email }),
      });
      const data = await res.json();
      if (data.url) {
        localStorage.setItem('mbti_type', type);
        localStorage.setItem('mbti_display', JSON.stringify(null));
        window.location.href = data.url;
      } else {
        setError('Error al procesar. Intenta de nuevo.');
        setLoading(false);
      }
    } catch (e) {
      setError('Error de conexión. Intenta de nuevo.');
      setLoading(false);
    }
  };

  // Step 1: Auth (if not logged in)
  if (step === "auth") {
    return <AuthModal onClose={onClose} onSuccess={() => setStep("checkout")} title="Crea tu cuenta para continuar" />;
  }

  // Step 2: Checkout
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "1rem",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#111", border: `1px solid ${info.color}44`, borderRadius: "20px", padding: "2rem", maxWidth: "460px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${info.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🧠</div>
          <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", marginBottom: "0.4rem" }}>Membership {type}</h2>
          <div style={{ color: info.color, fontSize: "1.6rem", fontWeight: 900, marginBottom: "0.3rem" }}>{PRICE_DISPLAY}<span style={{ color: "#555", fontSize: "0.9rem", fontWeight: 400 }}>/mes</span></div>
          <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.6 }}>Cancela cuando quieras · Sin compromisos</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {["Advisor IA personalizado", "Funciones cognitivas", "Estilo de apego", "Lenguajes del amor", "Fortalezas y debilidades", "Compatibilidad top 3"].map(item => (
            <div key={item} style={{ background: "#0f0f0f", borderRadius: "8px", padding: "0.6rem 0.75rem", display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
              <span style={{ color: "#6C63FF", fontSize: "0.8rem", marginTop: "1px" }}>✓</span>
              <span style={{ color: "#999", fontSize: "0.78rem", lineHeight: 1.4 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Logged in as */}
        <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e", borderRadius: "8px", padding: "0.6rem 1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#6C63FF", fontSize: "0.8rem" }}>✓</span>
          <span style={{ color: "#777", fontSize: "0.82rem" }}>Cuenta: <span style={{ color: "#bbb" }}>{user?.email}</span></span>
        </div>

        {error && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{error}</p>}

        <button onClick={handleSubscribe} disabled={loading} className="btn-primary" style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Redirigiendo a Stripe..." : `Activar Membership — ${PRICE_DISPLAY}/mes`}
        </button>

        <p style={{ color: "#444", fontSize: "0.72rem", textAlign: "center", marginTop: "0.75rem" }}>
          Pago seguro vía Stripe · Tienes un código de descuento? Ingrésalo en el siguiente paso.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// NEURAL PARTICLES BACKGROUND
// ─────────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 55;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // Alternate violet/cyan
            ctx.strokeStyle = j % 2 === 0
              ? `rgba(167,139,250,${alpha})`
              : `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(167,139,250,0.45)' : 'rgba(34,211,238,0.35)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.55,
      }}
    />
  );
}

// ─────────────────────────────────────────────
// HEX LOADING ANIMATION
// ─────────────────────────────────────────────
function HexLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem 0" }}>
      <svg width="48" height="48" viewBox="228 88 224 254" xmlns="http://www.w3.org/2000/svg"
        style={{ animation: "hexPulse 1.8s ease-in-out infinite" }}>
        <defs>
          <linearGradient id="hlF" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="hlS" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
            <stop offset="0%" stopColor="#A78BFA"/>
            <stop offset="100%" stopColor="#22D3EE"/>
          </linearGradient>
        </defs>
        <polygon points="340,100 435,155 435,265 340,320 245,265 245,155" fill="none" stroke="#1D2238" strokeWidth="1.2"/>
        <line x1="340" y1="210" x2="340" y2="100" stroke="#1D2238" strokeWidth="1"/>
        <line x1="340" y1="210" x2="435" y2="155" stroke="#1D2238" strokeWidth="1"/>
        <line x1="340" y1="210" x2="435" y2="265" stroke="#1D2238" strokeWidth="1"/>
        <line x1="340" y1="210" x2="340" y2="320" stroke="#1D2238" strokeWidth="1"/>
        <line x1="340" y1="210" x2="245" y2="265" stroke="#1D2238" strokeWidth="1"/>
        <line x1="340" y1="210" x2="245" y2="155" stroke="#1D2238" strokeWidth="1"/>
        <polygon points="340,117 421,163 421,257 340,304 259,257 259,163" fill="url(#hlF)" stroke="url(#hlS)" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="340" cy="117" r="5" fill="#C4B5FD"/>
        <circle cx="421" cy="163" r="5" fill="#A78BFA"/>
        <circle cx="421" cy="257" r="5" fill="#22D3EE"/>
        <circle cx="340" cy="304" r="5" fill="#67E8F9"/>
        <circle cx="259" cy="257" r="5" fill="#7DD3FC"/>
        <circle cx="259" cy="163" r="5" fill="#93C5FD"/>
        <circle cx="340" cy="210" r="4" fill="#FFFFFF" opacity="0.9"/>
      </svg>
      <DotsText />
    </div>
  );
}

function DotsText() {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDots(d => d === 3 ? 1 : d + 1), 500);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ color: "#555", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
      Analizando{'.'.repeat(dots)}
    </span>
  );
}

// ─────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────
function LandingLogo() {
  return (
    <svg width="52" height="52" viewBox="228 88 224 254" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="llF" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
          <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.85"/>
          <stop offset="55%" stopColor="#3730A3" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.85"/>
        </linearGradient>
        <linearGradient id="llS" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
          <stop offset="0%" stopColor="#A78BFA"/>
          <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      <circle cx="340" cy="210" r="128" fill="none" stroke="#7C3AED" strokeWidth="0.8" opacity="0.2"/>
      <polygon points="340,100 435,155 435,265 340,320 245,265 245,155" fill="none" stroke="#1D2238" strokeWidth="1.2"/>
      <line x1="340" y1="210" x2="340" y2="100" stroke="#1D2238" strokeWidth="1"/>
      <line x1="340" y1="210" x2="435" y2="155" stroke="#1D2238" strokeWidth="1"/>
      <line x1="340" y1="210" x2="435" y2="265" stroke="#1D2238" strokeWidth="1"/>
      <line x1="340" y1="210" x2="340" y2="320" stroke="#1D2238" strokeWidth="1"/>
      <line x1="340" y1="210" x2="245" y2="265" stroke="#1D2238" strokeWidth="1"/>
      <line x1="340" y1="210" x2="245" y2="155" stroke="#1D2238" strokeWidth="1"/>
      <polygon points="340,117 421,163 421,257 340,304 259,257 259,163" fill="url(#llF)" stroke="url(#llS)" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon points="340,139 402,174 402,246 340,282 278,246 278,174" fill="none" stroke="url(#llS)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.4"/>
      <circle cx="340" cy="117" r="5" fill="#C4B5FD"/>
      <circle cx="421" cy="163" r="5" fill="#A78BFA"/>
      <circle cx="421" cy="257" r="5" fill="#22D3EE"/>
      <circle cx="340" cy="304" r="5" fill="#67E8F9"/>
      <circle cx="259" cy="257" r="5" fill="#7DD3FC"/>
      <circle cx="259" cy="163" r="5" fill="#93C5FD"/>
      <circle cx="340" cy="210" r="7" fill="url(#llS)" opacity="0.5"/>
      <circle cx="340" cy="210" r="3.5" fill="#FFFFFF" opacity="0.95"/>
    </svg>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const { user, ready, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState("signup");

  // Result exists in localStorage OR in Supabase user metadata
  const localResult = !!localStorage.getItem('mbti_type');
  const cloudResult = !!(user?.user_metadata?.mbti_type);
  const hasResult   = localResult || cloudResult;

  // If logged-in user already has a result, sync it to localStorage and go to /test
  useEffect(() => {
    if (!ready) return;
    if (user?.user_metadata?.mbti_type && !localResult) {
      localStorage.setItem('mbti_type', user.user_metadata.mbti_type);
      if (user.user_metadata.mbti_display) {
        localStorage.setItem('mbti_display', user.user_metadata.mbti_display);
      }
      navigate('/test');
    }
  }, [user, ready]);

  const handleCTA = () => navigate('/test');

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", overflowX: "hidden" }}>
      {/* Neural bg — only top portion */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <NeuralCanvas />
      </div>

      {/* ── NAV ── */}
      <nav className="land-nav" style={{ position: "relative", zIndex: 10, borderBottom: "1px solid #111", padding: "0.85rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <LandingLogo />
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontWeight: 900, fontSize: "1.2rem", background: "linear-gradient(90deg,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>16</span>
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#e0e0e0" }}>Personalidades</span>
            <sup style={{ color: "#A78BFA", fontSize: "0.55rem", fontWeight: 700, marginLeft: "1px" }}>AI</sup>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {ready && user ? (
            <>
              <span style={{ color: "#555", fontSize: "0.75rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              {hasResult && <button onClick={() => navigate('/test')} style={{ background: "none", border: "1px solid #333", borderRadius: "6px", color: "#aaa", cursor: "pointer", fontSize: "0.78rem", padding: "5px 12px" }}>Mi análisis →</button>}
              <button onClick={signOut} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#555", cursor: "pointer", fontSize: "0.72rem", padding: "4px 10px" }}>Salir</button>
            </>
          ) : (
            <button onClick={() => { setAuthInitialMode("login"); setShowAuthModal(true); }} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#777", cursor: "pointer", fontSize: "0.78rem", padding: "5px 14px" }}>Iniciar sesión</button>
          )}
        </div>
      </nav>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} title="Inicia sesión o crea tu cuenta" initialMode={authInitialMode} />}

      {/* ── HERO ── */}
      <section className="land-hero" style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "6rem 1.5rem 5rem", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ display: "inline-block", background: "#6C63FF18", border: "1px solid #6C63FF44", borderRadius: "20px", padding: "5px 16px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#A78BFA", marginBottom: "1.75rem" }}>
          TEST MBTI + ANÁLISIS DE IA · ESPAÑOL
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          Entender cómo piensas<br />
          <span style={{ background: "linear-gradient(90deg,#A78BFA,#22D3EE,#A78BFA)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
            es tu mayor ventaja.
          </span>
        </h1>
        <p style={{ color: "#777", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 2.5rem" }}>
          60 preguntas calibradas. Tu tipo MBTI exacto con análisis profundo de funciones cognitivas, compatibilidad, estilo de apego y cómo operas en relaciones y liderazgo.
        </p>
        <div className="land-hero-actions" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={handleCTA} style={{ background: "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "12px", padding: "1rem 2.5rem", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}>
            {hasResult ? "Ver mi análisis →" : "Hacer el test gratis →"}
          </button>
          <div className="land-hero-meta" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#444", fontSize: "0.82rem" }}>
            <span style={{ color: "#6C63FF" }}>✓</span> 60 preguntas · ~10 min
            <span style={{ color: "#6C63FF", marginLeft: "8px" }}>✓</span> Resultados inmediatos
          </div>
        </div>
        {/* Social proof strip */}
        <div className="land-stats" style={{ marginTop: "3rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          {[["4 800+", "análisis completados"], ["16", "tipos de personalidad"], ["6", "dimensiones de análisis"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, background: "linear-gradient(90deg,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
              <div style={{ color: "#444", fontSize: "0.72rem", letterSpacing: "0.05em" }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPE PILLS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 1.5rem 4rem", maxWidth: "900px", margin: "0 auto" }}>
        <div className="land-pills" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {[
            ["INTJ", "#6C63FF", "El Arquitecto"],
            ["ENFP", "#f97316", "El Inspirador"],
            ["INFJ", "#8b5cf6", "El Consejero"],
            ["ENTJ", "#ef4444", "El Comandante"],
            ["INTP", "#3b82f6", "El Lógico"],
            ["ISFJ", "#10b981", "El Protector"],
            ["ENTP", "#f59e0b", "El Debatidor"],
            ["INFP", "#ec4899", "El Mediador"],
          ].map(([type, color, label]) => (
            <div key={type} style={{ background: color + "12", border: `1px solid ${color}33`, borderRadius: "10px", padding: "0.45rem 0.9rem", display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ color, fontWeight: 800, fontSize: "0.85rem" }}>{type}</span>
              <span style={{ color: "#555", fontSize: "0.75rem" }}>{label}</span>
            </div>
          ))}
          <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "0.45rem 0.9rem", color: "#333", fontSize: "0.75rem" }}>+8 más</div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "4rem 1.5rem", background: "#0d0d0d", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>QUÉ OBTIENES</div>
            <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, color: "#fff" }}>Análisis que va más allá del tipo</h2>
            <p style={{ color: "#555", marginTop: "0.75rem", fontSize: "0.9rem" }}>No solo una letra. Entiende el sistema completo que te define.</p>
          </div>
          <div className="land-features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {[
              ["🧠", "Advisor IA personalizado", "Habla con una IA entrenada en tu tipo. Preguntas sobre relaciones, decisiones, carrera — respuestas contextualizadas a tu perfil."],
              ["⚡", "Funciones cognitivas", "Las 8 funciones de Jung ordenadas por tu tipo: cuáles son tu motor, cuáles tu talón de Aquiles."],
              ["💞", "Estilo de apego & amor", "Cómo te vinculas emocionalmente, tus lenguajes del amor y qué rompe la conexión contigo."],
              ["🎯", "Fortalezas & debilidades", "Lo que nadie te dice: tus puntos ciegos reales y las ventajas que probablemente estás desaprovechando."],
              ["🔥", "Atracción & química", "Qué tipos te atraen y por qué. Cómo funciona la tensión entre tipos y qué esperar a largo plazo."],
              ["🤝", "Compatibilidad top 3", "Los tres tipos más y menos compatibles contigo, con análisis de dinámica real de pareja."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="card-hover" style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                <div style={{ color: "#eee", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{title}</div>
                <div style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>CÓMO FUNCIONA</div>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, color: "#fff" }}>Simple. Tres pasos.</h2>
        </div>
        <div className="land-how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {[
            ["01", "#6C63FF", "Haz el test gratis", "60 preguntas diseñadas para detectar tu tipo con precisión. Toma ~10 minutos."],
            ["02", "#22D3EE", "Recibe tu tipo", "Resultado inmediato: tu tipo MBTI con perfil básico de personalidad — sin costo."],
            ["03", "#A78BFA", "Desbloquea el análisis", "Activa tu membership por $19/mes y accede a todas las dimensiones profundas."],
          ].map(([num, color, title, desc]) => (
            <div key={num} style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: color + "15", border: `2px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1rem", fontWeight: 900, color }}>
                {num}
              </div>
              <div style={{ color: "#eee", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</div>
              <div style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "4rem 1.5rem", background: "#0d0d0d", borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>TESTIMONIOS</div>
            <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", fontWeight: 800, color: "#fff" }}>Lo que dicen los usuarios</h2>
          </div>
          <div className="land-testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            {[
              ["INTJ", "#6C63FF", "Finalmente un análisis que no suena a horóscopo. El apartado de funciones cognitivas describe exactamente cómo proceso decisiones bajo presión.", "Alejandro R., México"],
              ["ENFP", "#f97316", "El Advisor IA es lo que hace la diferencia. Le pregunté sobre cómo manejar conflictos con mi pareja ISTJ y la respuesta fue sorprendentemente precisa.", "Valentina M., Colombia"],
              ["INFJ", "#8b5cf6", "Llevaba años sabiendo mi tipo pero nunca había entendido bien los patrones de atracción que tengo. El análisis de compatibilidad lo explica con claridad brutal.", "Diego F., Argentina"],
            ].map(([type, color, quote, name]) => (
              <div key={name} className="card-hover" style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ background: color + "15", border: `1px solid ${color}33`, borderRadius: "6px", padding: "2px 8px", fontSize: "0.75rem", fontWeight: 800, color }}>{type}</div>
                  <div style={{ display: "flex", gap: "2px" }}>{"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#f59e0b", fontSize: "0.7rem" }}>{s}</span>)}</div>
                </div>
                <p style={{ color: "#888", fontSize: "0.84rem", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1rem" }}>"{quote}"</p>
                <div style={{ color: "#444", fontSize: "0.75rem" }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 1.5rem", maxWidth: "480px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>PRECIO</div>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 800, color: "#fff", marginBottom: "2rem" }}>Un plan. Sin complicaciones.</h2>
        <div style={{ background: "#111", border: "1px solid #6C63FF44", borderRadius: "20px", padding: "2.5rem 2rem", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,transparent,#6C63FF,#22D3EE,transparent)", borderRadius: "20px 20px 0 0" }} />
          <div style={{ color: "#A78BFA", fontSize: "0.72rem", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.5rem" }}>MEMBERSHIP COMPLETA</div>
          <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>$19<span style={{ fontSize: "1rem", color: "#555", fontWeight: 400 }}>/mes</span></div>
          <div style={{ color: "#444", fontSize: "0.8rem", marginBottom: "2rem", marginTop: "0.4rem" }}>Cancela cuando quieras</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem", textAlign: "left" }}>
            {["Advisor IA personalizado a tu tipo", "Funciones cognitivas completas", "Análisis de apego y lenguajes del amor", "Fortalezas, debilidades y puntos ciegos", "Compatibilidad y química con otros tipos", "Atracción: por qué te atraen ciertos tipos", "Acceso inmediato · Sin permanencia"].map(item => (
              <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ color: "#6C63FF", fontSize: "0.85rem", marginTop: "1px", flexShrink: 0 }}>✓</span>
                <span style={{ color: "#888", fontSize: "0.85rem" }}>{item}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={handleCTA} style={{ width: "100%", background: "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "12px", padding: "1rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            {hasResult ? "Desbloquear análisis →" : "Hacer el test gratis →"}
          </button>
          <p style={{ color: "#333", fontSize: "0.75rem", marginTop: "1rem" }}>El test es gratuito. La membership desbloquea el análisis completo.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid #111", padding: "2rem 1.5rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "0.75rem" }}>
          <span style={{ fontWeight: 900, fontSize: "0.95rem", background: "linear-gradient(90deg,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>16 Personalidades</span>
          <sup style={{ color: "#A78BFA", fontSize: "0.5rem", fontWeight: 700 }}>AI</sup>
        </div>
        <p style={{ color: "#333", fontSize: "0.73rem" }}>Basado en el modelo MBTI · Myers-Briggs Type Indicator · © 2025</p>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────
// TEST INTRO (página /test antes de empezar)
// ─────────────────────────────────────────────
function TestIntro({ onStart }) {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto", padding: "2rem 1rem", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <NeuralCanvas />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.2 }}>Test de Personalidad MBTI</h1>
        <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.92rem" }}>60 preguntas · ~10 minutos · Resultados inmediatos</p>
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.25rem", marginBottom: "2rem", textAlign: "left" }}>
          <div style={{ color: "#555", fontSize: "0.68rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>INSTRUCCIONES</div>
          {[
            ["Responde según tu opinión genuina", "No hay respuestas correctas — refleja cómo realmente eres."],
            ["Usa tu primera reacción", "No pienses demasiado. La respuesta instintiva es la más precisa."],
            ["No saltes preguntas", "Puedes volver atrás cuando quieras."],
            ["Resultados inmediatos", "Al terminar verás tu tipo MBTI con análisis detallado."],
          ].map(([t, d]) => (
            <div key={t} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.85rem", alignItems: "flex-start" }}>
              <span style={{ color: "#6C63FF", marginTop: "3px", fontSize: "0.8rem" }}>✓</span>
              <div>
                <div style={{ color: "#eee", fontSize: "0.87rem", fontWeight: 600 }}>{t}</div>
                <div style={{ color: "#555", fontSize: "0.76rem", lineHeight: 1.5 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={onStart} style={{ background: "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem 2.5rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>
            COMENZAR TEST →
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')} style={{ background: "none", border: "1px solid #222", borderRadius: "10px", padding: "0.9rem 1.5rem", fontSize: "0.9rem", color: "#555", cursor: "pointer" }}>
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionScreen({ question, index, total, selected, onAnswer, onPrev }) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem 1rem" }}>
      <ProgressBar current={index + 1} total={total} />
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "2rem", marginBottom: "2rem", minHeight: "90px", display: "flex", alignItems: "center" }}>
        <p style={{ color: "#f0f0f0", fontSize: "1.1rem", lineHeight: 1.65, margin: 0, textAlign: "center", width: "100%" }}>{question.text}</p>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#555", fontSize: "0.7rem", maxWidth: "90px" }}>Totalmente en desacuerdo</span>
          <span style={{ color: "#555", fontSize: "0.7rem", maxWidth: "90px", textAlign: "right" }}>Totalmente de acuerdo</span>
        </div>
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
          {LIKERT.map(item => {
            const isSel = selected === item.value;
            const isMid = item.value === 4;
            return (
              <button key={item.value} onClick={() => onAnswer(item.value)} title={item.label} style={{ flex: 1, aspectRatio: "1", maxWidth: "48px", borderRadius: "50%", border: isSel ? "2px solid transparent" : `2px solid ${isMid ? "#333" : "#222"}`, background: isSel ? "linear-gradient(135deg,#6C63FF,#ff6b6b)" : isMid ? "#1a1a1a" : "#0f0f0f", color: isSel ? "#fff" : isMid ? "#555" : "#444", fontSize: "0.7rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s ease", transform: isSel ? "scale(1.15)" : "scale(1)" }}>{item.value}</button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onPrev} disabled={index === 0} style={{ background: "transparent", border: "1px solid #222", borderRadius: "8px", padding: "0.6rem 1.2rem", color: index === 0 ? "#333" : "#888", cursor: index === 0 ? "not-allowed" : "pointer", fontSize: "0.85rem" }}>← Anterior</button>
        <span style={{ color: "#333", fontSize: "0.75rem" }}>{selected ? "✓ Respondida" : "Selecciona una opción"}</span>
        <div style={{ width: "90px" }} />
      </div>
    </div>
  );
}

// ── Tab content components ──
// Generate a default display from the type string when real scores aren't available
function defaultDisplay(type) {
  const labels = {
    E: "Extrovertido", I: "Introvertido",
    N: "Intuitivo",    S: "Sensorial",
    F: "Sentimental",  T: "Racional",
    J: "Calificador",  P: "Perceptivo",
  };
  const defaults = { EI: 65, SN: 62, TF: 60, JP: 63 };
  const [e,s,t,j] = type.split('');
  return {
    EI: { letter: e, pct: defaults.EI, label: labels[e] },
    SN: { letter: s, pct: defaults.SN, label: labels[s] },
    TF: { letter: t, pct: defaults.TF, label: labels[t] },
    JP: { letter: j, pct: defaults.JP, label: labels[j] },
  };
}

function TabPerfil({ type, display, info }) {
  const effectiveDisplay = display || defaultDisplay(type);
  const entries = Object.entries(effectiveDisplay);
  return (
    <div>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>DESGLOSE POR DIMENSIÓN</div>
        {entries.map(([dim, data]) => <DimensionBar key={dim} dim={dim} data={data} />)}
      </Card>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>DISTRIBUCIÓN GLOBAL</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
          {entries.map(([dim, data]) => (
            <div key={dim} style={{ background: "#0f0f0f", borderRadius: "10px", padding: "0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: info.color }}>{data.letter}</div>
              <div style={{ fontSize: "0.72rem", color: "#666" }}>{data.label}</div>
              <div style={{ fontSize: "0.8rem", color: "#aaa", fontWeight: 600 }}>{data.pct}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TabSocial({ analysis }) {
  const s = analysis.social;
  return (
    <div>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em" }}>NIVEL SOCIAL</div>
          <Tag>{s.nivel}</Tag>
        </div>
        <p style={{ color: "#ccc", lineHeight: 1.75, margin: 0, fontSize: "0.9rem" }}>{s.descripcion}</p>
      </Card>
      <Card style={{ borderColor: "#ff6b6b22" }}>
        <div style={{ color: "#ff6b6b", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>PATRÓN DE SABOTAJE</div>
        <p style={{ color: "#bbb", lineHeight: 1.7, margin: 0, fontSize: "0.88rem" }}>{s.sabotaje}</p>
      </Card>
    </div>
  );
}

function TabPsicologia({ analysis, typeColor }) {
  const f = analysis.funciones;
  const fns = [
    { key: "dominante", label: "Dominante", badge: "1°", glow: typeColor },
    { key: "auxiliar",  label: "Auxiliar",  badge: "2°", glow: "#6C63FF" },
    { key: "terciaria", label: "Terciaria", badge: "3°", glow: "#888" },
    { key: "inferior",  label: "Inferior",  badge: "4°", glow: "#ff6b6b" },
  ];
  return (
    <div>
      {/* Stack header */}
      <Card style={{ borderColor: typeColor + "33", background: typeColor + "08" }}>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>STACK DE FUNCIONES COGNITIVAS</div>
        <div style={{ fontSize: "1.35rem", fontWeight: 900, color: typeColor, letterSpacing: "0.08em", marginBottom: "0.75rem" }}>{f.stack}</div>
        <p style={{ color: "#bbb", lineHeight: 1.7, margin: 0, fontSize: "0.87rem" }}>{f.resumen}</p>
      </Card>

      {/* Individual functions */}
      {fns.map(({ key, label, badge, glow }) => {
        const fn = f[key];
        return (
          <Card key={key} style={{ borderColor: glow + "33" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <span style={{ background: glow + "22", border: `1px solid ${glow}55`, borderRadius: "6px", padding: "2px 8px", fontWeight: 900, fontSize: "1.05rem", color: glow, letterSpacing: "0.04em" }}>{fn.codigo}</span>
                <span style={{ color: "#ccc", fontWeight: 600, fontSize: "0.9rem" }}>{fn.nombre}</span>
              </div>
              <span style={{ color: "#555", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em" }}>{label} {badge}</span>
            </div>
            <p style={{ color: "#888", lineHeight: 1.7, margin: 0, fontSize: "0.84rem" }}>{fn.descripcion}</p>
          </Card>
        );
      })}
    </div>
  );
}

function TabVinculos({ analysis, typeColor }) {
  const a = analysis.apego;
  const langColors = [typeColor, "#6C63FF", "#4ECDC4"];
  return (
    <div>
      {/* Apego */}
      <Card style={{ borderColor: typeColor + "33" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em" }}>ESTILO DE APEGO</div>
          <Tag color={typeColor}>{a.estilo}</Tag>
        </div>
        <p style={{ color: "#ccc", lineHeight: 1.75, margin: "0 0 0.85rem", fontSize: "0.88rem" }}>{a.descripcion}</p>
        <div style={{ background: "#0f0f0f", borderRadius: "10px", padding: "0.85rem", marginBottom: "0.6rem" }}>
          <div style={{ color: "#6C63FF", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>EN PAREJA</div>
          <p style={{ color: "#aaa", lineHeight: 1.65, margin: 0, fontSize: "0.84rem" }}>{a.en_pareja}</p>
        </div>
        <div style={{ background: "#0f0f0f", borderRadius: "10px", padding: "0.85rem", borderLeft: "3px solid #ff6b6b" }}>
          <div style={{ color: "#ff6b6b", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>TRIGGER DE ACTIVACIÓN</div>
          <p style={{ color: "#aaa", lineHeight: 1.65, margin: 0, fontSize: "0.84rem" }}>{a.trigger}</p>
        </div>
      </Card>

      {/* Lenguajes del amor */}
      <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>TOP 3 LENGUAJES DEL AMOR</div>
      {analysis.lenguajes.map((l, i) => (
        <Card key={i} style={{ borderColor: langColors[i] + "33" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: "32px", height: "32px", borderRadius: "50%", background: langColors[i] + "22", border: `1px solid ${langColors[i]}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 900, color: langColors[i], flexShrink: 0 }}>{l.posicion}</div>
            <div>
              <div style={{ color: langColors[i], fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.3rem" }}>{l.nombre}</div>
              <div style={{ color: "#888", fontSize: "0.84rem", lineHeight: 1.65 }}>{l.descripcion}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TabFortalezas({ analysis }) {
  return (
    <div>
      <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>FORTALEZAS RELACIONALES</div>
      {analysis.fortalezas.map((f, i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg,#6C63FF,#ff6b6b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900, color: "#fff", marginTop: "1px" }}>{i + 1}</div>
            <div>
              <div style={{ color: "#eee", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{f.titulo}</div>
              <div style={{ color: "#777", fontSize: "0.84rem", lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          </div>
        </Card>
      ))}
      <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", margin: "1.25rem 0 0.85rem" }}>DEBILIDADES A CONOCER</div>
      {analysis.debilidades.map((d, i) => (
        <Card key={i} style={{ borderColor: "#ff6b6b22" }}>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", background: "#ff6b6b22", border: "1px solid #ff6b6b44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#ff6b6b", marginTop: "1px" }}>▾</div>
            <div>
              <div style={{ color: "#eee", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{d.titulo}</div>
              <div style={{ color: "#777", fontSize: "0.84rem", lineHeight: 1.65 }}>{d.desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TabAtraccion({ analysis, typeColor }) {
  const a = analysis.atraccion;
  return (
    <div>
      <Card style={{ borderColor: typeColor + "33", background: typeColor + "08" }}>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.5rem" }}>TIPO DE ATRACCIÓN QUE PROYECTAS</div>
        <div style={{ color: typeColor, fontWeight: 700, fontSize: "1rem", marginBottom: "0.6rem" }}>{a.tipo}</div>
        <p style={{ color: "#bbb", lineHeight: 1.7, margin: 0, fontSize: "0.88rem" }}>{a.descripcion}</p>
      </Card>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>QUÉ MAXIMIZA TU ATRACTIVO</div>
        {a.maximiza.map((m, i) => (
          <div key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.65rem", alignItems: "flex-start" }}>
            <span style={{ color: "#6C63FF", fontSize: "0.9rem", marginTop: "1px" }}>▸</span>
            <span style={{ color: "#ccc", fontSize: "0.87rem", lineHeight: 1.6 }}>{m}</span>
          </div>
        ))}
      </Card>
      <Card style={{ borderColor: "#ff6b6b22" }}>
        <div style={{ color: "#ff6b6b", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>ERRORES QUE DESTRUYEN LA ATRACCIÓN</div>
        {a.errores.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.65rem", alignItems: "flex-start" }}>
            <span style={{ color: "#ff6b6b", fontSize: "0.9rem", marginTop: "1px" }}>✕</span>
            <span style={{ color: "#bbb", fontSize: "0.87rem", lineHeight: 1.6 }}>{e}</span>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>ESTRATEGIAS CONCRETAS</div>
        {a.estrategias.map((s, i) => (
          <div key={i} style={{ background: "#0f0f0f", borderRadius: "10px", padding: "0.85rem", marginBottom: "0.6rem", borderLeft: "3px solid #6C63FF" }}>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ color: "#6C63FF", fontWeight: 900, fontSize: "0.8rem", marginTop: "2px" }}>{i + 1}</span>
              <span style={{ color: "#ccc", fontSize: "0.87rem", lineHeight: 1.65 }}>{s}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

const ALL_TYPES = ["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"];

function TabCompatibilidad({ analysis, myType, typeColor }) {
  const c = analysis.compatibilidad;
  const [selected, setSelected] = useState(null);

  // Share test link
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://16personalidades.app';
  const shareText = `¿Cuál es tu tipo de personalidad? Haz el test y descubre si somos compatibles 👇`;

  const handleShareTest = async () => {
    const shareData = { title: '16 Personalidades AI', text: shareText, url: shareUrl };
    if (navigator.canShare?.(shareData)) {
      try { await navigator.share(shareData); return; } catch {}
    }
    try { await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`); alert('¡Link copiado! Pégalo donde quieras compartirlo.'); } catch {}
  };

  // Build cross-analysis for selected type
  const getCompatInfo = (targetType) => {
    const topMatch = c.top.find(m => m.tipo === targetType);
    const isEvitar  = c.evitar.tipo === targetType;
    // Check reverse: does target type list myType in their top?
    const targetAnalysis = TYPE_ANALYSIS[targetType];
    const reverseMatch = targetAnalysis?.compatibilidad?.top?.find(m => m.tipo === myType);
    const reverseEvitar = targetAnalysis?.compatibilidad?.evitar?.tipo === myType;
    return { topMatch, isEvitar, reverseMatch, reverseEvitar };
  };

  const sel = selected;
  const selInfo = sel ? TYPES[sel] || { color: "#888", name: sel } : null;
  const compat = sel ? getCompatInfo(sel) : null;

  // Compatibility score label
  const getLevel = (compat) => {
    if (!compat) return null;
    if (compat.topMatch && compat.reverseMatch) return { label: "Compatibilidad alta", color: "#22c55e", emoji: "🔥" };
    if (compat.topMatch || compat.reverseMatch) return { label: "Compatibilidad media-alta", color: "#A78BFA", emoji: "✨" };
    if (compat.isEvitar || compat.reverseEvitar) return { label: "Alta fricción potencial", color: "#ff6b6b", emoji: "⚠️" };
    return { label: "Compatibilidad neutral", color: "#888", emoji: "◈" };
  };

  return (
    <div>
      {/* ── Selector header ── */}
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
          ¿CON QUIÉN QUIERES COMPARARTE?
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {ALL_TYPES.map(t => {
            const ti = TYPES[t] || { color: "#888" };
            const isMe = t === myType;
            const isSel = t === selected;
            return (
              <button
                key={t}
                disabled={isMe}
                onClick={() => setSelected(isSel ? null : t)}
                style={{
                  background: isSel ? ti.color + "33" : "#0f0f0f",
                  border: `1px solid ${isSel ? ti.color : isMe ? "#222" : "#2a2a2a"}`,
                  borderRadius: "8px", padding: "5px 10px",
                  color: isMe ? "#333" : isSel ? ti.color : "#777",
                  fontSize: "0.78rem", fontWeight: isSel ? 700 : 500,
                  cursor: isMe ? "default" : "pointer",
                  transition: "all 0.15s",
                }}
              >
                {t}{isMe ? " (tú)" : ""}
              </button>
            );
          })}
        </div>
      </Card>

      {/* ── Cross analysis result ── */}
      {sel && compat && (() => {
        const level = getLevel(compat);
        return (
          <div className="fade-up">
            {/* Header card */}
            <Card style={{ borderColor: selInfo.color + "44", background: `linear-gradient(135deg, #111 60%, ${selInfo.color}08)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
                <div style={{ background: selInfo.color + "22", border: `1px solid ${selInfo.color}55`, borderRadius: "10px", padding: "6px 14px", fontWeight: 900, fontSize: "1.25rem", color: selInfo.color }}>{sel}</div>
                <div>
                  <div style={{ color: "#eee", fontWeight: 600, fontSize: "0.9rem" }}>{selInfo.name || sel}</div>
                  <div style={{ color: level.color, fontSize: "0.75rem", fontWeight: 600, marginTop: "2px" }}>{level.emoji} {level.label}</div>
                </div>
              </div>

              {/* From your analysis */}
              {compat.topMatch && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ color: "#555", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>DESDE TU PERSPECTIVA ({myType})</div>
                  <p style={{ color: "#bbb", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{compat.topMatch.por_que}</p>
                </div>
              )}
              {compat.isEvitar && (
                <div style={{ background: "#ff6b6b11", border: "1px solid #ff6b6b33", borderRadius: "8px", padding: "0.65rem 0.85rem", marginBottom: "0.75rem" }}>
                  <div style={{ color: "#ff6b6b", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>ALERTA DE FRICCIÓN</div>
                  <p style={{ color: "#cc8888", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{c.evitar.razon}</p>
                </div>
              )}

              {/* From their analysis */}
              {compat.reverseMatch && (
                <div style={{ background: "#0f0f0f", borderRadius: "8px", padding: "0.65rem 0.85rem", marginBottom: "0.75rem" }}>
                  <div style={{ color: selInfo.color, fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>DESDE SU PERSPECTIVA ({sel})</div>
                  <p style={{ color: "#aaa", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{compat.reverseMatch.por_que}</p>
                </div>
              )}

              {/* How to connect */}
              {compat.topMatch?.como_conectar && (
                <div style={{ background: "#6C63FF11", border: "1px solid #6C63FF33", borderRadius: "8px", padding: "0.65rem 0.85rem" }}>
                  <div style={{ color: "#6C63FF", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>CÓMO CONECTAR</div>
                  <p style={{ color: "#aaa", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>{compat.topMatch.como_conectar}</p>
                </div>
              )}

              {/* Neutral fallback */}
              {!compat.topMatch && !compat.isEvitar && !compat.reverseMatch && (
                <p style={{ color: "#666", fontSize: "0.84rem", lineHeight: 1.65, margin: 0 }}>
                  Este tipo no aparece en tu lista de mayor compatibilidad ni en la de mayor fricción. La dinámica dependerá más del desarrollo individual de cada persona que del tipo en sí.
                </p>
              )}
            </Card>

            {/* ── Share CTA ── */}
            <Card style={{ borderColor: "#2a2a2a", textAlign: "center" }}>
              <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>🤔</div>
              <div style={{ color: "#ccc", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                ¿No sabes el tipo de tu pareja o amigo?
              </div>
              <div style={{ color: "#555", fontSize: "0.78rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                Envíales el test y descubre al instante si son compatibles
              </div>
              <button
                onClick={handleShareTest}
                className="btn-primary"
                style={{ width: "100%", background: `linear-gradient(135deg, ${typeColor}, #6C63FF)`, color: "#fff", border: "none", borderRadius: "12px", padding: "0.85rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}
              >
                ↗ Enviar test a alguien
              </button>
              <div style={{ marginTop: "0.5rem", fontSize: "0.68rem", color: "#444" }}>
                Comparte por WhatsApp, Instagram o donde quieras
              </div>
            </Card>
          </div>
        );
      })()}

      {/* ── Default view (no type selected) ── */}
      {!sel && (
        <div>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>TUS TOP 3 MÁS COMPATIBLES</div>
          {c.top.map((match, i) => {
            const mi = TYPES[match.tipo] || { color: "#888", name: match.tipo };
            return (
              <Card key={i} style={{ borderColor: mi.color + "33", cursor: "pointer" }} onClick={() => setSelected(match.tipo)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                    <div style={{ background: mi.color + "22", border: `1px solid ${mi.color}55`, borderRadius: "8px", padding: "4px 10px", fontWeight: 900, fontSize: "1rem", color: mi.color }}>{match.tipo}</div>
                    <div style={{ color: "#888", fontSize: "0.8rem" }}>{mi.name}</div>
                  </div>
                  <Tag color={mi.color}>#{i + 1}</Tag>
                </div>
                <p style={{ color: "#bbb", fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 0.6rem" }}>{match.por_que}</p>
                <div style={{ background: "#0f0f0f", borderRadius: "8px", padding: "0.65rem 0.85rem" }}>
                  <div style={{ color: "#6C63FF", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>CÓMO CONECTAR</div>
                  <div style={{ color: "#aaa", fontSize: "0.83rem", lineHeight: 1.6 }}>{match.como_conectar}</div>
                </div>
              </Card>
            );
          })}
          <div style={{ color: "#ff6b6b", fontSize: "0.7rem", letterSpacing: "0.12em", margin: "1.25rem 0 0.85rem" }}>TIPO A EVITAR</div>
          <Card style={{ borderColor: "#ff6b6b33", cursor: "pointer" }} onClick={() => setSelected(c.evitar.tipo)}>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.6rem" }}>
              <div style={{ background: "#ff6b6b22", border: "1px solid #ff6b6b55", borderRadius: "8px", padding: "4px 10px", fontWeight: 900, fontSize: "1rem", color: "#ff6b6b" }}>{c.evitar.tipo}</div>
              <Tag color="#ff6b6b">Fricción alta</Tag>
            </div>
            <p style={{ color: "#bbb", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>{c.evitar.razon}</p>
          </Card>

          {/* Share CTA always visible */}
          <Card style={{ borderColor: "#2a2a2a", textAlign: "center", marginTop: "0.5rem" }}>
            <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>🤔</div>
            <div style={{ color: "#ccc", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>
              ¿No sabes el tipo de tu pareja o amigo?
            </div>
            <div style={{ color: "#555", fontSize: "0.78rem", marginBottom: "1rem", lineHeight: 1.5 }}>
              Envíales el test y descubre al instante si son compatibles
            </div>
            <button
              onClick={handleShareTest}
              className="btn-primary"
              style={{ width: "100%", background: `linear-gradient(135deg, ${typeColor}, #6C63FF)`, color: "#fff", border: "none", borderRadius: "12px", padding: "0.85rem", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}
            >
              ↗ Enviar test a alguien
            </button>
            <div style={{ marginTop: "0.5rem", fontSize: "0.68rem", color: "#444" }}>
              Comparte por WhatsApp, Instagram o donde quieras
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// TAB PROFESIONAL
// ─────────────────────────────────────────────
function TabProfesional({ type, typeColor }) {
  const data = TYPE_PROFESSIONAL[type];
  if (!data) return <Card><p style={{ color: "#555", fontSize: "0.85rem" }}>Análisis profesional próximamente.</p></Card>;

  return (
    <div>
      {/* Resumen ejecutivo */}
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>PERFIL PROFESIONAL</div>
        <p style={{ color: "#ccc", lineHeight: 1.75, fontSize: "0.88rem" }}>{data.resumen}</p>
      </Card>

      {/* Carreras top */}
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>CARRERAS & ROLES DE ALTO IMPACTO</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {data.carreras_top.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ minWidth: "28px", height: "28px", borderRadius: "8px", background: typeColor + "18", border: `1px solid ${typeColor}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 900, color: typeColor, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ color: "#eee", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{c.rol}</div>
                <div style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.6 }}>{c.razon}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Grid — liderazgo + dinero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.25rem" }}>
          <div style={{ color: typeColor, fontSize: "0.68rem", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>ESTILO DE LIDERAZGO</div>
          <p style={{ color: "#888", fontSize: "0.81rem", lineHeight: 1.65, margin: 0 }}>{data.estilo_liderazgo}</p>
        </div>
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.25rem" }}>
          <div style={{ color: typeColor, fontSize: "0.68rem", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>RELACIÓN CON EL DINERO</div>
          <p style={{ color: "#888", fontSize: "0.81rem", lineHeight: 1.65, margin: 0 }}>{data.relacion_dinero}</p>
        </div>
      </div>

      {/* Entorno ideal */}
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>ENTORNO QUE TE POTENCIA</div>
        <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>{data.entorno_ideal}</p>
      </Card>

      {/* Errores de carrera */}
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>ERRORES QUE DEBES EVITAR</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {data.errores_carrera.map((e, i) => (
            <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
              <div style={{ minWidth: "20px", height: "20px", borderRadius: "50%", background: "#ff6b6b18", border: "1px solid #ff6b6b33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#ff6b6b", marginTop: "1px", flexShrink: 0 }}>✕</div>
              <p style={{ color: "#777", fontSize: "0.83rem", lineHeight: 1.6, margin: 0 }}>{e}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Consejo clave */}
      <div style={{ background: `linear-gradient(135deg, ${typeColor}10, #0d0d0d)`, border: `1px solid ${typeColor}33`, borderRadius: "14px", padding: "1.25rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${typeColor}, transparent)` }} />
        <div style={{ color: typeColor, fontSize: "0.68rem", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "0.6rem" }}>CONSEJO CLAVE</div>
        <p style={{ color: "#ddd", fontSize: "0.88rem", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{data.consejo_clave}"</p>
      </div>
    </div>
  );
}

function TabAdvisor({ type, typeColor }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useState(null);

  const SUGGESTIONS = [
    "¿Cuáles son mis mayores errores al socializar?",
    "¿Cómo proyecto más atracción siendo " + type + "?",
    "¿Qué tipo de personalidad me complementa mejor?",
    "¿Cómo manejo el conflicto en una relación?",
  ];

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    trackAdvisorMessage(type);
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mbtiType: type,
          messages: newMessages,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Error al conectar. Intenta de nuevo.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error de conexión. Intenta de nuevo.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Header */}
      <Card style={{ borderColor: typeColor + "33", background: typeColor + "08", marginBottom: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: typeColor, fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.2rem" }}>Advisor {type}</div>
            <div style={{ color: "#666", fontSize: "0.78rem" }}>Consejos anclados en tu tipo · Preguntas ilimitadas</div>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg, ${typeColor}, #6C63FF)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🧠</div>
        </div>
      </Card>

      {/* Suggestions (only when no messages) */}
      {messages.length === 0 && (
        <div>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>PREGUNTAS FRECUENTES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => sendMessage(s)} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "0.7rem 1rem", color: "#aaa", fontSize: "0.84rem", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = typeColor + "55"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e1e"}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message history */}
      {messages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "420px", overflowY: "auto", paddingRight: "2px" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === 'user' ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "88%",
                background: m.role === 'user' ? `linear-gradient(135deg, ${typeColor}33, #6C63FF33)` : "#111",
                border: `1px solid ${m.role === 'user' ? typeColor + "44" : "#1e1e1e"}`,
                borderRadius: m.role === 'user' ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "0.75rem 1rem",
                color: m.role === 'user' ? "#eee" : "#ccc",
                fontSize: "0.87rem",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
              }}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <HexLoader />
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Pregunta algo sobre tu tipo..."
          disabled={loading}
          style={{
            flex: 1, background: "#111", border: "1px solid #222", borderRadius: "10px",
            padding: "0.75rem 1rem", color: "#fff", fontSize: "0.88rem", outline: "none",
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? "#1a1a1a" : `linear-gradient(135deg, ${typeColor}, #6C63FF)`,
            border: "none", borderRadius: "10px", padding: "0.75rem 1rem",
            color: loading || !input.trim() ? "#444" : "#fff",
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            fontSize: "1rem", fontWeight: 700, minWidth: "44px",
          }}
        >→</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SHARE MODAL
// ─────────────────────────────────────────────
// Generates a 1080x1920 Instagram Story canvas and returns a blob URL
function generateStoryCanvas(type, info) {
  const W = 1080, H = 1920;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Parse hex color to rgb components
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return { r, g, b };
  };
  const c = hexToRgb(info.color.length === 7 ? info.color : '#6C63FF');

  // Background — deep dark with radial glow
  ctx.fillStyle = '#080810';
  ctx.fillRect(0, 0, W, H);

  // Radial glow at center-top
  const grd = ctx.createRadialGradient(W/2, H*0.38, 0, W/2, H*0.38, 700);
  grd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.22)`);
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Grid lines — subtle
  ctx.strokeStyle = 'rgba(255,255,255,0.025)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
  for (let y = 0; y < H; y += 120) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }

  // Top label
  ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.7)`;
  ctx.font = '700 52px -apple-system, Inter, sans-serif';
  ctx.letterSpacing = '12px';
  ctx.textAlign = 'center';
  ctx.fillText('MI TIPO DE PERSONALIDAD', W/2, 280);

  // Hexagon badge outline
  const cx = W/2, cy = H*0.42, hr = 280;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI/6;
    const px = cx + hr * Math.cos(angle);
    const py = cy + hr * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},0.5)`;
  ctx.lineWidth = 4;
  ctx.stroke();
  // Inner hex fill
  const innerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, hr);
  innerGrd.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.15)`);
  innerGrd.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0.02)`);
  ctx.fillStyle = innerGrd;
  ctx.fill();

  // Type letters — big
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 260px -apple-system, Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(type, W/2, cy);

  // Color accent under type
  ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.9)`;
  ctx.fillRect(W/2 - 120, cy + 160, 240, 6);

  // Type name
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#f0f0f0';
  ctx.font = `700 72px -apple-system, Inter, sans-serif`;
  ctx.fillText(info.name, W/2, H*0.67);

  // Tagline — word wrap
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.font = `400 44px -apple-system, Inter, sans-serif`;
  const tagline = `"${info.tagline}"`;
  const maxWidth = W - 180;
  const words = tagline.split(' ');
  let line = '', lines = [], lineY = H * 0.74;
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxWidth && line !== '') {
      lines.push(line.trim()); line = word + ' ';
    } else { line = test; }
  }
  lines.push(line.trim());
  lines.forEach((l, i) => ctx.fillText(l, W/2, lineY + i * 58));

  // Bottom — domain
  ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.55)`;
  ctx.font = '600 46px -apple-system, Inter, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('16personalidades.app', W/2, H - 140);

  return canvas.toDataURL('image/png');
}

function ShareModal({ type, info, onClose }) {
  const [copied, setCopied]         = useState(false);
  const [storyDataUrl, setStoryDataUrl] = useState(null);
  const [igShared, setIgShared]     = useState(false);
  const url  = `https://16personalidades.app`;
  const text = `Soy ${type} — ${info.name}. Descubre tu tipo de personalidad MBTI:`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
  const twitterUrl  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  // Generate story image on mount
  useEffect(() => {
    try { setStoryDataUrl(generateStoryCanvas(type, info)); } catch {}
  }, [type, info]);

  // Instagram Story: download image + prompt user to share
  const handleInstagram = async () => {
    if (!storyDataUrl) return;
    // Try native share with file (works on Android/iOS Chrome)
    try {
      const blob = await (await fetch(storyDataUrl)).blob();
      const file = new File([blob], `mbti-${type}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `Soy ${type} — ${info.name}` });
        return;
      }
    } catch {}
    // Fallback: download the image
    const a = document.createElement('a');
    a.href = storyDataUrl;
    a.download = `mbti-${type}-historia.png`;
    a.click();
    setIgShared(true);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `Soy ${type} — ${info.name}`, text, url }); } catch {}
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "1rem", overflowY: "auto" }} onClick={onClose}>
      <div className="share-modal-card" onClick={e => e.stopPropagation()} style={{ background: "#111", border: `1px solid ${info.color}44`, borderRadius: "20px", padding: "2rem", maxWidth: "420px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,transparent,${info.color},transparent)`, borderRadius: "20px 20px 0 0" }} />
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>COMPARTIR MI TIPO</div>
          {/* Preview card */}
          <div style={{ background: `linear-gradient(160deg, #0d0d0d, ${info.color}18)`, border: `1px solid ${info.color}33`, borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "0.62rem", color: "#444", letterSpacing: "0.18em", marginBottom: "0.5rem" }}>MI TIPO MBTI</div>
            <div style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "0.1em", background: `linear-gradient(90deg,${info.color},#fff,${info.color})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite", lineHeight: 1, marginBottom: "0.4rem" }}>{type}</div>
            <div style={{ color: "#ccc", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{info.name}</div>
            <div style={{ color: "#444", fontSize: "0.75rem", fontStyle: "italic" }}>"{info.tagline}"</div>
            <div style={{ marginTop: "0.75rem", color: "#2a2a2a", fontSize: "0.65rem", letterSpacing: "0.06em" }}>16personalidades.app</div>
          </div>
        </div>

        {/* Instagram Story — hero button */}
        <button onClick={handleInstagram} className="btn-primary" style={{ width: "100%", background: "linear-gradient(135deg,#833AB4,#FD1D1D,#F56040,#FCAF45)", color: "#fff", border: "none", borderRadius: "12px", padding: "0.95rem", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", marginBottom: "0.6rem", letterSpacing: "0.02em" }}>
          📸 Historia de Instagram
        </button>
        {igShared && (
          <p style={{ color: "#555", fontSize: "0.75rem", textAlign: "center", marginBottom: "0.75rem", lineHeight: 1.5 }}>
            Imagen guardada · Ábrela en Instagram → <strong style={{ color: "#aaa" }}>+ Nueva historia</strong>
          </p>
        )}

        {/* Other share options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navigator.share && (
            <button onClick={handleNativeShare} style={{ width: "100%", background: "#0f0f0f", border: `1px solid ${info.color}22`, borderRadius: "10px", padding: "0.75rem", color: "#aaa", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 }}>
              📤 Compartir (sistema)
            </button>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#0f0f0f", border: "1px solid #25D36625", borderRadius: "10px", padding: "0.75rem", textAlign: "center", textDecoration: "none", color: "#25D366", fontSize: "0.85rem", fontWeight: 600 }}>
              WhatsApp
            </a>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: "#0f0f0f", border: "1px solid #1DA1F225", borderRadius: "10px", padding: "0.75rem", textAlign: "center", textDecoration: "none", color: "#1DA1F2", fontSize: "0.85rem", fontWeight: 600 }}>
              Twitter / X
            </a>
          </div>
          <button onClick={handleCopy} style={{ width: "100%", background: "none", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "0.7rem", color: copied ? info.color : "#444", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "color 0.2s" }}>
            {copied ? "✓ Copiado" : "Copiar enlace"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// RESULTS SCREEN
// ─────────────────────────────────────────────
function ResultsScreen({ type, display, onRetake }) {
  const info     = TYPES[type] || { name: "Tipo desconocido", color: "#888", tagline: "" };
  const analysis = TYPE_ANALYSIS[type];
  const [tab, setTab]         = useState(null); // null = hub grid, string = open section
  const [copied, setCopied]   = useState(false);
  const [isPaid, setIsPaid]   = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const { user } = useAuth();

  // Check subscription on mount (and whenever user changes)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const storedCustomerId = localStorage.getItem('mbti_customer_id');

    if (sessionId) {
      // Return from Stripe checkout — verify and store customer ID
      fetch(`/api/verify-access?session_id=${sessionId}`)
        .then(r => r.json())
        .then(data => {
          if (data.active) {
            localStorage.setItem('mbti_customer_id', data.customerId);
            setIsPaid(true);
            trackSubscriptionActivated(type);
          }
          window.history.replaceState({}, '', '/test');
        })
        .catch(() => {});
    } else if (storedCustomerId) {
      // Returning user with stored customer ID — re-verify
      fetch(`/api/verify-access?customer_id=${storedCustomerId}`)
        .then(r => r.json())
        .then(data => {
          if (data.active) setIsPaid(true);
          else {
            localStorage.removeItem('mbti_customer_id');
            // Fallback: try by email if logged in
            if (user?.email) {
              fetch(`/api/verify-access?email=${encodeURIComponent(user.email)}`)
                .then(r => r.json())
                .then(d => {
                  if (d.active) {
                    if (d.customerId) localStorage.setItem('mbti_customer_id', d.customerId);
                    setIsPaid(true);
                  }
                })
                .catch(() => {});
            }
          }
        })
        .catch(() => {});
    } else if (user?.email) {
      // No stored customer ID but user is logged in — look up by email
      fetch(`/api/verify-access?email=${encodeURIComponent(user.email)}`)
        .then(r => r.json())
        .then(data => {
          if (data.active) {
            if (data.customerId) localStorage.setItem('mbti_customer_id', data.customerId);
            setIsPaid(true);
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const handleManageSubscription = async () => {
    const customerId = localStorage.getItem('mbti_customer_id');
    if (!customerId) return;
    try {
      const res = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {}
  };

  const handleTabClick = (tabId, isFree) => {
    if (!isFree && !isPaid) {
      setShowPaywall(true);
      trackPaywallSeen('tab_click');
      return;
    }
    setTab(tabId);
    trackTabOpened(tabId, type);
    // Scroll to top of results when entering a section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showShare, setShowShare] = useState(false);
  const handleShare = () => { setShowShare(true); trackShareClicked(type); };

  return (
    <div style={{ maxWidth: "640px", width: "100%", margin: "0 auto", padding: "1.5rem 1rem 3rem", boxSizing: "border-box" }}>
      {showPaywall && <PaywallModal type={type} onClose={() => setShowPaywall(false)} onPay={() => {}} />}
      {showShare   && <ShareModal type={type} info={info} onClose={() => setShowShare(false)} />}

      {/* Hero */}
      <div className="results-hero" style={{ background: `linear-gradient(160deg, #111 60%, ${info.color}0d)`, border: `1px solid ${info.color}44`, borderRadius: "24px", padding: "2rem 1.75rem 1.75rem", textAlign: "center", marginBottom: "1.25rem", position: "relative", overflow: "hidden" }}>
        {/* Top glow bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${info.color}, transparent)` }} />
        {/* Background glow */}
        <div style={{ position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)", width: "200px", height: "200px", borderRadius: "50%", background: info.color, opacity: 0.04, filter: "blur(40px)", pointerEvents: "none" }} />

        {/* Post-payment celebration */}
        {isPaid && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#6C63FF18", border: "1px solid #6C63FF44", borderRadius: "20px", padding: "4px 12px", marginBottom: "1rem", fontSize: "0.72rem", color: "#A78BFA", fontWeight: 600, letterSpacing: "0.05em" }}>
            ✦ MEMBERSHIP ACTIVA
            <button onClick={handleManageSubscription} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "0.68rem", textDecoration: "underline", padding: 0, marginLeft: "4px" }}>gestionar</button>
          </div>
        )}

        <div style={{ fontSize: "0.65rem", color: "#444", letterSpacing: "0.2em", marginBottom: "0.6rem", textTransform: "uppercase" }}>Tu tipo de personalidad</div>

        {/* Big type badge */}
        <div style={{ display: "inline-block", background: `${info.color}15`, border: `2px solid ${info.color}55`, borderRadius: "16px", padding: "0.4rem 1.4rem", marginBottom: "0.75rem", boxShadow: `0 0 24px ${info.color}33` }}>
          <span className="shimmer-text" style={{ fontSize: "3.2rem", fontWeight: 900, letterSpacing: "0.12em", lineHeight: 1, background: `linear-gradient(90deg, ${info.color}, #fff, ${info.color})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{type}</span>
        </div>

        <div style={{ fontSize: "1.25rem", color: "#f0f0f0", fontWeight: 700, marginBottom: "0.4rem" }}>{info.name}</div>
        <div style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic", maxWidth: "380px", margin: "0 auto" }}>"{info.tagline}"</div>

        {/* Dimension pills */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.25rem", flexWrap: "wrap" }}>
          {Object.entries(display || defaultDisplay(type)).map(([dim, data]) => (
            <div key={dim} style={{ background: "#0f0f0f", border: `1px solid ${info.color}22`, borderRadius: "8px", padding: "4px 10px", fontSize: "0.72rem", color: "#888" }}>
              <span style={{ color: info.color, fontWeight: 700 }}>{data.letter}</span> {data.pct}%
            </div>
          ))}
        </div>
      </div>

      {/* ── Unlock Banner (non-paid only) ── */}
      {!isPaid && (
        <div className="fade-up" style={{ background: `linear-gradient(135deg, #0f0f0f 0%, ${info.color}0a 100%)`, border: `1px solid ${info.color}44`, borderRadius: "18px", padding: "1.25rem 1.4rem", marginBottom: "1.25rem", position: "relative", overflow: "hidden" }}>
          {/* Glow top border */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${info.color}99, transparent)` }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem" }}>
            {/* Icon */}
            <div style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "2px" }}>🧠</div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: "0.3rem", lineHeight: 1.3 }}>
                Descubre qué significa ser {type} en profundidad
              </div>
              <div style={{ fontSize: "0.78rem", color: "#666", marginBottom: "0.85rem", lineHeight: 1.5 }}>
                Tu perfil básico está listo. Desbloquea el análisis completo:
              </div>

              {/* Feature list */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px 1rem", marginBottom: "1rem" }}>
                {[
                  ["🧬", "Funciones cognitivas"],
                  ["💞", "Compatibilidad de pareja"],
                  ["⚡", "Fortalezas y sabotajes"],
                  ["🎯", "Atracción y vínculos"],
                  ["💼", "Carrera y liderazgo"],
                  ["🤖", "Advisor IA ilimitado"],
                ].map(([icon, text]) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.73rem", color: "#999" }}>
                    <span style={{ fontSize: "0.7rem" }}>{icon}</span> {text}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setShowPaywall(true); trackPaywallSeen('unlock_banner'); }}
                className="btn-primary"
                style={{ width: "100%", background: `linear-gradient(135deg, ${info.color}, #6C63FF)`, color: "#fff", border: "none", borderRadius: "12px", padding: "0.85rem", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em" }}
              >
                Desbloquear análisis completo →
              </button>

              <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "0.68rem", color: "#444" }}>
                $19/mes · Cancela cuando quieras
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hub-and-spoke nav */}
      {!tab ? (
        /* ── Section grid (hub) ── */
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "1.25rem" }}>
          {TABS.map(t => {
            const isLocked = !t.free && !isPaid;
            return (
              <button
                key={t.id}
                onClick={() => handleTabClick(t.id, t.free)}
                className="card-hover"
                style={{
                  background: "#111",
                  border: `1px solid ${isLocked ? "#1a1a1a" : info.color + "33"}`,
                  borderRadius: "16px",
                  padding: "1rem 1rem 0.9rem",
                  textAlign: "left",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* top accent line for unlocked */}
                {!isLocked && (
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${info.color}99, transparent)` }} />
                )}
                <div style={{ fontSize: "1.4rem", marginBottom: "0.45rem", lineHeight: 1 }}>{t.icon}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: isLocked ? "#444" : "#e8e8e8", marginBottom: "0.25rem", letterSpacing: "0.01em" }}>
                  {t.label}
                </div>
                <div style={{ fontSize: "0.7rem", color: isLocked ? "#333" : "#666", lineHeight: 1.4 }}>
                  {t.desc}
                </div>
                {isLocked && (
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", fontSize: "0.65rem", color: "#333" }}>🔒</div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* ── Section content (spoke) ── */
        <div>
          {/* Back button */}
          <button
            onClick={() => setTab(null)}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, padding: "0 0 1rem", letterSpacing: "0.02em" }}
          >
            ← Volver
          </button>

          {tab === "perfil"         && <TabPerfil type={type} display={display} info={info} />}
          {tab === "advisor"        && <TabAdvisor type={type} typeColor={info.color} />}
          {tab === "psicologia"     && analysis && <TabPsicologia analysis={analysis} typeColor={info.color} />}
          {tab === "profesional"    && <TabProfesional type={type} typeColor={info.color} />}
          {tab === "vinculos"       && analysis && <TabVinculos analysis={analysis} typeColor={info.color} />}
          {tab === "social"         && analysis && <TabSocial analysis={analysis} />}
          {tab === "fortalezas"     && analysis && <TabFortalezas analysis={analysis} />}
          {tab === "atraccion"      && analysis && <TabAtraccion analysis={analysis} typeColor={info.color} />}
          {tab === "compatibilidad" && analysis && <TabCompatibilidad analysis={analysis} myType={type} typeColor={info.color} />}

          {/* Bottom back button */}
          <button
            onClick={() => setTab(null)}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", color: "#555", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, padding: "0.75rem 1.2rem", marginTop: "1.5rem", letterSpacing: "0.02em" }}
          >
            ← Todas las secciones
          </button>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem" }}>
        <button onClick={handleShare} className="btn-secondary" style={{ flex: 1, background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "0.8rem", color: "#666", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s" }}>
          ↗ Compartir resultado
        </button>
        <button onClick={onRetake} className="btn-secondary" style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "0.8rem 1.2rem", color: "#444", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
          ↺
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// APP ROOT (inner)
// ─────────────────────────────────────────────
function AppInner() {
  const { user, signOut, ready } = useAuth();

  // Initialize synchronously from localStorage — no flash, no race conditions
  const [result, setResult] = useState(() => {
    const type = localStorage.getItem('mbti_type');
    if (!type) return null;
    const dispStr = localStorage.getItem('mbti_display');
    const display = dispStr ? (() => { try { return JSON.parse(dispStr); } catch { return null; } })() : null;
    return { type, display };
  });
  const [screen, setScreen] = useState(() =>
    localStorage.getItem('mbti_type') ? "results" : "test-intro"
  );
  const [index, setIndex]     = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState("signup");

  // Save result to Supabase user metadata
  const saveResultToSupabase = async (type, display) => {
    try {
      await supabase.auth.updateUser({
        data: { mbti_type: type, mbti_display: JSON.stringify(display) }
      });
    } catch {}
  };

  // Load saved result when session is ready
  useEffect(() => {
    if (!ready) return;
    if (user && screen === "test-intro") {
      const meta = user.user_metadata;

      // Try Supabase metadata first, fallback to localStorage
      const savedType    = meta?.mbti_type    || localStorage.getItem('mbti_type');
      const savedDispStr = meta?.mbti_display || localStorage.getItem('mbti_display');
      const savedDisplay = savedDispStr ? (() => { try { return JSON.parse(savedDispStr); } catch { return null; } })() : null;

      if (savedType) {
        setResult({ type: savedType, display: savedDisplay });
        setScreen("results");

        // If data came from localStorage but wasn't in Supabase yet, sync it up
        if (!meta?.mbti_type) {
          supabase.auth.updateUser({
            data: { mbti_type: savedType, mbti_display: savedDispStr || null }
          }).catch(() => {});
        }
      }
    }
  }, [ready, user]);

  // Handle return from Stripe (URL has session_id)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('session_id')) {
      const savedType = localStorage.getItem('mbti_type');
      if (savedType) {
        setResult({ type: savedType, display: JSON.parse(localStorage.getItem('mbti_display') || 'null') });
        setScreen('results');
      }
    }
  }, []);

  const handleStart = () => { setAnswers({}); setIndex(0); setScreen("test-questions"); trackTestStarted(); };

  const handleAnswer = useCallback((value) => {
    const q = QUESTIONS[index];
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (index < QUESTIONS.length - 1) {
      setTimeout(() => setIndex(i => i + 1), 250);
    } else {
      const res = calculateResult(newAnswers);
      localStorage.setItem('mbti_display', JSON.stringify(res.display));
      setResult(res);
      setScreen("results");
      trackTestCompleted(res.type);
      if (user) saveResultToSupabase(res.type, res.display);
    }
  }, [index, answers, user]);

  const handlePrev  = () => { if (index > 0) setIndex(i => i - 1); };
  const handleRetake = () => { setAnswers({}); setIndex(0); setResult(null); setScreen("test-intro"); };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #111", padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <LandingLogo />
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontWeight: 900, fontSize: "1.15rem", background: "linear-gradient(90deg,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>16</span>
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#e0e0e0", letterSpacing: "0.02em" }}>Personalidades</span>
            <sup style={{ color: "#A78BFA", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.05em", marginLeft: "1px" }}>AI</sup>
          </div>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {screen === "test-questions" && <button onClick={handleRetake} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.8rem" }}>Reiniciar</button>}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#555", fontSize: "0.75rem", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              <button onClick={signOut} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#555", cursor: "pointer", fontSize: "0.72rem", padding: "3px 8px" }}>Salir</button>
            </div>
          ) : (
            <button onClick={() => { setAuthInitialMode("login"); setShowAuthModal(true); }} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#777", cursor: "pointer", fontSize: "0.78rem", padding: "4px 12px" }}>Iniciar sesión</button>
          )}
        </div>
      </header>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} title="Inicia sesión o crea tu cuenta" initialMode={authInitialMode} />}
      <main style={{ flex: 1, display: "flex", alignItems: screen === "results" ? "flex-start" : "center", justifyContent: "center", padding: screen === "results" ? "0" : "1rem", width: "100%" }}>
        <ErrorBoundary>
        {!ready ? (
          <div style={{ color: "#333", fontSize: "0.85rem" }}>...</div>
        ) : (
          <>
            {screen === "test-intro"     && <TestIntro onStart={handleStart} />}
            {screen === "test-questions" && <QuestionScreen question={QUESTIONS[index]} index={index} total={QUESTIONS.length} selected={answers[QUESTIONS[index].id]} onAnswer={handleAnswer} onPrev={handlePrev} />}
            {screen === "results"        && result && <ResultsScreen type={result.type} display={result.display} onRetake={handleRetake} />}
          </>
        )}
        </ErrorBoundary>
      </main>
      <footer style={{ borderTop: "1px solid #111", padding: "1rem", textAlign: "center" }}>
        <span style={{ color: "#333", fontSize: "0.75rem" }}>Basado en el modelo MBTI · Myers-Briggs Type Indicator</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<AppInner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
