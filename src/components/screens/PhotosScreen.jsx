"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/navigation"
import "swiper/css/pagination"
import confetti from "canvas-confetti"
import { Mail, Heart, Star, Sparkles, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Play, Pause } from "lucide-react"
import GradientButton from "../GradientButton"

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [floatingHearts, setFloatingHearts] = useState([])
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [loadedImages, setLoadedImages] = useState({})

  // 11 images for the birthday surprise
  const photos = [
    "/images/IMG1.jpeg",
    "/images/IMG2.jpeg",
    "/images/IMG3.jpeg",
    "/images/IMG4.jpeg",
    "/images/IMG5.jpeg",
    "/images/IMG6.jpeg",
    "/images/IMG7.jpeg",
    "/images/IMG8.jpeg",
    "/images/IMG9.jpeg",
    "/images/IMG10.jpeg",
    "/images/IMG11.jpeg",
  ]

  // Add floating hearts effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-5),
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: 12 + Math.random() * 20,
          delay: Math.random() * 2
        }
      ])
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Auto-play slides
  useEffect(() => {
    if (!isPlaying || !swiperRef.current) return

    const interval = setInterval(() => {
      if (swiperRef.current) {
        if (currentIndex === photos.length - 1) {
          swiperRef.current.slideTo(0)
        } else {
          swiperRef.current.slideNext()
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, currentIndex, photos.length])

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex)
    
    // Celebration on every few slides
    if (swiper.activeIndex % 3 === 0) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F472B6', '#C084FC'],
        scalar: 0.7
      })
    }
  }

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }))
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleZoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(zoomLevel + 0.5)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.5)
    }
  }

  const openFullscreen = () => {
    setShowFullscreen(true)
  }

  const closeFullscreen = () => {
    setShowFullscreen(false)
  }

  const handleNext = () => {
    // Celebration before next screen
    confetti({
      particleCount: 200,
      spread: 180,
      origin: { y: 0.5 },
      colors: ['#FF3CAC', '#F687B3', '#D8B4FE', '#C084FC']
    })

    setTimeout(() => {
      onNext?.()
    }, 800)
  }

  return (
    <div className="relative min-h-screen px-4 md:px-6 py-10 overflow-hidden bg-gradient-to-b from-purple-950/20 via-black to-pink-950/20">
      
      {/* Floating Hearts Background */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none z-0"
            style={{ left: `${heart.x}%` }}
            initial={{ 
              y: "100vh", 
              opacity: 0,
              rotate: 0 
            }}
            animate={{ 
              y: "-100px", 
              opacity: [0, 1, 0],
              rotate: 360,
              x: `${(Math.random() - 0.5) * 50}px`
            }}
            transition={{ 
              duration: 8,
              delay: heart.delay,
              ease: "easeOut"
            }}
          >
            <Heart className="text-pink-400/40 fill-pink-400/20" size={heart.size} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-12 h-12 text-purple-400/20" />
        </motion.div>
      </div>
      <div className="absolute bottom-40 right-10">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-14 h-14 text-pink-400/20" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-8 h-8 text-pink-400" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow">
              Sweet Moments Collection
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8 text-fuchsia-400" />
            </motion.div>
          </div>
          
          <motion.p
            className="text-white/80 text-lg md:text-xl mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {photos.length} precious memories just for you ✨
          </motion.p>
          
          {/* Progress indicator */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-pink-300 text-sm">
                Photo {currentIndex + 1} of {photos.length}
              </span>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Gallery Container */}
      <div className="relative flex flex-col items-center gap-8">
        
        {/* Swiper Container */}
        <div className="relative">
          {/* Controls overlay */}
          <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-between px-4 md:px-8 -translate-y-1/2">
            <motion.button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-pink-500/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-purple-500/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Swiper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
          >
            {/* Glow effect around swiper */}
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <Swiper
              effect="cards"
              grabCursor={true}
              modules={[EffectCards, Navigation, Pagination, Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={handleSlideChange}
              className="w-[300px] h-[450px] md:w-[380px] md:h-[520px] lg:w-[420px] lg:h-[580px]"
              autoplay={isPlaying ? {
                delay: 3000,
                disableOnInteraction: false,
              } : false}
            >
              {photos.map((src, i) => (
                <SwiperSlide key={i}>
                  <motion.div
                    className="h-full w-full rounded-2xl overflow-hidden relative group"
                    style={{ transform: `scale(${zoomLevel})` }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Loading skeleton */}
                    <AnimatePresence>
                      {!loadedImages[i] && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-pink-900/20 to-purple-900/20 rounded-2xl"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-12 h-12 text-pink-400/30" />
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Image */}
                    <img
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className={`h-full w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                        loadedImages[i] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(i)}
                      loading="lazy"
                    />
                    
                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Image number badge */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded-full">
                      #{i + 1}
                    </div>
                    
                    {/* Like button */}
                    <motion.button
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        confetti({
                          particleCount: 30,
                          spread: 40,
                          origin: { x: 0.8, y: 0.1 },
                          colors: ['#F472B6'],
                          scalar: 0.6
                        })
                      }}
                    >
                      <Heart className="w-5 h-5 text-white" />
                    </motion.button>
                    
                    {/* Zoom/fullscreen button */}
                    <motion.button
                      className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={openFullscreen}
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </motion.button>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>

        {/* Control Panel */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Play/Pause */}
          <motion.button
            onClick={togglePlayPause}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span className="text-white text-sm">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span className="text-white text-sm">Play</span>
              </>
            )}
          </motion.button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 1}
              className={`p-2 rounded-full ${zoomLevel <= 1 ? 'bg-white/10' : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabledClassName="opacity-50 cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5" />
            </motion.button>
            
            <span className="text-white text-sm min-w-[60px] text-center">
              {zoomLevel.toFixed(1)}x
            </span>
            
            <motion.button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 3}
              className={`p-2 rounded-full ${zoomLevel >= 3 ? 'bg-white/10' : 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabledClassName="opacity-50 cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2">
            {photos.slice(0, 8).map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === i
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-6'
                    : 'bg-white/30'
                }`}
              />
            ))}
            {photos.length > 8 && (
              <span className="text-white/60 text-xs flex items-center">
                +{photos.length - 8}
              </span>
            )}
          </div>
        </motion.div>

        {/* Memory Counter */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-white/70 text-sm mb-2">
            {["Precious moment", "Beautiful memory", "Happy time", "Special memory"][currentIndex % 4]} captured forever 💫
          </p>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: photos.length }).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  i <= currentIndex
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Next Button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <GradientButton
            onClick={handleNext}
            className="group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3 text-lg">
              <Mail className="w-6 h-6" />
              Open My Heartfelt Message
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💌
              </motion.div>
            </span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </GradientButton>
          
          <motion.p
            className="mt-4 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Continue to your special birthday message 🎂
          </motion.p>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFullscreen}
          >
            <motion.div
              className="relative max-w-4xl max-h-[80vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[currentIndex]}
                alt={`Fullscreen memory ${currentIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <button
                onClick={closeFullscreen}
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <ZoomOut className="w-6 h-6 text-white" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm">
                  Memory {currentIndex + 1} of {photos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-pink-500/10 via-purple-500/10 to-transparent">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 h-6 bg-gradient-to-t from-pink-400/20 to-transparent rounded-t-full"
              style={{
                left: `${i * 12.5}%`,
                width: '12.5%'
              }}
              animate={{
                height: [6, 16, 6]
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
    </div>
  )
}