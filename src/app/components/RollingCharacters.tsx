"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RollingCharacters({ score }: { score: number }) {
  const digits = String(score).padStart(2, "0").split("");

  return (
    <div className="flex font-mono text-[11px] uppercase tracking-widest text-zinc-400 select-none">
      <span>SCORE:&nbsp;</span>
      <div className="flex overflow-hidden h-[18px]">
        {digits.map((digit, idx) => (
          <div key={idx} className="relative w-[8px] h-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={digit}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute text-zinc-350 font-bold"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
