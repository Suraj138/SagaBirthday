"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import BalloonPopScreen from "@/components/screens/BalloonPopScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  const screens = [
    // 0
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,

    // 1
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} />,

    // 2
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} />,

    // 3 👉 NEW BALLOON POP SCREEN
    <BalloonPopScreen key="balloon" onNext={() => setCurrentScreen(4)} />,

    // 4
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,

    // 5
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${
              currentScreen === 4
                ? "max-w-7xl"
                : "max-w-3xl md:max-w-4xl"
            }`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light"
      >
        SAGAWEB
      </motion.div>
    </main>
  )
}
