import { EventDetails } from './components/EventDetails'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { GiftSection } from './components/GiftSection'
import { InvitationHero } from './components/InvitationHero'
import { Navbar } from './components/Navbar'
import { RsvpSection } from './components/RsvpSection'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-text)]">
      <div className="page-background" aria-hidden="true" />
      <Navbar />
      <main className="relative">
        <InvitationHero />
        <Gallery />
        <GiftSection />
        <EventDetails />
        <RsvpSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
