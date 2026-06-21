'use client';

import React, { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Database, Layout, Smartphone, Code, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SkillRadar from "./components/SkillRadar";
import { useTheme } from "./components/ThemeContext";

type Language = 'ru' | 'en';

const translations = {
  en: {
    heroTitle: "ALBERT\nAZIZOV",
    heroSubtitle: "web & mobile engineer",
    heroDesc: "Hey! Here is some quick info about me. Basically, I am 18 years old, living in Central Asia, and developing web and mobile apps. I love writing clean code and building interfaces that look great and feel intuitive to use.",
    heroDescExtra: " In parallel, I am studying AI development to make sure that the AI itself doesn't replace me in the future 😁 On a more serious note, my dream is to grow as an engineer and eventually work at tech giants like Google or Amazon. I want to keep it real: the market is changing fast, so I focus on learning every day and building things that are genuinely useful.",
    more: "more",
    less: "less",
    viewProjects: "VIEW PROJECTS",
    techStackTitle: "01 / CORE TECHNOLOGIES",
    techStackSubtitle: "Current Capabilities",
    techCards: [
      { title: "FRONTEND DEVELOPMENT", desc: "HTML5, CSS3, JavaScript (ES6+), React.js, and modern UI libraries like shadcn/ui and reactbits. Building responsive, semantic web interfaces with premium animations.", tag: "STACK_01" },
      { title: "MOBILE ENGINEERING",   desc: "React Native (Cross-platform). Building cross-platform iOS and Android applications with a single codebase.", tag: "STACK_02" },
      { title: "BACKEND & DATABASE",   desc: "MySQL. Designing efficient relational databases, optimizing queries and table structures.", tag: "STACK_03" },
      { title: "SCRIPTING & SYSTEMS",  desc: "Lua. Writing lightweight scripts for game engines, embedded systems, and custom automation tools.", tag: "STACK_04" },
    ],
    projectsTitle: "02 / SELECTED WORKS",
    projectsSubtitle: "Featured Case Studies",
    projects: [
      { title: "DEVLINK ANALYTICS", status: "Active",  type: "active",  sub: "click tracking & analytics platform",    desc: "An engineering alternative to Linktree with a built-in admin panel. Tracks link clicks in real-time, executing atomic increments in a MySQL database.", action: "VIEW PROJECT",     isConcept: false, tags: ["REACT", "NEXT.JS", "MYSQL", "TAILWIND"] },
      { title: "ASCII ART GENERATOR", status: "Planned", type: "planned", sub: "image & video to ascii converter",      desc: "A high-performance system for converting images and video streams into ASCII art in real-time. Designed to run client-side with canvas integration.", action: "UPCOMING PROJECT", isConcept: true,  tags: ["REACT", "CANVAS", "WEB WORKERS", "TAILWIND"] },
      { title: "SYNTAXVAULT",       status: "Concept", type: "concept", sub: "secure code snippet vault",             desc: "A minimalist service for storing code snippets with syntax highlighting and token-based access protection.", action: "CONCEPT STAGE",  isConcept: true,  tags: ["REACT", "EXPRESS", "POSTGRESQL", "TAILWIND"] },
      { title: "DEVPULSE KANBAN",   status: "Concept", type: "concept", sub: "high-speed agile board",                desc: "A task management application featuring a super-fast client-side drag-and-drop interface with local caching.", action: "CONCEPT STAGE",  isConcept: true,  tags: ["NEXT.JS", "DND-KIT", "SQLITE", "TAILWIND"] },
    ],
    footerCopyright: "© 2026",
    nowTitle: "04 / NOW",
    nowSubtitle: "Current Activity",
    nowItems: [
      { label: "building", value: "DEVLINK analytics v2" },
      { label: "learning", value: "AI / neural net fundamentals" },
      { label: "reading",  value: "System Design Interview" },
      { label: "target",   value: "SPbGU Tashkent" },
    ],
    switchLabel: { toRdr2: "WILD WEST", toModern: "MODERN" },
    musicOn: "MUSIC: ON",
    musicOff: "MUSIC",
    play: "▶ PLAY",
    stop: "■ STOP",
    gunPhrases: ["*tips hat*", "Outlaws for life", "Wanted: dead or alive", "This land is mine", "Ride or die, partner"],
  },
  ru: {
    heroTitle: "ALBERT\nAZIZOV",
    heroSubtitle: "web & mobile engineer",
    heroDesc: "Привет! Это краткая информация обо мне. Вкратце: мне 18 лет, живу в Центральной Азии и создаю веб- и мобильные приложения. Мне очень нравится писать аккуратный код и делать интерфейсы, которые выглядят приятно и которыми удобно пользоваться.",
    heroDescExtra: " Параллельно я изучаю разработку искусственного интеллекта и нейросетей, чтобы в будущем этот самый ИИ меня не заменил 😁 Ну а если серьезно, моя мечта вырасти как специалист и работать в крупных технологических компаниях вроде Google или Amazon.",
    more: "more",
    less: "less",
    viewProjects: "ПОСМОТРЕТЬ ПРОЕКТЫ",
    techStackTitle: "01 / ОСНОВНЫЕ ТЕХНОЛОГИИ",
    techStackSubtitle: "Текущие навыки",
    techCards: [
      { title: "ФРОНТЕНД-РАЗРАБОТКА",  desc: "HTML5, CSS3, JavaScript (ES6+), React.js и современные библиотеки UI (shadcn/ui, reactbits). Создание адаптивных интерфейсов с высокой производительностью.", tag: "STACK_01" },
      { title: "МОБИЛЬНАЯ РАЗРАБОТКА", desc: "React Native (Cross-platform). Разработка кроссплатформенных приложений для iOS и Android с единой кодовой базой.", tag: "STACK_02" },
      { title: "БЭКЕНД И БАЗЫ ДАННЫХ", desc: "MySQL. Проектирование эффективных реляционных баз данных, оптимизация поисковых запросов и структуры таблиц.", tag: "STACK_03" },
      { title: "СКРИПТИНГ И СИСТЕМЫ",  desc: "Lua. Разработка легковесных скриптов для игровых движков, встраиваемых систем и автоматизации процессов.", tag: "STACK_04" },
    ],
    projectsTitle: "02 / ИЗБРАННЫЕ РАБОТЫ",
    projectsSubtitle: "Ключевые проекты",
    projects: [
      { title: "DEVLINK ANALYTICS", status: "Активен",  type: "active",  sub: "платформа аналитики и отслеживания кликов", desc: "Инженерный аналог Linktree со встроенной админ-панелью. Отслеживает клики по ссылкам в реальном времени, выполняя атомарные инкременты в базе данных MySQL.", action: "ПОСМОТРЕТЬ ПРОЕКТ",  isConcept: false, tags: ["REACT", "NEXT.JS", "MYSQL", "TAILWIND"] },
      { title: "ASCII ART GENERATOR", status: "В планах", type: "planned", sub: "конвертер изображений и видео в ascii",      desc: "Высокопроизводительный конвертер изображений и видеопотоков в ASCII-графику в реальном времени. Работает на стороне клиента с использованием Canvas.", action: "ПЛАНИРУЕМЫЙ ПРОЕКТ", isConcept: true,  tags: ["REACT", "CANVAS", "WEB WORKERS", "TAILWIND"] },
      { title: "SYNTAXVAULT",       status: "Концепт",  type: "concept", sub: "защищенное хранилище сниппетов кода",        desc: "Минималистичный сервис для хранения сниппетов кода с подсветкой синтаксиса и защитой по токенам доступа.", action: "СТАДИЯ КОНЦЕПТА",  isConcept: true,  tags: ["REACT", "EXPRESS", "POSTGRESQL", "TAILWIND"] },
      { title: "DEVPULSE KANBAN",   status: "Концепт",  type: "concept", sub: "высокоскоростная agile-панель",               desc: "Приложение для управления задачами со сверхбыстрым drag-and-drop interface. Включает локальное кэширование и фоновую синхронизацию данных.", action: "СТАДИЯ КОНЦЕПТА",  isConcept: true,  tags: ["NEXT.JS", "DND-KIT", "SQLITE", "TAILWIND"] },
    ],
    footerCopyright: "© 2026",
    nowTitle: "04 / СЕЙЧАС",
    nowSubtitle: "Текущая активность",
    nowItems: [
      { label: "делаю",  value: "DEVLINK analytics v2" },
      { label: "учу",    value: "ИИ / нейросети" },
      { label: "читаю",  value: "System Design Interview" },
      { label: "цель",   value: "СПбГУ Ташкент" },
    ],
    switchLabel: { toRdr2: "ДИКИЙ ЗАПАД", toModern: "MODERN" },
    musicOn: "МУЗЫКА: ВКЛ",
    musicOff: "МУЗЫКА",
    play: "▶ СТАРТ",
    stop: "■ СТОП",
    gunPhrases: ["*приподнимает шляпу*", "Шаг в сторону!", "Разыскивается!", "Эта земля моя", "Живым или мёртвым"],
  },
};

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
} as const;

const columnVariants = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
} as const;

function ThemeVeil({ active }: { active: boolean }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none',
      background: '#000', opacity: active ? 1 : 0,
      transition: 'opacity 0.35s ease',
    }} />
  );
}

function OrnamentalDivider({ isRdr2 }: { isRdr2: boolean }) {
  if (!isRdr2) return <hr style={{ height: '1px', background: 'var(--border)', border: 'none' }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '4px 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(176,28,28,0.5))' }} />
      <span style={{ margin: '0 10px', color: 'var(--accent)', fontSize: '8px', opacity: 0.5, letterSpacing: '6px' }}>✦ ✦ ✦</span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(176,28,28,0.5))' }} />
    </div>
  );
}

function HoverCorners({ isRdr2, rect }: { isRdr2: boolean; rect: { width: number; height: number } | null }) {
  const col = isRdr2 ? 'var(--accent)' : '#ffffff';
  const alf = isRdr2 ? 'rgba(176,28,28,0.5)' : 'rgba(255,255,255,0.6)';
  const sz  = isRdr2 ? '10px' : '6px';
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, border: `1px solid ${alf}`, pointerEvents: 'none', zIndex: 10 }} />
      {[{t:'-3px',l:'-3px',bdr:`2px solid ${col}`,bdl:`2px solid ${col}`},{t:'-3px',r:'-3px',bdt:`2px solid ${col}`,bdr2:`2px solid ${col}`},{b:'-3px',l:'-3px',bdb:`2px solid ${col}`,bdl2:`2px solid ${col}`},{b:'-3px',r:'-3px',bdb2:`2px solid ${col}`,bdr3:`2px solid ${col}`}].map((_, i) => (
        <div key={i} style={{ position: 'absolute', width: sz, height: sz, pointerEvents: 'none', zIndex: 20,
          ...(i === 0 ? { top: '-3px', left: '-3px', borderTop: `2px solid ${col}`, borderLeft: `2px solid ${col}` } : {}),
          ...(i === 1 ? { top: '-3px', right: '-3px', borderTop: `2px solid ${col}`, borderRight: `2px solid ${col}` } : {}),
          ...(i === 2 ? { bottom: '-3px', left: '-3px', borderBottom: `2px solid ${col}`, borderLeft: `2px solid ${col}` } : {}),
          ...(i === 3 ? { bottom: '-3px', right: '-3px', borderBottom: `2px solid ${col}`, borderRight: `2px solid ${col}` } : {}),
        }} />
      ))}
      {rect && (
        <div style={{ position: 'absolute', bottom: '-18px', right: '6px', fontFamily: 'monospace', fontSize: '8px', fontWeight: 700, background: col, color: isRdr2 ? '#080604' : '#000', padding: '1px 4px', zIndex: 10, pointerEvents: 'none' }}>
          w: {rect.width}px / h: {rect.height}px
        </div>
      )}
    </>
  );
}

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!(window as any)._sharedAudioCtx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (AC) {
      (window as any)._sharedAudioCtx = new AC();
    }
  }
  return (window as any)._sharedAudioCtx || null;
};

let sharedNoiseBuffer: AudioBuffer | null = null;
const getNoiseBuffer = (ctx: AudioContext) => {
  if (!sharedNoiseBuffer) {
    const size = ctx.sampleRate * 0.15;
    sharedNoiseBuffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = sharedNoiseBuffer.getChannelData(0);
    for (let i = 0; i < size; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return sharedNoiseBuffer;
};

const playStampSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    const noise = ctx.createBufferSource();
    noise.buffer = getNoiseBuffer(ctx);
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.1);
    filter.Q.setValueAtTime(1.5, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    osc.start(now);
    noise.start(now);
    osc.stop(now + 0.15);
    noise.stop(now + 0.15);
  } catch {}
};

const playGuitarTwang = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(146.83, now);
    osc1.frequency.linearRampToValueAtTime(140.0, now + 0.35);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(220.00, now);
    osc2.frequency.linearRampToValueAtTime(215.0, now + 0.45);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    gain2.gain.setValueAtTime(0.2, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(ctx.destination);
    osc1.start(now);
    osc2.start(now + 0.04);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
  } catch {}
};

function WantedPoster({ isHovered, isStamped, stampText, onStamp, isShaking }: { isHovered: boolean; isStamped: boolean; stampText: string; onStamp: () => void; isShaking: boolean }) {
  return (
    <motion.div
      onClick={onStamp}
      animate={{
        x: isShaking ? [0, -3, 3, -2, 2, -1, 1, 0] : 0,
        y: isShaking ? [0, 4, -3, 2, -2, 1, 0] : 0,
        rotate: isHovered ? [1.5, -1.2, 1.8, -0.8, 1.5] : 1.5,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        x: isShaking ? { duration: 0.2, ease: "linear" } : { duration: 0.3 },
        y: isShaking ? { duration: 0.2, ease: "linear" } : { duration: 0.3 },
        rotate: isHovered ? { repeat: Infinity, duration: 3.2, ease: "easeInOut" } : { duration: 0.3 },
        scale: { duration: 0.2 }
      }}
      className="rdr2-wanted-poster"
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', width: '100%' }}>
        <span style={{
          fontFamily: "'RDR2', var(--font-rye), serif",
          fontSize: '12px',
          color: '#b01c1c',
          letterSpacing: '0.06em',
          lineHeight: '1',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          WANTED
        </span>
        <span style={{
          fontFamily: "var(--font-special-elite), serif",
          fontSize: '4px',
          color: '#1e180e',
          letterSpacing: '0.1em',
          lineHeight: '1',
          opacity: 0.85
        }}>
          DEAD OR ALIVE
        </span>
      </div>

      <span style={{
        fontFamily: "'RDR2', var(--font-rye), serif",
        fontSize: '8px',
        color: '#1e180e',
        letterSpacing: '0.04em',
        lineHeight: '1',
        fontWeight: 'bold',
        margin: '1px 0',
        textAlign: 'center'
      }}>
        ALBERT AZIZOV
      </span>

      <div style={{
        width: '66px',
        height: '68px',
        border: '1px solid rgba(30, 24, 14, 0.45)',
        background: 'rgba(30, 24, 14, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        margin: '1px 0'
      }}>
        <svg width="52" height="54" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.88, color: '#1e180e' }}>
          <path d="M35 30C35 25 38 20 50 20C62 20 65 25 65 30C65 33 60 36 50 36C40 36 35 33 35 30Z" fill="currentColor" />
          <path d="M15 32C30 30 70 30 85 32C92 32.5 92 35 85 35.5C70 36.5 30 36.5 15 35.5C8 35 8 32.5 15 32Z" fill="currentColor" />
          <path d="M40 35C40 35 38 48 41 53C43 56 46 58 50 58C54 58 57 56 59 53C62 48 60 35 60 35H40Z" fill="currentColor" />
          <path d="M38 48L50 64L62 48C62 48 57 53 50 53C43 53 38 48 38 48Z" fill="#b01c1c" />
          <path d="M22 66C22 58 35 55 50 55C65 55 78 58 78 66L82 85H18L22 66Z" fill="currentColor" />
          <path d="M44 55L50 66L56 55" stroke="#eae1c3" strokeWidth="2.5" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', width: '100%' }}>
        <span style={{
          fontFamily: "'RDR2', var(--font-rye), serif",
          fontSize: '7px',
          color: '#1e180e',
          letterSpacing: '0.04em',
          lineHeight: '1.1'
        }}>
          REWARD
        </span>
        <span style={{
          fontFamily: "'RDR2', var(--font-rye), serif",
          fontSize: '9px',
          color: '#b01c1c',
          letterSpacing: '0.02em',
          lineHeight: '1',
          fontWeight: 'bold'
        }}>
          $10,000
        </span>
      </div>

      <div className={`rdr2-wanted-stamp ${isStamped ? 'active' : ''}`}>
        {stampText}
      </div>
    </motion.div>
  );
}

interface MusicControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volumeRef: React.MutableRefObject<number>;
  theme: string;
  lang: Language;
  onClose: () => void;
}

function MusicControls({ isPlaying, togglePlay, audioRef, volumeRef, theme, lang, onClose }: MusicControlsProps) {
  const [vol, setVol] = useState(volumeRef.current);
  const [isMuted, setIsMuted] = useState(false);
  const isRdr2 = theme === 'rdr2';

  const handleVolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    volumeRef.current = v;
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
    if (!nextMute && vol === 0) {
      setVol(0.15);
      volumeRef.current = 0.15;
      audioRef.current.volume = 0.15;
    }
  };

  const getTrackName = () => {
    if (!audioRef.current) return '';
    const src = audioRef.current.src || '';
    if (src.includes('eastward-bound')) return 'RDR2 OST - Eastward Bound';
    if (src.includes('playground-love')) return 'Air - Playground Love';
    if (src.includes('deep-in-it')) return 'Deep In It';
    return isRdr2 ? 'RDR2 OST - Eastward Bound' : 'Deep In It';
  };

  const accentColor = isRdr2 ? 'var(--accent)' : '#ffffff';
  const mutedColor  = isRdr2 ? 'var(--muted)'  : '#a1a1aa';
  const mutedDark   = isRdr2 ? 'var(--muted-dk)' : '#52525b';
  const border2     = isRdr2 ? 'var(--border-2)' : '#27272a';
  const cardBg      = isRdr2 ? 'var(--card)'     : '#09090b';
  const monoFont    = isRdr2 ? `var(--font-special-elite), serif` : 'var(--font-geist-mono), monospace';

  return (
    <motion.div
      key="music-controls"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: cardBg,
        border: `1px solid ${border2}`,
        padding: '6px 12px',
        fontFamily: monoFont,
        color: mutedColor,
        borderRadius: isRdr2 ? '0px' : '9999px',
        boxShadow: isRdr2 ? '4px 4px 0px var(--accent)' : '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: 'none',
          border: 'none',
          color: accentColor,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {isPlaying ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <rect x="4" y="4" width="6" height="16" />
            <rect x="14" y="4" width="6" height="16" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>

      <span style={{ fontSize: '9px', opacity: 0.4 }}>|</span>

      <span
        style={{
          fontSize: '9px',
          letterSpacing: '0.05em',
          maxWidth: '120px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: isRdr2 ? '#1e180e' : '#ffffff',
          opacity: 0.85,
        }}
        title={getTrackName()}
      >
        {getTrackName()}
      </span>

      <span style={{ fontSize: '9px', opacity: 0.4 }}>|</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          onClick={toggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: mutedColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
          onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}
        >
          {isMuted ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : vol}
          onChange={handleVolChange}
          className="w-16 h-1 cursor-pointer appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-1 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none"
          style={{
            background: `linear-gradient(to right, ${accentColor} ${(isMuted ? 0 : vol) * 100}%, ${border2} ${(isMuted ? 0 : vol) * 100}%)`,
          }}
        />
        <span style={{ fontSize: '8px', width: '22px', textAlign: 'right', opacity: 0.65 }}>
          {isMuted ? '0%' : `${Math.round(vol * 100)}%`}
        </span>
      </div>

      <span style={{ fontSize: '9px', opacity: 0.4 }}>|</span>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: mutedDark,
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: 1,
          padding: 0,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
        onMouseLeave={e => (e.currentTarget.style.color = mutedDark)}
      >
        ×
      </button>
    </motion.div>
  );
}

const CAT_ASCII = `　　　　／＞　 フ
　　　　| 　_　 _|
 　　　／\`ミ _x  彡 
　 　 /　　　 　 |
　　 /　  ヽ　　 ﾉ
／￣|　　 |　|　|
| (￣ヽ＿_ヽ_)_)
＼二つ`;

export default function Home() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isRdr2 = theme === 'rdr2';

  const [lang, setLang]                   = useState<Language>('en');
  const [isPlaying, setIsPlaying]         = useState(false);
  const [isCharHovered, setIsCharHovered] = useState(false);
  const [charBubble, setCharBubble]       = useState('');
  const [showIntro, setShowIntro]         = useState(true);
  const [introFade, setIntroFade]         = useState(false);
  const [hoveredCard, setHoveredCard]     = useState<string | null>(null);
  const [hoveredRect, setHoveredRect]     = useState<{ width: number; height: number } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMusic, setShowMusic]         = useState(false);
  const [isExpanded, setIsExpanded]       = useState(false);
  const [catFace, setCatFace]             = useState('_x ');
  const [catClicks, setCatClicks]         = useState(0);
  const [particles, setParticles]         = useState<{ id: number; x: number; text: string; color: string }[]>([]);
  const [isStamped, setIsStamped]         = useState(false);
  const [stampText, setStampText]         = useState('CAPTURED');
  const [isShaking, setIsShaking]         = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [liveVisitors, setLiveVisitors]   = useState<number | null>(null);
  const [audioSrc, setAudioSrc]           = useState('/eastward-bound.mp3');

  const audioRef      = useRef<HTMLAudioElement | null>(null);
  const volumeRef     = useRef(0.15);
  const highlightRef  = useRef<NodeJS.Timeout | null>(null);
  const sessionId     = useRef('');
  const sectionTimes  = useRef<Record<string, number>>({ about: 0, stack: 0, projects: 0 });
  const currentSec    = useRef('about');
  const startTime     = useRef(0);
  const prevTheme     = useRef(theme);

  const t = translations[lang];

  const splitTitle = (title: string) => {
    const p = title.split(' / ');
    return p.length > 1 ? { num: p[0], text: p[1] } : { num: '', text: title };
  };

  const initAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeRef.current;
    }
  }, []);

  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;

    if (theme === 'rdr2') {
      playGuitarTwang();
    }

    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = theme === 'rdr2' ? '/eastward-bound.mp3' : '/deep-in-it.mp3';
      audioRef.current.load();
      audioRef.current.volume = volumeRef.current;
      if (theme === 'rdr2') {
        audioRef.current.currentTime = 270;
      }
      if (wasPlaying) {
        setTimeout(() => {
          initAudio();
          audioRef.current?.play().catch(() => {});
        }, 800);
      }
    }
    setAudioSrc(theme === 'rdr2' ? '/eastward-bound.mp3' : '/deep-in-it.mp3');
  }, [theme]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    initAudio();
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (theme === 'rdr2' && audioRef.current.currentTime === 0) {
        audioRef.current.currentTime = 270;
      }
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (highlightRef.current) clearTimeout(highlightRef.current);
    setHighlightedSection(null);
    setTimeout(() => {
      setHighlightedSection(id);
      highlightRef.current = setTimeout(() => setHighlightedSection(null), 2500);
    }, 10);
  };

  const catPhrases = {
    en: ["purr...", "print('hello world')", "npm run dev", "hello!", "jazz time", "meow~"],
    ru: ["мурр...", "print('привет, мир')", "npm run dev", "привет!", "время джаза", "мяу~"],
  };

  const handleCharHover = (hovering: boolean) => {
    setIsCharHovered(hovering);
    if (hovering) {
      if (isRdr2) {
        const pool = t.gunPhrases;
        setCharBubble(pool[Math.floor(Math.random() * pool.length)]);
      } else {
        const pool = catPhrases[lang];
        setCharBubble(pool[Math.floor(Math.random() * pool.length)]);
        setCatFace('^.^');
      }
    } else {
      if (!isRdr2) setCatFace('_x ');
    }
  };

  const handleStampClick = () => {
    setIsShaking(true);
    playStampSound();
    setTimeout(() => setIsShaking(false), 200);

    if (isStamped) {
      setIsStamped(false);
      setTimeout(() => {
        setStampText(Math.random() > 0.5 ? (lang === 'ru' ? 'МЕРТВ' : 'DEAD') : (lang === 'ru' ? 'ПОЙМАН' : 'CAPTURED'));
        setIsStamped(true);
      }, 50);
    } else {
      setStampText(Math.random() > 0.5 ? (lang === 'ru' ? 'МЕРТВ' : 'DEAD') : (lang === 'ru' ? 'ПОЙМАН' : 'CAPTURED'));
      setIsStamped(true);
    }

    const phrases = t.gunPhrases;
    setCharBubble(phrases[Math.floor(Math.random() * phrases.length)]);
    setIsCharHovered(true);
  };

  const handleCatClick = () => {
    setCatClicks(prev => {
      const next = prev + 1;
      if (next === 5) {
        setCharBubble(lang === 'ru' ? 'СЕКРЕТНЫЙ ТРЕК РАЗБЛОКИРОВАН! 🎵' : 'SECRET TRACK UNLOCKED! 🎵');
        setIsCharHovered(true);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.src = '/playground-love.mp3';
            audioRef.current.load();
            initAudio();
            if (isPlaying) audioRef.current.play().catch(() => {});
          }
        }, 100);
      } else {
        const pool = lang === 'ru'
          ? ['Эй, не щекотно!', 'Ещё клик!', 'ИИ меня не заменит!']
          : ["Hey, that tickles!", "One more click!", "AI won't replace me!"];
        setCharBubble(pool[Math.floor(Math.random() * pool.length)]);
      }
      return next;
    });

    const shapes = ['♡', '[♡]', '<3', 'ptr->♡'];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#a855f7'];
    setParticles(prev => [...prev, { id: Date.now() + Math.random(), x: Math.random() * 60 - 30, text: shapes[Math.floor(Math.random() * shapes.length)], color: colors[Math.floor(Math.random() * colors.length)] }]);

    const faces = ['^.^', '♥.♥', 'o.o', 'z.z'];
    setCatFace(faces[Math.floor(Math.random() * faces.length)]);
  };

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let id = sessionStorage.getItem('portfolio_session_id');
    if (!id) {
      id = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
      sessionStorage.setItem('portfolio_session_id', id);
    }
    sessionId.current = id;
    startTime.current = Date.now();

    const send = (exit = false) => {
      if (!sessionId.current) return;
      fetch('/api/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId.current,
          action: exit ? 'exit' : 'update',
          duration: Math.round((Date.now() - startTime.current) / 1000),
          sectionDurations: sectionTimes.current,
          currentSection: currentSec.current,
        }),
        keepalive: true,
      }).catch(() => {});
    };

    send();

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) currentSec.current = e.target.id; });
    }, { rootMargin: '-20% 0px -20% 0px', threshold: 0.15 });

    ['about', 'stack', 'projects'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const timer     = setInterval(() => {
      const s = currentSec.current;
      if (sectionTimes.current[s] !== undefined) sectionTimes.current[s] += 1;
    }, 1000);
    const heartbeat = setInterval(() => send(), 15000);
    const onHide    = () => { if (document.visibilityState === 'hidden') send(true); };
    document.addEventListener('visibilitychange', onHide);

    return () => {
      observer.disconnect();
      clearInterval(timer);
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroFade(true), 1800);
    const t2 = setTimeout(() => setShowIntro(false), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);



  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/visit');
        const j   = await res.json();
        if (j.success) setLiveVisitors(j.totalVisitors);
      } catch {}
    };
    fetchCount();
  }, []);

  const rdr2Font    = `'RDR2', var(--font-rye), serif`;
  const seEliteFont = `var(--font-special-elite), serif`;
  const monoFont    = isRdr2 ? seEliteFont : 'var(--font-geist-mono), monospace';
  const bodyFont    = isRdr2 ? seEliteFont : 'var(--font-geist-sans), sans-serif';
  const serifFont   = isRdr2 ? rdr2Font    : 'var(--font-serif), Georgia, serif';
  const accentColor = isRdr2 ? 'var(--accent)' : '#ffffff';
  const mutedColor  = isRdr2 ? 'var(--muted)'  : '#a1a1aa';
  const mutedDark   = isRdr2 ? 'var(--muted-dk)' : '#52525b';
  const borderColor = isRdr2 ? 'var(--border)'   : '#18181b';
  const border2     = isRdr2 ? 'var(--border-2)' : '#27272a';
  const cardBg      = isRdr2 ? 'var(--card)'     : '#09090b';
  const fgColor     = isRdr2 ? 'var(--fg)'       : '#ffffff';
  const bgColor     = isRdr2 ? 'var(--bg)'        : '#000000';

  return (
    <main
      className="min-h-screen flex flex-col justify-between relative overflow-x-hidden rdr2-scratch"
      style={{ background: bgColor, color: fgColor, fontFamily: bodyFont }}
    >
      <ThemeVeil active={isTransitioning} />

      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          background: isRdr2 ? 'linear-gradient(to right, #6b0000, #b01c1c, #8b0000)' : '#ffffff',
          transform: `scaleX(${scrollProgress})`,
          transition: 'transform 0.07s linear',
          boxShadow: isRdr2 ? '0 0 8px rgba(176,28,28,0.7)' : 'none',
        }}
      />

      {showIntro && (
        <div
          className={`fixed inset-0 z-[9998] flex items-center justify-center transition-opacity duration-700 ${introFade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ background: bgColor }}
        >
          <div className="text-center select-none">
            <h1
              className="animate-intro-text"
              style={{
                fontFamily: isRdr2 ? rdr2Font : 'var(--font-serif), Georgia, serif',
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                color: isRdr2 ? '#b01c1c' : '#ffffff',
                letterSpacing: '0.08em',
                fontStyle: isRdr2 ? 'normal' : 'italic',
                fontWeight: isRdr2 ? 'bold' : 'normal',
                margin: 0,
                textShadow: isRdr2 ? '0 0 40px rgba(176,28,28,0.55), 2px 2px 0 rgba(0,0,0,0.8)' : undefined
              }}
            >
              hi!
            </h1>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col flex-1 py-12 md:py-20 space-y-12 relative z-10">

        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 gap-4" style={{ borderBottom: `1px solid ${borderColor}` }}>
          <nav className="flex flex-wrap items-center gap-3 sm:gap-4" style={{ fontFamily: monoFont, fontSize: '10px', color: mutedDark }}>
            {[
              { id: 'about',    ru: 'ОБО МНЕ',  en: 'ABOUT'    },
              { id: 'stack',    ru: 'СТЕК',      en: 'STACK'    },
              { id: 'projects', ru: 'ПРОЕКТЫ',   en: 'PROJECTS' },
            ].map((item, i, arr) => (
              <React.Fragment key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={e => handleNavClick(e, item.id)}
                  className="uppercase tracking-wider select-none"
                  style={{ color: mutedDark, textDecoration: 'none', letterSpacing: isRdr2 ? '0.2em' : undefined }}
                  onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = mutedDark)}
                >
                  {lang === 'ru' ? item.ru : item.en}
                </a>
                {i < arr.length - 1 && <span style={{ color: borderColor }}>/</span>}
              </React.Fragment>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <div style={{ fontFamily: monoFont, fontSize: '10px' }}>
              <AnimatePresence mode="wait">
                {!showMusic ? (
                  <motion.button
                    key="music-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setShowMusic(true)}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: isPlaying ? accentColor : mutedDark, fontFamily: monoFont, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em' }}
                  >
                    <Music size={11} className={isPlaying ? 'animate-pulse' : ''} />
                    <span>{isPlaying ? t.musicOn : t.musicOff}</span>
                  </motion.button>
                ) : (
                  <MusicControls
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                    audioRef={audioRef}
                    volumeRef={volumeRef}
                    theme={theme}
                    lang={lang}
                    onClose={() => setShowMusic(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            <span style={{ color: borderColor }}>/</span>

            <button onClick={toggleTheme} className="theme-switcher" style={{ fontFamily: monoFont }}>
              {isRdr2 ? `⚙ ${t.switchLabel.toModern}` : `🤠 ${t.switchLabel.toRdr2}`}
            </button>

            <span style={{ color: borderColor }}>/</span>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: monoFont, fontSize: '10px' }}>
                {(['ru', 'en'] as Language[]).map((l, i, arr) => (
                  <React.Fragment key={l}>
                    <button onClick={() => setLang(l)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: lang === l ? accentColor : mutedDark, fontWeight: lang === l ? 700 : 400, fontFamily: monoFont, fontSize: '10px', textTransform: 'uppercase' }}>
                      {l.toUpperCase()}
                    </button>
                    {i < arr.length - 1 && <span style={{ color: borderColor }}>|</span>}
                  </React.Fragment>
                ))}
              </div>
              <div style={{
                fontSize: '7.5px',
                color: isRdr2 ? '#b01c1c' : '#71717a',
                fontFamily: isRdr2 ? seEliteFont : 'var(--font-geist-mono), monospace',
                marginTop: '3px',
                opacity: 0.8,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                letterSpacing: isRdr2 ? '0.02em' : 'normal'
              }}>
                {lang === 'en' ? '*(switching to RU may affect custom fonts)' : '*(оригинальные шрифты могут не поддерживать кириллицу)'}
              </div>
            </div>
          </div>
        </header>

        {isRdr2 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.2 }}>
              <div style={{ width: '80px', height: '1px', background: `linear-gradient(to right, transparent, var(--accent))` }} />
              <span style={{ color: 'var(--accent)', fontSize: '7px', letterSpacing: '8px', fontFamily: seEliteFont }}>✦ ✦ ✦</span>
              <div style={{ width: '80px', height: '1px', background: `linear-gradient(to left, transparent, var(--accent))` }} />
            </div>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={!showIntro ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start mt-8"
        >

          <motion.section
            id="about"
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 flex flex-col items-start text-left space-y-6 lg:sticky lg:top-20 pt-0 pb-6 scroll-mt-24 ${highlightedSection === 'about' ? 'highlight-pulse' : ''}`}
          >
            <div className="space-y-3 w-full">
              <div className="flex flex-col lg:flex-row lg:items-end gap-6 relative w-fit">
                <div className="flex flex-col items-start">
                  {isRdr2 && (
                    <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.45 }}>
                      <div style={{ width: '16px', height: '1px', background: 'var(--accent)' }} />
                      <span style={{ fontFamily: seEliteFont, fontSize: '8px', color: 'var(--accent)', letterSpacing: '0.5em', textTransform: 'uppercase' }}>PROFILE</span>
                      <div style={{ width: '16px', height: '1px', background: 'var(--accent)' }} />
                    </div>
                  )}

                  <h2
                    className={`font-medium tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-4xl xl:text-5xl uppercase leading-tight select-none ${!isRdr2 ? 'font-serif' : ''}`}
                    style={{
                      color: fgColor,
                      fontFamily: isRdr2 ? rdr2Font : undefined,
                      letterSpacing: isRdr2 ? '0.06em' : undefined,
                      whiteSpace: 'pre-line',
                      textShadow: isRdr2 ? '0 0 30px rgba(176,28,28,0.35), 2px 2px 0 rgba(0,0,0,0.8)' : undefined,
                    }}
                  >
                    {t.heroTitle}
                  </h2>
                </div>

                <div
                  className="relative lg:absolute lg:left-[calc(100%+24px)] lg:bottom-1.5 z-10 self-start lg:self-auto"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => handleCharHover(true)}
                  onMouseLeave={() => handleCharHover(false)}
                  onClick={isRdr2 ? handleStampClick : handleCatClick}
                >
                  <motion.div
                    className="absolute pointer-events-none rounded-full blur-xl -z-10"
                    animate={{
                      opacity: isCharHovered ? 0.4  : [0.1, 0.22, 0.1],
                      scale:   isCharHovered ? 1.3  : [0.95, 1.15, 0.95],
                    }}
                    transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
                    style={{
                      background: `radial-gradient(circle, ${isRdr2 ? 'rgba(176,28,28,0.55)' : 'rgba(255,255,255,0.7)'} 0%, transparent 70%)`,
                      width: '150px', height: '150px', left: '-10px', top: '-20px',
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                    transition={{ y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }, opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-20"
                  >
                    <motion.div
                      className="px-2.5 py-1 text-[9px] tracking-widest whitespace-nowrap uppercase shadow-lg"
                      style={{ background: cardBg, borderWidth: 1, borderStyle: 'solid', fontFamily: monoFont }}
                      animate={{
                        borderColor: isCharHovered ? accentColor : border2,
                        color:       isCharHovered ? accentColor : mutedDark,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCharHovered && charBubble
                        ? charBubble
                        : isRdr2
                          ? (lang === 'ru' ? 'Разыскивается!' : 'Bounty!')
                          : (lang === 'ru' ? 'Мяу? 🐱' : 'Meow? 🐱')}
                    </motion.div>
                    <motion.div
                      className="w-1.5 h-1.5 border-r border-b rotate-45 -mt-[4px] z-10"
                      style={{ background: cardBg }}
                      animate={{ borderColor: isCharHovered ? accentColor : border2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {!isRdr2 && particles.map(p => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
                      animate={{ opacity: 0, y: -75, scale: 1.2 }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      onAnimationComplete={() => setParticles(prev => prev.filter(item => item.id !== p.id))}
                      style={{ position: 'absolute', top: '5px', right: '45px', fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, color: p.color, pointerEvents: 'none', userSelect: 'none', zIndex: 30 }}
                    >
                      {p.text}
                    </motion.span>
                  ))}

                  {isRdr2 ? (
                    <WantedPoster isHovered={isCharHovered} isStamped={isStamped} stampText={stampText} onStamp={handleStampClick} isShaking={isShaking} />
                  ) : (
                    <motion.pre
                      animate={{
                        scale:      isCharHovered ? 1.05 : [1, 1.02, 1],
                        color:      isCharHovered ? '#ffffff' : ['#a1a1aa', '#ffffff', '#a1a1aa'],
                        textShadow: isCharHovered ? '0 0 16px rgba(255,255,255,0.95)' : '0 0 6px rgba(255,255,255,0.3)',
                      }}
                      transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
                      style={{ fontFamily: '"MS Gothic","Osaka-Mono","Courier New",monospace', fontSize: '11px', lineHeight: '1.05', whiteSpace: 'pre', userSelect: 'none', display: 'block', marginBottom: '-10px' }}
                    >
                      {CAT_ASCII.replace('_x ', catFace)}
                    </motion.pre>
                  )}
                </div>
              </div>

              <p className="text-lg sm:text-xl italic font-normal tracking-wide lowercase" style={{ color: isRdr2 ? 'var(--muted)' : '#a1a1aa', fontFamily: isRdr2 ? seEliteFont : serifFont }}>
                {t.heroSubtitle}
              </p>
            </div>

            <p style={{ fontSize: '14px', color: mutedColor, lineHeight: '1.7', fontWeight: 300, fontFamily: bodyFont }}>
              {t.heroDesc}
              {isExpanded && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {t.heroDescExtra}
                </motion.span>
              )}
              {' '}
              <button onClick={() => setIsExpanded(!isExpanded)} style={{ background: 'none', border: 'none', color: mutedDark, fontFamily: monoFont, fontSize: '10px', marginLeft: '4px', cursor: 'pointer', padding: 0, textTransform: 'lowercase' }} onMouseEnter={e => (e.currentTarget.style.color = accentColor)} onMouseLeave={e => (e.currentTarget.style.color = mutedDark)}>
                {isExpanded ? t.less : t.more}
              </button>
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full pt-2">
              <a
                href="#projects"
                onClick={e => handleNavClick(e, 'projects')}
                style={{
                  fontFamily: monoFont, display: 'inline-block', padding: '10px 24px', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 600, cursor: 'pointer',
                  background: isRdr2 ? 'linear-gradient(180deg, #7a0f0f 0%, #5a0808 100%)' : '#ffffff',
                  color: isRdr2 ? '#d6c9a8' : '#000000',
                  border: isRdr2 ? '1px solid rgba(176,28,28,0.8)' : 'none',
                  boxShadow: isRdr2 ? '0 0 16px rgba(176,28,28,0.3), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
                }}
                onMouseEnter={e => { if (isRdr2) (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(176,28,28,0.55)'; else (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'; }}
                onMouseLeave={e => { if (isRdr2) (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 16px rgba(176,28,28,0.3)'; else (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
              >
                {t.viewProjects}
              </a>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { href: 'https://github.com/Alberithus', label: 'GitHub', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg> },
                  { href: 'https://t.me/playerfake', label: 'Telegram', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg> },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: `1px solid ${border2}`, color: mutedColor, textDecoration: 'none' }} aria-label={label}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = accentColor; (e.currentTarget as HTMLAnchorElement).style.borderColor = accentColor; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = mutedColor; (e.currentTarget as HTMLAnchorElement).style.borderColor = border2; }}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2 w-full space-y-3" style={{ borderTop: `1px solid ${borderColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: monoFont, fontSize: '10px', color: isRdr2 ? 'var(--accent)' : '#52525b', opacity: isRdr2 ? 0.6 : 1, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{splitTitle(t.nowTitle).num} /</span>
                <span style={{ fontFamily: monoFont, fontSize: '10px', color: mutedDark, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{splitTitle(t.nowTitle).text}</span>
              </div>
              <div className="space-y-2">
                {t.nowItems.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ fontFamily: monoFont, fontSize: '9px', color: mutedDark, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.18em', width: '56px', flexShrink: 0 }}>{item.label}</span>
                    <span style={{ fontFamily: monoFont, fontSize: '11px', color: mutedColor, letterSpacing: '0.08em' }}>{item.value}</span>
                    {idx === t.nowItems.length - 1 && <span className="animate-pulse" style={{ fontFamily: monoFont, fontSize: '11px', color: mutedDark, opacity: 0.5 }}>▌</span>}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            id="stack"
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 space-y-6 pt-0 pb-6 scroll-mt-24 ${highlightedSection === 'stack' ? 'highlight-pulse' : ''}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: monoFont, fontSize: '12px', color: isRdr2 ? 'var(--accent)' : '#71717a', opacity: isRdr2 ? 0.65 : 1, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{splitTitle(t.techStackTitle).num} /</span>
                <h3 style={{ fontFamily: serifFont, fontSize: '14px', color: fgColor, letterSpacing: isRdr2 ? '0.1em' : undefined, textTransform: 'uppercase', margin: 0, fontWeight: isRdr2 ? 400 : 500 }}>{splitTitle(t.techStackTitle).text}</h3>
              </div>
              <span style={{ fontFamily: monoFont, fontSize: '10px', color: mutedDark, letterSpacing: isRdr2 ? '0.18em' : undefined, textTransform: 'uppercase' }}>{t.techStackSubtitle}</span>
            </div>

            <OrnamentalDivider isRdr2={isRdr2} />

            <div className="space-y-6">
              {t.techCards.map((card, i) => (
                <div
                  key={i}
                  onMouseEnter={e => { setHoveredCard(`tech-${i}`); const r = e.currentTarget.getBoundingClientRect(); setHoveredRect({ width: Math.round(r.width), height: Math.round(r.height) }); }}
                  onMouseLeave={() => { setHoveredCard(null); setHoveredRect(null); }}
                  style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px', margin: '0 4px', paddingBottom: '24px', cursor: 'pointer', borderBottom: `1px solid ${borderColor}` }}
                >
                  {hoveredCard === `tech-${i}` && <HoverCorners isRdr2={isRdr2} rect={hoveredRect} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {i === 0 && <Layout size={13} style={{ color: mutedDark }} />}
                    {i === 1 && <Smartphone size={13} style={{ color: mutedDark }} />}
                    {i === 2 && <Database size={13} style={{ color: mutedDark }} />}
                    {i === 3 && <Code size={13} style={{ color: mutedDark }} />}
                    <span style={{ fontFamily: monoFont, fontSize: '12px', color: fgColor, letterSpacing: isRdr2 ? '0.14em' : undefined, textTransform: 'uppercase' }}>{card.title}</span>
                  </div>
                  <div>
                    <span style={{ fontFamily: monoFont, fontSize: '9px', color: isRdr2 ? 'var(--accent)' : '#52525b', opacity: isRdr2 ? 0.55 : 1, display: 'block', letterSpacing: '0.14em', marginBottom: '4px' }}>
                      {isRdr2 ? `✦  ${card.tag}  ✦` : `[ ${card.tag} ]`}
                    </span>
                    <p style={{ fontSize: '12px', color: mutedColor, lineHeight: '1.6', fontWeight: 300, fontFamily: bodyFont, margin: 0 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: '16px', borderTop: `1px solid ${borderColor}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontFamily: monoFont, fontSize: '10px', color: isRdr2 ? 'var(--accent)' : '#52525b', opacity: isRdr2 ? 0.6 : 1, letterSpacing: '0.18em', textTransform: 'uppercase' }}>01b /</span>
                <span style={{ fontFamily: monoFont, fontSize: '10px', color: mutedDark, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{lang === 'ru' ? 'РАДАР НАВЫКОВ' : 'SKILL RADAR'}</span>
              </div>
              <div style={{ padding: '0 8px 8px' }}>
                <SkillRadar lang={lang} />
              </div>
            </div>
          </motion.section>

          <motion.section
            id="projects"
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 space-y-6 pt-0 pb-6 scroll-mt-24 ${highlightedSection === 'projects' ? 'highlight-pulse' : ''}`}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: monoFont, fontSize: '12px', color: isRdr2 ? 'var(--accent)' : '#71717a', opacity: isRdr2 ? 0.65 : 1, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>{splitTitle(t.projectsTitle).num} /</span>
                <h3 style={{ fontFamily: serifFont, fontSize: '14px', color: fgColor, letterSpacing: isRdr2 ? '0.1em' : undefined, textTransform: 'uppercase', margin: 0, fontWeight: isRdr2 ? 400 : 500 }}>{splitTitle(t.projectsTitle).text}</h3>
              </div>
              <span style={{ fontFamily: monoFont, fontSize: '10px', color: mutedDark, textTransform: 'uppercase', letterSpacing: isRdr2 ? '0.18em' : undefined }}>{t.projectsSubtitle}</span>
            </div>

            <OrnamentalDivider isRdr2={isRdr2} />

            <div className="space-y-8">
              {t.projects.map((proj, i) => (
                <div
                  key={i}
                  onMouseEnter={e => { setHoveredCard(`proj-${i}`); const r = e.currentTarget.getBoundingClientRect(); setHoveredRect({ width: Math.round(r.width), height: Math.round(r.height) }); }}
                  onMouseLeave={() => { setHoveredCard(null); setHoveredRect(null); }}
                  className={`project-card ${proj.type === 'planned' ? 'opacity-85 hover:opacity-100' : proj.type === 'concept' ? 'opacity-65 hover:opacity-100' : ''}`}
                  style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px', margin: '0 4px', paddingBottom: '32px', cursor: 'pointer', borderBottom: `1px solid ${borderColor}` }}
                >
                  {hoveredCard === `proj-${i}` && <HoverCorners isRdr2={isRdr2} rect={hoveredRect} />}
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                      <h3 style={{ fontFamily: monoFont, fontSize: '13px', color: fgColor, letterSpacing: isRdr2 ? '0.16em' : undefined, textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>{proj.title}</h3>
                      <span style={{
                        fontSize: '9px', fontFamily: monoFont, letterSpacing: isRdr2 ? '0.1em' : '0.15em', textTransform: 'uppercase', padding: '2px 6px', display: 'inline-block',
                        ...(isRdr2
                          ? { transform: 'rotate(-2deg)', border: `1.5px solid rgba(176,28,28,${proj.isConcept ? 0.4 : 0.7})`, color: `rgba(176,28,28,${proj.isConcept ? 0.65 : 0.9})` }
                          : { border: `1px solid ${proj.isConcept ? '#27272a' : '#3f3f46'}`, color: proj.isConcept ? '#52525b' : '#a1a1aa', background: '#09090b' }),
                      }}>
                        {proj.status}
                      </span>
                    </div>
                    <div style={{ fontFamily: isRdr2 ? seEliteFont : 'var(--font-serif), Georgia, serif', fontStyle: 'italic', fontSize: '12px', color: mutedDark, textTransform: 'lowercase' }}>{proj.sub}</div>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: mutedColor, lineHeight: '1.65', fontWeight: 300, fontFamily: bodyFont, margin: '0 0 12px 0' }}>{proj.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                      {proj.tags.map((tag, idx) => (
                        <span key={idx} style={{ fontFamily: monoFont, fontSize: '9px', textTransform: 'uppercase', padding: '2px 7px', letterSpacing: '0.1em', color: isRdr2 ? 'var(--accent)' : '#71717a', border: `1px solid ${isRdr2 ? 'rgba(176,28,28,0.3)' : '#27272a'}`, background: isRdr2 ? 'rgba(176,28,28,0.04)' : 'rgba(9,9,11,0.5)', opacity: isRdr2 ? 0.75 : 1 }}>{tag}</span>
                      ))}
                    </div>
                    {!proj.isConcept ? (
                      <a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: monoFont, fontSize: '12px', color: isRdr2 ? 'var(--muted)' : '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = accentColor}
                        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = isRdr2 ? 'var(--muted)' : '#a1a1aa'}>
                        {proj.action} <ArrowUpRight size={12} />
                      </a>
                    ) : (
                      <span style={{ fontFamily: monoFont, fontSize: '12px', color: mutedDark, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{proj.action}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </motion.div>

        <footer
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider"
          style={{ borderTop: `1px solid ${borderColor}`, color: mutedDark, fontFamily: monoFont }}
        >
          {isRdr2 && (
            <div className="w-full flex justify-center mb-1">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.15 }}>
                <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, var(--accent))` }} />
                <span style={{ color: 'var(--accent)', fontSize: '7px', letterSpacing: '6px' }}>✦ ✦ ✦</span>
                <div style={{ width: '60px', height: '1px', background: `linear-gradient(to left, transparent, var(--accent))` }} />
              </div>
            </div>
          )}
          <div style={{ cursor: 'default', userSelect: 'none' }}>{t.footerCopyright}</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {liveVisitors !== null && (
              <>
                <span style={{ color: mutedDark, opacity: 0.7 }} className="tabular-nums">{isRdr2 ? `RIDERS: ${liveVisitors}` : `VIEWS: ${liveVisitors}`}</span>
                <span style={{ color: borderColor }}>/</span>
              </>
            )}
            {[{ href: 'https://github.com/Alberithus', label: 'GITHUB' }, { href: 'https://t.me/playerfake', label: 'TELEGRAM' }].map(({ href, label }, i, arr) => (
              <React.Fragment key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: mutedDark, textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = accentColor} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = mutedDark}>{label}</a>
                {i < arr.length - 1 && <span style={{ color: borderColor }}>/</span>}
              </React.Fragment>
            ))}
          </div>
        </footer>

      </div>
    </main>
  );
}
