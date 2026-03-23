import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function ApprovalsTab({
  signupRequests,
  filteredApprovalRequests,
  approvalSearchRef,
  approvalSearch,
  onSearchChange,
  approvalSortBy,
  onSortChange,
  approvalNoteDrafts,
  onApprovalNoteChange,
  onDecision,
  onDeleteRequest,
}) {
  return (
    <div className="space-y-5 rounded-[28px] bg-[#f8faf7] p-4 sm:p-5 border border-castleton/10">
      <motion.div
        className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-1">Registration Approvals</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Review sign-up requests, record a decision, and prepare approved users for account provisioning.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 min-w-[280px]">
            {[
              ['Pending', signupRequests.filter((item) => item.status === 'pending').length, 'bg-[#fff6e4] text-[#8a5a14]'],
              ['Approved', signupRequests.filter((item) => item.status === 'approved').length, 'bg-[#e9f3ee] text-castleton'],
              ['Suspended', signupRequests.filter((item) => item.status === 'suspended').length, 'bg-[#eef0f5] text-[#44506b]'],
              ['Rejected', signupRequests.filter((item) => item.status === 'rejected').length, 'bg-[#fde8e8] text-[#8a3528]'],
            ].map(([label, value, tone]) => (
              <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f7faf8] p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
                <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${tone}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px] mb-5">
          <label className="flex items-center gap-3 rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3">
            <Search size={18} className="text-castleton/60" />
            <input
              type="search"
              ref={approvalSearchRef}
              value={approvalSearch}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search name, email, phone, department, status"
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
            />
          </label>
          <label className="rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-castleton/70 mb-2">
              Sort By
            </span>
            <select
              value={approvalSortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="w-full bg-transparent text-sm text-black outline-none"
            >
              <option value="pending-first">Pending First</option>
              <option value="approved-first">Approved First</option>
              <option value="suspended-first">Suspended First</option>
              <option value="rejected-first">Rejected First</option>
              <option value="name-asc">A-Z</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-[#ead9a4] bg-[#fff9e8] px-4 py-3 text-sm text-[#7c5a16]">
          Pending requests can be approved or rejected once. Approved accounts can later be suspended, and any request can be deleted from this queue.
        </div>
      </motion.div>

      <div className="space-y-4">
        {filteredApprovalRequests.length ? (
          filteredApprovalRequests.map((request, index) => (
            <motion.article
              key={request.id}
              className={`rounded-[18px] border bg-white p-3.5 transition-colors ${
                request.status === 'pending'
                  ? 'border-[#e2c676] shadow-[0_16px_40px_-30px_rgba(138,90,20,0.45)]'
                  : request.status === 'approved'
                    ? 'border-castleton/20'
                    : request.status === 'suspended'
                      ? 'border-[#c8cfde]'
                      : 'border-[#dfc1bb]'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: Math.min(index * 0.03, 0.18) }}
              whileHover={{ y: -2 }}
            >
              <div className="grid gap-3 xl:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Signup Request</p>
                      <h3 className="text-xl font-semibold text-black">{request.fullName}</h3>
                      <p className="text-sm text-black/65 mt-1">{request.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.12em] text-black/45 mb-2">Submitted</p>
                      <p className="text-sm text-black/65">{new Date(request.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-3">
                    <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Phone</p>
                      <p className="mt-1.5 text-sm font-medium text-black">{request.phone || 'No phone'}</p>
                    </div>
                    <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Department</p>
                      <p className="mt-1.5 text-sm font-medium text-black">{request.department || 'No department'}</p>
                    </div>
                    <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Status</p>
                      <span
                        className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${
                          request.status === 'approved'
                            ? 'bg-[#e9f3ee] text-castleton'
                            : request.status === 'suspended'
                              ? 'bg-[#eef0f5] text-[#44506b]'
                              : request.status === 'rejected'
                                ? 'bg-[#fde8e8] text-[#8a3528]'
                                : 'bg-[#fff6e4] text-[#8a5a14]'
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] border border-castleton/12 bg-[#fbfcfb] p-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                      request.status === 'approved'
                        ? 'bg-[#e9f3ee] text-castleton'
                        : request.status === 'suspended'
                          ? 'bg-[#eef0f5] text-[#44506b]'
                          : request.status === 'rejected'
                            ? 'bg-[#fde8e8] text-[#8a3528]'
                            : 'bg-[#fff6e4] text-[#8a5a14]'
                    }`}
                  >
                    {request.status === 'pending' ? 'Needs Review' : `Status: ${request.status}`}
                  </span>
                  <p className="mt-3 text-sm text-black/65">
                    {request.reviewedAt
                      ? `Reviewed ${new Date(request.reviewedAt).toLocaleString()}`
                      : 'Awaiting admin review'}
                  </p>
                  <textarea
                    value={approvalNoteDrafts[request.id] ?? request.adminNote}
                    onChange={(event) => onApprovalNoteChange(request.id, event.target.value)}
                    placeholder="Add an internal note for this request"
                    rows={4}
                    className="focus-brand mt-3 w-full rounded-xl border border-castleton/20 bg-white px-3 py-2 text-black outline-none resize-y"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onDecision(request.id, 'rejected')}
                      disabled={request.status !== 'pending'}
                      className="focus-brand rounded-full border border-[#dcb7b0] bg-white px-4 py-2 text-sm font-semibold text-[#8a3528] transition-colors enabled:hover:bg-[#fde8e8] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => onDecision(request.id, 'approved')}
                      disabled={request.status !== 'pending'}
                      className="focus-brand rounded-full border border-castleton/20 bg-castleton px-4 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-serpent disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => onDecision(request.id, request.status === 'suspended' ? 'approved' : 'suspended')}
                      disabled={!['approved', 'suspended'].includes(request.status)}
                      className="focus-brand rounded-full border border-[#c8cfde] bg-white px-4 py-2 text-sm font-semibold text-[#44506b] transition-colors enabled:hover:bg-[#eef0f5] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      {request.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteRequest(request.id)}
                      className="focus-brand rounded-full border border-black/10 bg-[#f4f4f4] px-4 py-2 text-sm font-semibold text-black/75 transition-colors hover:bg-[#e8e8e8]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <motion.article
            className="rounded-[22px] border border-castleton/15 bg-white p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <h3 className="text-xl font-semibold text-black mb-2">
              {signupRequests.length ? 'No matching requests' : 'No signup requests yet'}
            </h3>
            <p className="text-black/70 text-base">
              {signupRequests.length
                ? 'Try a different search term or sort order.'
                : 'Requests submitted from the sign-up form will appear here for admin review.'}
            </p>
          </motion.article>
        )}
      </div>
    </div>
  )
}
