import { Sun } from 'lucide-react'

export default function OpacitySlider({ value, onChange, isDark }) {
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
            }}>
                <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)',
                }}>
                    Overlay Opacity
                </span>
                <span style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    {Math.round(value * 100)}%
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Sun
                    size={14}
                    strokeWidth={2}
                    color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}
                />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="ios-slider"
                />
                <Sun
                    size={20}
                    strokeWidth={2}
                    color={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'}
                />
            </div>
        </div>
    )
}
