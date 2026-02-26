import { useRef, useEffect } from 'react'
import PlatformOverlay from './PlatformOverlay'
import SafeZoneBorder from './FourFiveGhost'

export default function MediaCanvas({
    mediaFile,
    mediaType,
    platform,
    overlayOpacity,
    showAds,
    showGhost,
    isDark,
}) {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current && mediaType === 'video') {
            videoRef.current.load()
            videoRef.current.play().catch(() => { })
        }
    }, [mediaFile, mediaType])

    return (
        <div
            id="media-canvas"
            className="@container"
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '9 / 16',
                maxHeight: '85vh',
                borderRadius: '20px',
                overflow: 'hidden',
                background: isDark ? '#111' : '#E5E5EA',
                border: `0.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
        >
            {/* Media Layer */}
            {mediaFile && mediaType === 'image' && (
                <img
                    src={mediaFile}
                    alt="Uploaded media"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}

            {mediaFile && mediaType === 'video' && (
                <video
                    ref={videoRef}
                    src={mediaFile}
                    loop
                    muted
                    autoPlay
                    playsInline
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}

            {/* Placeholder when no media */}
            {!mediaFile && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                }}>
                    9:16 Preview
                </div>
            )}

            {/* THE MAGIC: Lock overlays to 1080x1920 coordinate space, scale via container query */}
            <div
                className="absolute top-0 left-0 w-[1080px] h-[1920px] origin-top-left pointer-events-none"
                style={{ transform: 'scale(calc(100cqw / 1080px))' }}
            >
                <PlatformOverlay
                    platform={platform}
                    opacity={overlayOpacity}
                    showAds={showAds}
                />

                {/* Safe Zone borders (inside the 1080x1920 space) */}
                {showGhost && <SafeZoneBorder platform={platform} />}
            </div>
        </div>
    )
}
