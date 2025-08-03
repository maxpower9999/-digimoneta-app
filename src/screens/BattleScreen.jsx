import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../store/useGameStore'
import BattleHUD from '../components/BattleHUD'
import MoveSelector from '../components/MoveSelector'
import BattleLog from '../components/BattleLog'
import VictoryModal from '../components/VictoryModal'

const BattleScreen = () => {
  const navigate = useNavigate()
  const { 
    employerType, 
    battleState, 
    moves, 
    executeMove, 
    resetBattle, 
    resetGame 
  } = useGameStore()

  useEffect(() => {
    if (!employerType) {
      navigate('/boss-select')
    }
  }, [employerType, navigate])

  const handleMove = (moveId) => {
    executeMove(moveId)
  }

  const handleNewRound = () => {
    resetBattle()
    navigate('/boss-select')
  }

  const handleExportStrategy = () => {
    const strategy = {
      employerType,
      playerProfile: useGameStore.getState().playerProfile,
      battleLog: battleState.battleLog,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(strategy, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `digimoneta-strategy-${employerType}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleResetGame = () => {
    resetGame()
    navigate('/')
  }

  if (!employerType) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">Gehaltsverhandlung</h1>
          <p className="text-gray-300">Gegen {employerType === 'hardliner' ? 'Hardliner' : 
            employerType === 'sparfuchs' ? 'Sparfuchs' : 'Loyaler Boss'}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Battle HUD */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <BattleHUD 
              playerHP={battleState.playerHP}
              employerHP={battleState.employerHP}
              employerType={employerType}
              gameOver={battleState.gameOver}
              winner={battleState.winner}
            />
          </motion.div>

          {/* Right Column - Move Selector */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <MoveSelector 
              moves={moves}
              onMoveSelect={handleMove}
              disabled={battleState.gameOver}
            />
          </motion.div>
        </div>

        {/* Battle Log */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <BattleLog entries={battleState.battleLog} />
        </motion.div>

        {/* Victory Modal */}
        <AnimatePresence>
          {battleState.gameOver && (
            <VictoryModal
              winner={battleState.winner}
              onNewRound={handleNewRound}
              onExportStrategy={handleExportStrategy}
              onResetGame={handleResetGame}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default BattleScreen