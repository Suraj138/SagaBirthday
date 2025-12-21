"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"]

export default function CakeScreen({ onNext }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)

  const decorate = () => {
    if (decorated) return
    setDecorated(true)

    confetti({
      particleCount: 120,
      spread: 140,
      origin: { y: 0.25 },
      colors: confettiColors,
    })
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(burst, 500)
    setTimeout(burst, 1000)
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="relative min-h-screen px-4 py-10 text-center overflow-hidden bg-black">

      {/* 🎀 DECORATION PNG (GUARANTEED WORKING) */}
      {decorated && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-md pointer-events-none"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/decorations/bunting.png"
            alt="Birthday Decoration"
            width={600}
            height={200}
            priority
            className="w-full h-auto"
          />
        </motion.div>
      )}

      {/* 🎉 TEXT */}
      {lit && (
  <motion.div
    className="absolute top-20 left-0 w-full z-50
    text-center text-[28px] md:text-6xl font-bold
    text-transparent bg-clip-text
    bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 px-4"
    style={{ filter: "drop-shadow(0 0 22px rgba(255,105,180,0.45))" }}

    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: [20, 0, -10, 20],
      scale: [0.9, 1, 1, 0.9],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut",
    }}
  >
    Happy Birthday, SweetHeart 💖
  </motion.div>
)}


      {/* 🎂 CAKE + BUTTONS */}
      <div className="relative flex flex-col items-center gap-8 mt-52 z-20">

        <div className="relative mb-6">
          <Cake lit={lit} />
        </div>

        <AnimatePresence mode="wait">

          {!decorated && (
            <motion.div
              key="decorate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GradientButton onClick={decorate}>
                <WandSparkles size={20} />
                Decorate
              </GradientButton>
            </motion.div>
          )}

          {decorated && !lit && (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={20} />
                Light the Candle
              </GradientButton>
            </motion.div>
          )}

          {lit && (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
            >
              <GradientButton onClick={onNext}>
                Next
                <ArrowRight size={20} className="mt-0.5" />
              </GradientButton>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

/* 🎂 CAKE (OLD WORKING – UNCHANGED) */
function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center">
      <div className="cake relative z-20">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>

        <div className="candle">
          {lit && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="flame"
            />
          )}
        </div>
      </div>
    </div>
  )
}
