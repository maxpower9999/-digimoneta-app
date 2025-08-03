import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const WelcomeScreen = () => {
  const navigate = useNavigate()

  const handleStartSimulation = () => {
    navigate('/setup')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700"
    >
      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            DigiMoneta
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Willkommen in der Gehaltskampf-Arena
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            Trainiere deine Skills – besiege den Boss – hol dir, was du verdienst!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={handleStartSimulation}
            className="btn-primary text-2xl px-12 py-4 text-white font-bold rounded-xl shadow-2xl hover:shadow-indigo-500/25"
          >
            Simulation starten
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="card text-center">
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-semibold mb-2">Strategische Kämpfe</h3>
            <p className="text-gray-300">Nutze verschiedene Verhandlungstechniken gegen unterschiedliche Chef-Typen</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Skill-Training</h3>
            <p className="text-gray-300">Verbessere deine Verhandlungsfähigkeiten durch praktische Übung</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Erfolg sichern</h3>
            <p className="text-gray-300">Lerne, wie du deine Ziele in echten Verhandlungen erreichst</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WelcomeScreen