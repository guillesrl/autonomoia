import React from 'react';

const footerLink = {
  fontSize: 14, color: 'var(--fg-secondary)',
  textDecoration: 'none',
};

export function Logo({ inverted }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        width: 28, height: 28, borderRadius: 8,
        background: inverted ? 'rgba(255,255,255,0.12)' : 'var(--color-slate-950)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L7 2L12 12M4.2 8.5H9.8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span style={{
        fontSize: 17, fontWeight: 700,
        color: inverted ? 'white' : 'var(--fg-primary)',
        letterSpacing: '-0.02em',
      }}>Autonomo<span style={{ color: inverted ? '#8FBFEC' : 'var(--fg-accent)' }}>IA</span></span>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-page)',
      borderTop: '1px solid var(--border-default)',
      paddingBlock: 56,
      paddingInline: 'var(--container-pad)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div data-grid-2 style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr',
          gap: 32, marginBottom: 40,
        }}>
          <div style={{ maxWidth: 320 }}>
            <Logo />
            <p style={{ fontSize: 14, color: 'var(--fg-secondary)', lineHeight: 1.6, marginTop: 12 }}>
              Automatizaciones IA a medida para pequeñas y medianas empresas.
              Diseño, despliegue y soporte continuo.
            </p>
          </div>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginBottom: 16,
            }}>Contacto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:+376615808" style={footerLink}>+376 615 808</a>
              <a href="mailto:guillesrl@gmail.com" style={footerLink}>guillesrl@gmail.com</a>
            </div>
          </div>
          <div>
            <div style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginBottom: 16,
            }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="#" style={footerLink}>Aviso legal</a>
              <a href="#" style={footerLink}>Privacidad</a>
              <a href="#" style={footerLink}>Cookies</a>
            </div>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 24, fontSize: 13, color: 'var(--fg-tertiary)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div>© 2026 Automatizaciones IA. Todos los derechos reservados.</div>
          <div>Hecho con ❤ en Andorra</div>
        </div>
      </div>
    </footer>
  );
}
