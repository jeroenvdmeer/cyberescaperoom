import { render, screen } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
import App from '../App'

beforeEach(() => {
  // Clear localStorage so getMaxLevel() returns STARTING_LEVEL=1 without fetching
  localStorage.clear()
  // Provide a fetch mock as a safety net (e.g. if tokens exist)
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve({ level: 1 }),
    ok: true,
  })
})

it('renders App without throwing', () => {
  expect(() => render(<App />)).not.toThrow()
})

it('shows the Welcome heading on the root route', async () => {
  render(<App />)
  // The heading is rendered asynchronously: Container shows a Spinner while
  // useAuth.isLoading is true, then shows the title once the effect settles.
  // findByRole waits (up to 1s) for the element to appear in the DOM.
  expect(await screen.findByRole('heading', { name: /welcome/i })).toBeTruthy()
})
