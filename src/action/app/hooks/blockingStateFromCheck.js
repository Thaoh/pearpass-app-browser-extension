import { BLOCKING_STATE } from '../../../shared/constants/nativeMessaging'

/**
 * Popup boot. A failed or timed-out blocking check must still
 * leave the "Just a moment" screen — otherwise redirect waits
 * forever on native messaging with no connection UI.
 */
export const blockingStateFromCheck = (result, error) => {
  if (error) {
    return {
      state: BLOCKING_STATE.CONNECTION,
      error: error.message || String(error)
    }
  }
  if (result?.success) return result.blockingState ?? null
  return {
    state: BLOCKING_STATE.CONNECTION,
    error: result?.error
  }
}
