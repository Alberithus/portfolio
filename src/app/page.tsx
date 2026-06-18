'use client';

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowUpRight, Database, Layout, Smartphone, Code, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

type Language = 'ru' | 'en';

const translations = {
  en: {
    heroTitle: "ALBERT AZIZOV",
    heroSubtitle: "web & mobile engineer",
    heroDesc: "Hey! Here is some quick info about me. Basically, I am 18 years old, living in Central Asia, and developing web and mobile apps. I love writing clean code and building interfaces that look great and feel intuitive to use.",
    heroDescExtra: " In parallel, I am studying AI development to make sure that the AI itself doesn't replace me in the future 😁 On a more serious note, my dream is to grow as an engineer and eventually work at tech giants like Google or Amazon. I want to keep it real: the market is changing fast, so I focus on learning every day and building things that are genuinely useful.",
    more: "more",
    less: "less",
    viewProjects: "VIEW PROJECTS",
    contactMe: "CONTACT ME",
    techStackTitle: "01 / CORE TECHNOLOGIES",
    techStackSubtitle: "Current Capabilities",
    techCards: [
      {
        title: "FRONTEND DEVELOPMENT",
        desc: "HTML5, CSS3, JavaScript (ES6+), React.js, and modern UI libraries like shadcn/ui and reactbits. Building responsive, semantic web interfaces with premium animations.",
        tag: "STACK_01"
      },
      {
        title: "MOBILE ENGINEERING",
        desc: "React Native (Cross-platform). Building cross-platform iOS and Android applications with a single codebase.",
        tag: "STACK_02"
      },
      {
        title: "BACKEND & DATABASE",
        desc: "MySQL. Designing efficient relational databases, optimizing queries and table structures.",
        tag: "STACK_03"
      },
      {
        title: "SCRIPTING & SYSTEMS",
        desc: "Lua. Writing lightweight scripts for game engines, embedded systems, and custom automation tools.",
        tag: "STACK_04"
      }
    ],
    projectsTitle: "02 / SELECTED WORKS",
    projectsSubtitle: "Featured Case Studies",
    projects: [
      {
        title: "DEVLINK ANALYTICS",
        status: "Active",
        type: "active",
        sub: "click tracking & analytics platform",
        desc: "An engineering alternative to Linktree with a built-in admin panel. Tracks link clicks in real-time, executing atomic increments in a MySQL database. The interface is built on custom shadcn/ui-inspired tables.",
        action: "VIEW PROJECT",
        isConcept: false,
        tags: ["REACT", "NEXT.JS", "MYSQL", "TAILWIND"]
      },
      {
        title: "ASCII ART GENERATOR",
        status: "Planned",
        type: "planned",
        sub: "image & video to ascii converter",
        desc: "A high-performance system for converting images and video streams into colored or monochrome ASCII art in real-time. Designed to run client-side with canvas integration.",
        action: "UPCOMING PROJECT",
        isConcept: true,
        tags: ["REACT", "CANVAS", "WEB WORKERS", "TAILWIND"]
      },
      {
        title: "SYNTAXVAULT",
        status: "Concept",
        type: "concept",
        sub: "secure code snippet vault",
        desc: "A minimalist service for storing code snippets with syntax highlighting and token-based access protection. Designed for quick saving and retrieval of frequently used templates.",
        action: "CONCEPT STAGE",
        isConcept: true,
        tags: ["REACT", "EXPRESS", "POSTGRESQL", "TAILWIND"]
      },
      {
        title: "DEVPULSE KANBAN",
        status: "Concept",
        type: "concept",
        sub: "high-speed agile board",
        desc: "A task management application featuring a super-fast client-side drag-and-drop interface. Includes local caching and background data synchronization when connection is restored.",
        action: "CONCEPT STAGE",
        isConcept: true,
        tags: ["NEXT.JS", "DND-KIT", "SQLITE", "TAILWIND"]
      }
    ],
    futureTitle: "03 / FUTURE & ASPIRATIONS",
    futureSubtitle: "Career Vision",
    futureDesc: "I aim to collaborate with elite engineering teams at world-class technology companies to build high-scale, impactful products.",
    futureCards: [
      {
        title: "TARGET COMPANIES",
        desc: "Hoping to join leading engineering teams at Amazon, Google, or other industry giants to build high-performance distributed systems.",
        tag: "GOAL_01"
      },
      {
        title: "CREATIVE CODING",
        desc: "Exploring generative media, ASCII rendering pipelines, canvas optimization, and low-latency client-side utilities.",
        tag: "GOAL_02"
      },
      {
        title: "DEVELOPER TOOLS",
        desc: "Contributing to open source and designing minimalist, developer-first environments with advanced command-line features.",
        tag: "GOAL_03"
      }
    ],
    footerCopyright: "© 2026 ALBERT A."
  },
  ru: {
    heroTitle: "ALBERT AZIZOV",
    heroSubtitle: "web & mobile engineer",
    heroDesc: "Привет! Это краткая информация обо мне. Вкратце: мне 18 лет, живу в Центральной Азии и создаю веб- и мобильные приложения. Мне очень нравится писать аккуратный код и делать интерфейсы, которые выглядят приятно и которыми удобно пользоваться.",
    heroDescExtra: " Параллельно я изучаю разработку искусственного интеллекта и нейросетей, чтобы в будущем этот самый ИИ меня не заменил 😁 Ну а если серьезно, моя мечта — вырасти как специалист и работать в крупных технологических компаниях вроде Google или Amazon. Я реально смотрю на вещи и понимаю, что рынок меняется, поэтому стараюсь развиваться каждый день, чтобы создавать по-настоящему полезные штуки.",
    more: "more",
    less: "less",
    viewProjects: "ПОСМОТРЕТЬ ПРОЕКТЫ",
    contactMe: "СВЯЗАТЬСЯ СО МНОЙ",
    techStackTitle: "01 / ОСНОВНЫЕ ТЕХНОЛОГИИ",
    techStackSubtitle: "Текущие навыки",
    techCards: [
      {
        title: "ФРОНТЕНД-РАЗРАБОТКА",
        desc: "HTML5, CSS3, JavaScript (ES6+), React.js и современные библиотеки UI (shadcn/ui, reactbits и др.). Создание адаптивных интерфейсов с высокой производительностью и отзывчивостью.",
        tag: "STACK_01"
      },
      {
        title: "МОБИЛЬНАЯ РАЗРАБОТКА",
        desc: "React Native (Cross-platform). Разработка кроссплатформенных приложений для iOS и Android с единой кодовой базой.",
        tag: "STACK_02"
      },
      {
        title: "БЭКЕНД И БАЗЫ ДАННЫХ",
        desc: "MySQL. Проектирование эффективных реляционных баз данных, оптимизация поисковых запросов и структуры таблиц.",
        tag: "STACK_03"
      },
      {
        title: "СКРИПТИНГ И СИСТЕМЫ",
        desc: "Lua. Разработка легковесных скриптов для игровых движков, встраиваемых систем и автоматизации процессов с высокой скоростью выполнения.",
        tag: "STACK_04"
      }
    ],
    projectsTitle: "02 / ИЗБРАННЫЕ РАБОТЫ",
    projectsSubtitle: "Ключевые проекты",
    projects: [
      {
        title: "DEVLINK ANALYTICS",
        status: "Активен",
        type: "active",
        sub: "платформа аналитики и отслеживания кликов",
        desc: "Инженерный аналог Linktree со встроенной админ-панелью. Отслеживает клики по ссылкам в реальном времени, выполняя атомарные инкременты в базе данных MySQL. Интерфейс построен на кастомных таблицах shadcn/ui.",
        action: "ПОСМОТРЕТЬ ПРОЕКТ",
        isConcept: false,
        tags: ["REACT", "NEXT.JS", "MYSQL", "TAILWIND"]
      },
      {
        title: "ASCII ART GENERATOR",
        status: "В планах",
        type: "planned",
        sub: "конвертер изображений и видео в ascii",
        desc: "Высокопроизводительный конвертер изображений и видеопотоков в ASCII-графику в реальном времени. Работает на стороне клиента с использованием Canvas.",
        action: "ПЛАНИРУЕМЫЙ ПРОЕКТ",
        isConcept: true,
        tags: ["REACT", "CANVAS", "WEB WORKERS", "TAILWIND"]
      },
      {
        title: "SYNTAXVAULT",
        status: "Концепт",
        type: "concept",
        sub: "защищенное хранилище сниппетов кода",
        desc: "Минималистичный сервис для хранения сниппетов кода с подсветкой синтаксиса и защитой по токенам доступа. Разработан для быстрого сохранения и вызова часто используемых шаблонов.",
        action: "СТАДИЯ КОНЦЕПТА",
        isConcept: true,
        tags: ["REACT", "EXPRESS", "POSTGRESQL", "TAILWIND"]
      },
      {
        title: "DEVPULSE KANBAN",
        status: "Концепт",
        type: "concept",
        sub: "высокоскоростная agile-панель",
        desc: "Приложение для управления задачами со сверхбыстрым drag-and-drop interface на клиенте. Включает локальное кэширование и фоновую синхронизацию данных при восстановлении сети.",
        action: "СТАДИЯ КОНЦЕПТА",
        isConcept: true,
        tags: ["NEXT.JS", "DND-KIT", "SQLITE", "TAILWIND"]
      }
    ],
    futureTitle: "03 / FUTURE & ASPIRATIONS",
    futureSubtitle: "Взгляд в будущее",
    futureDesc: "Стремлюсь работать в командах лучших мировых технологических компаний, создавая масштабируемые и значимые продукты.",
    futureCards: [
      {
        title: "ЦЕЛЕВЫЕ КОМПАНИИ",
        desc: "Надеюсь присоединиться к передовым командам в Amazon, Google или аналогичных технологических гигантах.",
        tag: "GOAL_01"
      },
      {
        title: "ТВОРЧЕСКИЙ КОД",
        desc: "Исследование генеративного искусства, ASCII рендеринга, оптимизации Canvas и легковесных утилит на клиенте.",
        tag: "GOAL_02"
      },
      {
        title: "ИНСТРУМЕНТЫ РАЗРАБОТКИ",
        desc: "Участие в open source и создание минималистичных, ориентированных на разработчиков систем с мощным CLI.",
        tag: "GOAL_03"
      }
    ],
    footerCopyright: "© 2026 АЛЬБЕРТ АЗИЗОВ. ВСЕ ПРАВА ЗАЩИЩЕНЫ."
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
} as const;

const columnVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
} as const;

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [catBubbleText, setCatBubbleText] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [introFade, setIntroFade] = useState(false);
  const [audioProgress, setAudioProgress] = useState({ currentTime: 0, duration: 0 });
  const [hoveredCardType, setHoveredCardType] = useState<string | null>(null);
  const [hoveredRect, setHoveredRect] = useState<{ width: number; height: number } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMusic, setShowMusic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [catClicks, setCatClicks] = useState(0);
  const [catFace, setCatFace] = useState('_x ');
  const [audioSrc, setAudioSrc] = useState("/deep-in-it.mp3");
  const [trackName, setTrackName] = useState("Jazz");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; text: string; color: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = translations[lang];

  const splitTitle = (title: string) => {
    const parts = title.split(" / ");
    if (parts.length > 1) {
      return { num: parts[0], text: parts[1] };
    }
    return { num: "", text: title };
  };

  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
      
      setHighlightedSection(null);
      
      setTimeout(() => {
        setHighlightedSection(id);
        highlightTimeoutRef.current = setTimeout(() => {
          setHighlightedSection(null);
        }, 2500);
      }, 10);
    }
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(e, 'projects');
  };

  const catPhrases = {
    en: ["purr...", "print('hello world')", "npm run dev", "hello!", "jazz time", "meow~", "i want to eat!", "code clean"],
    ru: ["мурр...", "print('привет, мир')", "npm run dev", "привет!", "время джаза", "мяу~", "хочу есть!", "чистый код"]
  };

  const handleCatHover = (hovering: boolean) => {
    setIsCatHovered(hovering);
    if (hovering) {
      const phrases = catPhrases[lang];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setCatBubbleText(randomPhrase);
      setCatFace('^.^');
    } else {
      setCatFace('_x ');
    }
  };

  const handleCatClick = () => {
    setCatClicks(prev => {
      const next = prev + 1;
      if (next === 5) {
        setAudioSrc("/playground-love.mp3");
        setTrackName("Air - Playground Love");
        setCatBubbleText(lang === 'ru' ? "СЕКРЕТНЫЙ ТРЕК РАЗБЛОКИРОВАН! 🎵" : "SECRET TRACK UNLOCKED! 🎵");
        setIsCatHovered(true);
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
              audioRef.current.play().catch(err => console.log(err));
            }
          }
        }, 100);
      } else if (next > 5) {
        const secretPhrases = lang === 'ru' 
          ? ["Обожаю эту песню!", "Мурр... Приятного прослушивания!", "Это классика!", "ИИ так не споет!"] 
          : ["I love this song!", "Purr... enjoy the music!", "This is a classic!", "AI can't sing like this!"];
        setCatBubbleText(secretPhrases[Math.floor(Math.random() * secretPhrases.length)]);
      } else {
        const funPhrases = lang === 'ru'
          ? ["Эй, не щекотно!", "Ещё клик!", "Компилирую кошачью мяту...", "ИИ меня не заменит!"]
          : ["Hey, that tickles!", "One more click!", "Compiling catnip...", "AI won't replace me!"];
        setCatBubbleText(funPhrases[Math.floor(Math.random() * funPhrases.length)]);
      }
      return next;
    });

    const heartStyles = ['♡', '[♡]', '<3', '[<3]', '/*<3*/', 'ptr->♡', 'func(♡)'];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#c9954f', '#a855f7', '#06b6d4', '#ec4899'];
    const newParticle = {
      id: Date.now() + Math.random(),
      x: Math.random() * 60 - 30,
      y: 0,
      text: heartStyles[Math.floor(Math.random() * heartStyles.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setParticles(prev => [...prev, newParticle]);

    const faces = ['^.^', '♥.♥', 'o.o', 'z.z', '🕶 '];
    const randomFace = faces[Math.floor(Math.random() * faces.length)];
    setCatFace(randomFace);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(window.scrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIntroFade(true);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseEnterCard = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCardType(id);
    setHoveredRect({
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    });
  };

  const handleMouseLeaveCard = () => {
    setHoveredCardType(null);
    setHoveredRect(null);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error(err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <main className="min-h-screen text-white flex flex-col justify-between selection:bg-white selection:text-black relative overflow-x-hidden">

      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {showIntro && (
        <div 
          className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
            introFade ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="text-center select-none">
            <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white tracking-widest animate-intro-text font-normal">
              hi
            </h1>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onTimeUpdate={(e) => {
          const target = e.currentTarget;
          setAudioProgress({
            currentTime: target.currentTime,
            duration: target.duration || 0
          });
        }}
        onLoadedMetadata={(e) => {
          const target = e.currentTarget;
          setAudioProgress(prev => ({
            ...prev,
            duration: target.duration || 0
          }));
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col flex-1 py-12 md:py-20 space-y-12">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-4 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8">
            
            <nav className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-[10px] sm:text-xs text-zinc-550">
              <a 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="hover:text-white uppercase tracking-wider transition-colors duration-150 select-none"
              >
                {lang === 'ru' ? 'ОБО МНЕ' : 'ABOUT'}
              </a>
              <span className="text-zinc-800">/</span>
              <a 
                href="#stack"
                onClick={(e) => handleNavClick(e, 'stack')}
                className="hover:text-white uppercase tracking-wider transition-colors duration-150 select-none"
              >
                {lang === 'ru' ? 'СТЕК' : 'STACK'}
              </a>
              <span className="text-zinc-800">/</span>
              <a 
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
                className="hover:text-white uppercase tracking-wider transition-colors duration-150 select-none"
              >
                {lang === 'ru' ? 'ПРОЕКТЫ' : 'PROJECTS'}
              </a>

            </nav>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center font-mono text-[10px] sm:text-xs h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                {!showMusic ? (
                  <motion.button
                    key="music-btn"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => setShowMusic(true)}
                    className={`hover:text-white uppercase tracking-wider transition-colors duration-150 cursor-pointer select-none flex items-center gap-1.5 ${
                      isPlaying ? 'text-white' : 'text-zinc-550'
                    }`}
                  >
                    <Music size={12} className={isPlaying ? "animate-pulse" : ""} />
                    <span>{isPlaying ? (lang === 'ru' ? 'ДЖАЗ: ВКЛ' : 'JAZZ: ON') : (lang === 'ru' ? 'МУЗЫКА' : 'MUSIC')}</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="music-controls"
                    initial={{ opacity: 0, width: 0, borderWidth: 0 }}
                    animate={{ opacity: 1, width: "auto", borderWidth: 1 }}
                    exit={{ opacity: 0, width: 0, borderWidth: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex items-center gap-2 sm:gap-3 bg-zinc-950 border border-zinc-900 px-2 sm:px-3 py-1 rounded-none select-none text-zinc-400 overflow-hidden whitespace-nowrap"
                  >
                    <button 
                      onClick={togglePlay}
                      className="hover:text-white cursor-pointer uppercase transition-colors"
                    >
                      {isPlaying ? (lang === 'ru' ? '■ СТОП' : '■ STOP') : (lang === 'ru' ? '▶ СТАРТ' : '▶ PLAY')}
                    </button>
                    <span className="text-zinc-800">|</span>
                    <div className="flex items-center space-x-1 sm:space-x-1.5">
                      <span className="text-zinc-555 text-[9px]">VOL</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-12 sm:w-16 h-1.5 bg-zinc-900 border border-zinc-850 rounded-none cursor-pointer appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-1.5 [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:h-1.5 [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none"
                        style={{
                          background: `linear-gradient(to right, #ffffff ${volume * 100}%, #09090b ${volume * 100}%)`,
                        }}
                      />
                      <span className="text-[9px] text-zinc-500 min-w-[20px] text-right">{Math.round(volume * 100)}%</span>
                    </div>
                    <span className="text-zinc-800">|</span>
                    <button 
                      onClick={() => setShowMusic(false)}
                      className="text-zinc-555 hover:text-white cursor-pointer font-bold px-0.5 text-xs sm:text-sm leading-none"
                    >
                      ×
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <span className="text-zinc-800">/</span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLang('ru')}
                className={`font-mono text-[10px] sm:text-xs tracking-wider transition-colors duration-150 cursor-pointer select-none ${
                  lang === 'ru' ? 'text-white font-bold' : 'text-zinc-550 hover:text-zinc-300'
                }`}
              >
                RU
              </button>
              <span className="text-zinc-800 text-[10px] sm:text-xs">|</span>
              <button
                onClick={() => setLang('en')}
                className={`font-mono text-[10px] sm:text-xs tracking-wider transition-colors duration-150 cursor-pointer select-none ${
                  lang === 'en' ? 'text-white font-bold' : 'text-zinc-550 hover:text-zinc-300'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={!showIntro ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 sm:mt-10 lg:mt-12"
        >
          
          <motion.section 
            id="about"
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 flex flex-col items-start text-left space-y-6 lg:space-y-8 lg:sticky lg:top-20 pt-0 pb-6 scroll-mt-24 ${
              highlightedSection === 'about' ? 'highlight-pulse' : ''
            }`}
          >

            <div className="space-y-3">
              <div className="flex flex-col items-start w-fit relative">
                <h2 className="font-serif font-medium tracking-wide text-5xl sm:text-6xl md:text-7xl lg:text-4xl xl:text-5xl text-white uppercase leading-none select-none mt-0 pt-0">
                  {t.heroTitle}
                </h2>
                
                <div 
                  className="absolute left-[calc(100%-140px)] bottom-1.5 cursor-pointer z-10 hidden lg:block"
                  onMouseEnter={() => handleCatHover(true)}
                  onMouseLeave={() => handleCatHover(false)}
                  onClick={handleCatClick}
                >
                  <motion.div
                    className="absolute pointer-events-none rounded-full blur-xl -z-10"
                    animate={{
                      opacity: isCatHovered ? 0.35 : [0.1, 0.22, 0.1],
                      scale: isCatHovered ? 1.25 : [0.95, 1.15, 0.95]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.0,
                      ease: "easeInOut"
                    }}
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
                      width: '130px',
                      height: '130px',
                      left: '5px',
                      top: '-15px',
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      y: [0, -4, 0],
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-20"
                  >
                    <motion.div 
                      className="bg-zinc-950 border px-2.5 py-1 rounded-none font-mono text-[9px] tracking-widest whitespace-nowrap uppercase shadow-lg"
                      animate={{
                        borderColor: isCatHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                        color: isCatHovered ? "#ffffff" : "#a1a1aa",
                        boxShadow: isCatHovered 
                          ? "0 0 10px rgba(255, 255, 255, 0.3)" 
                          : "0 0 5px rgba(255, 255, 255, 0.05)"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {isCatHovered 
                        ? (lang === 'ru' ? 'ПОГЛАДЬ МЕНЯ! 🐾' : 'PET ME! 🐾') 
                        : (lang === 'ru' ? 'Мяу? 🐱' : 'Meow? 🐱')
                      }
                    </motion.div>
                    <motion.div 
                      className="w-1.5 h-1.5 bg-zinc-950 border-r border-b rotate-45 -mt-[4px] z-10" 
                      animate={{
                        borderColor: isCatHovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>

                  {particles.map(p => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 1, y: 0, x: p.x, scale: 0.8 }}
                      animate={{ opacity: 0, y: -75, scale: 1.2 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      onAnimationComplete={() => {
                        setParticles(prev => prev.filter(item => item.id !== p.id));
                      }}
                      className="absolute text-[9px] font-mono font-bold tracking-wider pointer-events-none select-none z-30"
                      style={{ top: '5px', right: '45px', color: p.color }}
                    >
                      {p.text}
                    </motion.span>
                  ))}

                  <motion.pre 
                    animate={{
                      scale: isCatHovered ? 1.05 : [1, 1.02, 1],
                      color: isCatHovered ? "#ffffff" : ["#a1a1aa", "#ffffff", "#a1a1aa"],
                      textShadow: isCatHovered 
                        ? "0 0 16px rgba(255, 255, 255, 0.95), 0 0 6px rgba(255, 255, 255, 0.6)" 
                        : ["0 0 3px rgba(255, 255, 255, 0.15)", "0 0 12px rgba(255, 255, 255, 0.55)", "0 0 3px rgba(255, 255, 255, 0.15)"]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.0,
                      ease: "easeInOut"
                    }}
                    className="whitespace-pre select-none block transition-colors"
                    style={{
                      fontFamily: '"MS Gothic", "Osaka-Mono", "Courier New", Courier, monospace',
                      fontSize: '11px',
                      lineHeight: '1.05',
                      marginBottom: '-10px',
                    }}
                  >
{`　　　　／＞　 フ
　　　　| 　_　 _|
 　　　／\`ミ ${catFace} 彡 
　 　 /　　　 　 |
　　 /　  ヽ　　 ﾉ
／￣|　　 |　|　|
| (￣ヽ＿_ヽ_)_)
＼二つ`}
                  </motion.pre>
                </div>
              </div>
              <p className="text-lg sm:text-xl text-zinc-400 font-serif italic font-normal tracking-wide lowercase">
                {t.heroSubtitle}
              </p>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed tracking-wide font-light">
              {t.heroDesc}
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {t.heroDescExtra}
                </motion.span>
              )}
              {" "}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-zinc-500 hover:text-white font-mono text-[10px] ml-1.5 inline-block cursor-pointer focus:outline-none transition-colors duration-150 lowercase font-normal"
              >
                {isExpanded ? t.less : t.more}
              </button>
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full pt-2">
              <a 
                href="#projects"
                onClick={handleScrollToProjects}
                className="px-6 py-2.5 bg-white text-black hover:opacity-90 font-mono text-xs tracking-wider uppercase font-semibold transition-opacity text-center cursor-pointer"
              >
                {t.viewProjects}
              </a>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/Alberithus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-zinc-800 text-zinc-450 hover:text-white hover:border-white transition-all bg-transparent hover:bg-zinc-950/50 cursor-pointer flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a 
                  href="https://t.me/playerfake"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-zinc-800 text-zinc-450 hover:text-white hover:border-white transition-all bg-transparent hover:bg-zinc-950/50 cursor-pointer flex items-center justify-center"
                  aria-label="Telegram"
                >
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </a>
              </div>
            </div>
          </motion.section>

          <motion.section 
            id="stack"
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 space-y-6 pt-0 pb-6 scroll-mt-24 ${
              highlightedSection === 'stack' ? 'highlight-pulse' : ''
            }`}
          >
            <div className="flex flex-col justify-between items-start gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-wider uppercase text-zinc-500 font-bold">
                  {splitTitle(t.techStackTitle).num} /
                </span>
                <h3 className="font-serif text-sm tracking-wider uppercase text-white font-medium">
                  {splitTitle(t.techStackTitle).text}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-zinc-600 uppercase">
                {t.techStackSubtitle}
              </span>
            </div>
            
            <hr className="h-[1px] bg-zinc-900 border-none" />

            <div className="space-y-6">
              {t.techCards.map((card, i) => (
                <div 
                  key={i} 
                  onMouseEnter={(e) => handleMouseEnterCard(e, `tech-${i}`)}
                  onMouseLeave={handleMouseLeaveCard}
                  className="relative flex flex-col justify-between items-start border-b border-zinc-900 pb-6 last:border-b-0 gap-4 p-2 mx-1 transition-all duration-150 cursor-pointer"
                >
                  {hoveredCardType === `tech-${i}` && (
                    <>
                      <div className="absolute inset-0 border border-white/60 pointer-events-none z-10" />
                      <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      {hoveredRect && (
                        <div className="absolute -bottom-5 right-2 font-mono text-[8px] font-bold text-black bg-white border border-white px-1 py-0.5 z-10 leading-none select-none">
                          w: {hoveredRect.width}px / h: {hoveredRect.height}px
                        </div>
                      )}
                    </>
                  )}
                  <div className="w-full flex items-center space-x-2">
                    {i === 0 && <Layout size={14} className="text-zinc-500" />}
                    {i === 1 && <Smartphone size={14} className="text-zinc-500" />}
                    {i === 2 && <Database size={14} className="text-zinc-500" />}
                    {i === 3 && <Code size={14} className="text-zinc-500" />}
                    
                    <span className="font-mono text-xs text-white uppercase tracking-wider">
                      {card.title}
                    </span>
                  </div>
                  
                  <div className="w-full space-y-1">
                    <span className="font-mono text-[9px] text-zinc-600 block">
                      [ {card.tag} ]
                    </span>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="projects" 
            variants={columnVariants}
            className={`col-span-1 md:col-span-4 space-y-6 pt-0 pb-6 scroll-mt-24 ${
              highlightedSection === 'projects' ? 'highlight-pulse' : ''
            }`}
          >
            <div className="flex flex-col justify-between items-start gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-wider uppercase text-zinc-550 font-bold">
                  {splitTitle(t.projectsTitle).num} /
                </span>
                <h3 className="font-serif text-sm tracking-wider uppercase text-white font-medium">
                  {splitTitle(t.projectsTitle).text}
                </h3>
              </div>
              <span className="font-mono text-[10px] text-zinc-600 uppercase">
                {t.projectsSubtitle}
              </span>
            </div>

            <hr className="h-[1px] bg-zinc-900 border-none" />

            <div className="space-y-8">
              {t.projects.map((proj, i) => (
                <div 
                  key={i}
                  onMouseEnter={(e) => handleMouseEnterCard(e, `project-${i}`)}
                  onMouseLeave={handleMouseLeaveCard}
                  className={`project-card relative flex flex-col justify-between items-start border-b border-zinc-900 pb-8 last:border-b-0 gap-4 transition-all duration-200 p-2 mx-1 cursor-pointer ${
                    proj.type === 'planned' ? 'opacity-85 hover:opacity-100' : proj.type === 'concept' ? 'opacity-65 hover:opacity-100' : ''
                  }`}
                >
                  {hoveredCardType === `project-${i}` && (
                    <>
                      <div className="absolute inset-0 border border-white/60 pointer-events-none z-10" />
                      <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border border-white bg-black pointer-events-none z-20" />
                      {hoveredRect && (
                        <div className="absolute -bottom-5 right-2 font-mono text-[8px] font-bold text-black bg-white border border-white px-1 py-0.5 z-10 leading-none select-none">
                          w: {hoveredRect.width}px / h: {hoveredRect.height}px
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="space-y-1.5 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold tracking-wider text-sm uppercase text-white font-mono">
                        {proj.title}
                      </h3>
                      <span className={`inline-block font-mono text-[9px] border px-2 py-0.5 rounded-sm uppercase tracking-widest bg-zinc-950 ${
                        !proj.isConcept ? 'text-zinc-400 border-zinc-800' : 'text-zinc-650 border-zinc-900'
                      }`}>
                        {proj.status}
                      </span>
                    </div>
                    
                    <div className="font-serif italic text-xs text-zinc-550 lowercase">
                      {proj.sub}
                    </div>
                  </div>

                  <div className="space-y-3 w-full">
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light">
                      {proj.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag, idx) => (
                        <span key={idx} className="font-mono text-[9px] uppercase text-zinc-500 border border-zinc-900 px-2 py-0.5 bg-zinc-950/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-1">
                      {!proj.isConcept ? (
                        <a 
                          href="http://localhost:3001/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-zinc-450 hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {proj.action} <ArrowUpRight size={12} />
                        </a>
                      ) : (
                        <span className="font-mono text-xs text-zinc-600 uppercase tracking-wider select-none">
                          {proj.action}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
          
        </motion.div>

        <footer className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider">
          <div>
            {t.footerCopyright}
          </div>
          <div className="flex gap-2 items-center">
            <a 
              href="https://github.com/Alberithus" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-150 cursor-pointer"
            >
              GITHUB
            </a>
            <span className="text-zinc-800">/</span>
            <a 
              href="https://t.me/playerfake" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-150 cursor-pointer"
            >
              TELEGRAM
            </a>
            <span className="text-zinc-800">/</span>
          </div>
        </footer>

      </div>

    </main>
  );
}
