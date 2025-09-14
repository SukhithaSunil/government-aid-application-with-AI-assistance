import {useState, useCallback} from 'react'
import axiosInstance from '../util/axiosInstance'
import {useTranslation} from 'react-i18next'

export const useAISuggestion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [suggestion, setSuggestion] = useState('')
  const {t} = useTranslation()

  const fetchSuggestion = useCallback(async (fieldName) => {
    setLoading(true)
    setError(null)

    try {
      const res = await axiosInstance.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are helping a user write about their financial hardship for a form.',
          },
          {
            role: 'user',
            content: `Help me write the "${fieldName}" field. I am unemployed with no income. Help me describe my financial hardship.`,
          },
        ],
      })

      const content = res.data.choices[0].message.content
      setSuggestion(content)
      return content
    } catch (err) {
      setError(t('failedToFetchSuggestion') || err)
      // setSuggestion('Would you like the popup to support rich editing (e.g., a textarea inside the modal instead of a prompt()), or is this good for now?')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    fetchSuggestion,
    suggestion,
    loading,
    error,
  }
}
