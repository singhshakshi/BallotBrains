export function VintageDivider({ symbol = '✦' }) {
  return (
    <div className="vintage-divider">
      {symbol}
    </div>
  );
}

export function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-6" style={{ color: '#C9A87C' }}>
      <span style={{ fontSize: '0.8rem' }}>❧</span>
      <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C9A87C, transparent)' }} />
      <span style={{ fontSize: '0.9rem' }}>✦</span>
      <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C9A87C, transparent)' }} />
      <span style={{ fontSize: '0.8rem' }}>❧</span>
    </div>
  );
}

export function LoadingTelegram({ message = 'PROCESSING YOUR INQUIRY — STAND BY — STOP' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="telegram-card p-6 rounded-lg text-center" style={{ maxWidth: 400 }}>
        <div className="morse-dots mb-4 justify-center">
          <span></span><span></span><span></span><span></span>
        </div>
        <p className="loading-telegram text-sm m-0">{message}</p>
      </div>
    </div>
  );
}

export function PostageStampBadge({ label, color = '#1C3557', small = false }) {
  return (
    <span
      className="postage-stamp"
      style={{
        color,
        borderColor: color,
        fontSize: small ? '0.65rem' : '0.75rem',
        padding: small ? '3px 8px' : '6px 12px',
      }}
    >
      {label}
    </span>
  );
}

export function RubberStamp({ text, color = '#B33A3A', rotation = -5 }) {
  return (
    <span
      className="rubber-stamp"
      style={{ color, borderColor: color, transform: `rotate(${rotation}deg)` }}
    >
      {text}
    </span>
  );
}

export function PageFooter() {
  return (
    <footer className="py-8 mt-12">
      <OrnamentalDivider />
      <div className="flex items-center justify-center gap-4">
        <div className="ink-blot" />
        <p className="font-elite text-xs text-center m-0" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
          VOTEIQ — ELECTION INTELLIGENCE — EST. 2024
        </p>
        <div className="ink-blot" style={{ borderRadius: '40% 50% 30% 60%' }} />
      </div>
      <p className="font-caveat text-sm text-center mt-2" style={{ color: '#C9A87C' }}>
        "An informed voter is democracy's greatest asset"
      </p>
    </footer>
  );
}
