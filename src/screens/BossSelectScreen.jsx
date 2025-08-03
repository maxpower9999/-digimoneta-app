import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../store/useGameStore'

const BossSelectScreen = () => {
  const navigate = useNavigate()
  const { employerType, setEmployerType } = useGameStore()

  const characters = [
    {
      id: 'boss_hardliner',
      name: 'Hardliner',
      tags: ['strukturiert', 'emotionslos', 'regelgetrieben'],
      sprite: '👔',
      description: 'Ein Chef, der sich strikt an Regeln und Budgets hält. Schwach gegen Marktdaten und Fakten.',
      difficulty: 'Mittel',
      weakness: 'Marktwert-Attacke'
    },
    {
      id: 'boss_sparfuchs',
      name: 'Sparfuchs',
      tags: ['budgetfixiert', 'bonusorientiert', 'kreativ'],
      sprite: '💰',
      description: 'Fokussiert auf Kostenkontrolle und Bonusmodelle. Widerstandsfähig gegen Team-Argumente.',
      difficulty: 'Schwer',
      weakness: 'Leistungs-Combo'
    },
    {
      id: 'boss_loyaler',
      name: 'Loyaler Boss',
      tags: ['teamzentriert', 'bindungsoffen', 'entwicklungsfreundlich'],
      sprite: '🤝',
      description: 'Wertschätzt das Team und ist offen für Entwicklung. Schwach gegen Leistungsnachweise.',
      difficulty: 'Einfach',
      weakness: 'Team-Bonus-Schlag'
    }
  ]

  const handleBossSelect = (bossId) => {
    setEmployerType(bossId.replace('boss_', ''))
  }

  const handleStartBattle = () => {
    if (employerType) {
      navigate('/battle')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Wähle deinen Gegner</h1>
          <p className="text-xl text-gray-300">Jeder Chef-Typ hat unterschiedliche Stärken und Schwächen</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`card cursor-pointer transition-all duration-300 hover:scale-105 ${
                employerType === character.id.replace('boss_', '') 
                  ? 'ring-4 ring-primary-500 bg-gray-700' 
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => handleBossSelect(character.id)}
            >
              <div className="text-center">
                <div className="text-8xl mb-4">{character.sprite}</div>
                <h3 className="text-2xl font-bold mb-2">{character.name}</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {character.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-600 text-sm rounded-full text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{character.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Schwierigkeit:</span>
                    <span className={`font-semibold ${
                      character.difficulty === 'Einfach' ? 'text-green-400' :
                      character.difficulty === 'Mittel' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {character.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Schwäche:</span>
                    <span className="text-primary-400 font-semibold">{character.weakness}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            onClick={handleStartBattle}
            disabled={!employerType}
            className={`btn-primary text-xl px-12 py-4 ${
              !employerType ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {employerType ? 'Kampf starten' : 'Wähle einen Gegner'}
          </button>
        </motion.div>

        {employerType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <div className="card inline-block">
              <h3 className="text-lg font-semibold mb-2">Tipp für den Kampf</h3>
              <p className="text-gray-300">
                {employerType === 'hardliner' && 'Nutze Marktdaten und Fakten. Hardliner sind schwach gegen objektive Argumente.'}
                {employerType === 'sparfuchs' && 'Fokussiere dich auf Leistungsnachweise. Sparfüchse sind widerstandsfähig gegen Team-Argumente.'}
                {employerType === 'loyaler' && 'Betone deine Teamarbeit und Entwicklung. Loyaler Boss schätzt kollektive Erfolge.'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default BossSelectScreen