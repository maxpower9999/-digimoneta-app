import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from './screens/WelcomeScreen'
import SetupScreen from './screens/SetupScreen'
import BossSelectScreen from './screens/BossSelectScreen'
import BattleScreen from './screens/BattleScreen'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/setup" element={<SetupScreen />} />
          <Route path="/boss-select" element={<BossSelectScreen />} />
          <Route path="/battle" element={<BattleScreen />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App