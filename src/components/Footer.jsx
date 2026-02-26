import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, LinkedinIcon, TwitterIcon, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const serviceLinks = [
    { label: 'Data Annotation', href: '#services' },
    { label: 'AI Solutions', href: '#services' },
    { label: 'Content Moderation', href: '#services' },
    { label: 'Analytics', href: '#stats' },
  ]
  const companyLinks = [
    { label: 'About Us', href: '#hero' },
    { label: 'Careers', href: 'https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all', external: true },
    { label: 'Blog', href: 'https://medium.com', external: true },
    { label: 'Contact', href: '#contact' },
  ]

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer id="contact" className="bg-serpent text-paper relative overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-10 sm:pb-12 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 rounded-3xl p-6 sm:p-8 border border-white/15 bg-serpent"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <img
                src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                alt="Lifewood logo"
                className="h-9 w-auto mb-4"
              />
              <p className="text-paper font-light mb-6">
                Powering AI with human intelligence through premium data solutions and services. Always On, Never Off.
              </p>
              <a
                href="/contact-us"
                className="focus-brand inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-4 py-2 text-sm font-semibold text-paper hover:bg-white/20 transition-colors mb-6"
              >
                Contact Team
              </a>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-brand flex items-center justify-center border border-white/30 bg-white/10 text-paper"
                  whileHover={{ scale: 1.1 }}
                >
                  <LinkedinIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://x.com/LifewoodPH"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-brand flex items-center justify-center border border-white/30 bg-white/10 text-paper"
                  whileHover={{ scale: 1.1 }}
                >
                  <TwitterIcon className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/LifewoodPH/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-brand flex items-center justify-center border border-white/30 bg-white/10 text-paper"
                  whileHover={{ scale: 1.1 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-paper">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="brand-link text-paper font-light">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-paper">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      className="brand-link text-paper font-light"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-paper">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 text-paper flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:hr.lifewood@gmail.com"
                    className="brand-link text-paper font-light"
                  >
                    hr.lifewood@gmail.com
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 text-paper flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+15551234567"
                    className="brand-link text-paper font-light"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-paper flex-shrink-0 mt-0.5" />
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="brand-link text-paper font-light"
                  >
                    Global Headquarters
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="border-t border-paper border-opacity-20 my-5" />

          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-paper font-light text-sm">
              &copy; {currentYear} Lifewood Data Technology. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link text-paper font-light text-sm">
                Privacy Policy
              </a>
              <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link text-paper font-light text-sm">
                Terms of Service
              </a>
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link text-paper font-light text-sm">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

