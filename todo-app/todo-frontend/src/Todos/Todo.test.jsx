import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Todo from './Todo'

describe('Todo component', () => {
  const baseTodo = { _id: '1', text: 'Learn testing', done: false }

  it('renders todo text', () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('Learn testing')).toBeInTheDocument()
  })

  it('shows "not done" text when todo is not done', () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
  })

  it('shows "done" text when todo is done', () => {
    const doneTodo = { ...baseTodo, done: true }

    render(
      <Todo
        todo={doneTodo}
        deleteTodo={() => {}}
        completeTodo={() => {}}
      />
    )

    expect(screen.getByText('This todo is done')).toBeInTheDocument()
  })

  it('calls deleteTodo when Delete is clicked', async () => {
    const deleteTodo = vi.fn()
    const user = userEvent.setup()

    render(
      <Todo
        todo={baseTodo}
        deleteTodo={deleteTodo}
        completeTodo={() => {}}
      />
    )

    const button = screen.getByRole('button', { name: /delete/i })
    await user.click(button)

    expect(deleteTodo).toHaveBeenCalledTimes(1)
    expect(deleteTodo).toHaveBeenCalledWith(baseTodo)
  })

  it('calls completeTodo when Set as done is clicked', async () => {
    const completeTodo = vi.fn()
    const user = userEvent.setup()

    render(
      <Todo
        todo={baseTodo}
        deleteTodo={() => {}}
        completeTodo={completeTodo}
      />
    )

    const button = screen.getByRole('button', { name: /set as done/i })
    await user.click(button)

    expect(completeTodo).toHaveBeenCalledTimes(1)
    expect(completeTodo).toHaveBeenCalledWith(baseTodo)
  })
})
