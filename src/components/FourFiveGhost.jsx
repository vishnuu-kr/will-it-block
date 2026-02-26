import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────────────────
   Premium Safe Zone overlay.
   
   Design philosophy: Figma/Apple-style design guides.
   - Ultra-thin 1px lines instead of thick dashed borders
   - Frosted glass labels instead of emoji badges
   - Subtle hatching pattern in danger zones
   - Elegant green accent for the safe boundary
   - Clean typography with no emojis
   
   All coordinates in 1080×1920 native space.
────────────────────────────────────────────────────────── */

const ZONES = {
    tiktok: { top: 270, bottom: 500, right: 180, label: 'TikTok' },
    reels: { top: 200, bottom: 480, right: 180, label: 'Reels' },
    shorts: { top: 200, bottom: 500, right: 180, label: 'Shorts' },
}

function ZoneLabel({ children, color = 'rgba(255,255,255,0.85)', bg = 'rgba(0,0,0,0.55)', style }) {
    return (
        <div style={{
            position: 'absolute',
            background: bg,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color,
            fontSize: 22,
            fontWeight: 600,
            fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
            padding: '6px 16px',
            borderRadius: 6,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.1)',
            lineHeight: 1.3,
            ...style,
        }}>
            {children}
        </div>
    )
}

export default function SafeZoneBorder({ platform }) {
    const zone = ZONES[platform] || ZONES.tiktok

    // Diagonal stripe pattern for danger zones
    const stripePattern = `repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 8px,
    rgba(255, 59, 48, 0.06) 8px,
    rgba(255, 59, 48, 0.06) 10px
  )`

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={platform}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 pointer-events-none w-[1080px] h-[1920px]"
                style={{ zIndex: 10 }}
            >

                {/* ─── Top danger zone ─── */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: zone.top,
                    background: stripePattern,
                    borderBottom: '1.5px solid rgba(255, 59, 48, 0.45)',
                }} />

                {/* ─── Bottom danger zone ─── */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: zone.bottom,
                    background: stripePattern,
                    borderTop: '1.5px solid rgba(255, 59, 48, 0.45)',
                }} />

                {/* ─── Right rail danger zone ─── */}
                <div style={{
                    position: 'absolute',
                    top: zone.top,
                    right: 0,
                    bottom: zone.bottom,
                    width: zone.right,
                    background: stripePattern,
                    borderLeft: '1.5px solid rgba(255, 59, 48, 0.45)',
                }} />

                {/* ─── Safe zone inner border (the money shot) ─── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                        position: 'absolute',
                        top: zone.top,
                        left: 0,
                        right: zone.right,
                        bottom: zone.bottom,
                        border: '1.5px solid rgba(48, 209, 88, 0.35)',
                        borderRadius: 4,
                    }}
                />

                {/* ─── Corner markers (top-left & bottom-left of safe zone) ─── */}
                {/* Top-left corner */}
                <div style={{ position: 'absolute', top: zone.top - 1, left: 0 }}>
                    <div style={{ width: 40, height: 1.5, background: 'rgba(48, 209, 88, 0.6)' }} />
                    <div style={{ width: 1.5, height: 40, background: 'rgba(48, 209, 88, 0.6)' }} />
                </div>
                {/* Top-right corner of safe zone */}
                <div style={{ position: 'absolute', top: zone.top - 1, right: zone.right }}>
                    <div style={{ width: 40, height: 1.5, background: 'rgba(48, 209, 88, 0.6)', marginLeft: -40 }} />
                    <div style={{ width: 1.5, height: 40, background: 'rgba(48, 209, 88, 0.6)', marginLeft: -1.5 }} />
                </div>
                {/* Bottom-left corner */}
                <div style={{ position: 'absolute', bottom: zone.bottom - 1, left: 0 }}>
                    <div style={{ width: 1.5, height: 40, background: 'rgba(48, 209, 88, 0.6)', marginTop: -40 }} />
                    <div style={{ width: 40, height: 1.5, background: 'rgba(48, 209, 88, 0.6)' }} />
                </div>
                {/* Bottom-right corner of safe zone */}
                <div style={{ position: 'absolute', bottom: zone.bottom - 1, right: zone.right }}>
                    <div style={{ width: 1.5, height: 40, background: 'rgba(48, 209, 88, 0.6)', marginTop: -40, marginLeft: -1.5 }} />
                    <div style={{ width: 40, height: 1.5, background: 'rgba(48, 209, 88, 0.6)', marginLeft: -40 }} />
                </div>

                {/* ─── Dimension lines ─── */}
                {/* Top dimension */}
                <div style={{
                    position: 'absolute',
                    top: zone.top / 2 - 14,
                    right: zone.right + 30,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{
                        background: 'rgba(255, 59, 48, 0.65)',
                        backdropFilter: 'blur(12px)',
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        padding: '4px 12px',
                        borderRadius: 4,
                        letterSpacing: '0.5px',
                    }}>
                        {zone.top}px
                    </div>
                </div>

                {/* Bottom dimension */}
                <div style={{
                    position: 'absolute',
                    bottom: zone.bottom / 2 - 14,
                    right: zone.right + 30,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{
                        background: 'rgba(255, 59, 48, 0.65)',
                        backdropFilter: 'blur(12px)',
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        padding: '4px 12px',
                        borderRadius: 4,
                        letterSpacing: '0.5px',
                    }}>
                        {zone.bottom}px
                    </div>
                </div>

                {/* ─── Safe area label (frosted glass) ─── */}
                <ZoneLabel
                    bg="rgba(48, 209, 88, 0.15)"
                    color="rgba(48, 209, 88, 0.9)"
                    style={{
                        top: zone.top + 20,
                        left: 20,
                        border: '1px solid rgba(48, 209, 88, 0.2)',
                        fontSize: 20,
                    }}
                >
                    {zone.label} Safe Zone
                </ZoneLabel>

            </motion.div>
        </AnimatePresence>
    )
}
