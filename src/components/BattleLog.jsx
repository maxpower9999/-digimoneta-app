import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'

const BattleLog = ({ entries }) => {
  const logRef = useRef(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [entries])

  const getEntryIcon = (type) => {
    switch (type) {
      case 'player_move': return '⚔️'
      case 'employer_move': return '🛡️'
      default: return '💬'
    }
  }

  const getEntryColor = (type) => {
    switch (type) {
      case 'player_move': return 'text-blue-400'
      case 'employer_move': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="battle-hud">
      <h3 className="text-xl font-bold mb-4">Kampfverlauf</h3>
      
      <div 
        ref={logRef}
        className="h-64 overflow-y-auto bg-gray-900 rounded-lg p-4 border border-gray-700 font-mono text-sm"
      >
        <AnimatePresence>
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-center py-8"
            >
              Wähle deinen ersten Zug...
            </motion.div>
          ) : (
            entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 p-2 rounded ${getEntryColor(entry.type)}`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getEntryIcon(entry.type)}</span>
                  <span className="flex-1">{entry.message}</span>
                  {entry.damage && (
                    <span className="text-yellow-400 font-bold">
                      -{entry.damage}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        {entries.length} Einträge
      </div>
    </div>
  )
}

export default BattleLog