'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface BlueprintIntroProps {
  onComplete: () => void;
}

export default function BlueprintIntro({ onComplete }: BlueprintIntroProps) {
  const [stage, setStage] = useState<'phase1' | 'phase2' | 'exit'>('phase1');

  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const phase2Timer = setTimeout(() => {
      setStage('phase2');
    }, 1300);

    const exitTimer = setTimeout(() => {
      setStage('exit');
    }, 2300);

    const completeTimer = setTimeout(() => {
      document.body.style.overflow = originalStyle;
      sessionStorage.setItem('intro-played', 'true');
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = originalStyle;
    };
  }, [onComplete]);

  const screenVariants: Variants = {
    initial: {
      backgroundColor: '#000000',
      opacity: 1,
      y: 0
    },
    phase1: {
      backgroundColor: '#000000',
    },
    phase2: {
      backgroundColor: '#ffffff',
      transition: { duration: 0.25, ease: 'linear' }
    },
    exit: {
      backgroundColor: '#ffffff',
      opacity: 0,
      y: -30,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const horizontalLineVariants: Variants = {
    initial: {
      scaleX: 0,
      borderColor: '#27272a',
      originX: 0.5
    },
    phase1: {
      scaleX: 1,
      borderColor: '#27272a',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    phase2: {
      scaleX: 1,
      borderColor: '#e4e4e7',
      transition: { duration: 0.25, ease: 'linear' }
    }
  };

  const verticalLineVariants: Variants = {
    initial: {
      scaleY: 0,
      borderColor: '#27272a',
      originY: 0.5
    },
    phase1: {
      scaleY: 1,
      borderColor: '#27272a',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    phase2: {
      scaleY: 1,
      borderColor: '#e4e4e7',
      transition: { duration: 0.25, ease: 'linear' }
    }
  };

  const annotationVariants: Variants = {
    initial: { opacity: 0 },
    phase1: {
      opacity: 0.4,
      transition: { delay: 0.8, duration: 0.4, ease: 'easeOut' }
    },
    phase2: {
      opacity: 0,
      transition: { duration: 0.1 }
    }
  };

  const boundingBoxVariants: Variants = {
    initial: { opacity: 0 },
    phase1: { opacity: 0 },
    phase2: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.2, ease: 'easeOut' }
    }
  };

  const textVariants: Variants = {
    initial: { scale: 0.5, opacity: 0 },
    phase1: { scale: 0.5, opacity: 0 },
    phase2: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
        mass: 0.8
      }
    }
  };

  const leftLineVariants: Variants = {
    initial: { opacity: 0, scaleX: 0.6 },
    phase1: { opacity: 0, scaleX: 0.6 },
    phase2: {
      opacity: 1,
      scaleX: 1,
      originX: 1,
      transition: { delay: 0.65, duration: 0.4, ease: 'easeOut' }
    }
  };

  const rightLineVariants: Variants = {
    initial: { opacity: 0, scaleX: 0.6 },
    phase1: { opacity: 0, scaleX: 0.6 },
    phase2: {
      opacity: 1,
      scaleX: 1,
      originX: 0,
      transition: { delay: 0.65, duration: 0.4, ease: 'easeOut' }
    }
  };

  const topLineVariants: Variants = {
    initial: { opacity: 0, scaleY: 0.6 },
    phase1: { opacity: 0, scaleY: 0.6 },
    phase2: {
      opacity: 1,
      scaleY: 1,
      originY: 1,
      transition: { delay: 0.65, duration: 0.4, ease: 'easeOut' }
    }
  };

  const bottomLineVariants: Variants = {
    initial: { opacity: 0, scaleY: 0.6 },
    phase1: { opacity: 0, scaleY: 0.6 },
    phase2: {
      opacity: 1,
      scaleY: 1,
      originY: 0,
      transition: { delay: 0.65, duration: 0.4, ease: 'easeOut' }
    }
  };

  const verticalLabelVariants: Variants = {
    initial: { opacity: 0, y: -4 },
    phase1: { opacity: 0, y: -4 },
    phase2: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.75, duration: 0.25, ease: 'easeOut' }
    }
  };

  const horizontalLabelVariants: Variants = {
    initial: { opacity: 0, x: -4 },
    phase1: { opacity: 0, x: -4 },
    phase2: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.75, duration: 0.25, ease: 'easeOut' }
    }
  };

  const boxLabelVariants: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    phase1: { opacity: 0, scale: 0.9 },
    phase2: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.55, duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <motion.div
      variants={screenVariants}
      initial="initial"
      animate={stage}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none"
    >
      <motion.div
        variants={horizontalLineVariants}
        initial="initial"
        className="absolute left-0 right-0 top-1/2 h-0 border-t border-dashed pointer-events-none"
      />
      <motion.div
        variants={verticalLineVariants}
        initial="initial"
        className="absolute top-0 bottom-0 left-1/2 w-0 border-l border-dashed pointer-events-none"
      />

      <motion.div
        variants={annotationVariants}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] text-zinc-500 bg-black px-1.5 py-0.5 rounded border border-zinc-900 leading-none">
          H
        </div>

        <div className="absolute left-1/2 top-[35%] -translate-x-full pr-3 font-mono text-[9px] text-zinc-500 tracking-wider">
          d: 38 px
        </div>
        <div className="absolute top-1/2 left-[35%] -translate-y-full pb-2 font-mono text-[9px] text-zinc-500 tracking-wider">
          w: 51 px
        </div>

        <div className="absolute top-6 left-6 font-mono text-[9px] text-zinc-650 tracking-widest uppercase">
          [ DRAFT: GRID_10px / LAYOUT: DEFAULT ]
        </div>
        <div className="absolute top-6 right-6 font-mono text-[9px] text-zinc-650 tracking-widest uppercase">
          SCALE: 1.00_REF
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-zinc-650 tracking-widest uppercase">
          SYS_STATUS: ACTIVE
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-zinc-650 tracking-widest uppercase">
          T-0.8s // P1_INIT
        </div>
      </motion.div>

      {stage !== 'phase1' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            variants={boundingBoxVariants}
            initial="initial"
            className="relative p-6 border border-zinc-900 bg-white"
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-zinc-900 bg-white" />
            
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 border border-zinc-900 bg-white" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 border border-zinc-900 bg-white" />

            <motion.div 
              variants={boxLabelVariants}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-zinc-950 bg-white px-1 border border-zinc-950 z-10"
            >
              140 px
            </motion.div>
            <motion.div 
              variants={boxLabelVariants}
              className="absolute -right-16 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold text-zinc-950 bg-white px-1 border border-zinc-950 z-10 whitespace-nowrap"
            >
              186 px
            </motion.div>

            <motion.div 
              variants={topLineVariants}
              className="absolute bottom-full left-1/2 -translate-x-1/2 w-[1px] h-[40vh] border-l border-dashed border-zinc-400 flex items-center justify-center"
            >
              <motion.span 
                variants={verticalLabelVariants}
                className="font-mono text-[9px] font-bold text-zinc-950 bg-white px-1.5 py-0.5 border border-zinc-200 rotate-90 -translate-x-4"
              >
                186 px
              </motion.span>
            </motion.div>

            <motion.div 
              variants={bottomLineVariants}
              className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-[40vh] border-l border-dashed border-zinc-400 flex items-center justify-center"
            >
              <motion.span 
                variants={verticalLabelVariants}
                className="font-mono text-[9px] font-bold text-zinc-950 bg-white px-1.5 py-0.5 border border-zinc-200 rotate-90 translate-x-4"
              >
                186 px
              </motion.span>
            </motion.div>

            <motion.div 
              variants={leftLineVariants}
              className="absolute right-full top-1/2 -translate-y-1/2 h-[1px] w-[40vw] border-t border-dashed border-zinc-400 flex items-center justify-center"
            >
              <motion.span 
                variants={horizontalLabelVariants}
                className="font-mono text-[9px] font-bold text-zinc-950 bg-white px-1.5 py-0.5 border border-zinc-200 -translate-y-4"
              >
                140 px
              </motion.span>
            </motion.div>

            <motion.div 
              variants={rightLineVariants}
              className="absolute left-full top-1/2 -translate-y-1/2 h-[1px] w-[40vw] border-t border-dashed border-zinc-400 flex items-center justify-center"
            >
              <motion.span 
                variants={horizontalLabelVariants}
                className="font-mono text-[9px] font-bold text-zinc-950 bg-white px-1.5 py-0.5 border border-zinc-200 -translate-y-4"
              >
                140 px
              </motion.span>
            </motion.div>

            <motion.h1 
              variants={textVariants}
              className="font-sans font-bold text-7xl tracking-tight text-black px-6 py-1.5 select-none leading-none block"
            >
              Hi
            </motion.h1>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
