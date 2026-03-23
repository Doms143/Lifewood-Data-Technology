import { motion } from 'framer-motion'

export function UnreadNotificationBadge({ count, compact = false }) {
  if (!count) return null

  if (compact) {
    return (
      <motion.span
        className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [1, 1.18, 1], opacity: 1 }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#93c5fd]/80 blur-[1px]" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#2563eb] shadow-[0_0_0_4px_rgba(191,219,254,0.45)]" />
      </motion.span>
    )
  }

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-2 py-1 text-[11px] font-semibold text-[#1d4ed8] shadow-[0_10px_30px_-18px_rgba(37,99,235,0.7)]"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: [1, 1.04, 1], opacity: 1 }}
      transition={{ duration: 1.25, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.8 }}
    >
      <motion.span
        className="relative flex h-2.5 w-2.5"
        animate={{ scale: [1, 1.35, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#60a5fa]/80" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
      </motion.span>
      <motion.span
        key={count}
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        {count}
      </motion.span>
    </motion.span>
  )
}

export function UnreadPulseDot({ size = 'sm' }) {
  const dimensionClass = size === 'md' ? 'h-3 w-3' : 'h-2.5 w-2.5'

  return (
    <motion.span
      className={`relative flex ${dimensionClass}`}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.15, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.4 }}
    >
      <span className={`absolute inline-flex h-full w-full rounded-full bg-[#60a5fa]/80 ${size === 'md' ? 'blur-[1px]' : ''}`} />
      <span className={`relative inline-flex ${dimensionClass} rounded-full bg-[#2563eb] shadow-[0_0_0_4px_rgba(191,219,254,0.38)]`} />
    </motion.span>
  )
}

export function SectionFallback({ className = 'h-40' }) {
  return (
    <div
      className={`w-full rounded-3xl border border-castleton/10 bg-white/60 shadow-soft animate-pulse ${className}`}
      aria-hidden="true"
    />
  )
}

export function NavigationFallback() {
  return <div className="h-20 w-full" aria-hidden="true" />
}
