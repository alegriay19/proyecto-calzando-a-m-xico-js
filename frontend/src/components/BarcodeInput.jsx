import { useEffect, useState } from 'react';

export default function BarcodeInput({ onScan }) {
  const [buffer, setBuffer] = useState('');

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (e.key === 'Enter') {
        const code = buffer.trim();
        if (code) onScan?.(code);
        setBuffer('');
      } else if (e.key.length === 1) {
        setBuffer(b => b + e.key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [buffer, onScan]);

  return (
    <input
      className="input"
      placeholder="Escanea o escribe el código y presiona Enter"
      value={buffer}
      onChange={(e) => setBuffer(e.target.value)}
    />
  );
}
