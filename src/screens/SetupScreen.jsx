import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useGameStore from '../store/useGameStore'

const SetupScreen = () => {
  const navigate = useNavigate()
  const { playerProfile, setPlayerProfile } = useGameStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    industry: playerProfile.industry || '',
    position: playerProfile.position || '',
    experience: playerProfile.experience || '',
    goals: playerProfile.goals || [],
    employerBehavior: playerProfile.employerBehavior || []
  })

  const steps = [
    {
      step: 1,
      label: 'Beruf & Branche',
      fields: [
        {
          type: 'select',
          label: 'Branche',
          name: 'industry',
          options: ['IT', 'Gesundheit', 'Industrie', 'Bildung', 'Marketing']
        },
        {
          type: 'text',
          label: 'Position',
          name: 'position',
          placeholder: 'z. B. Softwareentwickler:in'
        }
      ]
    },
    {
      step: 2,
      label: 'Erfahrung & Ziel',
      fields: [
        {
          type: 'radio',
          label: 'Erfahrung',
          name: 'experience',
          options: ['<1 Jahr', '1–3 Jahre', '3–5 Jahre', '5+ Jahre']
        },
        {
          type: 'checkbox-group',
          label: 'Verhandlungsziel',
          name: 'goals',
          options: ['Gehaltserhöhung', 'Bonus', 'Flexibilität', 'Weiterbildung']
        }
      ]
    },
    {
      step: 3,
      label: 'AG-Verhalten',
      fields: [
        {
          type: 'tag-select',
          label: 'Wie verhält sich dein Chef?',
          name: 'employerBehavior',
          options: ['vermeidet Fixkosten', 'schätzt Team', 'argumentiert mit System', 'ist skeptisch', 'ist fair']
        }
      ]
    }
  ]

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (name, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }))
  }

  const isStepValid = (step) => {
    const stepData = steps[step - 1]
    return stepData.fields.every(field => {
      const value = formData[field.name]
      if (field.type === 'checkbox-group') {
        return value && value.length > 0
      }
      return value && value !== ''
    })
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save profile and navigate to boss select
      setPlayerProfile(formData)
      navigate('/boss-select')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate('/')
    }
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
          >
            <option value="">Bitte wählen...</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
          />
        )
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 focus:ring-primary-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        )
      
      case 'checkbox-group':
        return (
          <div className="space-y-2">
            {field.options.map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData[field.name].includes(option)}
                  onChange={(e) => handleCheckboxChange(field.name, option, e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-gray-700 border-gray-600 rounded focus:ring-primary-500"
                />
                <span className="text-white">{option}</span>
              </label>
            ))}
          </div>
        )
      
      case 'tag-select':
        return (
          <div className="flex flex-wrap gap-2">
            {field.options.map(option => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  const isSelected = formData[field.name].includes(option)
                  handleCheckboxChange(field.name, option, !isSelected)
                }}
                className={`px-4 py-2 rounded-full border transition-all ${
                  formData[field.name].includes(option)
                    ? 'bg-primary-600 border-primary-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card"
        >
          <h1 className="text-3xl font-bold text-center mb-8">Profil-Setup</h1>
          
          {/* Progress Indicator */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step.step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.step ? 'bg-primary-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6">{steps[currentStep - 1].label}</h2>
              
              <div className="space-y-6">
                {steps[currentStep - 1].fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {field.label}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className="btn-secondary"
            >
              {currentStep === 1 ? 'Zurück' : 'Zurück'}
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className={`btn-primary ${!isStepValid(currentStep) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {currentStep === steps.length ? 'Fertig' : 'Weiter'}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SetupScreen