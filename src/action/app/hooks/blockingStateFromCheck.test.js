import { blockingStateFromCheck } from './blockingStateFromCheck'
import { BLOCKING_STATE } from '../../../shared/constants/nativeMessaging'

describe('blockingStateFromCheck', () => {
  it('keeps a successful empty check as unblocked', () => {
    expect(blockingStateFromCheck({ success: true, blockingState: null })).toBe(
      null
    )
  })

  it('keeps pairing/connection from a successful check', () => {
    expect(
      blockingStateFromCheck({
        success: true,
        blockingState: { state: BLOCKING_STATE.PAIRING }
      })
    ).toEqual({ state: BLOCKING_STATE.PAIRING })
  })

  it('turns a failed check into CONNECTION so the sheet can leave loading', () => {
    expect(
      blockingStateFromCheck({ success: false, error: 'Unauthorized' })
    ).toEqual({
      state: BLOCKING_STATE.CONNECTION,
      error: 'Unauthorized'
    })
  })

  it('turns a thrown check into CONNECTION so redirect cannot hang', () => {
    expect(blockingStateFromCheck(undefined, new Error('timed out'))).toEqual({
      state: BLOCKING_STATE.CONNECTION,
      error: 'timed out'
    })
  })
})
