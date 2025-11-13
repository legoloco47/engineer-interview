import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCreator from '../../components/TaskCreator';

describe('TaskCreator', () => {
  it('renders with empty input and disabled button initially', () => {
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    expect(input).toHaveValue('');
    expect(button).toBeDisabled();
  });

  it('enables submit button when input has content', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'New testy task');

    expect(button).not.toBeDisabled();
  });

  it('disables submit button when input is only whitespace', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, '   ');

    expect(button).toBeDisabled();
  });

  it('calls onCreateTask with trimmed value on button click', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, '  Task with spaces  ');
    await user.click(button);

    expect(mockOnCreateTask).toHaveBeenCalledWith('Task with spaces');
    expect(mockOnCreateTask).toHaveBeenCalledTimes(1);
  });

  it('clears input after successful submission', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'New task');
    await user.click(button);

    expect(input).toHaveValue('');
  });

  it('submits on Enter key press', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');

    await user.type(input, 'Task via Enter{Enter}');

    expect(mockOnCreateTask).toHaveBeenCalledWith('Task via Enter');
  });

  it('does not submit when input is empty', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const button = screen.getByRole('button', { name: /add task/i });

    await user.click(button);

    expect(mockOnCreateTask).not.toHaveBeenCalled();
  });

  it('does not submit whitespace-only tasks on Enter', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');

    await user.type(input, '   {Enter}');

    expect(mockOnCreateTask).not.toHaveBeenCalled();
  });

  it('maintains focus on input after submission', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    await user.type(input, 'New task');
    await user.click(button);

    expect(input).toHaveFocus();
  });

  it('allows creating multiple tasks sequentially', async () => {
    const user = userEvent.setup();
    const mockOnCreateTask = vi.fn();
    render(<TaskCreator onCreateTask={mockOnCreateTask} />);

    const input = screen.getByLabelText('Task creator input');
    const button = screen.getByRole('button', { name: /add task/i });

    // First task
    await user.type(input, 'First task');
    await user.click(button);

    // Second task
    await user.type(input, 'Second task');
    await user.click(button);

    // Third task
    await user.type(input, 'Third task');
    await user.click(button);

    expect(mockOnCreateTask).toHaveBeenCalledTimes(3);
    expect(mockOnCreateTask).toHaveBeenNthCalledWith(1, 'First task');
    expect(mockOnCreateTask).toHaveBeenNthCalledWith(2, 'Second task');
    expect(mockOnCreateTask).toHaveBeenNthCalledWith(3, 'Third task');
  });
});
