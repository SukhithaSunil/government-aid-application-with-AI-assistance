import axiosInstance from '../../util/axiosInstance'

export const fetchSuggestion = async (fieldName) => {
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
          content: `Help me write the ${fieldName}" field. I am unemployed with no income. Help me describe my financial hardship.'}`,
        },
      ],
    })

    return res.data.choices[0].message.content
  } catch (error) {
    throw new Error(error.customMessage)
  }
}
