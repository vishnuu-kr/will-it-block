import { motion, AnimatePresence } from 'framer-motion'

/* ──────────────────────────────────────────────────────────
   Professional-grade 2026 platform overlays.
   
   All coordinates are in the 1080×1920 native space.
   The parent MediaCanvas scales this via CSS container
   query: transform: scale(calc(100cqw / 1080))
   
   Three secrets to native look:
   1. Top/bottom readability gradients
   2. Crisp text shadows via drop-shadow
   3. Edge-to-edge fluidity - rail anchored tight
────────────────────────────────────────────────────────── */

function TikTokOverlay({ showAds }) {
    return (
        <div className="absolute inset-0 pointer-events-none w-[1080px] h-[1920px] overflow-hidden text-white" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

            {/* READABILITY GRADIENTS */}
            <div className="absolute top-0 left-0 w-full" style={{ height: 300, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }}></div>
            <div className="absolute bottom-0 left-0 w-full" style={{ height: 840, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 40%, transparent)' }}></div>

            {/* TOP NAV */}
            <div className="absolute flex justify-center items-center" style={{ top: 110, left: 0, right: 0, gap: 50, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                <span style={{ fontSize: 40, fontWeight: 600, opacity: 0.6 }}>Following</span>
                <span className="relative" style={{ fontSize: 40, fontWeight: 700 }}>
                    For You
                    <div className="absolute" style={{ bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 56, height: 6, background: 'white', borderRadius: 3 }}></div>
                </span>
            </div>
            <div className="absolute" style={{ top: 110, right: 40, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>

            {/* RIGHT RAIL */}
            <div className="absolute flex flex-col items-center" style={{ bottom: 60, right: 24, width: 140, gap: 48, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}>

                <div className="relative flex flex-col items-center" style={{ marginBottom: 24 }}>
                    <div style={{ width: 120, height: 120, borderRadius: '50%', padding: 4, background: 'white' }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: -16, width: 52, height: 52, borderRadius: '50%', background: '#FE2C55', border: '4px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </div>
                </div>

                {/* Heart (filled) */}
                <div className="flex flex-col items-center" style={{ marginTop: 8 }}>
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    <span style={{ fontSize: 30, fontWeight: 700, marginTop: 6, letterSpacing: '-0.3px' }}>1.2M</span>
                </div>

                {/* Comment (filled) */}
                <div className="flex flex-col items-center">
                    <svg width="76" height="76" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                    <span style={{ fontSize: 30, fontWeight: 700, marginTop: 6, letterSpacing: '-0.3px' }}>45K</span>
                </div>

                {/* Bookmark (filled) */}
                <div className="flex flex-col items-center">
                    <svg width="76" height="76" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                    <span style={{ fontSize: 30, fontWeight: 700, marginTop: 6, letterSpacing: '-0.3px' }}>112K</span>
                </div>

                {/* Share (filled) */}
                <div className="flex flex-col items-center">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" /></svg>
                    <span style={{ fontSize: 30, fontWeight: 700, marginTop: 6, letterSpacing: '-0.3px' }}>10.1K</span>
                </div>

                {/* Spinning Record */}
                <div className="animate-spin-record" style={{ width: 108, height: 108, borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a2e, #000)', border: '18px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#60a5fa' }}></div>
                </div>
            </div>

            {/* Ads/Shop Banner */}
            {showAds && (
                <div className="absolute" style={{ bottom: 420, left: 0, right: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>
                    <div style={{ margin: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(254, 44, 85, 0.95)', padding: '20px 32px', borderRadius: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                            </div>
                            <div>
                                <span style={{ fontSize: 32, fontWeight: 700, display: 'block' }}>Shop Now</span>
                                <span style={{ fontSize: 24, opacity: 0.8 }}>TikTok Shop · Trending</span>
                            </div>
                        </div>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </div>
            )}

            {/* BOTTOM UI */}
            <div className="absolute" style={{ bottom: 60, left: 40, right: 200, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <p style={{ fontSize: 42, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.3px' }}>@yourusername</p>
                <p style={{ fontSize: 36, lineHeight: 1.4, opacity: 0.95, marginBottom: 6 }}>Check your safe zones before posting</p>
                <p style={{ fontSize: 36, lineHeight: 1.4, opacity: 0.95, marginBottom: 24 }}>#contentcreator #safezone #editing</p>

                {/* Music Ticker */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0.9 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    <div style={{ overflow: 'hidden', width: 480, whiteSpace: 'nowrap' }}>
                        <span className="animate-marquee" style={{ fontSize: 34, fontWeight: 600, display: 'inline-block' }}>
                            Original sound &ndash; Audio Track 2026 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Original sound &ndash; Audio Track 2026
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function ReelsOverlay({ showAds }) {
    return (
        <div className="absolute inset-0 pointer-events-none w-[1080px] h-[1920px] overflow-hidden text-white" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

            {/* READABILITY GRADIENTS */}
            <div className="absolute top-0 left-0 w-full" style={{ height: 340, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)' }}></div>
            <div className="absolute bottom-0 left-0 w-full" style={{ height: 760, background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4) 40%, transparent)' }}></div>

            {/* TOP NAV */}
            <div className="absolute" style={{ top: 56, left: 40, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>
            <div className="absolute" style={{ top: 56, right: 40, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect><circle cx="12" cy="12" r="3"></circle><line x1="18" y1="9" x2="18.01" y2="9"></line></svg>
            </div>

            {/* RIGHT RAIL */}
            <div className="absolute flex flex-col items-center" style={{ bottom: 60, right: 28, width: 140, gap: 48, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}>
                {/* Heart */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>41.9K</span>
                </div>
                {/* Comment */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>55</span>
                </div>
                {/* Repost */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>941</span>
                </div>
                {/* Share */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>23.7K</span>
                </div>
                {/* Three Dots */}
                <div className="flex flex-col items-center" style={{ marginBottom: 4 }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="4" r="2.5" /><circle cx="12" cy="20" r="2.5" /></svg>
                </div>
                {/* Audio Box */}
                <div style={{ width: 72, height: 72, borderRadius: 14, border: '3px solid white', overflow: 'hidden', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                </div>
            </div>

            {/* Ads/Shop CTA */}
            {showAds && (
                <div className="absolute" style={{ bottom: 360, left: 0, right: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>
                    <div style={{ margin: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', padding: '20px 32px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zm-9-1a2 2 0 0 1 4 0v1h-4V6z" /></svg>
                            </div>
                            <div>
                                <span style={{ fontSize: 32, fontWeight: 700, display: 'block' }}>Shop this look</span>
                                <span style={{ fontSize: 24, opacity: 0.7 }}>Tap to browse · Sponsored</span>
                            </div>
                        </div>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                </div>
            )}

            <div className="absolute" style={{ bottom: 60, left: 40, right: 200, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
                    <div style={{ width: 82, height: 82, borderRadius: '50%', background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)', padding: 3 }}>
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                    </div>
                    <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.3px' }}>instauser</span>
                    <button style={{ border: '2px solid rgba(255,255,255,0.8)', borderRadius: 14, padding: '8px 24px', fontSize: 32, fontWeight: 600, background: 'transparent', color: 'white', marginLeft: 8 }}>Follow</button>
                </div>
                <p style={{ fontSize: 36, lineHeight: 1.4, opacity: 0.95, marginBottom: 6 }}>Always preview before you publish</p>
                <p style={{ fontSize: 36, lineHeight: 1.4, opacity: 0.95, marginBottom: 24 }}>#reels #editing #safezone</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: 0.9 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    <span style={{ fontSize: 32 }}>Original audio - instauser</span>
                </div>
            </div>
        </div>
    )
}

function ShortsOverlay({ showAds }) {
    return (
        <div className="absolute inset-0 pointer-events-none w-[1080px] h-[1920px] overflow-hidden text-white" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

            {/* READABILITY GRADIENTS */}
            <div className="absolute top-0 left-0 w-full" style={{ height: 260, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)' }}></div>
            <div className="absolute bottom-0 left-0 w-full" style={{ height: 700, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 40%, transparent)' }}></div>

            {/* TOP NAV */}
            <div className="absolute" style={{ top: 56, left: 40, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </div>
            <div className="absolute flex" style={{ top: 56, right: 40, gap: 40, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <svg width="68" height="68" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2.5" /><circle cx="12" cy="12" r="2.5" /><circle cx="12" cy="19" r="2.5" /></svg>
            </div>

            {/* RIGHT RAIL */}
            <div className="absolute flex flex-col items-center" style={{ bottom: 60, right: 28, width: 140, gap: 50, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}>
                {/* Thumbs Up */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>4K</span>
                </div>
                {/* Thumbs Down */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>Dislike</span>
                </div>
                {/* Comment */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>36</span>
                </div>
                {/* Share */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18v-6H5l7-7 7 7h-4v6H9z"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>Share</span>
                </div>
                {/* Remix */}
                <div className="flex flex-col items-center">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                    <span style={{ fontSize: 30, fontWeight: 600, marginTop: 6, letterSpacing: '-0.3px' }}>66</span>
                </div>
                {/* Audio Square */}
                <div style={{ width: 76, height: 76, borderRadius: 14, overflow: 'hidden', border: '4px solid white', marginTop: 12 }}>
                    <div style={{ width: '100%', height: '100%', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    </div>
                </div>
            </div>

            {/* Ads/Install Banner */}
            {showAds && (
                <div className="absolute" style={{ bottom: 420, left: 0, right: 0, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>
                    <div style={{ margin: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', padding: '20px 32px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ width: 64, height: 64, borderRadius: 10, background: 'linear-gradient(135deg, #4285F4, #34A853)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" /></svg>
                            </div>
                            <div>
                                <span style={{ fontSize: 32, fontWeight: 700, display: 'block' }}>Install Now</span>
                                <span style={{ fontSize: 24, opacity: 0.7 }}>Free on Google Play</span>
                            </div>
                        </div>
                        <div style={{ background: 'white', color: 'black', borderRadius: 999, padding: '10px 28px', fontSize: 28, fontWeight: 700 }}>Install</div>
                    </div>
                </div>
            )}

            {/* BOTTOM UI */}
            <div className="absolute" style={{ bottom: 60, left: 40, right: 200, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}>
                {/* Use Template Pill */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', padding: '12px 26px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', marginBottom: 24 }}>
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    <span style={{ fontSize: 32, fontWeight: 600 }}>Use template</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                    <div style={{ width: 82, height: 82, borderRadius: '50%', background: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.3px' }}>shortsuser</span>
                    <button style={{ background: 'white', color: 'black', borderRadius: 999, padding: '12px 32px', fontSize: 34, fontWeight: 700, border: 'none', marginLeft: 12 }}>Subscribe</button>
                </div>
                <p style={{ fontSize: 36, lineHeight: 1.4, opacity: 0.95 }}>Preview your content layout before posting #shorts #youtube #creator</p>
            </div>
        </div>
    )
}

export default function PlatformOverlay({ platform, opacity, showAds }) {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity: opacity,
                transition: 'opacity 0.15s ease',
                pointerEvents: 'none',
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={platform}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    {platform === 'tiktok' && <TikTokOverlay showAds={showAds} />}
                    {platform === 'reels' && <ReelsOverlay showAds={showAds} />}
                    {platform === 'shorts' && <ShortsOverlay showAds={showAds} />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
