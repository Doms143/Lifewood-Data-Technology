import { AnimatePresence, motion } from 'framer-motion'
import ViewModeToggle from './ViewModeToggle'

export default function EvaluationTab({
  evaluationSortBy,
  onSortChange,
  evaluationSearchRef,
  evaluationSearch,
  onSearchChange,
  evaluationViewMode,
  onViewChange,
  filteredEvaluationInsights,
  onOpenInternDetails,
  selectedAnalyticsIntern,
  onCloseInternDetails,
  getInternBreakdown,
  getInternStatusLabel,
}) {
  return (
    <div className="space-y-5">
      <motion.div
        className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Evaluation Matrix</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Performance review view with risk category, mentoring direction, and current review score.
            </p>
          </div>
          <select
            value={evaluationSortBy}
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
            ref={evaluationSearchRef}
            value={evaluationSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search intern"
            className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
          />
          <ViewModeToggle value={evaluationViewMode} onChange={onViewChange} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            ['Excellent', filteredEvaluationInsights.filter((item) => item.band === 'Excellent').length],
            ['Strong', filteredEvaluationInsights.filter((item) => item.band === 'Strong').length],
            ['Stable', filteredEvaluationInsights.filter((item) => item.band === 'Stable').length],
            ['Needs Support', filteredEvaluationInsights.filter((item) => item.band === 'Needs Support').length],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f6f9f7] p-3">
              <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
              <p className="text-3xl font-semibold text-black">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {evaluationViewMode === 'tiles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredEvaluationInsights.map((intern, index) => (
            <motion.button
              key={`eval-${intern.name}`}
              type="button"
              onClick={() => onOpenInternDetails(intern, 'evaluation')}
              className={`admin-name-card rounded-[22px] border p-4 sm:p-5 text-left ${
                intern.band === 'Needs Support' ? 'border-[#d9aaa2] bg-[#fff2ef]' : 'border-castleton/15 bg-white'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(index * 0.02, 0.3) }}
              whileHover={{ y: -4, boxShadow: '0 16px 36px -28px rgba(11,92,66,0.45)' }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-black leading-tight">{intern.name}</h3>
                  <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                  <p className="text-[11px] text-black/60 mt-1">
                    {intern.gender || '-'} | {intern.course || '-'}
                  </p>
                  <p className="text-xs uppercase tracking-[0.12em] text-black/55 mt-1">
                    {intern.track || 'AI Data Operations'} | {getInternStatusLabel(intern.status || 'Active')}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-[#eef3ef] text-castleton px-2.5 py-1 text-xs font-semibold">{intern.band}</span>
              </div>
              <p className="text-sm text-black/75 mb-2">{intern.risk}</p>
              <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden mt-2 mb-3">
                <motion.div
                  className={intern.band === 'Needs Support' ? 'h-full bg-[#c05345]' : 'h-full bg-castleton'}
                  initial={{ width: 0 }}
                  animate={{ width: `${intern.score}%` }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>
              <p className="text-sm font-semibold text-black mb-1">{intern.score}% evaluation score</p>
              <p className="text-sm text-black/75 line-clamp-2">{intern.recommendation}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-black/65">
                <span>Review: {intern.reviewDate}</span>
                <span>P:{intern.performance}% A:{intern.attendance}% G:{intern.progress}%</span>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvaluationInsights.map((intern, index) => (
            <motion.button
              key={`eval-content-${intern.name}`}
              type="button"
              onClick={() => onOpenInternDetails(intern, 'evaluation')}
              className={`admin-name-card w-full rounded-[22px] border p-4 text-left ${
                intern.band === 'Needs Support' ? 'border-[#d9aaa2] bg-[#fff2ef]' : 'border-castleton/15 bg-white'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.012, 0.18) }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-[240px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-black">{intern.name}</h3>
                    <span className="inline-flex rounded-full bg-[#eef3ef] text-castleton px-2.5 py-1 text-xs font-semibold">{intern.band}</span>
                  </div>
                  <p className="mt-1 text-sm text-black/65">{intern.risk}</p>
                  <p className="mt-2 text-xs text-black/55">{intern.recommendation}</p>
                </div>
                <div className="grid min-w-[280px] grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    ['Score', intern.score],
                    ['Performance', intern.performance],
                    ['Attendance', intern.attendance],
                    ['Progress', intern.progress],
                  ].map(([label, value]) => (
                    <div key={`${intern.name}-${label}`} className="rounded-xl border border-castleton/10 bg-[#f7faf8] px-3 py-2">
                      <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">{label}</p>
                      <p className="mt-1 text-lg font-semibold text-black">{value}%</p>
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
              {(() => {
                const detail = getInternBreakdown(selectedAnalyticsIntern)
                const score = detail.evalScore
                return (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Evaluation Detail</p>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                        <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                        <p className="text-sm text-black/65 mt-1">
                          {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                        </p>
                        <p className="text-sm text-black/65 mt-1">
                          {selectedAnalyticsIntern.track || 'AI Data Operations'} | Mentor: {selectedAnalyticsIntern.mentor || 'Unassigned'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onCloseInternDetails}
                        className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                      {[
                        ['Performance', selectedAnalyticsIntern.performance],
                        ['Attendance', selectedAnalyticsIntern.attendance],
                        ['Progress', selectedAnalyticsIntern.progress],
                        ['Eval', score],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-castleton/15 bg-white p-3.5">
                          <p className="text-sm text-black/70">{label}</p>
                          <p className="text-3xl font-semibold text-black">{value}%</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {[
                        ['Activities', detail.activities],
                        ['Tasks', detail.tasks],
                        ['Quality', detail.quality],
                        ['Collaboration', detail.collaboration],
                        ['Consistency', detail.consistency],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-black/80">{label}</p>
                            <p className="text-sm font-semibold text-black">{value}%</p>
                          </div>
                          <div className="h-2.5 rounded-full bg-[#e7ece8] overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${selectedAnalyticsIntern.low ? 'bg-[#c05345]' : 'bg-castleton'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.45, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
