import { Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Sparkles,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ArrowLeft,
  X,
  Mail,
  Phone,
  Building2,
  Clock3,
  CheckCircle2,
  XCircle,
  Filter,
  Send,
  Mic,
  MessageCircle,
  Move,
  ImageIcon,
  Video,
  Type,
  ShieldCheck,
  Database,
  Search,
  FolderTree,
  Tags,
  Languages,
  Clapperboard,
  Quote,
  LayoutGrid,
  FileText,
  UserSquare2,
} from 'lucide-react'

export default function AppRouteContent(props) {
  const {
    currentPath,
    isCareersRoute,
    pageData,
    goToPath,
    scrollToLocalAnchor,
    modalityIcon,
    capabilityIcon,
    aiServiceModalities,
    aiServiceCapabilities,
    careersCultureChips,
    careersSlotColumns,
    careersSteps,
    careersTracks,
    careersValues,
    typeAUseCases,
    typeAProcess,
    typeBUseCases,
    typeBProcess,
    typeCUseCases,
    typeCProcess,
    typeDCapabilities,
    typeDCinematicFrames,
    typeDCinematicVideo,
    typeDStats,
    typeDVisuals,
    activeTypeAProcess,
    activeTypeBProcess,
    activeTypeCProcess,
    selectTypeAProcess,
    selectTypeBProcess,
    selectTypeCProcess,
    aiProjectTracks,
    activeProjectIndex,
    setActiveProjectIndex,
    projectListIcon,
    selectedPhilanthropyOffice,
    setSelectedPhilanthropyOffice,
    philanthropyMapOffices,
    openPhilImpactRow,
    setOpenPhilImpactRow,
    selectedOfficeRegion,
    setSelectedOfficeRegion,
    officeRegions,
    officesForSelectedRegion,
    officesStatsVisible,
    setOfficesStatsVisible,
    CountUpStatComponent,
    OfficesPageComponent,
    OfficesMapComponent,
    SectionFallbackComponent,
    aboutShowcase,
    aboutPrinciples,
    aboutMissionVision,
    activeAboutTab,
    setActiveAboutTab,
    aboutStats,
    contactChannels,
    contactOffices,
    inquiryForm,
    setInquiryForm,
    inquiryFormStatus,
    setInquiryFormStatus,
    isSubmittingInquiry,
    handleInquirySubmit,
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    isSignInPasswordVisible,
    setIsSignInPasswordVisible,
    signInError,
    signUpSuccess,
    isSupabaseConfigured,
    isAuthLoading,
    handleSignIn,
    isSignUpOpen,
    setIsSignUpOpen,
    signUpError,
    setSignUpError,
    signUpForm,
    setSignUpForm,
    isSignUpPasswordVisible,
    setIsSignUpPasswordVisible,
    isSignUpConfirmPasswordVisible,
    setIsSignUpConfirmPasswordVisible,
    handleEmailSignUp,
    ApplicationFormPageComponent,
  } = props

  return (
    <>          {currentPath === '/ai-services' ? (
            <section className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Data Services</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">End-to-end AI data solutions</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood delivers end-to-end AI data solutions from multi-language collection and annotation to model training
                  and generative AI content. Our global workforce and industrialized methodology support efficient scaling and
                  high-quality domain-specific datasets.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Workforce</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Delivery</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Domain-specialized Data</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-modalities')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">View Modalities</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-video')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Watch Video</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-contact')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Contact Team</button>
                </div>
              </motion.div>

              <motion.section
                id="ai-modalities"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="modalities-fade-shell mt-2 sm:mt-3 overflow-hidden rounded-3xl">
                  <div className="modalities-loop-track py-1">
                    {[...aiServiceModalities, ...aiServiceModalities].map((item, index) => (
                    <motion.article
                      key={`${item.title}-${index}`}
                      className="w-[278px] sm:w-[306px] shrink-0 rounded-[28px] border border-castleton/20 bg-[#f7f8f7] p-4 sm:p-5 shadow-soft"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.02 }}
                    >
                      <div className="relative overflow-hidden rounded-[20px] h-36 sm:h-40">
                        <img src={item.image} alt={`${item.title} data services`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-castleton/55 to-transparent" />
                        <div className="absolute left-3 bottom-3 w-12 h-12 rounded-xl bg-white border border-castleton/15 flex items-center justify-center">
                          {modalityIcon(item.title)}
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-[2rem] leading-[1.02] font-medium text-black mt-4 mb-2">{item.title}</h3>
                      <p className="text-black text-[1.05rem] leading-[1.4]">{item.details}</p>
                      <span className="block w-12 h-1 rounded-full bg-saffron mt-4" />
                    </motion.article>
                  ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/g_JvAVL0WY4?start=1"
                    title="Lifewood AI Data Services Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.div
                id="ai-solutions"
                className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.div
                  className="absolute left-8 top-8 w-28 h-28 rounded-full bg-castleton/10 blur-2xl pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-10 bottom-12 w-32 h-32 rounded-full bg-saffron/20 blur-2xl pointer-events-none"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg text-black mb-4 inline-flex items-center gap-2.5">
                    <Sparkles className="w-[18px] h-[18px] text-castleton" />
                    <span>Why brands trust us</span>
                  </p>
                  <h2 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-black">
                    Comprehensive
                    <br />
                    Data Solutions
                  </h2>
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-3 mt-6 text-lg sm:text-xl text-black hover:text-castleton transition-colors"
                  >
                    <span>Get started</span>
                    <span className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {aiServiceCapabilities.slice(0, 3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 min-h-[260px] interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.26 + index * 0.05 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl sm:text-4xl font-medium mb-5 text-black">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                  {aiServiceCapabilities.slice(3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 + index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl font-medium mb-4">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
                <p className="mt-8 text-lg text-black font-medium">
                  We provide global Data Engineering Services to enable AI Solutions.
                </p>
              </motion.div>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/careers' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="careers-overview"
                className="rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
                  <motion.div
                    className="lg:col-span-5"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 }}
                  >
                    <h1 className="text-6xl sm:text-7xl lg:text-[78px] tracking-[-0.03em] leading-[0.92] font-semibold text-black">
                      Careers in
                      <br />
                      Lifewood
                    </h1>
                    <motion.button
                      type="button"
                      onClick={() => goToPath('/application-form')}
                      className="focus-brand mt-8 inline-flex items-center rounded-full overflow-hidden border border-saffron bg-saffron text-black font-semibold"
                      whileHover={{ y: -2, boxShadow: '0 12px 24px -14px rgba(244,179,71,0.9)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="px-5 py-3 text-base">Join Us</span>
                      <span className="px-4 py-3 border-l border-black/15">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-7 lg:pl-8"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                  >
                    <p className="text-2xl sm:text-3xl leading-relaxed text-black/90 max-w-3xl">
                      Innovation, adaptability and the rapid development of new services separates companies that constantly
                      deliver at the highest level from their competitors.
                    </p>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="careers-image"
                className="rounded-[38px] overflow-hidden border border-castleton/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=80"
                  alt="Lifewood careers team collaboration"
                  className="w-full h-[300px] sm:h-[430px] lg:h-[560px] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.45 }}
                />
              </motion.section>

              <motion.section
                id="careers-growth"
                className="p-5 sm:p-7 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.38 }}
              >
                <p className="text-castleton uppercase tracking-[0.14em] text-sm sm:text-base font-medium">
                  Career Culture
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] font-semibold text-serpent max-w-5xl mx-auto">
                  It means motivating
                  <br />
                  and growing teams
                </h2>
                <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-black max-w-4xl mx-auto">
                  Teams that can initiate and learn on the run in order to deliver evolving technologies and targets. It&apos;s a
                  big challenge, but innovation, especially across borders, has never been the easy path.
                </p>
                <motion.div
                  className="careers-slot-reel mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="careers-slot-grid">
                    {careersSlotColumns.map((column, colIndex) => (
                      <div key={`slot-col-${colIndex}`} className="careers-slot-column">
                        <div
                          className={`careers-slot-track ${colIndex === 1 ? 'careers-slot-track-reverse' : ''}`}
                          style={{
                            '--slot-speed': column.speed,
                            '--slot-delay': `${colIndex * -1.8}s`,
                          }}
                        >
                          {[...column.chips, ...column.chips].map((chip, itemIndex) => (
                            <span key={`slot-${colIndex}-${chip}-${itemIndex}`} className="careers-slot-chip">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.section>

              <motion.section
                id="careers-closing"
                className="p-6 sm:p-10 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-2xl sm:text-4xl leading-relaxed text-black max-w-6xl mx-auto">
                  If you&apos;re looking to turn the page on a new chapter in your career make contact with us today. At Lifewood,
                  the adventure is always before you, it&apos;s why we&apos;ve been described as{' '}
                  <span className="text-serpent">&quot;always on, never off.&quot;</span>
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-a-data-servicing' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-a-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type A - Data Servicing</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Data services built for scale and quality</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood provides Type A Data Servicing through end-to-end document scanning, AI-powered data extraction,
                  and structured database delivery. The workflow is designed for high-volume operations while maintaining
                  precision and consistency through quality assurance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">AI Data Extraction</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Support</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Scalable Operations</span>
                </div>
              </motion.div>

              <motion.section
                id="type-a-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeAUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <FolderTree className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-a-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type A- Data Servicing</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-${activeTypeAProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeAProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeAProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeAProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-${activeTypeAProcess.step}`}
                          src={activeTypeAProcess.image}
                          alt={`${activeTypeAProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type A process selectors">
                      {typeAProcess.map((item, index) => {
                        const isActive = activeTypeAProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeAProcess(index)}
                            onFocus={() => selectTypeAProcess(index)}
                            onClick={() => selectTypeAProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-b-horizontal-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-b-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type B - Horizontal LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Horizontal LLM data for broad model training</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model
                  testing. Creating multimodal datasets for deep learning and large language models.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Cross-domain Coverage</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multimodal Datasets</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">LLM Training Ready</span>
                </div>
              </motion.div>

              <motion.section
                id="type-b-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeBUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <Database className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-b-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type B: AI Data Project (Audio)</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-b-${activeTypeBProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeBProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeBProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeBProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-b-${activeTypeBProcess.step}`}
                          src={activeTypeBProcess.image}
                          alt={`${activeTypeBProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type B process selectors">
                      {typeBProcess.map((item, index) => {
                        const isActive = activeTypeBProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeBProcess(index)}
                            onFocus={() => selectTypeBProcess(index)}
                            onClick={() => selectTypeBProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-c-vertical-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-c-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type C - Vertical LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Vertical LLM data for industry-specific AI</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  AI data solutions across specific industry verticals including autonomous driving data annotation,
                  in-vehicle data collection, and specialized data services for industry, enterprise, or private LLM.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Autonomous Driving</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">In-vehicle Data Collection</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise / Private LLM</span>
                </div>
              </motion.div>

              <motion.section
                id="type-c-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeCUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <ShieldCheck className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-c-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type C- Vertical LLM Data</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-c-${activeTypeCProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeCProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeCProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeCProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-c-${activeTypeCProcess.step}`}
                          src={activeTypeCProcess.image}
                          alt={`${activeTypeCProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type C process selectors">
                      {typeCProcess.map((item, index) => {
                        const isActive = activeTypeCProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeCProcess(index)}
                            onFocus={() => selectTypeCProcess(index)}
                            onClick={() => selectTypeCProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/philanthropy-impact' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="phil-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <motion.div
                  className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-castleton/10 blur-3xl"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Philanthropy and Impact</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Transforming Communities Worldwide</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We direct resources into education and developmental projects that create lasting change. Our approach goes
                  beyond giving: it builds sustainable growth and empowers communities for the future.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Purposeful Partnerships</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Sustainable Investment</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Lasting Transformation</motion.span>
                </div>
              </motion.div>

              <motion.section
                id="phil-map-impact"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="space-y-7 sm:space-y-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-serpent leading-[0.95]">
                      Transforming Communities
                      <br />
                      Worldwide
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    <motion.div
                      className="lg:col-span-4 h-[320px] sm:h-[430px] lg:h-[460px] rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-3 sm:p-4 flex flex-col"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.22 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-3 px-1">Pinned Regions</p>
                      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 pb-2">
                        {philanthropyMapOffices.map((office) => {
                          const isActive = selectedPhilanthropyOffice?.name === office.name
                          return (
                            <motion.button
                              key={`${office.name}-${office.lat}-${office.lon}`}
                              type="button"
                              onClick={() => setSelectedPhilanthropyOffice(office)}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`focus-brand w-full text-left rounded-2xl border px-3 py-2.5 transition-colors ${
                                isActive
                                  ? 'bg-serpent text-white border-serpent'
                                  : 'bg-white text-black border-castleton/20 hover:border-castleton/40'
                              }`}
                            >
                              <p className="font-semibold leading-tight">{office.name}</p>
                              <p className={`text-xs ${isActive ? 'text-white/80' : 'text-black/70'}`}>{office.region}</p>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>

                    <motion.div
                      className="lg:col-span-8"
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Suspense fallback={<SectionFallbackComponent className="h-[320px] sm:h-[430px] lg:h-[460px]" />}>
                        <OfficesMapComponent
                          offices={philanthropyMapOffices}
                          activeRegion="Africa and Indian sub-continent"
                          showMeta={false}
                          focusedOffice={selectedPhilanthropyOffice}
                          className="h-[320px] sm:h-[430px] lg:h-[460px]"
                        />
                      </Suspense>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px w-10 bg-black/35" />
                      <p className="text-black/85 text-2xl sm:text-3xl font-medium">Impact</p>
                    </div>
                    <p className="text-black text-lg sm:text-2xl leading-relaxed lg:text-right">
                      Through purposeful partnerships and sustainable investment, we empower communities across Africa and
                      the Indian sub-continent to create lasting economic and social transformation.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="divide-y divide-castleton/15 border-y border-castleton/15">
                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28 }}
                    onMouseEnter={() => setOpenPhilImpactRow('partnership')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'partnership' ? null : 'partnership'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'partnership' ? 0 : 1,
                        scale: openPhilImpactRow === 'partnership' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'partnership' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Partnership</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'partnership' ? 1 : 0, y: openPhilImpactRow === 'partnership' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'partnership' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Partnership</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        In partnership with our philanthropic partners, Lifewood has expanded operations in South Africa, Nigeria,
                        Republic of the Congo, Democratic Republic of the Congo, Ghana, Madagascar, Benin, Uganda, Kenya, Ivory
                        Coast, Egypt, Ethiopia, Niger, Tanzania, Namibia, Zambia, Zimbabwe, Liberia, Sierra Leone, and Bangladesh.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                          alt="Community partnership session"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                    onMouseEnter={() => setOpenPhilImpactRow('application')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'application' ? null : 'application'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'application' ? 0 : 1,
                        scale: openPhilImpactRow === 'application' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'application' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Application</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'application' ? 1 : 0, y: openPhilImpactRow === 'application' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'application' ? 'auto' : 'none' }}
                    >
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                          alt="Application in under-resourced economies"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        This requires the application of our methods and experience for the development of people in under
                        resourced economies.
                      </p>
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black lg:text-right">Application</h3>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                    onMouseEnter={() => setOpenPhilImpactRow('expanding')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'expanding' ? null : 'expanding'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'expanding' ? 0 : 1,
                        scale: openPhilImpactRow === 'expanding' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'expanding' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Expanding</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'expanding' ? 1 : 0, y: openPhilImpactRow === 'expanding' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'expanding' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Expanding</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        We are expanding access to training, establishing equiatable wage structures and career and leadership
                        progression to create sustainable change, by equipping individuals to take the lead and grow the business
                        for themselves for the long term benefit of everyone.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
                          alt="Expanding development outcomes"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                  </motion.div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-statement"
                className="rounded-3xl p-8 sm:p-10 text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.14 }}
              >
                <p className="text-black text-3xl sm:text-5xl font-medium leading-tight">
                  Working with new
                  <br />
                  intelligence for a better world.
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-d-aigc' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-d-overview"
                className="p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-16 -right-12 w-64 h-64 rounded-full bg-castleton/10 blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Generated Content (AIGC)</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">
                  Cinematic brand content powered by AI
                </h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood&apos;s early adoption of AI tools has seen the company rapidly evolve the use of AI generated content,
                  integrated into video production for communication requirements. These text, voice, image, and video skills
                  that comprise AIGC production, combined with traditional production methods and story development, are now
                  being sought by other companies.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Text, Voice, Image, Video</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Story Development</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Brand Communications</span>
                </div>
              </motion.div>

              <motion.section
                id="type-d-cinematic-scene"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.02 }}
              >
                <article className="overflow-hidden">
                  <video
                    className="w-full h-[280px] sm:h-[380px] object-cover"
                    src={typeDCinematicVideo.src}
                    poster={typeDCinematicVideo.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="p-5 sm:p-7">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Scene</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2">High-impact visual storytelling for brand communication</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      We blend film direction, AI generation, and editing craft to create standout visual scenes for campaigns, social assets, and enterprise content.
                    </p>
                  </div>
                </article>
              </motion.section>

              <motion.section
                id="type-d-cinematic-frames"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="mb-5 sm:mb-6">
                  <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Frames</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Generated scenes with human-led direction</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCinematicFrames.map((frame, index) => (
                    <motion.article
                      key={frame.title}
                      className="group overflow-hidden rounded-3xl"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.07 }}
                      animate={{ y: [0, -8, 0] }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      style={{ willChange: 'transform' }}
                    >
                      <div className="relative overflow-hidden rounded-3xl border border-castleton/20">
                        <motion.img
                          src={frame.image}
                          alt={frame.title}
                          className="w-full h-[220px] sm:h-[260px] object-cover"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 12 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-serpent/50 via-transparent to-transparent" />
                        <div className="absolute left-4 bottom-4">
                          <p className="text-white text-sm uppercase tracking-[0.1em] opacity-90">Frame {index + 1}</p>
                          <h4 className="text-white text-xl font-semibold">{frame.title}</h4>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-d-visuals"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeDVisuals.slice(1).map((item) => (
                    <article key={item.title} className="overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-[220px] sm:h-[260px] object-cover" />
                      <div className="p-4 sm:p-5">
                        <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">AIGC Module</p>
                        <h3 className="text-xl sm:text-2xl font-medium">{item.title}</h3>
                      </div>
                    </article>
                  ))}
                  <div className="p-5 sm:p-7 flex flex-col justify-center">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">Creative Stack</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-3">From concept to final cut</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      AIGC production at Lifewood combines ideation, generation, compositing, editing, and localization into a single delivery flow.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="type-d-approach"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Our Approach</h2>
                <p className="text-black text-lg leading-relaxed max-w-5xl mb-6">
                  Our motivation is to express the personality of your brand in a compelling and distinctive way. We use
                  advanced film, video, and editing techniques combined with generative AI to create cinematic worlds for videos,
                  advertisements, and corporate communications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCapabilities.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.article
                        key={item.title}
                        className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-8 interactive-card border border-castleton/15"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                      >
                        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    )
                  })}
                </div>
              </motion.section>

              <motion.section
                id="type-d-impact"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {typeDStats.map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="rounded-3xl p-6 sm:p-8"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.06 }}
                    >
                      <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">{item.label}</p>
                      <p className="text-black text-3xl sm:text-4xl font-semibold">{item.value}</p>
                    </motion.article>
                  ))}
                </div>

                <motion.article
                  className="bg-gradient-to-r from-serpent to-castleton rounded-3xl p-6 sm:p-8 mb-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.16 }}
                >
                  <p className="text-white/90 text-sm uppercase tracking-[0.12em] mb-2">Localization at Speed</p>
                  <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-3">We can quickly adjust culture and language for world markets</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    Lifewood adapts tone, visual context, and language across regions while preserving your core brand message.
                  </p>
                </motion.article>

                <motion.article
                  className="rounded-3xl p-6 sm:p-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-castleton mt-1" />
                    <p className="text-black text-lg sm:text-xl leading-relaxed">
                      We understand that your customers spend hours looking at screens: so finding the one, most important thing,
                      on which to build your message is integral to our approach, as we seek to deliver surprise and originality.
                    </p>
                  </div>
                  <p className="text-black/80 mt-4 text-sm sm:text-base">- Lifewood</p>
                </motion.article>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/ai-projects' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-projects-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Projects</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">AI projects in action</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We are actively implementing numerous AI use cases across industries and regions, combining scalable delivery
                  operations with high-quality data engineering to support long-term model performance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Production AI Programs</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Operations</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise Quality</span>
                </div>
                <div className="mt-7 w-full self-start">
                  <div className="w-full flex justify-start">
                    <button
                      type="button"
                      onClick={() => scrollToLocalAnchor('ai-contact')}
                      className="focus-brand group inline-flex items-center gap-2 rounded-full border border-serpent/30 bg-serpent px-3.5 py-1.5 text-xs font-bold text-white hover:bg-castleton transition-colors"
                    >
                      Contact Team
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.section
                id="ai-projects-focus"
                className="rounded-3xl p-4 sm:p-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-flex text-black/80 text-xs sm:text-sm font-semibold mb-3">
                    Projects
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-medium text-black">What we currently handle</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 items-start">
                  <motion.div
                    key={aiProjectTracks[activeProjectIndex]?.image}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl overflow-hidden border border-castleton/15"
                  >
                    <img
                      src={aiProjectTracks[activeProjectIndex]?.image}
                      alt={aiProjectTracks[activeProjectIndex]?.title}
                      className="w-full h-[360px] sm:h-[440px] object-cover"
                    />
                  </motion.div>

                  <div>
                    <ul className="border-b border-black/15">
                      {aiProjectTracks.map((item, index) => {
                        const isActive = activeProjectIndex === index
                        return (
                          <li key={item.title} className="border-t border-black/15">
                            <button
                              type="button"
                              onClick={() => setActiveProjectIndex((prev) => (prev === index ? -1 : index))}
                              className="w-full flex items-center gap-3 py-4 text-left"
                            >
                              <span className="text-black/80">{projectListIcon(item.title)}</span>
                              <span className="text-black text-base sm:text-xl font-medium">{`2.${index + 1} ${item.title}`}</span>
                              <span className="ml-auto text-black/70 text-xl leading-none">{isActive ? <X className="w-4 h-4" /> : '+'}</span>
                            </button>
                            <AnimatePresence>
                              {isActive ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.24 }}
                                  className="overflow-hidden pb-4"
                                >
                                  <p className="text-black/80 text-sm sm:text-base leading-relaxed pl-7 pr-2 whitespace-pre-line">
                                    {item.details}
                                  </p>
                                </motion.div>
                          ) : null}
                            </AnimatePresence>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/contact-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="contact-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Contact us</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Let us build your AI data pipeline</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Reach Lifewood teams for AI data services, project scoping, and multi-region delivery support. We will
                  align the right workflow, quality model, and execution team for your requirements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <a href="mailto:hr.lifewood@gmail.com" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Team
                  </a>
                  <a href="tel:+15551234567" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </motion.div>

              <motion.section
                id="contact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6 items-start">
                  <div className="space-y-4">
                    {contactChannels.map((channel, index) => {
                      const Icon = channel.icon
                      return (
                        <motion.a
                          key={channel.title}
                          href={channel.href}
                          className="block bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: 0.1 + index * 0.05 }}
                        >
                          <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                            <Icon className="w-5 h-5" />
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{channel.title}</p>
                          <p className="text-black text-lg sm:text-xl font-semibold">{channel.value}</p>
                        </motion.a>
                      )
                    })}

                    <motion.div
                      className="bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.28 }}
                    >
                      <div className="flex items-start gap-3">
                        <Clock3 className="w-5 h-5 text-castleton mt-0.5" />
                        <div>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">Response Time</p>
                          <p className="text-black text-base sm:text-lg">
                            Initial response within 1 business day for all inbound inquiries.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="self-start bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.26, delay: 0.16 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white">
                        <Send className="w-4 h-4" />
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-medium">Send inquiry</h2>
                    </div>

                    <form onSubmit={handleInquirySubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Full name"
                          value={inquiryForm.fullName}
                          onChange={(event) => setInquiryForm((prev) => ({ ...prev, fullName: event.target.value }))}
                          onInput={() => setInquiryFormStatus({ type: '', message: '' })}
                          className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Work email"
                          value={inquiryForm.workEmail}
                          onChange={(event) => setInquiryForm((prev) => ({ ...prev, workEmail: event.target.value }))}
                          onInput={() => setInquiryFormStatus({ type: '', message: '' })}
                          className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={inquiryForm.companyName}
                        onChange={(event) => setInquiryForm((prev) => ({ ...prev, companyName: event.target.value }))}
                        onInput={() => setInquiryFormStatus({ type: '', message: '' })}
                        className="focus-brand mb-3 w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                      />
                      <textarea
                        placeholder="Tell us about your inquiry..."
                        rows={6}
                        value={inquiryForm.requirements}
                        onChange={(event) => setInquiryForm((prev) => ({ ...prev, requirements: event.target.value }))}
                        onInput={() => setInquiryFormStatus({ type: '', message: '' })}
                        className="focus-brand mb-4 w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none resize-y"
                      />
                      {inquiryFormStatus.message ? (
                        <div
                          className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${
                            inquiryFormStatus.type === 'error'
                              ? 'border-rose-200 bg-rose-50 text-rose-700'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {inquiryFormStatus.message}
                        </div>
                      ) : null}
                      <button
                        type="submit"
                        disabled={isSubmittingInquiry}
                        className="focus-brand inline-flex items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 font-semibold text-white transition-colors hover:bg-castleton disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmittingInquiry ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="contact-offices"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Global Presence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {contactOffices.map((office, index) => (
                    <motion.article
                      key={office.city}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.16 + index * 0.05 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{office.region}</p>
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{office.city}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{office.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <a
                        href="mailto:hr.lifewood@gmail.com"
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </a>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/sign-in' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="sign-in-form"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-stretch">
                  <motion.article
                    className="order-2 lg:order-1 lg:col-span-5 rounded-3xl bg-serpent text-white p-6 sm:p-9 border border-castleton/35 relative overflow-hidden"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div className="absolute -top-16 -right-8 w-48 h-48 rounded-full bg-castleton/40 blur-3xl" />
                    <div className="relative">
                      <p className="text-saffron text-xs uppercase tracking-[0.14em] mb-3">Account Access</p>
                      <h1 className="text-4xl sm:text-5xl font-semibold leading-[0.95] mb-4 text-[#e7edd8]">Sign in to Lifewood</h1>
                      <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                        Access your project workflows, communication channels, and global delivery workspace.
                      </p>
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">Secure Access</p>
                          <p className="text-sm sm:text-base">Enterprise-grade sign-in for teams and clients.</p>
                        </div>
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">New Here?</p>
                          <p className="text-sm sm:text-base">Create an account with your details, verify your email, then sign in.</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article
                    className={`order-1 lg:order-2 lg:col-span-7 relative ${
                      isSignUpOpen ? 'min-h-[580px] sm:min-h-[520px]' : 'min-h-[500px] sm:min-h-[460px]'
                    }`}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                    style={{ perspective: 1800 }}
                  >
                    <motion.div
                      className="relative h-full w-full"
                      animate={{ rotateY: isSignUpOpen ? 180 : 0 }}
                      transition={{ duration: 0.55, ease: 'easeInOut' }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="absolute inset-0 rounded-3xl bg-[#f3f3f3] p-6 sm:p-8 border border-castleton/15 shadow-soft"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Welcome back</h2>
                        <p className="text-black/70 text-sm sm:text-base mb-5">Use your work credentials to continue.</p>

                        <form onSubmit={handleSignIn} className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Work Email</label>
                            <input
                              type="email"
                              placeholder="name@company.com"
                              value={signInEmail}
                              onChange={(event) => {
                                setSignInEmail(event.target.value)
                                if (signInError) setSignInError('')
                              }}
                              className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Password</label>
                            <div className="relative">
                              <input
                                type={isSignInPasswordVisible ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={signInPassword}
                                onChange={(event) => {
                                  setSignInPassword(event.target.value)
                                  if (signInError) setSignInError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 pr-20 text-black outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setIsSignInPasswordVisible((prev) => !prev)}
                                className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                              >
                                {isSignInPasswordVisible ? 'Hide' : 'Show'}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-sm">
                            <label className="inline-flex items-center gap-2 text-black/80">
                              <input type="checkbox" className="accent-[#046241]" />
                              Remember me
                            </label>
                            <button type="button" className="text-castleton hover:text-serpent font-semibold">
                              Forgot password?
                            </button>
                          </div>

                          {signInError ? (
                            <p className="text-sm text-[#b64b4b] bg-[#fde8e8] border border-[#efb6b6] rounded-xl px-3 py-2">
                              {signInError}
                            </p>
                          ) : null}

                          {!isSupabaseConfigured ? (
                            <p className="text-sm text-[#8a5a14] bg-[#fff5df] border border-[#f1d79d] rounded-xl px-3 py-2">
                              Supabase env vars are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
                            </p>
                          ) : null}

                          {signUpSuccess ? (
                            <p className="text-sm text-castleton bg-[#e9f3ee] border border-castleton/20 rounded-xl px-3 py-2">
                              {signUpSuccess}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isAuthLoading}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isAuthLoading ? 'Signing In...' : 'Sign In'}
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsSignUpOpen(true)
                              setSignUpError('')
                              setSignUpSuccess('')
                            }}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-castleton/25 bg-white px-5 py-2.5 text-serpent font-semibold hover:bg-[#eef3ef] transition-colors"
                          >
                            Sign Up
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <p className="px-2 text-center text-sm leading-relaxed text-black/70 sm:px-0">
                            New users can register first, then return here to sign in.
                          </p>
                        </form>
                      </div>

                      <div
                        className="absolute inset-0 rounded-3xl bg-[#f3f3f3] p-6 sm:p-8 border border-castleton/15 shadow-soft"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-1">Create your account</h3>
                            <p className="text-black/70 text-sm sm:text-base">
                              Fill in your account details. Supabase will handle secure registration and email verification.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSignUpOpen(false)
                              setSignUpError('')
                            }}
                            className="focus-brand inline-flex items-center gap-2 rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-semibold text-serpent hover:bg-[#eef3ef] transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                          </button>
                        </div>

                        <form onSubmit={handleEmailSignUp} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Full Name</label>
                              <input
                                type="text"
                                placeholder="Juan Dela Cruz"
                                value={signUpForm.fullName}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, fullName: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Email</label>
                              <input
                                type="email"
                                placeholder="name@company.com"
                                value={signUpForm.email}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, email: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Password</label>
                              <div className="relative">
                                <input
                                  type={isSignUpPasswordVisible ? 'text' : 'password'}
                                  placeholder="Minimum 8 characters"
                                  value={signUpForm.password}
                                  onChange={(event) => {
                                    setSignUpForm((prev) => ({ ...prev, password: event.target.value }))
                                    if (signUpError) setSignUpError('')
                                  }}
                                  className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 pr-20 text-black outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => setIsSignUpPasswordVisible((prev) => !prev)}
                                  className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                                >
                                  {isSignUpPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Confirm Password</label>
                              <div className="relative">
                                <input
                                  type={isSignUpConfirmPasswordVisible ? 'text' : 'password'}
                                  placeholder="Repeat your password"
                                  value={signUpForm.confirmPassword}
                                  onChange={(event) => {
                                    setSignUpForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                                    if (signUpError) setSignUpError('')
                                  }}
                                  className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 pr-20 text-black outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => setIsSignUpConfirmPasswordVisible((prev) => !prev)}
                                  className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                                >
                                  {isSignUpConfirmPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Phone</label>
                              <input
                                type="tel"
                                placeholder="+63 9XX XXX XXXX"
                                value={signUpForm.phone}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, phone: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Department / Role</label>
                              <input
                                type="text"
                                placeholder="Operations, QA, Client Services"
                                value={signUpForm.department}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, department: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                          </div>

                          {signUpError ? (
                            <p className="text-sm text-[#b64b4b] bg-[#fde8e8] border border-[#efb6b6] rounded-xl px-3 py-2">
                              {signUpError}
                            </p>
                          ) : null}

                          {!isSupabaseConfigured ? (
                            <p className="text-sm text-[#8a5a14] bg-[#fff5df] border border-[#f1d79d] rounded-xl px-3 py-2">
                              Supabase env vars are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isAuthLoading || !isSupabaseConfigured}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-serpent/25 bg-castleton px-5 py-2.5 text-white font-semibold hover:bg-serpent transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isAuthLoading ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </motion.article>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Secure Login', value: 'Protected session and encrypted traffic.' },
                    { label: 'Global Teams', value: 'Single access point for distributed operations.' },
                    { label: 'Fast Support', value: 'Contact team available for account help.' },
                  ].map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="bg-[#f3f3f3] rounded-2xl border border-castleton/15 p-4"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.22, delay: 0.08 + index * 0.04 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">{item.label}</p>
                      <p className="text-black text-sm leading-relaxed">{item.value}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </section>
                    ) : currentPath === '/offices' ? (
            <Suspense fallback={<SectionFallbackComponent className="h-[980px]" />}>
              <OfficesPageComponent
                officesStatsVisible={officesStatsVisible}
                onStatsEnter={() => setOfficesStatsVisible(true)}
                officeRegions={officeRegions}
                selectedOfficeRegion={selectedOfficeRegion}
                onSelectRegion={setSelectedOfficeRegion}
                officesForSelectedRegion={officesForSelectedRegion}
                CountUpStatComponent={CountUpStatComponent}
                onNavigateContact={() => goToPath('/contact-us')}
              />
            </Suspense>
          ) : currentPath === '/about-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="about-overview"
                className="p-8 sm:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <h1 className="text-5xl sm:text-6xl font-semibold text-black mb-7">About our company</h1>
                <p className="text-black text-2xl leading-relaxed max-w-6xl">
                  While we are motivated by business and economic objectives, we remain committed to our core business beliefs that shape our corporate and individual behaviour around the world.
                </p>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-2 rounded-full bg-[#f4b347] px-6 py-3 text-lg font-medium text-black hover:brightness-105 transition-all duration-300"
                  >
                    Contact Us
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-castleton text-white">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="about-showcase"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
                  <motion.article
                    className="lg:col-span-8 relative overflow-hidden rounded-[32px] border border-castleton/20 shadow-soft"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                    whileHover={{ y: -6 }}
                  >
                    <motion.img
                      src={aboutShowcase.heroImage}
                      alt="Lifewood leadership collaboration"
                      className="h-[280px] sm:h-[360px] w-full object-cover"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-serpent/40 via-transparent to-transparent" />
                    <div className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6">
                      <p className="text-white/90 text-xs uppercase tracking-[0.14em] mb-2">Team Collaboration</p>
                      <h3 className="text-white text-2xl sm:text-3xl font-semibold leading-none">Building ideas together</h3>
                    </div>
                  </motion.article>

                  <motion.article
                    className="lg:col-span-4 rounded-[32px] border border-castleton/20 bg-[#f3f3f3] p-4 sm:p-5 flex flex-col gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-castleton/15">
                      <motion.img
                        src={aboutShowcase.collabImage}
                        alt="Lifewood team collaboration"
                        className="h-[190px] sm:h-[220px] w-full object-cover"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <div>
                      <p className="text-castleton text-xs uppercase tracking-[0.14em] mb-2">Connect With Us</p>
                      <p className="text-3xl sm:text-4xl font-semibold text-castleton leading-[0.95] mb-3">Let&apos;s collaborate</p>
                      <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
                        We co-create impactful AI and data programs with teams across regions, industries, and languages.
                      </p>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand inline-flex items-center gap-2 rounded-full bg-serpent px-5 py-2.5 text-white text-sm font-semibold hover:bg-castleton transition-colors"
                      >
                        Start a conversation
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="about-core-values"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  <article className="lg:col-span-4">
                    <p className="text-castleton text-sm uppercase tracking-[0.14em] mb-2">Company Culture</p>
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                      Core <span className="bg-[#f4b347] px-2">Value</span>
                    </h2>
                    <p className="text-black text-lg leading-relaxed">
                      At Lifewood we empower our company and our clients to realise the transformative power of AI:
                      bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
                    </p>
                  </article>

                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {aboutPrinciples.map((item, index) => (
                      <motion.article
                        key={item.title}
                        className="relative overflow-hidden rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-5 sm:p-6"
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.18 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                        whileHover={{ y: -8 }}
                      >
                        <motion.div
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron to-castleton"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-serpent text-white text-2xl font-semibold">
                            {item.code}
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.14em]">{item.title}</p>
                        </div>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="about-mission-vision"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">What drives us today, and what inspires us for tomorrow</h2>
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-castleton/20 bg-white/60 p-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'mission'}
                    onMouseEnter={() => setActiveAboutTab('mission')}
                    onFocus={() => setActiveAboutTab('mission')}
                    onClick={() => setActiveAboutTab('mission')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'mission'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Mission
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'vision'}
                    onMouseEnter={() => setActiveAboutTab('vision')}
                    onFocus={() => setActiveAboutTab('vision')}
                    onClick={() => setActiveAboutTab('vision')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'vision'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Vision
                  </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAboutTab}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                  >
                    <article className="lg:col-span-6 overflow-hidden rounded-3xl border border-castleton/20">
                      <img
                        src={aboutMissionVision[activeAboutTab].image}
                        alt={aboutMissionVision[activeAboutTab].title}
                        className="h-[260px] sm:h-[320px] w-full object-cover"
                      />
                    </article>
                    <article className="lg:col-span-6 rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-6 sm:p-8">
                      {activeAboutTab === 'vision' ? (
                        <div className="relative overflow-hidden">
                          <motion.div
                            className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-castleton/12 blur-2xl"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <motion.h3
                            className="text-4xl sm:text-5xl font-semibold mb-4 text-serpent leading-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                          >
                            Our Vision
                          </motion.h3>
                          <motion.p
                            className="text-black text-lg sm:text-2xl leading-relaxed sm:leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.1 }}
                          >
                            {aboutMissionVision.vision.description}
                          </motion.p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-3xl sm:text-4xl font-semibold mb-3 text-serpent">
                            {aboutMissionVision.mission.title}
                          </h3>
                          <p className="text-black text-base sm:text-lg leading-relaxed">
                            {aboutMissionVision.mission.description}
                          </p>
                        </>
                      )}
                    </article>
                  </motion.div>
                </AnimatePresence>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/internal-news' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="news-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Internal News</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Rootstech 2026</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Coming soon. Stay connected for official updates, event highlights, and Lifewood internal announcements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand brand-pill px-4 py-2 text-sm font-semibold"
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="news-featured-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Featured Update</h2>
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ccyrQ87EJag"
                    title="Lifewood Internal News Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.section
                id="news-highlights"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      title: 'Event Updates',
                      details: 'Program announcements, milestone news, and key schedules for upcoming activities.',
                    },
                    {
                      title: 'Media Highlights',
                      details: 'Video recaps and featured content from Lifewood initiatives and partner events.',
                    },
                    {
                      title: 'Community News',
                      details: 'Company stories, participation highlights, and internal engagement updates.',
                    },
                  ].map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.05 }}
                    >
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
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
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
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

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/application-form' ? (
            <Suspense fallback={<SectionFallbackComponent className="h-[720px]" />}>
              <ApplicationFormPageComponent />
            </Suspense>
          ) : (
            <section className="max-w-5xl mx-auto bg-white border border-castleton/15 shadow-soft rounded-3xl p-8 sm:p-12">
              <p className="text-castleton font-medium uppercase tracking-[0.14em] text-sm mb-5">Lifewood</p>
              <h1 className="text-4xl sm:text-5xl font-semibold text-serpent mb-5">{pageData?.title || 'Page'}</h1>
              <p className="text-serpent/90 text-lg mb-10 max-w-3xl">
                {pageData?.description || 'Content for this page is being prepared.'}
              </p>
              <button
                type="button"
                onClick={() => goToPath('/')}
                className="focus-brand bg-white border border-castleton/25 rounded-brand px-6 py-3 text-serpent font-semibold hover:text-castleton transition-colors"
              >
                Back to Home
              </button>
            </section>
          )}
    </>
  )
}

