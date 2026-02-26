import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, Users, TrendingUp } from 'lucide-react'
import GlareHover from './GlareHover'

const CountUpNumber = ({ target, suffix = '', duration = 1400, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.7 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime
    let rafId
    let timeoutId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) rafId = window.requestAnimationFrame(animate)
    }

    timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(animate)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      window.cancelAnimationFrame(rafId)
    }
  }, [delay, duration, isInView, target])

  return (
    <span ref={ref}>
      {new Intl.NumberFormat('en-US').format(value)}
      {suffix}
    </span>
  )
}

const Stats = () => {
  const stats = [
    {
      icon: Globe,
      target: 30,
      suffix: '+',
      label: 'Countries Served',
      description: 'Distributed delivery coverage across regions and time zones.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    },
    {
      icon: Users,
      target: 10000,
      suffix: '+',
      label: 'Team Members',
      description: 'Skilled specialists supporting data, QA, and operations.',
      image: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?auto=format&fit=crop&w=1000&q=80',
    },
    {
      icon: TrendingUp,
      target: 500,
      suffix: 'M+',
      label: 'Data Units Processed',
      description: 'Consistent, quality-controlled output at enterprise volume.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1000&q=80',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 bg-serpent relative overflow-hidden">
      <div className="absolute inset-0 bg-serpent-glow" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-medium mb-4 text-paper">
            Built for Long-Term Delivery
          </h2>
          <p className="text-paper font-light text-lg max-w-2xl mx-auto opacity-90">
            Our operating model combines global scale, local execution, and measurable quality controls.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                className="glass-card interactive-card rounded-brand p-8 text-center"
                variants={itemVariants}
              >
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className="relative h-28 mb-6 overflow-hidden rounded-2xl border border-castleton/15"
                >
                  <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                </GlareHover>
                <motion.div
                  className="w-16 h-16 gloss-chip rounded-brand flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <IconComponent className="w-8 h-8 text-castleton" />
                </motion.div>

                <h3 className="text-5xl font-semibold text-saffron mb-2">
                  <CountUpNumber target={stat.target} suffix={stat.suffix} delay={index * 120} />
                </h3>
                <p className="text-xl font-semibold text-serpent mb-3">{stat.label}</p>
                <p className="text-serpent font-light">{stat.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          className="mt-16 p-8 glass-card interactive-card rounded-brand border border-saffron/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-serpent font-light">
            Trusted by AI teams and enterprises that need stable, high-volume data operations. <span className="font-semibold text-castleton">Always On, Never Off.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats


