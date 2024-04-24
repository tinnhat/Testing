import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByText('Docs')
 
    expect(heading).toBeInTheDocument()
  })
})