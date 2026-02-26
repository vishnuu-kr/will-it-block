import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutTemplate, Shield, Info, X } from 'lucide-react'
import ThemeToggle from './components/ThemeToggle'
import MediaDropzone from './components/MediaDropzone'
import MediaCanvas from './components/MediaCanvas'
import PlatformSwitcher from './components/PlatformSwitcher'
import OpacitySlider from './components/OpacitySlider'
import SafetyToggle from './components/SafetyToggle'

export default function App() {
  // ── Persisted state ─────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('wib-theme')
    return saved ? saved === 'dark' : true
  })

  const [platform, setPlatform] = useState(() => {
    return localStorage.getItem('wib-platform') || 'tiktok'
  })

  // ── UI state ────────────────────────────────────────
  const [overlayOpacity, setOverlayOpacity] = useState(0.85)
  const [showAds, setShowAds] = useState(false)
  const [showGhost, setShowGhost] = useState(false)
  const [mediaFile, setMediaFile] = useState(null)
  const [mediaType, setMediaType] = useState(null) // 'image' | 'video'
  const [showInfo, setShowInfo] = useState(false)

  // ── Theme sync ──────────────────────────────────────
  useEffect(() => {
    document.body.classList.toggle('light', !isDark)
    localStorage.setItem('wib-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('wib-platform', platform)
  }, [platform])

  // ── Handlers ────────────────────────────────────────
  const toggleTheme = useCallback(() => setIsDark(d => !d), [])
  const toggleAds = useCallback(() => setShowAds(a => !a), [])
  const toggleGhost = useCallback(() => setShowGhost(g => !g), [])

  const handleFileSelect = useCallback((file) => {
    const url = URL.createObjectURL(file)
    setMediaFile(url)
    setMediaType(file.type.startsWith('video/') ? 'video' : 'image')
  }, [])

  const clearMedia = useCallback(() => {
    if (mediaFile) URL.revokeObjectURL(mediaFile)
    setMediaFile(null)
    setMediaType(null)
  }, [mediaFile])

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Header ───────────────────────────────────── */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: `0.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: isDark ? '#fff' : '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? '0 4px 12px rgba(255,255,255,0.15)' : '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            <LayoutTemplate size={22} color={isDark ? '#000' : '#fff'} strokeWidth={2.5} />
          </div>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
            }}>
              Will it Block?
            </h1>
            <p style={{
              fontSize: '12px',
              color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
              fontWeight: 600,
              letterSpacing: '0.2px',
            }}>
              Content Safety Preview Studio
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowInfo(i => !i)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
              border: `0.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'}`,
              cursor: 'pointer',
              color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            }}
          >
            <Info size={16} strokeWidth={2} />
          </motion.button>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>

      {/* ── Info Banner ──────────────────────────────── */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="glass-panel"
            style={{ padding: '16px 20px', overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '6px',
                  color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)',
                }}>
                  How it works
                </p>
                <p style={{
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)',
                }}>
                  Upload your media - choose a platform - see exactly where the UI covers your content.
                  Toggle "Ads/Shop" for ad placements - enable the 4:5 ghost for Instagram cropping.
                  Everything runs locally in your browser - no uploads - no servers.
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowInfo(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Layout ──────────────────────────────── */}
      <div style={{
        display: 'flex',
        gap: '24px',
        flex: 1,
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}>
        {/* Canvas Panel - order 2 on mobile so upload appears first */}
        <div
          className="canvas-panel"
          style={{
            flex: '1 1 340px',
            maxWidth: '420px',
            minWidth: '280px',
            margin: '0 auto',
          }}
        >
          <MediaCanvas
            mediaFile={mediaFile}
            mediaType={mediaType}
            platform={platform}
            overlayOpacity={overlayOpacity}
            showAds={showAds}
            showGhost={showGhost}
            isDark={isDark}
          />
        </div>

        {/* Control Panel - order -1 on mobile so upload is first */}
        <div
          className="control-panel"
          style={{
            flex: '1 1 300px',
            maxWidth: '420px',
            minWidth: '280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Media Upload */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
            }}>
              <h2 style={{
                fontSize: '13px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
              }}>
                Media
              </h2>
              {mediaFile && (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={clearMedia}
                  style={{
                    fontSize: '12px',
                    color: '#FF453A',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Remove
                </motion.button>
              )}
            </div>

            {mediaFile ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  {mediaType === 'image' ? (
                    <img src={mediaFile} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <video src={mediaFile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
                <div>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)',
                  }}>
                    {mediaType === 'video' ? 'Video loaded' : 'Image loaded'}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)',
                  }}>
                    Ready for preview
                  </p>
                </div>
              </div>
            ) : (
              <MediaDropzone onFileSelect={handleFileSelect} isDark={isDark} />
            )}
          </div>

          {/* Platform Selection */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
              marginBottom: '14px',
            }}>
              Platform
            </h2>
            <PlatformSwitcher
              selected={platform}
              onSelect={setPlatform}
              isDark={isDark}
            />
          </div>

          {/* Overlay Controls */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)',
            }}>
              Overlay Controls
            </h2>

            <OpacitySlider
              value={overlayOpacity}
              onChange={setOverlayOpacity}
              isDark={isDark}
            />

            <div style={{
              height: '0.5px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            }} />

            <SafetyToggle
              showAds={showAds}
              onToggle={toggleAds}
              isDark={isDark}
            />

            <div style={{
              height: '0.5px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            }} />

            {/* 4:5 Ghost Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Shield size={14} color={isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'} />
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.8)',
                  }}>
                    Safe Zone
                  </span>
                </div>
                <p style={{
                  fontSize: '11px',
                  color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                  marginTop: '2px',
                  paddingLeft: '20px',
                }}>
                  Show content-safe boundaries
                </p>
              </div>
              <motion.button
                onClick={toggleGhost}
                whileTap={{ scale: 0.96 }}
                style={{
                  width: 51,
                  height: 31,
                  borderRadius: 16,
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  background: showGhost ? '#FF453A' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                  transition: 'background 0.3s ease',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <motion.div
                  animate={{ x: showGhost ? 22 : 2 }}
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
          </div>

          {/* Footer */}
          <p style={{
            fontSize: '11px',
            textAlign: 'center',
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            padding: '8px 0 16px',
          }}>
            100% client-side · No uploads · No tracking
          </p>
        </div>
      </div>
    </div>
  )
}
