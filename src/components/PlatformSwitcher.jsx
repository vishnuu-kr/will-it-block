import { motion } from 'framer-motion'

const platforms = [
    { id: 'tiktok', label: 'TikTok' },
    { id: 'reels', label: 'Reels' },
    { id: 'shorts', label: 'Shorts' },
]

export default function PlatformSwitcher({ selected, onSelect, isDark }) {
    return (
        <div className="segmented-control">
            {platforms.map((p) => (
                <button
                    key={p.id}
                    className={selected === p.id ? 'active' : ''}
                    onClick={() => onSelect(p.id)}
                    style={{ position: 'relative' }}
                >
                    {selected === p.id && (
                        <motion.div
                            layoutId="segment-indicator"
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: 8,
                                background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                                boxShadow: isDark
                                    ? '0 1px 4px rgba(0,0,0,0.4)'
                                    : '0 1px 4px rgba(0,0,0,0.1)',
                            }}
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                    )}
                    <span style={{ position: 'relative', zIndex: 1 }}>{p.label}</span>
                </button>
            ))}
        </div>
    )
}
