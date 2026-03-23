import { AnimatePresence, motion } from 'framer-motion'

export default function DashboardTab({
  totalInterns,
  internAnalyticsData,
  presentInterns,
  presentPercent,
  leaveInterns,
  leavePercent,
  lateInterns,
  latePercent,
  selectedDashboardGroup,
  onOpenDashboardGroup,
  onCloseDashboardGroup,
  getInternStatusLabel,
  dashboardAttendanceRows,
  onRunAdminAction,
  birthdayInterns,
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
          <h2 className="text-3xl sm:text-4xl font-semibold text-black">Hello, Lifewood Team!</h2>
          <p className="text-black/70 text-base sm:text-lg">Hope you are having a productive day :)</p>
        </div>
        <button
          type="button"
          onClick={() => onRunAdminAction('Today filter selected')}
          className="focus-brand rounded-full border border-castleton/20 bg-[#f3f5f4] px-4 py-2 text-base font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
        >
          Today
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.85fr] gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Total Interns',
                value: String(totalInterns),
                detail: 'Mar',
                accent: 'from-[#eef2ff] to-[#f8f9ff]',
                percent: 100,
                tone: 'bg-castleton',
                interns: internAnalyticsData,
              },
              {
                title: 'Interns Present Today',
                value: String(presentInterns.length),
                detail: `${presentPercent}%`,
                accent: 'from-[#eefaf1] to-[#f7fff9]',
                percent: presentPercent,
                tone: 'bg-castleton',
                interns: presentInterns,
              },
              {
                title: 'Interns on Leave',
                value: String(leaveInterns.length).padStart(2, '0'),
                detail: `${leavePercent}%`,
                accent: 'from-[#fff3f1] to-[#fff8f7]',
                percent: leavePercent,
                tone: 'bg-[#b64b4b]',
                interns: leaveInterns,
              },
              {
                title: 'Interns Late Today',
                value: String(lateInterns.length),
                detail: `${latePercent}%`,
                accent: 'from-[#f7f8f6] to-[#fcfcfb]',
                percent: latePercent,
                tone: 'bg-[#c07a2a]',
                interns: lateInterns,
              },
            ].map((card, index) => (
              <motion.button
                key={card.title}
                type="button"
                onClick={() => onOpenDashboardGroup({ title: card.title, interns: card.interns })}
                className={`w-full text-left rounded-[22px] border border-castleton/15 bg-gradient-to-br ${card.accent} p-5`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3, boxShadow: '0 14px 30px -24px rgba(11,92,66,0.55)' }}
                transition={{ duration: 0.24, delay: index * 0.04 }}
              >
                <p className="text-black/80 text-lg font-medium">{card.title}</p>
                <div className="mt-5 flex items-end justify-between gap-2">
                  <p className="text-5xl font-semibold text-black">{card.value}</p>
                  <span className="text-black/55 text-sm font-semibold">{card.detail}</span>
                </div>
                <div className="mt-4 h-4 rounded-full bg-[#dfe5e0] overflow-hidden">
                  <motion.div
                    className={`h-full ${card.tone}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${card.percent}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 + index * 0.06 }}
                  />
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedDashboardGroup ? (
              <motion.div
                className="fixed inset-0 z-[85] bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onCloseDashboardGroup}
              >
                <motion.div
                  className="w-full max-w-2xl rounded-[24px] border border-castleton/25 bg-[#f5f7f6] shadow-2xl p-5 sm:p-6"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Intern List</p>
                      <h3 className="text-2xl sm:text-3xl font-semibold text-black leading-tight">
                        {selectedDashboardGroup.title}
                      </h3>
                      <p className="text-sm text-black/65 mt-1">
                        {selectedDashboardGroup.interns.length} intern
                        {selectedDashboardGroup.interns.length === 1 ? '' : 's'} in this card
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onCloseDashboardGroup}
                      className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  <div className="max-h-[420px] overflow-y-auto pr-1 space-y-2">
                    {selectedDashboardGroup.interns.length ? (
                      selectedDashboardGroup.interns.map((intern) => (
                        <div
                          key={`${selectedDashboardGroup.title}-${intern.name}`}
                          className="admin-name-card rounded-xl border border-castleton/15 bg-white px-3.5 py-3"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm sm:text-base font-semibold text-black">{intern.name}</p>
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                intern.low ? 'bg-[#fff0ed] text-[#9d4436]' : 'bg-[#e9f3ee] text-castleton'
                              }`}
                            >
                              {getInternStatusLabel(intern.status || (intern.low ? 'Needs Support' : 'Active'))}
                            </span>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-black/65">{intern.email || 'No email'}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-black/70 rounded-xl border border-castleton/15 bg-white p-4">
                        No interns found for this category.
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.article
            className="rounded-[22px] border border-castleton/15 bg-white p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.12 }}
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-3xl font-semibold text-black">Today's Attendance</h3>
              <button
                type="button"
                onClick={() => onRunAdminAction('Attendance report opened')}
                className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
              >
                View report
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="sticky top-0 z-10 bg-[#eef4f0]">
                  <tr className="text-black/75 border-b border-castleton/15">
                    <th className="py-2 pr-4 text-sm font-semibold">Intern Name</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Intern Id</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Check-in</th>
                    <th className="py-2 pr-4 text-sm font-semibold">Check-out</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardAttendanceRows.map((row) => (
                    <tr key={row.id} className="border-b border-castleton/10">
                      <td className="py-2 pr-4 text-base font-medium text-black">{row.name}</td>
                      <td className="py-2 pr-4 text-black/80">{row.id}</td>
                      <td className="py-2 pr-4 text-black/80">{row.checkin}</td>
                      <td className="py-2 pr-4 text-black/80">{row.checkout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.article>
        </div>

        <div className="space-y-4">
          <motion.article
            className="rounded-[22px] border border-castleton/15 bg-white p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.08 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-black">Interns Present</h3>
              <span className="inline-flex rounded-full bg-[#edf3ef] px-3 py-1 text-sm font-semibold text-castleton">
                {presentInterns.length}/{totalInterns}
              </span>
            </div>
            <div className="space-y-2">
              {presentInterns.slice(0, 5).map((person, idx) => (
                <button
                  key={person.name}
                  type="button"
                  onClick={() => onRunAdminAction(`Checked ${person.name} status`)}
                  className="admin-name-card w-full rounded-xl border border-castleton/10 bg-[#f8faf9] px-3 py-2 flex items-center gap-3 hover:border-castleton/30 transition-colors"
                >
                  <span className="min-w-0 flex-1 font-medium text-black text-left">{person.name}</span>
                  <span className="w-[76px] shrink-0 text-right text-black/75 text-sm tabular-nums">{`09:${String(2 + idx).padStart(2, '0')}`}</span>
                  <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-[#1e8f51]" />
                </button>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="rounded-[22px] border border-castleton/15 bg-white p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.12 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-black">Interns on Leave</h3>
              <span className="inline-flex rounded-full bg-[#f7ece9] px-3 py-1 text-sm font-semibold text-[#8b3f2f]">
                {String(leaveInterns.length).padStart(2, '0')}/{totalInterns}
              </span>
            </div>
            <div className="space-y-2">
              {leaveInterns.map((person, idx) => (
                <button
                  key={person.name}
                  type="button"
                  onClick={() => onRunAdminAction(`Leave details: ${person.name}`)}
                  className="admin-name-card w-full rounded-xl border border-castleton/10 bg-[#fdfdfd] px-3 py-2 flex items-center gap-3 hover:border-castleton/30 transition-colors"
                >
                  <span className="min-w-0 flex-1 font-medium text-black text-left">{person.name}</span>
                  <span className="w-[92px] shrink-0 text-right text-black/75 text-sm tabular-nums">{`${2 + idx}/5 days`}</span>
                </button>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="rounded-[22px] border border-castleton/15 bg-white p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.16 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-black">Birthdays</h3>
              <span className="inline-flex rounded-full bg-[#f0f0f8] px-3 py-1 text-sm font-semibold text-[#35417c]">
                {birthdayInterns.length}/{totalInterns}
              </span>
            </div>
            {birthdayInterns.map((person) => (
              <div key={person.name} className="admin-name-card rounded-xl border border-castleton/10 bg-[#f8f9ff] px-3 py-3">
                <p className="font-medium text-black">{person.name}</p>
                <p className="text-black/70 text-sm">{person.date}</p>
              </div>
            ))}
          </motion.article>
        </div>
      </div>
    </div>
  )
}
