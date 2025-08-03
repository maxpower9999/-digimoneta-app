import { motion } from 'framer-motion'

const BattleHUD = ({ playerHP, employerHP, employerType, gameOver, winner }) => {
  const getEmployerSprite = () => {
    switch (employerType) {
      case 'hardliner': return '👔'
      case 'sparfuchs': return '💰'
      case 'loyaler': return '🤝'
      default: return '👤'
    }
  }

  const getEmployerName = () => {
    switch (employerType) {
      case 'hardliner': return 'Hardliner'
      case 'sparfuchs': return 'Sparfuchs'
      case 'loyaler': return 'Loyaler Boss'
      default: return 'Chef'
    }
  }

  const getHealthColor = (hp) => {
    if (hp > 70) return 'from-green-500 to-green-400'
    if (hp > 40) return 'from-yellow-500 to-yellow-400'
    return 'from-red-500 to-red-400'
  }

  return (
    <div className="battle-hud">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-bold mb-2">Du</h3>
          <div className="health-bar mb-2">
            <motion.div
              className={`health-fill bg-gradient-to-r ${getHealthColor(playerHP)}`}
              style={{ width: `${playerHP}%` }}
              initial={{ width: '100%' }}
              animate={{ width: `${playerHP}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-300">{playerHP}/100 HP</p>
        </motion.div>

        {/* Employer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={gameOver && winner === 'player' ? { 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {getEmployerSprite()}
          </motion.div>
          <h3 className="text-xl font-bold mb-2">{getEmployerName()}</h3>
          <div className="health-bar mb-2">
            <motion.div
              className={`health-fill bg-gradient-to-r ${getHealthColor(employerHP)}`}
              style={{ width: `${employerHP}%` }}
              initial={{ width: '100%' }}
              animate={{ width: `${employerHP}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-300">{employerHP}/100 HP</p>
        </motion.div>
      </div>

      {/* Game Over Indicator */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 text-center"
        >
          <div className={`text-2xl font-bold ${
            winner === 'player' ? 'text-green-400' : 'text-red-400'
          }`}>
            {winner === 'player' ? '🏆 Sieg!' : '💀 Niederlage!'}
          </div>
          <p className="text-gray-300 mt-2">
            {winner === 'player' 
              ? 'Du hast die Verhandlung gewonnen!' 
              : 'Der Chef war stärker. Versuche es nochmal!'}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default BattleHUD