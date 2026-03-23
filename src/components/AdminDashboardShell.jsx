import { motion } from 'framer-motion'
import { AlignJustify, FileText, LogOut, TrendingUp, UserCheck2, UserSquare2 } from 'lucide-react'

export default function AdminDashboardShell({
  chatWidget,
  isAdminNavOpen,
  adminNavRef,
  adminProfileForm,
  adminMenuItems,
  canManageApprovals,
  activeAdminTab,
  hasPendingApplications,
  unreviewedPendingApplicationsCount,
  UnreadNotificationBadgeComponent,
  onCloseMobileNav,
  onHoverNavToggle,
  onToggleNav,
  onOpenProfile,
  onSelectTab,
  onSignOut,
  activeAdminData,
  pendingApprovalsCount,
  pendingApplicationsCount,
  totalInterns,
  averagePerformance,
  adminNotice,
  isAdminDataLoading,
  adminDataError,
  children,
}) {
  const overviewCards = [
    {
      label: 'Pending Approvals',
      value: pendingApprovalsCount,
      icon: UserCheck2,
      tone: 'bg-[#fff6e4] text-[#8a5a14] border-[#f0d8a8]',
      targetTab: 'Approvals',
    },
    {
      label: 'Pending Applications',
      value: pendingApplicationsCount,
      icon: FileText,
      tone: 'bg-[#e9f3ee] text-castleton border-castleton/20',
      targetTab: 'Applications',
    },
    {
      label: 'Active Interns',
      value: totalInterns,
      icon: UserSquare2,
      tone: 'bg-[#eef2ff] text-[#3c4a7a] border-[#d8def5]',
      targetTab: 'Manage Interns',
    },
    {
      label: 'Avg Performance',
      value: `${averagePerformance}%`,
      icon: TrendingUp,
      tone: 'bg-[#f7f8f6] text-[#5f5a44] border-[#e6e2d6]',
      targetTab: 'Analytics',
    },
  ]

  return (
    <section className="w-full text-black lg:min-h-screen">
      {chatWidget}
      <div className="relative">
        {isAdminNavOpen ? (
          <button
            type="button"
            onClick={onCloseMobileNav}
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            aria-label="Close navigation"
          />
        ) : null}
        <div
          ref={adminNavRef}
          className={`admin-sidebar-scroll space-y-3 flex flex-col items-center fixed left-0 top-0 inset-y-0 z-50 justify-start overflow-y-auto overscroll-contain pt-5 pb-4 transition-[width] duration-300 ${
            isAdminNavOpen
              ? 'w-[240px] sm:w-[260px] lg:w-[280px] px-3 sm:px-4 bg-[linear-gradient(165deg,#0f5a3f,#0d4d38_52%,#0a3f31)] border-r border-castleton/30'
              : 'w-[56px] sm:w-[60px] px-2 bg-[linear-gradient(165deg,#0f5a3f,#0d4d38_52%,#0a3f31)] border-r border-castleton/30'
          }`}
          onMouseEnter={undefined}
        >
          <div className={`w-full ${isAdminNavOpen ? 'grid grid-cols-[1fr_auto_1fr] items-center' : 'flex items-center justify-center'}`}>
            <div />
            {isAdminNavOpen ? (
              <div className="h-14 flex items-center justify-center lg:h-16">
                <img
                  src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                  alt="Lifewood logo"
                  className="h-5 w-auto lg:h-7"
                />
              </div>
            ) : null}
            <div className={isAdminNavOpen ? 'flex items-center justify-end' : ''}>
              <button
                type="button"
                onMouseEnter={onHoverNavToggle}
                onClick={onToggleNav}
                className="focus-brand inline-flex items-center justify-center text-white hover:text-white/80 transition-colors"
                aria-label={isAdminNavOpen ? 'Hide navigation' : 'Show navigation'}
              >
                <AlignJustify className="w-5 h-5" />
              </button>
            </div>
          </div>
          {isAdminNavOpen ? (
            <aside className="w-full min-h-0 flex-1 rounded-[26px] lg:rounded-[18px] border border-castleton/25 bg-transparent text-[#eef4e9] overflow-hidden shadow-soft lg:shadow-none">
              <div className="flex h-full min-h-0 flex-col">
                <div className="p-3 mt-2 space-y-3">
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="focus-brand w-full rounded-xl border border-white/30 bg-white/5 px-3 py-3 text-left hover:bg-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex w-8 h-8 rounded-full items-center justify-center bg-saffron text-black font-bold">
                        {(adminProfileForm.firstName?.[0] || 'L').toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {adminProfileForm.firstName} {adminProfileForm.lastName}
                        </p>
                        <p className="text-xs text-white/80 truncate">{adminProfileForm.email}</p>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="admin-sidebar-scroll min-h-0 flex-1 overflow-y-auto px-3 pb-4">
                  <nav className="space-y-2 pr-1">
                    {adminMenuItems
                      .filter((item) => item.label !== 'Approvals' || canManageApprovals)
                      .map((item) => {
                        const Icon = item.icon
                        const displayLabel = item.label === 'Applications' ? 'Applicants' : item.label === 'Approvals' ? 'Admin Approval' : item.label
                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => onSelectTab(item.label, `${item.label} panel opened`)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors ${
                              activeAdminTab === item.label
                                ? 'bg-saffron/20 border border-saffron/45 text-saffron font-semibold'
                                : 'hover:bg-white/10 text-white/90'
                            }`}
                          >
                            <span className="flex items-center justify-between gap-2">
                              <span className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {displayLabel}
                              </span>
                              {item.label === 'Applications' && hasPendingApplications ? (
                                <UnreadNotificationBadgeComponent count={unreviewedPendingApplicationsCount} />
                              ) : null}
                            </span>
                          </button>
                        )
                      })}
                  </nav>
                </div>
                <div className="mt-auto px-3 pb-3">
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="focus-brand w-full rounded-xl border border-white/30 px-3 py-2.5 text-sm sm:text-base font-semibold hover:bg-white/15 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>
          ) : (
            <div className="mt-2 w-full min-h-0 flex-1 flex flex-col items-center justify-between pb-3">
              <nav className="admin-sidebar-scroll w-full min-h-0 flex-1 overflow-y-auto flex flex-col items-center gap-2 pr-0.5">
                {adminMenuItems
                  .filter((item) => item.label !== 'Approvals' || canManageApprovals)
                  .map((item) => {
                    const Icon = item.icon
                    const displayLabel = item.label === 'Applications' ? 'Applicants' : item.label === 'Approvals' ? 'Admin Approval' : item.label
                    const isActive = activeAdminTab === item.label
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => onSelectTab(item.label, `${item.label} panel opened`)}
                        className={`focus-brand relative inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                          isActive ? 'bg-saffron/25 text-saffron' : 'text-white/90 hover:bg-white/10'
                        }`}
                        aria-label={displayLabel}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label === 'Applications' && hasPendingApplications ? (
                          <UnreadNotificationBadgeComponent count={unreviewedPendingApplicationsCount} compact />
                        ) : null}
                      </button>
                    )
                  })}
              </nav>
              <button
                type="button"
                onClick={onSignOut}
                className="focus-brand inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/90 hover:bg-white/10 transition-colors"
                aria-label="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <main className={`admin-glass p-1 sm:p-2 min-h-screen ${isAdminNavOpen ? 'ml-[60px] sm:ml-[64px] lg:ml-[280px]' : 'ml-[56px] sm:ml-[60px]'}`}>
          <div className="sticky top-0 z-20 -mx-1 sm:-mx-2 px-1 sm:px-2 pt-1 pb-3 bg-gradient-to-b from-[#f7faf8] via-[#f7faf8]/90 to-transparent backdrop-blur">
            <div className="rounded-[22px] border border-castleton/15 bg-white/90 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.18em] text-castleton/70">Admin Dashboard</p>
                <h1 className="text-3xl sm:text-4xl font-semibold">{activeAdminData.heading}</h1>
                <span className="inline-flex items-center rounded-full bg-white border border-castleton/15 px-3 py-1 text-xs font-semibold">
                  {activeAdminData.badge}
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
              {overviewCards.map((card) => {
                const Icon = card.icon
                return (
                  <motion.button
                    key={card.label}
                    type="button"
                    onClick={() => onSelectTab(card.targetTab, `${card.label} opened`)}
                    className={`rounded-2xl border px-4 py-3 bg-white/90 shadow-sm text-left transition-transform ${card.tone}`}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.12em]">{card.label}</p>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">{card.value}</p>
                  </motion.button>
                )
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {adminNotice ? (
                <motion.p
                  className="text-xs inline-flex rounded-full bg-white border border-castleton/15 px-3 py-1.5"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {adminNotice}
                </motion.p>
              ) : null}
              {isAdminDataLoading ? (
                <p className="text-xs inline-flex rounded-full bg-white border border-castleton/15 px-3 py-1.5">
                  Syncing admin data from Supabase...
                </p>
              ) : null}
              {adminDataError ? (
                <p className="text-xs inline-flex rounded-full bg-[#fde8e8] border border-[#efb6b6] px-3 py-1.5 text-[#8a3528]">
                  {adminDataError}
                </p>
              ) : null}
            </div>
          </div>
          {children}
        </main>
      </div>
    </section>
  )
}
