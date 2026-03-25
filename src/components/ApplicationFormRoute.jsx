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

const phoneOptions = [
  '+63 (Philippines)',
  '+1 (United States)',
  '+44 (United Kingdom)',
  '+61 (Australia)',
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatFileSize(bytes) {
  if (!bytes) return '0 KB'
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function toCapitalizedWords(value) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export default function ApplicationFormRoute() {
  const [age, setAge] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSummary, setSubmittedSummary] = useState(null)
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
  const [touchedFields, setTouchedFields] = useState({})
  const [positionQuery, setPositionQuery] = useState('')

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

  const normalizedPositionQuery = positionQuery.trim().toLowerCase()
  const filteredPositions = normalizedPositionQuery
    ? positions.filter((position) => position.toLowerCase().includes(normalizedPositionQuery))
    : positions

  const fieldErrors = {
    firstName: !formData.firstName.trim() ? 'Enter your first name.' : '',
    lastName: !formData.lastName.trim() ? 'Enter your last name.' : '',
    gender: !formData.gender ? 'Select your gender.' : '',
    age: !age.trim()
      ? 'Enter your age.'
      : Number(age) < 16 || Number(age) > 80
        ? 'Age must be between 16 and 80.'
        : '',
    phoneNumber: !formData.phoneNumber.trim()
      ? 'Enter your phone number.'
      : formData.phoneNumber.replace(/\D/g, '').length < 7
        ? 'Phone number looks too short.'
        : '',
    email: !formData.email.trim()
      ? 'Enter your email address.'
      : !emailPattern.test(formData.email.trim())
        ? 'Enter a valid email address.'
        : '',
    position: !formData.position ? 'Choose the role you are applying for.' : '',
    country: !formData.country ? 'Select your country.' : '',
    address: !formData.address.trim() ? 'Enter your current address.' : '',
    resume: !resumeFile ? 'Upload your CV in PDF format.' : '',
  }

  const requiredItems = [
    { key: 'firstName', label: 'First name', done: Boolean(formData.firstName.trim()) },
    { key: 'lastName', label: 'Last name', done: Boolean(formData.lastName.trim()) },
    { key: 'gender', label: 'Gender', done: Boolean(formData.gender) },
    { key: 'age', label: 'Age', done: Boolean(age.trim()) && !fieldErrors.age },
    { key: 'phoneNumber', label: 'Phone number', done: Boolean(formData.phoneNumber.trim()) && !fieldErrors.phoneNumber },
    { key: 'email', label: 'Email', done: Boolean(formData.email.trim()) && !fieldErrors.email },
    { key: 'position', label: 'Position', done: Boolean(formData.position) },
    { key: 'country', label: 'Country', done: Boolean(formData.country) },
    { key: 'address', label: 'Address', done: Boolean(formData.address.trim()) },
    { key: 'resume', label: 'CV upload', done: Boolean(resumeFile) },
  ]
  const completionCount = requiredItems.filter((item) => item.done).length

  const inputClassName = (field) =>
    `w-full rounded-2xl border bg-white px-4 py-3 transition-colors focus-brand ${
      touchedFields[field] && fieldErrors[field]
        ? 'border-rose-300 text-rose-900 placeholder:text-rose-300'
        : 'border-castleton/20'
    }`

  const hintClassName = (field) =>
    `mt-2 text-sm ${
      touchedFields[field] && fieldErrors[field] ? 'text-rose-700' : 'text-serpent/55'
    }`

  const updateField = (field) => (event) => {
    setStatus({ type: '', message: '' })
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleAgeChange = (event) => {
    setStatus({ type: '', message: '' })
    setAge(event.target.value)
  }

  const markTouched = (field) => () => {
    setTouchedFields((prev) => (prev[field] ? prev : { ...prev, [field]: true }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    setTouchedFields((prev) => ({ ...prev, resume: true }))
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
    setTouchedFields((prev) => ({ ...prev, resume: true }))
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
    setTouchedFields((prev) => ({ ...prev, resume: true }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    setTouchedFields({
      firstName: true,
      lastName: true,
      gender: true,
      age: true,
      phoneNumber: true,
      email: true,
      position: true,
      country: true,
      address: true,
      resume: true,
    })
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

      const normalizedFirstName = toCapitalizedWords(formData.firstName)
      const normalizedLastName = toCapitalizedWords(formData.lastName)
      const normalizedGender = toCapitalizedWords(formData.gender)
      const normalizedCountry = toCapitalizedWords(formData.country)
      const normalizedAddress = toCapitalizedWords(formData.address)
      const normalizedPosition = toCapitalizedWords(formData.position)
      const normalizedEmail = formData.email.trim()

      const safeName = `${normalizedLastName}_${normalizedFirstName}`
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
        first_name: normalizedFirstName,
        last_name: normalizedLastName,
        email: normalizedEmail,
        phone_code: formData.phoneCode,
        phone_number: formData.phoneNumber.trim(),
        gender: normalizedGender,
        age: Number(age),
        country: normalizedCountry,
        address: normalizedAddress,
        positions: [normalizedPosition],
        cv_filename: resumeFile.name,
        cv_path: fileName,
      }).select('*').single()

      if (insertError) {
        setStatus({ type: 'error', message: `Submission failed: ${insertError.message}` })
        return
      }

      if (insertedApplication?.id) {
        try {
          await supabase.functions.invoke('score-cv', {
            body: { applicationId: insertedApplication.id },
          })
        } catch {
          // scoring is best-effort; ignore failures here
        }
      }

      setStatus({ type: 'success', message: 'Application submitted. We will contact you soon.' })
      setSubmittedSummary({
        name: `${normalizedFirstName} ${normalizedLastName}`.trim(),
        email: normalizedEmail,
        position: normalizedPosition,
      })
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
      setPositionQuery('')
      setTouchedFields({})
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
          Complete the form below and upload your CV. The application should take around 2 to 3 minutes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { title: 'PDF only', detail: 'Upload a single CV file' },
          { title: '10MB max', detail: 'Larger files are rejected' },
          { title: '2 to 3 mins', detail: 'Short application flow' },
          { title: 'Email follow-up', detail: 'We will contact you after review' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-castleton/15 bg-white/70 px-4 py-4 shadow-[0_18px_50px_-32px_rgba(14,67,49,0.45)] backdrop-blur-sm"
          >
            <p className="text-sm font-semibold text-serpent">{item.title}</p>
            <p className="mt-1 text-xs text-serpent/60">{item.detail}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="glassmorph-form rounded-3xl p-6 sm:p-8 space-y-6"
      >
        <div className="rounded-[28px] border border-castleton/15 bg-white/70 p-5 shadow-[0_22px_60px_-40px_rgba(14,67,49,0.55)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castleton/70">Application progress</p>
              <h2 className="mt-2 text-2xl font-semibold text-serpent">
                {completionCount}/10 requirements completed
              </h2>
              <p className="mt-1 text-sm text-serpent/65">
                Finish all required fields before submitting.
              </p>
            </div>
            <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-5">
              {requiredItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex min-h-[64px] items-center justify-center rounded-2xl border px-3 py-2 text-center text-xs font-medium leading-5 ${
                    item.done
                      ? 'border-emerald-300/70 bg-emerald-50 text-emerald-800'
                      : 'border-castleton/15 bg-white text-serpent/70'
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-castleton/15 bg-white/75 p-5 sm:p-6 shadow-[0_20px_60px_-42px_rgba(14,67,49,0.55)]">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castleton/70">Section 1</p>
            <h2 className="mt-2 text-2xl font-semibold text-serpent">Personal information</h2>
            <p className="mt-1 text-sm text-serpent/60">Use your legal name and personal details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">First Name</label>
              <input
                className={inputClassName('firstName')}
                placeholder="e.g. Michael"
                value={formData.firstName}
                onChange={updateField('firstName')}
                onBlur={markTouched('firstName')}
                autoComplete="given-name"
                required
              />
              <p className={hintClassName('firstName')}>
                {touchedFields.firstName && fieldErrors.firstName ? fieldErrors.firstName : 'Enter the same first name shown on your CV.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">Last Name</label>
              <input
                className={inputClassName('lastName')}
                placeholder="e.g. Chen"
                value={formData.lastName}
                onChange={updateField('lastName')}
                onBlur={markTouched('lastName')}
                autoComplete="family-name"
                required
              />
              <p className={hintClassName('lastName')}>
                {touchedFields.lastName && fieldErrors.lastName ? fieldErrors.lastName : 'Use your family name or surname.'}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">Gender</label>
              <select
                className={`select-brand w-full ${
                  touchedFields.gender && fieldErrors.gender ? 'border-rose-300' : ''
                }`}
                value={formData.gender}
                onChange={updateField('gender')}
                onBlur={markTouched('gender')}
                autoComplete="sex"
                required
              >
                <option value="">Select gender</option>
                <option>Female</option>
                <option>Male</option>
              </select>
              <p className={hintClassName('gender')}>
                {touchedFields.gender && fieldErrors.gender ? fieldErrors.gender : 'Required for applicant profile review.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">Age</label>
              <input
                type="number"
                min="16"
                max="80"
                step="1"
                inputMode="numeric"
                className={inputClassName('age')}
                placeholder="e.g. 24"
                value={age}
                onChange={handleAgeChange}
                onBlur={markTouched('age')}
                autoComplete="bday"
                required
              />
              <p className={hintClassName('age')}>
                {touchedFields.age && fieldErrors.age ? fieldErrors.age : 'Applicants must be between 16 and 80 years old.'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-castleton/15 bg-white/75 p-5 sm:p-6 shadow-[0_20px_60px_-42px_rgba(14,67,49,0.55)]">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castleton/70">Section 2</p>
            <h2 className="mt-2 text-2xl font-semibold text-serpent">Contact information</h2>
            <p className="mt-1 text-sm text-serpent/60">Use an active phone number and email address.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">Phone Number</label>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3">
              <select
                className="select-brand w-full"
                value={formData.phoneCode}
                onChange={updateField('phoneCode')}
                autoComplete="tel-country-code"
              >
                {phoneOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <input
                className={inputClassName('phoneNumber')}
                placeholder="912345678"
                value={formData.phoneNumber}
                onChange={updateField('phoneNumber')}
                onBlur={markTouched('phoneNumber')}
                autoComplete="tel-national"
                required
              />
            </div>
            <p className={hintClassName('phoneNumber')}>
              {touchedFields.phoneNumber && fieldErrors.phoneNumber ? fieldErrors.phoneNumber : 'Use a reachable number with area or mobile code.'}
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-serpent mb-2">Email Address</label>
            <input
              type="email"
              className={inputClassName('email')}
              placeholder="michael@example.com"
              value={formData.email}
              onChange={updateField('email')}
              onBlur={markTouched('email')}
              autoComplete="email"
              required
            />
            <p className={hintClassName('email')}>
              {touchedFields.email && fieldErrors.email ? fieldErrors.email : 'We will use this address for updates after review.'}
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-castleton/15 bg-white/75 p-5 sm:p-6 shadow-[0_20px_60px_-42px_rgba(14,67,49,0.55)]">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castleton/70">Section 3</p>
            <h2 className="mt-2 text-2xl font-semibold text-serpent">Role details</h2>
            <p className="mt-1 text-sm text-serpent/60">Pick the position you want and tell us where you are based.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-serpent mb-2">Find a position</label>
            <input
              className="w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 focus-brand"
              placeholder="Search roles by keyword"
              value={positionQuery}
              onChange={(event) => setPositionQuery(event.target.value)}
            />
            <p className="mt-2 text-sm text-serpent/55">
              Filter the role list before selecting a position.
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-serpent mb-2">Position Applied</label>
            <select
              className={`select-brand w-full ${
                touchedFields.position && fieldErrors.position ? 'border-rose-300' : ''
              }`}
              value={formData.position}
              onChange={updateField('position')}
              onBlur={markTouched('position')}
              required
            >
              <option value="">
                {filteredPositions.length ? 'Select position to add' : 'No matching positions'}
              </option>
              {filteredPositions.map((position) => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            <p className={hintClassName('position')}>
              {touchedFields.position && fieldErrors.position ? fieldErrors.position : `${filteredPositions.length} role${filteredPositions.length === 1 ? '' : 's'} available in the current filter.`}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">Country</label>
              <select
                className={`select-brand w-full ${
                  touchedFields.country && fieldErrors.country ? 'border-rose-300' : ''
                }`}
                value={formData.country}
                onChange={updateField('country')}
                onBlur={markTouched('country')}
                required
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <p className={hintClassName('country')}>
                {touchedFields.country && fieldErrors.country ? fieldErrors.country : 'Choose the country you currently live in.'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-serpent mb-2">Current Address</label>
              <input
                className={inputClassName('address')}
                placeholder="e.g. Quezon City, Metro Manila"
                value={formData.address}
                onChange={updateField('address')}
                onBlur={markTouched('address')}
                autoComplete="street-address"
                required
              />
              <p className={hintClassName('address')}>
                {touchedFields.address && fieldErrors.address ? fieldErrors.address : 'City, region, and street details help us review location fit.'}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-castleton/15 bg-white/75 p-5 sm:p-6 shadow-[0_20px_60px_-42px_rgba(14,67,49,0.55)]">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-castleton/70">Section 4</p>
            <h2 className="mt-2 text-2xl font-semibold text-serpent">CV upload</h2>
            <p className="mt-1 text-sm text-serpent/60">Upload one PDF file. Drag and drop works on desktop and mobile file picking still works.</p>
          </div>

          <div className="mb-4 grid gap-3 rounded-2xl border border-castleton/15 bg-[#fff9ed] p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-castleton/70">Format</p>
              <p className="mt-1 text-sm font-semibold text-serpent">PDF only</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-castleton/70">Maximum size</p>
              <p className="mt-1 text-sm font-semibold text-serpent">10MB</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-castleton/70">Best result</p>
              <p className="mt-1 text-sm font-semibold text-serpent">Use a clear, readable CV</p>
            </div>
          </div>

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
                onBlur={markTouched('resume')}
                ref={fileInputRef}
                className="upload-input"
              />
              <div className="upload-instruction">
                Drop your CV here or browse for a PDF file
              </div>
              <p className="mt-3 text-center text-sm text-serpent/55">
                Recommended: file name with your full name for easier review.
              </p>
            </div>
            {resumeFile ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-[0_18px_40px_-36px_rgba(16,185,129,0.9)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff3b30] text-white text-sm font-semibold shadow-lg shadow-rose-500/20">
                    PDF
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-serpent">{resumeFile.name}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-serpent/65">
                      <span>{formatFileSize(resumeFile.size)}</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">
                        PDF verified
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearResumeFile}
                    className="rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-xs font-semibold text-serpent hover:bg-castleton/10"
                    aria-label="Remove selected file"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <p className={hintClassName('resume')}>
                {touchedFields.resume && fieldErrors.resume ? fieldErrors.resume : 'No file selected yet.'}
              </p>
            )}
          </div>
        </div>

        {status.message ? (
          <div className={`rounded-2xl border px-4 py-4 text-sm ${
            status.type === 'success'
              ? 'border-emerald-400/40 bg-emerald-50/70 text-emerald-900'
              : 'border-rose-400/40 bg-rose-50/70 text-rose-800'
          }`}>
            <p className="font-semibold">
              {status.type === 'success' ? 'Application received' : 'There is a problem with your submission'}
            </p>
            <p className="mt-1">{status.message}</p>
            {status.type === 'success' && submittedSummary ? (
              <div className="mt-3 grid gap-2 text-xs text-emerald-900/80 sm:grid-cols-3">
                <div className="rounded-xl bg-white/70 px-3 py-2">
                  <span className="block text-emerald-700/70">Applicant</span>
                  <span className="font-semibold">{submittedSummary.name || 'Not provided'}</span>
                </div>
                <div className="rounded-xl bg-white/70 px-3 py-2">
                  <span className="block text-emerald-700/70">Email</span>
                  <span className="font-semibold">{submittedSummary.email}</span>
                </div>
                <div className="rounded-xl bg-white/70 px-3 py-2">
                  <span className="block text-emerald-700/70">Role</span>
                  <span className="font-semibold">{submittedSummary.position}</span>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="sticky bottom-4 z-10 rounded-[28px] border border-castleton/15 bg-white/85 p-4 shadow-[0_24px_70px_-36px_rgba(14,67,49,0.45)] backdrop-blur-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-serpent">{completionCount}/10 completed</p>
              <p className="mt-1 text-sm text-serpent/60">
                {isFormValid ? 'Ready to submit your application.' : 'Complete the remaining required fields to continue.'}
              </p>
            </div>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full rounded-2xl px-6 py-4 font-semibold transition-colors sm:w-auto sm:min-w-[240px] ${
                isFormValid && !isSubmitting
                  ? 'bg-[#FFB347] text-[#133020] hover:bg-[#eaa13b]'
                  : 'bg-[#f5eedb] text-[#133020] opacity-60 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
