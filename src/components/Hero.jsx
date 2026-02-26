import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import LightPillar from './LightPillar'

const Hero = ({ onContact, onLearnMore }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="hero" className="min-h-screen bg-paper px-4 sm:px-6 lg:px-8 pt-36 pb-20 flex items-center relative overflow-hidden">
      <LightPillar
        topColor="#f5b24a"
        bottomColor="#ffd58a"
        intensity={1.15}
        rotationSpeed={1.04}
        glowAmount={0.0034}
        pillarWidth={2.2}
        pillarHeight={0.4}
        noiseIntensity={0.14}
        pillarRotation={18}
        interactive={false}
        mixBlendMode="normal"
        quality="medium"
        className="opacity-90 z-0"
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a130e]/68 via-[#111810]/56 to-[#17150f]/66" />
      <div className="absolute z-0 -top-24 -right-24 w-80 h-80 rounded-full bg-white/18 blur-3xl brand-orb" />
      <div className="absolute z-0 -bottom-28 left-0 w-80 h-80 rounded-full bg-saffron/25 blur-3xl brand-orb brand-orb-delay" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6 leading-tight text-[#f3efe3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              variants={itemVariants}
            >
              Human-powered data operations for AI at global scale
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-[#e8dfca] mb-8 leading-relaxed font-light max-w-3xl mx-auto"
              variants={itemVariants}
            >
              We support organizations with data annotation, content services, and managed operations through always-on teams and quality-first delivery.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={itemVariants}>
              <button
                type="button"
                onClick={onLearnMore}
                className="focus-brand eye-catch pulse-accent bg-gradient-to-r from-castleton to-serpent text-paper font-semibold py-4 px-8 rounded-brand flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onContact}
                className="focus-brand eye-catch text-[#f3efe3] bg-white/10 border border-white/35 hover:bg-castleton hover:text-paper font-semibold py-4 px-8 rounded-brand transition-all duration-300"
              >
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
