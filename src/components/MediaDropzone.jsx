import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, Film } from 'lucide-react'

export default function MediaDropzone({ onFileSelect, isDark }) {
    const [isDragOver, setIsDragOver] = useState(false)
    const inputRef = useRef(null)

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            onFileSelect(file)
        }
    }, [onFileSelect])

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false)
    }, [])

    const handleClick = useCallback(() => {
        inputRef.current?.click()
    }, [])

    const handleChange = useCallback((e) => {
        const file = e.target.files[0]
        if (file) onFileSelect(file)
    }, [onFileSelect])

    return (
        <motion.div
            className={`dropzone ${isDragOver ? 'drag-over' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            whileTap={{ scale: 0.98 }}
            style={{
                padding: '40px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                minHeight: '160px',
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleChange}
                style={{ display: 'none' }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={isDragOver ? 'active' : 'idle'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                >
                    <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isDragOver
                            ? 'rgba(10, 132, 255, 0.15)'
                            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        transition: 'background 0.3s',
                    }}>
                        <Upload
                            size={24}
                            strokeWidth={1.5}
                            color={isDragOver ? '#0A84FF' : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                            marginBottom: '4px',
                        }}>
                            Drop your media here
                        </p>
                        <p style={{
                            fontSize: '12px',
                            color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                        }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Image size={12} /> Images
                            </span>
                            {' · '}
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <Film size={12} /> Videos
                            </span>
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}
