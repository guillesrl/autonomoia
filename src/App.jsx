import React from 'react';
import { Hero } from './components/Hero.jsx';
import { Features, HowItWorks } from './components/Features.jsx';
import { Stats } from './components/Stats.jsx';
import { FAQ } from './components/FAQ.jsx';
import { ContactForm } from './components/ContactForm.jsx';
import { Footer, Logo } from './components/Footer.jsx';

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const linkColor = scrolled ? 'var(--fg-secondary)' : 'rgba(255,255,255,0.72)';
  const linkHover = scrolled ? 'var(--fg-primary)' : 'white';
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 32px',
      background: scrolled ? 'rgba(250,250,247,0.88)' : 'rgba(8,15,28,0.65)',
      backdropFilter: 'saturate(180%) blur(14px)',
      WebkitBackdropFilter: 'saturate(180%) blur(14px)',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid rgba(255,255,255,0.10)',
      transition: 'all 300ms var(--ease-out)',
    }}>
      <Logo inverted={!scrolled} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <a href="#como-funciona" style={{ fontSize: 14, fontWeight: 500, color: linkColor, textDecoration: 'none', transition: 'color 150ms' }}
          onMouseEnter={e => { e.currentTarget.style.color = linkHover; }}
          onMouseLeave={e => { e.currentTarget.style.color = linkColor; }}>Cómo funciona</a>
        <a href="#contacto" style={{
          background: 'var(--action-primary)', color: 'var(--action-primary-text)',
          fontSize: 14, fontWeight: 600, padding: '9px 18px', borderRadius: 8,
          textDecoration: 'none', transition: 'all var(--duration-base) var(--ease-out)',
          boxShadow: 'var(--shadow-xs)', whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--action-primary-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--action-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}>
          Auditoría gratis
        </a>
      </div>
    </nav>
  );
}

function WhatsAppButton() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href="https://wa.me/376615808"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onClick={() => { if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { event_category: 'contact', event_label: 'floating_button' }); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 200,
        display: 'flex', alignItems: 'center', gap: hovered ? 10 : 0,
        background: '#25D366',
        color: 'white',
        textDecoration: 'none',
        borderRadius: hovered ? 50 : '50%',
        padding: hovered ? '14px 20px 14px 16px' : '14px',
        boxShadow: hovered
          ? '0 8px 28px rgba(37,211,102,0.45)'
          : '0 4px 16px rgba(37,211,102,0.35)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.855L.057 23.868a.75.75 0 00.918.944l6.184-1.62A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.523-5.228-1.432l-.372-.222-3.863 1.013 1.036-3.742-.243-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      <span style={{
        fontSize: 14, fontWeight: 600,
        maxWidth: hovered ? 160 : 0,
        opacity: hovered ? 1 : 0,
        transition: 'max-width 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease',
        overflow: 'hidden',
      }}>Contacto directo</span>
    </a>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
