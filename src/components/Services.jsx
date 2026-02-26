import { motion } from 'framer-motion'
import { Mic, Image, Video, FileText, Database, Cog } from 'lucide-react'
import GlareHover from './GlareHover'

const Services = () => {
  const services = [
    {
      icon: Mic,
      title: 'Audio Data Services',
      description: 'Audio collection, labeling, categorization, and transcription support for speech and voice AI workflows.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      icon: Image,
      title: 'Image Data Services',
      description: 'Image collection, annotation, classification, object tagging, and quality audits for computer vision datasets.',
      image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      icon: Video,
      title: 'Video Data Services',
      description: 'Video labeling, review, subtitle generation, and broadcast-quality data preparation for model training.',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      icon: FileText,
      title: 'Text Data Services',
      description: 'Text collection, utterance processing, sentiment analysis, and language annotation at scale.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Structured pipelines and data operations to prepare AI-ready datasets for production environments.',
      image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      icon: Cog,
      title: 'Managed AI Operations',
      description: 'Always-on managed teams that combine process governance, QA, and delivery reporting.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-sea-salt relative overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-white/40 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="diamond-bullet bg-castleton" />
            <p className="text-castleton font-semibold text-2xl sm:text-3xl tracking-tight">Our expertise</p>
          </div>
          <h2 className="text-4xl sm:text-5xl font-medium text-serpent mb-4">
            <span className="text-black">Service</span>{' '}
            <span className="text-black">Areas</span>{' '}
            <span className="text-black">That Deliver</span>
          </h2>
          <p className="text-serpent text-lg max-w-2xl mx-auto font-light">
            Practical, scalable services designed to support production AI workflows and enterprise operations.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                className="glass-card interactive-card p-8 rounded-brand"
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <GlareHover
                  glareColor="#ffffff"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  className="relative mb-6 overflow-hidden rounded-2xl h-40"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-castleton/35 via-serpent/15 to-castleton/30" />
                  <motion.div
                    className="absolute bottom-3 left-3 w-12 h-12 gloss-chip rounded-brand flex items-center justify-center"
                    whileHover={{ rotate: 8, scale: 1.04 }}
                  >
                    <IconComponent className="w-6 h-6 text-castleton" />
                  </motion.div>
                </GlareHover>
                <h3 className="text-xl font-semibold text-serpent mb-3">{service.title}</h3>
                <p className="text-serpent font-light leading-relaxed">{service.description}</p>
                <div className="mt-6 h-1 w-10 bg-saffron rounded-full" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Services


