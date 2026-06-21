'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext';

const SKILLS = [
  { label: 'REACT',     value: 84 },
  { label: 'NEXT.JS',   value: 79 },
  { label: 'CSS/HTML',  value: 90 },
  { label: 'MOBILE',    value: 70 },
  { label: 'DATABASE',  value: 63 },
  { label: 'SCRIPTING', value: 60 },
];

const SIZE  = 164;
const CX    = SIZE / 2;
const CY    = SIZE / 2;
const MAX_R = 62;
const RINGS = 4;
const N     = SKILLS.length;
const STEP  = 360 / N;

function toXY(angleDeg: number, r: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

interface SkillRadarProps {
  lang?: 'ru' | 'en';
}

export default function SkillRadar({ lang = 'en' }: SkillRadarProps) {
  const wrapRef              = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered]   = useState(false);
  const { theme }            = useTheme();
  const isRdr2               = theme === 'rdr2';

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !entered) setEntered(true); },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    let raf: number;
    let startTs: number | null = null;
    const duration = 1100;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const t     = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [entered]);

  const pts     = SKILLS.map((s, i) => toXY(i * STEP, (s.value / 100) * MAX_R * progress));
  const polygon = pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const rings   = Array.from({ length: RINGS }, (_, ri) => {
    const r = (MAX_R * (ri + 1)) / RINGS;
    return SKILLS.map((_, i) => { const p = toXY(i * STEP, r); return `${p.x.toFixed(2)},${p.y.toFixed(2)}`; }).join(' ');
  });

  const subtitle = lang === 'ru' ? 'насколько чувствую себя в этой сфере)0)' : 'how much i feel myself in this area)0)';

  const ringStroke   = isRdr2 ? 'rgba(176,28,28,0.2)'  : '#1c1c1c';
  const spokeStroke  = isRdr2 ? 'rgba(176,28,28,0.15)' : '#1c1c1c';
  const polyFill     = isRdr2 ? 'rgba(176,28,28,0.07)' : 'rgba(255,255,255,0.05)';
  const polyStroke   = isRdr2 ? 'rgba(176,28,28,0.75)' : 'rgba(255,255,255,0.65)';
  const dotFill      = isRdr2 ? '#b01c1c'              : '#ffffff';
  const labelFill    = isRdr2 ? '#5a4e3a'              : '#444444';
  const labelFont    = isRdr2 ? `var(--font-special-elite), serif` : `'Geist Mono', 'Consolas', monospace`;
  const barBg        = (v: number) => isRdr2
    ? `rgba(176,28,28,${0.1 + (v / 100) * 0.45})`
    : `rgba(255,255,255,${0.08 + (v / 100) * 0.5})`;

  return (
    <div ref={wrapRef} className="flex flex-col items-center gap-4 select-none">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-label="Skill radar chart">
        {rings.map((rpts, ri) => (
          <polygon key={ri} points={rpts} fill="none" stroke={ringStroke} strokeWidth="1" />
        ))}
        {SKILLS.map((_, i) => {
          const outer = toXY(i * STEP, MAX_R);
          return <line key={i} x1={CX} y1={CY} x2={outer.x} y2={outer.y} stroke={spokeStroke} strokeWidth="1" />;
        })}
        <polygon points={polygon} fill={polyFill} stroke={polyStroke} strokeWidth="1.5" strokeLinejoin="round" />
        {pts.map((pt, i) => <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill={dotFill} />)}
        <circle cx={CX} cy={CY} r="1.5" fill={isRdr2 ? '#2e2416' : '#333333'} />
        {SKILLS.map((s, i) => {
          const labelPt = toXY(i * STEP, MAX_R + 16);
          return (
            <text
              key={i}
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fontFamily={labelFont}
              letterSpacing="0.08em"
              fill={labelFill}
            >
              {s.label}
            </text>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 w-full">
        {SKILLS.map(s => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="h-px flex-1" style={{ background: barBg(s.value), maxWidth: '28px' }} />
            <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: 'var(--muted-dk)' }}>
              {s.label}
            </span>
            <span className="font-mono text-[8px] ml-auto tabular-nums" style={{ color: 'var(--muted-dk)' }}>
              {Math.round(s.value * progress)}
            </span>
          </div>
        ))}
      </div>

      <p className="font-mono text-[8px] uppercase tracking-wider text-center" style={{ color: 'var(--muted-dk)', opacity: 0.6 }}>
        {subtitle}
      </p>
    </div>
  );
}
