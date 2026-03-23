const clampMetric = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value))

export const calculateInternMetricsAfterTask = (intern, score, activityType) => {
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
  const progress = Math.round(clampMetric(intern.progress + selectedWeight.progressBoost + scoreMomentum, 45, 100))
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
