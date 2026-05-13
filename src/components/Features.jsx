import React from 'react';

export function useScrollReveal(delay) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        setTimeout(() => setEntered(true), (delay || 0) + 620);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible, entered };
}

export function Kicker({ children }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
      textTransform: 'uppercase', color: 'var(--fg-accent)',
      marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 20, height: 1, background: 'var(--fg-accent)' }}></span>
      {children}
    </div>
  );
}

export function Features() {
  const niches = [
    { icon: 'casa', kicker: 'Inmobiliarias', title: 'Califica y agenda visitas en automático',
      body: 'El asistente filtra prospectos según presupuesto, zona y tipo de propiedad, y agenda las visitas directamente en tu calendario.',
      metric: '+120%', metricLabel: 'leads cualificados' },
    { icon: 'tijera', kicker: 'Estética & Peluquería', title: 'Reduce las citas perdidas al mínimo',
      body: 'Recordatorios automáticos por WhatsApp, gestión de reprogramaciones y confirmaciones sin intervención humana.',
      metric: '−90%', metricLabel: 'no-shows' },
    { icon: 'plato', kicker: 'Restaurantes', title: 'Reservas y consultas resueltas al instante',
      body: 'Gestiona reservas de mesa, consultas sobre la carta y horarios. Tu equipo deja de coger el teléfono cada 5 minutos.',
      metric: '24/7', metricLabel: 'disponibilidad' },
  ];

  return (
    <section style={{ paddingBlock: 'var(--space-24)', paddingInline: 'var(--container-pad)', background: 'var(--bg-page)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <Kicker>Soluciones por sector</Kicker>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--fg-primary)', marginBottom: 16,
          }}>
            Una solución a medida para tu sector.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--fg-secondary)', lineHeight: 1.55 }}>
            No vendemos software genérico. Diseñamos cada sistema para los procesos
            específicos de tu negocio, integrado con las herramientas que ya usas.
          </p>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓</span>
            Configuración en 48 horas · Sin compromiso
          </p>
        </div>

        <div data-grid-2 style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {niches.map((n, i) => (<NicheCard key={i} {...n} delay={i * 300} />))}
        </div>
      </div>
    </section>
  );
}

function NicheIcon({ name }) {
  const stroke = 'var(--color-blue-600)';
  const fill = 'var(--color-blue-50)';
  const icons = {
    casa: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-8.5z" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    tijera: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="3" stroke={stroke} strokeWidth="1.8"/>
        <circle cx="6" cy="18" r="3" stroke={stroke} strokeWidth="1.8"/>
        <path d="M8.5 7.5L20 19M8.5 16.5L20 5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    plato: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.8"/>
        <circle cx="12" cy="12" r="3" stroke={stroke} strokeWidth="1.8"/>
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  };
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 12,
      background: fill, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
    }}>{icons[name]}</div>
  );
}

function AnimatedMetric({ metric, hovered }) {
  const [display, setDisplay] = React.useState(metric);
  const rafRef = React.useRef(null);
  const match = metric.match(/^([+\-−<\s]*)(\d+)(.*)$/);

  React.useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);
    if (!hovered) { setDisplay(metric); return; }
    const duration = 700;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(prefix + Math.round(eased * target) + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  return display;
}

function NicheCard({ icon, kicker, title, body, metric, metricLabel, delay }) {
  const [hovered, setHovered] = React.useState(false);
  const { ref, visible, entered } = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid ' + (hovered ? 'var(--border-strong)' : 'var(--border-default)'),
        borderRadius: 16, padding: 28,
        opacity: visible ? 1 : 0,
        transform: !visible ? 'translateY(28px)' : hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: entered
          ? 'all var(--duration-base) var(--ease-out)'
          : `opacity 560ms ${delay || 0}ms var(--ease-out), transform 560ms ${delay || 0}ms var(--ease-out), box-shadow var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)`,
        display: 'flex', flexDirection: 'column',
      }}>
      <NicheIcon name={icon} />
      <div style={{
        marginTop: 20, fontSize: 11, fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--fg-accent)',
      }}>{kicker}</div>
      <h3 style={{
        marginTop: 8, fontSize: 19, fontWeight: 700,
        color: 'var(--fg-primary)', lineHeight: 1.3, letterSpacing: '-0.01em',
      }}>{title}</h3>
      <p style={{ marginTop: 12, fontSize: 15, color: 'var(--fg-secondary)', lineHeight: 1.55, flex: 1 }}>{body}</p>
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'baseline', gap: 8,
      }}>
        <span style={{
          fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em',
          color: hovered ? 'var(--fg-accent)' : 'var(--fg-primary)',
          transition: 'color var(--duration-base) var(--ease-out)',
        }}>
          <AnimatedMetric metric={metric} hovered={hovered} />
        </span>
        <span style={{ fontSize: 13, color: 'var(--fg-tertiary)' }}>{metricLabel}</span>
      </div>
    </div>
  );
}

function StepCard({ step, delay }) {
  const { ref, visible, entered } = useScrollReveal(delay);
  return (
    <div ref={ref} style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-default)',
      borderRadius: 16, padding: 28,
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: entered
        ? 'all var(--duration-base) var(--ease-out)'
        : `opacity 560ms ${delay || 0}ms var(--ease-out), transform 560ms ${delay || 0}ms var(--ease-out)`,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
        color: 'var(--fg-accent)', letterSpacing: '0.04em',
        marginBottom: 28,
      }}>{step.num}</div>
      <h3 style={{
        fontSize: 20, fontWeight: 700, color: 'var(--fg-primary)',
        marginBottom: 10, letterSpacing: '-0.01em',
      }}>{step.title}</h3>
      <p style={{ fontSize: 15, color: 'var(--fg-secondary)', lineHeight: 1.55 }}>{step.body}</p>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Auditoría gratuita', body: 'En 30 minutos analizamos tus procesos actuales e identificamos las oportunidades de automatización con mayor retorno.' },
    { num: '02', title: 'Sistema a medida',   body: 'Diseñamos y configuramos el asistente IA integrándolo con tu CRM, agenda, WhatsApp y herramientas existentes.' },
    { num: '03', title: 'Puesta en marcha',   body: 'Lanzamos el sistema, formamos a tu equipo y te acompañamos durante los primeros 30 días con soporte directo.' },
  ];

  return (
    <section id="como-funciona" style={{ paddingBlock: 'var(--space-24)', paddingInline: 'var(--container-pad)', background: 'var(--bg-elevated)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <Kicker>Cómo trabajamos</Kicker>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--fg-primary)', marginBottom: 16,
          }}>
            De la auditoría a la puesta en marcha en 48 horas.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--fg-secondary)', lineHeight: 1.55 }}>
            Un proceso directo, sin sorpresas. Empezamos con una llamada gratuita y, si encaja, lanzamos.
          </p>
        </div>

        <div data-grid-2 style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => (<StepCard key={i} step={s} delay={i * 300} />))}
        </div>
      </div>
    </section>
  );
}
