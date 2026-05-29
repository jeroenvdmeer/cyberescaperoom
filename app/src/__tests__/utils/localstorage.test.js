import { describe, it, expect, beforeEach } from 'vitest'
import useLocalstorage from '../../utils/localstorage'

describe('useLocalstorage', () => {
  let storage

  beforeEach(() => {
    localStorage.clear()
    storage = useLocalstorage()
  })

  it('getTokens returns null when localStorage is empty', () => {
    expect(storage.getTokens()).toBeNull()
  })

  it('clear sets tokens to an empty JSON array string', () => {
    storage.clear()
    expect(localStorage.getItem('tokens')).toBe('[]')
  })

  it('update stores a token at the correct level index', () => {
    storage.clear()
    storage.update(1, 'abc123')
    const stored = JSON.parse(localStorage.getItem('tokens'))
    expect(stored[0]).toBe('abc123')
  })

  it('update stores tokens for multiple levels independently', () => {
    storage.clear()
    storage.update(1, 'token_level1')
    storage.update(2, 'token_level2')
    const stored = JSON.parse(localStorage.getItem('tokens'))
    expect(stored[0]).toBe('token_level1')
    expect(stored[1]).toBe('token_level2')
  })
})
