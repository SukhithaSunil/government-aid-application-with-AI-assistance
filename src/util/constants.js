export const LANGUAGES = {
  EN: 'en',
  AR: 'ar',
}

export const DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
}

export const LANGUAGE_TO_DIRECTION = {
  [LANGUAGES.EN]: DIRECTION.LTR,
  [LANGUAGES.AR]: DIRECTION.RTL,
}

export const CREATE_USER_API_URL = 'http://localhost:3001/users'

export const AI_ASSISTANCE_API_URL =
  'https://api.openai.com/v1/chat/completions'

export const DateFormat = 'MM/DD/YYYY'

export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
}

export const OPENAI_CONFIG = {
  MODEL: 'gpt-3.5-turbo',
  SYSTEM_MESSAGE: {
    role: 'system',
    content:
      'You are helping a user write about their financial hardship for a form.',
  },
  ROLE: 'user',
  MESSAGE_LIMITS: {
    MIN_WORDS: 30,
    MAX_WORDS: 50,
  },
}
