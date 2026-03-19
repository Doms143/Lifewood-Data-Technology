import Navigation from './Navigation'
import Hero from './Hero'
import Services from './Services'
import Stats from './Stats'
import OurClientsPartners from './OurClientsPartners'
import Footer from './Footer'

export default function HomePage({ onScrollToSection, onNavigatePath }) {
  return (
    <div className="w-full overflow-x-hidden">
      <Navigation onNavigate={onScrollToSection} onNavigatePath={onNavigatePath} />
      <Hero onContact={() => onScrollToSection('contact')} onLearnMore={() => onScrollToSection('services')} />
      <Services />
      <Stats />
      <OurClientsPartners />
      <Footer />
    </div>
  )
}
