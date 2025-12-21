"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Heart, Sparkles, MessageCircle, Music, Star, Gift, Cake, PartyPopper, RefreshCw, Home } from "lucide-react"

export default function MessageScreen({ onNext }) {
  const [flipped, setFlipped] = useState(false);
  const [revealedLines, setRevealedLines] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinalWish, setShowFinalWish] = useState(false);
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const messageLines = [
    "Happy Birthday, Cutiepie! 🎂",
    "You deserve all the happiness, love, and smiles in the world today and always.",
    "You have this special way of making everything around you brighter - your smile, your kindness,",
    "and the way you make people feel truly cared for. ✨",
    "I hope your day is filled with laughter, surprises,",
    "and moments that make your heart happy. 💖",
    "You're truly one of a kind,",
    "and I just want you to know how special you are.",
    "Keep being the amazing person you are,",
    "spreading joy wherever you go. 🌟",
    "Wishing you endless happiness,",
    "success, and all the sweet things life has to offer. 🎁",
    "May this year bring you closer to your dreams,",
    "fill your life with beautiful memories,",
    "and surround you with people who cherish you. 🥰",
    "Here's to celebrating YOU today and always! 🥂",
    "With all my love and warmest wishes 💕"
  ];

  // Initialize floating hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-8),
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: Math.random() * 2,
          size: 12 + Math.random() * 20
        }
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Reveal message lines one by one
  useEffect(() => {
    if (!showEnvelope) {
      const timeouts = messageLines.map((_, index) => {
        return setTimeout(() => {
          setRevealedLines(prev => [...prev, index]);
          
          // Add occasional confetti for special lines
          if ([0, 5, 10, 15].includes(index)) {
            setTimeout(() => {
              confetti({
                particleCount: 30,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#F472B6', '#C084FC', '#A78BFA'],
                scalar: 0.8
              });
            }, 100);
          }
          
          // Show final wish when all lines are revealed
          if (index === messageLines.length - 1) {
            setTimeout(() => {
              setShowFinalWish(true);
            }, 1000);
          }
        }, index * 400);
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [showEnvelope]);

  const openEnvelope = () => {
    setShowEnvelope(false);
    setIsReading(true);
    
    // Celebration confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF3CAC', '#F687B3', '#D8B4FE']
    });
  };

  const handleNext = () => {
    setShowRestartDialog(true);
  };

  const handleRestart = () => {
    setIsRestarting(true);
    
    // Grand finale confetti
    const end = Date.now() + 3000;
    const colors = ['#F472B6', '#C084FC', '#A78BFA', '#EC4899', '#FBBF24', '#34D399', '#60A5FA', '#8B5CF6'];
    
    const frame = () => {
      if (Date.now() > end) return;
      
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle', 'star']
      });
      
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle', 'star']
      });
      
      confetti({
        particleCount: 8,
        angle: 90,
        spread: 120,
        origin: { y: 0.5 },
        colors: colors,
        shapes: ['circle', 'star']
      });
      
      requestAnimationFrame(frame);
    };
    
    frame();
    
    // Final mega burst
    setTimeout(() => {
      confetti({
        particleCount: 500,
        spread: 360,
        origin: { y: 0.4 },
        colors: colors,
        shapes: ['circle', 'star', 'square'],
        scalar: 1.2
      });
    }, 1000);

    // Show restart message for 3 seconds then reload
    setTimeout(() => {
      // Reset all states
      setShowRestartDialog(false);
      setIsRestarting(false);
      
      // Create restart message
      setTimeout(() => {
        // Reload the entire page to restart from beginning
        window.location.reload();
      }, 2000);
    }, 3000);
  };

  const handleCancelRestart = () => {
    setShowRestartDialog(false);
    // Proceed to next screen if user cancels restart
    setTimeout(() => {
      onNext?.();
    }, 300);
  };

  return (
    <div className="relative min-h-screen px-4 md:px-6 py-10 text-center overflow-hidden bg-gradient-to-b from-purple-950/20 via-black to-pink-950/20">
      
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
              x: `${(Math.random() - 0.5) * 30}px`
            }}
            transition={{ 
              duration: 6,
              delay: heart.delay,
              ease: "easeOut"
            }}
          >
            <Heart className={`text-pink-400/50 fill-pink-400/30`} size={heart.size} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-1/4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-10 h-10 text-pink-400/30" />
        </motion.div>
      </div>
      <div className="absolute top-20 right-1/4">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-8 h-8 text-purple-400/30" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <MessageCircle className="w-10 h-10 text-pink-400" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow leading-tight">
              A Special Message
            </h2>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <Music className="w-10 h-10 text-fuchsia-400" />
            </motion.div>
          </div>
          
          <motion.p
            className="text-white/70 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            A heartfelt message just for you, birthday star! ✨
          </motion.p>
        </motion.div>

        {/* Envelope or Message */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {showEnvelope ? (
              // Envelope View
              <motion.div
                key="envelope"
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 1.5, opacity: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative cursor-pointer"
                onClick={openEnvelope}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Envelope */}
                <div className="relative">
                  {/* Envelope back */}
                  <div className="w-80 h-56 bg-gradient-to-br from-pink-300 to-pink-200 rounded-lg shadow-2xl" />
                  
                  {/* Envelope flap */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[160px] border-r-[160px] border-b-[80px] border-l-transparent border-r-transparent border-b-pink-400" />
                  
                  {/* Seal */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center shadow-lg">
                      <Heart className="w-10 h-10 text-white fill-white" />
                    </div>
                  </motion.div>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                
                {/* Tap to open text */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="text-white/80 text-lg mb-2">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block"
                    >
                      ✨
                    </motion.span>
                    Tap the envelope to open your message!
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="inline-block ml-2"
                    >
                      ✨
                    </motion.span>
                  </p>
                  <motion.p
                    className="text-white/60 text-sm"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Your special birthday wish awaits inside...
                  </motion.p>
                </motion.div>
              </motion.div>
            ) : (
              // Message View
              <motion.div
                key="message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                {/* Decorative message container */}
                <div className="relative mx-auto max-w-3xl">
                  {/* Container glow */}
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Main message card */}
                  <motion.div
                    className="relative bg-gradient-to-br from-white via-pink-50 to-pink-100 rounded-2xl shadow-2xl p-6 md:p-10 text-left overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-20 h-20">
                      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-pink-300 rounded-tl-lg" />
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-20">
                      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-pink-300 rounded-tr-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-20 h-20">
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-pink-300 rounded-bl-lg" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20">
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-pink-300 rounded-br-lg" />
                    </div>
                    
                    {/* Message lines */}
                    <div className="space-y-4 md:space-y-6 max-h-[400px] overflow-y-auto pr-4">
                      {messageLines.map((line, index) => (
                        <AnimatePresence key={index}>
                          {revealedLines.includes(index) && (
                            <motion.div
                              initial={{ opacity: 0, x: -20, filter: "blur(5px)" }}
                              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                              transition={{ 
                                duration: 0.5,
                                delay: index * 0.05
                              }}
                              className={`text-[#4a1d72] text-lg md:text-xl leading-relaxed ${
                                index === 0 ? 'font-bold text-2xl md:text-3xl text-center py-4' :
                                index === 5 || index === 10 || index === 15 ? 'font-semibold' : ''
                              }`}
                            >
                              {line}
                              
                              {/* Sparkle for special lines */}
                              {[0, 5, 10, 15].includes(index) && (
                                <motion.span
                                  className="inline-block ml-2"
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                  <Sparkles className="w-5 h-5 inline text-yellow-500" />
                                </motion.span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      ))}
                    </div>
                    
                    {/* Reading progress indicator */}
                    <motion.div
                      className="mt-8 pt-6 border-t border-pink-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                          </motion.div>
                          <span className="text-pink-600 text-sm">
                            {Math.round((revealedLines.length / messageLines.length) * 100)}% read
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((dot) => (
                            <motion.div
                              key={dot}
                              className={`w-2 h-2 rounded-full ${
                                isReading ? 'bg-green-500' : 'bg-pink-300'
                              }`}
                              animate={isReading ? {
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              } : {}}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: dot * 0.2
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Decorative elements around card */}
                  <motion.div
                    className="absolute -top-6 -left-6"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Gift className="w-12 h-12 text-pink-400" />
                  </motion.div>
                  <motion.div
                    className="absolute -top-6 -right-6"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Star className="w-10 h-10 text-yellow-400" />
                  </motion.div>
                </div>

                {/* Final Birthday Wish Section */}
                <AnimatePresence>
                  {showFinalWish && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="mt-12"
                    >
                      {/* Final wish card */}
                      <div className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 md:p-10">
                        {/* Celebration icons */}
                        <div className="flex justify-center gap-6 mb-6">
                          <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Cake className="w-12 h-12 text-pink-400" />
                          </motion.div>
                          <motion.div
                            animate={{ y: [0, -15, 0], rotate: [-360, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <PartyPopper className="w-12 h-12 text-yellow-400" />
                          </motion.div>
                          <motion.div
                            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          >
                            <Heart className="w-12 h-12 text-red-400 fill-red-400" />
                          </motion.div>
                        </div>
                        
                        {/* Final birthday wish */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                        >
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            One More Time...
                          </h3>
                          
                          <motion.div
                            className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 mb-6"
                            animate={{
                              textShadow: [
                                "0 0 10px rgba(244, 114, 182, 0.5)",
                                "0 0 20px rgba(192, 132, 252, 0.8)",
                                "0 0 10px rgba(244, 114, 182, 0.5)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Happy 30th Birthday! 🎉
                          </motion.div>
                          
                          <p className="text-white/90 text-lg md:text-xl mb-6">
                            May this year be filled with unforgettable moments,  
                            beautiful memories, and dreams that come true.  
                            You deserve the absolute best that life has to offer!
                          </p>
                          
                          <div className="flex justify-center gap-4 text-2xl mb-6">
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            >
                              🎂
                            </motion.span>
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            >
                              🎁
                            </motion.span>
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            >
                              🥳
                            </motion.span>
                            <motion.span
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                            >
                              ✨
                            </motion.span>
                          </div>
                          
                          <motion.p
                            className="text-pink-300 font-semibold text-xl"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Wishing you a day as amazing as you are! 💝
                          </motion.p>
                        </motion.div>
                        
                        {/* Glow effect */}
                        <motion.div
                          className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl -z-10"
                          animate={{ opacity: [0.3, 0.6, 0.3] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Next Button - Only show after message is fully revealed */}
        {!showEnvelope && revealedLines.length === messageLines.length && showFinalWish && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <GradientButton
              onClick={handleNext}
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3 text-lg">
                Continue Celebration
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
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
              transition={{ delay: 2.2 }}
            >
              More surprises await! 🎉
            </motion.p>
          </motion.div>
        )}

        {/* Restart Confirmation Dialog */}
        <AnimatePresence>
          {showRestartDialog && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.target === e.currentTarget && handleCancelRestart()}
            >
              <motion.div
                className="relative w-full max-w-md bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl border border-white/20 p-6 md:p-8 shadow-2xl"
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 30 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Dialog glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10" />
                
                {/* Dialog content */}
                <div className="text-center">
                  {/* Icon */}
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-6"
                    animate={{ rotate: isRestarting ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isRestarting ? Infinity : 0, ease: "linear" }}
                  >
                    {isRestarting ? (
                      <RefreshCw className="w-10 h-10 text-white" />
                    ) : (
                      <Home className="w-10 h-10 text-white" />
                    )}
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {isRestarting ? "Restarting Celebration!" : "One More Birthday Wish! 🎂"}
                  </h3>
                  
                  {/* Message */}
                  <div className="mb-8">
                    {isRestarting ? (
                      <div className="space-y-3">
                        <p className="text-white/90 text-lg">
                          Reliving the birthday magic... ✨
                        </p>
                        <div className="flex justify-center gap-2">
                          {[1, 2, 3].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-2 h-2 bg-white rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-white/90 text-lg">
                          Would you like to experience the birthday celebration all over again?
                        </p>
                        
                        {/* Special birthday wish */}
                        <motion.div
                          className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4 border border-white/10"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-pink-200 font-semibold text-lg">
                            "Happy Birthday Once More! May your day be filled with endless joy, laughter, and beautiful surprises! 🎈"
                          </p>
                          <div className="flex justify-center gap-3 mt-3">
                            <span className="text-xl">🎂</span>
                            <span className="text-xl">🎉</span>
                            <span className="text-xl">🎁</span>
                            <span className="text-xl">✨</span>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                  
                  {/* Buttons */}
                  {!isRestarting && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        onClick={handleCancelRestart}
                        className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Continue to Next
                      </motion.button>
                      <motion.button
                        onClick={handleRestart}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-5 h-5" />
                          Restart Celebration
                        </span>
                      </motion.button>
                    </div>
                  )}
                  
                  {/* Restarting message */}
                  {isRestarting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <p className="text-white/70 text-sm">
                        The birthday celebration will restart in a moment...
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-pink-500/10 to-transparent">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 h-8 bg-pink-400/20 rounded-t-full"
              style={{
                left: `${i * 12.5}%`,
                width: '12.5%'
              }}
              animate={{
                height: [8, 20, 8]
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