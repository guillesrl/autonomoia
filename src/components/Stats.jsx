import React from 'react';

function AnimatedStatNum({ num }) {
  const match = num.match(/^([+\-−<\s]*)(\d+)(.*)$/);
  const [prefix, numStr, suffix] = match ? [match[1], match[2], match[3]] : [null, null, null];
  const target = numStr ? parseInt(numStr, 10) : null;
  const [display, setDisplay] = React.useState(target !== null ? prefix + '0' + suffix : num);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (target === null || !ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(prefix + Math.round(eased * target) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref}>{display}</span>;
}

export function Stats() {
  const items = [
    { num: '+120%', label: 'Aumento medio en leads cualificados' },
    { num: '−90%',  label: 'Reducción de citas no atendidas' },
    { num: '48h',   label: 'Hasta puesta en marcha' },
    { num: '< 1s',  label: 'Tiempo medio de respuesta IA' },
  ];

  return (
    <section style={{
      paddingBlock: 'var(--space-20)',
      paddingInline: 'var(--container-pad)',
      background: 'var(--bg-inverted)',
      color: 'var(--fg-inverted)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ marginBottom: 48, maxWidth: 600 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-blue-300)',
            marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
            whiteSpace: 'nowrap',
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--color-blue-300)' }}></span>
            Resultados medibles
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 700, lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'white',
          }}>
            Datos reales de los negocios que ya automatizan con nosotros.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 0,
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {items.map((s, i) => (
            <div key={i} style={{
              padding: '32px 4px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              paddingLeft: i === 0 ? 0 : 28,
              paddingRight: i === items.length - 1 ? 0 : 28,
            }}>
              <div style={{
                fontSize: 'clamp(44px, 5vw, 64px)', fontWeight: 800,
                color: 'white', letterSpacing: '-0.04em', lineHeight: 1,
                marginBottom: 12,
              }}><AnimatedStatNum num={s.num} /></div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
