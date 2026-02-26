import { motion } from 'framer-motion'

export default function SafetyToggle({ showAds, onToggle, isDark }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
                <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)',
                }}>
                    {showAds ? 'Ads / Shop View' : 'Standard View'}
                </span>
                <p style={{
                    fontSize: '11px',
                    color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                    marginTop: '2px',
                }}>
                    {showAds ? 'Shows banner & CTA zones' : 'Default platform UI only'}
                </p>
            </div>

            <motion.button
                onClick={onToggle}
                whileTap={{ scale: 0.96 }}
                style={{
                    width: 51,
                    height: 31,
                    borderRadius: 16,
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    background: showAds ? '#30D158' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                    transition: 'background 0.3s ease',
                    padding: 0,
                    flexShrink: 0,
                }}
            >
                <motion.div
                    animate={{ x: showAds ? 22 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                        width: 27,
                        height: 27,
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        position: 'absolute',
                        top: 2,
                    }}
                />
            </motion.button>
        </div>
    )
}
