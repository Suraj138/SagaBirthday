"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight } from "lucide-react"

const balloons = [
  { id: 1, color: "bg-pink-400", text: "You" },
  { id: 2, color: "bg-yellow-400", text: "are" },
  { id: 3, color: "bg-green-400", text: "a" },
  { id: 4, color: "bg-blue-400", text: "Birthday BABY ❤️" },
]

// 🔊 POP SOUND
const popSound =
  typeof Audio !== "undefined"
    ? new Audio("/sounds/pop.mp3")
    : null

export default function BalloonPopScreen({ onNext }) {
  const [popped, setPopped] = useState([])

  const pop = (id) => {
    if (popped.includes(id)) return

    setPopped((prev) => [...prev, id])

    // 🔊 sound
    if (popSound) {
      popSound.currentTime = 0
      popSound.play().catch(() => {})
    }

    // 📳 vibration (mobile)
    if (navigator.vibrate) {
      navigator.vibrate(60)
    }

    // 🎉 normal confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
    })

    // 🎆 LAST BALLOON = MEGA CONFETTI
    if (popped.length + 1 === balloons.length) {
      setTimeout(() => {
        confetti({
          particleCount: 260,
          spread: 160,
          startVelocity: 45,
          gravity: 0.9,
          origin: { y: 0.4 },
        })
      }, 300)
    }
  }

  const allDone = popped.length === balloons.length

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      {!allDone && (
        <motion.p
          className="text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Pop all the balloons 🎈
        </motion.p>
      )}

      {/* 🎈 BALLOONS */}
      <div className="flex gap-6 mb-12">
        {balloons.map((b) => (
          <AnimatePresence key={b.id}>
            {!popped.includes(b.id) && (
              <motion.div
                onClick={() => pop(b.id)}
                className={`w-16 h-20 rounded-full cursor-pointer ${b.color}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{
                  y: [0, -12, 0],
                  opacity: 1,
                }}
                exit={{
                  scale: [1, 1.6, 0],
                  rotate: [0, 20, -20],
                  opacity: 0,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* 💖 TEXT AFTER ALL POP */}
      {allDone && (
        <>
          <motion.div className="flex flex-wrap justify-center gap-3 mb-10">
            {["You", "are", "a", "Birthday", "BABY ❤️"].map((word, i) => (
              <motion.span
                key={i}
                className="text-3xl sm:text-4xl font-bold text-pink-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <GradientButton onClick={onNext}>
              Next <ArrowRight size={18} />
            </GradientButton>
          </motion.div>
        </>
      )}
    </div>
  )
}
