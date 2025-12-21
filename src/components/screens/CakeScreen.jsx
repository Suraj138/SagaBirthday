"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles, Sparkles, Heart, PartyPopper, Gift } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6", "#A78BFA", "#FBBF24"]

export default function CakeScreen({ onNext }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState([])
  const [candleFlameSize, setCandleFlameSize] = useState(1)
  const [sparkleEffects, setSparkleEffects] = useState([])
  const [decorationsVisible, setDecorationsVisible] = useState([])

  // Add floating hearts when candle is lit
  useEffect(() => {
    if (!lit) return
    
    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: Math.random() * 2
        }
      ])
    }, 400)
    
    return () => clearInterval(interval)
  }, [lit])

  // Animate candle flame
  useEffect(() => {
    if (!lit) return
    
    const interval = setInterval(() => {
      setCandleFlameSize(prev => 0.8 + Math.random() * 0.4)
    }, 300)
    
    return () => clearInterval(interval)
  }, [lit])

  // Add sparkle effects when decorating
  useEffect(() => {
    if (!decorated) return
    
    const addSparkle = () => {
      setSparkleEffects(prev => [
        ...prev.slice(-8),
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 10 + Math.random() * 20
        }
      ])
    }
    
    // Initial sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(addSparkle, i * 100)
    }
    
    const interval = setInterval(addSparkle, 300)
    return () => clearInterval(interval)
  }, [decorated])

  // Add decorations gradually
  useEffect(() => {
    if (!decorated) return
    
    const decorations = ["balloon", "streamer", "confetti", "star", "ribbon"]
    decorations.forEach((decoration, index) => {
      setTimeout(() => {
        setDecorationsVisible(prev => [...prev, decoration])
      }, index * 200)
    })
  }, [decorated])

  const decorate = () => {
    if (decorated) return
    setDecorated(true)

    // Multiple confetti bursts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: { y: 0.25 },
          colors: confettiColors,
          shapes: ['circle', 'star'],
          scalar: 0.8 + Math.random() * 0.4
        })
      }, i * 300)
    }

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: confettiColors
      })
      
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: confettiColors
      })
    }, 500)
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    
    // Candle lighting effect
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.6, x: 0.5 },
          colors: ['#FFD700', '#FFA500', '#FFFF00'],
          shapes: ['circle'],
          scalar: 0.6
        })
      }, i * 100)
    }

    // Grand celebration
    setTimeout(() => {
      const end = Date.now() + 1500
      
      const frame = () => {
        if (Date.now() > end) return
        
        confetti({
          particleCount: 10,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: confettiColors
        })
        
        confetti({
          particleCount: 10,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: confettiColors
        })
        
        requestAnimationFrame(frame)
      }
      
      frame()
    }, 800)

    // Final big burst
    setTimeout(() => {
      confetti({
        particleCount: 400,
        spread: 200,
        origin: { y: 0.4 },
        colors: confettiColors,
        shapes: ['circle', 'star', 'square']
      })
    }, 1500)
  }

  // Fallback decorations if image fails
  const fallbackDecorations = (
    <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-40">
      {decorationsVisible.map((decoration, index) => (
        <motion.div
          key={decoration}
          className="absolute"
          style={{
            left: `${10 + (index * 20)}%`,
            top: `${10 + (index * 5)}%`
          }}
          initial={{ opacity: 0, y: -30, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.2, type: "spring" }}
        >
          <PartyPopper className="w-8 h-8 text-pink-400" />
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="relative min-h-screen px-4 py-10 text-center overflow-hidden bg-gradient-to-b from-purple-950/20 via-black to-pink-950/20">

      {/* Floating Hearts Background */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none z-0"
            style={{ left: `${heart.x}%` }}
            initial={{ 
              y: "100vh", 
              x: "0%", 
              opacity: 0,
              rotate: 0 
            }}
            animate={{ 
              y: "-100px", 
              x: `${(Math.random() - 0.5) * 50}px`,
              opacity: [0, 1, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: 6,
              delay: heart.delay,
              ease: "easeOut"
            }}
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400/50" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sparkle Effects */}
      {sparkleEffects.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none z-30"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          <Sparkles className="w-full h-full text-yellow-400" />
        </motion.div>
      ))}

      {/* 🎀 DECORATIONS */}
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-40">
        <div className="relative w-full h-full">
          {decorated && (
            <>
              {/* Main decoration image */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Image
                  src="/decorations/bunting.png"
                  alt="Birthday Decoration"
                  width={800}
                  height={200}
                  priority
                  className="w-full h-auto"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.style.display = 'none'
                  }}
                />
              </motion.div>
              
              {/* Additional floating decorations */}
              <motion.div
                className="absolute top-8 left-1/4"
                initial={{ y: -20, rotate: -10 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-10 h-10 text-pink-400" />
              </motion.div>
              
              <motion.div
                className="absolute top-12 right-1/4"
                initial={{ y: -10, rotate: 10 }}
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <PartyPopper className="w-12 h-12 text-purple-400" />
              </motion.div>
            </>
          )}
          
          {/* Fallback decorations if image doesn't load */}
          {decorated && fallbackDecorations}
        </div>
      </div>

      {/* 🎉 ANIMATED TEXT */}
      {lit && (
        <motion.div
          className="absolute top-24 left-0 w-full z-50 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 1 }}
            />
            
            <motion.h1
              className="relative text-[32px] md:text-6xl font-bold"
              style={{
                background: "linear-gradient(45deg, #F472B6, #C084FC, #A78BFA, #F472B6)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 25px rgba(192, 132, 252, 0.5))"
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Happy Birthday, SweetHeart
              <motion.span
                className="inline-block ml-3"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                💖
              </motion.span>
            </motion.h1>
            
            {/* Subtle sparkles around text */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-pink-400" />
            </motion.div>
          </div>
          
          {/* Subtitle */}
          <motion.p
            className="mt-4 text-xl text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Make a wish and blow out the candle! 🎂
          </motion.p>
        </motion.div>
      )}

      {/* 🎂 CAKE + BUTTONS */}
      <div className="relative flex flex-col items-center gap-10 mt-60 md:mt-72 z-20">

        {/* Interactive Cake */}
        <motion.div
          className="relative mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Cake lit={lit} candleFlameSize={candleFlameSize} />
          
          {/* Glow around cake when candle is lit */}
          {lit && (
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-pink-400/10 blur-3xl rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          )}
        </motion.div>

        {/* Instructions */}
        {!decorated && (
          <motion.p
            className="text-white/60 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start by decorating the cake! ✨
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!decorated && (
            <motion.div
              key="decorate"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton onClick={decorate} className="group">
                <WandSparkles className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                Decorate the Cake
                <motion.span
                  className="ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </GradientButton>
            </motion.div>
          )}

          {decorated && !lit && (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GradientButton onClick={lightCandle} className="group">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="mr-2 text-orange-400" size={20} />
                </motion.div>
                Light the Candle
                <motion.span
                  className="ml-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔥
                </motion.span>
              </GradientButton>
            </motion.div>
          )}

          {lit && (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.8 }}
            >
              <GradientButton onClick={onNext} className="group">
                Continue Celebration
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        <motion.div
          className="flex items-center gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${decorated ? 'bg-green-500' : 'bg-gray-600'}`} />
            <span className="text-sm text-white/60">Decorated</span>
          </div>
          <div className="w-8 h-px bg-white/30" />
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${lit ? 'bg-yellow-500' : 'bg-gray-600'}`} />
            <span className="text-sm text-white/60">Candle Lit</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* 🎂 ENHANCED CAKE COMPONENT */
function Cake({ lit, candleFlameSize }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake relative z-20">
        <div className="plate"></div>
        
        {/* Cake layers with enhanced styling */}
        <motion.div 
          className="layer layer-bottom"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <motion.div 
          className="layer layer-middle"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <motion.div 
          className="layer layer-top"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>

        {/* Enhanced Candle */}
        <div className="candle relative">
          {lit && (
            <>
              {/* Flame */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  scaleY: candleFlameSize,
                  y: 0,
                  scaleX: [1, 1.1, 0.9, 1]
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                  scaleX: {
                    duration: 0.3,
                    repeat: Infinity
                  }
                }}
                className="flame"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.8))'
                }}
              />
              
              {/* Flame glow */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-400/20 blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              
              {/* Tiny sparkles from flame */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </motion.div>
            </>
          )}
        </div>
        
        {/* Decorative sprinkles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ['#FF3CAC', '#F687B3', '#D8B4FE', '#C084FC'][i % 4],
              left: `${20 + (i * 5)}%`,
              top: `${60 + Math.sin(i) * 10}%`
            }}
            animate={{ 
              y: [0, -3, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity
            }}
          />
        ))}
      </div>
      
      {/* Cake shadow */}
      <motion.div 
        className="w-48 h-6 bg-black/40 blur-md rounded-full -mt-4"
        animate={lit ? { opacity: [0.4, 0.6, 0.4] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  )
}

/* 🎂 CSS STYLES (Add to your global CSS) */
/*
.cake {
  position: relative;
  width: 200px;
  height: 120px;
}

.plate {
  width: 240px;
  height: 20px;
  background: linear-gradient(90deg, #4a5568, #718096);
  border-radius: 10px;
  position: absolute;
  bottom: -10px;
  left: -20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.layer {
  position: absolute;
  border-radius: 10px;
  box-shadow: inset 0 4px 8px rgba(255,255,255,0.1);
}

.layer-bottom {
  width: 180px;
  height: 40px;
  background: linear-gradient(90deg, #F687B3, #D8B4FE);
  bottom: 20px;
  left: 10px;
}

.layer-middle {
  width: 150px;
  height: 35px;
  background: linear-gradient(90deg, #F472B6, #C084FC);
  bottom: 55px;
  left: 25px;
}

.layer-top {
  width: 120px;
  height: 30px;
  background: linear-gradient(90deg, #EC4899, #A78BFA);
  bottom: 85px;
  left: 40px;
}

.icing {
  position: absolute;
  width: 140px;
  height: 15px;
  background: linear-gradient(90deg, #FEF3C7, #FDE68A);
  border-radius: 50% 50% 0 0;
  bottom: 100px;
  left: 30px;
  box-shadow: 0 2px 8px rgba(253, 230, 138, 0.4);
}

.drip {
  position: absolute;
  width: 15px;
  height: 20px;
  background: linear-gradient(180deg, #FDE68A, #FBBF24);
  border-radius: 0 0 8px 8px;
}

.drip1 { left: 45px; bottom: 85px; }
.drip2 { left: 90px; bottom: 90px; height: 15px; }
.drip3 { left: 135px; bottom: 85px; }

.candle {
  position: absolute;
  width: 10px;
  height: 30px;
  background: linear-gradient(180deg, #FEF3C7, #F59E0B);
  border-radius: 2px;
  bottom: 110px;
  left: 95px;
  z-index: 10;
}

.flame {
  width: 16px;
  height: 30px;
  background: linear-gradient(180deg, #FDE047, #F59E0B, #DC2626);
  border-radius: 50% 50% 20% 20%;
  position: absolute;
  bottom: 30px;
  left: -3px;
  z-index: 11;
}
*/