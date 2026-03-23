import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cog, Database, FileText, Image, Mic, Video } from 'lucide-react'

const services = [
  {
    icon: Mic,
    title: 'Audio Data Services',
    eyebrow: 'Voice pipelines',
    description:
      'Audio collection, labeling, categorization, and transcription support for speech and voice AI workflows.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80',
    points: ['Speech collection', 'Transcription', 'Intent labeling'],
  },
  {
    icon: Image,
    title: 'Image Data Services',
    eyebrow: 'Vision datasets',
    description:
      'Image collection, annotation, classification, object tagging, and quality audits for computer vision datasets.',
    image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    points: ['Bounding boxes', 'Segmentation', 'QA review'],
  },
  {
    icon: Video,
    title: 'Video Data Services',
    eyebrow: 'Frame by frame',
    description:
      'Video labeling, review, subtitle generation, and broadcast-quality data preparation for model training.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    points: ['Sequence tagging', 'Subtitle prep', 'Temporal review'],
  },
  {
    icon: FileText,
    title: 'Text Data Services',
    eyebrow: 'Language at scale',
    description: 'Text collection, utterance processing, sentiment analysis, and language annotation at scale.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    points: ['NER tagging', 'Intent data', 'Sentiment review'],
  },
  {
    icon: Database,
    title: 'Data Engineering',
    eyebrow: 'Production-ready structure',
    description:
      'Structured pipelines and data operations to prepare AI-ready datasets for production environments.',
    image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=1200&q=80',
    points: ['Pipeline design', 'Schema prep', 'Delivery controls'],
  },
  {
    icon: Cog,
    title: 'Managed AI Operations',
    eyebrow: 'Always-on execution',
    description: 'Always-on managed teams that combine process governance, QA, and delivery reporting.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    points: ['Shift coverage', 'Governance', 'Reporting cadence'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeService = services[activeIndex]
  const ActiveIcon = activeService.icon

  return (
    <section id="services" className="relative overflow-hidden bg-sea-salt px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#efe6d1] to-transparent" aria-hidden="true" />
      <div className="absolute -left-24 top-28 h-64 w-64 rounded-full bg-saffron/18 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-castleton/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-14 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-castleton/15 bg-white/80 px-4 py-2 text-sm font-semibold text-castleton">
            <span className="h-2 w-2 rounded-full bg-saffron" />
            Lifewood delivery stack
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-serpent sm:text-5xl lg:text-6xl">
            Built for real<br />AI operations
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-serpent/75">
            Specialized execution, governed delivery, and production-ready output across six service modalities.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article
            key={activeService.title}
            className="relative overflow-hidden rounded-[32px] border border-castleton/15 bg-white shadow-[0_24px_60px_-42px_rgba(17,24,19,0.45)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            layout
          >
            <div className="grid min-h-[560px] lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative flex flex-col justify-between bg-gradient-to-br from-serpent via-castleton to-[#0d3c2d] p-8 text-white sm:p-10">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-saffron/20 blur-3xl" aria-hidden="true" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                    <ActiveIcon className="h-7 w-7 text-saffron" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f3d9a2]">{activeService.eyebrow}</p>
                  <h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {activeService.title}
                  </h3>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">{activeService.description}</p>
                </div>

                <div className="relative mt-10 space-y-2.5">
                  {activeService.points.map((point) => (
                    <div
                      key={point}
                      className="group flex items-center justify-between rounded-[18px] border border-white/15 bg-white/8 px-4 py-3 text-sm font-medium text-white/90 transition-all hover:bg-white/12 hover:border-white/25"
                    >
                      <span>{point}</span>
                      <ArrowRight className="h-4 w-4 text-saffron/80 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden bg-gradient-to-br from-[#f4efe3] to-[#eef2ec]">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="h-full w-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102019]/50 via-[#102019]/20 to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 right-6 rounded-[20px] border border-white/30 bg-white/85 px-5 py-4 backdrop-blur-md"
                  layoutId="delivery-signal"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.13em] text-serpent/80">Delivery Signal</p>
                  <p className="mt-2 text-sm font-medium leading-snug text-serpent">
                    Structured teams, quality controls, production-ready output.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.article>

          <motion.div
            className="flex h-full flex-col rounded-[32px] border border-castleton/15 bg-white/95 p-6 shadow-[0_22px_50px_-40px_rgba(17,24,19,0.35)] sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.06 }}
          >
            <div className="mb-6 rounded-[24px] border border-castleton/12 bg-gradient-to-br from-[#f7f2e6] to-[#eef2ec] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-castleton">Capability index</p>
              <p className="mt-1 text-xl font-semibold text-serpent">Choose a delivery lane</p>
              <span className="mt-3 inline-flex rounded-full bg-saffron px-3 py-1 text-xs font-semibold text-black">
                6 service tracks
              </span>
            </div>

            <motion.div
              className="space-y-2.5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {services.map((service, index) => {
                const Icon = service.icon
                const isActive = index === activeIndex

                return (
                  <motion.button
                    key={service.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    variants={cardVariants}
                    className={`group w-full rounded-[20px] border px-4 py-3.5 text-left transition-all duration-300 ${
                      isActive
                        ? 'border-serpent bg-serpent text-white shadow-[0_12px_32px_-24px_rgba(17,24,19,0.5)]'
                        : 'border-castleton/10 bg-white text-serpent hover:border-castleton/25 hover:bg-[#fdfbf7]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] ${
                          isActive ? 'bg-white/15 text-saffron' : 'bg-[#f0f3ed] text-castleton'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className={`text-xs font-semibold uppercase tracking-[0.11em] ${isActive ? 'text-white/70' : 'text-castleton/75'}`}>
                              {service.eyebrow}
                            </p>
                            <h3 className={`mt-1 text-base font-semibold leading-tight ${isActive ? 'text-white' : 'text-serpent'}`}>
                              {service.title}
                            </h3>
                          </div>
                          <span className={`shrink-0 text-xs font-semibold ${isActive ? 'text-saffron/90' : 'text-castleton/60'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
