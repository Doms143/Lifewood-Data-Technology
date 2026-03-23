import { motion } from 'framer-motion'
import { MessageCircle, Search, Trash2 } from 'lucide-react'

export default function InquiriesTab({
  filteredContactInquiries,
  inquirySearchRef,
  inquirySearch,
  onSearchChange,
  inquiriesError,
  onDeleteInquiry,
}) {
  return (
    <div className="space-y-5 rounded-[28px] bg-[#f8faf7] p-4 sm:p-5 border border-castleton/10">
      <motion.div
        className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-black">Website Inquiries</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Every inquiry submitted from the website contact form appears here automatically in one inbox.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-castleton/15 bg-[#f7faf8] px-4 py-2 text-sm font-semibold text-castleton">
            <MessageCircle className="h-4 w-4" />
            {filteredContactInquiries.length} {filteredContactInquiries.length === 1 ? 'inquiry' : 'inquiries'}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="flex items-center gap-3 rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3">
            <Search size={18} className="text-castleton/60" />
            <input
              type="search"
              ref={inquirySearchRef}
              value={inquirySearch}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search name, email, company, inquiry details"
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
            />
          </label>
          <div className="rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3 text-sm text-black/70">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-castleton/70 mb-2">
              Inbox
            </span>
            Newest inquiries appear first and refresh automatically while this tab is open.
          </div>
        </div>

        {inquiriesError ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {inquiriesError}
          </div>
        ) : null}
      </motion.div>

      <div className="space-y-4">
        {filteredContactInquiries.length ? (
          filteredContactInquiries.map((inquiry, index) => (
            <motion.article
              key={inquiry.id}
              className="rounded-[24px] border border-castleton/15 bg-white p-5 sm:p-6 shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.18) }}
            >
              <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[minmax(0,260px)_1fr_auto] xl:items-start">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-castleton/70">
                    Inquirer
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-black break-words">{inquiry.fullName || 'Unnamed inquiry'}</h3>
                  <p className="mt-1 break-all text-sm text-black/65">{inquiry.workEmail || 'No email provided'}</p>
                  {inquiry.companyName ? (
                    <p className="mt-2 inline-flex rounded-full border border-castleton/15 bg-[#f7faf8] px-3 py-1 text-xs font-medium text-castleton">
                      {inquiry.companyName}
                    </p>
                  ) : null}
                </div>
                <div className="rounded-[22px] border border-castleton/15 bg-[#f7faf8] p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-castleton/70">Message</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-black/75">
                    {inquiry.requirements || 'No inquiry details provided.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 xl:flex-col xl:items-end">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      inquiry.status === 'reviewed'
                        ? 'bg-[#e9f3ee] text-castleton'
                        : inquiry.status === 'archived'
                          ? 'bg-[#f4f7f5] text-black/60'
                          : 'bg-[#fff6e4] text-[#8a5a14]'
                    }`}
                  >
                    {inquiry.status === 'archived'
                      ? 'Archived'
                      : inquiry.status === 'reviewed'
                        ? 'Reviewed'
                        : 'New'}
                  </span>
                  <p className="text-sm text-black/55">
                    {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'Just now'}
                  </p>
                  <button
                    type="button"
                    onClick={() => onDeleteInquiry(inquiry)}
                    className="focus-brand inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <motion.div
            className="rounded-[24px] border border-dashed border-castleton/20 bg-white/80 p-8 text-center text-black/65"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            No inquiries found yet.
          </motion.div>
        )}
      </div>
    </div>
  )
}
