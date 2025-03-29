export const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export const PROCESSING_EVENTS = {
  // global states
  UNAUTHORIZED: 'procesing-unauthorized',
  NO_SCREENSHOTS: 'processing-no-screenshots',
  API_KEY_OUT_OF_CREDITS: 'processing-api-key-out-of-credits',
  API_KEY_INVALID: 'processing-api-key-invalid',

  // states for generating the initial solution
  INITIAL_START: 'initial-start',
  PROBLEM_EXTRACTED: 'problem-extracted',
  SOLUTION_SUCCESS: 'solution-success',
  INITIAL_SOLUTION_ERROR: 'solution-error',

  // states for processing the debugging
  DEBUG_START: 'debug-start',
  DEBUG_SUCCESS: 'debug-success',
  DEBUG_ERROR: 'debug-error',
};

export const STEP = 50;
