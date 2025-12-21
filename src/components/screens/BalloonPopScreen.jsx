"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Sparkles, Heart } from "lucide-react"

const BALLOONS = [
  { id: 1, color: "bg-gradient-to-b from-pink-400 to-pink-600", text: "You", shadow: "shadow-[0_8px_32px_rgba(236,72,153,0.4)]" },
  { id: 2, color: "bg-gradient-to-b from-yellow-400 to-yellow-600", text: "are", shadow: "shadow-[0_8px_32px_rgba(250,204,21,0.4)]" },
  { id: 3, color: "bg-gradient-to-b from-green-400 to-green-600", text: "a", shadow: "shadow-[0_8px_32px_rgba(34,197,94,0.4)]" },
  { id: 4, color: "bg-gradient-to-b from-blue-400 to-purple-600", text: "Birthday BABY ❤️", shadow: "shadow-[0_8px_32px_rgba(147,51,234,0.4)]" },
]

// 🔊 POP SOUND
const popSound = typeof Audio !== "undefined" ? new Audio("/sounds/pop.mp3") : null

export default function BalloonPopScreen({ onNext }) {
  const [poppedIds, setPoppedIds] = useState([])
  const [shownWords, setShownWords] = useState([])
  const [completed, setCompleted] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState([])
  const [hoveredBalloon, setHoveredBalloon] = useState(null)
  const [balloonStates, setBalloonStates] = useState(
    BALLOONS.reduce((acc, balloon) => {
      acc[balloon.id] = { isPopped: false, isVisible: true }
      return acc
    }, {})
  )

  // Add floating hearts effect
  useEffect(() => {
    if (!completed) return
    
    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: Math.random() * 2
        }
      ])
    }, 300)
    
    return () => clearInterval(interval)
  }, [completed])

  const handlePop = (balloon) => {
    // ❌ If already popped or popping, ignore
    if (balloonStates[balloon.id].isPopped || !balloonStates[balloon.id].isVisible) return

    // Immediately mark as popping to prevent multiple clicks
    setBalloonStates(prev => ({
      ...prev,
      [balloon.id]: { ...prev[balloon.id], isPopping: true }
    }))

    // Wait for pop animation to complete before hiding
    setTimeout(() => {
      setBalloonStates(prev => ({
        ...prev,
        [balloon.id]: { isPopped: true, isVisible: false }
      }))

      const updatedPopped = [...poppedIds, balloon.id]
      setPoppedIds(updatedPopped)
      setShownWords((w) => [...w, balloon.text])

      // 🔊 sound
      popSound?.play().catch(() => {})

      // 📳 vibration
      navigator.vibrate?.(60)

      // 🎀 confetti with different colors based on balloon
      let confettiColor = '#ec4899'
      if (balloon.id === 2) confettiColor = '#fbbf24'
      if (balloon.id === 3) confettiColor = '#4ade80'
      if (balloon.id === 4) confettiColor = '#8b5cf6'

      confetti({
        particleCount: 100,
        spread: 90,
        gravity: 0.8,
        origin: { y: 0.5 },
        colors: [confettiColor, '#ffffff'],
        shapes: ['circle', 'star']
      })

      // Sparkle effect around popped balloon
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          confetti({
            particleCount: 15,
            angle: 45 + (i * 45),
            spread: 40,
            origin: { x: 0.5, y: 0.5 },
            colors: [confettiColor],
            scalar: 0.8
          })
        }, i * 50)
      }

      // 🎆 LAST POP
      if (updatedPopped.length === BALLOONS.length) {
        setTimeout(() => {
          setCompleted(true)
          setShownWords([])

          // Grand finale confetti
          const end = Date.now() + 1000
          
          const frame = () => {
            if (Date.now() > end) return
            
            confetti({
              particleCount: 8,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#ec4899', '#fbbf24', '#4ade80', '#8b5cf6']
            })
            
            confetti({
              particleCount: 8,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#ec4899', '#fbbf24', '#4ade80', '#8b5cf6']
            })
            
            requestAnimationFrame(frame)
          }
          
          frame()

          // Final burst
          setTimeout(() => {
            confetti({
              particleCount: 400,
              spread: 200,
              startVelocity: 45,
              gravity: 0.8,
              decay: 0.94,
              origin: { y: 0.4 },
              colors: ['#ec4899', '#fbbf24', '#4ade80', '#8b5cf6', '#ffffff']
            })
          }, 500)
        }, 500)
      }
    }, 300) // Match this with animation duration
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* Floating Hearts Background */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{ left: `${heart.x}%` }}
            initial={{ 
              y: "100vh", 
              x: "0%", 
              opacity: 0,
              rotate: 0 
            }}
            animate={{ 
              y: "-100px", 
              x: `${(Math.random() - 0.5) * 100}px`,
              opacity: [0, 1, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: 4,
              delay: heart.delay,
              ease: "easeOut"
            }}
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* TITLE with animation */}
      {!completed && (
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <p className="text-white/90 text-lg font-medium">
              Pop all {BALLOONS.length} balloons 🎈
            </p>
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-white/60 text-sm">
            Click each balloon to reveal the message
          </p>
        </motion.div>
      )}

      {/* 🎈 BALLOONS - Only show unpopped balloons */}
      {!completed && (
        <div className="flex gap-6 sm:gap-10 mb-12 flex-wrap justify-center">
          {BALLOONS.map((b) => {
            const balloonState = balloonStates[b.id]
            
            // Don't render if not visible
            if (!balloonState.isVisible) return null
            
            return (
              <motion.div
                key={b.id}
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => handlePop(b)}
                onMouseEnter={() => !balloonState.isPopping && setHoveredBalloon(b.id)}
                onMouseLeave={() => setHoveredBalloon(null)}
                initial={{ y: 40, opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: balloonState.isPopping ? [0, -50, 100] : [0, -15, 0],
                  opacity: balloonState.isPopping ? [1, 0.5, 0] : 1,
                  scale: balloonState.isPopping ? [1, 1.4, 0] : hoveredBalloon === b.id ? 1.1 : 1,
                  rotate: balloonState.isPopping ? [0, 15, -15, 0] : 0
                }}
                transition={{
                  duration: balloonState.isPopping ? 0.5 : 2.8,
                  repeat: balloonState.isPopping ? 0 : Infinity,
                  ease: "easeInOut",
                  y: balloonState.isPopping ? undefined : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ scale: balloonState.isPopping ? 1 : 1.15 }}
                whileTap={{ scale: balloonState.isPopping ? 1 : 0.95 }}
              >
                {/* Balloon with shine effect */}
                <div className="relative">
                  <motion.div
                    className={`w-20 h-24 rounded-full ${b.color} ${b.shadow} 
                      group-hover:shadow-[0_12px_48px_rgba(255,255,255,0.3)] 
                      transition-shadow duration-300 relative overflow-hidden`}
                    animate={!balloonState.isPopping && hoveredBalloon === b.id ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    {/* Shine effect - only if not popping */}
                    {!balloonState.isPopping && (
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 1
                        }}
                      >
                        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Pop hint */}
                  <motion.div
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                      text-xs text-white/70 bg-black/30 px-2 py-1 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: !balloonState.isPopping && hoveredBalloon === b.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Click to pop!
                  </motion.div>
                </div>

                {/* String with sway animation - only if not popping */}
                {!balloonState.isPopping && (
                  <motion.div 
                    className="flex flex-col items-center"
                    animate={hoveredBalloon === b.id ? {
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-px h-16 bg-gradient-to-b from-white/90 via-white/50 to-transparent mt-1" />
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-800 to-amber-600 mt-1" />
                  </motion.div>
                )}
                
                {/* Pop animation overlay */}
                {balloonState.isPopping && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 2] }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/30 blur-md" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* 📝 WORDS with better animation */}
      {!completed && shownWords.length > 0 && (
        <motion.div 
          className="flex gap-4 mb-10 min-h-[40px] items-center justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {shownWords.map((word, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4,
                delay: i * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent px-3 py-1">
                {word}
              </span>
              <motion.div
                className="absolute inset-0 border-2 border-pink-400/30 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Progress indicator */}
      {!completed && poppedIds.length > 0 && (
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${(poppedIds.length / BALLOONS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-white/70 text-sm font-medium">
              {poppedIds.length}/{BALLOONS.length}
            </span>
          </div>
        </motion.div>
      )}

      {/* 💖 FINAL TEXT with enhanced animation */}
      {completed && (
        <>
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Glowing background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            
            {["You", "are", "a", "Birthday", "BABY", "❤️"].map((word, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  delay: i * 0.2,
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }
                }}
              >
                <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
                  {word}
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-lg rounded-full -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 + 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Celebration message */}
          <motion.p
            className="text-white/80 mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            🎉 Yay! You did it! 🎉
          </motion.p>

          {/* Next button with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              delay: 2.5,
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }
            }}
          >
            <GradientButton onClick={onNext} className="group">
              <span className="flex items-center gap-2">
                Continue Celebration 
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            </GradientButton>
          </motion.div>
        </>
      )}
    </div>
  )
}