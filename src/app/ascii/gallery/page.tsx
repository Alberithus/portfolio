'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, RefreshCw } from "lucide-react";
import { useTheme } from "../../components/ThemeContext";

interface UploadedImage {
  image: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  ua: string;
  timestamp: number;
}

export default function GalleryPage() {
  const { theme } = useTheme();
  const isRdr2 = theme === 'rdr2';

  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [uploads, setUploads] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);

  const correctPasscode = "1337";

  const seEliteFont = `var(--font-special-elite), serif`;
  const monoFont = isRdr2 ? seEliteFont : 'var(--font-geist-mono), monospace';
  const bodyFont = isRdr2 ? seEliteFont : 'var(--font-geist-sans), sans-serif';
  const ryeFont = `var(--font-rdr2), var(--font-rye), serif`;

  useEffect(() => {
    const saved = localStorage.getItem("ascii_gallery_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUploads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
      localStorage.setItem("ascii_gallery_auth", "true");
      setError("");
    } else {
      setError(isRdr2 ? "НЕВЕРНЫЙ КОД ДОСТУПА" : "ACCESS DENIED");
    }
  };

  const fetchUploads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ascii-log");
      const data = await res.json();
      if (data.success) {
        setUploads(data.uploads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!confirm(isRdr2 ? "Стереть все фото?" : "Clear all logged uploads?")) return;
    try {
      const res = await fetch("/api/ascii-log", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUploads([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleString();
  };

  const parseUA = (uaStr: string) => {
    if (uaStr.includes("Firefox")) return "Firefox";
    if (uaStr.includes("Chrome")) return "Chrome";
    if (uaStr.includes("Safari") && !uaStr.includes("Chrome")) return "Safari";
    if (uaStr.includes("Edge")) return "Edge";
    return "Browser";
  };

  if (!isAuthenticated) {
    return (
      <div 
        className={`min-h-screen flex flex-col items-center justify-center p-4 relative ${isRdr2 ? 'rdr2-scratch' : ''}`}
        style={{
          backgroundColor: isRdr2 ? "var(--bg)" : "#000000",
          color: isRdr2 ? "var(--fg)" : "#ffffff",
          fontFamily: bodyFont,
        }}
      >
        {isRdr2 && <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(4, 2, 0, 0.65) 100%)" }} />}
        
        <div 
          className="relative z-10 w-full max-w-sm p-8"
          style={{
            backgroundColor: "var(--card)",
            border: `1px solid var(--border)`,
            boxShadow: isRdr2 ? "0 4px 20px rgba(0,0,0,0.5)" : "0 0 30px rgba(34, 197, 94, 0.1)",
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isRdr2 ? "var(--border-2)" : "rgba(34, 197, 94, 0.1)",
                color: isRdr2 ? "var(--accent)" : "#22c55e",
                border: `1px solid var(--border-2)`,
              }}
            >
              <Lock size={24} />
            </div>
            
            <h1 
              style={{
                fontFamily: isRdr2 ? ryeFont : "var(--font-serif), Georgia, serif",
                fontSize: "20px",
                color: isRdr2 ? "var(--accent)" : "#ffffff",
                margin: 0,
              }}
            >
              {isRdr2 ? "СЕКРЕТНЫЙ СЕЙФ" : "ASCII SECURE ARCHIVE"}
            </h1>
            <p style={{ fontSize: "11px", color: isRdr2 ? "var(--muted)" : "#71717a", fontFamily: monoFont }}>
              {isRdr2 ? "ВВЕДИТЕ КОД ДОСТУПА" : "ENTER SECURE ACCESS KEY"}
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4 mt-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••"
                maxLength={8}
                style={{
                  width: "100%",
                  fontFamily: monoFont,
                  fontSize: "14px",
                  textAlign: "center",
                  letterSpacing: "0.2em",
                  backgroundColor: isRdr2 ? "#1e180e" : "#18181b",
                  color: isRdr2 ? "var(--fg)" : "#ffffff",
                  border: `1px solid var(--border-2)`,
                  padding: "10px",
                  outline: "none",
                }}
              />
              
              {error && (
                <div style={{ fontSize: "10px", color: isRdr2 ? "var(--accent)" : "#ef4444", fontFamily: monoFont }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  fontFamily: monoFont,
                  fontSize: "11px",
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor: isRdr2 ? "var(--border-2)" : "#27272a",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {isRdr2 ? "ОТКРЫТЬ" : "AUTHORIZE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen flex flex-col justify-between relative overflow-x-hidden ${isRdr2 ? 'rdr2-scratch' : ''}`}
      style={{
        backgroundColor: isRdr2 ? "var(--bg)" : "#000000",
        color: isRdr2 ? "var(--fg)" : "#ffffff",
        fontFamily: bodyFont,
      }}
    >
      {isRdr2 && <div className="fixed inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(4, 2, 0, 0.65) 100%)" }} />}

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 flex flex-col flex-1 space-y-6 relative z-10">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4" style={{ borderBottom: `1px solid var(--border)` }}>
          <div className="flex flex-col gap-1">
            <Link 
              href="/ascii"
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
            >
              <ArrowLeft size={10} />
              {isRdr2 ? "← НАЗАД В ГЕНЕРАТОР" : "← BACK TO GENERATOR"}
            </Link>
            <h1 
              style={{
                fontFamily: isRdr2 ? ryeFont : "var(--font-serif), Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: isRdr2 ? "bold" : "normal",
                color: isRdr2 ? "var(--accent)" : "#ffffff",
                letterSpacing: isRdr2 ? "0.05em" : "normal",
                margin: "4px 0 0 0"
              }}
            >
              {isRdr2 ? "ЗАГРУЖЕННЫЕ ФОТО" : "USER UPLOADS CABINET"}
            </h1>
            <p style={{ fontSize: "11px", color: isRdr2 ? "var(--muted)" : "#71717a", fontFamily: monoFont }}>
              {isRdr2 ? "Архив изображений пользователей в реальном времени" : "Real-time capture of converted images"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchUploads}
              style={{
                fontFamily: monoFont,
                fontSize: "10px",
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: isRdr2 ? "var(--fg)" : "#a1a1aa",
                border: `1px solid var(--border-2)`,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
              {isRdr2 ? "ОБНОВИТЬ" : "REFRESH"}
            </button>
            
            <button
              onClick={handleClearAll}
              disabled={uploads.length === 0}
              style={{
                fontFamily: monoFont,
                fontSize: "10px",
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: isRdr2 ? "#8b0000" : "#ef4444",
                color: "#ffffff",
                border: "none",
                opacity: uploads.length === 0 ? 0.5 : 1,
              }}
            >
              {isRdr2 ? "ОЧИСТИТЬ ВСЕ" : "CLEAR ARCHIVE"}
            </button>
          </div>
        </header>

        {loading && uploads.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div style={{ fontFamily: monoFont, fontSize: "12px", color: isRdr2 ? "var(--muted)" : "#71717a" }}>
              {isRdr2 ? "Синхронизация..." : "Syncing records..."}
            </div>
          </div>
        ) : uploads.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center border border-dashed" style={{ borderColor: "var(--border-2)" }}>
            <div style={{ fontFamily: monoFont, fontSize: "12px", color: isRdr2 ? "var(--muted)" : "#71717a" }}>
              {isRdr2 ? "Сейф пуст. Пока никто ничего не загружал." : "No uploaded images logged yet."}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {uploads.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  backgroundColor: "var(--card)",
                  border: `1px solid var(--border)`,
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  position: "relative",
                }}
              >
                <div 
                  className="aspect-square w-full relative flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: isRdr2 ? "#0c0905" : "#000000",
                    border: `1px solid var(--border-2)`,
                  }}
                >
                  <img 
                    src={item.image} 
                    alt="Upload thumbnail" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-1" style={{ fontFamily: monoFont, fontSize: "9px" }}>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: isRdr2 ? "var(--muted)" : "#71717a" }}>Location:</span>
                    <span style={{ fontWeight: "bold", textAlign: "right" }}>
                      {item.city}, {item.country}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: isRdr2 ? "var(--muted)" : "#71717a" }}>IP:</span>
                    <span style={{ textAlign: "right" }}>{item.ip}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: isRdr2 ? "var(--muted)" : "#71717a" }}>Time:</span>
                    <span style={{ textAlign: "right" }}>{formatTime(item.timestamp)}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span style={{ color: isRdr2 ? "var(--muted)" : "#71717a" }}>Client:</span>
                    <span style={{ textAlign: "right" }}>{parseUA(item.ua)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
