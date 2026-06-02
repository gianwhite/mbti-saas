import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TYPES } from './data/types';
import { SEO_CONTENT } from './data/seoContent';

const TYPE_LIST = Object.keys(TYPES);

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
  el.content = content;
}
function setOg(prop, content) {
  let el = document.querySelector(`meta[property="${prop}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
  el.content = content;
}
function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
  el.href = url;
}

export default function TypeSeoPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const typeKey = type?.toUpperCase();
  const info = TYPES[typeKey];
  const seo = SEO_CONTENT[typeKey];

  useEffect(() => {
    if (!info || !seo) return;
    document.title = seo.title;
    setMeta('description', seo.metaDesc);
    setMeta('keywords', seo.keywords);
    setOg('og:title', seo.title);
    setOg('og:description', seo.metaDesc);
    setOg('og:url', `https://16personalidades.app/tipo/${typeKey.toLowerCase()}`);
    setOg('og:type', 'article');
    setCanonical(`https://16personalidades.app/tipo/${typeKey.toLowerCase()}`);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seo.title,
      "description": seo.metaDesc,
      "url": `https://16personalidades.app/tipo/${typeKey.toLowerCase()}`,
      "author": { "@type": "Organization", "name": "16 Personalidades AI" },
      "publisher": { "@type": "Organization", "name": "16 Personalidades AI", "url": "https://16personalidades.app" },
      "mainEntityOfPage": `https://16personalidades.app/tipo/${typeKey.toLowerCase()}`,
      "about": { "@type": "Thing", "name": `Personalidad ${typeKey} MBTI` },
    };
    let script = document.querySelector('#jsonld-type');
    if (!script) { script = document.createElement('script'); script.id = 'jsonld-type'; script.type = 'application/ld+json'; document.head.appendChild(script); }
    script.textContent = JSON.stringify(jsonLd);

    // FAQ structured data
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seo.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    };
    let faqScript = document.querySelector('#jsonld-faq');
    if (!faqScript) { faqScript = document.createElement('script'); faqScript.id = 'jsonld-faq'; faqScript.type = 'application/ld+json'; document.head.appendChild(faqScript); }
    faqScript.textContent = JSON.stringify(faqLd);

    return () => {
      // Restore defaults on unmount
      document.title = '16 Personalidades AI — Test MBTI en Español';
    };
  }, [typeKey, info, seo]);

  if (!info || !seo) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', padding: '2rem' }}>
        <h1 style={{ color: '#fff' }}>Tipo no encontrado</h1>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', background: '#6C63FF', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer' }}>Ir al inicio</button>
      </div>
    );
  }

  const c = info.color;

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#e0e0e0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '860px', margin: '0 auto' }}>
        <Link to="/" style={{ color: c, fontWeight: 700, fontSize: '1rem', textDecoration: 'none', letterSpacing: '0.02em' }}>
          16 Personalidades AI
        </Link>
        <button
          onClick={() => navigate('/test')}
          style={{ background: c, color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1.1rem', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
        >
          Hacer el test →
        </button>
      </nav>

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>

        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', background: c + '18', border: `1px solid ${c}44`, borderRadius: '12px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: c, letterSpacing: '0.15em', marginBottom: '1.2rem' }}>
            {typeKey} · {info.name.toUpperCase()}
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 800, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15 }}>
            Personalidad {typeKey}: {info.name}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#888', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 2rem' }}>
            {info.tagline}
          </p>

          {/* Dimension badges */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {[
              typeKey[0] === 'E' ? ['E', 'Extrovertido'] : ['I', 'Introvertido'],
              typeKey[1] === 'N' ? ['N', 'Intuitivo'] : ['S', 'Sensorial'],
              typeKey[2] === 'T' ? ['T', 'Pensador'] : ['F', 'Sentimental'],
              typeKey[3] === 'J' ? ['J', 'Estructurado'] : ['P', 'Perceptivo'],
            ].map(([letter, label]) => (
              <span key={letter} style={{ background: '#111', border: `1px solid ${c}33`, borderRadius: '20px', padding: '0.3rem 0.85rem', fontSize: '0.78rem', color: '#bbb' }}>
                <span style={{ color: c, fontWeight: 700 }}>{letter}</span> · {label}
              </span>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => navigate('/test')}
            style={{ background: `linear-gradient(135deg, ${c}, #6C63FF)`, color: '#fff', border: 'none', borderRadius: '14px', padding: '1rem 2.2rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' }}
          >
            ¿Eres realmente {typeKey}? Descúbrelo gratis →
          </button>
          <div style={{ fontSize: '0.72rem', color: '#444', marginTop: '0.5rem' }}>Test de 60 preguntas · Resultado en minutos</div>
        </header>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>¿Qué es la personalidad {typeKey}?</h2>
          <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: '#aaa' }}>{seo.intro}</p>
        </section>

        {/* Strengths / Weaknesses */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: '#0e0e0e', border: `1px solid ${c}22`, borderRadius: '16px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>✦ Fortalezas del {typeKey}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {seo.fortalezas.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#999' }}>
                  <span style={{ color: c, flexShrink: 0 }}>▸</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>⚠ Debilidades del {typeKey}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              {seo.debilidades.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#888' }}>
                  <span style={{ color: '#555', flexShrink: 0 }}>▸</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Relationships */}
        <section style={{ background: '#0e0e0e', border: `1px solid ${c}22`, borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem' }}>💞 {typeKey} en relaciones y atracción</h2>
          <p style={{ fontSize: '0.93rem', lineHeight: 1.8, color: '#999', margin: 0 }}>{seo.relaciones}</p>
        </section>

        {/* Work */}
        <section style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '1.75rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.85rem' }}>🚀 {typeKey} en el trabajo y liderazgo</h2>
          <p style={{ fontSize: '0.93rem', lineHeight: 1.8, color: '#999', margin: 0 }}>{seo.trabajo}</p>
        </section>

        {/* Compatibility */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Compatibilidad del {typeKey}</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {seo.compatibilidad.map(t => {
              const ti = TYPES[t];
              if (!ti) return null;
              return (
                <Link
                  key={t}
                  to={`/tipo/${t.toLowerCase()}`}
                  style={{ flex: 1, minWidth: '160px', background: '#0e0e0e', border: `1px solid ${ti.color}33`, borderRadius: '14px', padding: '1.2rem', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: ti.color, marginBottom: '0.3rem' }}>{t}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ccc', marginBottom: '0.2rem' }}>{ti.name}</div>
                  <div style={{ fontSize: '0.73rem', color: '#555' }}>{ti.tagline.split('.')[0]}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Famous */}
        {seo.famosos?.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Celebridades {typeKey} conocidas</h2>
            <p style={{ fontSize: '0.85rem', color: '#555', marginBottom: '1rem' }}>Personas públicas identificadas como {typeKey} según análisis de funciones cognitivas.</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {seo.famosos.map(name => (
                <span key={name} style={{ background: '#111', border: `1px solid ${c}22`, borderRadius: '20px', padding: '0.4rem 0.9rem', fontSize: '0.82rem', color: '#bbb' }}>
                  {name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Preguntas frecuentes sobre el {typeKey}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {seo.faq.map((item, i) => (
              <details key={i} style={{ background: '#0e0e0e', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '1.1rem 1.25rem', cursor: 'pointer' }}>
                <summary style={{ fontSize: '0.92rem', fontWeight: 600, color: '#ddd', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q}
                  <span style={{ color: '#444', fontSize: '0.8rem', flexShrink: 0, marginLeft: '1rem' }}>▾</span>
                </summary>
                <p style={{ fontSize: '0.87rem', color: '#888', lineHeight: 1.7, marginTop: '0.85rem', marginBottom: 0 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* All types */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '1.25rem' }}>Explorar otros tipos de personalidad</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {TYPE_LIST.map(t => {
              const ti = TYPES[t];
              const isActive = t === typeKey;
              return (
                <Link
                  key={t}
                  to={`/tipo/${t.toLowerCase()}`}
                  style={{
                    background: isActive ? ti.color + '22' : '#0e0e0e',
                    border: `1px solid ${isActive ? ti.color + '66' : '#1e1e1e'}`,
                    borderRadius: '10px',
                    padding: '0.65rem',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: isActive ? ti.color : '#aaa' }}>{t}</div>
                  <div style={{ fontSize: '0.62rem', color: '#555', marginTop: '0.2rem' }}>{ti.name}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <div style={{ background: `linear-gradient(135deg, #0f0f0f, ${c}0a)`, border: `1px solid ${c}33`, borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
            ¿Eres realmente {typeKey}?
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#666', marginBottom: '1.5rem' }}>
            Confirma tu tipo con nuestro test de 60 preguntas basado en funciones cognitivas reales.
          </p>
          <button
            onClick={() => navigate('/test')}
            style={{ background: `linear-gradient(135deg, ${c}, #6C63FF)`, color: '#fff', border: 'none', borderRadius: '14px', padding: '1rem 2.5rem', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}
          >
            Hacer el test gratis →
          </button>
        </div>

      </main>
    </div>
  );
}
