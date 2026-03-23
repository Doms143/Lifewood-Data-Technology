import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, TrendingUp, Users } from 'lucide-react'

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

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-[#102019] px-4 py-20 text-paper sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,179,71,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]" />
      <div className="absolute left-1/2 top-0 h-48 w-[42rem] -translate-x-1/2 rounded-full bg-white/6 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="grid gap-8 border-b border-white/12 pb-10 lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#f1c56c]">Operating scale</p>
            <h2 className="text-4xl font-semibold leading-tight text-paper sm:text-5xl">Built for Long-Term Delivery</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-paper/78">
            Our operating model combines global scale, local execution, and measurable quality controls.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.article
                  key={stat.label}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/8"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={stat.image}
                      alt={stat.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102019] via-[#102019]/20 to-transparent" />
                    <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-black/20 backdrop-blur-sm">
                      <Icon className="h-6 w-6 text-[#f4b347]" />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-4xl font-semibold text-[#f4b347] sm:text-5xl">
                      <CountUpNumber target={stat.target} suffix={stat.suffix} delay={index * 120} />
                    </p>
                    <p className="mt-3 text-lg font-semibold text-paper">{stat.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-paper/72">{stat.description}</p>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.aside
            className="flex min-h-[280px] flex-col justify-between rounded-[30px] border border-[#d7ab54]/25 bg-gradient-to-br from-[#1a2b21] to-[#132119] p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#f1c56c]">Trust signal</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-paper sm:text-3xl">
                Stable capacity with measurable output
              </h3>
            </div>

            <div className="my-8 grid gap-3">
              {['Global scale', 'Local execution', 'Measured quality controls'].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-medium text-paper/88"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="text-base leading-relaxed text-paper/78">
              Trusted by AI teams and enterprises that need stable, high-volume data operations.{' '}
              <span className="font-semibold text-[#f4b347]">Always On, Never Off.</span>
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
