'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, RefreshCw, Trash2, X, ZoomIn } from "lucide-react";
import { useTheme } from "../../components/ThemeContext";

interface UploadedImage {
  id: string;
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
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);

  const seEliteFont = `var(--font-special-elite), serif`;
  const monoFont = isRdr2 ? seEliteFont : 'var(--font-geist-mono), monospace';
  const bodyFont = isRdr2 ? seEliteFont : 'var(--font-geist-sans), sans-serif';
  const ryeFont = `var(--font-rdr2), var(--font-rye), serif`;

  const sha256 = async (message: string) => {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const saved = localStorage.getItem("ascii_gallery_auth");
    if (saved) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUploads();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const clientHash = await sha256(passcode);
      const res = await fetch("/api/ascii-log", {
        headers: {
          "Authorization": `Bearer ${clientHash}`
        }
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("ascii_gallery_auth", clientHash);
        setError("");
      } else {
        setError(isRdr2 ? "НЕВЕРНЫЙ КОД ДОСТУПА" : "ACCESS DENIED");
      }
    } catch (err) {
      setError(isRdr2 ? "ОШИБКА АВТОРИЗАЦИИ" : "AUTH ERROR");
    }
  };

  const fetchUploads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("ascii_gallery_auth") || "";
      const res = await fetch("/api/ascii-log", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem("ascii_gallery_auth");
        return;
      }
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
      const token = localStorage.getItem("ascii_gallery_auth") || "";
      const res = await fetch("/api/ascii-log", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setUploads([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm(isRdr2 ? "Удалить это изображение?" : "Delete this image?")) return;
    try {
      const token = localStorage.getItem("ascii_gallery_auth") || "";
      const res = await fetch("/api/ascii-log", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (data.success) {
        setUploads(prev => prev.filter(item => item.id !== id));
        if (selectedImage?.id === id) {
          setSelectedImage(null);
        }
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
              {isRdr2 ? "Архив оригинальных изображений пользователей" : "Real-time crisp quality user image captures"}
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
            {uploads.map((item) => (
              <div 
                key={item.id}
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
                  className="aspect-square w-full relative flex items-center justify-center overflow-hidden group"
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
                  <div 
                    onClick={() => setSelectedImage(item)}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-250"
                  >
                    <ZoomIn size={18} style={{ color: "#ffffff" }} />
                  </div>
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

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  style={{
                    backgroundColor: isRdr2 ? "rgba(176, 28, 28, 0.15)" : "rgba(239, 68, 68, 0.1)",
                    color: isRdr2 ? "var(--accent)" : "#ef4444",
                    border: `1px solid ${isRdr2 ? "rgba(176, 28, 28, 0.3)" : "rgba(239, 68, 68, 0.2)"}`,
                    padding: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    fontFamily: monoFont,
                    fontSize: "9px",
                    marginTop: "4px"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "var(--accent)" : "#ef4444"; e.currentTarget.style.color = "#ffffff"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = isRdr2 ? "rgba(176, 28, 28, 0.15)" : "rgba(239, 68, 68, 0.1)"; e.currentTarget.style.color = isRdr2 ? "var(--accent)" : "#ef4444"; }}
                >
                  <Trash2 size={10} />
                  {isRdr2 ? "УДАЛИТЬ" : "DELETE"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full flex flex-col p-2"
            style={{
              backgroundColor: "var(--card)",
              border: `1px solid var(--border)`,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-3" style={{ borderBottom: `1px solid var(--border-2)` }}>
              <div style={{ fontFamily: monoFont, fontSize: "11px", color: isRdr2 ? "var(--fg)" : "#a1a1aa" }}>
                {selectedImage.city}, {selectedImage.country} ({selectedImage.ip}) — {formatTime(selectedImage.timestamp)}
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="cursor-pointer"
                style={{
                  background: "none",
                  border: "none",
                  color: isRdr2 ? "var(--fg)" : "#ffffff",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center justify-center p-4 overflow-auto max-h-[70vh] bg-black/40">
              <img 
                src={selectedImage.image} 
                alt="High resolution view" 
                className="max-w-full max-h-[65vh] object-contain"
              />
            </div>

            <div className="flex justify-between items-center px-4 py-3" style={{ borderTop: `1px solid var(--border-2)` }}>
              <div style={{ fontFamily: monoFont, fontSize: "10px", color: isRdr2 ? "var(--muted)" : "#71717a" }}>
                UA: {selectedImage.ua}
              </div>
              
              <button
                onClick={() => handleDeleteItem(selectedImage.id)}
                style={{
                  backgroundColor: isRdr2 ? "#8b0000" : "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: monoFont,
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <Trash2 size={10} />
                {isRdr2 ? "УДАЛИТЬ ИЗ СЕЙФА" : "DELETE FILE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
