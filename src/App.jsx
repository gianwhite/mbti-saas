import { useState, useCallback, useEffect, Component, createContext, useContext } from 'react';
import { supabase } from './supabase.js';

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
      setUser(session?.user ?? null);
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
function AuthModal({ onClose, onSuccess, title = "Crea tu cuenta" }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode]       = useState("signup"); // "signup" | "login"
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
        // Auto sign-in after signup (Supabase may require email confirm)
        const { error: loginErr } = await signIn(email, password);
        if (!loginErr) onSuccess?.();
        else setError("Cuenta creada. Inicia sesión.");
      } else {
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
        <input type="password" placeholder="Contraseña (mín. 6 caracteres)" value={password}
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

        <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg,#6C63FF,#9b59b6)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
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
  { id: "perfil",          label: "Perfil",          free: true  },
  { id: "advisor",         label: "Advisor IA",      free: false },
  { id: "psicologia",      label: "Psicología",      free: false },
  { id: "vinculos",        label: "Vínculos",        free: false },
  { id: "fortalezas",      label: "Fortalezas",      free: false },
  { id: "atraccion",       label: "Atracción",       free: false },
  { id: "compatibilidad",  label: "Compatibilidad",  free: false },
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
    <div style={{
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
        <span style={{ color: "#aaa", fontSize: "0.8rem" }}>{labels[dim]}</span>
        <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{data.letter} — {data.pct}%</span>
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

        <button onClick={handleSubscribe} disabled={loading} style={{ width: "100%", background: loading ? "#333" : "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}>
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
// SCREENS
// ─────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Logo hexagonal */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
        <svg width="170" height="170" viewBox="228 88 224 254" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lgF" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
              <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.78"/>
              <stop offset="55%" stopColor="#3730A3" stopOpacity="0.65"/>
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0.78"/>
            </linearGradient>
            <linearGradient id="lgS" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
              <stop offset="0%" stopColor="#A78BFA"/>
              <stop offset="100%" stopColor="#22D3EE"/>
            </linearGradient>
          </defs>
          <circle cx="340" cy="210" r="128" fill="none" stroke="#7C3AED" strokeWidth="0.8" opacity="0.2"/>
          <polygon points="340,100 435,155 435,265 340,320 245,265 245,155" fill="none" stroke="#1D2238" strokeWidth="1.2"/>
          <polygon points="340,127 398,152 422,210 398,268 340,293 282,268 258,210 282,152" fill="none" stroke="#1D2238" strokeWidth="0.9"/>
          <polygon points="340,155 379,171 395,210 379,249 340,265 301,249 285,210 301,171" fill="none" stroke="#1D2238" strokeWidth="0.9"/>
          <line x1="340" y1="210" x2="340" y2="100" stroke="#1D2238" strokeWidth="1"/>
          <line x1="340" y1="210" x2="435" y2="155" stroke="#1D2238" strokeWidth="1"/>
          <line x1="340" y1="210" x2="435" y2="265" stroke="#1D2238" strokeWidth="1"/>
          <line x1="340" y1="210" x2="340" y2="320" stroke="#1D2238" strokeWidth="1"/>
          <line x1="340" y1="210" x2="245" y2="265" stroke="#1D2238" strokeWidth="1"/>
          <line x1="340" y1="210" x2="245" y2="155" stroke="#1D2238" strokeWidth="1"/>
          <polygon points="340,117 421,163 421,257 340,304 259,257 259,163" fill="url(#lgF)" stroke="url(#lgS)" strokeWidth="2.5" strokeLinejoin="round"/>
          <polygon points="340,139 402,174 402,246 340,282 278,246 278,174" fill="none" stroke="url(#lgS)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.4"/>
          <circle cx="340" cy="117" r="5" fill="#C4B5FD"/>
          <circle cx="421" cy="163" r="5" fill="#A78BFA"/>
          <circle cx="421" cy="257" r="5" fill="#22D3EE"/>
          <circle cx="340" cy="304" r="5" fill="#67E8F9"/>
          <circle cx="259" cy="257" r="5" fill="#7DD3FC"/>
          <circle cx="259" cy="163" r="5" fill="#93C5FD"/>
          <circle cx="340" cy="210" r="7" fill="url(#lgS)" opacity="0.5"/>
          <circle cx="340" cy="210" r="3.5" fill="#FFFFFF" opacity="0.95"/>
        </svg>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.2 }}>Test de Personalidad MBTI</h1>
      <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.95rem" }}>60 preguntas · ~10 minutos</p>

      {/* Guidelines */}
      <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", padding: "1.25rem", marginBottom: "2rem", textAlign: "left" }}>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>INSTRUCCIONES</div>
        {[
          ["Responde según tu opinión genuina", "No hay respuestas correctas ni incorrectas — refleja cómo realmente eres."],
          ["No saltes preguntas", "Debes responder cada una, pero puedes volver atrás cuando quieras."],
          ["Usa tu primera reacción", "No pienses demasiado. La respuesta instintiva es la más precisa."],
          ["Resultados inmediatos", "Al terminar verás tu tipo MBTI con análisis detallado de personalidad."],
        ].map(([t, d]) => (
          <div key={t} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.9rem", alignItems: "flex-start" }}>
            <span style={{ color: "#6C63FF", marginTop: "3px", fontSize: "0.8rem" }}>✓</span>
            <div>
              <div style={{ color: "#eee", fontSize: "0.88rem", fontWeight: 600 }}>{t}</div>
              <div style={{ color: "#555", fontSize: "0.78rem", lineHeight: 1.5 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onStart} style={{ background: "linear-gradient(135deg,#6C63FF,#ff6b6b)", color: "#fff", border: "none", borderRadius: "10px", padding: "0.9rem 2.5rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>
        COMENZAR TEST →
      </button>
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
function TabPerfil({ type, display, info }) {
  return (
    <div>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "1rem" }}>DESGLOSE POR DIMENSIÓN</div>
        {Object.entries(display).map(([dim, data]) => <DimensionBar key={dim} dim={dim} data={data} />)}
      </Card>
      <Card>
        <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>DISTRIBUCIÓN GLOBAL</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
          {Object.entries(display).map(([dim, data]) => (
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

function TabCompatibilidad({ analysis }) {
  const c = analysis.compatibilidad;
  return (
    <div>
      <div style={{ color: "#555", fontSize: "0.7rem", letterSpacing: "0.12em", marginBottom: "0.85rem" }}>TOP 3 TIPOS MÁS COMPATIBLES</div>
      {c.top.map((match, i) => {
        const mi = TYPES[match.tipo] || { color: "#888", name: match.tipo };
        return (
          <Card key={i} style={{ borderColor: mi.color + "33" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <div style={{ background: mi.color + "22", border: `1px solid ${mi.color}55`, borderRadius: "8px", padding: "4px 10px", fontWeight: 900, fontSize: "1rem", color: mi.color }}>{match.tipo}</div>
                <div style={{ color: "#888", fontSize: "0.8rem" }}>{mi.name}</div>
              </div>
              <Tag color={mi.color}>#{i + 1}</Tag>
            </div>
            <p style={{ color: "#bbb", fontSize: "0.85rem", lineHeight: 1.65, margin: "0 0 0.6rem" }}>{match.por_que}</p>
            <div style={{ background: "#0f0f0f", borderRadius: "8px", padding: "0.65rem 0.85rem" }}>
              <div style={{ color: "#6C63FF", fontSize: "0.68rem", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>CÓMO ATRAERLA</div>
              <div style={{ color: "#aaa", fontSize: "0.83rem", lineHeight: 1.6 }}>{match.como_atraerla}</div>
            </div>
          </Card>
        );
      })}
      <div style={{ color: "#ff6b6b", fontSize: "0.7rem", letterSpacing: "0.12em", margin: "1.25rem 0 0.85rem" }}>TIPO A EVITAR</div>
      <Card style={{ borderColor: "#ff6b6b33" }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.6rem" }}>
          <div style={{ background: "#ff6b6b22", border: "1px solid #ff6b6b55", borderRadius: "8px", padding: "4px 10px", fontWeight: 900, fontSize: "1rem", color: "#ff6b6b" }}>{c.evitar.tipo}</div>
          <Tag color="#ff6b6b">Fricción alta</Tag>
        </div>
        <p style={{ color: "#bbb", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 }}>{c.evitar.razon}</p>
      </Card>
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
    "¿Qué tipo de mujer me complementa mejor?",
    "¿Cómo manejo el conflicto en una relación?",
  ];

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
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
              <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px 16px 16px 4px", padding: "0.75rem 1rem" }}>
                <span style={{ color: "#555", fontSize: "0.9rem" }}>···</span>
              </div>
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
// RESULTS SCREEN
// ─────────────────────────────────────────────
function ResultsScreen({ type, display, onRetake }) {
  const info     = TYPES[type] || { name: "Tipo desconocido", color: "#888", tagline: "" };
  const analysis = TYPE_ANALYSIS[type];
  const [tab, setTab]         = useState("perfil");
  const [copied, setCopied]   = useState(false);
  const [isPaid, setIsPaid]   = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Check subscription on mount
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
          }
          window.history.replaceState({}, '', '/');
        })
        .catch(() => {});
    } else if (storedCustomerId) {
      // Returning user — re-verify subscription is still active
      fetch(`/api/verify-access?customer_id=${storedCustomerId}`)
        .then(r => r.json())
        .then(data => {
          if (data.active) setIsPaid(true);
          else localStorage.removeItem('mbti_customer_id');
        })
        .catch(() => {});
    }
  }, []);

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
      return;
    }
    setTab(tabId);
  };

  const handleShare = () => {
    const txt = `Mi tipo de personalidad MBTI es ${type} — ${info.name}\n"${info.tagline}"`;
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "1.5rem 1rem 3rem" }}>
      {showPaywall && (
        <PaywallModal
          type={type}
          onClose={() => setShowPaywall(false)}
          onPay={() => {}}
        />
      )}

      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, #111 60%, ${info.color}0d)`, border: `1px solid ${info.color}44`, borderRadius: "24px", padding: "2rem 1.75rem 1.75rem", textAlign: "center", marginBottom: "1.25rem", position: "relative", overflow: "hidden" }}>
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
        <div style={{ display: "inline-block", background: `${info.color}15`, border: `2px solid ${info.color}55`, borderRadius: "16px", padding: "0.4rem 1.4rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "3.2rem", fontWeight: 900, color: info.color, letterSpacing: "0.12em", lineHeight: 1 }}>{type}</span>
        </div>

        <div style={{ fontSize: "1.25rem", color: "#f0f0f0", fontWeight: 700, marginBottom: "0.4rem" }}>{info.name}</div>
        <div style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.6, fontStyle: "italic", maxWidth: "380px", margin: "0 auto" }}>"{info.tagline}"</div>

        {/* Dimension pills */}
        {display && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {Object.entries(display).map(([dim, data]) => (
              <div key={dim} style={{ background: "#0f0f0f", border: `1px solid ${info.color}22`, borderRadius: "8px", padding: "4px 10px", fontSize: "0.72rem", color: "#888" }}>
                <span style={{ color: info.color, fontWeight: 700 }}>{data.letter}</span> {data.pct}%
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "3px", background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "14px", padding: "4px", marginBottom: "1.25rem", overflowX: "auto" }}>
        {TABS.map(t => {
          const isActive  = tab === t.id;
          const isLocked  = !t.free && !isPaid;
          return (
            <button key={t.id} onClick={() => handleTabClick(t.id, t.free)} style={{ flex: 1, minWidth: "fit-content", padding: "0.5rem 0.65rem", borderRadius: "10px", border: "none", background: isActive ? `linear-gradient(135deg, ${info.color}cc, ${info.color}88)` : "transparent", color: isActive ? "#fff" : isLocked ? "#333" : "#555", fontSize: "0.72rem", fontWeight: isActive ? 700 : 400, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", letterSpacing: isActive ? "0.02em" : 0 }}>
              {isLocked ? "🔒 " : ""}{t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {tab === "perfil"         && <TabPerfil type={type} display={display} info={info} />}
        {tab === "advisor"        && <TabAdvisor type={type} typeColor={info.color} />}
        {tab === "psicologia"     && analysis && <TabPsicologia analysis={analysis} typeColor={info.color} />}
        {tab === "vinculos"       && analysis && <TabVinculos analysis={analysis} typeColor={info.color} />}
        {tab === "social"         && analysis && <TabSocial analysis={analysis} />}
        {tab === "fortalezas"     && analysis && <TabFortalezas analysis={analysis} />}
        {tab === "atraccion"      && analysis && <TabAtraccion analysis={analysis} typeColor={info.color} />}
        {tab === "compatibilidad" && analysis && <TabCompatibilidad analysis={analysis} />}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.75rem" }}>
        <button onClick={handleShare} style={{ flex: 1, background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "0.8rem", color: copied ? info.color : "#666", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s" }}>
          {copied ? "✓ Copiado al portapapeles" : "Compartir resultado"}
        </button>
        <button onClick={onRetake} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "0.8rem 1.2rem", color: "#444", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
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
  const { user, signOut } = useAuth();
  const [screen, setScreen]   = useState("intro");
  const [index, setIndex]     = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult]   = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Save result to Supabase user metadata
  const saveResultToSupabase = async (type, display) => {
    try {
      await supabase.auth.updateUser({
        data: { mbti_type: type, mbti_display: JSON.stringify(display) }
      });
    } catch {}
  };

  // Load saved result when user logs in
  useEffect(() => {
    if (user && screen === "intro") {
      const meta = user.user_metadata;
      if (meta?.mbti_type) {
        const savedDisplay = meta.mbti_display ? JSON.parse(meta.mbti_display) : null;
        setResult({ type: meta.mbti_type, display: savedDisplay });
        setScreen("results");
      }
    }
  }, [user]);

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

  const handleStart = () => { setAnswers({}); setIndex(0); setScreen("test"); };

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
      // Save to Supabase if logged in
      if (user) saveResultToSupabase(res.type, res.display);
    }
  }, [index, answers, user]);

  const handlePrev  = () => { if (index > 0) setIndex(i => i - 1); };
  const handleRetake = () => { setAnswers({}); setIndex(0); setResult(null); setScreen("intro"); };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: "1px solid #111", padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="32" height="32" viewBox="230 90 220 250" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hgF" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
                <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.78"/>
                <stop offset="55%" stopColor="#3730A3" stopOpacity="0.65"/>
                <stop offset="100%" stopColor="#0891B2" stopOpacity="0.78"/>
              </linearGradient>
              <linearGradient id="hgS" gradientUnits="userSpaceOnUse" x1="245" y1="100" x2="435" y2="320">
                <stop offset="0%" stopColor="#A78BFA"/>
                <stop offset="100%" stopColor="#22D3EE"/>
              </linearGradient>
            </defs>
            <circle cx="340" cy="210" r="128" fill="none" stroke="#7C3AED" strokeWidth="0.8" opacity="0.2"/>
            <polygon points="340,100 435,155 435,265 340,320 245,265 245,155" fill="none" stroke="#1D2238" strokeWidth="1.2"/>
            <polygon points="340,127 398,152 422,210 398,268 340,293 282,268 258,210 282,152" fill="none" stroke="#1D2238" strokeWidth="0.9"/>
            <line x1="340" y1="210" x2="340" y2="100" stroke="#1D2238" strokeWidth="1"/>
            <line x1="340" y1="210" x2="435" y2="155" stroke="#1D2238" strokeWidth="1"/>
            <line x1="340" y1="210" x2="435" y2="265" stroke="#1D2238" strokeWidth="1"/>
            <line x1="340" y1="210" x2="340" y2="320" stroke="#1D2238" strokeWidth="1"/>
            <line x1="340" y1="210" x2="245" y2="265" stroke="#1D2238" strokeWidth="1"/>
            <line x1="340" y1="210" x2="245" y2="155" stroke="#1D2238" strokeWidth="1"/>
            <polygon points="340,117 421,163 421,257 340,304 259,257 259,163" fill="url(#hgF)" stroke="url(#hgS)" strokeWidth="2.5" strokeLinejoin="round"/>
            <polygon points="340,139 402,174 402,246 340,282 278,246 278,174" fill="none" stroke="url(#hgS)" strokeWidth="1.1" strokeLinejoin="round" opacity="0.4"/>
            <circle cx="340" cy="117" r="5" fill="#C4B5FD"/>
            <circle cx="421" cy="163" r="5" fill="#A78BFA"/>
            <circle cx="421" cy="257" r="5" fill="#22D3EE"/>
            <circle cx="340" cy="304" r="5" fill="#67E8F9"/>
            <circle cx="259" cy="257" r="5" fill="#7DD3FC"/>
            <circle cx="259" cy="163" r="5" fill="#93C5FD"/>
            <circle cx="340" cy="210" r="7" fill="url(#hgS)" opacity="0.5"/>
            <circle cx="340" cy="210" r="3.5" fill="#FFFFFF" opacity="0.95"/>
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontWeight: 900, fontSize: "1.15rem", background: "linear-gradient(90deg,#A78BFA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>16</span>
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#e0e0e0", letterSpacing: "0.02em" }}>Personalidades</span>
            <sup style={{ color: "#A78BFA", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.05em", marginLeft: "1px" }}>AI</sup>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {screen === "test" && <button onClick={handleRetake} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.8rem" }}>Reiniciar</button>}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ color: "#555", fontSize: "0.75rem", maxWidth: "140px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              <button onClick={signOut} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#555", cursor: "pointer", fontSize: "0.72rem", padding: "3px 8px" }}>Salir</button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} style={{ background: "none", border: "1px solid #222", borderRadius: "6px", color: "#777", cursor: "pointer", fontSize: "0.78rem", padding: "4px 12px" }}>Iniciar sesión</button>
          )}
        </div>
      </header>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} title="Inicia sesión o crea tu cuenta" />}
      <main style={{ flex: 1, display: "flex", alignItems: screen === "results" ? "flex-start" : "center", justifyContent: "center", padding: "1rem" }}>
        <ErrorBoundary>
        {screen === "intro"   && <IntroScreen onStart={handleStart} />}
        {screen === "test"    && <QuestionScreen question={QUESTIONS[index]} index={index} total={QUESTIONS.length} selected={answers[QUESTIONS[index].id]} onAnswer={handleAnswer} onPrev={handlePrev} />}
        {screen === "results" && result && <ResultsScreen type={result.type} display={result.display} onRetake={handleRetake} />}
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
      <AppInner />
    </AuthProvider>
  );
}
