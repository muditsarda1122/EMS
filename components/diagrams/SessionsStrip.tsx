// P1: the same question answered from zero in three sessions. Desktop SVG plus a separately re-laid mobile SVG.
export default function SessionsStrip() {
  const days = ["Monday", "Tuesday", "Wednesday"];
  const reasonX = [
    [96, 40],
    [141, 24],
    [170, 56],
    [231, 30],
    [266, 44],
  ];
  const reasonXm = [
    [0, 30],
    [35, 18],
    [58, 36],
    [99, 20],
  ];
  return (
    <figure className="s2-fig">
      <svg className="desk" viewBox="0 0 588 196" role="img" aria-labelledby="s2cap">
        <line x1="534" y1="24" x2="534" y2="194" className="dash" />
        <text x="534" y="14" textAnchor="middle" className="t-note">session ends</text>
        <g className="t-mono-sm">
          {days.map((d, i) => (
            <text key={d} x="0" y={52 + i * 60}>{d}</text>
          ))}
        </g>
        <g className="reason">
          {days.map((d, i) => reasonX.map(([x, w]) => <rect key={`${d}${x}`} x={x} y={45 + i * 60} width={w} height="6" />))}
        </g>
        {days.map((d, i) => (
          <g key={d}>
            <rect x="320" y={34 + i * 60} width="192" height="28" rx="2" className="rec-session" />
            <text x="332" y={52.5 + i * 60} className="t-rec">why users get logged out</text>
          </g>
        ))}
      </svg>
      <svg className="mob" viewBox="0 0 350 236" role="img" aria-labelledby="s2cap">
        <line x1="330" y1="24" x2="330" y2="228" className="dash" />
        <text x="350" y="12" textAnchor="end" className="t-note">session ends</text>
        <g className="t-mono-sm">
          {days.map((d, i) => (
            <text key={d} x="0" y={38 + i * 70}>{d}</text>
          ))}
        </g>
        <g className="reason">
          {days.map((d, i) => reasonXm.map(([x, w]) => <rect key={`${d}${x}`} x={x} y={57 + i * 70} width={w} height="6" />))}
        </g>
        {days.map((d, i) => (
          <g key={d}>
            <rect x="128" y={46 + i * 70} width="186" height="28" rx="2" className="rec-session" />
            <text x="139" y={64.5 + i * 70} className="t-rec">why users get logged out</text>
          </g>
        ))}
      </svg>
      <figcaption className="caption" id="s2cap">Each new session works it out again, from zero.</figcaption>
      <p className="sr-only">
        Three days, Monday to Wednesday. Each day the agent reasons its way to the same conclusion, why users get logged out,
        and the conclusion is lost when the session ends.
      </p>
    </figure>
  );
}
