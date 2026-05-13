import React from 'react';
import { Kicker } from './Features.jsx';

export function FAQ() {
  const [open, setOpen] = React.useState(0);
  const items = [
    { q: '¿Cuánto tiempo tarda en estar operativo?',
      a: 'Habitualmente, <strong>48 horas desde la firma</strong>. Realizamos una auditoría inicial, configuramos las integraciones (WhatsApp Business, Calendar, CRM) y desplegamos el asistente. En la mayoría de casos está respondiendo clientes reales en menos de 72 horas.' },
    { q: '¿Se integra con el software que ya uso?',
      a: 'Sí. Soportamos las herramientas más comunes — Google Calendar, Calendly, Outlook, Stripe, n8n, Make, HubSpot, Notion y prácticamente cualquier herramienta con API. Durante la auditoría revisamos tu stack y confirmamos las integraciones necesarias.' },
    { q: '¿Y si mi negocio tiene procesos muy específicos?',
      a: 'Es exactamente lo que hacemos. No vendemos un producto cerrado — diseñamos cada sistema a medida según tus reglas de negocio, tu tono de marca y la casuística real de tus clientes. Cuanto más específico, mejor encaje tendrá.' },
    { q: '¿Cuánto cuesta?',
      a: 'Depende del alcance — número de integraciones, volumen de mensajes, complejidad de los flujos. Tras la auditoría gratuita te enviamos una propuesta cerrada con precio fijo. No hay sorpresas ni cargos por uso.' },
    { q: '¿Qué pasa si quiero dejarlo?',
      a: 'Te entregamos toda la documentación y los flujos para que tu equipo (o cualquier desarrollador) pueda mantenerlo. Sin contratos de permanencia, sin vendor lock-in.' },
  ];

  return (
    <section style={{
      paddingBlock: 'var(--space-24)',
      paddingInline: 'var(--container-pad)',
      background: 'var(--bg-page)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <Kicker>Preguntas frecuentes</Kicker>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--fg-primary)',
          }}>
            Lo que más nos preguntan.
          </h2>
        </div>

        <div style={{
          border: '1px solid var(--border-default)',
          borderRadius: 16, background: 'var(--bg-surface)',
          overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              borderBottom: i < items.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '20px 24px',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: 24,
                  fontFamily: 'inherit',
                }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-primary)', lineHeight: 1.4 }}>{item.q}</span>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: open === i ? 'var(--fg-primary)' : 'var(--bg-elevated)',
                  color: open === i ? 'white' : 'var(--fg-primary)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 500,
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  transition: 'all var(--duration-base) var(--ease-out)',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{
                  padding: '0 24px 22px',
                  fontSize: 15, color: 'var(--fg-secondary)', lineHeight: 1.65,
                }}
                  dangerouslySetInnerHTML={{ __html: item.a.replace(/<strong>/g, '<strong style="color:var(--fg-primary);font-weight:600">') }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
