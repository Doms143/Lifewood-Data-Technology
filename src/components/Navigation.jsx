import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react'

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
    const measure = () => {
      const availableEl = navMeasureRef.current
      const requiredEl = navRequiredRef.current
      if (!availableEl || !requiredEl) return
      const requiredWidth = requiredEl.scrollWidth
      const availableWidth = availableEl.clientWidth
      const shouldUseCompact = requiredWidth > (availableWidth - 20)
      setUseCompactNav(shouldUseCompact)
      if (shouldUseCompact) {
        setOpenDesktopMenu(null)
      } else {
        setIsOpen(false)
      }
    }

    measure()
    requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    const viewport = window.visualViewport
    viewport?.addEventListener('resize', measure)
    viewport?.addEventListener('scroll', measure)
    return () => {
      window.removeEventListener('resize', measure)
      viewport?.removeEventListener('resize', measure)
      viewport?.removeEventListener('scroll', measure)
    }
  }, [desktopItems.length])

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3">
      <motion.div
        className="max-w-7xl mx-auto relative"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className={`nav-shell ${useCompactNav && isOpen ? 'nav-shell-open' : ''} ${!useCompactNav ? 'nav-shell-desktop' : ''} rounded-[34px] px-6 sm:px-10 pt-4 pb-3`}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleSection('hero')}
              className="hover:opacity-85 transition-opacity"
            >
              <img
                src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                alt="Lifewood logo"
                className="h-10 sm:h-11 w-auto"
              />
            </button>
            <div ref={navMeasureRef} className="flex-1 min-w-0 pl-4 sm:pl-6">
              <div className="absolute invisible pointer-events-none h-0 overflow-hidden">
                <ul ref={navRequiredRef} className="flex items-center gap-3 lg:gap-4 whitespace-nowrap">
                  {desktopItems.map((item) => (
                    <li key={`measure-${item.label}`} className="text-[11px] sm:text-xs lg:text-sm font-semibold">
                      {item.type === 'submenu' ? `${item.label} ▼` : item.label}
                    </li>
                  ))}
                </ul>
              </div>
              {useCompactNav ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    className="focus-brand text-serpent hover:text-castleton transition-colors p-1"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isOpen}
                  >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                  </button>
                </div>
              ) : (
                <nav className="w-full" ref={desktopNavRef}>
                  <ul className="flex items-center justify-end gap-3 lg:gap-4 whitespace-nowrap">
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
                              className={`focus-brand inline-flex items-center gap-1 text-[11px] sm:text-xs lg:text-sm font-semibold transition-colors ${
                                isItemSelected(item) ? 'text-[#D79A44]' : 'text-serpent hover:text-castleton'
                              }`}
                            >
                              <span>{item.label}</span>
                              {openDesktopMenu === item.key ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                            <AnimatePresence>
                              {openDesktopMenu === item.key ? (
                                <motion.ul
                                  onMouseEnter={() => openDesktopSubmenu(item.key)}
                                  onMouseLeave={scheduleDesktopSubmenuClose}
                                  initial={{ opacity: 0, y: -8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.18 }}
                                  className="nav-dropdown-glass absolute right-0 mt-2 min-w-[260px] rounded-2xl p-2 z-30"
                                >
                                  {item.children.map((subItem) => (
                                    <li key={subItem.path}>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handlePath(subItem.path)
                                          setOpenDesktopMenu(null)
                                        }}
                                        className={`focus-brand w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#f6f8f4] transition-colors ${
                                          isChildSelected(subItem.path) ? 'text-[#D79A44]' : 'text-serpent hover:text-castleton'
                                        }`}
                                      >
                                        {subItem.label}
                                      </button>
                                    </li>
                                  ))}
                                </motion.ul>
                              ) : null}
                            </AnimatePresence>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => (item.type === 'section' ? handleSection(item.value) : handlePath(item.value))}
                            className={`focus-brand text-[11px] sm:text-xs lg:text-sm font-semibold transition-colors ${
                              item.label === 'Sign In'
                                ? 'ml-1 rounded-full border border-[#133020] px-3 py-1.5 bg-[#133020] text-[#f5eedb] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_24px_-14px_rgba(19,48,32,0.75)] hover:bg-[#ffb347] hover:border-[#ffb347] hover:text-[#133020]'
                                : isItemSelected(item)
                                  ? 'text-[#D79A44]'
                                  : 'text-serpent hover:text-castleton'
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
            </div>
          </div>

          <AnimatePresence>
            {useCompactNav && isOpen ? (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="pt-8 pb-4"
              >
                <ul className="space-y-4 sm:space-y-5">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className={`focus-brand flex items-center gap-2 text-left text-sm sm:text-base leading-tight font-medium transition-colors ${
                          item.label === 'Sign In'
                            ? 'inline-flex rounded-full border border-[#133020] px-4 py-2 bg-[#133020] text-[#f5eedb] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_10px_24px_-14px_rgba(19,48,32,0.75)] hover:bg-[#ffb347] hover:border-[#ffb347] hover:text-[#133020]'
                            : isItemSelected(item)
                              ? 'text-[#D79A44]'
                              : 'text-serpent hover:text-castleton'
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.type === 'submenu' ? (
                          openSubmenus[item.key] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />
                        ) : null}
                      </button>

                      {item.type === 'submenu' ? (
                        <AnimatePresence>
                          {openSubmenus[item.key] ? (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 sm:pl-6 pt-3 space-y-3 overflow-hidden"
                            >
                              {item.children.map((subItem) => (
                                <li key={subItem.path}>
                                  <button
                                    type="button"
                                    onClick={() => handlePath(subItem.path)}
                                    className={`focus-brand text-left text-xs sm:text-sm font-semibold transition-colors ${
                                      isChildSelected(subItem.path) ? 'text-[#D79A44]' : 'text-serpent/80 hover:text-castleton'
                                    }`}
                                  >
                                    {subItem.label}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  )
}

export default Navigation
