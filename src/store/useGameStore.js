import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useGameStore = create(
  persist(
    (set, get) => ({
      // Player Profile
      playerProfile: {
        industry: '',
        position: '',
        experience: '',
        goals: [],
        employerBehavior: []
      },
      
      // Game State
      employerType: null,
      battleState: {
        playerHP: 100,
        employerHP: 100,
        battleLog: [],
        currentTurn: 'player',
        gameOver: false,
        winner: null
      },
      
      // Available Moves
      moves: [
        {
          id: 'move_marktwert',
          label: 'Marktwert-Attacke',
          power: 7,
          description: 'Vergleichsdaten aus deiner Branche',
          cooldown: 0
        },
        {
          id: 'move_combo',
          label: 'Leistungs-Combo',
          power: 6,
          description: 'Erfolge aus letztem Projekt',
          cooldown: 0
        },
        {
          id: 'move_bonus',
          label: 'Team-Bonus-Schlag',
          power: 5,
          description: 'Kollektive Leistung als Argument',
          cooldown: 0
        },
        {
          id: 'move_pause',
          label: 'Psychologische Pause',
          power: 4,
          description: 'Ruhe als Verhandlungsmittel',
          cooldown: 0
        }
      ],
      
      // Actions
      setPlayerProfile: (profile) => set({ playerProfile: { ...get().playerProfile, ...profile } }),
      
      setEmployerType: (type) => set({ employerType: type }),
      
      resetBattle: () => set({
        battleState: {
          playerHP: 100,
          employerHP: 100,
          battleLog: [],
          currentTurn: 'player',
          gameOver: false,
          winner: null
        }
      }),
      
      executeMove: (moveId) => {
        const state = get()
        const move = state.moves.find(m => m.id === moveId)
        if (!move) return
        
        // Calculate damage based on move power and employer type
        let damage = move.power
        const employerType = state.employerType
        
        // Type effectiveness
        if (employerType === 'hardliner' && moveId === 'move_marktwert') {
          damage = Math.floor(damage * 1.5) // Hardliner weak to market data
        } else if (employerType === 'sparfuchs' && moveId === 'move_bonus') {
          damage = Math.floor(damage * 0.7) // Sparfuchs resistant to team arguments
        } else if (employerType === 'loyaler' && moveId === 'move_combo') {
          damage = Math.floor(damage * 1.3) // Loyaler weak to performance
        }
        
        // Apply damage
        const newEmployerHP = Math.max(0, state.battleState.employerHP - damage)
        const gameOver = newEmployerHP <= 0
        
        // Add to battle log
        const logEntry = {
          id: Date.now(),
          type: 'player_move',
          message: `${move.label} verursacht ${damage} Schaden!`,
          damage: damage
        }
        
        set({
          battleState: {
            ...state.battleState,
            employerHP: newEmployerHP,
            battleLog: [...state.battleState.battleLog, logEntry],
            gameOver,
            winner: gameOver ? 'player' : null
          }
        })
        
        // If game not over, employer responds
        if (!gameOver) {
          setTimeout(() => get().employerResponse(), 1500)
        }
      },
      
      employerResponse: () => {
        const state = get()
        const employerType = state.employerType
        
        // Employer counter-attacks
        const responses = {
          hardliner: [
            { message: "Das ist nicht in unserem Budget!", damage: 8 },
            { message: "Wir haben feste Gehaltsstrukturen.", damage: 6 },
            { message: "Das widerspricht unseren Richtlinien.", damage: 7 }
          ],
          sparfuchs: [
            { message: "Wir können nur einen Bonus anbieten.", damage: 5 },
            { message: "Das ist zu teuer für uns.", damage: 9 },
            { message: "Vielleicht nächstes Jahr?", damage: 4 }
          ],
          loyaler: [
            { message: "Ich verstehe deine Position.", damage: 3 },
            { message: "Lass uns eine Lösung finden.", damage: 4 },
            { message: "Das Team ist wichtig für uns.", damage: 2 }
          ]
        }
        
        const possibleResponses = responses[employerType] || responses.hardliner
        const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)]
        
        const newPlayerHP = Math.max(0, state.battleState.playerHP - response.damage)
        const gameOver = newPlayerHP <= 0
        
        const logEntry = {
          id: Date.now(),
          type: 'employer_move',
          message: response.message,
          damage: response.damage
        }
        
        set({
          battleState: {
            ...state.battleState,
            playerHP: newPlayerHP,
            battleLog: [...state.battleState.battleLog, logEntry],
            gameOver,
            winner: gameOver ? 'employer' : null
          }
        })
      },
      
      resetGame: () => {
        set({
          playerProfile: {
            industry: '',
            position: '',
            experience: '',
            goals: [],
            employerBehavior: []
          },
          employerType: null,
          battleState: {
            playerHP: 100,
            employerHP: 100,
            battleLog: [],
            currentTurn: 'player',
            gameOver: false,
            winner: null
          }
        })
      }
    }),
    {
      name: 'digimoneta-game-state',
      partialize: (state) => ({
        playerProfile: state.playerProfile,
        employerType: state.employerType
      })
    }
  )
)

export default useGameStore