import { useCallback, useState } from 'react'
import { CartProvider } from './context/CartContext'
import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/menu/Menu'
import CustomCake from './components/CustomCake'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/cart/CartDrawer'
import FloatingUI from './components/FloatingUI'
import { scrollToSection } from './utils/scroll'

export default function App() {
  const [menuCategory, setMenuCategory] = useState('all')
  const [cakePrefill, setCakePrefill] = useState(null)
  useReveal()

  // "Enquire" on a custom cake → prefill the enquiry form and scroll to it.
  const enquire = useCallback((product) => {
    setCakePrefill({ style: product.name, at: Date.now() })
    scrollToSection('#custom-cakes', 80)
  }, [])

  return (
    <CartProvider>
      <a href="#main" className="sr-only z-[90] rounded-full bg-royal-600 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Menu onEnquire={enquire} active={menuCategory} setActive={setMenuCategory} />
        <CustomCake prefill={cakePrefill} />
        <WhyUs />
        <Gallery />
        <Contact />
      </main>
      <Footer onSelectCategory={setMenuCategory} />
      <CartDrawer />
      <FloatingUI />
    </CartProvider>
  )
}
