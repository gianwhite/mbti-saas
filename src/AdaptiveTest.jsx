// AdaptiveTest.jsx
// Test adaptativo v3 — forced-choice, 3 fases, ~30 preguntas
// Props: onComplete(result), onCancel()

import { useState, useCallback } from 'react';
import {
  PHASE1_QUESTIONS,
  PHASE3_QUESTIONS,
  selectPhase2Questions,
  accumulateFnScores,
  deriveTypeV3,
  getMilestone1Text,
} from './data/questions-v3.js';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const TOTAL_QUESTIONS = PHASE1_QUESTIONS.length + 12 + PHASE3_QUESTIONS.length; // 12+12+6=30
const PHASE_LABELS = [
  { label: 'Perfil base',    start: 0,  end: 12 },
  { label: 'Profundización', start: 12, end: 24 },
  { label: 'Confirmación',   start: 24, end: 30 },
];

const FN_COLORS = {
  Ni: '#A78BFA', Ne: '#60A5FA', Si: '#34D399', Se: '#FBBF24',
  Fi: '#F472B6', Fe: '#FB923C', Ti: '#38BDF8', Te: '#4ADE80',
};

const FN_NAMES = {
  Ni: 'Intuición Introverted', Ne: 'Intuición Extrovertida',
  Si: 'Sensación Introverted',  Se: 'Sensación Extrovertida',
  Fi: 'Sentimiento Introverted', Fe: 'Sentimiento Extrovertido',
  Ti: 'Pensamiento Introverted', Te: 'Pensamiento Extrovertido',
};

// ─────────────────────────────────────────────
// Progress Bar
// ─────────────────────────────────────────────
function AdaptiveProgressBar({ answered, total }) {
  const pct = Math.round((answered / total) * 100);
  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
        <span style={{ color: '#555', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
          {answered} / {total} preguntas
        </span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {PHASE_LABELS.map((p, i) => {
            const active = answered >= p.start && answered < p.end;
            const done = answered >= p.end;
            return (
              <span key={i} style={{
                fontSize: '0.62rem',
                padding: '2px 7px',
                borderRadius: '20px',
                background: done ? '#6C63FF22' : active ? '#6C63FF44' : 'transparent',
                color: done ? '#6C63FF' : active ? '#C4B5FD' : '#333',
                border: active ? '1px solid #6C63FF66' : '1px solid transparent',
                transition: 'all 0.3s ease',
              }}>
                {p.label}
              </span>
            );
          })}
        </div>
      </div>
      <div style={{ height: '3px', background: '#111', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #6C63FF, #9B6FE8)',
          borderRadius: '2px',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Question Card
// ─────────────────────────────────────────────
function QuestionCard({ question, questionNumber, total, onAnswer, onBack, canGoBack }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleSelect = useCallback((choice) => {
    if (animating || selected) return;
    setSelected(choice);
    setAnimating(true);
    setTimeout(() => {
      onAnswer(choice);
      setSelected(null);
      setAnimating(false);
    }, 320);
  }, [animating, selected, onAnswer]);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '0 1rem',
      animation: 'fadeSlideIn 0.35s ease',
    }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSelect {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Question text */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        padding: '1.75rem 2rem',
        marginBottom: '1.5rem',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <p style={{
          color: '#F0EBF8',
          fontSize: '1.05rem',
          lineHeight: 1.65,
          margin: 0,
          textAlign: 'center',
          width: '100%',
          fontWeight: 400,
        }}>
          {question.text}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {['A', 'B'].map((choice) => {
          const opt = choice === 'A' ? question.optionA : question.optionB;
          const isSelected = selected === choice;
          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={!!selected}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                textAlign: 'left',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(108,63,200,0.35), rgba(155,111,232,0.25))'
                  : 'rgba(255,255,255,0.03)',
                border: isSelected
                  ? '1.5px solid #9B6FE8'
                  : '1.5px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '1.25rem 1.5rem',
                cursor: selected ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                animation: isSelected ? 'pulseSelect 0.32s ease' : 'none',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
              }}
              onMouseEnter={e => {
                if (!selected) {
                  e.currentTarget.style.background = 'rgba(108,63,200,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(155,111,232,0.3)';
                }
              }}
              onMouseLeave={e => {
                if (!selected && !isSelected) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                }
              }}
            >
              {/* Choice letter badge */}
              <span style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isSelected ? 'linear-gradient(135deg,#6C3FC8,#9B6FE8)' : 'rgba(255,255,255,0.05)',
                border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: isSelected ? '#fff' : '#444',
                marginTop: '1px',
                transition: 'all 0.2s ease',
                letterSpacing: '0.05em',
              }}>
                {choice}
              </span>
              <span style={{
                color: isSelected ? '#E8E0F8' : '#bbb',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                transition: 'color 0.2s ease',
              }}>
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom row: back button + hint */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem' }}>
        <button
          onClick={onBack}
          disabled={!canGoBack || !!selected}
          style={{
            background: 'none',
            border: 'none',
            color: canGoBack ? '#444' : '#222',
            cursor: canGoBack ? 'pointer' : 'default',
            fontSize: '0.8rem',
            padding: '4px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { if (canGoBack) e.currentTarget.style.color = '#888'; }}
          onMouseLeave={e => { if (canGoBack) e.currentTarget.style.color = '#444'; }}
        >
          ← Anterior
        </button>
        <p style={{
          color: '#252525',
          fontSize: '0.65rem',
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          ELIGE SIN PENSAR DEMASIADO
        </p>
        <div style={{ width: '72px' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Milestone Card 1 — después de Fase 1
// ─────────────────────────────────────────────
function Milestone1({ fnScores, topCandidates, onContinue, onBack }) {
  const insight = getMilestone1Text(fnScores);

  // Top 2 candidate type groups (blurred)
  const group1 = topCandidates.slice(0, 2).join(' / ');
  const group2 = topCandidates.slice(2, 4).join(' / ');

  return (
    <div style={{
      maxWidth: '520px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center',
      animation: 'fadeSlideIn 0.4s ease',
    }}>
      <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>✨</div>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Tu perfil está tomando forma
      </h2>
      <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        {insight}.
      </p>

      {/* Candidate glimpse */}
      <div style={{
        background: 'rgba(108,63,200,0.08)',
        border: '1px solid rgba(108,63,200,0.2)',
        borderRadius: '14px',
        padding: '1.25rem 1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{ color: '#555', fontSize: '0.65rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          CANDIDATOS MÁS PROBABLES
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {topCandidates.slice(0, 4).map((type, i) => (
            <div key={type} style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: i < 2 ? 'rgba(108,63,200,0.25)' : 'rgba(255,255,255,0.04)',
              border: i < 2 ? '1px solid #6C63FF55' : '1px solid #ffffff10',
              color: i < 2 ? '#C4B5FD' : '#333',
              fontSize: i < 2 ? '1.05rem' : '0.85rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              filter: i >= 2 ? 'blur(3px)' : 'none',
              transition: 'all 0.3s',
            }}>
              {type}
            </div>
          ))}
        </div>
        <p style={{ color: '#444', fontSize: '0.72rem', marginTop: '0.85rem' }}>
          La siguiente fase determinará cuál es el tuyo
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: '1px solid #222',
            borderRadius: '10px',
            padding: '0.85rem 1.25rem',
            fontSize: '0.85rem',
            color: '#444',
            cursor: 'pointer',
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={onContinue}
          style={{
            background: 'linear-gradient(135deg,#6C3FC8,#9B6FE8)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          Continuar análisis →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Milestone Card 2 — después de Fase 2
// ─────────────────────────────────────────────
function Milestone2({ topCandidates, onContinue, onBack }) {
  const top2 = topCandidates.slice(0, 2);

  return (
    <div style={{
      maxWidth: '520px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center',
      animation: 'fadeSlideIn 0.4s ease',
    }}>
      <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>🧠</div>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Tu tipo está casi definido
      </h2>
      <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        Entre las 16 personalidades, tu perfil apunta hacia uno de estos arquetipos.
        Las últimas preguntas confirmarán cuál es exactamente.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {top2.map((type, i) => (
          <div key={type} style={{
            padding: '1rem 2rem',
            borderRadius: '14px',
            background: i === 0
              ? 'linear-gradient(135deg, rgba(108,63,200,0.35), rgba(155,111,232,0.2))'
              : 'rgba(255,255,255,0.04)',
            border: i === 0 ? '1.5px solid #9B6FE8' : '1.5px solid #ffffff15',
            color: i === 0 ? '#E8E0F8' : '#555',
            fontSize: '1.8rem',
            fontWeight: 900,
            letterSpacing: '0.12em',
            filter: i === 1 ? 'blur(4px)' : 'none',
          }}>
            {type}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: '1px solid #222',
            borderRadius: '10px',
            padding: '0.85rem 1.25rem',
            fontSize: '0.85rem',
            color: '#444',
            cursor: 'pointer',
          }}
        >
          ← Anterior
        </button>
        <button
          onClick={onContinue}
          style={{
            background: 'linear-gradient(135deg,#6C3FC8,#9B6FE8)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2.5rem',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          Últimas preguntas →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main AdaptiveTest Component
// ─────────────────────────────────────────────
export default function AdaptiveTest({ onComplete, onCancel }) {
  // Screen: 'p1' | 'milestone1' | 'p2' | 'milestone2' | 'p3'
  const [screen, setScreen] = useState('p1');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [phase2Questions, setPhase2Questions] = useState([]);
  const [fnScores, setFnScores] = useState({ Ni:0,Ne:0,Si:0,Se:0,Fi:0,Fe:0,Ti:0,Te:0 });
  const [topCandidates, setTopCandidates] = useState([]);

  // Build all question bank (for accumulateFnScores)
  const allBank = [...PHASE1_QUESTIONS, ...phase2Questions, ...PHASE3_QUESTIONS];

  // Current question & answered count
  const currentQuestions = screen === 'p1'
    ? PHASE1_QUESTIONS
    : screen === 'p2'
      ? phase2Questions
      : PHASE3_QUESTIONS;

  const answeredCount = answers.length;

  const handleAnswer = useCallback((choice) => {
    const currentQ = currentQuestions[questionIndex];
    const newAnswers = [...answers, { questionId: currentQ.id, choice }];
    setAnswers(newAnswers);

    const isLastInPhase = questionIndex === currentQuestions.length - 1;

    if (!isLastInPhase) {
      setQuestionIndex(i => i + 1);
      return;
    }

    // End of phase
    if (screen === 'p1') {
      // Compute fn scores from Phase 1
      const newScores = accumulateFnScores(newAnswers, PHASE1_QUESTIONS);
      setFnScores(newScores);

      // Derive top candidates
      const { type, alternates, typeScores } = deriveTypeV3(newScores);
      const sorted = Object.entries(typeScores).sort((a, b) => b[1] - a[1]).map(([t]) => t);
      setTopCandidates(sorted.slice(0, 4));

      // Select phase 2 questions
      const p2qs = selectPhase2Questions(newScores, 12);
      setPhase2Questions(p2qs);

      setQuestionIndex(0);
      setScreen('milestone1');

    } else if (screen === 'p2') {
      // Compute cumulative fn scores
      const allBankNow = [...PHASE1_QUESTIONS, ...phase2Questions];
      const newScores = accumulateFnScores(newAnswers, allBankNow);
      setFnScores(newScores);

      const { typeScores } = deriveTypeV3(newScores);
      const sorted = Object.entries(typeScores).sort((a, b) => b[1] - a[1]).map(([t]) => t);
      setTopCandidates(sorted.slice(0, 4));

      setQuestionIndex(0);
      setScreen('milestone2');

    } else if (screen === 'p3') {
      // Final computation
      const allBankFinal = [...PHASE1_QUESTIONS, ...phase2Questions, ...PHASE3_QUESTIONS];
      const finalScores = accumulateFnScores(newAnswers, allBankFinal);
      const result = deriveTypeV3(finalScores);
      onComplete(result);
    }
  }, [screen, questionIndex, currentQuestions, answers, phase2Questions, onComplete]);

  const handleMilestone1Continue = () => {
    setScreen('p2');
    setQuestionIndex(0);
  };

  const handleMilestone2Continue = () => {
    setScreen('p3');
    setQuestionIndex(0);
  };

  // ── Back navigation ──────────────────────────────────────
  const handleBack = useCallback(() => {
    if (screen === 'p1') {
      if (questionIndex > 0) {
        setAnswers(prev => prev.slice(0, -1));
        setQuestionIndex(i => i - 1);
      }
      // at index 0 of p1 = very first question, back is disabled
    } else if (screen === 'milestone1') {
      // Go back to last p1 question — remove its answer so user can re-answer
      setAnswers(prev => prev.slice(0, -1));
      setScreen('p1');
      setQuestionIndex(PHASE1_QUESTIONS.length - 1);
    } else if (screen === 'p2') {
      if (questionIndex > 0) {
        setAnswers(prev => prev.slice(0, -1));
        setQuestionIndex(i => i - 1);
      } else {
        // First question of p2 — go back to milestone1 (no answer to remove yet)
        setScreen('milestone1');
      }
    } else if (screen === 'milestone2') {
      // Go back to last p2 question
      setAnswers(prev => prev.slice(0, -1));
      setScreen('p2');
      setQuestionIndex(phase2Questions.length - 1);
    } else if (screen === 'p3') {
      if (questionIndex > 0) {
        setAnswers(prev => prev.slice(0, -1));
        setQuestionIndex(i => i - 1);
      } else {
        // First question of p3 — go back to milestone2
        setScreen('milestone2');
      }
    }
  }, [screen, questionIndex, phase2Questions]);

  const canGoBack = (
    (screen === 'p1' && questionIndex > 0) ||
    screen === 'milestone1' ||
    screen === 'p2' ||
    screen === 'milestone2' ||
    screen === 'p3'
  );

  // Render milestone screens
  if (screen === 'milestone1') {
    return (
      <div style={{ width: '100%', padding: '2rem 0' }}>
        <AdaptiveProgressBar answered={12} total={TOTAL_QUESTIONS} />
        <Milestone1
          fnScores={fnScores}
          topCandidates={topCandidates}
          onContinue={handleMilestone1Continue}
          onBack={handleBack}
        />
      </div>
    );
  }

  if (screen === 'milestone2') {
    return (
      <div style={{ width: '100%', padding: '2rem 0' }}>
        <AdaptiveProgressBar answered={24} total={TOTAL_QUESTIONS} />
        <Milestone2
          topCandidates={topCandidates}
          onContinue={handleMilestone2Continue}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Question screens
  const currentQ = currentQuestions[questionIndex];
  if (!currentQ) return null;

  // Offset for total progress bar
  const baseOffset = screen === 'p1' ? 0 : screen === 'p2' ? 12 : 24;
  const totalAnswered = baseOffset + questionIndex;

  return (
    <div style={{ width: '100%', padding: '1.5rem 0' }}>
      <AdaptiveProgressBar answered={totalAnswered} total={TOTAL_QUESTIONS} />
      <QuestionCard
        key={currentQ.id}
        question={currentQ}
        questionNumber={totalAnswered + 1}
        total={TOTAL_QUESTIONS}
        onAnswer={handleAnswer}
        onBack={handleBack}
        canGoBack={canGoBack}
      />
    </div>
  );
}
