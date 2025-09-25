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
export const ERROR_CODES = {
  TIMEOUT: 'ECONNABORTED',
}

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  SERVER_ERROR_START: 500,
}

export const ERROR_MESSAGES = {
  TIMEOUT: 'Request timed out. Please try again.',
  AUTH_FAILED: 'Authentication failed.',
  SERVER_ERROR: 'Server error. Please try again later.',
  GENERIC_ERROR: 'Something went wrong.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
}
export const nameRegex = /^[a-zA-Z\s]+$/
export const mobileNumberRegex = /^[0-9]{9}$/
export const nationalIdRegex = /^[A-Za-z0-9]{8}$/
