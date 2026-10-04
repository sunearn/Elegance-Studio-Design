'use client';

import './floorplan-reveal.css';

function FloorPlanDrawing() {
  return <svg className="floorplan-reveal__drawing" viewBox="0 0 760 470" role="img" aria-labelledby="reveal-plan-title reveal-plan-description">
    <title id="reveal-plan-title">Living room architectural floor plan</title>
    <desc id="reveal-plan-description">A minimal open-plan living and dining room layout, with a lounge, dining table, kitchen island, and entry sequence.</desc>
    <g className="floorplan-reveal__plan-lines" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
      <path d="M92 58H649V407H92V58Z" />
      <path d="M92 58V172M92 230V407M92 242H176M236 242H410M470 242H649M410 58V120M410 183V242M410 242V407" />
      <path d="M99 178a58 58 0 0 0 58 58M230 242a58 58 0 0 1 58 58M416 126a58 58 0 0 1 58 58" strokeWidth="1.5" />
    </g>
    <g className="floorplan-reveal__plan-furniture" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="164" y="107" width="174" height="66" rx="2" /><path d="M178 107v66M324 107v66M164 140h174" />
      <rect x="219" y="287" width="119" height="67" rx="2" /><circle cx="278" cy="320" r="17" />
      <rect x="476" y="96" width="119" height="94" rx="2" /><circle cx="494" cy="114" r="7" /><circle cx="577" cy="114" r="7" />
      <path d="M498 268h105v20H498zM514 288v31M587 288v31" />
    </g>
    <g className="floorplan-reveal__plan-labels" fill="currentColor" fontFamily="Arial,sans-serif" fontSize="10" letterSpacing="2">
      <text x="182" y="91">LIVING</text><text x="233" y="378">LOUNGE</text><text x="497" y="78">DINING</text><text x="503" y="350">KITCHEN</text><text x="102" y="393">ENTRY</text>
    </g>
    <path className="floorplan-reveal__dimension" d="M92 432H649M92 425v14M649 425v14" fill="none" stroke="currentColor" strokeWidth="1" />
    <text className="floorplan-reveal__dimension-label" x="370" y="454" textAnchor="middle" fill="currentColor" fontFamily="Arial,sans-serif" fontSize="9" letterSpacing="2">SPATIAL STUDY · 01</text>
  </svg>;
}

export function FloorplanReveal() {
  return <section className="floorplan-reveal floorplan-reveal--single" id="floorplan-reveal" aria-labelledby="floorplan-reveal-title">
    <div className="floorplan-reveal__stage">
      <div className="floorplan-reveal__intro">
        <span className="eyebrow">From drawing to dwelling</span>
        <h2 className="display" id="floorplan-reveal-title">A plan becomes<br />a place.</h2>
      </div>

      <div id="floorplan-plan-layer" className="floorplan-reveal__plan-layer">
        <FloorPlanDrawing />
      </div>
    </div>
  </section>;
}
