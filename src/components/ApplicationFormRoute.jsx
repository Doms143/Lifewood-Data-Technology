import { useRef, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const positions = [
  'Casual Video Models (Video Data Collection)',
  'Moderator & Voice Participants (Voice Data Collection)',
  'Data Annotator (Iphone User)',
  'Image Data Collector (Capturing Text - Rich Items)',
  'Data Curation (Genealogy Project)',
  'Voice Recording Participants (Short Sentences Recording)',
  'Text Data Collector (Gemini User)',
  'Voice Recording Participants (FaceTime Audio Recording Session)',
  'Image Data Collector (Capturing Home Dishes and Menu)',
  'AI Video Creator/Editor',
  'Genealogy Project Team Leader',
  "Data Scraper/Crawler (Int'l Text)",
  'Social Media Content Marketing',
  'Admin Accounting',
  'HR/Admin Assistant',
  'Marketing & Sales Executive',
  'Operation Manager',
  'All of the Above',
  'Intern (Applicable to PH Only)',
]

const countries = [
  'Philippines',
  'United States',
  'United Kingdom',
  'Australia',
  'Canada',
  'Singapore',
  'Malaysia',
  'India',
  'United Arab Emirates',
  'Japan',
  'South Korea',
  'Vietnam',
  'Thailand',
  'Indonesia',
  'Other',
]

export default function ApplicationFormRoute() {
  const [age, setAge] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneCode: '+63 (Philippines)',
    phoneNumber: '',
    email: '',
    position: '',
    country: '',
    address: '',
  })
  const [resumeFile, setResumeFile] = useState(null)
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.gender &&
    age.trim() &&
    formData.phoneNumber.trim() &&
    formData.email.trim() &&
    formData.position &&
    formData.country &&
    formData.address.trim() &&
    resumeFile

  const updateField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setResumeFile(null)
      return
    }
    if (file.type !== 'application/pdf') {
      setStatus({ type: 'error', message: 'Please upload a PDF file.' })
      event.target.value = ''
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'PDF must be 10MB or smaller.' })
      event.target.value = ''
      return
    }
    setStatus({ type: '', message: '' })
    setResumeFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const file = event.dataTransfer?.files?.[0]
    if (!file) {
      return
    }
    if (file.type !== 'application/pdf') {
      setStatus({ type: 'error', message: 'Please upload a PDF file.' })
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'PDF must be 10MB or smaller.' })
      return
    }
    setStatus({ type: '', message: '' })
    setResumeFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const clearResumeFile = () => {
    setResumeFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      if (!isSupabaseConfigured || !supabase) {
        setStatus({ type: 'error', message: 'Supabase is not configured.' })
        return
      }

      if (!resumeFile) {
        setStatus({ type: 'error', message: 'Please upload your CV (PDF).' })
        return
      }

      const safeName = `${formData.lastName}_${formData.firstName}`
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/^-+|-+$/g, '')
      const fileName = `${Date.now()}_${safeName || 'applicant'}.pdf`

      const bucketCandidates = ['CAREER-CV', 'career-cv']
      let uploadError = null
      let usedBucket = null

      for (const candidate of bucketCandidates) {
        const { error } = await supabase.storage
          .from(candidate)
          .upload(fileName, resumeFile, { contentType: 'application/pdf' })

        if (!error) {
          usedBucket = candidate
          uploadError = null
          break
        }

        uploadError = error
        if (!/bucket/i.test(error.message)) {
          break
        }
      }

      if (uploadError) {
        setStatus({ type: 'error', message: `Upload failed: ${uploadError.message}` })
        return
      }

      const { data: insertedApplication, error: insertError } = await supabase.from('career_applications').insert({
        created_at: new Date().toISOString(),
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
        phone_code: formData.phoneCode,
        phone_number: formData.phoneNumber.trim(),
        gender: formData.gender,
        age: Number(age),
        country: formData.country,
        address: formData.address.trim(),
        positions: [formData.position],
        cv_filename: resumeFile.name,
        cv_path: fileName,
      }).select('*').single()

      if (insertError) {
        setStatus({ type: 'error', message: `Submission failed: ${insertError.message}` })
        return
      }

      if (insertedApplication?.id) {
        try {
          await fetch('/api/score-cv', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ applicationId: insertedApplication.id }),
          })
        } catch {
          // scoring is best-effort; ignore failures here
        }
      }

      setStatus({ type: 'success', message: 'Application submitted. We will contact you soon.' })
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        phoneCode: '+63 (Philippines)',
        phoneNumber: '',
        email: '',
        position: '',
        country: '',
        address: '',
      })
      setAge('')
      setResumeFile(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="max-w-5xl mx-auto space-y-6">
      <div className="text-center">
        <p className="text-castleton uppercase tracking-[0.14em] text-sm mb-3">Join Our Team</p>
        <h1 className="text-4xl sm:text-5xl font-semibold text-serpent mb-3">Application Form</h1>
        <p className="text-serpent/80 text-lg">
          Please complete the form below and upload your CV.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glassmorph-form rounded-3xl p-6 sm:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">First Name</label>
            <input
              className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
              placeholder="e.g. Michael"
              value={formData.firstName}
              onChange={updateField('firstName')}
              autoComplete="given-name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">Last Name</label>
            <input
              className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
              placeholder="e.g. Chen"
              value={formData.lastName}
              onChange={updateField('lastName')}
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">Gender</label>
            <select
              className="select-brand w-full"
              value={formData.gender}
              onChange={updateField('gender')}
              autoComplete="sex"
              required
            >
              <option value="">Select gender</option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">Age</label>
            <input
              type="number"
              min="16"
              max="80"
              step="1"
              inputMode="numeric"
              className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
              placeholder="e.g. 24"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              autoComplete="bday"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Phone Number</label>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">
            <select
              className="select-brand w-full"
              value={formData.phoneCode}
              onChange={updateField('phoneCode')}
              autoComplete="tel-country-code"
            >
              <option>+63 (Philippines)</option>
              <option>+1 (United States)</option>
              <option>+44 (United Kingdom)</option>
              <option>+61 (Australia)</option>
            </select>
            <input
              className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
              placeholder="912345678"
              value={formData.phoneNumber}
              onChange={updateField('phoneNumber')}
              autoComplete="tel-national"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Email Address</label>
          <input
            type="email"
            className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
            placeholder="michael@example.com"
            value={formData.email}
            onChange={updateField('email')}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Position Applied</label>
          <select
            className="select-brand w-full"
            value={formData.position}
            onChange={updateField('position')}
            required
          >
            <option value="">Select position to add</option>
            {positions.map((position) => (
              <option key={position} value={position}>{position}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Country</label>
          <select
            className="select-brand w-full"
            value={formData.country}
            onChange={updateField('country')}
            required
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Current Address</label>
          <input
            className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
            placeholder="e.g. Quezon City, Metro Manila"
            value={formData.address}
            onChange={updateField('address')}
            autoComplete="street-address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-serpent mb-2">Upload CV (PDF)</label>
          <div
            className={`upload-box ${isDragging ? 'upload-box-drag' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label className="upload-folder" htmlFor="resume-upload">
              <div className="upload-front">
                <div className="upload-tip" />
                <div className="upload-cover" />
              </div>
              <div className="upload-back upload-cover" />
            </label>
            <div className="upload-panel">
              <input
                id="resume-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                ref={fileInputRef}
                className="upload-input"
              />
              <div className="upload-instruction">
                Choose a file or drop PDF here
              </div>
            </div>
            {resumeFile ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff3b30] text-white text-sm font-semibold">
                  PDF
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-serpent">{resumeFile.name}</p>
                  <p className="text-xs text-serpent/60">Selected file</p>
                </div>
                <button
                  type="button"
                  onClick={clearResumeFile}
                  className="rounded-full border border-castleton/20 bg-white px-2 py-1 text-xs font-semibold text-serpent hover:bg-castleton/10"
                  aria-label="Remove selected file"
                >
                  X
                </button>
              </div>
            ) : (
              <p className="mt-2 text-sm text-serpent/70">No file selected.</p>
            )}
          </div>
        </div>

        {status.message ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-400/40 bg-emerald-50/60 text-emerald-800' : 'border-rose-400/40 bg-rose-50/60 text-rose-800'}`}>
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full rounded-2xl font-semibold py-4 transition-colors ${
            isFormValid && !isSubmitting
              ? 'bg-[#FFB347] text-[#133020] hover:bg-[#eaa13b]'
              : 'bg-[#f5eedb] text-[#133020] opacity-60 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
  )
}


