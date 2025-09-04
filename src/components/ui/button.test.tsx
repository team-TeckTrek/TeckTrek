// Testing framework: React Testing Library with jest-dom matchers.
// Runner: Vitest or Jest (follows repo's existing setup).
// These tests focus on the Button component API and class-variance-authority variants introduced in the current diff.

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// If your setup doesn't auto-register jest-dom, uncomment the next line:
// import '@testing-library/jest-dom'

import { Button, buttonVariants } from './button'

describe('Button component', () => {
  it('renders a native button by default with data-slot="button"', () => {
    render(<Button>Click me</Button>)
    const btn = screen.getByRole('button', { name: /click me/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('data-slot', 'button')
  })

  it('applies default variant and size classes', () => {
    render(<Button>Defaults</Button>)
    const btn = screen.getByRole('button', { name: /defaults/i })
    const classes = btn.getAttribute('class') || ''
    // Default variant: contains primary background token
    expect(classes).toEqual(expect.stringContaining('bg-primary'))
    // Default size: contains height/spacing tokens
    expect(classes).toEqual(expect.stringContaining('h-9'))
    expect(classes).toEqual(expect.stringContaining('px-4'))
  })

  it('merges custom className alongside variant classes', () => {
    render(<Button className="custom-class">Class merge</Button>)
    const btn = screen.getByRole('button', { name: /class merge/i })
    expect(btn).toHaveClass('custom-class')
    // Still retains a variant token
    expect(btn.className).toEqual(expect.stringContaining('bg-primary'))
  })

  it('supports different variants', () => {
    render(
      <>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </>
    )

    expect(screen.getByRole('button', { name: /delete/i }).className).toEqual(
      expect.stringContaining('bg-destructive')
    )
    expect(screen.getByRole('button', { name: /outline/i }).className).toEqual(
      expect.stringContaining('border')
    )
    expect(screen.getByRole('button', { name: /secondary/i }).className).toEqual(
      expect.stringContaining('bg-secondary')
    )
    expect(screen.getByRole('button', { name: /ghost/i }).className).toEqual(
      expect.stringContaining('hover:bg-accent')
    )
    expect(screen.getByRole('button', { name: /link/i }).className).toEqual(
      expect.stringContaining('text-primary')
    )
  })

  it('supports size variants', () => {
    render(
      <>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="icon button">
          <svg role="img" aria-label="icon" />
        </Button>
      </>
    )
    expect(screen.getByRole('button', { name: /small/i }).className).toEqual(
      expect.stringContaining('h-8')
    )
    expect(screen.getByRole('button', { name: /large/i }).className).toEqual(
      expect.stringContaining('h-10')
    )
    const iconBtn = screen.getByRole('button', { name: /icon button/i })
    expect(iconBtn.className).toEqual(expect.stringContaining('size-9'))
  })

  it('forwards standard button props (type, disabled, aria-invalid)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn ? vi.fn() : jest.fn()

    render(
      <>
        <Button type="submit" onClick={onClick}>Submit</Button>
        <Button disabled>Disabled</Button>
        <Button aria-invalid="true">Invalid</Button>
      </>
    )

    const submit = screen.getByRole('button', { name: /submit/i })
    expect(submit).toHaveAttribute('type', 'submit')
    await user.click(submit)
    expect(onClick).toHaveBeenCalledTimes(1)

    const disabled = screen.getByRole('button', { name: /disabled/i })
    expect(disabled).toBeDisabled()

    const invalid = screen.getByRole('button', { name: /invalid/i })
    expect(invalid).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders asChild, passing classes and data-slot to the child element', () => {
    render(
      <Button asChild variant="link">
        <a href="/docs">Docs</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: /docs/i })
    expect(link).toHaveAttribute('href', '/docs')
    expect(link).toHaveAttribute('data-slot', 'button')
    expect(link.className).toEqual(expect.stringContaining('text-primary'))
  })

  it('buttonVariants returns expected classes for combinations', () => {
    // Validate cva mapping for a few representative combos without rendering
    const defaultClasses = buttonVariants({ variant: 'default', size: 'default' })
    expect(defaultClasses).toEqual(expect.stringContaining('bg-primary'))
    expect(defaultClasses).toEqual(expect.stringContaining('h-9'))

    const destructiveLg = buttonVariants({ variant: 'destructive', size: 'lg' })
    expect(destructiveLg).toEqual(expect.stringContaining('bg-destructive'))
    expect(destructiveLg).toEqual(expect.stringContaining('h-10'))

    // Custom class merging via "className" passthrough
    const merged = buttonVariants({ variant: 'ghost', size: 'sm', className: 'extra' })
    expect(merged).toEqual(expect.stringContaining('hover:bg-accent'))
    expect(merged).toEqual(expect.stringContaining('h-8'))
    expect(merged).toEqual(expect.stringContaining('extra'))
  })

  it('renders children content', () => {
    render(<Button><span data-testid="inner">Child</span></Button>)
    expect(screen.getByTestId('inner')).toBeInTheDocument()
    expect(screen.getByText('Child')).toBeTruthy()
  })
})