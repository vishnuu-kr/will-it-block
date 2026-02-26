import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ isDark, onToggle }) {
    return (
        <motion.button
            onClick={onToggle}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                border: `0.5px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
            }}
            aria-label="Toggle theme"
        >
            <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? (
                    <Moon size={18} strokeWidth={1.8} color="#fff" />
                ) : (
                    <Sun size={18} strokeWidth={1.8} color="#1C1C1E" />
                )}
            </motion.div>
        </motion.button>
    )
}
