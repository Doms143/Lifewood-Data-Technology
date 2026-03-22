export const defaultFaceToFaceInterviewLocation = `Ground Floor, i2 Building
Jose Del Mar Street, Cebu IT Park
Cebu City 6000`

const inferMeetingType = (location = '') => {
  const normalized = String(location || '').toLowerCase()
  if (
    normalized.includes('meet.google.com') ||
    normalized.includes('google meet') ||
    normalized.startsWith('http://') ||
    normalized.startsWith('https://')
  ) {
    return 'google-meet'
  }
  return 'face-to-face'
}

const formatLocalDateInput = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatLocalTimeInput = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export const createInitialInterviewScheduleForm = (application = null) => {
  const meetingType = inferMeetingType(application?.interviewLocation)
  return {
    applicationId: application?.id || '',
    date: formatLocalDateInput(application?.interviewScheduledAt),
    time: formatLocalTimeInput(application?.interviewScheduledAt),
    timezone:
      application?.interviewTimezone ||
      (typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone || '' : ''),
    meetingType,
    meetingLink: meetingType === 'google-meet' ? application?.interviewLocation || '' : '',
    location:
      meetingType === 'google-meet'
        ? application?.interviewLocation || ''
        : application?.interviewLocation || defaultFaceToFaceInterviewLocation,
  }
}
