"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function LoaderScreen({ onDone }) {
  const [count, setCount] = useState(3)
  const [completed, setCompleted] = useState(false)
  const countRef = useRef(3)
  const timeoutRef = useRef(null)

  // Simple and reliable countdown
  useEffect(() => {
    // Reset count
    setCount(3)
    countRef.current = 3
    
    const startCountdown = () => {
      if (countRef.current > 0) {
        // Update count
        const newCount = countRef.current - 1
        setCount(newCount)
        countRef.current = newCount
        
        // Continue countdown if not at 0
        if (newCount > 0) {
          timeoutRef.current = setTimeout(startCountdown, 900)
        } else {
          // Countdown completed
          setCompleted(true)
          
          // Celebration confetti
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 120,
              origin: { y: 0.6 },
              colors: ['#F472B6', '#C084FC']
            })
            
            // Go to next screen
            setTimeout(() => {
              onDone?.()
            }, 800)
          }, 300)
        }
      }
    }

    // Start countdown after initial render
    timeoutRef.current = setTimeout(startCountdown, 900)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onDone])

  const getMessage = () => {
    const messages = {
      3: "Creating birthday magic... ✨",
      2: "Loading surprises... 🎁",
      1: "Almost ready! 🎉",
      0: "Ready! Let's celebrate! 🥳"
    }
    return messages[count] || messages[0]
  }

  return (
    <div className="relative w-full min-h-screen grid place-items-center overflow-hidden bg-gradient-to-b from-purple-950/20 via-black to-pink-950/20">
      
      {/* Simple background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-10 px-4">
        
        {/* Main loader container */}
        <div className="relative">
          
          {/* Simple spinner ring */}
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <motion.div
              className="absolute inset-0 border-4 border-transparent rounded-full"
              style={{
                borderImage: "linear-gradient(45deg, #F472B6, #C084FC) 1",
                borderImageSlice: 1
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Simple spinner */}
            <motion.div
              className="absolute inset-4 border-4 border-transparent rounded-full"
              style={{
                borderImage: "linear-gradient(45deg, transparent, transparent, #F472B6, #C084FC) 1",
                borderImageSlice: 1
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Countdown number - Simple approach */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {!completed ? (
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-8xl md:text-9xl font-black leading-none select-none"
              >
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400 
                  drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  {count}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-8xl md:text-9xl font-black leading-none"
              >
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 
                  drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  🎉
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="text-center space-y-6 max-w-xl">
          {/* Main message */}
          <motion.h1
            key={count}
            className="text-3xl md:text-4xl font-bold py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400">
              {getMessage()}
            </span>
          </motion.h1>
          
          {/* Progress dots - Show 3 dots, highlight current */}
          <div className="flex justify-center gap-3">
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className={`w-3 h-3 rounded-full ${
                  dot <= count ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/30'
                }`}
                animate={dot === count ? {
                  scale: [1, 1.3, 1]
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity 
                }}
              />
            ))}
          </div>
          
          {/* Celebration message */}
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <p className="text-xl text-pink-300 font-semibold">
                Surprise loaded! 🎂
              </p>
              <div className="flex justify-center gap-3 mt-2">
                <span className="text-2xl">✨</span>
                <span className="text-2xl">🎁</span>
                <span className="text-2xl">🥳</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Simple bottom decoration */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-8 bg-gradient-to-t from-pink-500/20 to-transparent rounded-full"
            animate={{
              height: [8, 16, 8]
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}