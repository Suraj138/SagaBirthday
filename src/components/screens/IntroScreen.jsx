"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { Gift, Sparkles, Heart, PartyPopper, Star, Music } from "lucide-react"

export default function IntroScreen({ onNext }) {
  const [isHovering, setIsHovering] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)

  // Simple pulse animation
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseAnimation(true)
      setTimeout(() => setPulseAnimation(false), 1000)
    }, 4000)
    
    return () => clearInterval(pulseInterval)
  }, [])

  useEffect(() => {
    // Show text after a short delay
    setTimeout(() => setTextVisible(true), 300)
  }, [])

  const getRandomColor = () => {
    const colors = ['#F472B6', '#C084FC', '#A78BFA', '#FBBF24', '#34D399', '#60A5FA']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleStart = () => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF3CAC', '#F687B3', '#D8B4FE', '#C084FC', '#F472B6'],
    })
    
    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F472B6', '#C084FC']
      })
      
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F472B6', '#C084FC']
      })
    }, 200)
    
    // Call onNext after a short delay
    setTimeout(() => {
      onNext?.()
    }, 500)
  }

  return (
    <div className="relative min-h-screen py-10 md:py-14 text-center overflow-hidden bg-gradient-to-b from-purple-950/30 via-black to-pink-950/30">
      
      {/* Simple background elements - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10 px-4">
        
        {/* Animated GIF with container */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            duration: 1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Glow effect around image */}
          <motion.div
            className="absolute -inset-8 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
            animate={pulseAnimation ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            } : {}}
            transition={{ duration: 1 }}
          />
          
          <motion.div
            className="relative"
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src="/gifs/intro.gif"
              alt="Cute birthday animation topper"
              className="w-[160px] md:w-[220px] object-cover rounded-2xl border-4 border-white/20 shadow-2xl"
              style={{
                boxShadow: "0 0 40px rgba(255, 105, 180, 0.5)"
              }}
            />
            
            {/* Sparkle effects around image */}
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-7 h-7 text-pink-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <div className="space-y-6 max-w-4xl">
          {textVisible && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-pretty text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow"
                  style={{
                    filter: "drop-shadow(0 0 25px rgba(255,105,180,0.5))",
                    backgroundSize: "200% 200%"
                  }}>
                  A Cutiepie was born
                </span>
                <br />
                <motion.span
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  today, 30 years ago!
                </motion.span>
              </h1>
              
              {/* Birthday cake emoji animation */}
              <motion.div
                className="inline-flex items-center gap-2 mt-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl">🎂</span>
                <span className="text-3xl">🎉</span>
                <span className="text-3xl">🎁</span>
              </motion.div>
            </motion.div>
          )}

          {textVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="mt-6 text-xl md:text-2xl text-pink-200/90">
                Yes, it's{" "}
                <motion.span
                  className="font-bold text-white"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.5)",
                      "0 0 20px rgba(255,105,180,0.8)",
                      "0 0 10px rgba(255,255,255,0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  YOU!
                </motion.span>{" "}
                A little surprise awaits...
              </p>
              
              {/* Animated dots */}
              <motion.div
                className="flex justify-center gap-1 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {[1, 2, 3].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2 h-2 bg-pink-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Start button with enhanced animation */}
        <motion.div
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <GradientButton
            onClick={handleStart}
            className="group relative overflow-hidden"
          >
            {/* Button glow effect */}
            {isHovering && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            
            <span className="relative flex items-center gap-3 text-lg md:text-xl">
              <motion.div
                animate={isHovering ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Gift size={24} />
              </motion.div>
              
              <motion.span
                animate={isHovering ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                Start the surprise
              </motion.span>
              
              <motion.div
                animate={isHovering ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                ✨
              </motion.div>
            </span>
          </GradientButton>
          
          {/* Instruction text */}
          <motion.p
            className="mt-4 text-sm text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Click to begin the birthday celebration! 🎊
          </motion.p>
        </motion.div>

        {/* Celebration countdown */}
        <motion.div
          className="mt-12 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="flex items-center gap-4">
            <PartyPopper className="w-6 h-6 text-yellow-400" />
            <span className="text-white/80">
              Get ready for interactive surprises, animations, and confetti!
            </span>
            <PartyPopper className="w-6 h-6 text-pink-400" />
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-16 bg-gradient-to-t from-pink-500/30 to-transparent rounded-full"
            animate={{
              height: [16, 48, 16],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}