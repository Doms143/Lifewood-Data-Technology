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
    <section id="clients-partners" className="px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4 sm:pb-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-9 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-semibold text-serpent mb-4">Our Clients And Partners</h2>
          <p className="max-w-4xl mx-auto text-black/90 text-base sm:text-lg">
            We are proud to partner and work with leading organizations worldwide in transforming data into meaningful
            solutions. Lifewood&apos;s commitment to innovation and excellence has earned the trust of global brands across
            industries.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className="partner-fade-shell rounded-2xl sm:rounded-3xl py-2 sm:py-4 overflow-hidden"
        >
          <div className="partner-loop-track">
            {loopLogos.map((src, index) => (
              <article
                key={`${src}-${index}`}
                className="partner-logo-card w-[240px] sm:w-[300px] lg:w-[360px] h-[136px] sm:h-[170px] lg:h-[204px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden"
              >
                <img
                  src={src}
                  alt="Lifewood client or partner logo"
                  className="w-full h-full object-contain partner-logo-image"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
