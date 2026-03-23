import { AnimatePresence, motion } from 'framer-motion'
import ViewModeToggle from './ViewModeToggle'

export default function ReportsTab({
  reportsSortBy,
  onSortChange,
  reportsSearchRef,
  reportsSearch,
  onSearchChange,
  reportsViewMode,
  onViewChange,
  filteredReportInsights,
  onOpenInternDetails,
  selectedAnalyticsIntern,
  onCloseInternDetails,
  getInternBreakdown,
}) {
  return (
    <div className="space-y-5">
      <motion.div
        className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-1">Performance Reports</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Operational report snapshots with KPI trend, delivery status, and intern-level details.
            </p>
          </div>
          <select
            value={reportsSortBy}
            onChange={(event) => onSortChange(event.target.value)}
            className="focus-brand rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-sm font-semibold text-castleton"
          >
            <option value="score-desc">Sort: Score High-Low</option>
            <option value="score-asc">Sort: Score Low-High</option>
            <option value="name-asc">Sort: Name A-Z</option>
            <option value="name-desc">Sort: Name Z-A</option>
          </select>
          <input
            type="text"
            ref={reportsSearchRef}
            value={reportsSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search intern"
            className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
          />
          <ViewModeToggle value={reportsViewMode} onChange={onViewChange} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            ['Avg Eval', Math.round(filteredReportInsights.reduce((sum, item) => sum + item.score, 0) / Math.max(filteredReportInsights.length, 1)), '%'],
            ['Avg QA Pass', Math.round(filteredReportInsights.reduce((sum, item) => sum + item.qaPassRate, 0) / Math.max(filteredReportInsights.length, 1)), '%'],
            ['Tasks Done', filteredReportInsights.reduce((sum, item) => sum + item.completedTasks, 0), ''],
            ['Watch/At Risk', filteredReportInsights.filter((item) => item.attendanceFlag !== 'Healthy').length, ''],
            ['Low Performers', filteredReportInsights.filter((item) => item.low).length, ''],
          ].map(([label, value, suffix]) => (
            <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f6f9f7] p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
              <p className="text-xl font-semibold text-black">
                {value}
                {suffix}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {reportsViewMode === 'tiles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReportInsights.map((intern, index) => (
            <motion.button
              key={`report-${intern.name}`}
              type="button"
              onClick={() => onOpenInternDetails(intern, 'report')}
              className="admin-name-card rounded-[22px] border border-castleton/15 bg-white p-4 sm:p-5 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(index * 0.012, 0.2) }}
              whileHover={{ y: -4, boxShadow: '0 16px 36px -28px rgba(11,92,66,0.45)' }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-black leading-tight">{intern.name}</h3>
                  <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                  <p className="text-[11px] text-black/60 mt-1">
                    {intern.gender || '-'} | {intern.course || '-'}
                  </p>
                </div>
                <span className="text-sm font-semibold text-castleton">{intern.score}%</span>
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-black/55 mb-3">{intern.track || 'AI Data Operations'}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                  <p className="text-[11px] text-black/60">Tasks</p>
                  <p className="text-lg font-semibold text-black">{intern.completedTasks}</p>
                </div>
                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                  <p className="text-[11px] text-black/60">QA Pass</p>
                  <p className="text-lg font-semibold text-black">{intern.qaPassRate}%</p>
                </div>
                <div className="rounded-xl bg-[#f3f7f5] border border-castleton/10 px-2.5 py-2">
                  <p className="text-[11px] text-black/60">Trend</p>
                  <p className="text-lg font-semibold text-black">{intern.trend}</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden mb-2">
                <motion.div
                  className={intern.low ? 'h-full bg-[#c05345]' : 'h-full bg-castleton'}
                  initial={{ width: 0 }}
                  animate={{ width: `${intern.score}%` }}
                  transition={{ duration: 0.42 }}
                />
              </div>
              <p className="text-sm text-black/75">Attendance status: {intern.attendanceFlag}</p>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReportInsights.map((intern, index) => (
            <motion.button
              key={`report-content-${intern.name}`}
              type="button"
              onClick={() => onOpenInternDetails(intern, 'report')}
              className="admin-name-card w-full rounded-[22px] border border-castleton/15 bg-white p-4 text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.012, 0.18) }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-[240px]">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-black">{intern.name}</h3>
                    <span className="text-sm font-semibold text-castleton">{intern.score}%</span>
                  </div>
                  <p className="mt-1 text-sm text-black/65">{intern.track || 'AI Data Operations'}</p>
                  <p className="text-xs text-black/55">Attendance status: {intern.attendanceFlag}</p>
                </div>
                <div className="grid min-w-[280px] grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    ['Eval', `${intern.score}%`],
                    ['QA Pass', `${intern.qaPassRate}%`],
                    ['Tasks', intern.completedTasks],
                    ['Trend', intern.trend],
                  ].map(([label, value]) => (
                    <div key={`${intern.name}-${label}`} className="rounded-xl border border-castleton/10 bg-[#f7faf8] px-3 py-2">
                      <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">{label}</p>
                      <p className="mt-1 text-lg font-semibold text-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedAnalyticsIntern ? (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseInternDetails}
          >
            <motion.div
              className="w-full max-w-3xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Report Detail</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                  <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                  <p className="text-sm text-black/65 mt-1">
                    {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                  </p>
                  <p className="text-sm text-black/65 mt-1">
                    {selectedAnalyticsIntern.contact || '-'} | {selectedAnalyticsIntern.requiredHours || '-'} hrs required
                  </p>
                  <p className="text-sm text-black/65 mt-1">Monthly report pack: March 2026</p>
                </div>
                <button
                  type="button"
                  onClick={onCloseInternDetails}
                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  ['Performance', selectedAnalyticsIntern.performance],
                  ['Attendance', selectedAnalyticsIntern.attendance],
                  ['Progress', selectedAnalyticsIntern.progress],
                  ['Eval', getInternBreakdown(selectedAnalyticsIntern).evalScore],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-castleton/15 bg-white p-3.5">
                    <p className="text-sm text-black/70">{label}</p>
                    <p className="text-3xl font-semibold text-black">{value}%</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-castleton/15 bg-white p-4">
                <p className="text-sm font-semibold text-black mb-1">Narrative Summary</p>
                <p className="text-sm text-black/75 leading-relaxed">
                  This intern delivered measurable output quality with stable attendance. Next action is to align difficulty
                  of assigned tasks with current strengths while monitoring consistency for upcoming delivery cycles.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
