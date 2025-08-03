import { motion } from 'framer-motion'

const MoveSelector = ({ moves, onMoveSelect, disabled }) => {
  const handleMoveClick = (moveId) => {
    if (!disabled) {
      onMoveSelect(moveId)
    }
  }

  return (
    <div className="battle-hud">
      <h3 className="text-xl font-bold mb-4 text-center">Verfügbare Züge</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {moves.map((move, index) => (
          <motion.button
            key={move.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleMoveClick(move.id)}
            disabled={disabled}
            className={`card text-left p-4 transition-all duration-200 ${
              disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gray-700 hover:scale-105 cursor-pointer'
            }`}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-lg">{move.label}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Power:</span>
                <span className={`px-2 py-1 rounded text-sm font-bold ${
                  move.power >= 7 ? 'bg-red-600 text-white' :
                  move.power >= 6 ? 'bg-orange-600 text-white' :
                  move.power >= 5 ? 'bg-yellow-600 text-black' :
                  'bg-green-600 text-white'
                }`}>
                  {move.power}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-3">{move.description}</p>
            
            {move.cooldown > 0 && (
              <div className="text-xs text-red-400">
                Cooldown: {move.cooldown} Runden
              </div>
            )}
            
            {/* Move Type Indicator */}
            <div className="flex justify-end">
              <span className={`text-xs px-2 py-1 rounded ${
                move.id.includes('marktwert') ? 'bg-blue-600 text-white' :
                move.id.includes('combo') ? 'bg-purple-600 text-white' :
                move.id.includes('bonus') ? 'bg-green-600 text-white' :
                'bg-gray-600 text-white'
              }`}>
                {move.id.includes('marktwert') ? 'Fakten' :
                 move.id.includes('combo') ? 'Leistung' :
                 move.id.includes('bonus') ? 'Team' : 'Psychologie'}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-gray-400"
        >
          Warte auf die Antwort des Chefs...
        </motion.div>
      )}
    </div>
  )
}

export default MoveSelector