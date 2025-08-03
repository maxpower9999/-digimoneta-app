import { motion } from 'framer-motion'

const VictoryModal = ({ winner, onNewRound, onExportStrategy, onResetGame }) => {
  const isVictory = winner === 'player'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="card max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">
          {isVictory ? '🏆' : '💀'}
        </div>
        
        <h2 className={`text-2xl font-bold mb-4 ${
          isVictory ? 'text-green-400' : 'text-red-400'
        }`}>
          {isVictory ? 'Du hast die Verhandlung gewonnen!' : 'Niederlage!'}
        </h2>
        
        <p className="text-gray-300 mb-6">
          {isVictory 
            ? 'Glückwunsch! Du hast erfolgreich verhandelt und deine Ziele erreicht.'
            : 'Der Chef war stärker. Versuche es nochmal mit einer anderen Strategie!'
          }
        </p>
        
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewRound}
            className="btn-primary w-full"
          >
            Neue Runde
          </motion.button>
          
          {isVictory && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExportStrategy}
              className="btn-secondary w-full"
            >
              Strategie exportieren
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetGame}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 w-full"
          >
            Neues Spiel
          </motion.button>
        </div>
        
        {isVictory && (
          <div className="mt-6 p-4 bg-green-900 bg-opacity-50 rounded-lg">
            <h3 className="font-semibold text-green-400 mb-2">Tipps für echte Verhandlungen:</h3>
            <ul className="text-sm text-gray-300 space-y-1 text-left">
              <li>• Bereite dich gründlich vor</li>
              <li>• Nutze konkrete Beispiele</li>
              <li>• Höre aktiv zu</li>
              <li>• Bleibe professionell</li>
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default VictoryModal