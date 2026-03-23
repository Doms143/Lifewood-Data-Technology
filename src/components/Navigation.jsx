import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'Home', type: 'section', value: 'hero', highlight: true },
  {
    label: 'Our Company',
    type: 'submenu',
    key: 'ourCompany',
    children: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Offices', path: '/offices' },
    ],
  },
  {
    label: 'AI Initiatives',
    type: 'submenu',
    key: 'aiInitiatives',
    children: [
      { label: 'AI Services', path: '/ai-services' },
      { label: 'AI Projects', path: '/ai-projects' },
    ],
  },
  {
    label: 'What We Offer',
    type: 'submenu',
    key: 'whatWeOffer',
    children: [
      { label: 'Type A-Data Servicing', path: '/type-a-data-servicing' },
      { label: 'Type B-Horizontal LLM Data', path: '/type-b-horizontal-llm-data' },
      { label: 'Type C-Vertical LLM Data', path: '/type-c-vertical-llm-data' },
      { label: 'Type D-AIGC', path: '/type-d-aigc' },
    ],
  },
  { label: 'Philanthropy & Impact', type: 'path', value: '/philanthropy-impact' },
  { label: 'Careers', type: 'path', value: '/careers' },
  { label: 'Contact Us', type: 'path', value: '/contact-us' },
  { label: 'Internal News', type: 'path', value: '/internal-news' },
  { label: 'Sign In', type: 'path', value: '/sign-in' },
]

const Navigation = ({ onNavigate, onNavigatePath }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [useCompactNav, setUseCompactNav] = useState(true)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)
  const [selectedNav, setSelectedNav] = useState(() => {
    const path = window.location.pathname || '/'
    if (path === '/') return 'section:hero'
    return `path:${path}`
  })
  const [openSubmenus, setOpenSubmenus] = useState({
    ourCompany: true,
    aiInitiatives: true,
    whatWeOffer: true,
  })
  const headerContentRef = useRef(null)
  const logoRef = useRef(null)
  const navMeasureRef = useRef(null)
  const navRequiredRef = useRef(null)
  const desktopNavRef = useRef(null)
  const desktopCloseTimerRef = useRef(null)

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimerRef.current) {
      clearTimeout(desktopCloseTimerRef.current)
      desktopCloseTimerRef.current = null
    }
  }

  const openDesktopSubmenu = (key) => {
    clearDesktopCloseTimer()
    setOpenDesktopMenu(key)
  }

  const scheduleDesktopSubmenuClose = () => {
    clearDesktopCloseTimer()
    desktopCloseTimerRef.current = setTimeout(() => {
      setOpenDesktopMenu(null)
      desktopCloseTimerRef.current = null
    }, 180)
  }

  const closePanel = () => setIsOpen(false)

  const handleSection = (target) => {
    setSelectedNav(`section:${target}`)
    onNavigate(target)
    closePanel()
  }

  const handlePath = (path) => {
    setSelectedNav(`path:${path}`)
    if (onNavigatePath) onNavigatePath(path)
    closePanel()
  }

  const handleItemClick = (item) => {
    if (item.type === 'section') {
      handleSection(item.value)
      return
    }

    if (item.type === 'path') {
      handlePath(item.value)
      return
    }

    if (item.type === 'submenu') {
      setOpenSubmenus((prev) => ({
        ...prev,
        [item.key]: !prev[item.key],
      }))
    }
  }

  const desktopItems = useMemo(() => navItems, [])

  useEffect(() => {
    const updateNavMode = () => {
      const headerWidth = headerContentRef.current?.clientWidth || 0
      const logoWidth = logoRef.current?.clientWidth || 0
      const navWidth = navRequiredRef.current?.scrollWidth || 0
      const forcedCompact = window.innerWidth < 640
      const availableNavWidth = Math.max(0, headerWidth - logoWidth - 32)
      const isCompact = forcedCompact || !headerWidth || !navWidth || navWidth > availableNavWidth

      setUseCompactNav(isCompact)
      if (!isCompact) {
        setIsOpen(false)
      }
    }

    updateNavMode()

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateNavMode()
          })
        : null

    if (resizeObserver) {
      if (headerContentRef.current) resizeObserver.observe(headerContentRef.current)
      if (logoRef.current) resizeObserver.observe(logoRef.current)
      if (navRequiredRef.current) resizeObserver.observe(navRequiredRef.current)
    }

    window.addEventListener('resize', updateNavMode)
    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', updateNavMode)
    }
  }, [desktopItems])

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname || '/'
      if (path === '/') setSelectedNav('section:hero')
      else setSelectedNav(`path:${path}`)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const isItemSelected = (item) => {
    if (item.type === 'section') return selectedNav === `section:${item.value}`
    if (item.type === 'path') return selectedNav === `path:${item.value}`
    if (item.type === 'submenu') return item.children.some((child) => selectedNav === `path:${child.path}`)
    return false
  }

  const isChildSelected = (path) => selectedNav === `path:${path}`

  useEffect(() => {
    const onDocClick = (event) => {
      if (!desktopNavRef.current) return
      if (!desktopNavRef.current.contains(event.target)) {
        clearDesktopCloseTimer()
        setOpenDesktopMenu(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => {
      clearDesktopCloseTimer()
      document.removeEventListener('mousedown', onDocClick)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative rounded-2xl border border-[#efe6d8] bg-[linear-gradient(90deg,rgba(249,248,246,0.98),rgba(255,251,244,0.96),rgba(248,246,243,0.98))] backdrop-blur-xl px-6 py-3.5 sm:px-8 sm:py-4 shadow-[0_14px_36px_rgba(55,36,12,0.14)]">
          <div ref={headerContentRef} className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              ref={logoRef}
              type="button"
              onClick={() => handleSection('hero')}
              className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <img
                src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                alt="Lifewood logo"
                className="h-9 sm:h-10 w-auto"
              />
            </button>

            {/* Desktop Navigation */}
            {!useCompactNav && (
              <nav ref={desktopNavRef} className="flex-1">
                <ul className="flex items-center justify-center gap-1 rounded-full border border-[#e8dcc9] bg-white/62 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] lg:gap-2">
                  {desktopItems.map((item) => (
                    <li
                      key={`${item.label}-${item.value || item.key || ''}`}
                      className="relative"
                      onMouseEnter={item.type === 'submenu' ? () => openDesktopSubmenu(item.key) : undefined}
                      onMouseLeave={item.type === 'submenu' ? scheduleDesktopSubmenuClose : undefined}
                    >
                      {item.type === 'submenu' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              clearDesktopCloseTimer()
                              setOpenDesktopMenu((prev) => (prev === item.key ? null : item.key))
                            }}
                            className={`focus-brand group relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                              isItemSelected(item)
                                ? 'bg-[#fff1d6] text-[#c98012] shadow-[inset_0_0_0_1px_rgba(244,179,71,0.22)]'
                                : 'text-[#1f1f1f] hover:bg-white hover:text-castleton'
                            }`}
                          >
                            <span>{item.label}</span>
                            <motion.div
                              animate={{ rotate: openDesktopMenu === item.key ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {openDesktopMenu === item.key && (
                              <motion.div
                                onMouseEnter={() => openDesktopSubmenu(item.key)}
                                onMouseLeave={scheduleDesktopSubmenuClose}
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-3 min-w-[280px] rounded-xl border border-[#eadfce] bg-[rgba(255,251,245,0.98)] p-2 backdrop-blur-xl shadow-[0_18px_44px_rgba(50,32,10,0.14)]"
                              >
                                {item.children.map((subItem) => (
                                  <button
                                    key={subItem.path}
                                    type="button"
                                    onClick={() => {
                                      handlePath(subItem.path)
                                      setOpenDesktopMenu(null)
                                    }}
                                    className={`group flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-xs font-semibold transition-all duration-200 ${
                                      isChildSelected(subItem.path)
                                        ? 'bg-[#fff1d6] text-[#c98012]'
                                        : 'text-[#2f2f2f] hover:bg-white hover:text-castleton'
                                    }`}
                                  >
                                    <span>{subItem.label}</span>
                                    <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            item.type === 'section' ? handleSection(item.value) : handlePath(item.value)
                          }
                          className={`focus-brand relative inline-flex items-center rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                            item.label === 'Sign In'
                              ? 'ml-3 rounded-full border border-saffron bg-saffron px-5 py-2 text-white hover:border-[#d98d18] hover:bg-[#d98d18] hover:text-white hover:shadow-[0_8px_24px_rgba(244,179,71,0.3)] hover:scale-105'
                              : isItemSelected(item)
                                ? 'bg-[#fff1d6] text-[#c98012] shadow-[inset_0_0_0_1px_rgba(244,179,71,0.22)]'
                                : 'text-[#1f1f1f] hover:bg-white hover:text-castleton'
                          }`}
                        >
                          {item.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Mobile Menu Button */}
            {useCompactNav && (
              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="focus-brand rounded-lg p-2 text-serpent transition-all duration-200 hover:bg-saffron/10 hover:text-saffron"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.div>
              </button>
            )}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0" aria-hidden="true">
            <div ref={navMeasureRef} className="px-6 py-3.5 sm:px-8 sm:py-4">
              <div ref={navRequiredRef} className="flex items-center gap-1 lg:gap-2 whitespace-nowrap">
                {desktopItems.map((item) => (
                  <span
                    key={`measure-${item.label}-${item.value || item.key || ''}`}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${
                      item.label === 'Sign In' ? 'ml-3 rounded-full border border-saffron px-5' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.type === 'submenu' ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {useCompactNav && isOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 border-t border-white/20 pt-4 mt-4">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          type="button"
                          onClick={() => handleItemClick(item)}
                          className={`focus-brand w-full rounded-lg px-4 py-3 text-left text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                            item.label === 'Sign In'
                              ? 'text-white bg-gradient-to-r from-saffron to-saffron/85 hover:shadow-[0_8px_24px_rgba(244,179,71,0.3)]'
                              : isItemSelected(item)
                                ? 'text-saffron bg-saffron/15'
                                : 'text-serpent hover:text-saffron hover:bg-saffron/8'
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.type === 'submenu' && (
                            <motion.div
                              animate={{ rotate: openSubmenus[item.key] ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </motion.div>
                          )}
                        </button>

                        {/* Mobile Submenu */}
                        {item.type === 'submenu' && (
                          <AnimatePresence>
                            {openSubmenus[item.key] && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden mt-2 space-y-2 pl-4"
                              >
                                {item.children.map((subItem) => (
                                  <li key={subItem.path}>
                                    <button
                                      type="button"
                                      onClick={() => handlePath(subItem.path)}
                                      className={`focus-brand w-full rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all duration-200 flex items-center justify-between ${
                                        isChildSelected(subItem.path)
                                          ? 'text-saffron bg-saffron/15'
                                          : 'text-serpent/80 hover:text-saffron hover:bg-saffron/10'
                                      }`}
                                    >
                                      <span>{subItem.label}</span>
                                      <ArrowRight className="h-3 w-3 opacity-0 transition-all duration-200 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0" />
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {useCompactNav && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePanel}
            className="fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navigation
