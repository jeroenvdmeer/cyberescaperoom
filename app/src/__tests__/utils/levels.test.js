import { describe, it, expect } from 'vitest'
import getLevelTexts from '../../utils/levels'

describe('getLevelTexts', () => {
  it('returns an object with intro, hints, and success for levels 1 through 7', () => {
    for (let level = 1; level <= 7; level++) {
      const result = getLevelTexts('en', level)
      expect(result, `level ${level} should not be null`).toBeTruthy()
      expect(result).toHaveProperty('intro')
      expect(result).toHaveProperty('hints')
      expect(result).toHaveProperty('success')
    }
  })

  it('returns a hints array with at least one entry for each level', () => {
    for (let level = 1; level <= 7; level++) {
      const result = getLevelTexts('en', level)
      expect(Array.isArray(result.hints)).toBe(true)
      expect(result.hints.length).toBeGreaterThan(0)
    }
  })

  it('returns falsy for level 8 (triggers the Completed screen)', () => {
    expect(getLevelTexts('en', 8)).toBeFalsy()
  })

  it('returns null for an unknown language', () => {
    expect(getLevelTexts('xx', 1)).toBeNull()
  })
})
