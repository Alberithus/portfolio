'use client';

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Upload, Camera, Copy, Download, 
  RotateCcw, Check, Image as ImageIcon, Square
} from "lucide-react";
import { useTheme } from "../components/ThemeContext";

type Language = 'ru' | 'en';

const translations = {
  en: {
    back: "← BACK TO PORTFOLIO",
    title: "ASCII ART GENERATOR",
    subtitle: "High-performance client-side photo & video converter",
    uploadArea: "Drag & drop image, or click",
    webcamStart: "Use Webcam",
    webcamStop: "Stop Webcam",
    presetsTitle: "Presets",
    width: "Width (columns)",
    aspectRatio: "Aspect Ratio Correction",
    brightness: "Brightness",
    contrast: "Contrast",
    invert: "Invert Colors",
    charSet: "Character Set",
    customChar: "Custom Characters",
    colorMode: "Color Mode",
    fontSize: "Display Font Size",
    copy: "Copy Text",
    copied: "Copied!",
    downloadTxt: "Download TXT",
    exportPng: "Export PNG",
    viewCanvas: "Canvas Render (Pan & Zoom)",
    viewText: "Plain Text View",
    canvasZoom: "Scroll to zoom, drag to pan the canvas",
    errorLoading: "Failed to load image",
    presets: {
      portrait: "Test",
      animal: "Cybercat",
      shapes: "Geometric",
    },
    charSets: {
      standard: "Detailed / Standard",
      blocks: "Solid Blocks (█▓▒░)",
      terminal: "Terminal Classic (@#*+:.-)",
      binary: "Binary (01)",
      matrix: "Matrix Glow",
      custom: "Custom...",
    },
    colorModes: {
      mono: "Monochrome",
      grayscale: "Grayscale",
      color: "Full Color",
      block: "Color Blocks",
    },
    performance: "Processing Time",
    dimensions: "Dimensions",
  },
  ru: {
    back: "← НАЗАД В ПОРТФОЛИО",
    title: "ASCII ГЕНЕРАТОР",
    subtitle: "Высокопроизводительный конвертер фото и видео в реальном времени",
    uploadArea: "Перетащите фото или кликните",
    webcamStart: "Включить веб-камеру",
    webcamStop: "Выключить камеру",
    presetsTitle: "Готовые шаблоны",
    width: "Ширина (в символах)",
    aspectRatio: "Коррекция пропорций",
    brightness: "Яркость",
    contrast: "Контраст",
    invert: "Инверсия цвета",
    charSet: "Набор символов",
    customChar: "Свой набор символов",
    colorMode: "Цветовой режим",
    fontSize: "Размер шрифта отображения",
    copy: "Копировать текст",
    copied: "Скопировано!",
    downloadTxt: "Скачать TXT",
    exportPng: "Экспорт PNG",
    viewCanvas: "Рендер на Canvas (Зум и Пан)",
    viewText: "Просмотр текста",
    canvasZoom: "Колесико — зум, зажмите и тащите для перемещения",
    errorLoading: "Не удалось загрузить изображение",
    presets: {
      portrait: "Тест",
      animal: "Киберкот",
      shapes: "Геометрия",
    },
    charSets: {
      standard: "Стандартный детальный",
      blocks: "Сплошные блоки (█▓▒░)",
      terminal: "Классический терминал (@#*+:.-)",
      binary: "Бинарный (01)",
      matrix: "Свечение Матрицы",
      custom: "Свой набор...",
    },
    colorModes: {
      mono: "Одноцветный",
      grayscale: "Оттенки серого",
      color: "Полноцветный",
      block: "Цветные блоки",
    },
    performance: "Время обработки",
    dimensions: "Размер",
  }
};

const CHAR_SETS = {
  standard: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  blocks: "█▓▒░ ",
  terminal: "@#*+=:-. ",
  binary: "01 ",
  matrix: "01+-*=%$#@ ",
  custom: "",
};

function CyberBackground({ isRdr2 }: { isRdr2: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const particleCount = isRdr2 ? 15 : 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (isRdr2 ? 2.5 : 1.5) + 0.5,
        speedX: (Math.random() - 0.5) * (isRdr2 ? 0.15 : 0.4),
        speedY: (Math.random() - 0.5) * (isRdr2 ? -0.25 : -0.5),
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      if (!isRdr2) {
        ctx.strokeStyle = "rgba(34, 197, 94, 0.02)";
        ctx.lineWidth = 1;
        const step = 80;
        for (let x = 0; x < w; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > w) p.speedX *= -1;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        } else if (p.y > h) {
          p.y = 0;
          p.x = Math.random() * w;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (isRdr2) {
          ctx.fillStyle = `rgba(176, 28, 28, ${p.opacity * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity * 0.8})`;
        }
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRdr2]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
}

export default function AsciiPage() {
  const { theme, toggleTheme } = useTheme();
  const isRdr2 = theme === 'rdr2';

  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [widthSetting, setWidthSetting] = useState<number>(100);
  const [aspectCorrection, setAspectCorrection] = useState<number>(0.55);
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [invert, setInvert] = useState<boolean>(false);
  const [selectedCharSet, setSelectedCharSet] = useState<keyof typeof CHAR_SETS>("standard");
  const [customChars, setCustomChars] = useState<string>("@#+:. ");
  const [colorMode, setColorMode] = useState<string>("color");
  const [fontSize, setFontSize] = useState<number>(8);
  const [activeTab, setActiveTab] = useState<"canvas" | "text">("canvas");

  const [stegMode, setStegMode] = useState<boolean>(false);
  const [stegText, setStegText] = useState<string>("ALBERT AZIZOV");

  const [renderTime, setRenderTime] = useState<number>(0);
  const [outWidth, setOutWidth] = useState<number>(0);
  const [outHeight, setOutHeight] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);

  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const zoomRef = useRef(1);
  const panOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    panOffsetRef.current = panOffset;
  }, [panOffset]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  const pendingUpdateRef = useRef<boolean>(false);
  const lastProcessedDataRef = useRef<{ chars: string[]; colors: Uint8Array; w: number; h: number } | null>(null);
  
  const bufferCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const paintCanvasRef = useRef<() => void>(() => {});
  const drawToBufferRef = useRef<(chars: string[], colors: Uint8Array, w: number, h: number) => void>((c, col, w, h) => {});
  const triggerConversionRef = useRef<() => void>(() => {});

  const lastDrawnSettingsRef = useRef({
    colorMode: "",
    fontSize: 0,
    theme: "",
    stegMode: false,
    stegText: "",
    data: null as any
  });

  useEffect(() => {
    paintCanvasRef.current = paintCanvas;
    drawToBufferRef.current = drawToBuffer;
    triggerConversionRef.current = triggerConversion;
  });

  const loadPreset = (type: 'portrait' | 'animal' | 'shapes') => {
    stopCamera();
    
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 400, 400);
    if (type === "portrait") {
      grad.addColorStop(0, "#120d08");
      grad.addColorStop(1, "#2b1c11");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 400);

      ctx.fillStyle = "#8a1b1b";
      ctx.beginPath();
      ctx.moveTo(100, 160);
      ctx.lineTo(300, 160);
      ctx.lineTo(260, 110);
      ctx.lineTo(140, 110);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(70, 150, 260, 15);

      ctx.fillStyle = "#d8c7a3";
      ctx.beginPath();
      ctx.arc(200, 205, 60, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#110b06";
      ctx.fillRect(155, 195, 35, 18);
      ctx.fillRect(210, 195, 35, 18);
      ctx.fillRect(190, 200, 20, 6);

      ctx.fillStyle = "#3a2b1f";
      ctx.beginPath();
      ctx.ellipse(200, 235, 35, 18, 0, 0, Math.PI * 2);
      ctx.fill();

    } else if (type === "animal") {
      grad.addColorStop(0, "#050505");
      grad.addColorStop(1, "#180f24");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 400);

      ctx.strokeStyle = "rgba(186, 104, 200, 0.2)";
      ctx.lineWidth = 1;
      for (let r = 40; r <= 320; r += 40) {
        ctx.beginPath();
        ctx.arc(200, 200, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = "#ba68c8";
      ctx.beginPath();
      ctx.moveTo(120, 150);
      ctx.lineTo(160, 200);
      ctx.lineTo(240, 200);
      ctx.lineTo(280, 150);
      ctx.lineTo(235, 190);
      ctx.lineTo(165, 190);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(200, 230, 75, 55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#00e676";
      ctx.beginPath();
      ctx.ellipse(170, 220, 15, 6, Math.PI / 6, 0, Math.PI * 2);
      ctx.ellipse(230, 220, 15, 6, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(200, 240);
      ctx.lineTo(196, 235);
      ctx.lineTo(204, 235);
      ctx.closePath();
      ctx.fill();

    } else {
      grad.addColorStop(0, "#000a12");
      grad.addColorStop(1, "#002984");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 400);

      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 2;
      for (let i = 1; i <= 10; i++) {
        ctx.beginPath();
        ctx.arc(200, 200, i * 22, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(0, 229, 255, 0.4)";
      ctx.lineWidth = 1;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(200 + Math.cos(a) * 200, 200 + Math.sin(a) * 200);
        ctx.stroke();
      }
    }

    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc(dataUrl);
    zoomRef.current = 1;
    panOffsetRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    workerRef.current = new Worker("/ascii_worker.js");
    workerRef.current.onmessage = (e) => {
      isProcessingRef.current = false;
      const { chars, colors, error } = e.data;
      if (error) {
        return;
      }

      if (chars && colors) {
        lastProcessedDataRef.current = {
          chars,
          colors,
          w: e.data.width,
          h: e.data.height,
        };
        drawToBufferRef.current(chars, colors, e.data.width, e.data.height);
        paintCanvasRef.current();
      }

      if (pendingUpdateRef.current) {
        pendingUpdateRef.current = false;
        triggerConversionRef.current();
      }
    };

    loadPreset("portrait");

    return () => {
      if (workerRef.current) workerRef.current.terminate();
      stopCamera();
    };
  }, []);

  const handleWheelNative = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 1.15;
    const currentZoom = zoomRef.current;
    let nextZoom = currentZoom;
    
    if (e.deltaY < 0) {
      nextZoom = Math.min(10, currentZoom * zoomFactor);
    } else {
      nextZoom = Math.max(0.15, currentZoom / zoomFactor);
    }

    if (nextZoom !== currentZoom) {
      const w = canvasRef.current?.width || 800;
      const h = canvasRef.current?.height || 500;
      const rect = canvasRef.current?.getBoundingClientRect();
      const px = rect ? e.clientX - rect.left : w / 2;
      const py = rect ? e.clientY - rect.top : h / 2;

      const currentPan = panOffsetRef.current;
      const nextPan = {
        x: currentPan.x + (px - w / 2) * (1 / nextZoom - 1 / currentZoom),
        y: currentPan.y + (py - h / 2) * (1 / nextZoom - 1 / currentZoom)
      };

      zoomRef.current = nextZoom;
      panOffsetRef.current = nextPan;
      setPanOffset(nextPan);
      setZoom(nextZoom);
    }
  }, []);

  const canvasRefCallback = useCallback((canvas: HTMLCanvasElement | null) => {
    if (canvasRef.current) {
      canvasRef.current.removeEventListener("wheel", handleWheelNative);
    }
    if (canvas) {
      canvasRef.current = canvas;
      canvas.addEventListener("wheel", handleWheelNative, { passive: false });
    } else {
      canvasRef.current = null;
    }
  }, [handleWheelNative]);

  const stopCamera = () => {
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    try {
      setImageSrc(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        zoomRef.current = 1;
        panOffsetRef.current = { x: 0, y: 0 };
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
      }
    } catch (err) {
      setIsCameraActive(false);
      loadPreset("portrait");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          zoomRef.current = 1;
          panOffsetRef.current = { x: 0, y: 0 };
          setImageSrc(event.target.result as string);
          setZoom(1);
          setPanOffset({ x: 0, y: 0 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          zoomRef.current = 1;
          panOffsetRef.current = { x: 0, y: 0 };
          setImageSrc(event.target.result as string);
          setZoom(1);
          setPanOffset({ x: 0, y: 0 });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerConversion = useCallback(() => {
    if (!workerRef.current) return;

    if (isProcessingRef.current) {
      pendingUpdateRef.current = true;
      return;
    }

    let sourceEl: HTMLImageElement | HTMLVideoElement | null = null;
    let originalW = 0;
    let originalH = 0;

    if (isCameraActive && videoRef.current && videoRef.current.readyState >= 2) {
      sourceEl = videoRef.current;
      originalW = videoRef.current.videoWidth;
      originalH = videoRef.current.videoHeight;
    } else if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      if (!img.complete) {
        img.onload = () => triggerConversion();
        return;
      }
      sourceEl = img;
      originalW = img.naturalWidth;
      originalH = img.naturalHeight;
    }

    if (!sourceEl || originalW === 0 || originalH === 0) return;

    const startTime = performance.now();
    const cols = widthSetting;
    const fontStretch = aspectCorrection;
    const rows = Math.max(1, Math.round((cols * (originalH / originalW)) * fontStretch));

    const scaleCanvas = document.createElement("canvas");
    scaleCanvas.width = cols;
    scaleCanvas.height = rows;
    const scaleCtx = scaleCanvas.getContext("2d");
    if (!scaleCtx) return;

    scaleCtx.drawImage(sourceEl, 0, 0, cols, rows);
    const imgData = scaleCtx.getImageData(0, 0, cols, rows);
    
    const activeCharList = selectedCharSet === "custom" ? customChars : CHAR_SETS[selectedCharSet];

    isProcessingRef.current = true;

    workerRef.current.postMessage({
      pixels: imgData.data,
      width: cols,
      height: rows,
      brightness,
      contrast,
      invert,
      charList: activeCharList,
    });

    setOutWidth(cols);
    setOutHeight(rows);
    setRenderTime(Math.round(performance.now() - startTime));
  }, [
    imageSrc, isCameraActive, widthSetting, aspectCorrection, 
    brightness, contrast, invert, selectedCharSet, customChars
  ]);

  useEffect(() => {
    let animFrameId: number;
    const loop = () => {
      if (isCameraActive) {
        triggerConversion();
        animFrameId = requestAnimationFrame(loop);
      }
    };
    if (isCameraActive) {
      animFrameId = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animFrameId);
  }, [isCameraActive, triggerConversion]);

  useEffect(() => {
    if (!isCameraActive && imageSrc) {
      triggerConversion();
    }
  }, [
    imageSrc, isCameraActive, widthSetting, aspectCorrection, 
    brightness, contrast, invert, selectedCharSet, customChars, 
    stegMode, stegText, triggerConversion
  ]);

  const drawToBuffer = (chars: string[], colors: Uint8Array, w: number, h: number) => {
    if (typeof window === "undefined") return;

    if (!bufferCanvasRef.current) {
      bufferCanvasRef.current = document.createElement("canvas");
    }

    const buffer = bufferCanvasRef.current;
    const cellW = fontSize * 0.6;
    const cellH = fontSize;

    buffer.width = w * cellW;
    buffer.height = h * cellH;

    const ctx = buffer.getContext("2d");
    if (!ctx) return;

    const themeBg = isRdr2 ? "#0c0905" : "#000000";
    ctx.fillStyle = themeBg;
    ctx.fillRect(0, 0, buffer.width, buffer.height);

    ctx.font = `bold ${fontSize}px var(--font-geist-mono), Courier New, monospace`;
    ctx.textBaseline = "top";

    const stegMsg = stegText || "ALBERT AZIZOV";
    const stegLen = stegMsg.length;
    let stegIdx = 0;

    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const idx = r * w + c;
        
        let char = "";
        if (stegMode) {
          char = stegMsg[stegIdx % stegLen];
          stegIdx++;
        } else {
          char = chars[idx] || " ";
        }

        if (char === " ") continue;

        let charCol = "";
        const cIdx = idx * 3;
        const cr = colors[cIdx];
        const cg = colors[cIdx + 1];
        const cb = colors[cIdx + 2];

        const luma = Math.round(0.299 * cr + 0.587 * cg + 0.114 * cb);
        const x = c * cellW;
        const y = r * cellH;

        if (colorMode === "block") {
          if (stegMode) {
            const op = 0.1 + 0.9 * (luma / 255);
            ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${op})`;
          } else {
            ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
          }
          ctx.fillRect(x, y, cellW, cellH);
        } else {
          if (colorMode === "mono") {
            const op = 0.15 + 0.85 * (luma / 255);
            if (isRdr2) {
              ctx.fillStyle = `rgba(176, 28, 28, ${op})`;
            } else {
              ctx.fillStyle = `rgba(34, 197, 94, ${op})`;
            }
          } else if (colorMode === "grayscale") {
            ctx.fillStyle = `rgb(${luma}, ${luma}, ${luma})`;
          } else {
            ctx.fillStyle = `rgb(${cr}, ${cg}, ${cb})`;
          }
          ctx.fillText(char, x, y);
        }
      }
    }

    lastDrawnSettingsRef.current = {
      colorMode,
      fontSize,
      theme,
      stegMode,
      stegText,
      data: lastProcessedDataRef.current
    };
  };

  const paintCanvas = () => {
    const canvas = canvasRef.current;
    const buffer = bufferCanvasRef.current;
    if (!canvas || !buffer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const w = rect?.width || 800;
    const h = rect?.height || 500;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = isRdr2 ? "#0c0905" : "#000000";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    
    ctx.translate(w / 2, h / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-buffer.width / 2 + panOffset.x, -buffer.height / 2 + panOffset.y);
    ctx.imageSmoothingEnabled = zoom < 1;
    ctx.drawImage(buffer, 0, 0);

    ctx.restore();
  };

  useEffect(() => {
    const settingsChanged = 
      lastDrawnSettingsRef.current.colorMode !== colorMode ||
      lastDrawnSettingsRef.current.fontSize !== fontSize ||
      lastDrawnSettingsRef.current.theme !== theme ||
      lastDrawnSettingsRef.current.stegMode !== stegMode ||
      lastDrawnSettingsRef.current.stegText !== stegText ||
      lastDrawnSettingsRef.current.data !== lastProcessedDataRef.current;

    if (settingsChanged && lastProcessedDataRef.current) {
      const { chars, colors, w, h } = lastProcessedDataRef.current;
      drawToBuffer(chars, colors, w, h);
    }

    paintCanvas();
  }, [zoom, panOffset, colorMode, fontSize, theme, stegMode, stegText]);

  useEffect(() => {
    const handleResize = () => paintCanvasRef.current();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: panOffset.x, y: panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const currentZoom = zoomRef.current;
    const nextPan = {
      x: panStartRef.current.x + dx / currentZoom,
      y: panStartRef.current.y + dy / currentZoom
    };
    panOffsetRef.current = nextPan;
    setPanOffset(nextPan);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const generateRawText = (): string => {
    const data = lastProcessedDataRef.current;
    if (!data) return "";

    const { chars, w, h } = data;
    let text = "";

    const stegMsg = stegText || "ALBERT AZIZOV";
    const stegLen = stegMsg.length;
    let stegIdx = 0;

    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (stegMode) {
          text += stegMsg[stegIdx % stegLen];
          stegIdx++;
        } else {
          text += chars[r * w + c] || " ";
        }
      }
      text += "\n";
    }
    return text;
  };

  const handleCopyText = () => {
    const text = generateRawText();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadTxt = () => {
    const text = generateRawText();
    if (!text) return;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ascii_art_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPng = () => {
    const buffer = bufferCanvasRef.current;
    if (!buffer) return;

    const dataUrl = buffer.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `ascii_art_${Date.now()}.png`;
    link.click();
  };

  const handleResetFilters = () => {
    setBrightness(0);
    setContrast(0);
    setInvert(false);
    setWidthSetting(100);
    setAspectCorrection(0.55);
    setFontSize(8);
    zoomRef.current = 1;
    panOffsetRef.current = { x: 0, y: 0 };
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
    setStegMode(false);
    setStegText("ALBERT AZIZOV");
  };

  const seEliteFont = `var(--font-special-elite), serif`;
  const monoFont = isRdr2 ? seEliteFont : 'var(--font-geist-mono), monospace';
  const bodyFont = isRdr2 ? seEliteFont : 'var(--font-geist-sans), sans-serif';
  const ryeFont = `var(--font-rdr2), var(--font-rye), serif`;

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden ${isRdr2 ? 'rdr2-scratch' : ''}`}
      style={{
        backgroundColor: isRdr2 ? "var(--bg)" : "#000000",
        color: isRdr2 ? "var(--fg)" : "#ffffff",
        fontFamily: bodyFont,
      }}
    >
      <CyberBackground isRdr2={isRdr2} />

      {isRdr2 && <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(4, 2, 0, 0.65) 100%)" }} />}

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col flex-1 space-y-6 relative z-10">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4" style={{ borderBottom: `1px solid var(--border)` }}>
          <div className="flex flex-col gap-1">
            <Link 
              href="/"
              style={{
                fontFamily: monoFont,
                fontSize: "10px",
                color: isRdr2 ? "var(--muted)" : "#a1a1aa",
                textDecoration: "none",
                letterSpacing: "0.15em",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
              onMouseEnter={e => (e.currentTarget.style.color = isRdr2 ? "var(--accent)" : "#ffffff")}
              onMouseLeave={e => (e.currentTarget.style.color = isRdr2 ? "var(--muted)" : "#a1a1aa")}
            >
              <ArrowLeft size={10} />
              {t.back}
            </Link>
            <h1 
              style={{
                fontFamily: isRdr2 ? ryeFont : "var(--font-serif), Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: isRdr2 ? "bold" : "normal",
                color: isRdr2 ? "var(--accent)" : "#ffffff",
                letterSpacing: isRdr2 ? "0.05em" : "normal",
                textShadow: isRdr2 ? "0 0 15px rgba(176,28,28,0.25)" : "none",
                margin: "4px 0 0 0"
              }}
            >
              {t.title}
            </h1>
            <p style={{ fontSize: "11px", color: isRdr2 ? "var(--muted)" : "#71717a", fontFamily: monoFont }}>
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: monoFont, fontSize: '10px' }}>
              {(['ru', 'en'] as Language[]).map((l, i, arr) => (
                <React.Fragment key={l}>
                  <button 
                    onClick={() => setLang(l)} 
                    style={{ 
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer', 
                      color: lang === l ? (isRdr2 ? "var(--accent)" : "#ffffff") : (isRdr2 ? "var(--muted-dk)" : "#52525b"), 
                      fontWeight: lang === l ? 700 : 400, fontFamily: monoFont, fontSize: '10px', textTransform: 'uppercase' 
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                  {i < arr.length - 1 && <span style={{ color: "var(--border)" }}>|</span>}
                </React.Fragment>
              ))}
            </div>

            <span style={{ color: "var(--border)" }}>/</span>

            <button 
              onClick={toggleTheme} 
              className="theme-switcher"
              style={{
                fontFamily: monoFont,
                borderColor: "var(--border-2)",
              }}
            >
              {isRdr2 ? `⚙ MODERN` : `🤠 WILD WEST`}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <aside className="lg:col-span-4 flex flex-col gap-4">
            <div 
              style={{
                backgroundColor: "var(--card)",
                border: `1px solid var(--border)`,
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: isRdr2 ? "inset 0 0 10px rgba(30, 24, 14, 0.05)" : "none"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    fontFamily: monoFont,
                    fontSize: "11px",
                    padding: "8px 4px",
                    cursor: "pointer",
                    backgroundColor: isRdr2 ? "var(--border-2)" : "#27272a",
                    color: "#ffffff",
                    border: "none"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "var(--accent)" : "#3f3f46"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "var(--border-2)" : "#27272a"; }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {lang === 'ru' ? "ФАЙЛ" : "UPLOAD IMAGE"}
                </button>
                <button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  style={{
                    fontFamily: monoFont,
                    fontSize: "11px",
                    padding: "8px 4px",
                    cursor: "pointer",
                    backgroundColor: isCameraActive ? (isRdr2 ? "#8b0000" : "#ef4444") : (isRdr2 ? "var(--border-2)" : "#27272a"),
                    color: "#ffffff",
                    border: "none"
                  }}
                >
                  {isCameraActive ? t.webcamStop : t.webcamStart}
                </button>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontFamily: monoFont, color: isRdr2 ? "var(--muted)" : "#71717a", marginRight: "4px" }}>
                  {t.presetsTitle}:
                </span>
                <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                  {(['portrait', 'animal', 'shapes'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => loadPreset(type)}
                      style={{
                        flex: 1,
                        fontFamily: monoFont,
                        fontSize: "9px",
                        padding: "4px 2px",
                        cursor: "pointer",
                        border: `1px solid var(--border-2)`,
                        backgroundColor: "transparent",
                        color: isRdr2 ? "var(--fg)" : "#a1a1aa",
                        textTransform: "uppercase"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = isRdr2 ? "var(--accent)" : "#ffffff";
                        e.currentTarget.style.color = isRdr2 ? "var(--accent)" : "#ffffff";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "var(--border-2)";
                        e.currentTarget.style.color = isRdr2 ? "var(--fg)" : "#a1a1aa";
                      }}
                    >
                      {t.presets[type]}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border)" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: monoFont }}>
                  <span>{t.width}</span>
                  <span style={{ color: isRdr2 ? "var(--accent)" : "#ffffff" }}>{widthSetting}</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="300" 
                  value={widthSetting}
                  onChange={(e) => setWidthSetting(parseInt(e.target.value))}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    cursor: "pointer",
                    width: "100%"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: monoFont }}>
                  <span>{t.aspectRatio}</span>
                  <span style={{ color: isRdr2 ? "var(--accent)" : "#ffffff" }}>{aspectCorrection.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.3" 
                  max="1.2" 
                  step="0.05"
                  value={aspectCorrection}
                  onChange={(e) => setAspectCorrection(parseFloat(e.target.value))}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    cursor: "pointer",
                    width: "100%"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: monoFont }}>
                  <span>{t.brightness}</span>
                  <span style={{ color: isRdr2 ? "var(--accent)" : "#ffffff" }}>{brightness}</span>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    cursor: "pointer",
                    width: "100%"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: monoFont }}>
                  <span>{t.contrast}</span>
                  <span style={{ color: isRdr2 ? "var(--accent)" : "#ffffff" }}>{contrast}</span>
                </div>
                <input 
                  type="range" 
                  min="-100" 
                  max="100" 
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    cursor: "pointer",
                    width: "100%"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: monoFont }}>
                  <span>{t.fontSize}</span>
                  <span style={{ color: isRdr2 ? "var(--accent)" : "#ffffff" }}>{fontSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="20" 
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    cursor: "pointer",
                    width: "100%"
                  }}
                />
              </div>

              <div style={{ height: "1px", background: "var(--border)" }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontSize: "11px", fontFamily: monoFont }}>{t.charSet}</span>
                <select
                  value={selectedCharSet}
                  disabled={stegMode}
                  onChange={(e) => setSelectedCharSet(e.target.value as keyof typeof CHAR_SETS)}
                  style={{
                    fontFamily: monoFont,
                    fontSize: "11px",
                    backgroundColor: isRdr2 ? "#1e180e" : "#18181b",
                    color: isRdr2 ? "var(--fg)" : "#ffffff",
                    border: `1px solid var(--border-2)`,
                    padding: "4px 6px",
                    outline: "none",
                    cursor: stegMode ? "not-allowed" : "pointer",
                    opacity: stegMode ? 0.5 : 1
                  }}
                >
                  {(Object.keys(CHAR_SETS) as Array<keyof typeof CHAR_SETS>).map((key) => (
                    <option key={key} value={key}>
                      {t.charSets[key]}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCharSet === "custom" && !stegMode && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", fontFamily: monoFont }}>{t.customChar}</span>
                  <input
                    type="text"
                    value={customChars}
                    onChange={(e) => setCustomChars(e.target.value)}
                    style={{
                      fontFamily: "var(--font-geist-mono), Courier New, monospace",
                      fontSize: "11px",
                      backgroundColor: isRdr2 ? "#1e180e" : "#18181b",
                      color: isRdr2 ? "var(--fg)" : "#ffffff",
                      border: `1px solid var(--border-2)`,
                      padding: "6px 8px",
                      outline: "none"
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <span style={{ fontSize: "11px", fontFamily: monoFont }}>{t.colorMode}</span>
                <select
                  value={colorMode}
                  onChange={(e) => setColorMode(e.target.value)}
                  style={{
                    fontFamily: monoFont,
                    fontSize: "11px",
                    backgroundColor: isRdr2 ? "#1e180e" : "#18181b",
                    color: isRdr2 ? "var(--fg)" : "#ffffff",
                    border: `1px solid var(--border-2)`,
                    padding: "4px 6px",
                    outline: "none",
                    cursor: "pointer"
                  }}
                >
                  <option value="mono">{t.colorModes.mono}</option>
                  <option value="grayscale">{t.colorModes.grayscale}</option>
                  <option value="color">{t.colorModes.color}</option>
                  <option value="block">{t.colorModes.block}</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", fontFamily: monoFont }}>{t.invert}</span>
                <input 
                  type="checkbox" 
                  checked={invert}
                  onChange={(e) => setInvert(e.target.checked)}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer"
                  }}
                />
              </div>

              <div style={{ height: "1px", background: "var(--border)" }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "11px", fontFamily: monoFont, fontWeight: "bold", color: isRdr2 ? "var(--accent)" : "#22c55e" }}>
                  {lang === 'ru' ? "Стеганография" : "Steganography Mode"}
                </span>
                <input 
                  type="checkbox" 
                  checked={stegMode}
                  onChange={(e) => setStegMode(e.target.checked)}
                  style={{
                    accentColor: isRdr2 ? "var(--accent)" : "#22c55e",
                    width: "15px",
                    height: "15px",
                    cursor: "pointer"
                  }}
                />
              </div>

              {stegMode && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", fontFamily: monoFont }}>{lang === 'ru' ? "Текст послания" : "Secret Message"}</span>
                  <input
                    type="text"
                    value={stegText}
                    onChange={(e) => setStegText(e.target.value)}
                    style={{
                      fontFamily: monoFont,
                      fontSize: "11px",
                      backgroundColor: isRdr2 ? "#1e180e" : "#18181b",
                      color: isRdr2 ? "var(--fg)" : "#ffffff",
                      border: `1px solid var(--border-2)`,
                      padding: "6px",
                      outline: "none"
                    }}
                  />
                </div>
              )}

              <button
                onClick={handleResetFilters}
                style={{
                  fontFamily: monoFont,
                  fontSize: "10px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  color: isRdr2 ? "var(--muted)" : "#71717a",
                  border: `1px solid var(--border-2)`,
                  textTransform: "uppercase",
                  marginTop: "6px"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = isRdr2 ? "var(--accent)" : "#ffffff";
                  e.currentTarget.style.borderColor = isRdr2 ? "var(--accent)" : "#ffffff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isRdr2 ? "var(--muted)" : "#71717a";
                  e.currentTarget.style.borderColor = "var(--border-2)";
                }}
              >
                <RotateCcw size={10} />
                Reset Parameters
              </button>
            </div>
          </aside>

          <main className="lg:col-span-8 flex flex-col gap-4">
            
            <div style={{ display: "flex", borderBottom: `1px solid var(--border)`, fontFamily: monoFont, fontSize: "11px" }}>
              <button
                onClick={() => setActiveTab("canvas")}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  color: activeTab === "canvas" ? (isRdr2 ? "var(--accent)" : "#ffffff") : (isRdr2 ? "var(--muted)" : "#71717a"),
                  fontWeight: activeTab === "canvas" ? 700 : 400,
                  borderBottom: activeTab === "canvas" ? `2px solid ${isRdr2 ? "var(--accent)" : "#ffffff"}` : "none"
                }}
              >
                {t.viewCanvas}
              </button>
              <button
                onClick={() => setActiveTab("text")}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  color: activeTab === "text" ? (isRdr2 ? "var(--accent)" : "#ffffff") : (isRdr2 ? "var(--muted)" : "#71717a"),
                  fontWeight: activeTab === "text" ? 700 : 400,
                  borderBottom: activeTab === "text" ? `2px solid ${isRdr2 ? "var(--accent)" : "#ffffff"}` : "none"
                }}
              >
                {t.viewText}
              </button>
            </div>

            <video ref={videoRef} style={{ display: "none" }} playsInline muted />

            <div 
              ref={containerRef}
              style={{
                height: "500px",
                width: "100%",
                backgroundColor: isRdr2 ? "#0c0905" : "#000000",
                border: `1px solid var(--border)`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              {activeTab === "canvas" ? (
                <>
                  <canvas
                    ref={canvasRefCallback}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                      cursor: isDragging ? "grabbing" : "grab",
                      width: "100%",
                      height: "100%",
                      display: "block"
                    }}
                  />
                  <div 
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      fontSize: "9px",
                      fontFamily: monoFont,
                      color: isRdr2 ? "var(--muted)" : "#71717a",
                      backgroundColor: isRdr2 ? "rgba(12, 9, 5, 0.85)" : "rgba(0, 0, 0, 0.75)",
                      padding: "4px 8px",
                      pointerEvents: "none",
                      border: `1px solid var(--border-2)`
                    }}
                  >
                    {t.canvasZoom}
                  </div>
                </>
              ) : (
                <div 
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    padding: "16px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                  }}
                  className="terminal-scroll"
                >
                  <pre 
                    style={{
                      fontFamily: "var(--font-geist-mono), Courier New, monospace",
                      fontSize: `${fontSize}px`,
                      lineHeight: "1.0",
                      letterSpacing: "0.02em",
                      whiteSpace: "pre",
                      color: isRdr2 ? "#b01c1c" : "#22c55e",
                      backgroundColor: "transparent",
                      margin: 0
                    }}
                  >
                    {generateRawText()}
                  </pre>
                </div>
              )}

              <div style={{ position: "absolute", top: "12px", right: "12px", display: "flex", gap: "6px" }}>
                <div 
                  style={{
                    fontSize: "9px",
                    fontFamily: monoFont,
                    color: isRdr2 ? "var(--fg)" : "#a1a1aa",
                    backgroundColor: isRdr2 ? "rgba(12, 9, 5, 0.85)" : "rgba(0,0,0,0.75)",
                    padding: "4px 8px",
                    border: `1px solid var(--border-2)`
                  }}
                >
                  {t.dimensions}: {outWidth} x {outHeight}
                </div>

                <div 
                  style={{
                    fontSize: "9px",
                    fontFamily: monoFont,
                    color: isRdr2 ? "var(--accent)" : "#22c55e",
                    backgroundColor: isRdr2 ? "rgba(12, 9, 5, 0.85)" : "rgba(0,0,0,0.75)",
                    padding: "4px 8px",
                    border: `1px solid var(--border-2)`
                  }}
                >
                  {t.performance}: {renderTime} ms
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", paddingTop: "4px" }}>
              <button
                onClick={handleCopyText}
                disabled={!outWidth}
                style={{
                  fontFamily: monoFont,
                  fontSize: "11px",
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  backgroundColor: isRdr2 ? "var(--border-2)" : "#27272a",
                  color: "#ffffff",
                  border: "none",
                  opacity: outWidth ? 1 : 0.5
                }}
                onMouseEnter={e => { if (outWidth) e.currentTarget.style.backgroundColor = isRdr2 ? "var(--accent)" : "#3f3f46"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "var(--border-2)" : "#27272a"; }}
              >
                {copied ? <Check size={12} style={{ color: "#22c55e" }} /> : <Copy size={12} />}
                {copied ? t.copied : t.copy}
              </button>

              <button
                onClick={handleDownloadTxt}
                disabled={!outWidth}
                style={{
                  fontFamily: monoFont,
                  fontSize: "11px",
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  backgroundColor: isRdr2 ? "var(--border-2)" : "#27272a",
                  color: "#ffffff",
                  border: "none",
                  opacity: outWidth ? 1 : 0.5
                }}
                onMouseEnter={e => { if (outWidth) e.currentTarget.style.backgroundColor = isRdr2 ? "var(--accent)" : "#3f3f46"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "var(--border-2)" : "#27272a"; }}
              >
                <Download size={12} />
                {t.downloadTxt}
              </button>

              <button
                onClick={handleExportPng}
                disabled={!outWidth}
                style={{
                  fontFamily: monoFont,
                  fontSize: "11px",
                  padding: "10px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  backgroundColor: isRdr2 ? "linear-gradient(180deg, #7a0f0f 0%, #5a0808 100%)" : "#ffffff",
                  color: isRdr2 ? "#d6c9a8" : "#000000",
                  border: isRdr2 ? "1px solid rgba(176,28,28,0.8)" : "none",
                  boxShadow: isRdr2 ? "0 2px 4px rgba(0,0,0,0.5)" : "none",
                  opacity: outWidth ? 1 : 0.5
                }}
                onMouseEnter={e => { if (outWidth) e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                <ImageIcon size={12} />
                {t.exportPng}
              </button>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
