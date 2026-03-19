import ApplicationFormRoute from './ApplicationFormRoute'

export default function ApplicationFormPage() {
  return (
    <section className="max-w-6xl mx-auto space-y-8 relative text-black">
      <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="absolute top-40 -right-16 w-72 h-72 rounded-full bg-castleton/15 blur-3xl" />
      <ApplicationFormRoute />
    </section>
  )
}
