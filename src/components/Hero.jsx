import React from 'react';

export function Hero() {
  return (
    <section className="hero-section" style={{
      position: 'relative',
      overflow: 'hidden',
      background: '#080F1C',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-15%', left: '-10%', width: '60%', height: '70%',
        background: 'radial-gradient(circle, rgba(9,96,174,0.55) 0%, transparent 60%)',
        filter: 'blur(50px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '5%', right: '-15%', width: '55%', height: '60%',
        background: 'radial-gradient(circle, rgba(62,143,216,0.45) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-10%', left: '15%', width: '60%', height: '55%',
        background: 'radial-gradient(circle, rgba(3,50,94,0.60) 0%, transparent 65%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 85%)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        <div className="hero-grid" data-grid-2>
          <div>
            <h1 className="hero-title" style={{
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.035em',
              color: 'white', marginBottom: 20,
            }}>
              Duplica tus Clientes{' '}
              <span style={{
                background: 'linear-gradient(120deg, #64A6E3 0%, #8FBFEC 50%, #B8D1E7 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontWeight: 800,
              }}>Sin Trabajar Más Horas</span>
            </h1>
            <p className="hero-sub" style={{
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.55, marginBottom: 32, maxWidth: 480,
            }}>
              Automatizamos la atención de tu negocio para responder, calificar y
              agendar citas 24/7 mientras tú te enfocas en crecer.
            </p>

            <div className="hero-ctas" style={{ display: 'flex', gap: 12, alignItems: 'stretch', flexWrap: 'wrap' }}>
              <a href="#contacto"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'var(--action-primary)', color: 'var(--action-primary-text)',
                  fontSize: 15, fontWeight: 600, padding: '14px 24px', borderRadius: 10,
                  textDecoration: 'none', transition: 'all var(--duration-base) var(--ease-out)',
                  boxShadow: 'var(--shadow-md)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--action-primary-hover)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--action-primary)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}>
                Solicitar auditoría gratis
                <span style={{ display: 'inline-block' }}>→</span>
              </a>
              <a href="#como-funciona"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: 'white', fontSize: 15, fontWeight: 600,
                  padding: '13px 20px', borderRadius: 10, textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.22)', background: 'transparent',
                  transition: 'all var(--duration-base) var(--ease-out)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.background = 'transparent'; }}>
                Ver cómo funciona
              </a>
            </div>
          </div>

          <ChatPreview />
        </div>
      </div>
    </section>
  );
}

function ChatPreview() {
  const messages = [
    { from: 'user',  text: 'Hola, quiero reservar una mesa para 4 personas el sábado a las 21h', time: '14:32' },
    { from: 'bot',   text: '¡Hola Marta! 👋 Tengo disponibilidad el sábado a las 21:00 en sala interior. ¿Te confirmo?', time: '14:32' },
    { from: 'user',  text: 'Sí, confírmamela', time: '14:33' },
    { from: 'bot',   text: '✓ Reserva confirmada — Sábado 21:00, mesa de 4. Te envío recordatorio el viernes.', time: '14:33' },
  ];
  const [visible, setVisible] = React.useState([0]);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVisible(v => v.length >= messages.length ? [0] : [...v, v.length]);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: -30, right: -30, width: 200, height: 200,
        background: 'rgba(62,143,216,0.35)', borderRadius: '50%',
        filter: 'blur(40px)', opacity: 0.8, pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        background: 'rgba(15,24,42,0.72)',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 20, padding: 24,
        boxShadow: '0 30px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.20)',
        maxWidth: 480, margin: '0 auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          paddingBottom: 16, marginBottom: 16,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(255,255,255,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 16,
          }}>AI</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>Asistente Autonomo IA</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }}></span>
              Activo · Responde en &lt; 1s
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-mono)' }}>WhatsApp</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: 360, overflow: 'hidden' }}>
          {messages.map((m, i) => visible.includes(i) && (
            <div key={i} style={{
              display: 'flex',
              justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
              animation: 'msgIn 320ms var(--ease-out)',
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: m.from === 'user' ? 'var(--color-blue-600)' : 'rgba(255,255,255,0.07)',
                color: 'white',
                fontSize: 14, lineHeight: 1.45,
                border: m.from === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                {m.text}
                <div style={{
                  fontSize: 10, marginTop: 4,
                  color: m.from === 'user' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)',
                  textAlign: 'right',
                }}>{m.time}</div>
              </div>
            </div>
          ))}
          {visible.length < messages.length && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '12px 14px', borderRadius: '14px 14px 14px 4px',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', gap: 4,
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.45)',
                    animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
