import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  ArrowLeft,
  X,
  Mail,
  Phone,
  MapPin,
  Clock3,
  CheckCircle2,
  XCircle,
  Filter,
  TrendingUp,
  Send,
  Building2,
  Mic,
  MessageCircle,
  Move,
  Trash2,
  ImageIcon,
  Video,
  Type,
  ShieldCheck,
  Database,
  Search,
  FolderTree,
  Tags,
  Languages,
  Clapperboard,
  Bot,
  Quote,
  LayoutGrid,
  BarChart3,
  FileCheck2,
  FileText,
  RefreshCw,
  UserSquare2,
  UserCheck2,
  LogOut,
  AlignJustify,
} from 'lucide-react'
import { isBootstrapAdmin } from './lib/adminAccess'
import { createInitialInterviewScheduleForm, defaultFaceToFaceInterviewLocation } from './lib/interviewScheduling'
import {
  aboutMissionVision,
  aboutPrinciples,
  aboutShowcase,
  aboutStats,
  adminMenuItems,
  adminPanelContent,
  aiProjectTracks,
  aiServiceCapabilities,
  aiServiceModalities,
  analyticsInterns,
  applicationStatusOrder,
  approvalStatusOrder,
  buildSeedInternAnalyticsData,
  careersCultureChips,
  careersSteps,
  careersTracks,
  careersValues,
  contactChannels,
  contactOffices,
  emailJsConfig,
  interviewEmailJsConfig,
  internProfileByName,
  internSchoolByName,
  lifewoodWorldwideOffices,
  mapCareerApplicationRowToClient,
  mapHiredEmployeeRowToClient,
  mapInternRowToClient,
  mapSignupRequestRowToClient,
  mapTaskRowToClient,
  philanthropyMapOffices,
  philanthropyNarrative,
  routeContent,
  schoolOptions,
  seedAnalyticsTaskEntries,
  typeAProcess,
  typeAUseCases,
  typeBProcess,
  typeBUseCases,
  typeCProcess,
  typeCUseCases,
  typeDCapabilities,
  typeDCinematicFrames,
  typeDCinematicVideo,
  typeDStats,
  typeDVisuals,
} from './lib/appContent'
import { isSupabaseConfigured, supabase } from './lib/supabaseClient'

const Navigation = lazy(() => import('./components/Navigation'))
const HomePage = lazy(() => import('./components/HomePage'))
const OfficesPage = lazy(() => import('./components/OfficesPage'))
const ApplicationFormPage = lazy(() => import('./components/ApplicationFormPage'))
const AdminDashboardShell = lazy(() => import('./components/AdminDashboardShell'))
const OfficesMap = lazy(() => import('./components/OfficesMap'))

function CountUpStat({ end = 0, suffix = '', duration = 1200, useGrouping = false, start = false }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return

    const target = Number(end) || 0
    const startTime = performance.now()

    let frameId
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [start, end, duration])

  const displayValue = useGrouping ? value.toLocaleString() : String(value)

  return (
    <>
      {displayValue}
      {suffix}
    </>
  )
}

function UnreadNotificationBadge({ count, compact = false }) {
  if (!count) return null

  if (compact) {
    return (
      <motion.span
        className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: [1, 1.18, 1], opacity: 1 }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#93c5fd]/80 blur-[1px]" />
        <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#2563eb] shadow-[0_0_0_4px_rgba(191,219,254,0.45)]" />
      </motion.span>
    )
  }

  return (
    <motion.span
      className="inline-flex items-center gap-1.5 rounded-full bg-[#e8f1ff] px-2 py-1 text-[11px] font-semibold text-[#1d4ed8] shadow-[0_10px_30px_-18px_rgba(37,99,235,0.7)]"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: [1, 1.04, 1], opacity: 1 }}
      transition={{ duration: 1.25, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.8 }}
    >
      <motion.span
        className="relative flex h-2.5 w-2.5"
        animate={{ scale: [1, 1.35, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.6 }}
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#60a5fa]/80" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
      </motion.span>
      <motion.span
        key={count}
        initial={{ y: -4, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.22 }}
      >
        {count}
      </motion.span>
    </motion.span>
  )
}

function UnreadPulseDot({ size = 'sm' }) {
  const dimensionClass = size === 'md' ? 'h-3 w-3' : 'h-2.5 w-2.5'

  return (
    <motion.span
      className={`relative flex ${dimensionClass}`}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 1.15, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.4 }}
    >
      <span className={`absolute inline-flex h-full w-full rounded-full bg-[#60a5fa]/80 ${size === 'md' ? 'blur-[1px]' : ''}`} />
      <span className={`relative inline-flex ${dimensionClass} rounded-full bg-[#2563eb] shadow-[0_0_0_4px_rgba(191,219,254,0.38)]`} />
    </motion.span>
  )
}

function SectionFallback({ className = 'h-40' }) {
  return (
    <div
      className={`w-full rounded-3xl border border-castleton/10 bg-white/60 shadow-soft animate-pulse ${className}`}
      aria-hidden="true"
    />
  )
}

function NavigationFallback() {
  return <div className="h-20 w-full" aria-hidden="true" />
}

function ViewModeToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-2xl border border-castleton/15 bg-[#f4f7f5] p-1">
      {[
        ['tiles', 'Tiles', LayoutGrid],
        ['content', 'Content', AlignJustify],
      ].map(([mode, label, Icon]) => {
        const isActive = value === mode
        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
              isActive ? 'bg-castleton text-white shadow-sm' : 'text-castleton hover:bg-white'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

const clampMetric = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value))

const calculateInternMetricsAfterTask = (intern, score, activityType) => {
  const activityWeights = {
    Task: { performanceWeight: 0.34, progressBoost: 5, attendanceBoost: 1 },
    'Quality Check': { performanceWeight: 0.28, progressBoost: 4, attendanceBoost: 1 },
    Activity: { performanceWeight: 0.2, progressBoost: 3, attendanceBoost: 1 },
  }

  const selectedWeight = activityWeights[activityType] || activityWeights.Activity
  const performance = Math.round(
    clampMetric(intern.performance * (1 - selectedWeight.performanceWeight) + score * selectedWeight.performanceWeight, 45, 100)
  )
  const scoreMomentum = score >= 95 ? 2 : score >= 85 ? 1 : score < 60 ? -2 : score < 75 ? -1 : 0
  const progress = Math.round(
    clampMetric(intern.progress + selectedWeight.progressBoost + scoreMomentum, 45, 100)
  )
  const attendance = Math.round(
    clampMetric(intern.attendance + selectedWeight.attendanceBoost + (score >= 90 ? 1 : score < 60 ? -1 : 0), 40, 100)
  )
  const low = performance < 65 || attendance < 70 || progress < 65

  return {
    performance,
    progress,
    attendance,
    low,
  }
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/')
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [activeTypeAProcessIndex, setActiveTypeAProcessIndex] = useState(0)
  const [activeTypeBProcessIndex, setActiveTypeBProcessIndex] = useState(0)
  const [activeTypeCProcessIndex, setActiveTypeCProcessIndex] = useState(0)
  const [activeAboutTab, setActiveAboutTab] = useState('mission')
  const [selectedOfficeRegion, setSelectedOfficeRegion] = useState('All Regions')
  const [selectedPhilanthropyOffice, setSelectedPhilanthropyOffice] = useState(philanthropyMapOffices[0])
  const [officesStatsVisible, setOfficesStatsVisible] = useState(false)
  const [openPhilImpactRow, setOpenPhilImpactRow] = useState(null)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [isSignInPasswordVisible, setIsSignInPasswordVisible] = useState(false)
  const [signInError, setSignInError] = useState('')
  const [signUpError, setSignUpError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState('')
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [authUser, setAuthUser] = useState(null)
  const [adminRole, setAdminRole] = useState(null)
  const [isApprovedUser, setIsApprovedUser] = useState(false)
  const [canManageApprovals, setCanManageApprovals] = useState(false)
  const [adminAccessError, setAdminAccessError] = useState('')
  const [signUpForm, setSignUpForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
  })
  const [isSignUpPasswordVisible, setIsSignUpPasswordVisible] = useState(false)
  const [isSignUpConfirmPasswordVisible, setIsSignUpConfirmPasswordVisible] = useState(false)
  const [activeAdminTab, setActiveAdminTab] = useState('Dashboard')
  const [isAdminNavOpen, setIsAdminNavOpen] = useState(true)
  const [isAdminNavPinned, setIsAdminNavPinned] = useState(true)
  const [adminNotice, setAdminNotice] = useState('')
  const [internAnalyticsData, setInternAnalyticsData] = useState([])
  const [isAdminDataLoading, setIsAdminDataLoading] = useState(false)
  const [adminDataError, setAdminDataError] = useState('')
  const [signupRequests, setSignupRequests] = useState([])
  const [approvalNoteDrafts, setApprovalNoteDrafts] = useState({})
  const [careerApplications, setCareerApplications] = useState([])
  const [hiredEmployees, setHiredEmployees] = useState([])
  const [applicationsError, setApplicationsError] = useState('')
  const [applicationNoteDrafts, setApplicationNoteDrafts] = useState({})
  const [reviewedPendingApplicationIds, setReviewedPendingApplicationIds] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [isInterviewScheduleModalOpen, setIsInterviewScheduleModalOpen] = useState(false)
  const [interviewScheduleForm, setInterviewScheduleForm] = useState(() => createInitialInterviewScheduleForm())
  const [interviewScheduleError, setInterviewScheduleError] = useState('')
  const interviewScheduleMinDate = useMemo(() => formatDateInputValue(new Date()), [])
  const interviewTimeOptions = useMemo(
    () => buildInterviewTimeOptions(interviewScheduleForm.date || interviewScheduleMinDate),
    [interviewScheduleForm.date, interviewScheduleMinDate]
  )
  const [isScoringCv, setIsScoringCv] = useState(false)
  const [cvScoreError, setCvScoreError] = useState('')
  const [isBatchScoring, setIsBatchScoring] = useState(false)
  const [batchScoreProgress, setBatchScoreProgress] = useState({ done: 0, total: 0 })
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [cvModalUrl, setCvModalUrl] = useState('')
  const [cvModalName, setCvModalName] = useState('')
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [chatbotInput, setChatbotInput] = useState('')
  const [hasChatted, setHasChatted] = useState(false)
  const [chatbotMessages, setChatbotMessages] = useState([
    {
      id: 'chatbot-welcome',
      role: 'assistant',
      content: "Hi! I'm your Dashboard AI. Ask me about data you see on this dashboard.",
    },
  ])
  const [isChatbotLoading, setIsChatbotLoading] = useState(false)
  const chatbotPrompts = [
    'Ask for a quick dashboard summary.',
    'Check pending applicants, approvals, or reports.',
    'Ask which interns or tasks need attention.',
    'Need the latest status before you review?',
    'I can read this dashboard with you.',
  ]
  const chatbotCapabilityLines = [
    'I can help with these admin dashboard actions:',
    '- Open tabs: Dashboard, Applicants, Approvals, Analytics, Evaluation, Reports, Manage Interns, Manage Employee',
    '- Search across Applicants, Approvals, Analytics, Evaluation, Reports, Manage Interns, and Manage Employee',
    '- Change sort order for Applicants, Approvals, Analytics, Evaluation, and Reports',
    '- Switch view mode for Applicants, Analytics, Evaluation, and Reports',
    '- Open selected applications, interns, report details, or the latest report',
    '- Open the application form or the analytics task panel',
    '- Clear filters, clear the chat, or focus a tab search field',
    '- Approve or reject the selected application',
    '- Open interview scheduling for the selected application',
    '- Mark the selected scheduled applicant as hired or not hired',
    '- Reject a selected application',
    '- Start batch CV scoring for pending applications',
  ]
  const [chatheadPromptIndex, setChatheadPromptIndex] = useState(0)
  const [chatWidgetOffset, setChatWidgetOffset] = useState({ x: 0, y: 0 })
  const [isChatWidgetReturning, setIsChatWidgetReturning] = useState(false)
  const chatWidgetPanelRef = useRef(null)
  const chatWidgetDragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    dragged: false,
  })
  const [selectedAnalyticsIntern, setSelectedAnalyticsIntern] = useState(null)
  const [selectedDashboardGroup, setSelectedDashboardGroup] = useState(null)
  const [analyticsSortBy, setAnalyticsSortBy] = useState('name-asc')
  const [evaluationSortBy, setEvaluationSortBy] = useState('score-desc')
  const [reportsSortBy, setReportsSortBy] = useState('score-desc')
  const [analyticsViewMode, setAnalyticsViewMode] = useState('tiles')
  const [evaluationViewMode, setEvaluationViewMode] = useState('tiles')
  const [reportsViewMode, setReportsViewMode] = useState('tiles')
  const [applicationViewMode, setApplicationViewMode] = useState('cards')
  const [isAdminProfileModalOpen, setIsAdminProfileModalOpen] = useState(false)
  const [adminProfileForm, setAdminProfileForm] = useState({
    firstName: 'Lifewood',
    lastName: 'Admin',
    email: 'admin@lifewood.com',
    phone: '+63 900 000 0000',
  })
  const [editingInternIndex, setEditingInternIndex] = useState(null)
  const [isInternStepperOpen, setIsInternStepperOpen] = useState(false)
  const [internStepperStep, setInternStepperStep] = useState(1)
  const [internStepperError, setInternStepperError] = useState('')
  const [internForm, setInternForm] = useState({
    name: '',
    email: '',
    gender: 'Male',
    course: 'BS Information Technology',
    contact: '',
    requiredHours: '',
    school: schoolOptions[0],
    track: 'AI Data Operations',
    status: 'Active',
    mentor: '',
    joinDate: '',
  })
  const [isAnalyticsTaskModalOpen, setIsAnalyticsTaskModalOpen] = useState(false)
  const [analyticsTaskError, setAnalyticsTaskError] = useState('')
  const [confirmationDialog, setConfirmationDialog] = useState(null)
  const [analyticsTaskForm, setAnalyticsTaskForm] = useState({
    targetMode: 'individual',
    internName: '',
    task: '',
    score: '',
    activityType: 'Activity',
  })
  const [analyticsTaskSelectedCourses, setAnalyticsTaskSelectedCourses] = useState([])
  const [analyticsTaskEntries, setAnalyticsTaskEntries] = useState([])
  const [analyticsSearch, setAnalyticsSearch] = useState('')
  const [evaluationSearch, setEvaluationSearch] = useState('')
  const [reportsSearch, setReportsSearch] = useState('')
  const [approvalSearch, setApprovalSearch] = useState('')
  const [approvalSortBy, setApprovalSortBy] = useState('pending-first')
  const [applicationSearch, setApplicationSearch] = useState('')
  const [applicationSortBy, setApplicationSortBy] = useState('newest-first')
  const [applicationPage, setApplicationPage] = useState(1)
  const applicationPageSize = 10
  const pendingApplicationsCount = useMemo(
    () => careerApplications.filter((item) => item.status === 'pending').length,
    [careerApplications]
  )
  const unreviewedPendingApplicationsCount = useMemo(
    () => careerApplications.filter((item) => item.status === 'pending' && !reviewedPendingApplicationIds.includes(item.id)).length,
    [careerApplications, reviewedPendingApplicationIds]
  )
  const hasPendingApplications = unreviewedPendingApplicationsCount > 0
  const isApplicationUnreviewed = (application) =>
    application.status === 'pending' && !reviewedPendingApplicationIds.includes(application.id)
  const pendingApprovalsCount = useMemo(
    () => signupRequests.filter((item) => item.status === 'pending').length,
    [signupRequests]
  )
  const applicationSortLabels = {
    'newest-first': 'Newest',
    'oldest-first': 'Oldest',
    'pending-first': 'Pending',
    'approved-first': 'Approved',
    'rejected-first': 'Rejected',
    'name-asc': 'A-Z',
  }
  const approvalSortLabels = {
    'pending-first': 'Pending',
    'approved-first': 'Approved',
    'suspended-first': 'Suspended',
    'rejected-first': 'Rejected',
    'name-asc': 'A-Z',
  }
  const hrInterviewStatus = 'Proceeding to HR Interview'
  const isHrInterviewStatus = (status) => status === 'approved' || status === hrInterviewStatus
  const hasInterviewSchedule = (application) => Boolean(application?.interviewScheduledAt)
  const isFinalHireDecision = (application) => ['hired', 'not_hired'].includes(application?.hireStatus)
  const canSetHireStatus = (application) => isHrInterviewStatus(application?.status) && hasInterviewSchedule(application)
  const hireStatusLabel = (status) => {
    if (status === 'hired') return 'Hired'
    if (status === 'not_hired') return 'Not Hired'
    return 'Pending Hire Decision'
  }
  const applicationDisplayStatusLabel = (application) => {
    if (isFinalHireDecision(application)) return hireStatusLabel(application?.hireStatus)
    return applicationStatusLabel(application?.status)
  }
  const applicationStatusLabel = (status) => {
    if (isHrInterviewStatus(status)) return hrInterviewStatus
    if (status === 'rejected') return 'Rejected'
    return 'Pending'
  }
  const formatInterviewSchedule = (application) => {
    if (!application?.interviewScheduledAt) return 'Interview schedule pending'
    const dateLabel = new Date(application.interviewScheduledAt).toLocaleString()
    const timezoneLabel = application.interviewTimezone ? ` (${application.interviewTimezone})` : ''
    const locationLabel = application.interviewLocation ? ` • ${application.interviewLocation}` : ''
    return `${dateLabel}${timezoneLabel}${locationLabel}`
  }
  const buildInterviewEmailMessage = (meetingType) => {
    if (meetingType === 'google-meet') {
      return 'Please make sure you have a stable internet connection, a working camera and microphone, and join the Google Meet link a few minutes before your scheduled interview time.'
    }
    return 'Please bring a printed copy of your CV and any other documents required for the interview. Kindly arrive a few minutes early to complete any necessary check-in procedures.'
  }
  function formatDateInputValue(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  function roundMinutesUp(minutes, step) {
    return Math.ceil(minutes / step) * step
  }
  function buildInterviewTimeOptions(selectedDate) {
    const options = []
    const now = new Date()
    const todayLabel = formatDateInputValue(now)
    let startHour = selectedDate === todayLabel ? now.getHours() : 8
    let startMinute = selectedDate === todayLabel ? roundMinutesUp(now.getMinutes(), 30) : 0
    if (startMinute >= 60) {
      startHour += 1
      startMinute = 0
    }

    for (let hour = startHour; hour < 20; hour += 1) {
      for (const minute of [0, 30]) {
        if (hour === startHour && minute < startMinute) continue
        const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        const labelDate = new Date(2000, 0, 1, hour, minute)
        options.push({
          value,
          label: labelDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        })
      }
    }
    return options
  }
  const applicationFilterChips = useMemo(() => {
    const chips = []
    if (applicationSearch.trim()) chips.push(`Search: ${applicationSearch.trim()}`)
    chips.push(`Sort: ${applicationSortLabels[applicationSortBy] || 'Newest'}`)
    chips.push(`View: ${applicationViewMode === 'cards' ? 'Cards' : 'List'}`)
    return chips
  }, [applicationSearch, applicationSortBy, applicationViewMode])
  const approvalFilterChips = useMemo(() => {
    const chips = []
    if (approvalSearch.trim()) chips.push(`Search: ${approvalSearch.trim()}`)
    chips.push(`Sort: ${approvalSortLabels[approvalSortBy] || 'Pending'}`)
    return chips
  }, [approvalSearch, approvalSortBy])
  const [settingsSearch, setSettingsSearch] = useState('')
  const [settingsStatusFilter, setSettingsStatusFilter] = useState('All')
  const [settingsPage, setSettingsPage] = useState(1)
  const settingsPageSize = 10
  const [employeeSearch, setEmployeeSearch] = useState('')
  const [employeeCountryFilter, setEmployeeCountryFilter] = useState('All')
  const [employeePage, setEmployeePage] = useState(1)
  const [editingEmployeeId, setEditingEmployeeId] = useState(null)
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false)
  const [employeeFormError, setEmployeeFormError] = useState('')
  const [employeeForm, setEmployeeForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '',
    phoneNumber: '',
    gender: '',
    age: '',
    country: '',
    address: '',
    positions: '',
  })
  const employeePageSize = 10
  const employeeCountries = useMemo(
    () => ['All', ...Array.from(new Set(hiredEmployees.map((item) => item.country).filter(Boolean))).sort((a, b) => a.localeCompare(b))],
    [hiredEmployees]
  )
  const filteredEmployeeRows = useMemo(() => {
    const query = employeeSearch.trim().toLowerCase()
    return hiredEmployees.filter((employee) => {
      const passSearch =
        !query ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(query) ||
        (employee.email || '').toLowerCase().includes(query) ||
        (employee.country || '').toLowerCase().includes(query) ||
        (employee.positions || []).join(', ').toLowerCase().includes(query) ||
        (employee.phoneNumber || '').toLowerCase().includes(query)
      const passCountry = employeeCountryFilter === 'All' || employee.country === employeeCountryFilter
      return passSearch && passCountry
    })
  }, [hiredEmployees, employeeCountryFilter, employeeSearch])
  const employeeTotalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredEmployeeRows.length / employeePageSize)),
    [filteredEmployeeRows.length]
  )
  const paginatedEmployeeRows = useMemo(() => {
    const start = (employeePage - 1) * employeePageSize
    return filteredEmployeeRows.slice(start, start + employeePageSize)
  }, [employeePage, filteredEmployeeRows])
  const employeePageButtons = useMemo(() => {
    if (employeeTotalPages <= 7) {
      return Array.from({ length: employeeTotalPages }, (_, index) => index + 1)
    }
    if (employeePage <= 4) {
      return [1, 2, 3, 4, 5, '...', employeeTotalPages]
    }
    if (employeePage >= employeeTotalPages - 3) {
      return [1, '...', employeeTotalPages - 4, employeeTotalPages - 3, employeeTotalPages - 2, employeeTotalPages - 1, employeeTotalPages]
    }
    return [1, '...', employeePage - 1, employeePage, employeePage + 1, '...', employeeTotalPages]
  }, [employeePage, employeeTotalPages])
  const manageInternsFollowScrollRef = useRef(null)
  const manageInternsFollowTrackRef = useRef(null)
  const adminNavRef = useRef(null)
  const manageInternsTableScrollRef = useRef(null)
  const employeeFollowScrollRef = useRef(null)
  const employeeFollowTrackRef = useRef(null)
  const employeeTableScrollRef = useRef(null)
  const analyticsSearchRef = useRef(null)
  const evaluationSearchRef = useRef(null)
  const reportsSearchRef = useRef(null)
  const applicationSearchRef = useRef(null)
  const approvalSearchRef = useRef(null)
  const settingsSearchRef = useRef(null)
  const employeeSearchRef = useRef(null)
  const isSyncingManageInternsScrollRef = useRef(false)
  const isSyncingEmployeeScrollRef = useRef(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const hasAdminAccess = isAdminAuthenticated && isApprovedUser

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname || '/')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!supabase) return undefined

    let isMounted = true

    const hydrateAdminSession = async (session) => {
      if (!isMounted) return

      const user = session?.user || null
      setAuthUser(user)
      setIsAdminAuthenticated(Boolean(session))

      if (!session || !user) {
        setAdminRole(null)
        setIsApprovedUser(false)
        setCanManageApprovals(false)
        setAdminAccessError('')
        setIsAuthReady(true)
        return
      }

      const fallbackRole = isBootstrapAdmin(user.email || '')
        ? 'admin'
        : user.user_metadata?.role || user.app_metadata?.role || 'admin'

      let resolvedRole = fallbackRole

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, email, phone, role, is_approved, can_manage_approvals')
        .eq('id', user.id)
        .maybeSingle()

      if (!isMounted) return

      if (!error && profile) {
        resolvedRole = profile.role || resolvedRole
        setIsApprovedUser(Boolean(profile.is_approved))
        setCanManageApprovals(Boolean(profile.can_manage_approvals))
        const fullName = (profile.full_name || '').trim()
        const nameParts = fullName ? fullName.split(/\s+/) : []
        setAdminProfileForm((prev) => ({
          ...prev,
          firstName: nameParts[0] || prev.firstName,
          lastName: nameParts.slice(1).join(' ') || prev.lastName,
          email: profile.email || user.email || prev.email,
          phone: profile.phone || prev.phone,
        }))
      } else {
        setIsApprovedUser(false)
        setCanManageApprovals(false)
        setAdminProfileForm((prev) => ({
          ...prev,
          email: user.email || prev.email,
        }))
      }

      setAdminRole(resolvedRole || 'admin')
      setAdminAccessError(profile?.is_approved ? '' : 'Your email is verified, but your account is still awaiting admin approval.')
      setIsAuthReady(true)
    }

    const syncSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!isMounted) return
      if (error) {
        setSignInError(error.message)
        setIsAuthReady(true)
        return
      }
      await hydrateAdminSession(data.session)
    }

    syncSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      setSignInError('')
      setSignUpError('')
      void hydrateAdminSession(session)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setIsAuthReady(true)
    }
  }, [])

  useEffect(() => {
    if (!supabase || !hasAdminAccess || !authUser?.id) {
      if (!isAdminAuthenticated) {
        setInternAnalyticsData([])
        setAnalyticsTaskEntries([])
        setHiredEmployees([])
        setAdminDataError('')
        setIsAdminDataLoading(false)
      }
      return
    }

    let isMounted = true

    const loadAdminData = async () => {
      setIsAdminDataLoading(true)
      setAdminDataError('')

      const [
        { data: internRows, error: internError },
        { data: taskRows, error: taskError },
        { data: signupRequestRows, error: signupRequestError },
        { data: hiredEmployeeRows, error: hiredEmployeeError },
      ] = await Promise.all([
        supabase.from('admin_interns').select('*').order('name'),
        supabase.from('admin_task_entries').select('*').order('created_at', { ascending: false }),
        supabase.from('signup_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('hired_employees').select('*').order('hired_at', { ascending: false }),
      ])

      if (!isMounted) return

      if (internError || taskError || signupRequestError || hiredEmployeeError) {
        setAdminDataError(internError?.message || taskError?.message || signupRequestError?.message || hiredEmployeeError?.message || 'Failed to load admin data.')
        setIsAdminDataLoading(false)
        return
      }

      let resolvedInternRows = internRows || []
      let resolvedTaskRows = taskRows || []

      if (resolvedInternRows.length === 0) {
        const seedInternPayload = buildSeedInternAnalyticsData().map((intern) => ({
          owner_user_id: authUser.id,
          name: intern.name,
          email: intern.email,
          gender: intern.gender,
          course: intern.course,
          contact: intern.contact,
          required_hours: intern.requiredHours,
          school: intern.school,
          track: intern.track,
          status: intern.status,
          mentor: intern.mentor,
          join_date: intern.joinDate,
          performance: intern.performance,
          attendance: intern.attendance,
          progress: intern.progress,
          low: intern.low,
        }))

        const { data: insertedInterns, error: seedInternError } = await supabase
          .from('admin_interns')
          .insert(seedInternPayload)
          .select('*')

        if (!isMounted) return

        if (seedInternError) {
          setAdminDataError(seedInternError.message)
          setIsAdminDataLoading(false)
          return
        }

        resolvedInternRows = insertedInterns || []
      }

      if (resolvedTaskRows.length === 0) {
        const seedTaskPayload = seedAnalyticsTaskEntries.map((task) => ({
          owner_user_id: authUser.id,
          intern_name: task.internName,
          task: task.task,
          score: task.score,
          activity_type: task.activityType,
          created_at_date: task.createdAt,
        }))

        const { data: insertedTasks, error: seedTaskError } = await supabase
          .from('admin_task_entries')
          .insert(seedTaskPayload)
          .select('*')

        if (!isMounted) return

        if (seedTaskError) {
          setAdminDataError(seedTaskError.message)
          setIsAdminDataLoading(false)
          return
        }

        resolvedTaskRows = insertedTasks || []
      }

      setInternAnalyticsData(resolvedInternRows.map(mapInternRowToClient))
      setAnalyticsTaskEntries(resolvedTaskRows.map(mapTaskRowToClient).slice(0, 80))
      setSignupRequests((signupRequestRows || []).map(mapSignupRequestRowToClient))
      setHiredEmployees((hiredEmployeeRows || []).map(mapHiredEmployeeRowToClient))
      setIsAdminDataLoading(false)
    }

    void loadAdminData()

    return () => {
      isMounted = false
    }
  }, [authUser?.id, hasAdminAccess, isAdminAuthenticated])

  useEffect(() => {
    if (currentPath === '/sign-in' && hasAdminAccess) {
      goToPath('/admin-dashboard')
    }
  }, [currentPath, hasAdminAccess])

  useEffect(() => {
    if (activeAdminTab === 'Approvals' && !canManageApprovals) {
      setActiveAdminTab('Dashboard')
    }
  }, [activeAdminTab, canManageApprovals])

  useEffect(() => {
    if (!supabase || !canManageApprovals || activeAdminTab !== 'Approvals') return undefined

    let isMounted = true

    const refreshSignupRequests = async () => {
      const { data, error } = await supabase
        .from('signup_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isMounted || error) return

      setSignupRequests((data || []).map(mapSignupRequestRowToClient))
    }

    void refreshSignupRequests()
    const intervalId = window.setInterval(() => {
      void refreshSignupRequests()
    }, 5000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [activeAdminTab, canManageApprovals])

  useEffect(() => {
    if (!supabase || activeAdminTab !== 'Applications') return undefined

    let isMounted = true

    const refreshCareerApplications = async () => {
      const { data, error } = await supabase
        .from('career_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isMounted || error) {
        if (isMounted && error) {
          setApplicationsError(error.message)
        }
        return
      }

      setApplicationsError('')
      setCareerApplications((data || []).map(mapCareerApplicationRowToClient))
    }

    void refreshCareerApplications()
    const intervalId = window.setInterval(() => {
      void refreshCareerApplications()
    }, 5000)

    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [activeAdminTab, canManageApprovals])

  useEffect(() => {
    setReviewedPendingApplicationIds((prev) => {
      const pendingIds = new Set(careerApplications.filter((item) => item.status === 'pending').map((item) => item.id))
      return prev.filter((id) => pendingIds.has(id))
    })
  }, [careerApplications])

  useEffect(() => {
    if (
      !selectedAnalyticsIntern &&
      !selectedDashboardGroup &&
      !isAdminProfileModalOpen &&
      !isInternStepperOpen &&
      !isAnalyticsTaskModalOpen
    ) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      setSelectedAnalyticsIntern(null)
      setSelectedDashboardGroup(null)
      setIsAdminProfileModalOpen(false)
      setIsInternStepperOpen(false)
      setIsAnalyticsTaskModalOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedAnalyticsIntern, selectedDashboardGroup, isAdminProfileModalOpen, isInternStepperOpen, isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (!isInternStepperOpen) {
      setInternStepperError('')
    }
  }, [isInternStepperOpen])

  useEffect(() => {
    if (!isAnalyticsTaskModalOpen) {
      setAnalyticsTaskError('')
    }
  }, [isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (!['Analytics', 'Evaluation', 'Reports'].includes(activeAdminTab) && selectedAnalyticsIntern) {
      setSelectedAnalyticsIntern(null)
    }
  }, [activeAdminTab, selectedAnalyticsIntern])

  useEffect(() => {
    if (activeAdminTab !== 'Analytics' && isAnalyticsTaskModalOpen) {
      setIsAnalyticsTaskModalOpen(false)
    }
  }, [activeAdminTab, isAnalyticsTaskModalOpen])

  useEffect(() => {
    if (activeAdminTab !== 'Dashboard' && selectedDashboardGroup) {
      setSelectedDashboardGroup(null)
    }
  }, [activeAdminTab, selectedDashboardGroup])

  useEffect(() => {
    if (!selectedAnalyticsIntern) return
    const exists = internAnalyticsData.some((intern) => intern.name === selectedAnalyticsIntern.name)
    if (!exists) setSelectedAnalyticsIntern(null)
  }, [internAnalyticsData, selectedAnalyticsIntern])

  const goToPath = (path) => {
    if (!path || path === currentPath) return
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const scroll = () => {
      const section = document.getElementById(sectionId)
      if (!section) return
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    if (currentPath !== '/') {
      window.history.pushState({}, '', '/')
      setCurrentPath('/')
      setTimeout(scroll, 30)
      return
    }

    scroll()
  }

  const scrollToLocalAnchor = (anchorId) => {
    const target = document.getElementById(anchorId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const officeRegions = useMemo(() => {
    const counts = lifewoodWorldwideOffices.reduce((acc, office) => {
      acc[office.region] = (acc[office.region] || 0) + 1
      return acc
    }, {})

    return [
      { region: 'All Regions', count: lifewoodWorldwideOffices.length },
      ...Object.entries(counts).map(([region, count]) => ({ region, count })),
    ]
  }, [])

  const officesForSelectedRegion = useMemo(() => {
    if (selectedOfficeRegion === 'All Regions') return lifewoodWorldwideOffices
    return lifewoodWorldwideOffices.filter((office) => office.region === selectedOfficeRegion)
  }, [selectedOfficeRegion])

  const activeTypeAProcess = typeAProcess[activeTypeAProcessIndex] || typeAProcess[0]
  const selectTypeAProcess = (index) => {
    if (index < 0 || index >= typeAProcess.length) return
    setActiveTypeAProcessIndex(index)
  }
  const activeTypeBProcess = typeBProcess[activeTypeBProcessIndex] || typeBProcess[0]
  const selectTypeBProcess = (index) => {
    if (index < 0 || index >= typeBProcess.length) return
    setActiveTypeBProcessIndex(index)
  }
  const activeTypeCProcess = typeCProcess[activeTypeCProcessIndex] || typeCProcess[0]
  const selectTypeCProcess = (index) => {
    if (index < 0 || index >= typeCProcess.length) return
    setActiveTypeCProcessIndex(index)
  }

  const careersSlotColumns = useMemo(() => {
    const shuffle = (array) => {
      const arr = [...array]
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      return arr
    }

    return [
      { chips: shuffle(careersCultureChips), speed: '14s' },
      { chips: shuffle(careersCultureChips), speed: '18s' },
      { chips: shuffle(careersCultureChips), speed: '16s' },
    ]
  }, [])

  const totalInterns = internAnalyticsData.length
  const analyticsCourseOptions = useMemo(
    () => Array.from(new Set(internAnalyticsData.map((intern) => intern.course || 'BS Information Technology'))).sort(),
    [internAnalyticsData]
  )
  const presentInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.attendance >= 90), [internAnalyticsData])
  const leaveInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.low), [internAnalyticsData])
  const lateInterns = useMemo(() => internAnalyticsData.filter((intern) => intern.attendance < 85), [internAnalyticsData])

  const birthdayInterns = useMemo(
    () =>
      [
        { name: internAnalyticsData[4]?.name, date: '07 Mar 2026' },
        { name: internAnalyticsData[11]?.name, date: '14 Mar 2026' },
      ].filter((item) => item.name),
    [internAnalyticsData]
  )

  const dashboardAttendanceRows = useMemo(
    () =>
      internAnalyticsData.slice(0, 8).map((intern, index) => ({
        name: intern.name,
        id: String(index + 1).padStart(2, '0'),
        checkin: `09:${String(index + 1).padStart(2, '0')} AM`,
        checkout: '-',
      })),
    [internAnalyticsData]
  )
  const presentPercent = totalInterns ? Math.round((presentInterns.length / totalInterns) * 100) : 0
  const leavePercent = totalInterns ? Math.round((leaveInterns.length / totalInterns) * 100) : 0
  const latePercent = totalInterns ? Math.round((lateInterns.length / totalInterns) * 100) : 0
  const averagePerformance = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.performance, 0) / totalInterns)
    : 0
  const averageAttendance = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.attendance, 0) / totalInterns)
    : 0
  const averageProgress = totalInterns
    ? Math.round(internAnalyticsData.reduce((sum, intern) => sum + intern.progress, 0) / totalInterns)
    : 0

  const getInternBreakdown = (intern) => {
    const activities = Math.round(intern.progress * 0.5 + intern.attendance * 0.2 + intern.performance * 0.3)
    const tasks = Math.round(intern.progress * 0.6 + intern.performance * 0.4)
    const quality = Math.round(intern.performance * 0.75 + intern.attendance * 0.25)
    const collaboration = Math.round((intern.performance + intern.attendance) / 2)
    const consistency = Math.round((intern.attendance + intern.progress) / 2)
    const evalScore = Math.round(intern.performance * 0.4 + intern.attendance * 0.3 + intern.progress * 0.3)
    return { activities, tasks, quality, collaboration, consistency, evalScore }
  }

  const sortInternList = (list, sortBy, scoreSelector = null) => {
    const sorted = [...list]
    sorted.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'performance-desc') return b.performance - a.performance
      if (sortBy === 'attendance-desc') return b.attendance - a.attendance
      if (sortBy === 'progress-desc') return b.progress - a.progress
      if (sortBy === 'score-asc' && scoreSelector) return scoreSelector(a) - scoreSelector(b)
      if (sortBy === 'score-desc' && scoreSelector) return scoreSelector(b) - scoreSelector(a)
      return 0
    })
    return sorted
  }

  const normalizeInternStatus = (status) => {
    if (!status) return 'Active'
    if (status === 'On Leave') return 'Suspend'
    return status
  }

  const getInternStatusLabel = (status) => {
    const normalized = normalizeInternStatus(status)
    return normalized === 'Suspend' ? 'Suspended' : normalized
  }

  const analyticsInternRows = useMemo(() => sortInternList(internAnalyticsData, analyticsSortBy), [internAnalyticsData, analyticsSortBy])
  const evaluationInternRows = useMemo(
    () => sortInternList(internAnalyticsData, evaluationSortBy, (intern) => getInternBreakdown(intern).evalScore),
    [internAnalyticsData, evaluationSortBy]
  )
  const reportInternRows = useMemo(
    () => sortInternList(internAnalyticsData, reportsSortBy, (intern) => getInternBreakdown(intern).evalScore),
    [internAnalyticsData, reportsSortBy]
  )
  const evaluationInsights = useMemo(
    () =>
      evaluationInternRows.map((intern) => {
        const detail = getInternBreakdown(intern)
        const score = detail.evalScore
        const band = score >= 92 ? 'Excellent' : score >= 85 ? 'Strong' : score >= 75 ? 'Stable' : 'Needs Support'
        const risk =
          score >= 90 ? 'Low Risk' : score >= 82 ? 'Watchlist' : score >= 72 ? 'Coaching Required' : 'Immediate Intervention'
        const recommendation =
          score >= 90
            ? 'Keep in advanced tasks and mentorship pipeline.'
            : score >= 82
              ? 'Increase technical stretch tasks and weekly checkpoints.'
              : score >= 72
                ? 'Assign guided practice, QA shadowing, and daily follow-ups.'
                : 'Start a two-week performance recovery plan with mentor reviews.'
        return {
          ...intern,
          score,
          band,
          risk,
          recommendation,
          reviewDate: `2026-03-${String((intern.name.length % 22) + 5).padStart(2, '0')}`,
          detail,
        }
      }),
    [evaluationInternRows]
  )
  const reportInsights = useMemo(
    () =>
      reportInternRows.map((intern) => {
        const detail = getInternBreakdown(intern)
        const score = detail.evalScore
        const completedTasks = Math.round((intern.progress / 100) * 42)
        const qaPassRate = Math.round((detail.quality * 0.65 + intern.performance * 0.35))
        const attendanceFlag = intern.attendance < 85 ? 'At Risk' : intern.attendance < 92 ? 'Watch' : 'Healthy'
        return {
          ...intern,
          score,
          completedTasks,
          qaPassRate,
          attendanceFlag,
          trend: score >= 90 ? 'Rising' : score >= 80 ? 'Stable' : 'Declining',
          detail,
        }
      }),
    [reportInternRows]
  )
  const filteredAnalyticsRows = useMemo(() => {
    const query = analyticsSearch.trim().toLowerCase()
    if (!query) return analyticsInternRows
    return analyticsInternRows.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [analyticsInternRows, analyticsSearch])
  const filteredEvaluationInsights = useMemo(() => {
    const query = evaluationSearch.trim().toLowerCase()
    if (!query) return evaluationInsights
    return evaluationInsights.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.status || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [evaluationInsights, evaluationSearch])
  const filteredReportInsights = useMemo(() => {
    const query = reportsSearch.trim().toLowerCase()
    if (!query) return reportInsights
    return reportInsights.filter((intern) => {
      const source = `${intern.name} ${intern.email || ''} ${intern.track || ''} ${intern.status || ''} ${intern.school || ''} ${intern.course || ''} ${intern.gender || ''} ${intern.contact || ''}`.toLowerCase()
      return source.includes(query)
    })
  }, [reportInsights, reportsSearch])
  const filteredApprovalRequests = useMemo(() => {
    const query = approvalSearch.trim().toLowerCase()
    const visibleRequests = signupRequests.filter((request) => {
      if (!query) return true
      const source = `${request.fullName} ${request.email} ${request.phone || ''} ${request.department || ''} ${request.status}`.toLowerCase()
      return source.includes(query)
    })

    return [...visibleRequests].sort((left, right) => {
      const nameCompare = left.fullName.localeCompare(right.fullName, undefined, { sensitivity: 'base' })

      if (approvalSortBy === 'name-asc') return nameCompare
      if (approvalSortBy === 'approved-first') {
        return (
          (approvalStatusOrder[left.status] === approvalStatusOrder.approved ? -1 : approvalStatusOrder[left.status]) -
            (approvalStatusOrder[right.status] === approvalStatusOrder.approved ? -1 : approvalStatusOrder[right.status]) ||
          nameCompare
        )
      }
      if (approvalSortBy === 'rejected-first') {
        return (
          (approvalStatusOrder[left.status] === approvalStatusOrder.rejected ? -1 : approvalStatusOrder[left.status]) -
            (approvalStatusOrder[right.status] === approvalStatusOrder.rejected ? -1 : approvalStatusOrder[right.status]) ||
          nameCompare
        )
      }
      if (approvalSortBy === 'suspended-first') {
        return (
          (approvalStatusOrder[left.status] === approvalStatusOrder.suspended ? -1 : approvalStatusOrder[left.status]) -
            (approvalStatusOrder[right.status] === approvalStatusOrder.suspended ? -1 : approvalStatusOrder[right.status]) ||
          nameCompare
        )
      }

      return (approvalStatusOrder[left.status] ?? 99) - (approvalStatusOrder[right.status] ?? 99) || nameCompare
    })
  }, [approvalSearch, approvalSortBy, signupRequests])
  const filteredApplications = useMemo(() => {
    const query = applicationSearch.trim().toLowerCase()
    const visibleApplications = careerApplications.filter((application) => {
      if (!query) return true
      const source = [
        application.firstName,
        application.lastName,
        application.email,
        application.phoneNumber,
        application.country,
        application.status,
        ...(application.positions || []),
      ]
        .join(' ')
        .toLowerCase()
      return source.includes(query)
    })

    return [...visibleApplications].sort((left, right) => {
      const leftDate = new Date(left.createdAt || 0).getTime()
      const rightDate = new Date(right.createdAt || 0).getTime()
      const nameCompare = `${left.lastName} ${left.firstName}`.localeCompare(
        `${right.lastName} ${right.firstName}`,
        undefined,
        { sensitivity: 'base' }
      )

      if (applicationSortBy === 'name-asc') return nameCompare
      if (applicationSortBy === 'oldest-first') return leftDate - rightDate || nameCompare
      if (applicationSortBy === 'approved-first') {
        return (
          (applicationStatusOrder[left.status] === applicationStatusOrder.approved ? -1 : applicationStatusOrder[left.status]) -
            (applicationStatusOrder[right.status] === applicationStatusOrder.approved ? -1 : applicationStatusOrder[right.status]) ||
          nameCompare
        )
      }
      if (applicationSortBy === 'rejected-first') {
        return (
          (applicationStatusOrder[left.status] === applicationStatusOrder.rejected ? -1 : applicationStatusOrder[left.status]) -
            (applicationStatusOrder[right.status] === applicationStatusOrder.rejected ? -1 : applicationStatusOrder[right.status]) ||
          nameCompare
        )
      }
      if (applicationSortBy === 'pending-first') {
        return (
          (applicationStatusOrder[left.status] === applicationStatusOrder.pending ? -1 : applicationStatusOrder[left.status]) -
            (applicationStatusOrder[right.status] === applicationStatusOrder.pending ? -1 : applicationStatusOrder[right.status]) ||
          nameCompare
        )
      }

      return rightDate - leftDate || nameCompare
    })
  }, [applicationSearch, applicationSortBy, careerApplications])
  const totalApplicationPages = useMemo(
    () => Math.max(1, Math.ceil(filteredApplications.length / applicationPageSize)),
    [filteredApplications.length, applicationPageSize]
  )

  const paginatedApplications = useMemo(() => {
    const start = (applicationPage - 1) * applicationPageSize
    return filteredApplications.slice(start, start + applicationPageSize)
  }, [filteredApplications, applicationPage, applicationPageSize])

  useEffect(() => {
    if (applicationPage > totalApplicationPages) {
      setApplicationPage(totalApplicationPages)
    }
  }, [applicationPage, totalApplicationPages])

  useEffect(() => {
    setApplicationPage(1)
  }, [applicationSearch, applicationSortBy, applicationViewMode])
  const settingsInternRows = useMemo(() => {
    const query = settingsSearch.trim().toLowerCase()
    return internAnalyticsData
      .map((intern, sourceIndex) => ({ ...intern, sourceIndex }))
      .filter((intern) => {
        const passSearch =
          !query ||
          intern.name.toLowerCase().includes(query) ||
          (intern.email || '').toLowerCase().includes(query) ||
          (intern.track || '').toLowerCase().includes(query) ||
          (intern.school || '').toLowerCase().includes(query) ||
          (intern.course || '').toLowerCase().includes(query) ||
          (intern.gender || '').toLowerCase().includes(query) ||
          (intern.contact || '').toLowerCase().includes(query) ||
          String(intern.requiredHours || '').includes(query)
        const passStatus = settingsStatusFilter === 'All' || normalizeInternStatus(intern.status) === settingsStatusFilter
        return passSearch && passStatus
      })
  }, [internAnalyticsData, settingsSearch, settingsStatusFilter])

  const settingsTotalPages = useMemo(
    () => Math.max(1, Math.ceil(settingsInternRows.length / settingsPageSize)),
    [settingsInternRows.length]
  )

  const paginatedSettingsInternRows = useMemo(() => {
    const start = (settingsPage - 1) * settingsPageSize
    return settingsInternRows.slice(start, start + settingsPageSize)
  }, [settingsInternRows, settingsPage])

  const settingsPageButtons = useMemo(() => {
    if (settingsTotalPages <= 7) {
      return Array.from({ length: settingsTotalPages }, (_, index) => index + 1)
    }

    if (settingsPage <= 4) {
      return [1, 2, 3, 4, 5, '...', settingsTotalPages]
    }

    if (settingsPage >= settingsTotalPages - 3) {
      return [1, '...', settingsTotalPages - 4, settingsTotalPages - 3, settingsTotalPages - 2, settingsTotalPages - 1, settingsTotalPages]
    }

    return [1, '...', settingsPage - 1, settingsPage, settingsPage + 1, '...', settingsTotalPages]
  }, [settingsPage, settingsTotalPages])

  useEffect(() => {
    setSettingsPage(1)
  }, [settingsSearch, settingsStatusFilter])

  useEffect(() => {
    if (settingsPage > settingsTotalPages) {
      setSettingsPage(settingsTotalPages)
    }
  }, [settingsPage, settingsTotalPages])

  useEffect(() => {
    setEmployeePage(1)
  }, [employeeSearch, employeeCountryFilter])

  useEffect(() => {
    if (employeePage > employeeTotalPages) {
      setEmployeePage(employeeTotalPages)
    }
  }, [employeePage, employeeTotalPages])

  useEffect(() => {
    window.requestAnimationFrame(syncManageInternsScrollMetrics)
  }, [currentPath, activeAdminTab, settingsPage, settingsSearch, settingsStatusFilter, settingsInternRows.length])

  useEffect(() => {
    window.requestAnimationFrame(syncEmployeeScrollMetrics)
  }, [currentPath, activeAdminTab, employeePage, employeeSearch, employeeCountryFilter, filteredEmployeeRows.length])

  useEffect(() => {
    const syncAllAdminScrollbars = () => {
      window.requestAnimationFrame(() => {
        syncManageInternsScrollMetrics()
        syncEmployeeScrollMetrics()
      })
    }

    syncAllAdminScrollbars()
    const timeoutIds = [80, 180, 360, 720].map((delay) => window.setTimeout(syncAllAdminScrollbars, delay))

    let cancelled = false
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        if (!cancelled) syncAllAdminScrollbars()
      })
    }

    const onLoad = () => syncAllAdminScrollbars()
    window.addEventListener('load', onLoad)

    return () => {
      cancelled = true
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      window.removeEventListener('load', onLoad)
    }
  }, [activeAdminTab, currentPath])

  useEffect(() => {
    const onResize = () => window.requestAnimationFrame(syncManageInternsScrollMetrics)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const manageTableEl = manageInternsTableScrollRef.current
    const manageTopEl = manageInternsFollowScrollRef.current
    const employeeTableEl = employeeTableScrollRef.current
    const employeeTopEl = employeeFollowScrollRef.current
    const ResizeObserverCtor = window.ResizeObserver

    if (!ResizeObserverCtor) return undefined

    const observer = new ResizeObserverCtor(() => {
      window.requestAnimationFrame(() => {
        syncManageInternsScrollMetrics()
        syncEmployeeScrollMetrics()
      })
    })

    if (manageTableEl) observer.observe(manageTableEl)
    if (manageTopEl) observer.observe(manageTopEl)
    if (employeeTableEl) observer.observe(employeeTableEl)
    if (employeeTopEl) observer.observe(employeeTopEl)

    const viewport = window.visualViewport
    const onViewportResize = () => {
      window.requestAnimationFrame(() => {
        syncManageInternsScrollMetrics()
        syncEmployeeScrollMetrics()
      })
    }

    viewport?.addEventListener('resize', onViewportResize)

    return () => {
      observer.disconnect()
      viewport?.removeEventListener('resize', onViewportResize)
    }
  }, [activeAdminTab, currentPath, settingsInternRows.length, filteredEmployeeRows.length])

  const pageData = useMemo(() => routeContent[currentPath], [currentPath])
  const isAdminRoute = currentPath === '/admin-dashboard'
  const isCareersRoute = currentPath === '/careers'
  const activeAdminData = adminPanelContent[activeAdminTab] || adminPanelContent.Dashboard

  const handleSignIn = (event) => {
    event.preventDefault()
    void (async () => {
      const email = signInEmail.trim()
      const password = signInPassword

      if (!email || !password) {
        setSignInError('Email and password are required.')
        return
      }

      if (!supabase) {
        setSignInError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before signing in.')
        return
      }

      setIsAuthLoading(true)
      setSignInError('')
      setAdminAccessError('')

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setSignInError(error.message)
        setIsAuthLoading(false)
        return
      }

      if (data.session) {
        goToPath('/admin-dashboard')
        setIsAuthLoading(false)
        return
      }

      setSignInError('Sign in failed. No active session was created.')
      setIsAuthLoading(false)
    })()
  }

  const handleEmailSignUp = async (event) => {
    event.preventDefault()

    const fullName = signUpForm.fullName.trim()
    const email = signUpForm.email.trim().toLowerCase()
    const password = signUpForm.password
    const confirmPassword = signUpForm.confirmPassword
    const phone = signUpForm.phone.trim()
    const department = signUpForm.department.trim()

    if (!supabase) {
      setSignUpError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.')
      setSignUpSuccess('')
      return
    }
    if (!fullName || !email || !password) {
      setSignUpError('Full name, email, and password are required.')
      setSignUpSuccess('')
      return
    }
    if (password.length < 8) {
      setSignUpError('Password must be at least 8 characters.')
      setSignUpSuccess('')
      return
    }
    if (password !== confirmPassword) {
      setSignUpError('Password and confirm password must match.')
      setSignUpSuccess('')
      return
    }

    setIsAuthLoading(true)
    setSignUpError('')
    setSignUpSuccess('')

    const { data: signUpData, error: signUpErrorResult } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/sign-in`,
        data: {
          full_name: fullName,
          phone,
          department,
          role: 'user',
        },
      },
    })

    if (signUpErrorResult) {
      setSignUpError(signUpErrorResult.message)
      setIsAuthLoading(false)
      return
    }

    const { error } = await supabase
      .from('signup_requests')
      .insert({
        full_name: fullName,
        email,
        password_hint: `Auth user: ${signUpData.user?.id ? 'created' : 'pending'}`,
        phone,
        department,
        status: 'pending',
      })

    if (error) {
      setSignUpError(error.message)
      setIsAuthLoading(false)
      return
    }

    setSignUpForm({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      department: '',
    })
    setSignUpSuccess('Account created. Check your email for verification, then wait for admin approval before dashboard access.')
    setIsAuthLoading(false)
    setIsSignUpOpen(false)
  }

  const handleAdminSignOut = async () => {
    confirmAdminAction({
      message: 'Sign out of the admin dashboard?',
      confirmLabel: 'Sign Out',
      onConfirm: async () => {
        setIsAdminAuthenticated(false)
        setAuthUser(null)
        setAdminRole(null)
        setAdminAccessError('')
        if (supabase) await supabase.auth.signOut()
        goToPath('/sign-in')
      },
    })
  }

  const handleSignupRequestDecision = (requestId, status) => {
    void (async () => {
      if (!supabase || !authUser?.id) {
        runAdminAction('Supabase is not ready for approval actions')
        return
      }

      const currentRequest = signupRequests.find((item) => item.id === requestId)
      if (!currentRequest) {
        runAdminAction('Request not found')
        return
      }
      if (
        !(
          (currentRequest.status === 'pending' && ['approved', 'rejected'].includes(status)) ||
          (currentRequest.status === 'approved' && status === 'suspended') ||
          (currentRequest.status === 'suspended' && status === 'approved')
        )
      ) {
        runAdminAction('Decision already recorded')
        return
      }

      const actionLabel =
        status === 'approved'
          ? currentRequest.status === 'suspended'
            ? 'unsuspend'
            : 'approve'
          : status === 'rejected'
            ? 'reject'
            : 'suspend'
      confirmAdminAction({
        message: `Are you sure you want to ${actionLabel} ${currentRequest.fullName}?`,
        confirmLabel: actionLabel.charAt(0).toUpperCase() + actionLabel.slice(1),
        tone: status === 'rejected' ? 'danger' : status === 'suspended' ? 'muted' : 'default',
        onConfirm: async () => {
          const note = approvalNoteDrafts[requestId] || ''
          const { data, error } = await supabase
            .from('signup_requests')
            .update({
              status,
              admin_note: note,
              reviewed_by: authUser.id,
              reviewed_at: new Date().toISOString(),
            })
            .eq('id', requestId)
            .select('*')
            .single()

          if (error) {
            runAdminAction(`${status} failed`)
            return
          }

          const { error: profileUpdateError } = await supabase
            .from('profiles')
            .update({
              is_approved: status === 'approved',
              approved_at: status === 'approved' ? new Date().toISOString() : null,
              role: status === 'approved' ? 'admin' : 'user',
            })
            .eq('email', currentRequest.email)

          if (profileUpdateError) {
            runAdminAction(`Request ${status}, but profile update failed`)
            return
          }

          const updatedRequest = mapSignupRequestRowToClient(data)
          setSignupRequests((prev) => prev.map((item) => (item.id === updatedRequest.id ? updatedRequest : item)))
          setApprovalNoteDrafts((prev) => ({ ...prev, [requestId]: updatedRequest.adminNote }))
          runAdminAction(`Request ${status}`)
        },
      })
      return
    })()
  }

  const handleDeleteSignupRequest = (requestId) => {
    void (async () => {
      if (!supabase) {
        runAdminAction('Supabase is not ready for approval actions')
        return
      }
      const currentRequest = signupRequests.find((item) => item.id === requestId)
      if (!currentRequest) {
        runAdminAction('Request not found')
        return
      }
      confirmAdminAction({
        message: `Delete the signup request for ${currentRequest.fullName}?`,
        confirmLabel: 'Delete',
        tone: 'danger',
        onConfirm: async () => {
          const { error } = await supabase.from('signup_requests').delete().eq('id', requestId)
          if (error) {
            runAdminAction('Request delete failed')
            return
          }

          setSignupRequests((prev) => prev.filter((item) => item.id !== requestId))
          setApprovalNoteDrafts((prev) => {
            const next = { ...prev }
            delete next[requestId]
            return next
          })
          runAdminAction('Request deleted')
        },
      })
    })()
  }

  const normalizeCvPath = (cvPath = '') => {
    if (!cvPath) return ''
    if (cvPath.startsWith('career-cv/')) return cvPath.replace('career-cv/', '')
    if (cvPath.startsWith('CAREER-CV/')) return cvPath.replace('CAREER-CV/', '')
    return cvPath
  }

  const handleOpenApplicationCv = async (application) => {
    if (!supabase) {
      runAdminAction('Supabase is not ready for file access')
      return
    }
    const normalizedPath = normalizeCvPath(application.cvPath)
    const candidateBuckets = ['career-cv', 'CAREER-CV']
    const resolvedPath = normalizedPath || application.cvFilename || ''
    if (!resolvedPath) {
      runAdminAction('CV path is missing')
      return
    }

    let signedData = null
    let error = null
    let usedBucket = null

    for (const bucket of candidateBuckets) {
      const result = await supabase.storage.from(bucket).createSignedUrl(resolvedPath, 60 * 10)
      if (!result.error) {
        signedData = result.data
        error = null
        usedBucket = bucket
        break
      }
      error = result.error
    }

    if (error) {
      setApplicationsError(error.message)
      const publicUrl = usedBucket
        ? supabase.storage.from(usedBucket).getPublicUrl(resolvedPath).data?.publicUrl
        : null
      if (!publicUrl) {
        runAdminAction('Unable to open CV')
        return
      }
      setCvModalUrl(publicUrl)
      setCvModalName(application.cvFilename || 'CV.pdf')
      setIsCvModalOpen(true)
      return
    }

    if (signedData?.signedUrl) {
      setCvModalUrl(signedData.signedUrl)
      setCvModalName(application.cvFilename || 'CV.pdf')
      setIsCvModalOpen(true)
    }
  }

  const sendApplicationEmail = async (application, status, adminNote, options = {}) => {
    if (!application.email) {
      return { ok: false, message: 'Applicant email is missing' }
    }
    const interviewScheduledAt = options.interviewScheduledAt || application.interviewScheduledAt || ''
    const interviewTimezone = options.interviewTimezone || application.interviewTimezone || ''
    const interviewLocation = options.interviewLocation || application.interviewLocation || ''
    const fixedMessage = options.message || ''
    const useInterviewEmailConfig = Boolean(options.useInterviewEmailConfig)
    const activeConfig = useInterviewEmailConfig ? interviewEmailJsConfig : emailJsConfig
    if (!activeConfig.publicKey || !activeConfig.serviceId) {
      return { ok: false, message: 'EmailJS is not configured' }
    }
    const templateId = useInterviewEmailConfig
      ? interviewEmailJsConfig.templateId
      : status === 'rejected'
        ? emailJsConfig.templateRejected
        : emailJsConfig.templateApproved
    if (!templateId) {
      return { ok: false, message: 'EmailJS template is missing' }
    }

    const templateParams = {
      to_name: `${application.firstName} ${application.lastName}`.trim(),
      to_email: application.email,
      email: application.email,
      user_email: application.email,
      recipient: application.email,
      position: (application.positions || []).join(', ') || 'Applicant',
      application_id: application.id,
      status,
      admin_note: adminNote || '',
      message: fixedMessage,
      reviewed_at: new Date().toISOString(),
      interview_scheduled_at: interviewScheduledAt,
      interview_schedule: interviewScheduledAt ? new Date(interviewScheduledAt).toLocaleString() : '',
      interview_timezone: interviewTimezone,
      interview_location: interviewLocation,
      company_name: 'Lifewood',
      company_email: activeConfig.companyEmail,
      company_url: activeConfig.companyUrl,
      logo_url: activeConfig.logoUrl,
      from_name: activeConfig.fromName,
      reply_to: activeConfig.replyTo,
    }

    try {
      await emailjs.send(
        activeConfig.serviceId,
        templateId,
        templateParams,
        { publicKey: activeConfig.publicKey }
      )
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error?.text || error?.message || 'Email send failed' }
    }
  }

  const sendHireDecisionEmail = async (application, hireStatus) => {
    if (!application.email) {
      return { ok: false, message: 'Applicant email is missing' }
    }
    if (!interviewEmailJsConfig.publicKey || !interviewEmailJsConfig.serviceId) {
      return { ok: false, message: 'EmailJS is not configured' }
    }

    const templateId = emailJsConfig.templateHireDecision

    if (!templateId) {
      return { ok: false, message: 'EmailJS template is missing' }
    }

    const message = hireStatus === 'hired'
      ? 'We are pleased to inform you that you have been selected to move forward as a hired applicant. Our team will contact you with the next onboarding steps.'
      : 'Thank you for your time and interest in Lifewood. After careful review, we will not be moving forward with your application at this time.'

    const templateParams = {
      to_name: `${application.firstName} ${application.lastName}`.trim(),
      to_email: application.email,
      email: application.email,
      user_email: application.email,
      recipient: application.email,
      position: (application.positions || []).join(', ') || 'Applicant',
      application_id: application.id,
      status: hireStatus,
      hire_status: hireStatus,
      message,
      company_name: 'Lifewood',
      company_email: interviewEmailJsConfig.companyEmail,
      company_url: interviewEmailJsConfig.companyUrl,
      logo_url: interviewEmailJsConfig.logoUrl,
      from_name: interviewEmailJsConfig.fromName,
      reply_to: interviewEmailJsConfig.replyTo,
    }

    try {
      await emailjs.send(
        interviewEmailJsConfig.serviceId,
        templateId,
        templateParams,
        { publicKey: interviewEmailJsConfig.publicKey }
      )
      return { ok: true }
    } catch (error) {
      return { ok: false, message: error?.text || error?.message || 'Email send failed' }
    }
  }

  const openInterviewScheduleModal = (application) => {
    setInterviewScheduleError('')
    setInterviewScheduleForm(createInitialInterviewScheduleForm(application))
    setIsInterviewScheduleModalOpen(true)
  }

  const closeInterviewScheduleModal = () => {
    setInterviewScheduleError('')
    setIsInterviewScheduleModalOpen(false)
  }

  const handleApplicationDecision = (applicationId, status) => {
    void (async () => {
      if (!supabase || !authUser?.id) {
        runAdminAction('Supabase is not ready for application actions')
        return
      }

      const currentApplication = careerApplications.find((item) => item.id === applicationId)
      if (!currentApplication) {
        runAdminAction('Application not found')
        return
      }
      if (!(currentApplication.status === 'pending' && ['approved', 'rejected'].includes(status))) {
        runAdminAction('Decision already recorded')
        return
      }

      const actionLabel = status === 'approved' ? 'approve' : 'reject'
      confirmAdminAction({
        message: `Are you sure you want to ${actionLabel} ${currentApplication.firstName} ${currentApplication.lastName}?`,
        confirmLabel: actionLabel.charAt(0).toUpperCase() + actionLabel.slice(1),
        tone: status === 'rejected' ? 'danger' : 'default',
        onConfirm: async () => {
          const note = applicationNoteDrafts[applicationId] || ''
          const { data, error } = await supabase
            .from('career_applications')
            .update({
              status,
              admin_note: note,
              reviewed_by: authUser.id,
              reviewed_at: new Date().toISOString(),
            })
            .eq('id', applicationId)
            .select('*')
            .maybeSingle()

          if (error) {
            setApplicationsError(error.message)
            runAdminAction(`${status} failed`)
            return
          }
          if (!data) {
            setApplicationsError('No rows updated. Check RLS policy for career_applications.')
            runAdminAction(`${status} failed`)
            return
          }

          const updatedApplication = mapCareerApplicationRowToClient(data)
          setCareerApplications((prev) => prev.map((item) => (item.id === updatedApplication.id ? updatedApplication : item)))
          setApplicationNoteDrafts((prev) => ({ ...prev, [applicationId]: updatedApplication.adminNote }))
          if (status === 'approved') {
            setSelectedApplication(null)
          }
          const emailResult = await sendApplicationEmail(updatedApplication, status, note)
          if (!emailResult.ok) {
            setApplicationsError(emailResult.message || 'Email send failed')
            runAdminAction(`Application ${status}, email failed`)
            return
          }
          if (status !== 'approved') {
            setSelectedApplication(null)
          }
          runAdminAction(`Application ${status}, email sent`)
        },
      })
    })()
  }

  const handleInterviewScheduleSubmit = (event) => {
    event.preventDefault()
    void (async () => {
      if (!supabase || !authUser?.id) {
        setInterviewScheduleError('Supabase is not ready for scheduling.')
        return
      }

      const applicationId = interviewScheduleForm.applicationId
      const currentApplication = careerApplications.find((item) => item.id === applicationId)
      if (!currentApplication) {
        setInterviewScheduleError('Application not found.')
        return
      }

      if (!interviewScheduleForm.date || !interviewScheduleForm.time) {
        setInterviewScheduleError('Select a valid interview date and time.')
        return
      }

      const scheduledAt = new Date(`${interviewScheduleForm.date}T${interviewScheduleForm.time}`)
      if (!scheduledAt || Number.isNaN(scheduledAt.getTime())) {
        setInterviewScheduleError('Select a valid interview date and time.')
        return
      }
      if (scheduledAt.getTime() < Date.now()) {
        setInterviewScheduleError('Interview date and time cannot be in the past.')
        return
      }
      if (!interviewScheduleForm.timezone.trim()) {
        setInterviewScheduleError('Interview timezone is required.')
        return
      }
      const resolvedInterviewLocation =
        interviewScheduleForm.meetingType === 'google-meet'
          ? interviewScheduleForm.meetingLink.trim()
          : defaultFaceToFaceInterviewLocation
      if (!resolvedInterviewLocation) {
        setInterviewScheduleError('Interview location or meeting link is required.')
        return
      }
      if (
        interviewScheduleForm.meetingType === 'google-meet' &&
        !/^https?:\/\/.+/i.test(resolvedInterviewLocation)
      ) {
        setInterviewScheduleError('Enter a valid Google Meet link starting with http:// or https://.')
        return
      }

      confirmAdminAction({
        message: `Schedule the HR interview for ${currentApplication.firstName} ${currentApplication.lastName} on ${scheduledAt.toLocaleString()}?`,
        confirmLabel: 'Schedule Interview',
        onConfirm: async () => {
          const note = applicationNoteDrafts[applicationId] || ''
          const interviewMessage = buildInterviewEmailMessage(interviewScheduleForm.meetingType)
          const schedulePayload = {
            status: hrInterviewStatus,
            admin_note: note,
            reviewed_by: authUser.id,
            reviewed_at: new Date().toISOString(),
            interview_scheduled_at: scheduledAt.toISOString(),
            interview_timezone: interviewScheduleForm.timezone.trim(),
            interview_location: resolvedInterviewLocation,
          }

          const { data, error } = await supabase
            .from('career_applications')
            .update(schedulePayload)
            .eq('id', applicationId)
            .select('*')
            .maybeSingle()

          if (error) {
            setInterviewScheduleError(error.message)
            setApplicationsError(error.message)
            runAdminAction('Interview scheduling failed')
            return
          }
          if (!data) {
            const message = 'No rows updated. Check RLS policy for career_applications.'
            setInterviewScheduleError(message)
            setApplicationsError(message)
            runAdminAction('Interview scheduling failed')
            return
          }

          const updatedApplication = mapCareerApplicationRowToClient(data)
          setCareerApplications((prev) => prev.map((item) => (item.id === updatedApplication.id ? updatedApplication : item)))
          setApplicationNoteDrafts((prev) => ({ ...prev, [applicationId]: updatedApplication.adminNote }))
          setSelectedApplication((prev) => (prev?.id === updatedApplication.id ? updatedApplication : prev))
          const emailResult = await sendApplicationEmail(updatedApplication, hrInterviewStatus, note, {
            interviewScheduledAt: schedulePayload.interview_scheduled_at,
            interviewTimezone: schedulePayload.interview_timezone,
            interviewLocation: schedulePayload.interview_location,
            message: interviewMessage,
            useInterviewEmailConfig: true,
          })

          if (!emailResult.ok) {
            setInterviewScheduleError(emailResult.message || 'Interview email send failed')
            setApplicationsError(emailResult.message || 'Interview email send failed')
            runAdminAction('Interview scheduled, email failed')
            return
          }

          const { data: emailedRow } = await supabase
            .from('career_applications')
            .update({ interview_schedule_sent_at: new Date().toISOString() })
            .eq('id', applicationId)
            .select('*')
            .maybeSingle()

          const finalApplication = emailedRow ? mapCareerApplicationRowToClient(emailedRow) : updatedApplication
          setCareerApplications((prev) => prev.map((item) => (item.id === finalApplication.id ? finalApplication : item)))
          setApplicationNoteDrafts((prev) => ({ ...prev, [applicationId]: finalApplication.adminNote }))
          setSelectedApplication(finalApplication)
          setApplicationsError('')
          closeInterviewScheduleModal()
          runAdminAction('Interview scheduled and email sent')
        },
      })
    })()
  }

  const handleScoreApplication = async (application) => {
    setIsScoringCv(true)
    setCvScoreError('')
    try {
      const response = await fetch('/api/score-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: application.id }),
      })
      const rawText = await response.text()
      let payload = {}
      try {
        payload = rawText ? JSON.parse(rawText) : {}
      } catch {
        payload = { error: rawText }
      }
      if (!response.ok) {
        const message = typeof payload?.error === 'string' ? payload.error : rawText
        throw new Error(message || `Failed to score CV (HTTP ${response.status})`)
      }
      const updated = mapCareerApplicationRowToClient(payload.application)
      setCareerApplications((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      setSelectedApplication(updated)
      runAdminAction('CV scored')
    } catch (error) {
      setCvScoreError(error?.message || 'Failed to score CV')
    } finally {
      setIsScoringCv(false)
    }
  }

  const handleScoreAllPending = async () => {
    const pendingApps = careerApplications.filter((app) => app.status === 'pending')
    if (!pendingApps.length) {
      runAdminAction('No pending applications to score')
      return
    }
    setIsBatchScoring(true)
    setCvScoreError('')
    setBatchScoreProgress({ done: 0, total: pendingApps.length })
    try {
      let completed = 0
      for (const application of pendingApps) {
        const response = await fetch('/api/score-cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ applicationId: application.id }),
        })
        const payload = await response.json()
        if (response.ok) {
          const updated = mapCareerApplicationRowToClient(payload.application)
          setCareerApplications((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
        } else {
          setCvScoreError(payload?.error || 'Failed to score one or more CVs')
        }
        completed += 1
        setBatchScoreProgress({ done: completed, total: pendingApps.length })
      }
      runAdminAction('Batch CV scoring complete')
    } catch (error) {
      setCvScoreError(error?.message || 'Batch CV scoring failed')
    } finally {
      setIsBatchScoring(false)
    }
  }

  const runAdminAction = (message) => {
    setAdminNotice(message)
    window.setTimeout(() => setAdminNotice(''), 1800)
  }
  const focusAdminSearchInput = () => {
    const focus = (ref) => {
      if (!ref?.current) return
      ref.current.focus()
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    if (activeAdminTab === 'Applications') return focus(applicationSearchRef)
    if (activeAdminTab === 'Approvals') return focus(approvalSearchRef)
    if (activeAdminTab === 'Analytics') return focus(analyticsSearchRef)
    if (activeAdminTab === 'Evaluation') return focus(evaluationSearchRef)
    if (activeAdminTab === 'Reports') return focus(reportsSearchRef)
    if (activeAdminTab === 'Manage Interns') return focus(settingsSearchRef)
    if (activeAdminTab === 'Manage Employee') return focus(employeeSearchRef)
    return undefined
  }

  const handleAdminPrimaryAction = () => {
    if (['Analytics', 'Evaluation', 'Reports'].includes(activeAdminTab)) {
      openAnalyticsTaskModal()
      return
    }
    if (activeAdminTab === 'Manage Interns') {
      setIsInternStepperOpen(true)
      return
    }
    if (activeAdminTab === 'Manage Employee') {
      focusAdminSearchInput()
      return
    }
    if (activeAdminTab === 'Applications') {
      goToPath('/application-form')
      return
    }
    if (activeAdminTab === 'Approvals') {
      focusAdminSearchInput()
      return
    }
    if (activeAdminTab === 'Dashboard') {
      setIsAdminProfileModalOpen(true)
      return
    }
    runAdminAction(`${activeAdminTab}: primary action started`)
  }

  const handleAdminFilters = () => {
    focusAdminSearchInput()
    runAdminAction(`${activeAdminTab}: filters ready`)
  }

  const confirmAdminAction = ({ message, confirmLabel = 'Confirm', tone = 'default', onConfirm }) => {
    setConfirmationDialog({
      message,
      confirmLabel,
      tone,
      onConfirm,
    })
  }

  const closeConfirmationDialog = () => setConfirmationDialog(null)

  const getHorizontalScrollContentWidth = (scrollContainer) => {
    if (!scrollContainer) return 0
    const primaryChild = scrollContainer.firstElementChild
    return Math.max(
      primaryChild?.scrollWidth || 0,
      primaryChild?.getBoundingClientRect?.().width || 0,
      scrollContainer.scrollWidth || 0,
      scrollContainer.clientWidth || 0
    )
  }

  const syncManageInternsHorizontalScroll = (source) => {
    if (isSyncingManageInternsScrollRef.current) return
    const topEl = manageInternsFollowScrollRef.current
    const tableEl = manageInternsTableScrollRef.current
    if (!topEl || !tableEl) return

    isSyncingManageInternsScrollRef.current = true
    if (source === 'top') {
      tableEl.scrollLeft = topEl.scrollLeft
    } else {
      topEl.scrollLeft = tableEl.scrollLeft
    }
    window.requestAnimationFrame(() => {
      isSyncingManageInternsScrollRef.current = false
    })
  }

  const syncManageInternsScrollMetrics = () => {
    const topEl = manageInternsFollowScrollRef.current
    const tableEl = manageInternsTableScrollRef.current
    const trackEl = manageInternsFollowTrackRef.current
    if (!topEl || !tableEl || !trackEl) return

    const contentWidth = getHorizontalScrollContentWidth(tableEl)
    trackEl.style.width = `${contentWidth}px`
    topEl.style.visibility = contentWidth > tableEl.clientWidth + 1 ? 'visible' : 'hidden'
    topEl.scrollLeft = tableEl.scrollLeft
  }

  const syncEmployeeHorizontalScroll = (source) => {
    if (isSyncingEmployeeScrollRef.current) return
    const topEl = employeeFollowScrollRef.current
    const tableEl = employeeTableScrollRef.current
    if (!topEl || !tableEl) return

    isSyncingEmployeeScrollRef.current = true
    if (source === 'top') {
      tableEl.scrollLeft = topEl.scrollLeft
    } else {
      topEl.scrollLeft = tableEl.scrollLeft
    }
    window.requestAnimationFrame(() => {
      isSyncingEmployeeScrollRef.current = false
    })
  }

  const syncEmployeeScrollMetrics = () => {
    const topEl = employeeFollowScrollRef.current
    const tableEl = employeeTableScrollRef.current
    const trackEl = employeeFollowTrackRef.current
    if (!topEl || !tableEl || !trackEl) return

    const contentWidth = getHorizontalScrollContentWidth(tableEl)
    trackEl.style.width = `${contentWidth}px`
    topEl.style.visibility = contentWidth > tableEl.clientWidth + 1 ? 'visible' : 'hidden'
    topEl.scrollLeft = tableEl.scrollLeft
  }

  const openAnalyticsTaskModal = () => {
    const defaultIntern = internAnalyticsData[0]?.name || ''
    setAnalyticsTaskForm({
      targetMode: 'individual',
      internName: defaultIntern,
      task: '',
      score: '',
      activityType: 'Activity',
    })
    setAnalyticsTaskSelectedCourses([])
    setAnalyticsTaskError('')
    setIsAnalyticsTaskModalOpen(true)
  }

  const handleAnalyticsTaskSave = (event) => {
    event.preventDefault()
    void (async () => {
      if (!supabase || !authUser?.id) {
        setAnalyticsTaskError('Supabase is not ready for task storage.')
        return
      }

    const task = analyticsTaskForm.task.trim()
    const targetMode = analyticsTaskForm.targetMode || 'individual'
    const internName = analyticsTaskForm.internName.trim()
    const scoreValue = Number(analyticsTaskForm.score)
    if (!task) {
      setAnalyticsTaskError('Task name is required.')
      return
    }
    if (!Number.isFinite(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      setAnalyticsTaskError('Score must be between 0 and 100.')
      return
    }

    let targetInterns = []
    if (targetMode === 'individual') {
      if (!internName) {
        setAnalyticsTaskError('Please select an intern.')
        return
      }
      targetInterns = internAnalyticsData.filter((intern) => intern.name === internName).map((intern) => intern.name)
    } else if (targetMode === 'specific-courses') {
      if (!analyticsTaskSelectedCourses.length) {
        setAnalyticsTaskError('Select at least one course.')
        return
      }
      targetInterns = internAnalyticsData
        .filter((intern) => analyticsTaskSelectedCourses.includes(intern.course || 'BS Information Technology'))
        .map((intern) => intern.name)
    } else if (targetMode === 'all-courses' || targetMode === 'all-students') {
      targetInterns = internAnalyticsData.map((intern) => intern.name)
    }

    if (!targetInterns.length) {
      setAnalyticsTaskError('No target interns found for this selection.')
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const taskPayload = targetInterns.map((targetName) => ({
      owner_user_id: authUser.id,
      intern_name: targetName,
      task,
      score: Math.round(scoreValue),
      activity_type: analyticsTaskForm.activityType || 'Activity',
      created_at_date: today,
    }))

    const { data, error } = await supabase.from('admin_task_entries').insert(taskPayload).select('*')
    if (error) {
      setAnalyticsTaskError(error.message)
      return
    }

    const affectedInterns = internAnalyticsData.filter((intern) => targetInterns.includes(intern.name) && intern.id)
    const updatedInterns = []

    for (const intern of affectedInterns) {
      const nextMetrics = calculateInternMetricsAfterTask(
        intern,
        Math.round(scoreValue),
        analyticsTaskForm.activityType || 'Activity'
      )

      const { data: updatedInternRow, error: updateError } = await supabase
        .from('admin_interns')
        .update({
          performance: nextMetrics.performance,
          attendance: nextMetrics.attendance,
          progress: nextMetrics.progress,
          low: nextMetrics.low,
        })
        .eq('id', intern.id)
        .select('*')
        .single()

      if (updateError) {
        setAnalyticsTaskError(updateError.message)
        return
      }

      updatedInterns.push(mapInternRowToClient(updatedInternRow))
    }

    const newEntries = (data || []).map(mapTaskRowToClient)
    setAnalyticsTaskEntries((prev) => [...newEntries, ...prev].slice(0, 80))
    if (updatedInterns.length) {
      setInternAnalyticsData((prev) =>
        prev.map((intern) => updatedInterns.find((updated) => updated.id === intern.id) || intern)
      )
      if (selectedAnalyticsIntern?.id) {
        const selectedUpdatedIntern = updatedInterns.find((intern) => intern.id === selectedAnalyticsIntern.id)
        if (selectedUpdatedIntern) {
          setSelectedAnalyticsIntern(selectedUpdatedIntern)
        }
      }
    }
    setIsAnalyticsTaskModalOpen(false)
    setAnalyticsTaskError('')
    runAdminAction(`Task added and metrics recalculated for ${targetInterns.length} intern${targetInterns.length === 1 ? '' : 's'}`)
    })()
  }

  const handleAdminProfileSave = async (event) => {
    event.preventDefault()
    if (!adminProfileForm.firstName.trim() || !adminProfileForm.lastName.trim()) {
      runAdminAction('First and last name are required')
      return
    }
    if (!adminProfileForm.email.trim() || !adminProfileForm.email.includes('@')) {
      runAdminAction('Please provide a valid email')
      return
    }
    if (!supabase || !authUser?.id) {
      setIsAdminProfileModalOpen(false)
      runAdminAction('Admin profile updated locally')
      return
    }

    const fullName = `${adminProfileForm.firstName.trim()} ${adminProfileForm.lastName.trim()}`.trim()
    const email = adminProfileForm.email.trim().toLowerCase()
    const phone = adminProfileForm.phone.trim()
    const role = adminRole === 'superadmin' ? 'superadmin' : 'admin'

    const { error } = await supabase.from('profiles').upsert({
      id: authUser.id,
      email,
      full_name: fullName,
      phone,
      role,
    })

    if (error) {
      runAdminAction('Profile save failed')
      return
    }

    const { error: authUpdateError } = await supabase.auth.updateUser({
      email,
      data: {
        display_name: fullName,
        full_name: fullName,
        phone,
      },
    })

    if (authUpdateError) {
      runAdminAction('Profile saved, but auth metadata update failed')
      return
    }

    setAdminProfileForm((prev) => ({
      ...prev,
      firstName: adminProfileForm.firstName.trim(),
      lastName: adminProfileForm.lastName.trim(),
      email,
      phone,
    }))

    setIsAdminProfileModalOpen(false)
    runAdminAction('Admin profile updated')
  }

  const resetInternForm = () => {
    setInternForm({
      name: '',
      email: '',
      gender: 'Male',
      course: 'BS Information Technology',
      contact: '',
      requiredHours: '',
      school: schoolOptions[0],
      track: 'AI Data Operations',
      status: 'Active',
      mentor: '',
      joinDate: '',
    })
    setEditingInternIndex(null)
    setInternStepperStep(1)
    setInternStepperError('')
  }

  const openInternStepperForCreate = () => {
    resetInternForm()
    setIsInternStepperOpen(true)
  }

  const validateInternStepperStep = (step) => {
    setInternStepperError('')
    if (step === 1) {
      const trimmedName = internForm.name.trim()
      const trimmedEmail = internForm.email.trim().toLowerCase()
      if (!trimmedName) {
        setInternStepperError('Intern name is required.')
        return false
      }
      if (!trimmedEmail || !trimmedEmail.includes('@')) {
        setInternStepperError('Valid intern email is required.')
        return false
      }
    }
    if (step === 2) {
      const trimmedContact = internForm.contact.trim()
      if (!internForm.gender) {
        setInternStepperError('Gender is required.')
        return false
      }
      if (!internForm.course.trim()) {
        setInternStepperError('Course / educational background is required.')
        return false
      }
      if (!trimmedContact) {
        setInternStepperError('Contact number is required.')
        return false
      }
    }
    if (step === 3) {
      const hours = Number(internForm.requiredHours)
      if (!Number.isFinite(hours) || hours <= 0) {
        setInternStepperError('Required hours must be greater than 0.')
        return false
      }
    }
    return true
  }

  const handleInternSave = (event) => {
    event.preventDefault()
    void (async () => {
      if (!supabase || !authUser?.id) {
        setInternStepperError('Supabase is not ready for intern storage.')
        return
      }

    setInternStepperError('')
    const trimmedName = internForm.name.trim()
    const trimmedEmail = internForm.email.trim().toLowerCase()
    if (!trimmedName) {
      setInternStepperError('Intern name is required.')
      return
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setInternStepperError('Valid intern email is required.')
      return
    }
    if (!internForm.contact.trim()) {
      setInternStepperError('Contact number is required.')
      return
    }
    if (!internForm.course.trim()) {
      setInternStepperError('Course / educational background is required.')
      return
    }
    const requiredHoursValue = Number(internForm.requiredHours)
    if (!Number.isFinite(requiredHoursValue) || requiredHoursValue <= 0) {
      setInternStepperError('Required hours must be greater than 0.')
      return
    }

    const statusBase = {
      Active: { performance: 86, attendance: 92, progress: 88 },
      Complete: { performance: 93, attendance: 95, progress: 94 },
      Suspend: { performance: 74, attendance: 68, progress: 70 },
    }
    const base = statusBase[internForm.status] || statusBase.Active
    const seededOffset = Math.abs(trimmedName.length % 5) - 2
    const metrics = {
      performance: Math.max(45, Math.min(100, base.performance + seededOffset)),
      attendance: Math.max(40, Math.min(100, base.attendance + seededOffset)),
      progress: Math.max(45, Math.min(100, base.progress + seededOffset)),
    }
    const low = metrics.performance < 65 || metrics.attendance < 70 || metrics.progress < 65

    const payload = {
      owner_user_id: authUser.id,
      name: trimmedName,
      email: trimmedEmail,
      gender: internForm.gender || 'Male',
      course: internForm.course.trim(),
      contact: internForm.contact.trim(),
      required_hours: requiredHoursValue,
      school: internForm.school || schoolOptions[0],
      track: internForm.track,
      status: normalizeInternStatus(internForm.status),
      mentor: internForm.mentor.trim() || 'Unassigned',
      join_date: internForm.joinDate || '2026-01-01',
      performance: metrics.performance,
      attendance: metrics.attendance,
      progress: metrics.progress,
      low,
    }

    if (editingInternIndex !== null) {
      const selected = internAnalyticsData[editingInternIndex]
      if (!selected?.id) {
        setInternStepperError('Selected intern record is missing an id.')
        return
      }
      const { data, error } = await supabase
        .from('admin_interns')
        .update(payload)
        .eq('id', selected.id)
        .select('*')
        .single()

      if (error) {
        setInternStepperError(error.message)
        return
      }

      const updatedIntern = mapInternRowToClient(data)
      setInternAnalyticsData((prev) => prev.map((item) => (item.id === updatedIntern.id ? updatedIntern : item)))
      runAdminAction(`Updated ${updatedIntern.name}`)
    } else {
      const { data, error } = await supabase
        .from('admin_interns')
        .insert(payload)
        .select('*')
        .single()

      if (error) {
        setInternStepperError(error.message)
        return
      }

      const newIntern = mapInternRowToClient(data)
      setInternAnalyticsData((prev) => [...prev, newIntern].sort((a, b) => a.name.localeCompare(b.name)))
      runAdminAction(`Added ${newIntern.name}`)
    }
    resetInternForm()
    setIsInternStepperOpen(false)
    })()
  }

  const handleInternEdit = (index) => {
    const selected = internAnalyticsData[index]
    if (!selected) return
    setEditingInternIndex(index)
    setInternForm({
      name: selected.name,
      email: selected.email || '',
      gender: selected.gender || 'Male',
      course: selected.course || 'BS Information Technology',
      contact: selected.contact || '',
      requiredHours: selected.requiredHours || '',
      school: selected.school || schoolOptions[0],
      track: selected.track || 'AI Data Operations',
      status: normalizeInternStatus(selected.status || 'Active'),
      mentor: selected.mentor || '',
      joinDate: selected.joinDate || '',
    })
    setInternStepperStep(1)
    setIsInternStepperOpen(true)
    runAdminAction(`Editing ${selected.name}`)
  }

  const handleInternDelete = (index) => {
    void (async () => {
      const selected = internAnalyticsData[index]
      if (!selected?.id || !supabase) return
      confirmAdminAction({
        message: `Delete intern profile for ${selected.name}?`,
        confirmLabel: 'Delete',
        tone: 'danger',
        onConfirm: async () => {
          const { error } = await supabase.from('admin_interns').delete().eq('id', selected.id)
          if (error) {
            runAdminAction('Delete failed')
            return
          }

          setInternAnalyticsData((prev) => prev.filter((item) => item.id !== selected.id))
          if (editingInternIndex === index) {
            resetInternForm()
          } else if (editingInternIndex !== null && editingInternIndex > index) {
            setEditingInternIndex((prev) => (prev !== null ? prev - 1 : null))
          }
          runAdminAction(`Deleted ${selected.name}`)
        },
      })
    })()
  }

  const modalityIcon = (title) => {
    if (title === 'Audio') return <Mic className="w-7 h-7 text-castleton" />
    if (title === 'Image') return <ImageIcon className="w-7 h-7 text-castleton" />
    if (title === 'Video') return <Video className="w-7 h-7 text-castleton" />
    return <Type className="w-7 h-7 text-castleton" />
  }

  const capabilityIcon = (title) => {
    if (title === 'Data Validation') return <ShieldCheck className="w-5 h-5" />
    if (title === 'Data Collection') return <Database className="w-5 h-5" />
    if (title === 'Data Acquisition') return <Search className="w-5 h-5" />
    if (title === 'Data Curation') return <FolderTree className="w-5 h-5" />
    return <Tags className="w-5 h-5" />
  }

  const projectListIcon = (title) => {
    if (title.includes('Extraction')) return <Search className="w-4 h-4" />
    if (title.includes('Machine Learning')) return <Database className="w-4 h-4" />
    if (title.includes('Autonomous')) return <ShieldCheck className="w-4 h-4" />
    if (title.includes('Customer Service')) return <Type className="w-4 h-4" />
    if (title.includes('NLP') || title.includes('Speech')) return <Mic className="w-4 h-4" />
    if (title.includes('Computer Vision')) return <ImageIcon className="w-4 h-4" />
    return <FolderTree className="w-4 h-4" />
  }

  const resetEmployeeForm = () => {
    setEditingEmployeeId(null)
    setEmployeeFormError('')
    setEmployeeForm({
      firstName: '',
      lastName: '',
      email: '',
      phoneCode: '',
      phoneNumber: '',
      gender: '',
      age: '',
      country: '',
      address: '',
      positions: '',
    })
    setIsEmployeeModalOpen(false)
  }

  const handleEmployeeEdit = (employee) => {
    if (!employee) return
    setEditingEmployeeId(employee.id)
    setEmployeeFormError('')
    setEmployeeForm({
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      email: employee.email || '',
      phoneCode: employee.phoneCode || '',
      phoneNumber: employee.phoneNumber || '',
      gender: employee.gender || '',
      age: employee.age || '',
      country: employee.country || '',
      address: employee.address || '',
      positions: (employee.positions || []).join(', '),
    })
    setIsEmployeeModalOpen(true)
    runAdminAction(`Editing employee ${employee.firstName} ${employee.lastName}`.trim())
  }

  const handleEmployeeSave = (event) => {
    event.preventDefault()
    void (async () => {
      if (!supabase || !editingEmployeeId) {
        setEmployeeFormError('Employee editing is not ready.')
        return
      }

      const firstName = employeeForm.firstName.trim()
      const lastName = employeeForm.lastName.trim()
      const email = employeeForm.email.trim()
      if (!firstName || !lastName || !email) {
        setEmployeeFormError('First name, last name, and email are required.')
        return
      }

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_code: employeeForm.phoneCode.trim() || null,
        phone_number: employeeForm.phoneNumber.trim() || null,
        gender: employeeForm.gender.trim() || null,
        age: employeeForm.age ? Number(employeeForm.age) : null,
        country: employeeForm.country.trim() || null,
        address: employeeForm.address.trim() || null,
        positions: employeeForm.positions
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      }

      const { data, error } = await supabase
        .from('hired_employees')
        .update(payload)
        .eq('id', editingEmployeeId)
        .select('*')
        .maybeSingle()

      if (error || !data) {
        setEmployeeFormError(error?.message || 'Failed to update employee record.')
        return
      }

      const updatedEmployee = mapHiredEmployeeRowToClient(data)
      setHiredEmployees((prev) => prev.map((item) => (item.id === updatedEmployee.id ? updatedEmployee : item)))
      setCareerApplications((prev) =>
        prev.map((item) =>
          item.id === updatedEmployee.applicationId
            ? {
                ...item,
                firstName: updatedEmployee.firstName,
                lastName: updatedEmployee.lastName,
                email: updatedEmployee.email,
                phoneCode: updatedEmployee.phoneCode,
                phoneNumber: updatedEmployee.phoneNumber,
                gender: updatedEmployee.gender,
                age: updatedEmployee.age,
                country: updatedEmployee.country,
                address: updatedEmployee.address,
                positions: updatedEmployee.positions,
              }
            : item
        )
      )
      runAdminAction(`Updated employee ${updatedEmployee.firstName} ${updatedEmployee.lastName}`.trim())
      resetEmployeeForm()
    })()
  }

  const handleEmployeeDelete = (employee) => {
    void (async () => {
      if (!supabase || !employee?.id) return
      confirmAdminAction({
        message: `Delete employee record for ${employee.firstName} ${employee.lastName}?`,
        confirmLabel: 'Delete',
        tone: 'danger',
        onConfirm: async () => {
          const { error } = await supabase.from('hired_employees').delete().eq('id', employee.id)
          if (error) {
            setApplicationsError(error.message)
            runAdminAction('Employee delete failed')
            return
          }
          setHiredEmployees((prev) => prev.filter((item) => item.id !== employee.id))
          if (editingEmployeeId === employee.id) {
            resetEmployeeForm()
          }
          runAdminAction(`Deleted employee ${employee.firstName} ${employee.lastName}`.trim())
        },
      })
    })()
  }

  const handleApplicationHireStatus = (applicationId, hireStatus) => {
    void (async () => {
      if (!supabase || !authUser?.id) {
        runAdminAction('Supabase is not ready for application actions')
        return
      }

      const currentApplication = careerApplications.find((item) => item.id === applicationId)
      if (!currentApplication) {
        runAdminAction('Application not found')
        return
      }
      if (!canSetHireStatus(currentApplication)) {
        runAdminAction('Hire decision is only available after HR interview progression')
        return
      }
      if (isFinalHireDecision(currentApplication)) {
        runAdminAction('Final hire decision already recorded')
        return
      }
      if (currentApplication.hireStatus === hireStatus) {
        runAdminAction('Hire decision already recorded')
        return
      }

      const actionLabel = hireStatus === 'hired' ? 'mark as hired' : 'mark as not hired'
      confirmAdminAction({
        message: `Are you sure you want to ${actionLabel} ${currentApplication.firstName} ${currentApplication.lastName}?`,
        confirmLabel: hireStatus === 'hired' ? 'Hired' : 'Not Hired',
        tone: hireStatus === 'hired' ? 'default' : 'danger',
        onConfirm: async () => {
          const note = applicationNoteDrafts[applicationId] || ''
          const employeePayload = {
            owner_user_id: authUser.id,
            application_id: currentApplication.id,
            first_name: currentApplication.firstName,
            last_name: currentApplication.lastName,
            email: currentApplication.email,
            phone_code: currentApplication.phoneCode,
            phone_number: currentApplication.phoneNumber,
            gender: currentApplication.gender || null,
            age: currentApplication.age ? Number(currentApplication.age) : null,
            country: currentApplication.country || null,
            address: currentApplication.address || null,
            positions: currentApplication.positions || [],
            cv_filename: currentApplication.cvFilename || null,
            cv_path: currentApplication.cvPath || null,
            application_status: currentApplication.status || null,
            hire_status: 'hired',
            hired_at: new Date().toISOString(),
            reviewed_by: authUser.id,
          }
          const { data, error } = await supabase
            .from('career_applications')
            .update({
              hire_status: hireStatus,
              admin_note: note,
              reviewed_by: authUser.id,
              reviewed_at: new Date().toISOString(),
            })
            .eq('id', applicationId)
            .select('*')
            .maybeSingle()

          if (error) {
            setApplicationsError(error.message)
            runAdminAction(`${hireStatus} failed`)
            return
          }
          if (!data) {
            setApplicationsError('No rows updated. Check RLS policy for career_applications.')
            runAdminAction(`${hireStatus} failed`)
            return
          }

          if (hireStatus === 'hired') {
            const { data: employeeRow, error: employeeError } = await supabase
              .from('hired_employees')
              .upsert(employeePayload, { onConflict: 'application_id' })
              .select('*')
              .maybeSingle()

            if (employeeError) {
              setApplicationsError(employeeError.message)
              runAdminAction('Employee sync failed')
              return
            }

            if (employeeRow) {
              const mappedEmployee = mapHiredEmployeeRowToClient(employeeRow)
              setHiredEmployees((prev) => {
                const existing = prev.some((item) => item.applicationId === mappedEmployee.applicationId)
                if (existing) {
                  return prev.map((item) => (item.applicationId === mappedEmployee.applicationId ? mappedEmployee : item))
                }
                return [mappedEmployee, ...prev]
              })
            }
          } else {
            const { error: employeeDeleteError } = await supabase
              .from('hired_employees')
              .delete()
              .eq('application_id', currentApplication.id)

            if (employeeDeleteError) {
              setApplicationsError(employeeDeleteError.message)
              runAdminAction('Employee sync failed')
              return
            }

            setHiredEmployees((prev) => prev.filter((item) => item.applicationId !== currentApplication.id))
          }

          const updatedApplication = mapCareerApplicationRowToClient(data)
          const emailResult = await sendHireDecisionEmail(updatedApplication, hireStatus)
          if (!emailResult.ok) {
            setApplicationsError(emailResult.message || 'Email send failed')
            runAdminAction(`Application marked as ${hireStatusLabel(hireStatus).toLowerCase()}, email failed`)
            return
          }
          setCareerApplications((prev) => prev.map((item) => (item.id === updatedApplication.id ? updatedApplication : item)))
          setApplicationNoteDrafts((prev) => ({ ...prev, [applicationId]: updatedApplication.adminNote }))
          setSelectedApplication((prev) => (prev?.id === updatedApplication.id ? updatedApplication : prev))
          runAdminAction(`Application marked as ${hireStatusLabel(hireStatus).toLowerCase()} and email sent`)
        },
      })
    })()
  }

  const handleChatbotSend = (event) => {
    event.preventDefault()
    const trimmed = chatbotInput.trim()
    if (!trimmed) return
    const userMessage = { id: `user-${Date.now()}`, role: 'user', content: trimmed }
    const placeholderReply = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      content: "Thanks! I'm limited to dashboard context for now. Backend will be added later.",
    }
    setChatbotMessages((prev) => [...prev, userMessage, placeholderReply])
    setChatbotInput('')
    if (!hasChatted) setHasChatted(true)
  }

  const buildChatbotContext = () => {
    const base = {
      route: currentPath,
      page: routeContent[currentPath]?.title || 'Home',
      activeAdminTab,
    }

    const summaries = {
      Dashboard: {
        counts: {
          applicationsPending: pendingApplicationsCount,
          applicationsProceedingToHr: careerApplications.filter((item) => isHrInterviewStatus(item.status)).length,
          interviewsScheduled: careerApplications.filter((item) => hasInterviewSchedule(item)).length,
          hired: careerApplications.filter((item) => item.hireStatus === 'hired').length,
          notHired: careerApplications.filter((item) => item.hireStatus === 'not_hired').length,
          employees: hiredEmployees.length,
          signupRequestsPending: pendingApprovalsCount,
        },
      },
      Applications: {
        counts: {
          total: careerApplications.length,
          pending: pendingApplicationsCount,
          proceedingToHr: careerApplications.filter((item) => isHrInterviewStatus(item.status)).length,
          interviewsScheduled: careerApplications.filter((item) => hasInterviewSchedule(item)).length,
          hired: careerApplications.filter((item) => item.hireStatus === 'hired').length,
          notHired: careerApplications.filter((item) => item.hireStatus === 'not_hired').length,
        },
        search: applicationSearch,
        sort: applicationSortBy,
        view: applicationViewMode,
        selected: selectedApplication
          ? {
              name: `${selectedApplication.firstName} ${selectedApplication.lastName}`.trim(),
              status: applicationDisplayStatusLabel(selectedApplication),
              score: selectedApplication.cvScore ?? null,
              interviewScheduled: hasInterviewSchedule(selectedApplication),
              interviewSchedule: hasInterviewSchedule(selectedApplication)
                ? formatInterviewSchedule(selectedApplication)
                : null,
              hireStatus: selectedApplication.hireStatus || null,
            }
          : null,
        recent: careerApplications.slice(0, 3).map((item) => ({
          name: `${item.firstName} ${item.lastName}`.trim(),
          status: applicationDisplayStatusLabel(item),
          score: item.cvScore ?? null,
          interviewScheduled: hasInterviewSchedule(item),
          hireStatus: item.hireStatus || null,
        })),
      },
      Approvals: {
        counts: {
          total: signupRequests.length,
          pending: pendingApprovalsCount,
        },
        search: approvalSearch,
        sort: approvalSortBy,
        recent: signupRequests.slice(0, 3).map((item) => ({
          name: item.fullName,
          status: item.status,
          department: item.department,
        })),
      },
      Analytics: {
        search: analyticsSearch,
        sort: analyticsSortBy,
        view: analyticsViewMode,
        recent: filteredAnalyticsRows.slice(0, 3).map((item) => ({
          name: item.name,
          performance: item.performance,
          attendance: item.attendance,
        })),
      },
      Evaluation: {
        search: evaluationSearch,
        sort: evaluationSortBy,
        view: evaluationViewMode,
        recent: filteredEvaluationInsights.slice(0, 3).map((item) => ({
          name: item.name,
          band: item.band,
          score: item.score,
        })),
      },
      Reports: {
        search: reportsSearch,
        sort: reportsSortBy,
        view: reportsViewMode,
        recent: filteredReportInsights.slice(0, 3).map((item) => ({
          name: item.name,
          score: item.score,
          tasks: item.completedTasks,
        })),
      },
      'Manage Interns': {
        search: settingsSearch,
        statusFilter: settingsStatusFilter,
        page: settingsPage,
        counts: {
          total: settingsInternRows.length,
        },
      },
      'Manage Employee': {
        search: employeeSearch,
        countryFilter: employeeCountryFilter,
        page: employeePage,
        counts: {
          total: filteredEmployeeRows.length,
          hired: hiredEmployees.length,
        },
        recent: filteredEmployeeRows.slice(0, 3).map((item) => ({
          name: `${item.firstName} ${item.lastName}`.trim(),
          country: item.country || null,
          positions: item.positions || [],
        })),
      },
    }

    return {
      ...base,
      adminSurface: currentPath === '/admin-dashboard',
      activeTabSummary: summaries[activeAdminTab] || null,
      tabs: {
        Dashboard: summaries.Dashboard,
        Applications: summaries.Applications,
        Approvals: summaries.Approvals,
        Analytics: summaries.Analytics,
        Evaluation: summaries.Evaluation,
        Reports: summaries.Reports,
        'Manage Interns': summaries['Manage Interns'],
        'Manage Employee': summaries['Manage Employee'],
      },
      selection: {
        application: selectedApplication
          ? {
              name: `${selectedApplication.firstName} ${selectedApplication.lastName}`.trim(),
              status: applicationDisplayStatusLabel(selectedApplication),
              score: selectedApplication.cvScore ?? null,
            }
          : null,
        intern: selectedAnalyticsIntern
          ? {
              name: selectedAnalyticsIntern.name,
              label: selectedAnalyticsIntern.label || null,
              score: selectedAnalyticsIntern.score ?? null,
            }
          : null,
        dashboardGroup: selectedDashboardGroup
          ? {
              title: selectedDashboardGroup.title,
              description: selectedDashboardGroup.description || null,
            }
          : null,
      },
    }
  }

  const handleChatbotSendAsync = (event) => {
    event.preventDefault()
    const trimmed = chatbotInput.trim()
    if (!trimmed || isChatbotLoading) return

    const matchedAction = resolveChatbotDashboardAction(trimmed)
    if (matchedAction) {
      const userMessage = { id: `user-${Date.now()}`, role: 'user', content: trimmed }
      setChatbotMessages((prev) => [...prev, userMessage])
      setChatbotInput('')
      if (!hasChatted) setHasChatted(true)
      const didRun = runChatbotAction(matchedAction, trimmed)
      if (!didRun) {
        appendChatbotReply('I found the request, but I could not map it to a dashboard action yet.')
      }
      return
    }

    const userMessage = { id: `user-${Date.now()}`, role: 'user', content: trimmed }
    const history = [...chatbotMessages, userMessage].slice(-8)
    const context = buildChatbotContext()

    setChatbotMessages((prev) => [...prev, userMessage])
    setChatbotInput('')
    if (!hasChatted) setHasChatted(true)
    setIsChatbotLoading(true)

    void (async () => {
      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: trimmed,
            history,
            context,
          }),
        })

        const payload = await response.json().catch(() => ({}))
        if (!response.ok) {
          console.error('[Dashboard AI] /api/chatbot failed', {
            status: response.status,
            statusText: response.statusText,
            payload,
          })
          throw new Error(payload?.error || `Chatbot request failed (${response.status})`)
        }

        const replyText = payload?.answer || payload?.message || 'I could not generate a response.'
        setChatbotMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now() + 1}`,
            role: 'assistant',
            content: replyText,
          },
        ])
      } catch (error) {
        console.error('[Dashboard AI] chatbot request error', {
          error,
          message: trimmed,
          context,
        })
        const errorMessage =
          error instanceof Error && error.message
            ? error.message
            : 'Dashboard AI is not connected on this deployment yet. Check the Vercel function and chatbot key.'
        setChatbotMessages((prev) => [
          ...prev,
          {
            id: `assistant-error-${Date.now() + 1}`,
            role: 'assistant',
            content: errorMessage,
          },
        ])
      } finally {
        setIsChatbotLoading(false)
      }
    })()
  }

  const chatbotSuggestions = [
    {
      title: 'Applicants',
      description: 'Review pending, scheduled, hired, and not hired applications.',
      prompt: 'How many pending applications?',
      icon: FileCheck2,
    },
    {
      title: 'Interns',
      description: 'Check active interns and recent performance trends.',
      prompt: 'Show the intern performance summary.',
      icon: BarChart3,
    },
    {
      title: 'Reports',
      description: 'Summarize recent reports and notable updates.',
      prompt: 'Summarize the latest reports.',
      icon: FileText,
    },
    {
      title: 'Approvals',
      description: 'See what still needs review or approval.',
      prompt: 'What approvals are still pending?',
      icon: ShieldCheck,
    },
    {
      title: 'Activity',
      description: 'Ask about hiring actions, interview schedules, and recent dashboard activity.',
      prompt: 'What changed most recently in applications and hiring?',
      icon: TrendingUp,
    },
    {
      title: 'Quick Read',
      description: 'Get a fast overview of the current dashboard state.',
      prompt: 'Give me a quick dashboard summary.',
      icon: Sparkles,
    },
  ]
  const dashboardPromptCards = chatbotSuggestions.slice(0, 4)

  const chatbotScopes = ['Applicants', 'Interns', 'Reports', 'Approvals']

  const clearChatbotConversation = () => {
    setChatbotInput('')
    setHasChatted(false)
    setIsChatbotLoading(false)
    setChatbotMessages([
      {
        id: 'chatbot-welcome',
        role: 'assistant',
        content: "Hi! I'm your Dashboard AI. Ask me about data you see on this dashboard.",
      },
    ])
  }

  const appendChatbotReply = (content) => {
    setChatbotMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content,
      },
    ])
  }

  const findApplicationByName = (nameQuery) => {
    const query = nameQuery.toLowerCase()
    return careerApplications.find((item) => {
      const fullName = `${item.firstName} ${item.lastName}`.trim().toLowerCase()
      return fullName.includes(query) || item.email?.toLowerCase().includes(query)
    })
  }

  const findInternByName = (nameQuery, sourceRows = []) => {
    const query = nameQuery.toLowerCase()
    return sourceRows.find((item) => {
      const name = `${item.name || ''}`.toLowerCase()
      return name.includes(query)
    })
  }

  const openApplicationDetails = (application) => {
    if (!application) return false
    if (application.status === 'pending') {
      setReviewedPendingApplicationIds((prev) => (prev.includes(application.id) ? prev : [...prev, application.id]))
    }
    setSelectedApplication(application)
    runAdminAction(`Opened application: ${application.firstName} ${application.lastName}`.trim())
    return true
  }

  const openAnalyticsInternDetails = (intern, label = 'analytics') => {
    if (!intern) return false
    setSelectedAnalyticsIntern(intern)
    runAdminAction(`Opened ${label} detail: ${intern.name}`)
    return true
  }

  const openDashboardGroup = (group) => {
    if (!group) return false
    setSelectedDashboardGroup(group)
    runAdminAction(`Opened dashboard group: ${group.title}`)
    return true
  }

  const setSortMode = (tab, value) => {
    if (tab === 'Applications') setApplicationSortBy(value)
    if (tab === 'Approvals') setApprovalSortBy(value)
    if (tab === 'Analytics') setAnalyticsSortBy(value)
    if (tab === 'Evaluation') setEvaluationSortBy(value)
    if (tab === 'Reports') setReportsSortBy(value)
    runAdminAction(`${tab} sort changed`)
  }

  const openSelectionByQuery = (query) => {
    const lower = query.toLowerCase()
    const applicationMatch = findApplicationByName(query)
    if (applicationMatch) return openApplicationDetails(applicationMatch)

    const internMatch =
      findInternByName(query, filteredAnalyticsRows) ||
      findInternByName(query, filteredEvaluationInsights) ||
      findInternByName(query, filteredReportInsights) ||
      findInternByName(query, internAnalyticsData)
    if (internMatch) return openAnalyticsInternDetails(internMatch, 'intern')

    if (/\bdashboard group\b/.test(lower) && selectedDashboardGroup) {
      return openDashboardGroup(selectedDashboardGroup)
    }

    return false
  }

  const dashboardActionRegistry = {
    openTab: (tab) => {
      setActiveAdminTab(tab)
      runAdminAction(`${tab} panel opened`)
      return `Opening ${tab === 'Applications' ? 'Applicants' : tab} tab.`
    },
    setSearch: (tab, value) => {
      if (tab === 'Applications') setApplicationSearch(value)
      if (tab === 'Approvals') setApprovalSearch(value)
      if (tab === 'Analytics') setAnalyticsSearch(value)
      if (tab === 'Evaluation') setEvaluationSearch(value)
      if (tab === 'Reports') setReportsSearch(value)
      if (tab === 'Manage Interns') setSettingsSearch(value)
      if (tab === 'Manage Employee') setEmployeeSearch(value)
      runAdminAction(`${tab} search updated`)
      return `Updated ${tab === 'Applications' ? 'Applicants' : tab} search.`
    },
    setPage: (tab, value) => {
      if (tab === 'Applications') setApplicationPage(value)
      if (tab === 'Manage Interns') setSettingsPage(value)
      if (tab === 'Manage Employee') setEmployeePage(value)
      runAdminAction(`${tab} page changed`)
      return `Changed ${tab === 'Applications' ? 'Applicants' : tab} page.`
    },
    setStatusFilter: (value) => {
      setSettingsStatusFilter(value)
      runAdminAction('Manage Interns status filter changed')
      return 'Changed intern status filter.'
    },
    openApplicationByQuery: (query) => {
      const match = findApplicationByName(query)
      if (!match) return 'I could not find that application.'
      setActiveAdminTab('Applications')
      openApplicationDetails(match)
      return `Opened ${match.firstName} ${match.lastName} in Applicants.`
    },
    openSelectedApplication: () => {
      if (!selectedApplication) return 'No application is selected right now.'
      setActiveAdminTab('Applications')
      openApplicationDetails(selectedApplication)
      return `Opened ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
    openInternByQuery: (query) => {
      const match =
        findInternByName(query, filteredAnalyticsRows) ||
        findInternByName(query, filteredEvaluationInsights) ||
        findInternByName(query, filteredReportInsights) ||
        findInternByName(query, internAnalyticsData)
      if (!match) return 'I could not find that intern record.'
      setSelectedAnalyticsIntern(match)
      setActiveAdminTab(
        filteredEvaluationInsights.some((item) => item.name === match.name)
          ? 'Evaluation'
          : filteredReportInsights.some((item) => item.name === match.name)
            ? 'Reports'
            : 'Analytics'
      )
      runAdminAction(`Opened intern record: ${match.name}`)
      return `Opened ${match.name}.`
    },
    openReportByQuery: (query) => {
      const match = findInternByName(query, filteredReportInsights) || findInternByName(query, internAnalyticsData)
      if (!match) return 'I could not find that report detail.'
      setActiveAdminTab('Reports')
      openAnalyticsInternDetails(match, 'report')
      return `Opened report detail for ${match.name}.`
    },
    openLatestReport: () => {
      const match = filteredReportInsights[0] || internAnalyticsData[0]
      if (!match) return 'There are no reports to open.'
      setActiveAdminTab('Reports')
      openAnalyticsInternDetails(match, 'report')
      return `Opened the latest report for ${match.name}.`
    },
    clearFilters: (tab) => {
      if (tab === 'Applications') {
        setApplicationSearch('')
        setApplicationSortBy('newest-first')
        setApplicationViewMode('cards')
      } else if (tab === 'Approvals') {
        setApprovalSearch('')
        setApprovalSortBy('pending-first')
      } else if (tab === 'Analytics') {
        setAnalyticsSearch('')
        setAnalyticsSortBy('name-asc')
        setAnalyticsViewMode('tiles')
      } else if (tab === 'Evaluation') {
        setEvaluationSearch('')
        setEvaluationSortBy('score-desc')
        setEvaluationViewMode('tiles')
      } else if (tab === 'Reports') {
        setReportsSearch('')
        setReportsSortBy('score-desc')
        setReportsViewMode('tiles')
      } else if (tab === 'Manage Interns') {
        setSettingsSearch('')
        setSettingsStatusFilter('All')
        setSettingsPage(1)
      } else if (tab === 'Manage Employee') {
        setEmployeeSearch('')
        setEmployeeCountryFilter('All')
        setEmployeePage(1)
      }
      runAdminAction(`${tab} filters cleared`)
      return `Cleared ${tab === 'Applications' ? 'Applicants' : tab} filters.`
    },
    setView: (tab, view) => {
      if (tab === 'Applications') {
        setApplicationViewMode(view)
      } else if (tab === 'Analytics') {
        setAnalyticsViewMode(view)
      } else if (tab === 'Evaluation') {
        setEvaluationViewMode(view)
      } else if (tab === 'Reports') {
        setReportsViewMode(view)
      }
      runAdminAction(`${tab} view changed to ${view}`)
      return `Switched ${tab} to ${view} view.`
    },
    setSort: (tab, value) => {
      setSortMode(tab, value)
      return `Updated ${tab} sort.`
    },
    openSelectionByQuery: (query) => {
      const opened = openSelectionByQuery(query)
      return opened ? `Opened ${query}.` : 'I could not find a matching record.'
    },
    focusSearch: (tab) => {
      if (tab === 'Applications') {
        setActiveAdminTab('Applications')
      } else if (tab === 'Approvals') {
        setActiveAdminTab('Approvals')
      } else if (tab === 'Analytics') {
        setActiveAdminTab('Analytics')
      } else if (tab === 'Evaluation') {
        setActiveAdminTab('Evaluation')
      } else if (tab === 'Reports') {
        setActiveAdminTab('Reports')
      } else if (tab === 'Manage Interns') {
        setActiveAdminTab('Manage Interns')
      } else if (tab === 'Manage Employee') {
        setActiveAdminTab('Manage Employee')
      }
      window.setTimeout(() => focusAdminSearchInput(), 0)
      return `Focused ${tab === 'Applications' ? 'Applicants' : tab} search.`
    },
    openAnalyticsTaskModal: () => {
      setActiveAdminTab('Analytics')
      openAnalyticsTaskModal()
      runAdminAction('Analytics task modal opened')
      return 'Opening the analytics task panel.'
    },
    openApplicationForm: () => {
      goToPath('/application-form')
      runAdminAction('Application form opened')
      return 'Opening the application form.'
    },
    clearChat: () => {
      clearChatbotConversation()
      return 'Cleared the chat.'
    },
    listCapabilities: () => chatbotCapabilityLines.join('\n'),
    scoreAllPendingApplications: () => {
      void handleScoreAllPending()
      return 'Starting batch CV scoring for all pending applications.'
    },
    approveSelectedApplication: () => {
      if (!selectedApplication) {
        return 'Open an application first, then I can approve it.'
      }
      handleApplicationDecision(selectedApplication.id, 'approved')
      return `I opened the approval confirmation for ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
    rejectSelectedApplication: () => {
      if (!selectedApplication) {
        return 'Open an application first, then I can reject it.'
      }
      handleApplicationDecision(selectedApplication.id, 'rejected')
      return `I opened the confirmation for ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
    scheduleSelectedInterview: () => {
      if (!selectedApplication) {
        return 'Open an application first, then I can open interview scheduling.'
      }
      if (isFinalHireDecision(selectedApplication)) {
        return `${selectedApplication.firstName} ${selectedApplication.lastName} already has a final hire decision.`
      }
      openInterviewScheduleModal(selectedApplication)
      return `Opened the interview scheduler for ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
    markSelectedApplicationHired: () => {
      if (!selectedApplication) {
        return 'Open an application first, then I can mark it as hired.'
      }
      if (!canSetHireStatus(selectedApplication)) {
        return 'The selected application needs an HR interview schedule before it can be marked as hired.'
      }
      handleApplicationHireStatus(selectedApplication.id, 'hired')
      return `I opened the hired confirmation for ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
    markSelectedApplicationNotHired: () => {
      if (!selectedApplication) {
        return 'Open an application first, then I can mark it as not hired.'
      }
      if (!canSetHireStatus(selectedApplication)) {
        return 'The selected application needs an HR interview schedule before it can be marked as not hired.'
      }
      handleApplicationHireStatus(selectedApplication.id, 'not_hired')
      return `I opened the not hired confirmation for ${selectedApplication.firstName} ${selectedApplication.lastName}.`
    },
  }

  const resolveChatbotDashboardAction = (text) => {
    const query = text.toLowerCase()
    const nameAfterVerb = query
      .replace(/^(open|show|review|view|select|go to|switch to)\s+/, '')
      .replace(/\b(application|applicant|intern|report|details?)\b/g, '')
      .replace(/\b(tab|record|profile|card)\b/g, '')
      .trim()
    const resolveTabFromQuery = () => {
      if (/\b(applicants?|applications?)\b/.test(query)) return 'Applications'
      if (/\bapprovals?\b/.test(query)) return 'Approvals'
      if (/\banalytics?\b/.test(query)) return 'Analytics'
      if (/\bevaluation\b/.test(query)) return 'Evaluation'
      if (/\breports?\b/.test(query)) return 'Reports'
      if (/\b(interns?|manage interns)\b/.test(query)) return 'Manage Interns'
      if (/\bdashboard\b/.test(query)) return 'Dashboard'
      return null
    }

    if (
      /\b(what\s+can\s+(you|it)\s+do|what\s+actions?\s+can\s+(you|it)\s+do|what\s+are\s+your\s+actions?|list\s+actions?|show\s+actions?|help)\b/.test(
        query
      )
    ) {
      return { id: 'listCapabilities' }
    }

    if (/^(clear|reset)\s+(the\s+)?chat/.test(query) || /\bclear chat\b/.test(query)) {
      return { id: 'clearChat' }
    }

    if (/\b(open|show|review|view|select)\b/.test(query) && /\bapplication\b/.test(query) && nameAfterVerb) {
      return { id: 'openApplicationByQuery', query: nameAfterVerb }
    }
    if (/\b(open|show|review|view|select)\b/.test(query) && /\bselected application\b/.test(query)) {
      return { id: 'openSelectedApplication' }
    }
    if (/\bselected application\b/.test(query)) {
      return { id: 'openSelectedApplication' }
    }
    const requestedTab = resolveTabFromQuery()
    if (requestedTab && /\b(open|show|review|view|select|go to|switch to|switch|go)\b/.test(query)) {
      return { id: 'openTab', tab: requestedTab }
    }

    if (/\b(open|show|review|view|select)\b/.test(query) && /\b(intern|member|profile|record)\b/.test(query) && nameAfterVerb) {
      return { id: 'openInternByQuery', query: nameAfterVerb }
    }
    if (/\b(open|show|review|view|select)\b/.test(query) && /\breport\b/.test(query) && nameAfterVerb) {
      return { id: 'openReportByQuery', query: nameAfterVerb }
    }
    if (/\b(open|show|review|view|select)\b/.test(query) && /\breport\b/.test(query) && /\blatest\b/.test(query)) {
      return { id: 'openLatestReport' }
    }

    if (/\b(open|show|review|view|select)\b/.test(query) && nameAfterVerb) {
      return { id: 'openSelectionByQuery', query: nameAfterVerb }
    }

    if (/clear\s+(the\s+)?(filters?|search|searches)\b/.test(query) || /\breset\s+(the\s+)?filters?\b/.test(query)) {
      if (/\bapplicants?|applications?\b/.test(query)) return { id: 'clearFilters', tab: 'Applications' }
      if (/\bapprovals?\b/.test(query)) return { id: 'clearFilters', tab: 'Approvals' }
      if (/\banalytics?\b/.test(query)) return { id: 'clearFilters', tab: 'Analytics' }
      if (/\bevaluation\b/.test(query)) return { id: 'clearFilters', tab: 'Evaluation' }
      if (/\breports?\b/.test(query)) return { id: 'clearFilters', tab: 'Reports' }
      if (/\binterns?|manage interns\b/.test(query)) return { id: 'clearFilters', tab: 'Manage Interns' }
    }

    if (/\b(cards?|list|tiles?)\s+view\b/.test(query) || /\bview\s+(cards?|list|tiles?)\b/.test(query)) {
      const view = /\blist\b/.test(query) ? 'list' : /\bcards?\b/.test(query) ? 'cards' : 'tiles'
      if (/\bapplications?\b|\bapplicants?\b/.test(query)) return { id: 'setView', tab: 'Applications', view: view === 'cards' ? 'cards' : 'list' }
      if (/\banalytics?\b/.test(query)) return { id: 'setView', tab: 'Analytics', view: view === 'list' ? 'list' : 'tiles' }
      if (/\bevaluation\b/.test(query)) return { id: 'setView', tab: 'Evaluation', view: view === 'list' ? 'list' : 'tiles' }
      if (/\breports?\b/.test(query)) return { id: 'setView', tab: 'Reports', view: view === 'list' ? 'list' : 'tiles' }
    }

    if (/\bsort\b/.test(query)) {
      if (/\bapplications?\b|\bapplicants?\b/.test(query)) {
        if (/\bnewest\b/.test(query)) return { id: 'setSort', tab: 'Applications', value: 'newest-first' }
        if (/\boldest\b/.test(query)) return { id: 'setSort', tab: 'Applications', value: 'oldest-first' }
        if (/\bpending\b/.test(query)) return { id: 'setSort', tab: 'Applications', value: 'pending-first' }
        if (/\bhr\b|\bapproved\b/.test(query)) return { id: 'setSort', tab: 'Applications', value: 'approved-first' }
        if (/\brejected\b/.test(query)) return { id: 'setSort', tab: 'Applications', value: 'rejected-first' }
      }
      if (/\banalytics?\b/.test(query)) {
        if (/\bname\b/.test(query)) return { id: 'setSort', tab: 'Analytics', value: /\bz\b/.test(query) ? 'name-desc' : 'name-asc' }
        if (/\bperformance\b/.test(query)) return { id: 'setSort', tab: 'Analytics', value: 'performance-desc' }
        if (/\battendance\b/.test(query)) return { id: 'setSort', tab: 'Analytics', value: 'attendance-desc' }
        if (/\bprogress\b/.test(query)) return { id: 'setSort', tab: 'Analytics', value: 'progress-desc' }
      }
      if (/\bevaluation\b/.test(query)) {
        if (/\bname\b/.test(query)) return { id: 'setSort', tab: 'Evaluation', value: /\bz\b/.test(query) ? 'name-desc' : 'name-asc' }
        if (/\bscore\b/.test(query)) return { id: 'setSort', tab: 'Evaluation', value: /\blow\b/.test(query) ? 'score-asc' : 'score-desc' }
      }
      if (/\breports?\b/.test(query)) {
        if (/\bname\b/.test(query)) return { id: 'setSort', tab: 'Reports', value: /\bz\b/.test(query) ? 'name-desc' : 'name-asc' }
        if (/\bscore\b/.test(query)) return { id: 'setSort', tab: 'Reports', value: /\blow\b/.test(query) ? 'score-asc' : 'score-desc' }
      }
      if (/\bapprovals?\b/.test(query)) {
        if (/\bpending\b/.test(query)) return { id: 'setSort', tab: 'Approvals', value: 'pending-first' }
        if (/\bname\b/.test(query)) return { id: 'setSort', tab: 'Approvals', value: 'name-asc' }
      }
    }

    if (/\bsearch\b/.test(query)) {
      if (/\bapplicants?|applications?\b/.test(query)) return { id: 'focusSearch', tab: 'Applications' }
      if (/\bapprovals?\b/.test(query)) return { id: 'focusSearch', tab: 'Approvals' }
      if (/\banalytics?\b/.test(query)) return { id: 'focusSearch', tab: 'Analytics' }
      if (/\bevaluation\b/.test(query)) return { id: 'focusSearch', tab: 'Evaluation' }
      if (/\breports?\b/.test(query)) return { id: 'focusSearch', tab: 'Reports' }
      if (/\binterns?|manage interns\b/.test(query)) return { id: 'focusSearch', tab: 'Manage Interns' }
    }

    if (/\b(task|activity)\b/.test(query) && /\bopen\b/.test(query) && /\banalytics?\b/.test(query)) {
      return { id: 'openAnalyticsTaskModal' }
    }

    if (/\b(application form|new application|apply now)\b/.test(query)) {
      return { id: 'openApplicationForm' }
    }

    if (/\b(batch score|score all|score pending)\b/.test(query)) {
      return { id: 'scoreAllPendingApplications', dangerous: true, confirmLabel: 'Score All' }
    }

    if (/\bapprove|approved\b/.test(query) && /\bapplication|applicant|selected\b/.test(query)) {
      return { id: 'approveSelectedApplication' }
    }

    if (/\b(schedule|reschedule)\b/.test(query) && /\b(interview|hr)\b/.test(query)) {
      return { id: 'scheduleSelectedInterview' }
    }

    if (/\b(hired|mark hired|hire)\b/.test(query) && /\b(application|applicant|selected)?\b/.test(query)) {
      return { id: 'markSelectedApplicationHired' }
    }

    if (/\b(not hired|mark not hired)\b/.test(query)) {
      return { id: 'markSelectedApplicationNotHired' }
    }

    if (/\breject\b/.test(query) && /\bapplication\b/.test(query)) {
      return { id: 'rejectSelectedApplication' }
    }

    return null
  }

  const runChatbotAction = (action, userText) => {
    const handler = dashboardActionRegistry[action.id]
    if (!handler) return false

    if (action.id === 'clearChat') {
      handler()
      return true
    }

    if (action.dangerous) {
      const previewLines = [
        'Action preview',
        `- Command: ${userText}`,
        `- Risk: ${action.id === 'scoreAllPendingApplications' ? 'Batch CV scoring' : 'Status-changing action'}`,
        `- Target: ${selectedApplication ? `${selectedApplication.firstName} ${selectedApplication.lastName}`.trim() : 'Current selection'}`,
      ]
      appendChatbotReply(previewLines.join('\n'))
      confirmAdminAction({
        message: 'Do you want to score all pending applications now?',
        confirmLabel: action.confirmLabel || 'Confirm',
        tone: 'danger',
        onConfirm: () => {
          const reply = action.query
            ? handler(action.query)
            : action.tab
              ? handler(action.tab, action.view)
              : handler()
          appendChatbotReply(reply)
          if (!hasChatted) setHasChatted(true)
        },
      })
      return true
    }

    const reply = action.query
      ? handler(action.query)
      : action.tab
        ? handler(action.tab, action.view)
        : action.value
          ? handler(action.tab, action.value)
          : handler()
    appendChatbotReply(reply)
    if (!hasChatted) setHasChatted(true)
    return true
  }

  const beginChatWidgetDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return
    const state = chatWidgetDragRef.current
    state.active = true
    state.dragged = false
    setIsChatWidgetReturning(false)
    state.startX = event.clientX
    state.startY = event.clientY
    state.originX = chatWidgetOffset.x
    state.originY = chatWidgetOffset.y
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const moveChatWidgetDrag = (event) => {
    const state = chatWidgetDragRef.current
    if (!state.active) return

    const deltaX = event.clientX - state.startX
    const deltaY = event.clientY - state.startY

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      state.dragged = true
    }

    setChatWidgetOffset(
      clampChatWidgetOffset({
        x: state.originX + deltaX,
        y: state.originY + deltaY,
      })
    )
  }

  const endChatWidgetDrag = (event) => {
    const state = chatWidgetDragRef.current
    if (!state.active) return
    state.active = false
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const handleChatWidgetToggle = () => {
    const state = chatWidgetDragRef.current
    if (state.dragged) {
      state.dragged = false
      return
    }
    if (isChatbotOpen) {
      closeChatWidget()
      return
    }
    setIsChatbotOpen(true)
  }

  const closeChatWidget = () => {
    setIsChatbotOpen(false)
    setIsChatWidgetReturning(true)
    setChatWidgetOffset({ x: 0, y: 0 })
    chatWidgetDragRef.current.dragged = false
    chatWidgetDragRef.current.active = false
    setChatheadPromptIndex(Math.floor(Math.random() * chatbotPrompts.length))
    window.setTimeout(() => setIsChatWidgetReturning(false), 420)
  }

  const getChatWidgetMetrics = (openState = isChatbotOpen) => {
    if (typeof window === 'undefined') {
      return {
        width: openState ? 436 : 238,
        height: openState ? 360 : 56,
      }
    }

    const margin = 24
    const panelWidth = Math.max(0, Math.min(368, window.innerWidth - margin * 2))
    const panelHeight = Math.max(0, Math.min(540, window.innerHeight - 180))
    const bubbleWidth = window.innerWidth < 640 ? 170 : 190
    const launcherWidth = 56
    const widgetGap = 12

    return {
      width: openState ? panelWidth + launcherWidth + widgetGap : launcherWidth + bubbleWidth + widgetGap,
      height: openState ? panelHeight : 56,
    }
  }

  const clampChatWidgetOffset = (nextOffset, openState = isChatbotOpen) => {
    if (typeof window === 'undefined') return nextOffset

    const margin = 24
    const topSafe = openState ? 0 : chatheadTopBoundary
    const { width, height } = getChatWidgetMetrics(openState)
    const measuredHeight =
      openState && chatWidgetPanelRef.current
        ? Math.ceil(chatWidgetPanelRef.current.getBoundingClientRect().height)
        : height
    const measuredWidth =
      openState && chatWidgetPanelRef.current
        ? Math.ceil(chatWidgetPanelRef.current.getBoundingClientRect().width)
        : width
    const minX = Math.min(0, margin * 2 + measuredWidth - window.innerWidth)
    const minY = Math.min(0, topSafe + measuredHeight + margin - window.innerHeight)

    return {
      x: Math.max(minX, Math.min(0, nextOffset.x)),
      y: Math.max(minY, Math.min(0, nextOffset.y)),
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleResize = () => {
      setChatWidgetOffset((prev) => clampChatWidgetOffset(prev))
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [isChatbotOpen])

  useEffect(() => {
    setChatWidgetOffset((prev) => clampChatWidgetOffset(prev))
  }, [isChatbotOpen])

  useEffect(() => {
    if (isChatbotOpen) return undefined

    const rotatePrompt = () => {
      setChatheadPromptIndex(Math.floor(Math.random() * chatbotPrompts.length))
    }

    rotatePrompt()
    const timer = window.setInterval(rotatePrompt, 5000)
    return () => window.clearInterval(timer)
  }, [isChatbotOpen])

  const shouldFlipChatWidget = (() => {
    if (!isChatbotOpen || typeof window === 'undefined') return false

    const margin = 24
    const launcherWidth = 56
    const widgetGap = 12
    const panelWidth = Math.max(0, Math.min(368, window.innerWidth - margin * 2))
    const launcherRightEdge = window.innerWidth - margin + chatWidgetOffset.x
    const leftSpace = launcherRightEdge - launcherWidth - widgetGap - margin
    const rightSpace = window.innerWidth - margin - launcherRightEdge

    return leftSpace < panelWidth && rightSpace >= panelWidth + widgetGap
  })()

  const chatheadTopBoundary = 72

  const chatWidget = (
    <div
      className="fixed bottom-6 right-6 z-[120] pointer-events-none"
      style={{
        transform: `translate(${chatWidgetOffset.x}px, ${chatWidgetOffset.y}px)`,
        transition: isChatWidgetReturning ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
      }}
    >
      {isChatbotOpen ? (
        <div className="relative h-14 w-14">
          <div
            ref={chatWidgetPanelRef}
            className={`pointer-events-auto absolute bottom-0 w-[min(368px,calc(100vw-5.25rem))] rounded-[28px] border border-castleton/15 bg-white shadow-[0_24px_80px_-34px_rgba(19,48,32,0.45)] overflow-hidden flex flex-col backdrop-blur-sm ${
              shouldFlipChatWidget ? 'left-[68px]' : 'right-[68px]'
            }`}
            style={{
              width: 'min(368px, calc(100vw - 5.25rem))',
              height: 'min(540px, calc(100dvh - 7.25rem))',
              maxHeight: 'calc(100dvh - 7.25rem)',
            }}
          >
            <div
              className="relative overflow-hidden bg-[linear-gradient(135deg,#0f5f44,#133020_68%,#0a3f31)] px-4 py-3 text-white select-none"
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f4b347]/20 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 border border-white/15">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">Dashboard AI</p>
                    <p className="text-[11px] text-white/72">Answers from dashboard context only</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={clearChatbotConversation}
                    className="focus-brand inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 px-2.5 text-[11px] font-semibold text-white/90 hover:bg-white/10 transition-colors"
                    aria-label="Clear chatbot conversation"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear
                  </button>
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={closeChatWidget}
                    className="focus-brand inline-flex h-8 w-8 items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close chatbot"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-[#f7faf6] px-4 py-4">
              {!hasChatted ? (
                <div className="mb-4 rounded-[24px] border border-castleton/10 bg-white p-3 shadow-[0_12px_30px_-28px_rgba(19,48,32,0.35)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-black/45">Suggested actions</p>
                      <h3 className="mt-1 text-sm font-semibold text-castleton">Pick a quick prompt</h3>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-castleton/8 text-castleton">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {dashboardPromptCards.map((suggestion) => {
                      const Icon = suggestion.icon
                      return (
                        <button
                          key={suggestion.title}
                          type="button"
                          onClick={() => setChatbotInput(suggestion.prompt)}
                          className="focus-brand group rounded-2xl border border-castleton/10 bg-[#fbfcfb] p-3 text-left text-black shadow-[0_10px_24px_-26px_rgba(19,48,32,0.35)] transition-all hover:-translate-y-0.5 hover:border-castleton/20 hover:bg-white"
                        >
                          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-castleton/8 text-castleton transition-colors group-hover:bg-castleton/12">
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className="text-sm font-semibold leading-tight text-castleton">{suggestion.title}</p>
                          <p className="mt-1 text-[11px] leading-relaxed text-black/55 line-clamp-2">{suggestion.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}
              <div className="space-y-3">
                {chatbotMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                        message.role === 'user'
                          ? 'bg-castleton text-white rounded-br-md'
                          : 'bg-white border border-castleton/10 text-black rounded-bl-md'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isChatbotLoading ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md border border-castleton/10 bg-white px-3 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            className="h-2.5 w-2.5 rounded-full bg-castleton"
                            animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              delay: dot * 0.12,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {!hasChatted ? (
              <div className="border-t border-white/10 bg-[linear-gradient(135deg,#0f5f44,#133020_68%,#0a3f31)] px-4 pt-3 pb-2" />
            ) : null}
            <form onSubmit={handleChatbotSendAsync} className="border-t border-white/10 bg-[linear-gradient(135deg,#0f5f44,#133020_68%,#0a3f31)] px-3 pb-3 pt-2">
              <div className="flex items-center gap-2 rounded-[22px] border border-white/15 bg-white/10 px-3 py-2.5">
                <input
                  type="text"
                  value={chatbotInput}
                  onChange={(event) => setChatbotInput(event.target.value)}
                  placeholder="Ask about this dashboard..."
                  className="focus-brand flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
                />
                <button
                  type="submit"
                  className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-castleton hover:bg-white/90 transition-colors disabled:opacity-50"
                  aria-label="Send message"
                  disabled={!chatbotInput.trim() || isChatbotLoading}
                >
                  <Send className={`h-4 w-4 ${isChatbotLoading ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </form>
          </div>
          <div className="relative h-14 w-14 pointer-events-auto">
            <motion.button
              type="button"
              onPointerDown={beginChatWidgetDrag}
              onPointerMove={moveChatWidgetDrag}
              onPointerUp={endChatWidgetDrag}
              onPointerCancel={endChatWidgetDrag}
              onClick={handleChatWidgetToggle}
              style={{ touchAction: 'none' }}
              className={`focus-brand relative z-[2] inline-flex h-14 w-14 cursor-grab active:cursor-grabbing items-center justify-center rounded-full text-white shadow-[0_16px_38px_-18px_rgba(19,48,32,0.7)] transition-all ${
                isChatbotOpen
                  ? 'bg-[linear-gradient(135deg,#f4b347,#e89f24)] ring-4 ring-white/75'
                  : 'bg-[linear-gradient(135deg,#0f5f44,#0b4e39)] hover:scale-105'
              }`}
              aria-label={isChatbotOpen ? 'Close AI agent' : 'Open AI agent'}
              animate={{
                boxShadow: isChatbotOpen
                  ? [
                      '0 16px 38px -18px rgba(19,48,32,0.7)',
                      '0 20px 46px -18px rgba(244,179,71,0.8)',
                      '0 16px 38px -18px rgba(19,48,32,0.7)',
                    ]
                  : [
                      '0 16px 38px -18px rgba(19,48,32,0.7)',
                      '0 22px 48px -18px rgba(19,48,32,0.85)',
                      '0 16px 38px -18px rgba(19,48,32,0.7)',
                    ],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${isChatbotOpen ? 'bg-[#f4b347]/30' : 'bg-castleton/25'}`}
                animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                className={`absolute inset-[-10px] rounded-full border ${isChatbotOpen ? 'border-[#f4b347]/25' : 'border-white/20'}`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.18, 0.55] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${isChatbotOpen ? 'bg-white/18 border-white/20' : 'bg-white/10 border-white/15'}`}>
                <motion.span
                  className="absolute -left-5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-white/40"
                  animate={{ y: [0, -2, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Move className="h-3.5 w-3.5" />
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
                  transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MessageCircle className="h-5 w-5" />
                </motion.span>
                <motion.span
                  className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full ring-2 ${isChatbotOpen ? 'bg-white ring-[#f4b347]' : 'bg-[#f4b347] ring-[#0f5f44]'}`}
                  animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="relative h-14 w-14 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.72, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.72, 1.08, 1.08, 0.82], y: [10, 0, 0, -8] }}
            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.12, 0.88, 1] }}
            className="pointer-events-none absolute -left-6 -top-6 z-[3]"
          >
            <motion.span
              className="inline-flex origin-[70%_70%] text-[38px] leading-none drop-shadow-[0_12px_22px_rgba(19,48,32,0.22)]"
              style={{ transform: 'scaleX(-1)' }}
              animate={{ rotate: [0, 18, -10, 18, 0, 0, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.18, 0.36, 0.54, 0.7, 0.85, 1] }}
            >
              👋
            </motion.span>
          </motion.div>
          <motion.div
            key={chatheadPromptIndex}
            initial={{ opacity: 0, x: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.45, ease: 'easeOut' },
              x: { duration: 0.45, ease: 'easeOut' },
              scale: { duration: 0.45, ease: 'easeOut' },
            }}
            className="pointer-events-none absolute right-[64px] sm:right-[72px] top-[calc(50%-36px)] z-[1] w-[196px] sm:w-[228px] -translate-y-[50%] rounded-[24px] rounded-br-[12px] border border-castleton/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(244,248,244,0.96))] px-4 py-3.5 text-black shadow-[0_14px_28px_-18px_rgba(19,48,32,0.22),0_28px_60px_-26px_rgba(19,48,32,0.42)] backdrop-blur-md"
            >
            <span className="block text-[13px] font-semibold leading-[1.4] whitespace-normal text-castleton/95">
              {chatbotPrompts[chatheadPromptIndex]}
            </span>
          </motion.div>
          <motion.button
            type="button"
            onPointerDown={beginChatWidgetDrag}
            onPointerMove={moveChatWidgetDrag}
            onPointerUp={endChatWidgetDrag}
            onPointerCancel={endChatWidgetDrag}
            onClick={handleChatWidgetToggle}
            style={{ touchAction: 'none' }}
            className={`focus-brand relative z-[2] inline-flex h-14 w-14 cursor-grab active:cursor-grabbing items-center justify-center rounded-full text-white shadow-[0_16px_38px_-18px_rgba(19,48,32,0.7)] transition-all ${
              isChatbotOpen
                ? 'bg-[linear-gradient(135deg,#f4b347,#e89f24)] ring-4 ring-white/75'
                : 'bg-[linear-gradient(135deg,#0f5f44,#0b4e39)] hover:scale-105'
            }`}
            aria-label={isChatbotOpen ? 'Close AI agent' : 'Open AI agent'}
            animate={{
              boxShadow: isChatbotOpen
                ? [
                    '0 16px 38px -18px rgba(19,48,32,0.7)',
                    '0 20px 46px -18px rgba(244,179,71,0.8)',
                    '0 16px 38px -18px rgba(19,48,32,0.7)',
                  ]
                : [
                    '0 16px 38px -18px rgba(19,48,32,0.7)',
                    '0 22px 48px -18px rgba(19,48,32,0.85)',
                    '0 16px 38px -18px rgba(19,48,32,0.7)',
                  ],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.span
              className={`absolute inset-0 rounded-full ${isChatbotOpen ? 'bg-[#f4b347]/30' : 'bg-castleton/25'}`}
              animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.span
              className={`absolute inset-[-10px] rounded-full border ${isChatbotOpen ? 'border-[#f4b347]/25' : 'border-white/20'}`}
              animate={{ scale: [1, 1.2, 1], opacity: [0.55, 0.18, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${isChatbotOpen ? 'bg-white/18 border-white/20' : 'bg-white/10 border-white/15'}`}>
              <motion.span
                className="absolute -left-5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-white/40"
                animate={{ y: [0, -2, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Move className="h-3.5 w-3.5" />
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.08, 1], rotate: [0, 3, 0] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.span>
              <motion.span
                className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full ring-2 ${isChatbotOpen ? 'bg-white ring-[#f4b347]' : 'bg-[#f4b347] ring-[#0f5f44]'}`}
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.button>
        </div>
      )}
    </div>
  )

  if (currentPath !== '/') {
    return (
      <div className="w-full overflow-x-hidden min-h-screen">
        {!isAdminRoute ? (
          <Suspense fallback={<NavigationFallback />}>
            <Navigation onNavigate={scrollToSection} onNavigatePath={goToPath} />
          </Suspense>
        ) : null}
        <main
          className={`${
            isAdminRoute
              ? 'pt-2 pb-0'
              : currentPath === '/sign-in'
                ? 'pt-28 sm:pt-32 lg:pt-20 pb-14'
                : isCareersRoute
                  ? 'pt-14 pb-14'
                  : 'pt-20 pb-14'
          } px-4 sm:px-6 lg:px-8`}
        >
          {currentPath === '/ai-services' ? (
            <section className="max-w-6xl mx-auto space-y-6 sm:space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Data Services</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">End-to-end AI data solutions</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood delivers end-to-end AI data solutions from multi-language collection and annotation to model training
                  and generative AI content. Our global workforce and industrialized methodology support efficient scaling and
                  high-quality domain-specific datasets.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Workforce</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Delivery</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Domain-specialized Data</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-modalities')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">View Modalities</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-video')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Watch Video</button>
                  <button type="button" onClick={() => scrollToLocalAnchor('ai-contact')} className="focus-brand brand-pill px-4 py-2 text-sm font-semibold">Contact Team</button>
                </div>
              </motion.div>

              <motion.section
                id="ai-modalities"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="modalities-fade-shell mt-2 sm:mt-3 overflow-hidden rounded-3xl">
                  <div className="modalities-loop-track py-1">
                    {[...aiServiceModalities, ...aiServiceModalities].map((item, index) => (
                    <motion.article
                      key={`${item.title}-${index}`}
                      className="w-[278px] sm:w-[306px] shrink-0 rounded-[28px] border border-castleton/20 bg-[#f7f8f7] p-4 sm:p-5 shadow-soft"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.02 }}
                    >
                      <div className="relative overflow-hidden rounded-[20px] h-36 sm:h-40">
                        <img src={item.image} alt={`${item.title} data services`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-castleton/55 to-transparent" />
                        <div className="absolute left-3 bottom-3 w-12 h-12 rounded-xl bg-white border border-castleton/15 flex items-center justify-center">
                          {modalityIcon(item.title)}
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-[2rem] leading-[1.02] font-medium text-black mt-4 mb-2">{item.title}</h3>
                      <p className="text-black text-[1.05rem] leading-[1.4]">{item.details}</p>
                      <span className="block w-12 h-1 rounded-full bg-saffron mt-4" />
                    </motion.article>
                  ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/g_JvAVL0WY4?start=1"
                    title="Lifewood AI Data Services Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.div
                id="ai-solutions"
                className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.div
                  className="absolute left-8 top-8 w-28 h-28 rounded-full bg-castleton/10 blur-2xl pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-10 bottom-12 w-32 h-32 rounded-full bg-saffron/20 blur-2xl pointer-events-none"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="text-center mb-8">
                  <p className="text-base sm:text-lg text-black mb-4 inline-flex items-center gap-2.5">
                    <Sparkles className="w-[18px] h-[18px] text-castleton" />
                    <span>Why brands trust us</span>
                  </p>
                  <h2 className="text-4xl sm:text-6xl leading-[1.02] font-medium text-black">
                    Comprehensive
                    <br />
                    Data Solutions
                  </h2>
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-3 mt-6 text-lg sm:text-xl text-black hover:text-castleton transition-colors"
                  >
                    <span>Get started</span>
                    <span className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {aiServiceCapabilities.slice(0, 3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 min-h-[260px] interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.26 + index * 0.05 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl sm:text-4xl font-medium mb-5 text-black">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                  {aiServiceCapabilities.slice(3).map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="group bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.06 }}
                      whileHover={{ y: -6, scale: 1.01 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl h-36 mb-5 border border-castleton/15">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                      </div>
                      <motion.span
                        className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4"
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 + index * 0.15 }}
                      >
                        {capabilityIcon(item.title)}
                      </motion.span>
                      <h3 className="text-3xl font-medium mb-4">{item.title}</h3>
                      <p className="text-black text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
                <p className="mt-8 text-lg text-black font-medium">
                  We provide global Data Engineering Services to enable AI Solutions.
                </p>
              </motion.div>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/careers' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="careers-overview"
                className="rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[220px]">
                  <motion.div
                    className="lg:col-span-5"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.06 }}
                  >
                    <h1 className="text-6xl sm:text-7xl lg:text-[78px] tracking-[-0.03em] leading-[0.92] font-semibold text-black">
                      Careers in
                      <br />
                      Lifewood
                    </h1>
                    <motion.button
                      type="button"
                      onClick={() => goToPath('/application-form')}
                      className="focus-brand mt-8 inline-flex items-center rounded-full overflow-hidden border border-saffron bg-saffron text-black font-semibold"
                      whileHover={{ y: -2, boxShadow: '0 12px 24px -14px rgba(244,179,71,0.9)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="px-5 py-3 text-base">Join Us</span>
                      <span className="px-4 py-3 border-l border-black/15">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="lg:col-span-7 lg:pl-8"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                  >
                    <p className="text-2xl sm:text-3xl leading-relaxed text-black/90 max-w-3xl">
                      Innovation, adaptability and the rapid development of new services separates companies that constantly
                      deliver at the highest level from their competitors.
                    </p>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="careers-image"
                className="rounded-[38px] overflow-hidden border border-castleton/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=80"
                  alt="Lifewood careers team collaboration"
                  className="w-full h-[300px] sm:h-[430px] lg:h-[560px] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.45 }}
                />
              </motion.section>

              <motion.section
                id="careers-growth"
                className="p-5 sm:p-7 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.38 }}
              >
                <p className="text-castleton uppercase tracking-[0.14em] text-sm sm:text-base font-medium">
                  Career Culture
                </p>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.95] font-semibold text-serpent max-w-5xl mx-auto">
                  It means motivating
                  <br />
                  and growing teams
                </h2>
                <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-black max-w-4xl mx-auto">
                  Teams that can initiate and learn on the run in order to deliver evolving technologies and targets. It&apos;s a
                  big challenge, but innovation, especially across borders, has never been the easy path.
                </p>
                <motion.div
                  className="careers-slot-reel mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="careers-slot-grid">
                    {careersSlotColumns.map((column, colIndex) => (
                      <div key={`slot-col-${colIndex}`} className="careers-slot-column">
                        <div
                          className={`careers-slot-track ${colIndex === 1 ? 'careers-slot-track-reverse' : ''}`}
                          style={{
                            '--slot-speed': column.speed,
                            '--slot-delay': `${colIndex * -1.8}s`,
                          }}
                        >
                          {[...column.chips, ...column.chips].map((chip, itemIndex) => (
                            <span key={`slot-${colIndex}-${chip}-${itemIndex}`} className="careers-slot-chip">
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.section>

              <motion.section
                id="careers-closing"
                className="p-6 sm:p-10 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-2xl sm:text-4xl leading-relaxed text-black max-w-6xl mx-auto">
                  If you&apos;re looking to turn the page on a new chapter in your career make contact with us today. At Lifewood,
                  the adventure is always before you, it&apos;s why we&apos;ve been described as{' '}
                  <span className="text-serpent">&quot;always on, never off.&quot;</span>
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-a-data-servicing' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-a-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type A - Data Servicing</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Data services built for scale and quality</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood provides Type A Data Servicing through end-to-end document scanning, AI-powered data extraction,
                  and structured database delivery. The workflow is designed for high-volume operations while maintaining
                  precision and consistency through quality assurance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">AI Data Extraction</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multi-language Support</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Scalable Operations</span>
                </div>
              </motion.div>

              <motion.section
                id="type-a-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeAUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <FolderTree className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-a-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type A- Data Servicing</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-${activeTypeAProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeAProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeAProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeAProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-${activeTypeAProcess.step}`}
                          src={activeTypeAProcess.image}
                          alt={`${activeTypeAProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type A process selectors">
                      {typeAProcess.map((item, index) => {
                        const isActive = activeTypeAProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeAProcess(index)}
                            onFocus={() => selectTypeAProcess(index)}
                            onClick={() => selectTypeAProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-b-horizontal-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-b-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type B - Horizontal LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Horizontal LLM data for broad model training</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Comprehensive AI data solutions that cover the entire spectrum from data collection and annotation to model
                  testing. Creating multimodal datasets for deep learning and large language models.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Cross-domain Coverage</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Multimodal Datasets</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">LLM Training Ready</span>
                </div>
              </motion.div>

              <motion.section
                id="type-b-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeBUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <Database className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-b-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type B: AI Data Project (Audio)</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-b-${activeTypeBProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeBProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeBProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeBProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-b-${activeTypeBProcess.step}`}
                          src={activeTypeBProcess.image}
                          alt={`${activeTypeBProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type B process selectors">
                      {typeBProcess.map((item, index) => {
                        const isActive = activeTypeBProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeBProcess(index)}
                            onFocus={() => selectTypeBProcess(index)}
                            onClick={() => selectTypeBProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-c-vertical-llm-data' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-c-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Type C - Vertical LLM Data</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Vertical LLM data for industry-specific AI</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  AI data solutions across specific industry verticals including autonomous driving data annotation,
                  in-vehicle data collection, and specialized data services for industry, enterprise, or private LLM.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Autonomous Driving</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">In-vehicle Data Collection</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise / Private LLM</span>
                </div>
              </motion.div>

              <motion.section
                id="type-c-examples"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeCUseCases.map((item, index) => (
                    <motion.article
                      key={item}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-9 interactive-card"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        {index === 0 ? <ShieldCheck className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                      </span>
                      <p className="text-black text-lg leading-relaxed">{item}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-c-process"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <h2 className="text-[38px] sm:text-[46px] leading-none font-semibold tracking-[-0.02em] uppercase mb-7">Type C- Vertical LLM Data</h2>
                <div className="type-a-folder-stack">
                  <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 sm:gap-6 items-stretch">
                    <AnimatePresence mode="wait">
                      <motion.article
                        key={`copy-c-${activeTypeCProcess.step}`}
                        className="type-a-folder-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                      >
                        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-castleton/80 mb-3">Workflow Stage</p>
                        <div className="type-a-heading-row">
                          <h3 className="type-a-heading-step">{activeTypeCProcess.step}</h3>
                          <h4 className="type-a-heading-title">{activeTypeCProcess.title}</h4>
                        </div>
                        <p className="type-a-heading-description">{activeTypeCProcess.details}</p>
                      </motion.article>
                    </AnimatePresence>

                    <div className="type-a-folder-image-shell rounded-3xl border border-castleton/20">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`image-c-${activeTypeCProcess.step}`}
                          src={activeTypeCProcess.image}
                          alt={`${activeTypeCProcess.title} visual`}
                          className="type-a-folder-main-image w-full h-full object-cover"
                          initial={{ opacity: 0.25, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0.2, scale: 1.03 }}
                          transition={{ duration: 0.24 }}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-serpent/38 via-transparent to-transparent" />
                    </div>
                  </div>

                  <div className="type-a-selector-shell">
                    <div className="type-a-selector-list" role="tablist" aria-label="Type C process selectors">
                      {typeCProcess.map((item, index) => {
                        const isActive = activeTypeCProcess.step === item.step
                        return (
                          <button
                            key={item.step}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onMouseEnter={() => selectTypeCProcess(index)}
                            onFocus={() => selectTypeCProcess(index)}
                            onClick={() => selectTypeCProcess(index)}
                            className={`focus-brand type-a-selector-item ${isActive ? 'type-a-selector-item-active' : ''}`}
                          >
                            <span className="type-a-selector-index">{item.step}</span>
                            <span className="type-a-selector-label">{item.title.toUpperCase()}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/philanthropy-impact' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="phil-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <motion.div
                  className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-castleton/10 blur-3xl"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Philanthropy and Impact</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Transforming Communities Worldwide</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We direct resources into education and developmental projects that create lasting change. Our approach goes
                  beyond giving: it builds sustainable growth and empowers communities for the future.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Purposeful Partnerships</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Sustainable Investment</motion.span>
                  <motion.span whileHover={{ y: -3 }} className="brand-pill px-4 py-2 text-sm font-medium">Lasting Transformation</motion.span>
                </div>
              </motion.div>

              <motion.section
                id="phil-map-impact"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="space-y-7 sm:space-y-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-serpent leading-[0.95]">
                      Transforming Communities
                      <br />
                      Worldwide
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
                    <motion.div
                      className="lg:col-span-4 h-[320px] sm:h-[430px] lg:h-[460px] rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-3 sm:p-4 flex flex-col"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.22 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-3 px-1">Pinned Regions</p>
                      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-1 pb-2">
                        {philanthropyMapOffices.map((office) => {
                          const isActive = selectedPhilanthropyOffice?.name === office.name
                          return (
                            <motion.button
                              key={`${office.name}-${office.lat}-${office.lon}`}
                              type="button"
                              onClick={() => setSelectedPhilanthropyOffice(office)}
                              whileHover={{ x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`focus-brand w-full text-left rounded-2xl border px-3 py-2.5 transition-colors ${
                                isActive
                                  ? 'bg-serpent text-white border-serpent'
                                  : 'bg-white text-black border-castleton/20 hover:border-castleton/40'
                              }`}
                            >
                              <p className="font-semibold leading-tight">{office.name}</p>
                              <p className={`text-xs ${isActive ? 'text-white/80' : 'text-black/70'}`}>{office.region}</p>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>

                    <motion.div
                      className="lg:col-span-8"
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Suspense fallback={<SectionFallback className="h-[320px] sm:h-[430px] lg:h-[460px]" />}>
                        <OfficesMap
                          offices={philanthropyMapOffices}
                          activeRegion="Africa and Indian sub-continent"
                          showMeta={false}
                          focusedOffice={selectedPhilanthropyOffice}
                          className="h-[320px] sm:h-[430px] lg:h-[460px]"
                        />
                      </Suspense>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
                    <div className="flex items-center gap-3 pt-2">
                      <span className="h-px w-10 bg-black/35" />
                      <p className="text-black/85 text-2xl sm:text-3xl font-medium">Impact</p>
                    </div>
                    <p className="text-black text-lg sm:text-2xl leading-relaxed lg:text-right">
                      Through purposeful partnerships and sustainable investment, we empower communities across Africa and
                      the Indian sub-continent to create lasting economic and social transformation.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="divide-y divide-castleton/15 border-y border-castleton/15">
                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28 }}
                    onMouseEnter={() => setOpenPhilImpactRow('partnership')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'partnership' ? null : 'partnership'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'partnership' ? 0 : 1,
                        scale: openPhilImpactRow === 'partnership' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'partnership' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Partnership</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'partnership' ? 1 : 0, y: openPhilImpactRow === 'partnership' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'partnership' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Partnership</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        In partnership with our philanthropic partners, Lifewood has expanded operations in South Africa, Nigeria,
                        Republic of the Congo, Democratic Republic of the Congo, Ghana, Madagascar, Benin, Uganda, Kenya, Ivory
                        Coast, Egypt, Ethiopia, Niger, Tanzania, Namibia, Zambia, Zimbabwe, Liberia, Sierra Leone, and Bangladesh.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                          alt="Community partnership session"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.04 }}
                    onMouseEnter={() => setOpenPhilImpactRow('application')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'application' ? null : 'application'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'application' ? 0 : 1,
                        scale: openPhilImpactRow === 'application' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'application' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Application</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'application' ? 1 : 0, y: openPhilImpactRow === 'application' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'application' ? 'auto' : 'none' }}
                    >
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80"
                          alt="Application in under-resourced economies"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        This requires the application of our methods and experience for the development of people in under
                        resourced economies.
                      </p>
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black lg:text-right">Application</h3>
                    </motion.div>
                  </motion.article>

                  <motion.article
                    className="relative py-4 sm:py-5 min-h-[190px] sm:min-h-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.28, delay: 0.08 }}
                    onMouseEnter={() => setOpenPhilImpactRow('expanding')}
                    onMouseLeave={() => setOpenPhilImpactRow(null)}
                    onClick={() => setOpenPhilImpactRow((value) => (value === 'expanding' ? null : 'expanding'))}
                  >
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        opacity: openPhilImpactRow === 'expanding' ? 0 : 1,
                        scale: openPhilImpactRow === 'expanding' ? 0.97 : 1,
                        filter: openPhilImpactRow === 'expanding' ? 'blur(4px)' : 'blur(0px)',
                      }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                    >
                      <h3 className="text-4xl sm:text-6xl font-semibold text-black text-center">Expanding</h3>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-center"
                      animate={{ opacity: openPhilImpactRow === 'expanding' ? 1 : 0, y: openPhilImpactRow === 'expanding' ? 0 : 10 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                      style={{ pointerEvents: openPhilImpactRow === 'expanding' ? 'auto' : 'none' }}
                    >
                      <h3 className="lg:col-span-3 text-3xl sm:text-4xl font-semibold text-black">Expanding</h3>
                      <p className="lg:col-span-4 text-black/75 text-base sm:text-lg leading-relaxed">
                        We are expanding access to training, establishing equiatable wage structures and career and leadership
                        progression to create sustainable change, by equipping individuals to take the lead and grow the business
                        for themselves for the long term benefit of everyone.
                      </p>
                      <motion.div className="lg:col-span-5 overflow-hidden rounded-2xl border border-castleton/20" whileHover={{ y: -4 }}>
                        <motion.img
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80"
                          alt="Expanding development outcomes"
                          className="h-[180px] sm:h-[210px] w-full object-cover"
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                  </motion.div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="phil-impact-statement"
                className="rounded-3xl p-8 sm:p-10 text-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.14 }}
              >
                <p className="text-black text-3xl sm:text-5xl font-medium leading-tight">
                  Working with new
                  <br />
                  intelligence for a better world.
                </p>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/type-d-aigc' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="type-d-overview"
                className="p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-16 -right-12 w-64 h-64 rounded-full bg-castleton/10 blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Generated Content (AIGC)</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">
                  Cinematic brand content powered by AI
                </h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Lifewood&apos;s early adoption of AI tools has seen the company rapidly evolve the use of AI generated content,
                  integrated into video production for communication requirements. These text, voice, image, and video skills
                  that comprise AIGC production, combined with traditional production methods and story development, are now
                  being sought by other companies.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Text, Voice, Image, Video</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Story Development</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Brand Communications</span>
                </div>
              </motion.div>

              <motion.section
                id="type-d-cinematic-scene"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.02 }}
              >
                <article className="overflow-hidden">
                  <video
                    className="w-full h-[280px] sm:h-[380px] object-cover"
                    src={typeDCinematicVideo.src}
                    poster={typeDCinematicVideo.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="p-5 sm:p-7">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Scene</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2">High-impact visual storytelling for brand communication</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      We blend film direction, AI generation, and editing craft to create standout visual scenes for campaigns, social assets, and enterprise content.
                    </p>
                  </div>
                </article>
              </motion.section>

              <motion.section
                id="type-d-cinematic-frames"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                <div className="mb-5 sm:mb-6">
                  <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">AI Cinematic Frames</p>
                  <h3 className="text-2xl sm:text-3xl font-semibold">Generated scenes with human-led direction</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCinematicFrames.map((frame, index) => (
                    <motion.article
                      key={frame.title}
                      className="group overflow-hidden rounded-3xl"
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.35, delay: 0.08 + index * 0.07 }}
                      animate={{ y: [0, -8, 0] }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      style={{ willChange: 'transform' }}
                    >
                      <div className="relative overflow-hidden rounded-3xl border border-castleton/20">
                        <motion.img
                          src={frame.image}
                          alt={frame.title}
                          className="w-full h-[220px] sm:h-[260px] object-cover"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{ duration: 12 + index * 1.2, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-serpent/50 via-transparent to-transparent" />
                        <div className="absolute left-4 bottom-4">
                          <p className="text-white text-sm uppercase tracking-[0.1em] opacity-90">Frame {index + 1}</p>
                          <h4 className="text-white text-xl font-semibold">{frame.title}</h4>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="type-d-visuals"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {typeDVisuals.slice(1).map((item) => (
                    <article key={item.title} className="overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-[220px] sm:h-[260px] object-cover" />
                      <div className="p-4 sm:p-5">
                        <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">AIGC Module</p>
                        <h3 className="text-xl sm:text-2xl font-medium">{item.title}</h3>
                      </div>
                    </article>
                  ))}
                  <div className="p-5 sm:p-7 flex flex-col justify-center">
                    <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">Creative Stack</p>
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-3">From concept to final cut</h3>
                    <p className="text-black text-base sm:text-lg leading-relaxed">
                      AIGC production at Lifewood combines ideation, generation, compositing, editing, and localization into a single delivery flow.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="type-d-approach"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Our Approach</h2>
                <p className="text-black text-lg leading-relaxed max-w-5xl mb-6">
                  Our motivation is to express the personality of your brand in a compelling and distinctive way. We use
                  advanced film, video, and editing techniques combined with generative AI to create cinematic worlds for videos,
                  advertisements, and corporate communications.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {typeDCapabilities.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <motion.article
                        key={item.title}
                        className="bg-[#f3f3f3] text-black rounded-3xl p-7 sm:p-8 interactive-card border border-castleton/15"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                      >
                        <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    )
                  })}
                </div>
              </motion.section>

              <motion.section
                id="type-d-impact"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {typeDStats.map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="rounded-3xl p-6 sm:p-8"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.06 }}
                    >
                      <p className="text-castleton text-sm uppercase tracking-[0.12em] mb-2">{item.label}</p>
                      <p className="text-black text-3xl sm:text-4xl font-semibold">{item.value}</p>
                    </motion.article>
                  ))}
                </div>

                <motion.article
                  className="bg-gradient-to-r from-serpent to-castleton rounded-3xl p-6 sm:p-8 mb-6"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.16 }}
                >
                  <p className="text-white/90 text-sm uppercase tracking-[0.12em] mb-2">Localization at Speed</p>
                  <h3 className="text-white text-2xl sm:text-3xl font-semibold mb-3">We can quickly adjust culture and language for world markets</h3>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">
                    Lifewood adapts tone, visual context, and language across regions while preserving your core brand message.
                  </p>
                </motion.article>

                <motion.article
                  className="rounded-3xl p-6 sm:p-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, delay: 0.2 }}
                >
                  <div className="flex items-start gap-3">
                    <Quote className="w-6 h-6 text-castleton mt-1" />
                    <p className="text-black text-lg sm:text-xl leading-relaxed">
                      We understand that your customers spend hours looking at screens: so finding the one, most important thing,
                      on which to build your message is integral to our approach, as we seek to deliver surprise and originality.
                    </p>
                  </div>
                  <p className="text-black/80 mt-4 text-sm sm:text-base">- Lifewood</p>
                </motion.article>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/ai-projects' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="ai-projects-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">AI Projects</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">AI projects in action</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  We are actively implementing numerous AI use cases across industries and regions, combining scalable delivery
                  operations with high-quality data engineering to support long-term model performance.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Production AI Programs</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Global Operations</span>
                  <span className="brand-pill px-4 py-2 text-sm font-medium">Enterprise Quality</span>
                </div>
                <div className="mt-7 w-full self-start">
                  <div className="w-full flex justify-start">
                    <button
                      type="button"
                      onClick={() => scrollToLocalAnchor('ai-contact')}
                      className="focus-brand group inline-flex items-center gap-2 rounded-full border border-serpent/30 bg-serpent px-3.5 py-1.5 text-xs font-bold text-white hover:bg-castleton transition-colors"
                    >
                      Contact Team
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.section
                id="ai-projects-focus"
                className="rounded-3xl p-4 sm:p-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <span className="inline-flex text-black/80 text-xs sm:text-sm font-semibold mb-3">
                    Projects
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-medium text-black">What we currently handle</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8 items-start">
                  <motion.div
                    key={aiProjectTracks[activeProjectIndex]?.image}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl overflow-hidden border border-castleton/15"
                  >
                    <img
                      src={aiProjectTracks[activeProjectIndex]?.image}
                      alt={aiProjectTracks[activeProjectIndex]?.title}
                      className="w-full h-[360px] sm:h-[440px] object-cover"
                    />
                  </motion.div>

                  <div>
                    <ul className="border-b border-black/15">
                      {aiProjectTracks.map((item, index) => {
                        const isActive = activeProjectIndex === index
                        return (
                          <li key={item.title} className="border-t border-black/15">
                            <button
                              type="button"
                              onClick={() => setActiveProjectIndex((prev) => (prev === index ? -1 : index))}
                              className="w-full flex items-center gap-3 py-4 text-left"
                            >
                              <span className="text-black/80">{projectListIcon(item.title)}</span>
                              <span className="text-black text-base sm:text-xl font-medium">{`2.${index + 1} ${item.title}`}</span>
                              <span className="ml-auto text-black/70 text-xl leading-none">{isActive ? <X className="w-4 h-4" /> : '+'}</span>
                            </button>
                            <AnimatePresence>
                              {isActive ? (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.24 }}
                                  className="overflow-hidden pb-4"
                                >
                                  <p className="text-black/80 text-sm sm:text-base leading-relaxed pl-7 pr-2 whitespace-pre-line">
                                    {item.details}
                                  </p>
                                </motion.div>
                          ) : null}
                            </AnimatePresence>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/contact-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="contact-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Contact us</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Let us build your AI data pipeline</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Reach Lifewood teams for AI data services, project scoping, and multi-region delivery support. We will
                  align the right workflow, quality model, and execution team for your requirements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <a href="mailto:hr.lifewood@gmail.com" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Team
                  </a>
                  <a href="tel:+15551234567" className="focus-brand brand-pill px-4 py-2 text-sm font-semibold inline-flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Us
                  </a>
                </div>
              </motion.div>

              <motion.section
                id="contact-details"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6 items-start">
                  <div className="space-y-4">
                    {contactChannels.map((channel, index) => {
                      const Icon = channel.icon
                      return (
                        <motion.a
                          key={channel.title}
                          href={channel.href}
                          className="block bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: 0.1 + index * 0.05 }}
                        >
                          <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-castleton text-white mb-4">
                            <Icon className="w-5 h-5" />
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{channel.title}</p>
                          <p className="text-black text-lg sm:text-xl font-semibold">{channel.value}</p>
                        </motion.a>
                      )
                    })}

                    <motion.div
                      className="bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: 0.28 }}
                    >
                      <div className="flex items-start gap-3">
                        <Clock3 className="w-5 h-5 text-castleton mt-0.5" />
                        <div>
                          <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">Response Time</p>
                          <p className="text-black text-base sm:text-lg">
                            Initial response within 1 business day for all inbound inquiries.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="self-start bg-[#f3f3f3] rounded-3xl p-6 sm:p-7 border border-castleton/15"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.26, delay: 0.16 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white">
                        <Send className="w-4 h-4" />
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-medium">Send inquiry</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input type="text" placeholder="Full name" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none" />
                      <input type="email" placeholder="Work email" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none" />
                    </div>
                    <input type="text" placeholder="Company name" className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none mb-3" />
                    <textarea placeholder="Tell us about your requirements..." rows={6} className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none resize-y mb-4" />
                    <a
                      href="mailto:hr.lifewood@gmail.com?subject=Inquiry%20from%20website"
                      className="focus-brand inline-flex items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors"
                    >
                      Submit Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.section>

              <motion.section
                id="contact-offices"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Global Presence</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {contactOffices.map((office, index) => (
                    <motion.article
                      key={office.city}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.16 + index * 0.05 }}
                    >
                      <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-castleton text-white mb-4">
                        <Building2 className="w-4 h-4" />
                      </span>
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-2">{office.region}</p>
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{office.city}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{office.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <a
                        href="mailto:hr.lifewood@gmail.com"
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </a>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/sign-in' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.section
                id="sign-in-form"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 items-stretch">
                  <motion.article
                    className="order-2 lg:order-1 lg:col-span-5 rounded-3xl bg-serpent text-white p-6 sm:p-9 border border-castleton/35 relative overflow-hidden"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div className="absolute -top-16 -right-8 w-48 h-48 rounded-full bg-castleton/40 blur-3xl" />
                    <div className="relative">
                      <p className="text-saffron text-xs uppercase tracking-[0.14em] mb-3">Account Access</p>
                      <h1 className="text-4xl sm:text-5xl font-semibold leading-[0.95] mb-4 text-[#e7edd8]">Sign in to Lifewood</h1>
                      <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                        Access your project workflows, communication channels, and global delivery workspace.
                      </p>
                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">Secure Access</p>
                          <p className="text-sm sm:text-base">Enterprise-grade sign-in for teams and clients.</p>
                        </div>
                        <div className="rounded-2xl border border-white/25 bg-white/10 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.12em] text-white/75 mb-1">New Here?</p>
                          <p className="text-sm sm:text-base">Create an account with your details, verify your email, then sign in.</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>

                  <motion.article
                    className={`order-1 lg:order-2 lg:col-span-7 relative ${
                      isSignUpOpen ? 'min-h-[580px] sm:min-h-[520px]' : 'min-h-[500px] sm:min-h-[460px]'
                    }`}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                    style={{ perspective: 1800 }}
                  >
                    <motion.div
                      className="relative h-full w-full"
                      animate={{ rotateY: isSignUpOpen ? 180 : 0 }}
                      transition={{ duration: 0.55, ease: 'easeInOut' }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div
                        className="absolute inset-0 rounded-3xl bg-[#f3f3f3] p-6 sm:p-8 border border-castleton/15 shadow-soft"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-1">Welcome back</h2>
                        <p className="text-black/70 text-sm sm:text-base mb-5">Use your work credentials to continue.</p>

                        <form onSubmit={handleSignIn} className="space-y-4">
                          <div>
                            <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Work Email</label>
                            <input
                              type="email"
                              placeholder="name@company.com"
                              value={signInEmail}
                              onChange={(event) => {
                                setSignInEmail(event.target.value)
                                if (signInError) setSignInError('')
                              }}
                              className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Password</label>
                            <div className="relative">
                              <input
                                type={isSignInPasswordVisible ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={signInPassword}
                                onChange={(event) => {
                                  setSignInPassword(event.target.value)
                                  if (signInError) setSignInError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 pr-20 text-black outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setIsSignInPasswordVisible((prev) => !prev)}
                                className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                              >
                                {isSignInPasswordVisible ? 'Hide' : 'Show'}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-sm">
                            <label className="inline-flex items-center gap-2 text-black/80">
                              <input type="checkbox" className="accent-[#046241]" />
                              Remember me
                            </label>
                            <button type="button" className="text-castleton hover:text-serpent font-semibold">
                              Forgot password?
                            </button>
                          </div>

                          {signInError ? (
                            <p className="text-sm text-[#b64b4b] bg-[#fde8e8] border border-[#efb6b6] rounded-xl px-3 py-2">
                              {signInError}
                            </p>
                          ) : null}

                          {!isSupabaseConfigured ? (
                            <p className="text-sm text-[#8a5a14] bg-[#fff5df] border border-[#f1d79d] rounded-xl px-3 py-2">
                              Supabase env vars are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
                            </p>
                          ) : null}

                          {signUpSuccess ? (
                            <p className="text-sm text-castleton bg-[#e9f3ee] border border-castleton/20 rounded-xl px-3 py-2">
                              {signUpSuccess}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isAuthLoading}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isAuthLoading ? 'Signing In...' : 'Sign In'}
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setIsSignUpOpen(true)
                              setSignUpError('')
                              setSignUpSuccess('')
                            }}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-castleton/25 bg-white px-5 py-2.5 text-serpent font-semibold hover:bg-[#eef3ef] transition-colors"
                          >
                            Sign Up
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          <p className="px-2 text-center text-sm leading-relaxed text-black/70 sm:px-0">
                            New users can register first, then return here to sign in.
                          </p>
                        </form>
                      </div>

                      <div
                        className="absolute inset-0 rounded-3xl bg-[#f3f3f3] p-6 sm:p-8 border border-castleton/15 shadow-soft"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-1">Create your account</h3>
                            <p className="text-black/70 text-sm sm:text-base">
                              Fill in your account details. Supabase will handle secure registration and email verification.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setIsSignUpOpen(false)
                              setSignUpError('')
                            }}
                            className="focus-brand inline-flex items-center gap-2 rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-semibold text-serpent hover:bg-[#eef3ef] transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                          </button>
                        </div>

                        <form onSubmit={handleEmailSignUp} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Full Name</label>
                              <input
                                type="text"
                                placeholder="Juan Dela Cruz"
                                value={signUpForm.fullName}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, fullName: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Email</label>
                              <input
                                type="email"
                                placeholder="name@company.com"
                                value={signUpForm.email}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, email: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Password</label>
                              <div className="relative">
                                <input
                                  type={isSignUpPasswordVisible ? 'text' : 'password'}
                                  placeholder="Minimum 8 characters"
                                  value={signUpForm.password}
                                  onChange={(event) => {
                                    setSignUpForm((prev) => ({ ...prev, password: event.target.value }))
                                    if (signUpError) setSignUpError('')
                                  }}
                                  className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 pr-20 text-black outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => setIsSignUpPasswordVisible((prev) => !prev)}
                                  className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                                >
                                  {isSignUpPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Confirm Password</label>
                              <div className="relative">
                                <input
                                  type={isSignUpConfirmPasswordVisible ? 'text' : 'password'}
                                  placeholder="Repeat your password"
                                  value={signUpForm.confirmPassword}
                                  onChange={(event) => {
                                    setSignUpForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                                    if (signUpError) setSignUpError('')
                                  }}
                                  className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 pr-20 text-black outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => setIsSignUpConfirmPasswordVisible((prev) => !prev)}
                                  className="focus-brand absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-castleton hover:text-serpent transition-colors"
                                >
                                  {isSignUpConfirmPasswordVisible ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Phone</label>
                              <input
                                type="tel"
                                placeholder="+63 9XX XXX XXXX"
                                value={signUpForm.phone}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, phone: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.12em] text-castleton mb-2">Department / Role</label>
                              <input
                                type="text"
                                placeholder="Operations, QA, Client Services"
                                value={signUpForm.department}
                                onChange={(event) => {
                                  setSignUpForm((prev) => ({ ...prev, department: event.target.value }))
                                  if (signUpError) setSignUpError('')
                                }}
                                className="focus-brand w-full rounded-2xl border border-castleton/20 bg-[#f8f8f8] px-4 py-3 text-black outline-none"
                              />
                            </div>
                          </div>

                          {signUpError ? (
                            <p className="text-sm text-[#b64b4b] bg-[#fde8e8] border border-[#efb6b6] rounded-xl px-3 py-2">
                              {signUpError}
                            </p>
                          ) : null}

                          {!isSupabaseConfigured ? (
                            <p className="text-sm text-[#8a5a14] bg-[#fff5df] border border-[#f1d79d] rounded-xl px-3 py-2">
                              Supabase env vars are missing. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`.
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isAuthLoading || !isSupabaseConfigured}
                            className="focus-brand w-full inline-flex justify-center items-center gap-2 rounded-full border border-serpent/25 bg-castleton px-5 py-2.5 text-white font-semibold hover:bg-serpent transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isAuthLoading ? 'Creating Account...' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  </motion.article>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Secure Login', value: 'Protected session and encrypted traffic.' },
                    { label: 'Global Teams', value: 'Single access point for distributed operations.' },
                    { label: 'Fast Support', value: 'Contact team available for account help.' },
                  ].map((item, index) => (
                    <motion.article
                      key={item.label}
                      className="bg-[#f3f3f3] rounded-2xl border border-castleton/15 p-4"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.22, delay: 0.08 + index * 0.04 }}
                    >
                      <p className="text-castleton text-xs uppercase tracking-[0.12em] mb-1">{item.label}</p>
                      <p className="text-black text-sm leading-relaxed">{item.value}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/admin-dashboard' ? (
            !isAuthReady ? (
              <section className="max-w-xl mx-auto">
                <div className="bg-[#f3f3f3] rounded-3xl border border-castleton/15 p-7 sm:p-9 text-center">
                  <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Checking Session</h1>
                  <p className="text-black/75 text-lg">
                    Verifying your Supabase session and admin access.
                  </p>
                </div>
              </section>
            ) : hasAdminAccess ? (
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
                  onCloseMobileNav={() => {
                    setIsAdminNavOpen(false)
                    setIsAdminNavPinned(false)
                  }}
                  onHoverNavToggle={() => {
                    if (!isAdminNavPinned) setIsAdminNavOpen(true)
                  }}
                  onToggleNav={() => {
                    if (isAdminNavOpen) {
                      setIsAdminNavOpen(false)
                      setIsAdminNavPinned(false)
                    } else {
                      setIsAdminNavOpen(true)
                      setIsAdminNavPinned(true)
                    }
                  }}
                  onOpenProfile={() => setIsAdminProfileModalOpen(true)}
                  onSelectTab={(tab, notice) => {
                    setActiveAdminTab(tab)
                    runAdminAction(notice)
                  }}
                  onSignOut={handleAdminSignOut}
                  activeAdminData={activeAdminData}
                  pendingApprovalsCount={pendingApprovalsCount}
                  pendingApplicationsCount={pendingApplicationsCount}
                  totalInterns={totalInterns}
                  averagePerformance={averagePerformance}
                  adminNotice={adminNotice}
                  isAdminDataLoading={isAdminDataLoading}
                  adminDataError={adminDataError}
                >
                  <AnimatePresence mode="wait">
                      <motion.div
                        key={activeAdminTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.24, ease: 'easeOut' }}
                      >
                      {activeAdminTab === 'Dashboard' ? (
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
                              onClick={() => runAdminAction('Today filter selected')}
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
                                  title: "Interns Present Today",
                                  value: String(presentInterns.length),
                                  detail: `${presentPercent}%`,
                                  accent: 'from-[#eefaf1] to-[#f7fff9]',
                                  percent: presentPercent,
                                  tone: 'bg-castleton',
                                  interns: presentInterns,
                                },
                                {
                                  title: "Interns on Leave",
                                  value: String(leaveInterns.length).padStart(2, '0'),
                                  detail: `${leavePercent}%`,
                                  accent: 'from-[#fff3f1] to-[#fff8f7]',
                                  percent: leavePercent,
                                  tone: 'bg-[#b64b4b]',
                                  interns: leaveInterns,
                                },
                                {
                                  title: "Interns Late Today",
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
                                  onClick={() => openDashboardGroup({ title: card.title, interns: card.interns })}
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
                                  onClick={() => setSelectedDashboardGroup(null)}
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
                                        onClick={() => setSelectedDashboardGroup(null)}
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
                                            <p className="mt-1 text-xs sm:text-sm text-black/65">
                                              {intern.email || 'No email'}
                                            </p>
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
                                <h3 className="text-3xl font-semibold text-black">Today&apos;s Attendance</h3>
                                <button
                                  type="button"
                                  onClick={() => runAdminAction('Attendance report opened')}
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
                                    onClick={() => runAdminAction(`Checked ${person.name} status`)}
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
                                    onClick={() => runAdminAction(`Leave details: ${person.name}`)}
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
                    ) : activeAdminTab === 'Analytics' ? (
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
                              onClick={openAnalyticsTaskModal}
                              className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-base font-semibold hover:bg-serpent transition-colors"
                            >
                              Add Task
                            </button>
                            <button
                              type="button"
                              onClick={() => runAdminAction('Analytics report exported')}
                              className="focus-brand rounded-full border border-castleton/20 bg-[#f3f5f4] px-4 py-2 text-base font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                            >
                              Export
                            </button>
                          </div>
                          <input
                            type="text"
                            ref={analyticsSearchRef}
                            value={analyticsSearch}
                            onChange={(event) => dashboardActionRegistry.setSearch('Analytics', event.target.value)}
                            placeholder="Search intern"
                            className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                          />
                          <select
                            value={analyticsSortBy}
                            onChange={(event) => setSortMode('Analytics', event.target.value)}
                            className="focus-brand rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-sm font-semibold text-castleton"
                          >
                            <option value="name-asc">Sort: Name A-Z</option>
                            <option value="name-desc">Sort: Name Z-A</option>
                            <option value="performance-desc">Sort: Performance</option>
                            <option value="attendance-desc">Sort: Attendance</option>
                            <option value="progress-desc">Sort: Progress</option>
                          </select>
                          <ViewModeToggle value={analyticsViewMode} onChange={(value) => dashboardActionRegistry.setView('Analytics', value)} />
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
                                  onClick={() => {
                                    openAnalyticsInternDetails(intern, 'analytics')
                                  }}
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
                                  onClick={() => {
                                    openAnalyticsInternDetails(intern, 'analytics')
                                  }}
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
                              onClick={() => setSelectedAnalyticsIntern(null)}
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
                                    onClick={() => setSelectedAnalyticsIntern(null)}
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
                              onClick={() => setIsAnalyticsTaskModalOpen(false)}
                            >
                              <motion.form
                                onSubmit={handleAnalyticsTaskSave}
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
                                    onClick={() => setIsAnalyticsTaskModalOpen(false)}
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
                                    onClick={() => setIsAnalyticsTaskModalOpen(false)}
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
                    ) : activeAdminTab === 'Evaluation' ? (
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
                              onChange={(event) => setSortMode('Evaluation', event.target.value)}
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
                              onChange={(event) => setEvaluationSearch(event.target.value)}
                              placeholder="Search intern"
                              className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                            />
                            <ViewModeToggle value={evaluationViewMode} onChange={(value) => dashboardActionRegistry.setView('Evaluation', value)} />
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
                                onClick={() => {
                                  openAnalyticsInternDetails(intern, 'evaluation')
                                }}
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
                                onClick={() => {
                                  openAnalyticsInternDetails(intern, 'evaluation')
                                }}
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
                              onClick={() => setSelectedAnalyticsIntern(null)}
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
                                            {selectedAnalyticsIntern.track || 'AI Data Operations'} | Mentor:{' '}
                                            {selectedAnalyticsIntern.mentor || 'Unassigned'}
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => setSelectedAnalyticsIntern(null)}
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
                    ) : activeAdminTab === 'Reports' ? (
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
                              onChange={(event) => setSortMode('Reports', event.target.value)}
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
                              onChange={(event) => dashboardActionRegistry.setSearch('Reports', event.target.value)}
                              placeholder="Search intern"
                              className="focus-brand min-w-[220px] rounded-full border border-castleton/20 bg-white px-4 py-2 text-sm font-medium text-black"
                            />
                            <ViewModeToggle value={reportsViewMode} onChange={(value) => dashboardActionRegistry.setView('Reports', value)} />
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
                                onClick={() => {
                                  openAnalyticsInternDetails(intern, 'report')
                                }}
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
                                onClick={() => {
                                  openAnalyticsInternDetails(intern, 'report')
                                }}
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
                              onClick={() => setSelectedAnalyticsIntern(null)}
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
                                    onClick={() => setSelectedAnalyticsIntern(null)}
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
                    ) : activeAdminTab === 'Applications' ? (
                      <div className="space-y-5 rounded-[28px] bg-[#f8faf7] p-4 sm:p-5 border border-castleton/10">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                            <div>
                              <h2 className="text-3xl sm:text-4xl font-semibold text-black mb-1">Career Applications</h2>
                              <p className="text-black/70 text-base sm:text-lg">
                                Review applicant details, open CVs, and record approval or rejection status.
                              </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={handleScoreAllPending}
                                disabled={isBatchScoring}
                                className="focus-brand rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-sm font-semibold text-castleton transition-colors hover:bg-[#eef3ef] disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isBatchScoring ? 'Scoring Pending...' : 'Score All Pending'}
                              </button>
                              {isBatchScoring ? (
                                <span className="text-xs text-black/60">
                                  {batchScoreProgress.done}/{batchScoreProgress.total} scored
                                </span>
                              ) : null}
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 min-w-[240px]">
                              {[
                                ['Pending', careerApplications.filter((item) => item.status === 'pending').length, 'bg-[#fff6e4] text-[#8a5a14]'],
                              [
                                'Proceeding to HR Interview',
                                careerApplications.filter((item) => isHrInterviewStatus(item.status)).length,
                                'bg-[#e9f3ee] text-castleton',
                              ],
                              ['Rejected', careerApplications.filter((item) => item.status === 'rejected').length, 'bg-[#fde8e8] text-[#8a3528]'],
                              ].map(([label, value, tone]) => (
                                <div key={label} className="rounded-2xl border border-castleton/15 bg-[#f7faf8] p-3">
                                  <p className="text-xs uppercase tracking-[0.12em] text-castleton">{label}</p>
                                  <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${tone}`}>{value}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_200px] mb-5">
                            <label className="flex items-center gap-3 rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3">
                              <Search size={18} className="text-castleton/60" />
                              <input
                                type="search"
                                ref={applicationSearchRef}
                                value={applicationSearch}
                                onChange={(event) => dashboardActionRegistry.setSearch('Applications', event.target.value)}
                                placeholder="Search name, email, position, status"
                                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
                              />
                            </label>
                            <label className="rounded-2xl border border-castleton/15 bg-[#f7faf8] px-4 py-3">
                              <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-castleton/70 mb-2">
                                Sort By
                              </span>
                              <select
                                value={applicationSortBy}
                                onChange={(event) => setSortMode('Applications', event.target.value)}
                                className="w-full bg-transparent text-sm text-black outline-none"
                              >
                                <option value="newest-first">Newest First</option>
                                <option value="oldest-first">Oldest First</option>
                                <option value="pending-first">Pending First</option>
                                <option value="approved-first">HR Interview First</option>
                                <option value="rejected-first">Rejected First</option>
                                <option value="name-asc">A-Z</option>
                              </select>
                            </label>
                            <div className="rounded-3xl border border-castleton/15 bg-white/80 px-2 py-2 flex items-center justify-between gap-2 shadow-sm">
                              <button
                                type="button"
                                onClick={() => dashboardActionRegistry.setView('Applications', 'cards')}
                                className={`flex-1 rounded-2xl px-3 py-2 text-sm font-semibold transition-colors ${
                                  applicationViewMode === 'cards'
                                    ? 'bg-castleton text-white'
                                    : 'text-castleton hover:bg-[#eef3ef]'
                                }`}
                              >
                                <span className="inline-flex items-center justify-center gap-2">
                                  <LayoutGrid className="h-4 w-4" />
                                  Card View
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => dashboardActionRegistry.setView('Applications', 'list')}
                                className={`flex-1 rounded-2xl px-3 py-2 text-sm font-semibold transition-colors ${
                                  applicationViewMode === 'list'
                                    ? 'bg-castleton text-white'
                                    : 'text-castleton hover:bg-[#eef3ef]'
                                }`}
                              >
                                <span className="inline-flex items-center justify-center gap-2">
                                  <AlignJustify className="h-4 w-4" />
                                  List View
                                </span>
                              </button>
                            </div>
                          </div>

                          {applicationFilterChips.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {applicationFilterChips.map((chip) => (
                                <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-castleton/15 bg-white px-3 py-1 text-xs font-semibold text-castleton">
                                  <Filter className="h-3 w-3" />
                                  {chip}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {applicationsError ? (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                              {applicationsError}
                            </div>
                          ) : null}
                        </motion.div>

                        <div className="space-y-4">
                          {paginatedApplications.length ? (
                            applicationViewMode === 'list' ? (
                              <div className="rounded-[22px] border border-castleton/15 bg-[#f8faf7] p-2 space-y-2">
                                <div className="hidden md:grid grid-cols-[1.2fr_1fr_0.8fr_0.6fr_320px] gap-3 px-4 py-2 text-xs uppercase tracking-[0.12em] text-black/50 rounded-2xl bg-white border border-castleton/10">
                                  <span>Applicant</span>
                                  <span>Position</span>
                                  <span>Status</span>
                                  <span>Score</span>
                                  <span>Action</span>
                                </div>
                                {paginatedApplications.map((application) => (
                                  <div key={application.id}>
                                    <div
                                      className={`md:hidden rounded-2xl border p-3 shadow-sm ${
                                        application.hireStatus === 'hired'
                                          ? 'bg-[#f3fbf6] border-emerald-200'
                                          : application.hireStatus === 'not_hired'
                                            ? 'bg-[#fff8f8] border-rose-200'
                                            : 'bg-white border-castleton/10'
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <p className="text-sm font-semibold text-black">
                                            <span className="inline-flex items-center gap-2">
                                              <span className="break-words">{application.firstName} {application.lastName}</span>
                                              {isApplicationUnreviewed(application) ? <UnreadPulseDot /> : null}
                                            </span>
                                          </p>
                                          <p className="mt-1 break-all text-xs text-black/60">{application.email}</p>
                                        </div>
                                        <div className="shrink-0">
                                          {application.cvScore !== null && application.cvScore !== undefined ? (
                                            <span
                                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                application.cvScore >= 85
                                                  ? 'bg-[#e9f3ee] text-castleton'
                                                  : application.cvScore >= 70
                                                    ? 'bg-[#fff6e4] text-[#8a5a14]'
                                                    : 'bg-[#fde8e8] text-[#8a3528]'
                                              }`}
                                            >
                                              {application.cvScore}
                                            </span>
                                          ) : (
                                            <span className="text-sm font-semibold text-black">—</span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                        <div className="rounded-xl bg-[#f8faf9] px-3 py-2">
                                          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Position</p>
                                          <p className="mt-1 text-sm text-black/80 break-words">
                                            {(application.positions || []).join(', ') || 'Not specified'}
                                          </p>
                                        </div>
                                        <div className="rounded-xl bg-[#f8faf9] px-3 py-2">
                                          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Status</p>
                                          <span
                                            className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                              application.hireStatus === 'hired'
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : application.hireStatus === 'not_hired'
                                                  ? 'bg-rose-50 text-rose-700'
                                                  : isHrInterviewStatus(application.status)
                                                    ? 'bg-[#e9f3ee] text-castleton'
                                                    : application.status === 'rejected'
                                                      ? 'bg-[#fde8e8] text-[#8a3528]'
                                                      : 'bg-[#fff6e4] text-[#8a5a14]'
                                            }`}
                                          >
                                            {application.hireStatus === 'hired' ? (
                                              <CheckCircle2 className="h-3.5 w-3.5" />
                                            ) : application.hireStatus === 'not_hired' ? (
                                              <XCircle className="h-3.5 w-3.5" />
                                            ) : isHrInterviewStatus(application.status) ? (
                                              <CheckCircle2 className="h-3.5 w-3.5" />
                                            ) : application.status === 'rejected' ? (
                                              <XCircle className="h-3.5 w-3.5" />
                                            ) : (
                                              <Clock3 className="h-3.5 w-3.5" />
                                            )}
                                            {applicationDisplayStatusLabel(application)}
                                          </span>
                                        </div>
                                      </div>

                                      {isHrInterviewStatus(application.status) && application.hireStatus !== 'hired' ? (
                                        <p className="mt-3 text-xs text-black/60 break-words">{formatInterviewSchedule(application)}</p>
                                      ) : null}

                                      <div className="mt-3 flex flex-col gap-2">
                                        {!isFinalHireDecision(application) && isHrInterviewStatus(application.status) ? (
                                          <button
                                            type="button"
                                            onClick={() => openInterviewScheduleModal(application)}
                                            className="focus-brand w-full rounded-full border border-castleton/20 bg-[#f4f7f5] px-3 py-2 text-center text-xs font-semibold text-castleton transition-colors hover:bg-[#e7efe9]"
                                          >
                                            {application.interviewScheduledAt ? 'Reschedule Interview' : 'Schedule Interview'}
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) ? (
                                          <button
                                            type="button"
                                            onClick={() => openApplicationDetails(application)}
                                            className="focus-brand w-full rounded-full border border-castleton/20 bg-white px-3 py-2 text-center text-xs font-semibold text-castleton transition-colors hover:bg-[#eef3ef]"
                                          >
                                            Review
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) && canSetHireStatus(application) ? (
                                          <div className="grid grid-cols-2 gap-2">
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'hired')}
                                              disabled={application.hireStatus === 'hired'}
                                              className="focus-brand w-full rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-center text-xs font-semibold text-emerald-700 transition-colors enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Hired
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'not_hired')}
                                              disabled={application.hireStatus === 'not_hired'}
                                              className="focus-brand w-full rounded-full border border-rose-200 bg-rose-50 px-3 py-2 text-center text-xs font-semibold text-rose-700 transition-colors enabled:hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Not Hired
                                            </button>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>

                                    <div
                                      className={`hidden md:grid grid-cols-[1.2fr_1fr_0.8fr_0.6fr_320px] gap-3 px-4 py-3 rounded-2xl border shadow-sm ${
                                        application.hireStatus === 'hired'
                                          ? 'bg-[#f3fbf6] border-emerald-200'
                                          : application.hireStatus === 'not_hired'
                                            ? 'bg-[#fff8f8] border-rose-200'
                                            : 'bg-white border-castleton/10'
                                      }`}
                                    >
                                      <div>
                                        <p className="text-sm font-semibold text-black">
                                          <span className="inline-flex items-center gap-2">
                                            {application.firstName} {application.lastName}
                                            {isApplicationUnreviewed(application) ? <UnreadPulseDot /> : null}
                                          </span>
                                        </p>
                                        <p className="text-xs text-black/60">{application.email}</p>
                                      </div>
                                      <div className="text-sm text-black/80">
                                        {(application.positions || []).join(', ') || 'Not specified'}
                                      </div>
                                      <div>
                                        <span
                                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                                            application.hireStatus === 'hired'
                                              ? 'bg-emerald-50 text-emerald-700'
                                              : application.hireStatus === 'not_hired'
                                                ? 'bg-rose-50 text-rose-700'
                                                : isHrInterviewStatus(application.status)
                                                  ? 'bg-[#e9f3ee] text-castleton'
                                                  : application.status === 'rejected'
                                                    ? 'bg-[#fde8e8] text-[#8a3528]'
                                                    : 'bg-[#fff6e4] text-[#8a5a14]'
                                          }`}
                                        >
                                          {application.hireStatus === 'hired' ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : application.hireStatus === 'not_hired' ? (
                                            <XCircle className="h-3.5 w-3.5" />
                                          ) : isHrInterviewStatus(application.status) ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : application.status === 'rejected' ? (
                                            <XCircle className="h-3.5 w-3.5" />
                                          ) : (
                                            <Clock3 className="h-3.5 w-3.5" />
                                          )}
                                          {applicationDisplayStatusLabel(application)}
                                        </span>
                                        {isHrInterviewStatus(application.status) && application.hireStatus !== 'hired' ? (
                                          <p className="mt-2 text-xs text-black/60">{formatInterviewSchedule(application)}</p>
                                        ) : null}
                                      </div>
                                      <div className="text-sm font-semibold text-black">
                                        {application.cvScore !== null && application.cvScore !== undefined ? (
                                          <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                              application.cvScore >= 85
                                                ? 'bg-[#e9f3ee] text-castleton'
                                                : application.cvScore >= 70
                                                  ? 'bg-[#fff6e4] text-[#8a5a14]'
                                                  : 'bg-[#fde8e8] text-[#8a3528]'
                                            }`}
                                          >
                                            {application.cvScore}
                                          </span>
                                        ) : (
                                          '—'
                                        )}
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 items-start">
                                        {!isFinalHireDecision(application) && isHrInterviewStatus(application.status) ? (
                                          <button
                                            type="button"
                                            onClick={() => openInterviewScheduleModal(application)}
                                            className="focus-brand w-full rounded-full border border-castleton/20 bg-[#f4f7f5] px-3 py-1.5 text-center text-xs font-semibold text-castleton transition-colors hover:bg-[#e7efe9]"
                                          >
                                            {application.interviewScheduledAt ? 'Reschedule' : 'Schedule Interview'}
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) ? (
                                          <button
                                            type="button"
                                            onClick={() => openApplicationDetails(application)}
                                            className="focus-brand w-full rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-center text-xs font-semibold text-castleton transition-colors hover:bg-[#eef3ef]"
                                          >
                                            Review
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) && canSetHireStatus(application) ? (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'hired')}
                                              disabled={application.hireStatus === 'hired'}
                                              className="focus-brand w-full rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-center text-xs font-semibold text-emerald-700 transition-colors enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Hired
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'not_hired')}
                                              disabled={application.hireStatus === 'not_hired'}
                                              className="focus-brand w-full rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-center text-xs font-semibold text-rose-700 transition-colors enabled:hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Not Hired
                                            </button>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              paginatedApplications.map((application, index) => (
                                <motion.article
                                  key={application.id}
                                  className={`rounded-[18px] border bg-white p-3.5 transition-colors ${
                                    application.hireStatus === 'hired'
                                      ? 'border-emerald-200 bg-[#f3fbf6] shadow-[0_16px_40px_-30px_rgba(16,185,129,0.28)]'
                                      : application.hireStatus === 'not_hired'
                                        ? 'border-rose-200 bg-[#fff8f8] shadow-[0_16px_40px_-30px_rgba(244,63,94,0.18)]'
                                        : application.status === 'pending'
                                          ? 'border-[#e2c676] shadow-[0_16px_40px_-30px_rgba(138,90,20,0.45)]'
                                          : isHrInterviewStatus(application.status)
                                            ? 'border-castleton/20'
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
                                          <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Applicant</p>
                                          <h3 className="text-xl font-semibold text-black inline-flex items-center gap-2">
                                            <span>{application.firstName} {application.lastName}</span>
                                            {isApplicationUnreviewed(application) ? <UnreadPulseDot size="md" /> : null}
                                          </h3>
                                          <p className="text-sm text-black/65 mt-1">{application.email}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="text-xs uppercase tracking-[0.12em] text-black/45 mb-2">Submitted</p>
                                          <p className="text-sm text-black/65">{new Date(application.createdAt).toLocaleString()}</p>
                                        </div>
                                      </div>

                                      <div className="grid gap-2.5 sm:grid-cols-3">
                                        <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                                          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Phone</p>
                                          <p className="mt-1.5 text-sm font-medium text-black">
                                            {application.phoneCode} {application.phoneNumber}
                                          </p>
                                        </div>
                                        <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                                          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Position</p>
                                          <p className="mt-1.5 text-sm font-medium text-black">
                                            {(application.positions || []).join(', ') || 'Not specified'}
                                          </p>
                                        </div>
                                      <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                                        <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Status</p>
                                        <span
                                          className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold ${
                                            application.hireStatus === 'hired'
                                              ? 'bg-emerald-50 text-emerald-700'
                                              : application.hireStatus === 'not_hired'
                                                ? 'bg-rose-50 text-rose-700'
                                                : isHrInterviewStatus(application.status)
                                                  ? 'bg-[#e9f3ee] text-castleton'
                                                  : application.status === 'rejected'
                                                    ? 'bg-[#fde8e8] text-[#8a3528]'
                                                    : 'bg-[#fff6e4] text-[#8a5a14]'
                                          }`}
                                        >
                                          {application.hireStatus === 'hired' ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : application.hireStatus === 'not_hired' ? (
                                            <XCircle className="h-3.5 w-3.5" />
                                          ) : isHrInterviewStatus(application.status) ? (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                          ) : application.status === 'rejected' ? (
                                            <XCircle className="h-3.5 w-3.5" />
                                          ) : (
                                            <Clock3 className="h-3.5 w-3.5" />
                                          )}
                                          {applicationDisplayStatusLabel(application)}
                                        </span>
                                        <div className="mt-2">
                                          {application.cvScore !== null && application.cvScore !== undefined ? (
                                            <span
                                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                application.cvScore >= 85
                                                  ? 'bg-[#e9f3ee] text-castleton'
                                                  : application.cvScore >= 70
                                                    ? 'bg-[#fff6e4] text-[#8a5a14]'
                                                    : 'bg-[#fde8e8] text-[#8a3528]'
                                              }`}
                                            >
                                              Score: {application.cvScore}
                                            </span>
                                          ) : (
                                            <span className="text-sm text-black/60">Score: —</span>
                                          )}
                                        </div>
                                      </div>
                                      </div>
                                    </div>

                                    <div className="rounded-[16px] border border-castleton/12 bg-[#fbfcfb] p-3">
                                      <span
                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                                          application.hireStatus === 'hired'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : application.hireStatus === 'not_hired'
                                              ? 'bg-rose-50 text-rose-700'
                                              : isHrInterviewStatus(application.status)
                                                ? 'bg-[#e9f3ee] text-castleton'
                                                : application.status === 'rejected'
                                                  ? 'bg-[#fde8e8] text-[#8a3528]'
                                                  : 'bg-[#fff6e4] text-[#8a5a14]'
                                        }`}
                                      >
                                        {isFinalHireDecision(application)
                                          ? applicationDisplayStatusLabel(application)
                                          : application.status === 'pending'
                                            ? 'Needs Review'
                                            : `Status: ${applicationStatusLabel(application.status)}`}
                                      </span>
                                      <p className="mt-3 text-sm text-black/65">
                                        {application.reviewedAt
                                          ? `Reviewed ${new Date(application.reviewedAt).toLocaleString()}`
                                          : 'Awaiting admin review'}
                                      </p>
                                      {isHrInterviewStatus(application.status) && application.hireStatus !== 'hired' ? (
                                        <p className="mt-2 text-sm text-black/65">{formatInterviewSchedule(application)}</p>
                                      ) : null}
                                      <textarea
                                        value={applicationNoteDrafts[application.id] ?? application.adminNote}
                                        onChange={(event) =>
                                          setApplicationNoteDrafts((prev) => ({ ...prev, [application.id]: event.target.value }))
                                        }
                                        placeholder="Add an internal note for this application"
                                        rows={4}
                                        className="focus-brand mt-3 w-full rounded-xl border border-castleton/20 bg-white px-3 py-2 text-black outline-none resize-y"
                                      />

                                      <div className="mt-3 flex flex-wrap gap-2">
                                        {!isFinalHireDecision(application) && isHrInterviewStatus(application.status) ? (
                                          <button
                                            type="button"
                                            onClick={() => openInterviewScheduleModal(application)}
                                            className="focus-brand rounded-full border border-castleton/20 bg-[#f4f7f5] px-4 py-2 text-sm font-semibold text-castleton transition-colors hover:bg-[#e7efe9]"
                                          >
                                            {application.interviewScheduledAt ? 'Reschedule Interview' : 'Schedule Interview'}
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) ? (
                                          <button
                                            type="button"
                                            onClick={() => openApplicationDetails(application)}
                                            className="focus-brand rounded-full border border-castleton/20 bg-castleton px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_-14px_rgba(4,98,65,0.7)] transition-colors hover:bg-serpent"
                                          >
                                            Review Applicant
                                          </button>
                                        ) : null}
                                        {!isFinalHireDecision(application) && canSetHireStatus(application) ? (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'hired')}
                                              disabled={application.hireStatus === 'hired'}
                                              className="focus-brand rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Hired
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleApplicationHireStatus(application.id, 'not_hired')}
                                              disabled={application.hireStatus === 'not_hired'}
                                              className="focus-brand rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors enabled:hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
                                            >
                                              Not Hired
                                            </button>
                                          </>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </motion.article>
                              ))
                            )
                          ) : (
                            <motion.article
                              className="rounded-[22px] border border-castleton/15 bg-white p-6"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.22 }}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f6f3] text-castleton">
                                  <FileText className="h-5 w-5" />
                                </span>
                                <div>
                                  <h3 className="text-xl font-semibold text-black">
                                    {careerApplications.length ? 'No matching applications' : 'No applications yet'}
                                  </h3>
                                  <p className="text-black/70 text-sm">
                                    {careerApplications.length
                                      ? 'Try a different search term or sort order.'
                                      : 'Applications submitted from the application form will appear here.'}
                                  </p>
                                </div>
                              </div>
                              <p className="text-black/60 text-sm">
                                Tip: Share the application form link to start collecting applicants.
                              </p>
                            </motion.article>
                          )}
                          {totalApplicationPages > 1 ? (
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-sm text-black/60">
                                Page {applicationPage} of {totalApplicationPages}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => dashboardActionRegistry.setPage('Applications', Math.max(1, applicationPage - 1))}
                                  disabled={applicationPage === 1}
                                  className="focus-brand rounded-full border border-castleton/15 bg-white px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-[#f4f7f5] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Previous
                                </button>
                                <button
                                  type="button"
                                  onClick={() => dashboardActionRegistry.setPage('Applications', Math.min(totalApplicationPages, applicationPage + 1))}
                                  disabled={applicationPage === totalApplicationPages}
                                  className="focus-brand rounded-full border border-castleton/15 bg-white px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-[#f4f7f5] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : activeAdminTab === 'Approvals' ? (
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
                                onChange={(event) => dashboardActionRegistry.setSearch('Approvals', event.target.value)}
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
                                onChange={(event) => dashboardActionRegistry.setSort('Approvals', event.target.value)}
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
                                      onChange={(event) =>
                                        setApprovalNoteDrafts((prev) => ({ ...prev, [request.id]: event.target.value }))
                                      }
                                      placeholder="Add an internal note for this request"
                                      rows={4}
                                      className="focus-brand mt-3 w-full rounded-xl border border-castleton/20 bg-white px-3 py-2 text-black outline-none resize-y"
                                    />

                                    <div className="mt-3 flex flex-wrap gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleSignupRequestDecision(request.id, 'rejected')}
                                        disabled={request.status !== 'pending'}
                                        className="focus-brand rounded-full border border-[#dcb7b0] bg-white px-4 py-2 text-sm font-semibold text-[#8a3528] transition-colors enabled:hover:bg-[#fde8e8] disabled:cursor-not-allowed disabled:opacity-45"
                                      >
                                        Reject
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleSignupRequestDecision(request.id, 'approved')}
                                        disabled={request.status !== 'pending'}
                                        className="focus-brand rounded-full border border-castleton/20 bg-castleton px-4 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-serpent disabled:cursor-not-allowed disabled:opacity-45"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSignupRequestDecision(
                                            request.id,
                                            request.status === 'suspended' ? 'approved' : 'suspended'
                                          )
                                        }
                                        disabled={!['approved', 'suspended'].includes(request.status)}
                                        className="focus-brand rounded-full border border-[#c8cfde] bg-white px-4 py-2 text-sm font-semibold text-[#44506b] transition-colors enabled:hover:bg-[#eef0f5] disabled:cursor-not-allowed disabled:opacity-45"
                                      >
                                        {request.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteSignupRequest(request.id)}
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
                    ) : activeAdminTab === 'Manage Interns' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="text-3xl sm:text-4xl font-semibold text-black">Intern Admin Settings</h2>
                          <p className="text-black/70 text-base sm:text-lg">
                            Profile-level management for intern records. Analytics metrics are system-generated and not directly editable here.
                          </p>
                        </motion.div>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4 items-stretch">
                          <motion.article
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <p className="text-xs uppercase tracking-[0.1em] text-castleton">Intern Intake</p>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-black mt-1">Add New Intern</h3>
                            <p className="text-black/70 mt-2 text-sm sm:text-base">
                              Use the guided stepper to create a new intern profile with complete assignment details.
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={openInternStepperForCreate}
                                className="focus-brand rounded-full bg-castleton text-white px-5 py-2.5 text-sm font-semibold hover:bg-serpent transition-colors"
                              >
                                Add Intern
                              </button>
                              {editingInternIndex !== null ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    resetInternForm()
                                    runAdminAction('Editing cancelled')
                                  }}
                                  className="focus-brand rounded-full border border-castleton/20 px-4 py-2.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                >
                                  Cancel Edit
                                </button>
                              ) : null}
                            </div>
                            <div className="mt-5 rounded-xl border border-castleton/15 bg-[#f7faf8] px-3 py-2.5">
                              <p className="text-xs text-black/70">
                                Tip: Use complete school and mentor details for cleaner Analytics, Evaluation, and Reports output.
                              </p>
                            </div>

                            <div className="mt-3 rounded-xl border border-castleton/15 bg-[#f7faf8] p-3">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">Recent Intern Entries</p>
                              <div className="space-y-2">
                                {settingsInternRows.slice(0, 4).map((intern) => (
                                  <div key={`recent-left-${intern.sourceIndex}-${intern.name}`} className="admin-name-card flex items-center justify-between gap-2 rounded-lg border border-castleton/10 bg-white px-2.5 py-2">
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-black truncate">{intern.name}</p>
                                      <p className="text-xs text-black/65 truncate">{intern.school || schoolOptions[0]}</p>
                                    </div>
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                      normalizeInternStatus(intern.status) === 'Active'
                                        ? 'bg-[#e9f3ee] text-castleton'
                                        : normalizeInternStatus(intern.status) === 'Complete'
                                          ? 'bg-[#fff2e3] text-[#b26b1f]'
                                          : normalizeInternStatus(intern.status) === 'Suspend'
                                            ? 'bg-[#fff0ed] text-[#9d4436]'
                                            : 'bg-[#eef2ff] text-[#3953a6]'
                                    }`}>
                                      {getInternStatusLabel(intern.status || 'Active')}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.article>

                          <motion.div
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full flex flex-col gap-3 shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: 0.03 }}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                ['Total Interns', internAnalyticsData.length],
                                ['Active', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Active').length],
                                ['Complete', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Complete').length],
                                ['Suspended', internAnalyticsData.filter((item) => normalizeInternStatus(item.status) === 'Suspend').length],
                              ].map(([label, value]) => (
                                <motion.div
                                  key={label}
                                  className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3"
                                  whileHover={{ y: -2, scale: 1.01 }}
                                  transition={{ duration: 0.16 }}
                                >
                                  <p className="text-xs uppercase tracking-[0.1em] text-castleton">{label}</p>
                                  <p className="text-xl font-semibold text-black">{value}</p>
                                </motion.div>
                          ))}
                            </div>
                            <p className="text-sm text-black/70 leading-relaxed">
                              Manage profile records and assignment ownership here. View analytics from the Analytics, Evaluation, and Reports tabs.
                            </p>

                            <div className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3 mt-auto">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">School Distribution</p>
                              <div className="space-y-2">
                                {schoolOptions.map((school) => {
                                  const count = internAnalyticsData.filter((item) => (item.school || schoolOptions[0]) === school).length
                                  const percent = totalInterns ? Math.round((count / totalInterns) * 100) : 0
                                  return (
                                    <motion.div key={`school-dist-${school}`} className="space-y-1" whileHover={{ x: 2 }} transition={{ duration: 0.14 }}>
                                      <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-black/80 truncate">{school}</p>
                                        <p className="text-xs font-semibold text-castleton">{count}</p>
                                      </div>
                                      <div className="h-1.5 rounded-full bg-[#dde5e0] overflow-hidden">
                                        <motion.div
                                          className="h-full bg-castleton"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percent}%` }}
                                          transition={{ duration: 0.45, ease: 'easeOut' }}
                                        />
                                      </div>
                                    </motion.div>
                          )
                                })}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="rounded-[22px] border border-castleton/15 bg-white p-4 sm:p-5">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <input
                              type="text"
                              ref={settingsSearchRef}
                              value={settingsSearch}
                              onChange={(event) => dashboardActionRegistry.setSearch('Manage Interns', event.target.value)}
                              placeholder="Search name, email, school, course, contact, or hours"
                              className="focus-brand min-w-[260px] flex-1 rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa]"
                            />
                            <select
                              value={settingsStatusFilter}
                              onChange={(event) => dashboardActionRegistry.setStatusFilter(event.target.value)}
                              className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa] font-medium text-castleton"
                            >
                              <option value="All">All Status</option>
                              <option value="Active">Active</option>
                              <option value="Complete">Complete</option>
                              <option value="Suspend">Suspend</option>
                            </select>
                          </div>
                          <div className="relative rounded-xl">
                            <div
                              ref={manageInternsTableScrollRef}
                              onScroll={() => syncManageInternsHorizontalScroll('table')}
                              className="w-full overflow-x-auto overflow-y-visible rounded-xl border border-castleton/10 hide-x-scrollbar"
                            >
                              <table className="manage-interns-table w-max min-w-full text-center">
                                <thead className="sticky top-0 z-10 bg-[#eef4f0]">
                                  <tr className="border-b border-castleton/15 text-black/75">
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Name</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Gender</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Email</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Contact</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Course</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">School/University</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Required Hours</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Track</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Status</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Mentor</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Joined</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paginatedSettingsInternRows.map((intern, index) => (
                                      <tr
                                        key={`settings-${intern.name}-${index}`}
                                        className={`border-b border-castleton/10 transition-colors ${
                                          index % 2 === 0 ? 'bg-white/45' : 'bg-castleton/[0.04]'
                                        } hover:bg-castleton/[0.08]`}
                                      >
                                        <td className="py-2 px-3 text-sm font-medium text-black whitespace-nowrap text-center">{intern.name}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.gender || '-'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.email}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.contact || '-'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.course || '-'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.school || schoolOptions[0]}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.requiredHours || '-'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.track || 'AI Data Operations'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{getInternStatusLabel(intern.status || 'Active')}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.mentor || 'Unassigned'}</td>
                                        <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{intern.joinDate || '-'}</td>
                                        <td className="py-2 px-3 whitespace-nowrap text-center">
                                          <div className="flex items-center justify-center gap-2">
                                            <button
                                              type="button"
                                              onClick={() => handleInternEdit(intern.sourceIndex)}
                                              className="focus-brand rounded-lg border border-castleton/20 px-2.5 py-1 text-xs font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                            >
                                              Edit
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleInternDelete(intern.sourceIndex)}
                                              className="focus-brand rounded-lg border border-[#c67c72]/40 px-2.5 py-1 text-xs font-semibold text-[#9d4436] hover:bg-[#c05345] hover:text-white transition-colors"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                ))}
                              </tbody>
                            </table>
                            </div>
                            <div
                              ref={manageInternsFollowScrollRef}
                              onScroll={() => syncManageInternsHorizontalScroll('top')}
                              className="admin-follow-x-scroll z-20 mt-2 w-full overflow-x-auto overflow-y-hidden rounded-full border border-castleton/20 bg-[#f3f7f4] px-1 py-0.5 shadow-[0_10px_26px_-18px_rgba(19,48,32,0.4)]"
                              aria-label="Manage interns horizontal scrollbar"
                            >
                              <div ref={manageInternsFollowTrackRef} className="h-3" />
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-black/70">
                              {settingsInternRows.length
                                ? `Showing ${(settingsPage - 1) * settingsPageSize + 1} - ${Math.min(settingsPage * settingsPageSize, settingsInternRows.length)} of ${settingsInternRows.length} interns`
                                : 'No interns found for current filters'}
                            </p>
                            <div className="flex items-center gap-2">
                              {settingsPageButtons.map((item, index) => (
                                item === '...'
                                  ? (
                                    <span key={`settings-page-ellipsis-${index}`} className="px-1 text-sm font-semibold text-black/45">
                                      ...
                                    </span>
                                  )
                                  : (
                                    <button
                                      key={`settings-page-${item}`}
                                      type="button"
                                      onClick={() => dashboardActionRegistry.setPage('Manage Interns', item)}
                                      className={`focus-brand rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                                        settingsPage === item
                                          ? 'border-castleton bg-castleton text-white'
                                          : 'border-castleton/20 text-castleton hover:bg-castleton hover:text-white'
                                      }`}
                                    >
                                      {item}
                                    </button>
                                  )
                              ))}
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isInternStepperOpen ? (
                            <motion.div
                              className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[5px] flex items-center justify-center p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => {
                                setInternStepperError('')
                                setIsInternStepperOpen(false)
                              }}
                            >
                              <motion.form
                                onSubmit={handleInternSave}
                                className="w-full max-w-3xl rounded-[26px] border border-castleton/20 bg-[linear-gradient(165deg,#f8fbf9,#edf5f1_65%,#e8f0ec)] p-5 sm:p-6 shadow-2xl"
                                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.22 }}
                                onClick={(event) => event.stopPropagation()}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-1">Manage Interns</p>
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                                      {editingInternIndex !== null ? 'Edit Intern Profile' : 'Add Intern Profile'}
                                    </h3>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setInternStepperError('')
                                      setIsInternStepperOpen(false)
                                    }}
                                    className="focus-brand inline-flex w-9 h-9 rounded-full items-center justify-center border border-castleton/20 text-castleton hover:bg-castleton hover:text-white transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="mt-5">
                                  <div className="relative px-1">
                                    <div className="h-[2px] w-full bg-castleton/15 rounded-full" />
                                    <motion.div
                                      className="absolute left-1 top-0 h-[2px] bg-castleton rounded-full"
                                      initial={{ width: '0%' }}
                                      animate={{ width: `${((internStepperStep - 1) / 2) * 100}%` }}
                                      transition={{ duration: 0.28, ease: 'easeOut' }}
                                    />
                                  </div>
                                  <div className="mt-3 grid grid-cols-3 gap-2">
                                    {[
                                      { step: 1, title: 'Basic Info', hint: 'Name and email' },
                                      { step: 2, title: 'Profile', hint: 'Gender, course, contact' },
                                      { step: 3, title: 'Review', hint: 'Hours, join date, submit' },
                                    ].map((item) => (
                                      <motion.button
                                        key={item.step}
                                        type="button"
                                        onClick={() => {
                                          if (item.step <= internStepperStep || validateInternStepperStep(internStepperStep)) {
                                            setInternStepperStep(item.step)
                                            setInternStepperError('')
                                          }
                                        }}
                                        className={`rounded-xl border px-2.5 py-2 text-left transition-all ${
                                          internStepperStep === item.step
                                            ? 'border-castleton bg-[#eaf4ef]'
                                            : item.step < internStepperStep
                                              ? 'border-castleton/25 bg-[#f3faf6]'
                                              : 'border-castleton/15 bg-white'
                                        }`}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span
                                            className={`inline-flex w-5 h-5 items-center justify-center rounded-full text-[11px] font-semibold ${
                                              internStepperStep === item.step
                                                ? 'bg-castleton text-white'
                                                : item.step < internStepperStep
                                                  ? 'bg-castleton/15 text-castleton'
                                                  : 'bg-castleton/10 text-black/70'
                                            }`}
                                          >
                                            {item.step}
                                          </span>
                                          <p className="text-sm font-semibold text-black truncate">{item.title}</p>
                                        </div>
                                        <p className="text-xs text-black/60 mt-1 truncate">{item.hint}</p>
                                      </motion.button>
                          ))}
                                  </div>
                                </div>

                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={`intern-step-${internStepperStep}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-5 rounded-2xl border border-castleton/15 bg-white/90 p-3.5 sm:p-4"
                                  >
                                    <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-3">
                                      {internStepperStep === 1
                                        ? 'Intern Identity'
                                        : internStepperStep === 2
                                          ? 'Assignment Details'
                                          : 'Final Review'}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {internStepperStep === 1 ? (
                                        <>
                                          <input
                                            type="text"
                                            placeholder="Intern name"
                                            value={internForm.name}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, name: event.target.value }))}
                                            onInput={() => setInternStepperError('')}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="email"
                                            placeholder="Intern email"
                                            value={internForm.email}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, email: event.target.value }))}
                                            onInput={() => setInternStepperError('')}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                        </>
                                      ) : null}

                                      {internStepperStep === 2 ? (
                                        <>
                                          <select
                                            value={internForm.gender}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, gender: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>Male</option>
                                            <option>Female</option>
                                          </select>
                                          <input
                                            type="text"
                                            placeholder="Course / educational background"
                                            value={internForm.course}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, course: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="text"
                                            placeholder="Contact number"
                                            value={internForm.contact}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, contact: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <select
                                            value={internForm.school}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, school: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            {schoolOptions.map((school) => (
                                              <option key={school} value={school}>
                                                {school}
                                              </option>
                                            ))}
                                          </select>
                                          <select
                                            value={internForm.track}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, track: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>AI Data Operations</option>
                                            <option>Quality Assurance</option>
                                            <option>Reporting & PMO</option>
                                            <option>Machine Learning Enablement</option>
                                          </select>
                                          <select
                                            value={internForm.status}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, status: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          >
                                            <option>Active</option>
                                            <option>Complete</option>
                                            <option>Suspend</option>
                                          </select>
                                          <input
                                            type="text"
                                            placeholder="Assigned mentor"
                                            value={internForm.mentor}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, mentor: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                        </>
                                      ) : null}

                                      {internStepperStep === 3 ? (
                                        <>
                                          <input
                                            type="number"
                                            min="1"
                                            placeholder="Required hours"
                                            value={internForm.requiredHours}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, requiredHours: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <input
                                            type="date"
                                            value={internForm.joinDate}
                                            onChange={(event) => setInternForm((prev) => ({ ...prev, joinDate: event.target.value }))}
                                            className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-white"
                                          />
                                          <div className="rounded-xl border border-castleton/15 bg-[#f9fbfa] px-3 py-2.5 text-sm text-black/80">
                                            <p>
                                              <span className="font-semibold">Name:</span> {internForm.name || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Email:</span> {internForm.email || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">School:</span> {internForm.school || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Gender:</span> {internForm.gender || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Course:</span> {internForm.course || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Contact:</span> {internForm.contact || '-'}
                                            </p>
                                            <p>
                                              <span className="font-semibold">Required Hours:</span> {internForm.requiredHours || '-'}
                                            </p>
                                          </div>
                                        </>
                                      ) : null}
                                    </div>
                                  </motion.div>
                                </AnimatePresence>

                                {internStepperError ? (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="mt-3 rounded-xl border border-[#c05345]/35 bg-[#fff3f1] px-3 py-2 text-sm font-medium text-[#9d4436]"
                                  >
                                    {internStepperError}
                                  </motion.div>
                          ) : null}

                                <div className="mt-6 flex flex-wrap justify-between gap-2">
                                  <motion.button
                                    type="button"
                                    onClick={() => setInternStepperStep((prev) => Math.max(1, prev - 1))}
                                    className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Back
                                  </motion.button>
                                  <div className="flex flex-wrap gap-2">
                                    <motion.button
                                      type="button"
                                      onClick={resetInternForm}
                                      className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                      whileHover={{ y: -1 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Reset
                                    </motion.button>
                                    {internStepperStep < 3 ? (
                                      <motion.button
                                        type="button"
                                        onClick={() => {
                                          if (validateInternStepperStep(internStepperStep)) {
                                            setInternStepperStep((prev) => Math.min(3, prev + 1))
                                          }
                                        }}
                                        className="focus-brand inline-flex items-center gap-1.5 rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                      </motion.button>
                          ) : (
                                      <motion.button
                                        type="submit"
                                        className="focus-brand rounded-full bg-castleton text-white px-4 py-2 text-sm font-semibold hover:bg-serpent transition-colors"
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        {editingInternIndex !== null ? 'Update Intern Profile' : 'Add Intern'}
                                      </motion.button>
                          )}
                                  </div>
                                </div>
                              </motion.form>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    ) : activeAdminTab === 'Manage Employee' ? (
                      <div className="space-y-5">
                        <motion.div
                          className="rounded-[24px] border border-castleton/20 bg-white p-5 sm:p-6"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <h2 className="text-3xl sm:text-4xl font-semibold text-black">Manage Employee</h2>
                          <p className="text-black/70 text-base sm:text-lg">
                            Hired applicants are synced here automatically from the Applicants tab. Review employee records using the same management flow.
                          </p>
                        </motion.div>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4 items-stretch">
                          <motion.article
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22 }}
                          >
                            <p className="text-xs uppercase tracking-[0.1em] text-castleton">Employee Sync</p>
                            <h3 className="text-2xl sm:text-3xl font-semibold text-black mt-1">Hired Applicant Records</h3>
                            <p className="text-black/70 mt-2 text-sm sm:text-base">
                              Every applicant marked as hired is copied into the employee roster with their application details.
                            </p>
                            <div className="mt-5 rounded-xl border border-castleton/15 bg-[#f7faf8] px-3 py-2.5">
                              <p className="text-xs text-black/70">
                                Tip: Use the Applicants tab to mark HR-ready candidates as Hired so they appear here automatically.
                              </p>
                            </div>

                            <div className="mt-3 rounded-xl border border-castleton/15 bg-[#f7faf8] p-3">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">Recent Hires</p>
                              <div className="space-y-2">
                                {hiredEmployees.slice(0, 4).map((employee) => (
                                  <div key={`recent-employee-${employee.id}`} className="admin-name-card flex items-center justify-between gap-2 rounded-lg border border-castleton/10 bg-white px-2.5 py-2">
                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-black truncate">{employee.firstName} {employee.lastName}</p>
                                      <p className="text-xs text-black/65 truncate">{employee.email}</p>
                                    </div>
                                    <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700">
                                      Hired
                                    </span>
                                  </div>
                                ))}
                                {!hiredEmployees.length ? (
                                  <p className="text-sm text-black/60">No hired employees synced yet.</p>
                                ) : null}
                              </div>
                            </div>
                          </motion.article>

                          <motion.div
                            className="rounded-[22px] border border-castleton/15 bg-[linear-gradient(180deg,#ffffff,#f6faf8)] p-4 sm:p-5 h-full flex flex-col gap-3 shadow-[0_18px_50px_-36px_rgba(19,48,32,0.5)]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: 0.03 }}
                          >
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                ['Total Employees', hiredEmployees.length],
                                ['PH Based', hiredEmployees.filter((item) => item.country === 'Philippines').length],
                                ['US Based', hiredEmployees.filter((item) => item.country === 'United States').length],
                                ['Recent 30 Days', hiredEmployees.filter((item) => item.hiredAt && Date.now() - new Date(item.hiredAt).getTime() <= 30 * 24 * 60 * 60 * 1000).length],
                              ].map(([label, value]) => (
                                <motion.div
                                  key={label}
                                  className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3"
                                  whileHover={{ y: -2, scale: 1.01 }}
                                  transition={{ duration: 0.16 }}
                                >
                                  <p className="text-xs uppercase tracking-[0.1em] text-castleton">{label}</p>
                                  <p className="text-xl font-semibold text-black">{value}</p>
                                </motion.div>
                              ))}
                            </div>
                            <p className="text-sm text-black/70 leading-relaxed">
                              This roster gives signed-in approved accounts a single view of people who have already moved from applicants into employees.
                            </p>

                            <div className="rounded-xl border border-castleton/15 bg-[#f7faf8] p-3 mt-auto">
                              <p className="text-xs uppercase tracking-[0.1em] text-castleton mb-2">Country Distribution</p>
                              <div className="space-y-2">
                                {employeeCountries.filter((country) => country !== 'All').slice(0, 5).map((country) => {
                                  const count = hiredEmployees.filter((item) => item.country === country).length
                                  const percent = hiredEmployees.length ? Math.round((count / hiredEmployees.length) * 100) : 0
                                  return (
                                    <motion.div key={`employee-country-${country}`} className="space-y-1" whileHover={{ x: 2 }} transition={{ duration: 0.14 }}>
                                      <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs text-black/80 truncate">{country}</p>
                                        <p className="text-xs font-semibold text-castleton">{count}</p>
                                      </div>
                                      <div className="h-1.5 rounded-full bg-[#dde5e0] overflow-hidden">
                                        <motion.div
                                          className="h-full bg-castleton"
                                          initial={{ width: 0 }}
                                          animate={{ width: `${percent}%` }}
                                          transition={{ duration: 0.45, ease: 'easeOut' }}
                                        />
                                      </div>
                                    </motion.div>
                                  )
                                })}
                                {!hiredEmployees.length ? <p className="text-sm text-black/60">No employee distribution data yet.</p> : null}
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        <div className="rounded-[22px] border border-castleton/15 bg-white p-4 sm:p-5">
                          <div className="flex flex-wrap gap-2 mb-4">
                            <input
                              type="text"
                              ref={employeeSearchRef}
                              value={employeeSearch}
                              onChange={(event) => dashboardActionRegistry.setSearch('Manage Employee', event.target.value)}
                              placeholder="Search name, email, country, position, or contact"
                              className="focus-brand min-w-[260px] flex-1 rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa]"
                            />
                            <select
                              value={employeeCountryFilter}
                              onChange={(event) => setEmployeeCountryFilter(event.target.value)}
                              className="focus-brand rounded-xl border border-castleton/20 px-3 py-2.5 bg-[#f9fbfa] font-medium text-castleton"
                            >
                              {employeeCountries.map((country) => (
                                <option key={country} value={country}>
                                  {country === 'All' ? 'All Countries' : country}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="relative rounded-xl">
                            <div
                              ref={employeeTableScrollRef}
                              onScroll={() => syncEmployeeHorizontalScroll('table')}
                              className="w-full overflow-x-auto overflow-y-visible rounded-xl border border-castleton/10 hide-x-scrollbar"
                            >
                              <table className="manage-interns-table w-max min-w-full text-center">
                                <thead className="sticky top-0 z-10 bg-[#eef4f0]">
                                  <tr className="border-b border-castleton/15 text-black/75">
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Name</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Email</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Contact</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Gender</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Age</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Country</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Position</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Hire Status</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Hired At</th>
                                    <th className="py-2 px-3 text-sm font-semibold whitespace-nowrap text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paginatedEmployeeRows.map((employee, index) => (
                                    <tr
                                      key={`employee-${employee.id}`}
                                      className={`border-b border-castleton/10 transition-colors ${
                                        index % 2 === 0 ? 'bg-white/45' : 'bg-castleton/[0.04]'
                                      } hover:bg-castleton/[0.08]`}
                                    >
                                      <td className="py-2 px-3 text-sm font-medium text-black whitespace-nowrap text-center">{employee.firstName} {employee.lastName}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{employee.email}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{`${employee.phoneCode} ${employee.phoneNumber}`.trim() || '-'}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{employee.gender || '-'}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{employee.age || '-'}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{employee.country || '-'}</td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">{(employee.positions || []).join(', ') || '-'}</td>
                                      <td className="py-2 px-3 whitespace-nowrap text-center">
                                        <span className="rounded-full px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700">
                                          {hireStatusLabel(employee.hireStatus)}
                                        </span>
                                      </td>
                                      <td className="py-2 px-3 text-sm text-black/80 whitespace-nowrap text-center">
                                        {employee.hiredAt ? new Date(employee.hiredAt).toLocaleDateString() : '-'}
                                      </td>
                                      <td className="py-2 px-3 whitespace-nowrap text-center">
                                        <div className="flex items-center justify-center gap-2">
                                          <button
                                            type="button"
                                            onClick={() => handleEmployeeEdit(employee)}
                                            className="focus-brand rounded-lg border border-castleton/20 px-2.5 py-1 text-xs font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleEmployeeDelete(employee)}
                                            className="focus-brand rounded-lg border border-[#c67c72]/40 px-2.5 py-1 text-xs font-semibold text-[#9d4436] hover:bg-[#c05345] hover:text-white transition-colors"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div
                              ref={employeeFollowScrollRef}
                              onScroll={() => syncEmployeeHorizontalScroll('top')}
                              className="admin-follow-x-scroll z-20 mt-2 w-full overflow-x-auto overflow-y-hidden rounded-full border border-castleton/20 bg-[#f3f7f4] px-1 py-0.5 shadow-[0_10px_26px_-18px_rgba(19,48,32,0.4)]"
                              aria-label="Manage employee horizontal scrollbar"
                            >
                              <div ref={employeeFollowTrackRef} className="h-3" />
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <p className="text-sm text-black/65">
                              {filteredEmployeeRows.length
                                ? `Showing ${(employeePage - 1) * employeePageSize + 1} - ${Math.min(employeePage * employeePageSize, filteredEmployeeRows.length)} of ${filteredEmployeeRows.length} employees`
                                : 'No employee records yet'}
                            </p>
                            {employeeTotalPages > 1 ? (
                              <div className="flex items-center gap-2">
                                {employeePageButtons.map((item, index) => (
                                  typeof item === 'string' ? (
                                    <span key={`employee-page-gap-${index}`} className="px-1 text-black/40">…</span>
                                  ) : (
                                    <button
                                      key={`employee-page-${item}`}
                                      type="button"
                                      onClick={() => dashboardActionRegistry.setPage('Manage Employee', item)}
                                      className={`focus-brand h-9 min-w-[36px] rounded-full border px-3 text-sm font-semibold transition-colors ${
                                        employeePage === item
                                          ? 'border-castleton bg-castleton text-white'
                                          : 'border-castleton/15 bg-white text-castleton hover:bg-[#f4f7f5]'
                                      }`}
                                    >
                                      {item}
                                    </button>
                                  )
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <motion.article
                          className="rounded-[24px] p-6 sm:p-8 border border-castleton/25 bg-[radial-gradient(circle_at_80%_20%,rgba(244,179,71,0.28),transparent_36%),linear-gradient(145deg,#0f5f44,#0b4e39_56%,#0a3f31)] text-[#f2f6ec] mb-5"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                        >
                          <p className="text-xs uppercase tracking-[0.12em] text-[#f7dba3] mb-3">{activeAdminData.status}</p>
                          <h2 className="text-4xl sm:text-5xl font-semibold leading-[0.96] mb-4">
                            {activeAdminData.titleA} <span className="text-saffron">{activeAdminData.titleB}</span>
                            <br />
                            {activeAdminData.titleC}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                            <button
                              type="button"
                              onClick={handleAdminPrimaryAction}
                              className="focus-brand rounded-full bg-saffron text-black font-semibold px-5 py-2.5 hover:brightness-95 transition"
                            >
                              Continue
                            </button>
                            <p className="text-[#f2f6ec]/80">{activeAdminData.module}</p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mt-7 max-w-xl">
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.completion}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Completion</p>
                            </div>
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.spent}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Spent</p>
                            </div>
                            <div>
                              <p className="text-4xl font-semibold">{activeAdminData.grade}</p>
                              <p className="text-xs text-[#f2f6ec]/70 uppercase tracking-[0.12em]">Avg Grade</p>
                            </div>
                          </div>
                        </motion.article>

                        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-4">
                          <motion.article
                            className="rounded-[22px] border border-castleton/20 bg-white p-5"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.04 }}
                          >
                            <p className="text-2xl font-semibold mb-1">Activity</p>
                            <p className="text-sm text-black/65 mb-4">Recent updates</p>
                            <div className="space-y-3">
                              {activeAdminData.activity.map((item) => (
                                <button
                                  key={item[1]}
                                  type="button"
                                  onClick={() => runAdminAction(`Opened: ${item[1]}`)}
                                  className="w-full text-left rounded-2xl border border-castleton/15 bg-[#f6f8f7] p-3 flex items-center gap-3 hover:border-castleton/35 hover:bg-white transition"
                                >
                                  <span className="inline-flex w-11 h-11 rounded-xl bg-saffron/25 text-black font-bold items-center justify-center">
                                    {item[0]}
                                  </span>
                                  <div>
                                    <p className="font-semibold">{item[1]}</p>
                                    <p className="text-sm text-black/65">{item[2]}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.article>

                          <div className="space-y-4">
                            <motion.article
                              className="rounded-[22px] border border-saffron/40 bg-saffron p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.08 }}
                            >
                              <p className="text-xs uppercase tracking-[0.12em] mb-2">Efficiency</p>
                              <p className="text-5xl font-semibold">{activeAdminData.efficiency}</p>
                            </motion.article>
                            <motion.article
                              className="rounded-[22px] border border-castleton/20 bg-castleton text-[#f2f6ec] p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.12 }}
                            >
                              <p className="text-xs uppercase tracking-[0.12em] text-[#f2f6ec]/75 mb-2">Level</p>
                              <p className="text-5xl font-semibold">{activeAdminData.level}</p>
                              <p className="text-sm text-[#f2f6ec]/75">{activeAdminData.levelLabel}</p>
                            </motion.article>
                            <motion.article
                              className="rounded-[22px] border border-castleton/20 bg-white p-5"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.16 }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-2xl font-semibold">Weekly Goals</p>
                                  <p className="text-sm text-black/70">{activeAdminData.weekly}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => runAdminAction('Weekly goals synced')}
                                  className="focus-brand rounded-full border border-castleton/20 px-3 py-1.5 text-sm font-semibold hover:bg-castleton hover:text-white transition-colors"
                                >
                                  Sync
                                </button>
                              </div>
                            </motion.article>
                          </div>
                        </div>
                      </>
                    )}
                      </motion.div>
                    </AnimatePresence>

                <AnimatePresence>
                  {isAdminProfileModalOpen ? (
                    <motion.div
                      className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsAdminProfileModalOpen(false)}
                    >
                      <motion.form
                        onSubmit={handleAdminProfileSave}
                        className="w-full max-w-2xl rounded-[28px] border border-castleton/25 bg-[linear-gradient(165deg,#0f5a3f,#0d4d38_52%,#0a3f31)] text-[#eef4e9] p-5 sm:p-7 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold">Edit Profile</h2>
                            <p className="text-sm text-white/75">Update your admin details</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsAdminProfileModalOpen(false)}
                            className="focus-brand inline-flex w-9 h-9 rounded-full items-center justify-center border border-white/30 text-white hover:bg-white/15 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={adminProfileForm.firstName}
                            onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, firstName: event.target.value }))}
                            placeholder="First name"
                            className="focus-brand rounded-xl border border-white/20 bg-[#0c3c2f]/65 px-3.5 py-2.5 text-white placeholder:text-white/45"
                          />
                          <input
                            type="text"
                            value={adminProfileForm.lastName}
                            onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, lastName: event.target.value }))}
                            placeholder="Last name"
                            className="focus-brand rounded-xl border border-white/20 bg-[#0c3c2f]/65 px-3.5 py-2.5 text-white placeholder:text-white/45"
                          />
                        </div>

                        <div className="mt-3 space-y-3">
                          <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/55" />
                            <input
                              type="email"
                              value={adminProfileForm.email}
                              onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, email: event.target.value }))}
                              placeholder="youname@gmail.com"
                              className="focus-brand w-full rounded-xl border border-white/20 bg-[#0c3c2f]/65 pl-9 pr-3.5 py-2.5 text-white placeholder:text-white/45"
                            />
                          </div>
                          <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/55" />
                            <input
                              type="text"
                              value={adminProfileForm.phone}
                              onChange={(event) => setAdminProfileForm((prev) => ({ ...prev, phone: event.target.value }))}
                              placeholder="+63 9XX XXX XXXX"
                              className="focus-brand w-full rounded-xl border border-white/20 bg-[#0c3c2f]/65 pl-9 pr-3.5 py-2.5 text-white placeholder:text-white/45"
                            />
                          </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end">
                          <button
                            type="submit"
                            className="focus-brand rounded-full bg-saffron text-black font-semibold px-5 py-2.5 hover:brightness-95 transition"
                          >
                            Save Changes
                          </button>
                        </div>
                      </motion.form>
                    </motion.div>
                          ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {confirmationDialog ? (
                    <motion.div
                      className="fixed inset-0 z-[110] bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={closeConfirmationDialog}
                    >
                      <motion.div
                        className="w-full max-w-md rounded-[26px] border border-castleton/20 bg-white p-5 sm:p-6 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-2">Confirm Action</p>
                            <h2 className="text-xl font-semibold text-black">Are you sure?</h2>
                          </div>
                          <button
                            type="button"
                            onClick={closeConfirmationDialog}
                            className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full border border-castleton/15 text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="mt-4 text-base leading-relaxed text-black/72">{confirmationDialog.message}</p>

                        <div className="mt-6 flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={closeConfirmationDialog}
                            className="focus-brand rounded-full border border-castleton/15 bg-white px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const action = confirmationDialog.onConfirm
                              closeConfirmationDialog()
                              if (action) void action()
                            }}
                            className={`focus-brand rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
                              confirmationDialog.tone === 'danger'
                                ? 'bg-[#9f3f33] hover:bg-[#8a3528]'
                                : confirmationDialog.tone === 'muted'
                                  ? 'bg-[#58647d] hover:bg-[#44506b]'
                                  : 'bg-castleton hover:bg-serpent'
                            }`}
                          >
                            {confirmationDialog.confirmLabel}
                          </button>
                        </div>
                      </motion.div>
                  </motion.div>
                          ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {isCvModalOpen ? (
                    <motion.div
                      className="fixed inset-0 z-[97] bg-black/60 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsCvModalOpen(false)}
                    >
                      <motion.div
                        className="w-full max-w-3xl rounded-[26px] border border-castleton/20 bg-white p-4 sm:p-5 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Applicant CV</p>
                            <h2 className="text-xl font-semibold text-black">{cvModalName}</h2>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsCvModalOpen(false)}
                            className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full border border-castleton/15 text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="w-full overflow-hidden rounded-2xl border border-castleton/15 bg-[#f7f7f7]" style={{ height: 'min(70vh, 780px)' }}>
                          {cvModalUrl ? (
                            <object data={cvModalUrl} type="application/pdf" className="h-full w-full">
                              <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-black/60">
                                <p>PDF preview not available.</p>
                                <a
                                  href={cvModalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="focus-brand rounded-full border border-castleton/20 bg-white px-3 py-1.5 text-sm font-semibold text-castleton hover:bg-[#eef3ef] transition-colors"
                                >
                                  Open in new tab
                                </a>
                              </div>
                            </object>
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-black/60">
                              Unable to load PDF preview.
                            </div>
                          )}
                        </div>
                      </motion.div>
                  </motion.div>
                  ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {isInterviewScheduleModalOpen ? (
                    <motion.div
                      className="fixed inset-0 z-[98] bg-black/60 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={closeInterviewScheduleModal}
                    >
                      <motion.form
                        onSubmit={handleInterviewScheduleSubmit}
                        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[28px] border border-castleton/20 bg-[linear-gradient(165deg,#f9fcfa,#eef5f1_65%,#e7efeb)] p-4 sm:p-6 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Interview Schedule</p>
                            <h2 className="text-lg sm:text-xl font-semibold text-black">Set HR interview details</h2>
                            <p className="mt-2 text-sm text-black/65">Choose a future interview slot and send the schedule in one step.</p>
                          </div>
                          <button
                            type="button"
                            onClick={closeInterviewScheduleModal}
                            className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full border border-castleton/15 text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-5 rounded-[24px] border border-castleton/15 bg-white/85 p-4 sm:p-5">
                          <div className="mb-4 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-[0.11em] text-castleton">Interview Slot</p>
                              <p className="mt-1 text-sm text-black/60">Past dates and times are blocked automatically.</p>
                            </div>
                            <span className="rounded-full bg-[#e8f1ec] px-3 py-1 text-xs font-semibold text-castleton">
                              {interviewScheduleForm.date && interviewScheduleForm.time ? `${interviewScheduleForm.date} • ${interviewScheduleForm.time}` : 'Pick a slot'}
                            </span>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <label className="grid gap-2">
                              <span className="text-sm font-semibold text-black">Interview date</span>
                              <input
                                type="date"
                                min={interviewScheduleMinDate}
                                value={interviewScheduleForm.date}
                                onChange={(event) => {
                                  const nextDate = event.target.value
                                  setInterviewScheduleError('')
                                  setInterviewScheduleForm((prev) => ({
                                    ...prev,
                                    date: nextDate,
                                    time:
                                      prev.time && buildInterviewTimeOptions(nextDate).some((option) => option.value === prev.time)
                                        ? prev.time
                                        : '',
                                  }))
                                }}
                                className="focus-brand rounded-2xl border border-castleton/30 bg-[#fcfefd] px-3.5 py-3 text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.35)] outline outline-1 outline-castleton/15"
                              />
                            </label>
                            <label className="grid gap-2">
                              <span className="text-sm font-semibold text-black">Interview time</span>
                              <select
                                value={interviewScheduleForm.time}
                                onChange={(event) => {
                                  setInterviewScheduleError('')
                                  setInterviewScheduleForm((prev) => ({ ...prev, time: event.target.value }))
                                }}
                                className="focus-brand rounded-2xl border border-castleton/30 bg-[#fcfefd] px-3.5 py-3 text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.35)] outline outline-1 outline-castleton/15"
                              >
                                <option value="">Select time</option>
                                {interviewTimeOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3">
                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-black">Interview mode</span>
                            <select
                              value={interviewScheduleForm.meetingType}
                              onChange={(event) => {
                                const meetingType = event.target.value
                                setInterviewScheduleError('')
                                setInterviewScheduleForm((prev) => ({
                                  ...prev,
                                  meetingType,
                                  location: meetingType === 'google-meet'
                                    ? prev.meetingLink || ''
                                    : defaultFaceToFaceInterviewLocation,
                                }))
                              }}
                              className="focus-brand rounded-2xl border border-castleton/25 bg-white px-3.5 py-3 text-black"
                            >
                              <option value="face-to-face">Face to Face</option>
                              <option value="google-meet">Google Meet</option>
                            </select>
                          </label>
                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-black">Timezone</span>
                            <input
                              type="text"
                              value={interviewScheduleForm.timezone}
                              onChange={(event) => {
                                setInterviewScheduleError('')
                                setInterviewScheduleForm((prev) => ({ ...prev, timezone: event.target.value }))
                              }}
                              placeholder="Asia/Taipei"
                              className="focus-brand rounded-2xl border border-castleton/25 bg-white px-3.5 py-3 text-black"
                            />
                          </label>
                          {interviewScheduleForm.meetingType === 'google-meet' ? (
                            <label className="grid gap-2">
                              <span className="text-sm font-semibold text-black">Google Meet link</span>
                              <input
                                type="url"
                                value={interviewScheduleForm.meetingLink}
                                onChange={(event) => {
                                  const meetingLink = event.target.value
                                  setInterviewScheduleError('')
                                  setInterviewScheduleForm((prev) => ({
                                    ...prev,
                                    meetingLink,
                                    location: meetingLink,
                                  }))
                                }}
                                placeholder="https://meet.google.com/..."
                                className="focus-brand rounded-2xl border border-castleton/25 bg-white px-3.5 py-3 text-black"
                              />
                            </label>
                          ) : (
                            <label className="grid gap-2">
                              <span className="text-sm font-semibold text-black">Face to face location</span>
                              <textarea
                                value={defaultFaceToFaceInterviewLocation}
                                readOnly
                                rows={3}
                                className="rounded-2xl border border-castleton/20 bg-[#f4f7f5] px-3.5 py-3 text-black/80 outline-none resize-none"
                              />
                            </label>
                          )}
                        </div>

                        {interviewScheduleError ? (
                          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {interviewScheduleError}
                          </div>
                        ) : null}

                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                          <button
                            type="button"
                            onClick={closeInterviewScheduleModal}
                            className="focus-brand w-full rounded-full border border-castleton/15 bg-white px-4 py-2 text-sm font-semibold text-castleton hover:bg-[#f4f7f5] transition-colors sm:w-auto"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-castleton/20 bg-castleton px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-serpent sm:w-auto"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Save Schedule and Email
                          </button>
                        </div>
                      </motion.form>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {isEmployeeModalOpen ? (
                    <motion.div
                      className="fixed inset-0 z-[99] bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={resetEmployeeForm}
                    >
                      <motion.form
                        onSubmit={handleEmployeeSave}
                        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] border border-castleton/20 bg-[linear-gradient(165deg,#f8fbf9,#edf5f1_65%,#e8f0ec)] p-5 sm:p-6 shadow-2xl"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="mb-5 flex items-start justify-between gap-3 sm:gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Manage Employee</p>
                            <h2 className="text-xl sm:text-3xl font-semibold text-black">Edit Employee Record</h2>
                            <p className="mt-2 text-sm text-black/65">Update the employee profile and role details from a single record.</p>
                          </div>
                          <button
                            type="button"
                            onClick={resetEmployeeForm}
                            className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full border border-castleton/15 text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-4 lg:gap-5">
                          <div className="rounded-[22px] border border-castleton/15 bg-white/90 p-4 sm:p-5">
                            <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-4">Employee Information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">First name</span>
                                <input
                                  type="text"
                                  placeholder="First name"
                                  value={employeeForm.firstName}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, firstName: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Last name</span>
                                <input
                                  type="text"
                                  placeholder="Last name"
                                  value={employeeForm.lastName}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, lastName: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block md:col-span-2">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Email address</span>
                                <input
                                  type="email"
                                  placeholder="name@company.com"
                                  value={employeeForm.email}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, email: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Country</span>
                                <input
                                  type="text"
                                  placeholder="Country"
                                  value={employeeForm.country}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, country: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Age</span>
                                <input
                                  type="number"
                                  min="0"
                                  placeholder="Age"
                                  value={employeeForm.age}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, age: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Phone code</span>
                                <input
                                  type="text"
                                  placeholder="+63"
                                  value={employeeForm.phoneCode}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, phoneCode: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Phone number</span>
                                <input
                                  type="text"
                                  placeholder="Phone number"
                                  value={employeeForm.phoneNumber}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, phoneNumber: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35"
                                />
                              </label>
                              <label className="block md:col-span-2">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Address</span>
                                <textarea
                                  placeholder="Office or home address"
                                  value={employeeForm.address}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, address: event.target.value }))}
                                  rows={4}
                                  className="focus-brand min-h-[132px] w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35 resize-y"
                                />
                              </label>
                            </div>
                          </div>

                          <div className="rounded-[22px] border border-castleton/15 bg-white/90 p-4 sm:p-5">
                            <p className="text-xs uppercase tracking-[0.11em] text-castleton mb-4">Role Details</p>
                            <div className="space-y-3">
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Gender</span>
                                <select
                                  value={employeeForm.gender}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, gender: event.target.value }))}
                                  className="focus-brand w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)]"
                                >
                                  <option value="">Select gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.08em] text-black/55">Assigned positions</span>
                                <textarea
                                  placeholder="Positions, separated by commas"
                                  value={employeeForm.positions}
                                  onChange={(event) => setEmployeeForm((prev) => ({ ...prev, positions: event.target.value }))}
                                  rows={5}
                                  className="focus-brand min-h-[164px] w-full rounded-xl border border-castleton/45 outline outline-1 outline-castleton/20 bg-[#fcfefd] px-3.5 py-3 text-base text-black shadow-[0_10px_26px_-22px_rgba(19,48,32,0.4),inset_0_1px_0_rgba(255,255,255,0.75)] placeholder:text-black/35 resize-y"
                                />
                              </label>
                              <div className="rounded-2xl border border-castleton/15 bg-[#f7fbf8] px-4 py-3 text-sm text-black/75">
                                <p className="font-semibold text-black">Preview</p>
                                <p className="mt-2">{[employeeForm.firstName, employeeForm.lastName].filter(Boolean).join(' ') || 'Unnamed employee'}</p>
                                <p>{employeeForm.email || 'No email provided'}</p>
                                <p>{employeeForm.country || 'Country not set'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {employeeFormError ? (
                          <div className="mt-4 rounded-xl border border-[#c05345]/35 bg-[#fff3f1] px-3 py-2 text-sm font-medium text-[#9d4436]">
                            {employeeFormError}
                          </div>
                        ) : null}

                        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                          <button
                            type="button"
                            onClick={resetEmployeeForm}
                            className="focus-brand w-full rounded-full border border-castleton/20 px-3 py-2 text-sm font-semibold text-castleton hover:bg-castleton hover:text-white transition-colors sm:w-auto sm:py-1.5"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="focus-brand w-full rounded-full bg-castleton px-4 py-2 text-sm font-semibold text-white hover:bg-serpent transition-colors sm:w-auto"
                          >
                            Update Employee Record
                          </button>
                        </div>
                      </motion.form>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <AnimatePresence>
                  {selectedApplication ? (
                    <motion.div
                      className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-[3px] flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedApplication(null)}
                    >
                      <motion.div
                        className="w-full max-w-3xl max-h-[90vh] rounded-[26px] border border-castleton/20 bg-white shadow-2xl flex flex-col"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-3 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-castleton/10">
                          <div>
                            <p className="text-xs uppercase tracking-[0.12em] text-castleton mb-1">Applicant Review</p>
                            <h2 className="text-lg sm:text-xl font-semibold text-black">
                              {selectedApplication.firstName} {selectedApplication.lastName}
                            </h2>
                            <p className="text-sm text-black/65 mt-1">{selectedApplication.email}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedApplication(null)}
                            className="focus-brand inline-flex h-9 w-9 items-center justify-center rounded-full border border-castleton/15 text-castleton hover:bg-[#f4f7f5] transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-5 sm:pb-6">
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Phone</p>
                            <p className="mt-1.5 text-sm font-medium text-black">
                              {selectedApplication.phoneCode} {selectedApplication.phoneNumber}
                            </p>
                          </div>
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Position</p>
                            <p className="mt-1.5 text-sm font-medium text-black">
                              {(selectedApplication.positions || []).join(', ') || 'Not specified'}
                            </p>
                          </div>
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Status</p>
                            <span
                              className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-sm font-semibold ${
                                selectedApplication.hireStatus === 'hired'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : selectedApplication.hireStatus === 'not_hired'
                                    ? 'bg-rose-50 text-rose-700'
                                    : isHrInterviewStatus(selectedApplication.status)
                                      ? 'bg-[#e9f3ee] text-castleton'
                                      : selectedApplication.status === 'rejected'
                                        ? 'bg-[#fde8e8] text-[#8a3528]'
                                        : 'bg-[#fff6e4] text-[#8a5a14]'
                              }`}
                            >
                              {applicationDisplayStatusLabel(selectedApplication)}
                            </span>
                            {isHrInterviewStatus(selectedApplication.status) && !isFinalHireDecision(selectedApplication) ? (
                              <p className="mt-2 text-xs text-black/65">{formatInterviewSchedule(selectedApplication)}</p>
                            ) : null}
                          </div>
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Gender</p>
                            <p className="mt-1.5 text-sm font-medium text-black">
                              {selectedApplication.gender || 'Not specified'}
                            </p>
                          </div>
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Age</p>
                            <p className="mt-1.5 text-sm font-medium text-black">
                              {selectedApplication.age || 'Not specified'}
                            </p>
                          </div>
                            <div className="rounded-xl border border-castleton/12 bg-[#f8faf9] px-3 py-2.5">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Country</p>
                            <p className="mt-1.5 text-sm font-medium text-black">
                              {selectedApplication.country || 'Not specified'}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4 mb-4">
                          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Current Address</p>
                          <p className="mt-1.5 text-sm font-medium text-black">
                            {selectedApplication.address || 'Not specified'}
                          </p>
                        </div>

                        {isHrInterviewStatus(selectedApplication.status) && !isFinalHireDecision(selectedApplication) ? (
                          <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4 mb-4">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Interview Schedule</p>
                            <p className="mt-1.5 text-sm font-medium text-black">{formatInterviewSchedule(selectedApplication)}</p>
                            <p className="mt-2 text-xs text-black/55">
                              {selectedApplication.interviewScheduleSentAt
                                ? `Interview email sent ${new Date(selectedApplication.interviewScheduleSentAt).toLocaleString()}`
                                : 'Interview email not yet confirmed as sent.'}
                            </p>
                          </div>
                        ) : null}

                        <div className="grid gap-3 sm:grid-cols-2 mb-4">
                          <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">CV Score</p>
                            <p className="mt-2 text-3xl font-semibold text-black">
                              {selectedApplication.cvScore ?? '—'}
                            </p>
                            <p className="text-xs text-black/60 mt-1">
                              {selectedApplication.cvScoredAt
                                ? `Scored ${new Date(selectedApplication.cvScoredAt).toLocaleString()}`
                                : 'Not scored yet'}
                            </p>
                          </div>
                          <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">Summary</p>
                            <p className="mt-2 text-sm text-black/75">
                              {selectedApplication.cvSummary || 'No summary yet.'}
                            </p>
                          </div>
                        </div>

                        {selectedApplication.cvBreakdown ? (
                          <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4 mb-4">
                            <p className="text-[11px] uppercase tracking-[0.12em] text-black/45 mb-2">Breakdown</p>
                            <div className="grid gap-2 sm:grid-cols-2">
                              {Object.entries(selectedApplication.cvBreakdown).map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm">
                                  <span className="text-black/70 capitalize">{label.replace(/_/g, ' ')}</span>
                                  <span className="font-semibold text-black">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {cvScoreError ? (
                          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 mb-4">
                            {cvScoreError}
                          </div>
                        ) : null}

                        <div className="rounded-2xl border border-castleton/12 bg-[#fbfcfb] p-4">
                          <p className="text-sm text-black/65">
                            Submitted: {new Date(selectedApplication.createdAt).toLocaleString()}
                          </p>
                          <textarea
                            value={applicationNoteDrafts[selectedApplication.id] ?? selectedApplication.adminNote}
                            onChange={(event) =>
                              setApplicationNoteDrafts((prev) => ({ ...prev, [selectedApplication.id]: event.target.value }))
                            }
                            placeholder="Add an internal note for this application"
                            rows={4}
                            className="focus-brand mt-3 w-full rounded-2xl border border-castleton/20 bg-white px-4 py-3 text-black outline-none resize-y"
                          />
                        </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-2 px-4 sm:px-6 pb-4 sm:pb-6 pt-4 border-t border-castleton/10 bg-white/70 backdrop-blur sm:flex-row sm:flex-wrap sm:justify-end">
                          {!isFinalHireDecision(selectedApplication) ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleScoreApplication(selectedApplication)}
                                disabled={isScoringCv}
                                className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-castleton/15 bg-white px-3 py-2 text-sm font-semibold text-castleton hover:bg-[#f4f7f5] transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-1.5"
                              >
                                <RefreshCw className="h-4 w-4" />
                                {selectedApplication.cvScore ? 'Rescore CV' : 'Score CV'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleOpenApplicationCv(selectedApplication)}
                                className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-[#f4f4f4] px-4 py-2 text-sm font-semibold text-black/75 transition-colors hover:bg-[#e8e8e8] sm:w-auto"
                              >
                                <FileText className="h-4 w-4" />
                                View CV
                              </button>
                              <button
                                type="button"
                                onClick={() => handleApplicationDecision(selectedApplication.id, 'rejected')}
                                disabled={selectedApplication.status !== 'pending'}
                                className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#dcb7b0] bg-white px-4 py-2 text-sm font-semibold text-[#8a3528] transition-colors enabled:hover:bg-[#fde8e8] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </button>
                              <button
                                type="button"
                                onClick={() => handleApplicationDecision(selectedApplication.id, 'approved')}
                                disabled={selectedApplication.status !== 'pending'}
                                className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-castleton/20 bg-castleton px-4 py-2 text-sm font-semibold text-white transition-colors enabled:hover:bg-serpent disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Approve
                              </button>
                              {canSetHireStatus(selectedApplication) ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleApplicationHireStatus(selectedApplication.id, 'hired')}
                                    disabled={selectedApplication.hireStatus === 'hired'}
                                    className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                                  >
                                    Hired
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleApplicationHireStatus(selectedApplication.id, 'not_hired')}
                                    disabled={selectedApplication.hireStatus === 'not_hired'}
                                    className="focus-brand inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors enabled:hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                                  >
                                    Not Hired
                                  </button>
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </motion.div>
                  </motion.div>
                  ) : null}
                  </AnimatePresence>
                </AdminDashboardShell>
              </Suspense>
            ) : (
              <section className="max-w-xl mx-auto">
                <div className="bg-[#f3f3f3] rounded-3xl border border-castleton/15 p-7 sm:p-9 text-center">
                  <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Restricted Area</h1>
                  <p className="text-black/75 text-lg mb-6">
                    {isAdminAuthenticated
                      ? adminAccessError || 'This signed-in account is not assigned an admin role in Supabase.'
                      : 'Please sign in first to access the admin dashboard.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => goToPath('/sign-in')}
                    className="focus-brand inline-flex items-center gap-2 rounded-full border border-serpent/25 bg-serpent px-5 py-2.5 text-white font-semibold hover:bg-castleton transition-colors"
                  >
                    Go to Sign In
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )
          ) : currentPath === '/offices' ? (
            <Suspense fallback={<SectionFallback className="h-[980px]" />}>
              <OfficesPage
                officesStatsVisible={officesStatsVisible}
                onStatsEnter={() => setOfficesStatsVisible(true)}
                officeRegions={officeRegions}
                selectedOfficeRegion={selectedOfficeRegion}
                onSelectRegion={setSelectedOfficeRegion}
                officesForSelectedRegion={officesForSelectedRegion}
                CountUpStatComponent={CountUpStat}
                onNavigateContact={() => goToPath('/contact-us')}
              />
            </Suspense>
          ) : currentPath === '/about-us' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="about-overview"
                className="p-8 sm:p-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <h1 className="text-5xl sm:text-6xl font-semibold text-black mb-7">About our company</h1>
                <p className="text-black text-2xl leading-relaxed max-w-6xl">
                  While we are motivated by business and economic objectives, we remain committed to our core business beliefs that shape our corporate and individual behaviour around the world.
                </p>
                <div className="mt-12">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand inline-flex items-center gap-2 rounded-full bg-[#f4b347] px-6 py-3 text-lg font-medium text-black hover:brightness-105 transition-all duration-300"
                  >
                    Contact Us
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-castleton text-white">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="about-showcase"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
                  <motion.article
                    className="lg:col-span-8 relative overflow-hidden rounded-[32px] border border-castleton/20 shadow-soft"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32 }}
                    whileHover={{ y: -6 }}
                  >
                    <motion.img
                      src={aboutShowcase.heroImage}
                      alt="Lifewood leadership collaboration"
                      className="h-[280px] sm:h-[360px] w-full object-cover"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-serpent/40 via-transparent to-transparent" />
                    <div className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6">
                      <p className="text-white/90 text-xs uppercase tracking-[0.14em] mb-2">Team Collaboration</p>
                      <h3 className="text-white text-2xl sm:text-3xl font-semibold leading-none">Building ideas together</h3>
                    </div>
                  </motion.article>

                  <motion.article
                    className="lg:col-span-4 rounded-[32px] border border-castleton/20 bg-[#f3f3f3] p-4 sm:p-5 flex flex-col gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-castleton/15">
                      <motion.img
                        src={aboutShowcase.collabImage}
                        alt="Lifewood team collaboration"
                        className="h-[190px] sm:h-[220px] w-full object-cover"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <div>
                      <p className="text-castleton text-xs uppercase tracking-[0.14em] mb-2">Connect With Us</p>
                      <p className="text-3xl sm:text-4xl font-semibold text-castleton leading-[0.95] mb-3">Let&apos;s collaborate</p>
                      <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
                        We co-create impactful AI and data programs with teams across regions, industries, and languages.
                      </p>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand inline-flex items-center gap-2 rounded-full bg-serpent px-5 py-2.5 text-white text-sm font-semibold hover:bg-castleton transition-colors"
                      >
                        Start a conversation
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.article>
                </div>
              </motion.section>

              <motion.section
                id="about-core-values"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                  <article className="lg:col-span-4">
                    <p className="text-castleton text-sm uppercase tracking-[0.14em] mb-2">Company Culture</p>
                    <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
                      Core <span className="bg-[#f4b347] px-2">Value</span>
                    </h2>
                    <p className="text-black text-lg leading-relaxed">
                      At Lifewood we empower our company and our clients to realise the transformative power of AI:
                      bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
                    </p>
                  </article>

                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {aboutPrinciples.map((item, index) => (
                      <motion.article
                        key={item.title}
                        className="relative overflow-hidden rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-5 sm:p-6"
                        initial={{ opacity: 0, y: 18, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.18 }}
                        transition={{ duration: 0.28, delay: 0.08 + index * 0.06 }}
                        whileHover={{ y: -8 }}
                      >
                        <motion.div
                          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron to-castleton"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
                          style={{ transformOrigin: 'left' }}
                        />
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-serpent text-white text-2xl font-semibold">
                            {item.code}
                          </span>
                          <p className="text-castleton text-xs uppercase tracking-[0.14em]">{item.title}</p>
                        </div>
                        <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section
                id="about-mission-vision"
                className="p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.12 }}
              >
                <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">What drives us today, and what inspires us for tomorrow</h2>
                <div className="mb-5 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-castleton/20 bg-white/60 p-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'mission'}
                    onMouseEnter={() => setActiveAboutTab('mission')}
                    onFocus={() => setActiveAboutTab('mission')}
                    onClick={() => setActiveAboutTab('mission')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'mission'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Mission
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeAboutTab === 'vision'}
                    onMouseEnter={() => setActiveAboutTab('vision')}
                    onFocus={() => setActiveAboutTab('vision')}
                    onClick={() => setActiveAboutTab('vision')}
                    className={`focus-brand px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ${
                      activeAboutTab === 'vision'
                        ? 'bg-serpent text-white shadow-soft'
                        : 'bg-transparent text-black hover:bg-castleton hover:text-white'
                    }`}
                  >
                    Vision
                  </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAboutTab}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                  >
                    <article className="lg:col-span-6 overflow-hidden rounded-3xl border border-castleton/20">
                      <img
                        src={aboutMissionVision[activeAboutTab].image}
                        alt={aboutMissionVision[activeAboutTab].title}
                        className="h-[260px] sm:h-[320px] w-full object-cover"
                      />
                    </article>
                    <article className="lg:col-span-6 rounded-3xl border border-castleton/20 bg-[#f3f3f3] p-6 sm:p-8">
                      {activeAboutTab === 'vision' ? (
                        <div className="relative overflow-hidden">
                          <motion.div
                            className="absolute -top-12 -right-10 h-36 w-36 rounded-full bg-castleton/12 blur-2xl"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <motion.h3
                            className="text-4xl sm:text-5xl font-semibold mb-4 text-serpent leading-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                          >
                            Our Vision
                          </motion.h3>
                          <motion.p
                            className="text-black text-lg sm:text-2xl leading-relaxed sm:leading-relaxed max-w-2xl"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28, delay: 0.1 }}
                          >
                            {aboutMissionVision.vision.description}
                          </motion.p>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-3xl sm:text-4xl font-semibold mb-3 text-serpent">
                            {aboutMissionVision.mission.title}
                          </h3>
                          <p className="text-black text-base sm:text-lg leading-relaxed">
                            {aboutMissionVision.mission.description}
                          </p>
                        </>
                      )}
                    </article>
                  </motion.div>
                </AnimatePresence>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/internal-news' ? (
            <section className="max-w-6xl mx-auto space-y-8 relative text-black">
              <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
              <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />

              <motion.div
                id="news-overview"
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/55 rounded-full blur-3xl" />
                <p className="text-black font-medium uppercase tracking-[0.14em] text-sm mb-5">Internal News</p>
                <h1 className="text-4xl sm:text-5xl font-semibold text-black mb-5">Rootstech 2026</h1>
                <p className="text-black text-lg max-w-4xl mx-auto">
                  Coming soon. Stay connected for official updates, event highlights, and Lifewood internal announcements.
                </p>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => goToPath('/contact-us')}
                    className="focus-brand brand-pill px-4 py-2 text-sm font-semibold"
                  >
                    Contact Us
                  </button>
                </div>
              </motion.div>

              <motion.section
                id="news-featured-video"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.06 }}
              >
                <h2 className="text-3xl sm:text-4xl font-medium mb-5">Featured Update</h2>
                <div className="relative w-full overflow-hidden rounded-2xl border border-castleton/20 bg-black" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ccyrQ87EJag"
                    title="Lifewood Internal News Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </motion.section>

              <motion.section
                id="news-highlights"
                className="rounded-3xl p-5 sm:p-7"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      title: 'Event Updates',
                      details: 'Program announcements, milestone news, and key schedules for upcoming activities.',
                    },
                    {
                      title: 'Media Highlights',
                      details: 'Video recaps and featured content from Lifewood initiatives and partner events.',
                    },
                    {
                      title: 'Community News',
                      details: 'Company stories, participation highlights, and internal engagement updates.',
                    },
                  ].map((item, index) => (
                    <motion.article
                      key={item.title}
                      className="bg-[#f3f3f3] text-black rounded-3xl p-6 sm:p-7 border border-castleton/15 interactive-card"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: 0.12 + index * 0.05 }}
                    >
                      <h3 className="text-2xl sm:text-3xl font-medium mb-3">{item.title}</h3>
                      <p className="text-black text-base sm:text-lg leading-relaxed">{item.details}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <motion.section
                id="ai-contact"
                className="mt-8 bg-serpent border border-castleton/35 rounded-[32px] p-6 sm:p-7 lg:p-9 text-white relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-castleton/45 blur-3xl" />
                <div className="relative">
                  <img
                    src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png"
                    alt="Lifewood logo"
                    className="h-8 sm:h-9 w-auto mb-5"
                  />
                  <p className="text-lg sm:text-2xl font-medium leading-tight mb-8 max-w-3xl">
                    We provide global Data Engineering Services to enable AI Solutions.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                    <div>
                      <button
                        type="button"
                        onClick={() => goToPath('/contact-us')}
                        className="focus-brand mb-5 inline-flex items-center rounded-full border border-white/35 bg-white/12 px-6 py-2 text-lg sm:text-xl font-bold text-[#e7edd8] hover:bg-white/20 transition-colors"
                      >
                        Contact Us
                      </button>
                      <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Privacy Policy</a>
                        <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Policy</a>
                        <a href="https://www.termsfeed.com/live/terms-and-conditions" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Terms and Conditions</a>
                        <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noreferrer" className="brand-link hover:text-saffron transition-colors">Cookie Settings</a>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-base sm:text-lg mb-4">Find Us On:</p>
                      <div className="flex flex-wrap lg:justify-end gap-3 mb-6">
                        <a href="https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Linkedin className="w-4 h-4" /></a>
                        <a href="https://www.facebook.com/LifewoodPH/" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Facebook className="w-4 h-4" /></a>
                        <a href="https://www.instagram.com/lifewood_official/?hl=af" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Instagram className="w-4 h-4" /></a>
                        <a href="https://www.youtube.com/@LifewoodDataTechnology" target="_blank" rel="noreferrer" className="bg-white/10 border border-white/35 rounded-full w-10 h-10 flex items-center justify-center text-white hover:text-saffron"><Youtube className="w-4 h-4" /></a>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                        <p className="text-lg sm:text-xl font-medium">&copy; 2026 Lifewood - All Rights Reserved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </section>
          ) : currentPath === '/application-form' ? (
            <Suspense fallback={<SectionFallback className="h-[720px]" />}>
              <ApplicationFormPage />
            </Suspense>
          ) : (
            <section className="max-w-5xl mx-auto bg-white border border-castleton/15 shadow-soft rounded-3xl p-8 sm:p-12">
              <p className="text-castleton font-medium uppercase tracking-[0.14em] text-sm mb-5">Lifewood</p>
              <h1 className="text-4xl sm:text-5xl font-semibold text-serpent mb-5">{pageData?.title || 'Page'}</h1>
              <p className="text-serpent/90 text-lg mb-10 max-w-3xl">
                {pageData?.description || 'Content for this page is being prepared.'}
              </p>
              <button
                type="button"
                onClick={() => goToPath('/')}
                className="focus-brand bg-white border border-castleton/25 rounded-brand px-6 py-3 text-serpent font-semibold hover:text-castleton transition-colors"
              >
                Back to Home
              </button>
            </section>
          )}
        </main>
      </div>
    )
  }

  return (
    <Suspense fallback={<SectionFallback className="min-h-screen" />}>
      <HomePage onScrollToSection={scrollToSection} onNavigatePath={goToPath} />
    </Suspense>
  )
}

export default App




























































































