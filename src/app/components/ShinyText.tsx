"use client";

import React from "react";

export default function ShinyText({
  text,
  onClick,
  className = "",
}: {
  text: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group cursor-pointer font-mono text-[10px] uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 py-1.5 px-3.5 border border-zinc-850 hover:border-zinc-500 bg-zinc-950/80 focus:outline-none ${className}`}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </button>
  );
}
