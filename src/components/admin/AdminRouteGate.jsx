import { Suspense, lazy } from 'react'
import { adminMenuItems } from '../../lib/appContent'
import { SectionFallback, UnreadNotificationBadge } from '../app/AppShellPrimitives'

const AdminDashboardShell = lazy(() => import('../AdminDashboardShell'))

export default function AdminRouteGate({
  isAuthReady,
  hasAdminAccess,
  restrictedFallback,
  chatWidget,
  isAdminNavOpen,
  adminNavRef,
  adminProfileForm,
  canManageApprovals,
  activeAdminTab,
  hasPendingApplications,
  unreviewedPendingApplicationsCount,
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
  if (!isAuthReady) {
    return (
      <section className="max-w-xl mx-auto">
        <div className="bg-[#f3f3f3] rounded-3xl border border-castleton/15 p-7 sm:p-9 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Checking Session</h1>
          <p className="text-black/75 text-lg">Verifying your Supabase session and admin access.</p>
        </div>
      </section>
    )
  }

  if (!hasAdminAccess) {
    return restrictedFallback || null
  }

  return (
    <Suspense fallback={<SectionFallback className="min-h-screen" />}>
      <AdminDashboardShell
        chatWidget={chatWidget}
        isAdminNavOpen={isAdminNavOpen}
        adminNavRef={adminNavRef}
        adminProfileForm={adminProfileForm}
        adminMenuItems={adminMenuItems}
        canManageApprovals={canManageApprovals}
        activeAdminTab={activeAdminTab}
        hasPendingApplications={hasPendingApplications}
        unreviewedPendingApplicationsCount={unreviewedPendingApplicationsCount}
        UnreadNotificationBadgeComponent={UnreadNotificationBadge}
        onCloseMobileNav={onCloseMobileNav}
        onHoverNavToggle={onHoverNavToggle}
        onToggleNav={onToggleNav}
        onOpenProfile={onOpenProfile}
        onSelectTab={onSelectTab}
        onSignOut={onSignOut}
        activeAdminData={activeAdminData}
        pendingApprovalsCount={pendingApprovalsCount}
        pendingApplicationsCount={pendingApplicationsCount}
        totalInterns={totalInterns}
        averagePerformance={averagePerformance}
        adminNotice={adminNotice}
        isAdminDataLoading={isAdminDataLoading}
        adminDataError={adminDataError}
      >
        {children}
      </AdminDashboardShell>
    </Suspense>
  )
}
