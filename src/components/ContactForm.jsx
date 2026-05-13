import React from 'react';
import { Kicker } from './Features.jsx';

const formStyles = {
  label: {
    display: 'block', fontSize: 13, fontWeight: 600,
    color: 'var(--fg-primary)', marginBottom: 8,
  },
  input: {
    width: '100%', background: 'var(--bg-surface)',
    border: '1px solid var(--border-default)', borderRadius: 10,
    padding: '12px 14px', fontSize: 15, color: 'var(--fg-primary)',
    fontFamily: 'inherit', outline: 'none',
    transition: 'all var(--duration-fast) var(--ease-out)',
  },
};

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL
  || (import.meta.env.DEV ? '/api/contact' : 'https://n8n.guillers.es/webhook/contacto-landing');

export function ContactForm() {
  const [sector, setSector] = React.useState('');
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    data.source = 'landing';
    data.submittedAt = new Date().toISOString();
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setSent(true);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: data.sector || 'unknown',
          value: 1,
        });
      }
    } catch (err) {
      setError('No se pudo enviar. Inténtalo de nuevo o escríbenos a guillesrl@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" style={{
      paddingBlock: 'var(--space-24)',
      paddingInline: 'var(--container-pad)',
      background: 'var(--bg-elevated)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 48, alignItems: 'start',
      }} data-grid-2>
        <div>
          <Kicker>Auditoría gratuita</Kicker>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--fg-primary)', marginBottom: 20,
          }}>
            Hablemos 30 minutos y vemos si encaja.
          </h2>
          <p style={{ fontSize: 17, color: 'var(--fg-secondary)', lineHeight: 1.6, marginBottom: 32 }}>
            Sin venta agresiva, sin compromiso. Solo una conversación honesta sobre
            qué procesos de tu negocio puedes automatizar y cuál sería el retorno.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'Análisis honesto de tu situación actual',
              'Identificación de oportunidades concretas',
              'Estimación realista de retorno e inversión',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--color-success)', color: 'white',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, marginTop: 1,
                }}>✓</span>
                <span style={{ fontSize: 15, color: 'var(--fg-primary)', fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {sent ? (
            <div style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: 16, padding: 40, textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--color-success)', margin: '0 auto 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 24, fontWeight: 700,
              }}>✓</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg-primary)', marginBottom: 10 }}>
                Recibido. Hablamos pronto.
              </h3>
              <p style={{ color: 'var(--fg-secondary)', fontSize: 15 }}>
                Te enviaré un email con dos huecos disponibles en las próximas 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              borderRadius: 16, padding: 32, boxShadow: 'var(--shadow-md)',
            }}>
              {[
                { label: 'Nombre',   type: 'text',  placeholder: 'Tu nombre',         id: 'name' },
                { label: 'Email',    type: 'email', placeholder: 'tu@email.com',      id: 'email' },
                { label: 'Teléfono', type: 'tel',   placeholder: '+34 600 000 000',   id: 'phone' },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 18 }}>
                  <label htmlFor={f.id} style={formStyles.label}>{f.label}</label>
                  <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required style={formStyles.input}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-blue-600)'; e.target.style.boxShadow = '0 0 0 4px var(--bg-accent-soft)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border-default)'; e.target.style.boxShadow = 'none'; }} />
                </div>
              ))}
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="sector" style={formStyles.label}>Sector</label>
                <select id="sector" name="sector" value={sector} onChange={e => setSector(e.target.value)} required
                  style={{ ...formStyles.input, color: sector ? 'var(--fg-primary)' : 'var(--fg-muted)', cursor: 'pointer', appearance: 'none', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748B' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: 40 }}>
                  <option value="">Selecciona tu sector</option>
                  <option>Inmobiliaria</option>
                  <option>Estética / Peluquería</option>
                  <option>Restaurante / Cafetería</option>
                  <option>Otro</option>
                </select>
              </div>
              <button type="submit" disabled={loading}
                style={{
                  width: '100%', background: 'var(--action-primary)', color: 'var(--action-primary-text)',
                  fontSize: 15, fontWeight: 600, padding: '15px', borderRadius: 10, border: 'none',
                  cursor: loading ? 'wait' : 'pointer', fontFamily: 'inherit',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all var(--duration-base) var(--ease-out)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--action-primary-hover)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; } }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--action-primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}>
                {loading ? 'Enviando…' : 'Solicitar auditoría gratuita →'}
              </button>
              {error && (
                <p style={{ fontSize: 13, color: '#B45309', textAlign: 'center', marginTop: 14, padding: '10px 14px', background: 'rgba(180,83,9,0.08)', borderRadius: 8 }}>
                  {error}
                </p>
              )}
              <p style={{ fontSize: 12, color: 'var(--fg-tertiary)', textAlign: 'center', marginTop: 14 }}>
                Te respondemos en menos de 24 horas laborables.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
