import { motion } from 'framer-motion'
import { Facebook, LinkedinIcon, Mail, MapPin, Phone, TwitterIcon } from 'lucide-react'

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

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0f1a15] text-paper">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,179,71,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />

      <div className="relative px-4 pb-10 pt-6 sm:px-6 sm:pb-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-[#13211b] to-[#0d1713]"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, amount: 0.16 }}
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <img
                  src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                  alt="Lifewood logo"
                  className="h-9 w-auto"
                />
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/78">
                  Powering AI with human intelligence through premium data solutions and services. Always On, Never Off.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/contact-us"
                    className="focus-brand inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Contact Team
                  </a>
                  {[
                    {
                      href: 'https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all',
                      icon: LinkedinIcon,
                    },
                    { href: 'https://x.com/LifewoodPH', icon: TwitterIcon },
                    { href: 'https://www.facebook.com/LifewoodPH/', icon: Facebook },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/6 text-paper"
                        whileHover={{ y: -3 }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-8 p-6 sm:grid-cols-3 sm:p-8">
                <div>
                  <h4 className="text-lg font-semibold text-paper">Services</h4>
                  <ul className="mt-5 space-y-3">
                    {serviceLinks.map((item) => (
                      <li key={item.label}>
                        <a href={item.href} className="brand-link text-sm text-paper/78">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-paper">Company</h4>
                  <ul className="mt-5 space-y-3">
                    {companyLinks.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noreferrer' : undefined}
                          className="brand-link text-sm text-paper/78"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-paper">Get In Touch</h4>
                  <ul className="mt-5 space-y-4">
                    <li className="flex gap-3">
                      <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f4b347]" />
                      <a href="mailto:hr.lifewood@gmail.com" className="brand-link text-sm text-paper/78">
                        hr.lifewood@gmail.com
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f4b347]" />
                      <a href="tel:+15551234567" className="brand-link text-sm text-paper/78">
                        +1 (555) 123-4567
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f4b347]" />
                      <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="brand-link text-sm text-paper/78">
                        Global Headquarters
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 text-sm text-paper/70 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p>&copy; {currentYear} Lifewood Data Technology. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link text-paper/70">
                Privacy Policy
              </a>
              <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link text-paper/70">
                Terms of Service
              </a>
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link text-paper/70">
                Cookie Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
