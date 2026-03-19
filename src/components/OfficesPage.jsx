import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import OfficesMap from './OfficesMap'

export default function OfficesPage({
  officesStatsVisible,
  onStatsEnter,
  officeRegions,
  selectedOfficeRegion,
  onSelectRegion,
  officesForSelectedRegion,
  CountUpStatComponent,
  onNavigateContact,
}) {
  return (
    <section className="max-w-6xl mx-auto space-y-8 relative text-black">
      <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

      <motion.div
        id="offices-overview"
        className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true, amount: 0.35 }}
        onViewportEnter={onStatsEnter}
      >
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
        <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Offices</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">
          Largest Global Data Collection Resources Distribution
        </h1>
        <p className="text-black text-lg max-w-4xl mx-auto">
          Based on Lifewood&apos;s published offices footprint, we maintain a worldwide delivery presence with
          extensive online resources and operational coverage across global regions.
        </p>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-4xl">
          <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
            <p className="text-3xl sm:text-4xl font-semibold text-castleton">
              <CountUpStatComponent end={56788} useGrouping start={officesStatsVisible} />
            </p>
            <p className="text-sm sm:text-base text-black/80">Online Resources</p>
          </div>
          <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
            <p className="text-3xl sm:text-4xl font-semibold text-castleton">
              <CountUpStatComponent end={30} suffix="+" start={officesStatsVisible} />
            </p>
            <p className="text-sm sm:text-base text-black/80">Countries</p>
          </div>
          <div className="bg-[#f3f3f3] border border-castleton/15 rounded-2xl py-4 px-4">
            <p className="text-3xl sm:text-4xl font-semibold text-castleton">
              <CountUpStatComponent end={40} suffix="+" start={officesStatsVisible} />
            </p>
            <p className="text-sm sm:text-base text-black/80">Centers</p>
          </div>
        </div>
      </motion.div>

      <motion.section
        id="offices-map"
        className="rounded-3xl p-5 sm:p-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04 }}
      >
        <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-3xl sm:text-4xl font-medium">Lifewood Worldwide Pins</h2>
          <p className="text-sm sm:text-base text-black/75">
            Click a region to focus the map to that regional footprint.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          <aside className="lg:col-span-1 rounded-3xl border border-castleton/15 bg-[#f3f3f3] p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-3">Regions</p>
            <ul className="space-y-2">
              {officeRegions.map((item) => {
                const isActive = selectedOfficeRegion === item.region
                return (
                  <li key={item.region}>
                    <button
                      type="button"
                      onClick={() => onSelectRegion(item.region)}
                      className={`focus-brand w-full rounded-2xl border px-3 py-2.5 text-left transition-all flex items-center justify-between gap-2 ${
                        isActive
                          ? 'bg-serpent text-white border-serpent shadow-soft'
                          : 'bg-white border-castleton/15 text-black hover:border-castleton/30'
                      }`}
                    >
                      <span className="font-semibold text-sm sm:text-base">{item.region}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-castleton/10 text-castleton'}`}>
                        {item.count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 rounded-2xl border border-castleton/15 bg-white p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-1">Selected</p>
              <p className="text-base font-semibold text-black">{selectedOfficeRegion}</p>
              <p className="text-sm text-black/70">
                {officesForSelectedRegion.length} pinned location{officesForSelectedRegion.length === 1 ? '' : 's'}
              </p>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <OfficesMap offices={officesForSelectedRegion} activeRegion={selectedOfficeRegion} />
          </div>
        </div>
      </motion.section>

      <motion.section
        id="ai-contact"
        className="mt-6 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
        <div className="relative">
          <img
            src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
            alt="Lifewood logo"
            className="h-8 sm:h-9 w-auto mb-5"
          />
          <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
            Need support from our regional delivery teams? Contact the Lifewood team directly.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div>
              <button
                type="button"
                onClick={onNavigateContact}
                className="focus-brand mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
              >
                Contact Team
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                <a href="mailto:hr.lifewood@gmail.com" className="brand-link hover:text-saffron transition-colors">hr.lifewood@gmail.com</a>
                <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">LinkedIn</a>
                <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Facebook</a>
              </div>
            </div>

            <div className="lg:text-right">
              <p className="text-base sm:text-lg mb-4">Find Us On:</p>
              <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
              </div>
              <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  )
}
