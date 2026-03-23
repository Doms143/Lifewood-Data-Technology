import { motion } from 'framer-motion'

const partnerLogos = [
  'https://framerusercontent.com/images/cjJDncfOy71yWizT3ZRdsZB4W0.png',
  'https://framerusercontent.com/images/HWbvpkExIBUbdXEGILLSX4PTcEE.png',
  'https://framerusercontent.com/images/m37jhLfPRl449iXOe8op7cY68c.png',
  'https://framerusercontent.com/images/Yq2A1QFJLXgGQ3b7NZPthsD9RBk.png',
  'https://framerusercontent.com/images/2rRd2Mk1HzeDgPbL0e8wwkUPo.png',
  'https://framerusercontent.com/images/5mxPuoDvu4IebUtQtNowrZOfWSg.png',
  'https://framerusercontent.com/images/RyIkooWlUn6nQYbljETePWzd2Ac.png',
]

export default function OurClientsPartners() {
  const loopLogos = [...partnerLogos, ...partnerLogos]

  return (
    <section id="clients-partners" className="px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-10 rounded-[30px] border border-castleton/12 bg-white/75 p-6 shadow-[0_20px_48px_-40px_rgba(17,24,19,0.35)] sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-castleton">Global trust</p>
              <h2 className="text-3xl font-semibold leading-tight text-serpent sm:text-5xl">Our Clients And Partners</h2>
            </div>
            <p className="max-w-4xl text-base leading-relaxed text-black/80 sm:text-lg">
              We are proud to partner and work with leading organizations worldwide in transforming data into meaningful
              solutions. Lifewood&apos;s commitment to innovation and excellence has earned the trust of global brands across
              industries.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-hidden rounded-[32px] border border-castleton/10 bg-gradient-to-b from-[#fbf8f0] to-[#f3ecdb] px-0 py-6 shadow-[0_22px_50px_-44px_rgba(17,24,19,0.4)]"
        >
          <div className="partner-fade-shell overflow-hidden py-1">
            <div className="partner-loop-track">
              {loopLogos.map((src, index) => (
                <article
                  key={`${src}-${index}`}
                  className="mx-2 flex h-[136px] w-[240px] shrink-0 items-center justify-center rounded-[26px] border border-castleton/10 bg-white px-6 sm:h-[170px] sm:w-[300px] lg:h-[204px] lg:w-[360px]"
                >
                  <img
                    src={src}
                    alt="Lifewood client or partner logo"
                    className="h-full w-full object-contain partner-logo-image"
                    loading="lazy"
                  />
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
