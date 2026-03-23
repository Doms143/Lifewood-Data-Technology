import { AnimatePresence, motion } from 'framer-motion'
import ViewModeToggle from './ViewModeToggle'

export default function AnalyticsTab({
  onOpenTaskModal,
  onExport,
  analyticsSearchRef,
  analyticsSearch,
  onSearchChange,
  analyticsSortBy,
  onSortChange,
  analyticsViewMode,
  onViewChange,
  analyticsTaskEntries,
  filteredAnalyticsRows,
  getInternBreakdown,
  onOpenInternDetails,
  selectedAnalyticsIntern,
  onCloseInternDetails,
  isAnalyticsTaskModalOpen,
  onCloseTaskModal,
  onAnalyticsTaskSubmit,
  analyticsTaskForm,
  setAnalyticsTaskForm,
  analyticsCourseOptions,
  analyticsTaskSelectedCourses,
  setAnalyticsTaskSelectedCourses,
  analyticsTaskError,
  internAnalyticsData,
}) {
  return (
    <div className="space-y-5">
      <motion.div
        className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Analytics</h2>
          <p className="text-black/70 text-base sm:text-lg">
            Performance, attendance, and progress by intern.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenTaskModal}
            className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-base font-semibold hover:bg-serpent transition-colors"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={onExport}
            className="focus-brand rounded-full border border-castleton/20 bg-[#f3f5f4] px-4 py-2 text-base font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
          >
            Export
          </button>
        </div>
        <input
          type="text"
          ref={analyticsSearchRef}
          value={analyticsSearch}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search intern"
          className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
        />
        <select
          value={analyticsSortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="focus-brand rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-sm font-semibold text-castleton"
        >
          <option value="name-asc">Sort: Name A-Z</option>
          <option value="name-desc">Sort: Name Z-A</option>
          <option value="performance-desc">Sort: Performance</option>
          <option value="attendance-desc">Sort: Attendance</option>
          <option value="progress-desc">Sort: Progress</option>
        </select>
        <ViewModeToggle value={analyticsViewMode} onChange={onViewChange} />
      </motion.div>

      <motion.article
        className="rounded-[22px] border border-castleton/20 bg-white p-4 sm:p-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.04 }}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-xl sm:text-xl font-semibold text-black">Recent Task Entries</h3>
          <span className="inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-xs sm:text-sm font-semibold text-castleton">
            {analyticsTaskEntries.length} item{analyticsTaskEntries.length === 1 ? '' : 's'}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {analyticsTaskEntries.slice(0, 6).map((item) => (
            <div key={item.id} className="rounded-xl border border-castleton/15 bg-[#f8faf9] p-3">
              <p className="text-sm font-semibold text-black">{item.task}</p>
              <p className="text-xs text-black/65 mt-1">{item.internName}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="inline-flex rounded-full bg-[#e8f3ed] px-2.5 py-1 text-xs font-semibold text-castleton">
                  {item.activityType}
                </span>
                <span className="text-sm font-semibold text-black">{item.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.article>

      {analyticsViewMode === 'tiles' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAnalyticsRows.map((intern, index) => {
            const breakdown = getInternBreakdown(intern)
            return (
              <motion.button
                key={intern.name}
                type="button"
                onClick={() => onOpenInternDetails(intern, 'analytics')}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`admin-name-card rounded-[22px] border p-4 sm:p-5 text-left ${
                  intern.low ? 'border-[#d9aaa2] bg-[#fff2ef]' : 'border-castleton/15 bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: Math.min(index * 0.015, 0.32) }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight text-black">{intern.name}</h3>
                    <p className="text-xs text-black/60 mt-1">{intern.school}</p>
                    <p className="text-[11px] text-black/60 mt-1">
                      {intern.gender || '-'} | {intern.course || '-'}
                    </p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${
                      intern.low
                        ? 'bg-[#f4d4ce] text-[#7d2e21]'
                        : intern.performance === 100 && intern.attendance === 100 && intern.progress === 100
                          ? 'bg-[#d9efe4] text-[#0b5a39]'
                          : 'bg-[#e8f3ed] text-castleton'
                    }`}
                  >
                    {intern.low
                      ? 'Low Performer'
                      : intern.performance === 100 && intern.attendance === 100 && intern.progress === 100
                        ? 'Top Performer'
                        : 'High Performer'}
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    ['Activities', breakdown.activities],
                    ['Tasks', breakdown.tasks],
                    ['Quality', breakdown.quality],
                  ].map(([label, value]) => (
                    <div key={`${intern.name}-${label}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-black/80">{label}</p>
                        <p className="text-sm font-semibold text-black">{value}%</p>
                      </div>
                      <div className="h-2 rounded-full bg-[#e8ece8] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${intern.low ? 'bg-[#c05345]' : 'bg-castleton'}`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm font-semibold text-black/70">{breakdown.evalScore}% overall analytics score</p>
              </motion.button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAnalyticsRows.map((intern, index) => {
            const breakdown = getInternBreakdown(intern)
            return (
              <motion.button
                key={`analytics-content-${intern.name}`}
                type="button"
                onClick={() => onOpenInternDetails(intern, 'analytics')}
                className={`admin-name-card w-full rounded-[22px] border p-4 text-left ${
                  intern.low ? 'border-[#d9aaa2] bg-[#fff2ef]' : 'border-castleton/15 bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.012, 0.18) }}
                whileHover={{ y: -2 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-[220px]">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-black">{intern.name}</h3>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${intern.low ? 'bg-[#f4d4ce] text-[#7d2e21]' : 'bg-[#e8f3ed] text-castleton'}`}>
                        {intern.low ? 'Low Performer' : 'On Track'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black/65">{intern.school}</p>
                    <p className="text-xs text-black/55">{intern.gender || '-'} | {intern.course || '-'}</p>
                  </div>
                  <div className="grid min-w-[260px] grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      ['Performance', intern.performance],
                      ['Attendance', intern.attendance],
                      ['Progress', intern.progress],
                      ['Eval', breakdown.evalScore],
                    ].map(([label, value]) => (
                      <div key={`${intern.name}-${label}`} className="rounded-xl border border-castleton/10 bg-[#f7faf8] px-3 py-2">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-black/45">{label}</p>
                        <p className="mt-1 text-lg font-semibold text-black">{value}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.button>
            )
          })}
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
              className="w-full max-w-2xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              {(() => {
                const detail = getInternBreakdown(selectedAnalyticsIntern)
                return (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Intern Breakdown</p>
                        <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">{selectedAnalyticsIntern.name}</h3>
                        <p className="text-sm text-black/65 mt-1">{selectedAnalyticsIntern.school}</p>
                        <p className="text-sm text-black/65 mt-1">
                          {selectedAnalyticsIntern.gender || '-'} | {selectedAnalyticsIntern.course || '-'}
                        </p>
                        <p className="text-sm text-black/65 mt-1">
                          {selectedAnalyticsIntern.contact || '-'} | {selectedAnalyticsIntern.requiredHours || '-'} hrs required
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                      {[
                        ['Performance', selectedAnalyticsIntern.performance],
                        ['Attendance', selectedAnalyticsIntern.attendance],
                        ['Progress', selectedAnalyticsIntern.progress],
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
                        ['Evaluation Score', detail.evalScore],
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

                    <p className="mt-5 text-sm sm:text-base text-black/75">
                      Status:{' '}
                      <span className={`font-semibold ${selectedAnalyticsIntern.low ? 'text-[#8a3528]' : 'text-castleton'}`}>
                        {selectedAnalyticsIntern.low ? 'Needs coaching and close follow-up' : 'Consistent and on-track performance'}
                      </span>
                    </p>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isAnalyticsTaskModalOpen ? (
          <motion.div
            className="fixed inset-0 z-[82] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCloseTaskModal}
          >
            <motion.form
              onSubmit={onAnalyticsTaskSubmit}
              className="w-full max-w-xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Analytics Intake</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">Add Task Entry</h3>
                </div>
                <button
                  type="button"
                  onClick={onCloseTaskModal}
                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={analyticsTaskForm.targetMode}
                  onChange={(event) =>
                    setAnalyticsTaskForm((prev) => ({ ...prev, targetMode: event.target.value }))
                  }
                  className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                >
                  <option value="individual">Individual Student</option>
                  <option value="specific-courses">Specific Courses</option>
                  <option value="all-courses">All Courses</option>
                  <option value="all-students">All Students</option>
                </select>
                {analyticsTaskForm.targetMode === 'individual' ? (
                  <select
                    value={analyticsTaskForm.internName}
                    onChange={(event) =>
                      setAnalyticsTaskForm((prev) => ({ ...prev, internName: event.target.value }))
                    }
                    className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                  >
                    <option value="">Select intern</option>
                    {internAnalyticsData.map((intern) => (
                      <option key={`task-intern-${intern.name}`} value={intern.name}>
                        {intern.name}
                      </option>
                    ))}
                  </select>
                ) : null}
                {analyticsTaskForm.targetMode === 'specific-courses' ? (
                  <div className="sm:col-span-2 rounded-xl border border-castleton/20 bg-white px-3 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-castleton mb-2">
                      Select Courses
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {analyticsCourseOptions.map((course) => {
                        const checked = analyticsTaskSelectedCourses.includes(course)
                        return (
                          <label key={`task-course-${course}`} className="flex items-center gap-2 text-sm text-black">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => {
                                setAnalyticsTaskSelectedCourses((prev) =>
                                  event.target.checked ? [...prev, course] : prev.filter((item) => item !== course)
                                )
                              }}
                              className="accent-[#0d5d43]"
                            />
                            <span className="truncate">{course}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
                <select
                  value={analyticsTaskForm.activityType}
                  onChange={(event) =>
                    setAnalyticsTaskForm((prev) => ({ ...prev, activityType: event.target.value }))
                  }
                  className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                >
                  <option value="Activity">Activity</option>
                  <option value="Task">Task</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Quality Check">Quality Check</option>
                  <option value="Project">Project</option>
                </select>
                <input
                  type="text"
                  value={analyticsTaskForm.task}
                  onChange={(event) =>
                    setAnalyticsTaskForm((prev) => ({ ...prev, task: event.target.value }))
                  }
                  placeholder="Task name"
                  className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={analyticsTaskForm.score}
                  onChange={(event) =>
                    setAnalyticsTaskForm((prev) => ({ ...prev, score: event.target.value }))
                  }
                  placeholder="Score (0-100)"
                  className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white sm:col-span-2"
                />
              </div>

              {analyticsTaskError ? (
                <p className="mt-3 rounded-xl border border-[#c05345]/35 bg-[#fff3f1] px-3 py-2 text-sm font-medium text-[#9d4436]">
                  {analyticsTaskError}
                </p>
              ) : null}

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onCloseTaskModal}
                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                >
                  Save Task
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
