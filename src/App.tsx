import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Pricing from './components/Pricing'
import QuoteSection from './components/quote/QuoteSection'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LogoBackdrop from './components/LogoBackdrop'
import StackSection from './components/StackSection'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#07080f] text-zinc-300">
      <LogoBackdrop />
      <Nav />
      <main className="relative z-10">
        <StackSection index={0}>
          <Hero />
        </StackSection>
        <StackSection index={1}>
          <Services />
        </StackSection>
        <StackSection index={2}>
          <Process />
        </StackSection>
        <StackSection index={3}>
          <Pricing />
        </StackSection>
        <StackSection index={4}>
          <QuoteSection />
        </StackSection>
        <StackSection index={5}>
          <Faq />
        </StackSection>
        <StackSection index={6}>
          <Contact />
          <Footer />
        </StackSection>
      </main>
    </div>
  )
}
