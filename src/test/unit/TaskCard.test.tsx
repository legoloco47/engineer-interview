import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../../components/TaskCard';
import { Task } from '../../ChallengeComponent';

describe('TaskCard', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    status: 'TODO'
  };

  it('renders task title correctly', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('shows both left and right buttons', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    expect(screen.getByRole('button', { name: `Move "Test Task" left` })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: `Move "Test Task" right` })).toBeInTheDocument();
  });

  it('disables left button when canMoveLeft is false', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={false}
        canMoveRight={true}
      />
    );

    const leftButton = screen.getByRole('button', { name: `Move "Test Task" left` });
    expect(leftButton).toBeDisabled();
  });

  it('disables right button when canMoveRight is false', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={false}
      />
    );

    const rightButton = screen.getByRole('button', { name: `Move "Test Task" right` });
    expect(rightButton).toBeDisabled();
  });

  it('enables left button when canMoveLeft is true', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    const leftButton = screen.getByRole('button', { name: `Move "Test Task" left` });
    expect(leftButton).not.toBeDisabled();
  });

  it('enables right button when canMoveRight is true', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    const rightButton = screen.getByRole('button', { name: `Move "Test Task" right` });
    expect(rightButton).not.toBeDisabled();
  });

  it('calls onMoveLeft with correct taskId when left button clicked', async () => {
    const user = userEvent.setup();
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    const leftButton = screen.getByRole('button', { name: `Move "Test Task" left` });
    await user.click(leftButton);

    expect(mockOnMoveLeft).toHaveBeenCalledWith('1');
    expect(mockOnMoveLeft).toHaveBeenCalledTimes(1);
  });

  it('calls onMoveRight with correct taskId when right button clicked', async () => {
    const user = userEvent.setup();
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    const rightButton = screen.getByRole('button', { name: `Move "Test Task" right` });
    await user.click(rightButton);

    expect(mockOnMoveRight).toHaveBeenCalledWith('1');
    expect(mockOnMoveRight).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-labels for accessibility', () => {
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={true}
      />
    );

    expect(screen.getByLabelText('Move "Test Task" left')).toBeInTheDocument();
    expect(screen.getByLabelText('Move "Test Task" right')).toBeInTheDocument();
  });

  it('does not call onMoveLeft when left button is disabled', async () => {
    const user = userEvent.setup();
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={false}
        canMoveRight={true}
      />
    );

    const leftButton = screen.getByRole('button', { name: `Move "Test Task" left` });
    await user.click(leftButton);

    expect(mockOnMoveLeft).not.toHaveBeenCalled();
  });

  it('does not call onMoveRight when right button is disabled', async () => {
    const user = userEvent.setup();
    const mockOnMoveLeft = vi.fn();
    const mockOnMoveRight = vi.fn();

    render(
      <TaskCard
        task={mockTask}
        onMoveLeft={mockOnMoveLeft}
        onMoveRight={mockOnMoveRight}
        canMoveLeft={true}
        canMoveRight={false}
      />
    );

    const rightButton = screen.getByRole('button', { name: `Move "Test Task" right` });
    await user.click(rightButton);

    expect(mockOnMoveRight).not.toHaveBeenCalled();
  });
});
