import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChallengeComponent } from '../../ChallengeComponent';
import { mockColumnConfig } from '../mockData';

// Mock the mock data to control initial state
const mockService = {
  fetchTasks: async () => [],
  fetchColumns: async () => mockColumnConfig,
};

describe('TaskBoard Integration Tests', () => {

  describe('Column Rendering', () => {
    it('renders all three columns with correct titles', async () => {
      render(<ChallengeComponent taskService={mockService}/>);

      await waitFor(() => {
        expect(screen.getByText('To Do')).toBeInTheDocument();
        expect(screen.getByText('In Progress')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
      }, { timeout: 2000 });
    });

    it('displays tasks in correct columns based on status', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Test Task');
      await user.click(button);

      // Task should appear in TODO column
      await waitFor(() => {
        const todoColumn = screen.getByLabelText('Tasks in To Do');
        expect(todoColumn).toHaveTextContent('Test Task');
      });
    });
  });

  describe('Task Creation Flow', () => {
    it('user can type in task input field', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      await user.type(input, 'My New Task');

      expect(input).toHaveValue('My New Task');
    });

    it('submit button becomes enabled with input', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      expect(button).toBeDisabled();

      await user.type(input, 'New Task');

      expect(button).not.toBeDisabled();
    });

    it('clicking submit creates task in TODO column', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      await user.type(input, 'Created Task');
      expect(button).not.toBeDisabled();

      await user.click(button);
      

      await waitFor(
        () => {
          const task = screen.getByText('Created Task');
          expect(task).toBeInTheDocument();
        },
        { timeout: 2000 } // increase if needed
      );
    });

    it('input field clears after creation', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      await user.type(input, 'Task to Clear');
      await user.click(button);

      await waitFor(() => {
        expect(input).toHaveValue('');
      });
    });

    it('multiple tasks can be created sequentially', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      // Create first task
      await user.type(input, 'First');
      await user.click(button);

      // Create second task
      await user.type(input, 'Second');
      await user.click(button);

      // Create third task
      await user.type(input, 'Third');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
        expect(screen.getByText('Third')).toBeInTheDocument();
      });
    });
  });

  describe('Task Movement Flow - Complete Journey', () => {
    it('task moves from TODO -> IN_PROGRESS -> DONE and back', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Journey Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Journey Task')).toBeInTheDocument();
      });

      // Verify task is in TODO
      let todoColumn = screen.getByLabelText('Tasks in To Do');
      expect(todoColumn).toHaveTextContent('Journey Task');

      // Move to IN_PROGRESS
      let rightButton = screen.getByRole('button', { name: 'Move "Journey Task" right' });
      await user.click(rightButton);

      await waitFor(() => {
        const inProgressColumn = screen.getByLabelText('Tasks in In Progress');
        expect(inProgressColumn).toHaveTextContent('Journey Task');
      });

      // Move to DONE
      rightButton = screen.getByRole('button', { name: 'Move "Journey Task" right' });
      await user.click(rightButton);

      await waitFor(() => {
        const doneColumn = screen.getByLabelText('Tasks in Done');
        expect(doneColumn).toHaveTextContent('Journey Task');
      });

      // Move back to IN_PROGRESS
      const leftButton = screen.getByRole('button', { name: 'Move "Journey Task" left' });
      await user.click(leftButton);

      await waitFor(() => {
        const inProgressColumn = screen.getByLabelText('Tasks in In Progress');
        expect(inProgressColumn).toHaveTextContent('Journey Task');
      });

      // Move back to TODO
      const leftButton2 = screen.getByRole('button', { name: 'Move "Journey Task" left' });
      await user.click(leftButton2);

      await waitFor(() => {
        todoColumn = screen.getByLabelText('Tasks in To Do');
        expect(todoColumn).toHaveTextContent('Journey Task');
      });
    });

    it('task disappears from old column and appears in new column', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Moving Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Moving Task')).toBeInTheDocument();
      });

      // Verify task is in TODO only
      const todoColumn = screen.getByLabelText('Tasks in To Do');
      const inProgressColumn = screen.getByLabelText('Tasks in In Progress');
      expect(todoColumn).toHaveTextContent('Moving Task');
      expect(inProgressColumn).not.toHaveTextContent('Moving Task');

      // Move to IN_PROGRESS
      const rightButton = screen.getByRole('button', { name: 'Move "Moving Task" right' });
      await user.click(rightButton);

      // Task should now be in IN_PROGRESS only
      await waitFor(() => {
        expect(inProgressColumn).toHaveTextContent('Moving Task');
        expect(todoColumn).not.toHaveTextContent('Moving Task');
      });
    });
  });

  describe('Boundary Conditions', () => {
    it('task in TODO column has disabled left button and enabled right button', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Boundary Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Boundary Task')).toBeInTheDocument();
      });

      const leftButton = screen.getByRole('button', { name: 'Move "Boundary Task" left' });
      const rightButton = screen.getByRole('button', { name: 'Move "Boundary Task" right' });

      expect(leftButton).toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });

    it('task in DONE column has disabled right button and enabled left button', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task and move it to DONE
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Done Boundary Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Done Boundary Task')).toBeInTheDocument();
      });

      // Move to IN_PROGRESS
      let rightButton = screen.getByRole('button', { name: 'Move "Done Boundary Task" right' });
      await user.click(rightButton);

      // Move to DONE
      await waitFor(() => {
        rightButton = screen.getByRole('button', { name: 'Move "Done Boundary Task" right' });
      });
      await user.click(rightButton);

      await waitFor(() => {
        const doneColumn = screen.getByLabelText('Tasks in Done');
        expect(doneColumn).toHaveTextContent('Done Boundary Task');
      });

      const leftButton = screen.getByRole('button', { name: 'Move "Done Boundary Task" left' });
      rightButton = screen.getByRole('button', { name: 'Move "Done Boundary Task" right' });

      expect(leftButton).not.toBeDisabled();
      expect(rightButton).toBeDisabled();
    });

    it('task in IN_PROGRESS has both buttons enabled', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      // Create a task and move to IN_PROGRESS
      const button = screen.getByRole('button', { name: /add task/i });
      await user.type(input, 'Middle Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Middle Task')).toBeInTheDocument();
      });

      // Move to IN_PROGRESS
      const rightButton = screen.getByRole('button', { name: 'Move "Middle Task" right' });
      await user.click(rightButton);

      await waitFor(() => {
        const inProgressColumn = screen.getByLabelText('Tasks in In Progress');
        expect(inProgressColumn).toHaveTextContent('Middle Task');
      });

      const leftButton = screen.getByRole('button', { name: 'Move "Middle Task" left' });
      const rightButton2 = screen.getByRole('button', { name: 'Move "Middle Task" right' });

      expect(leftButton).not.toBeDisabled();
      expect(rightButton2).not.toBeDisabled();
    });
  });

  describe('Multiple Tasks', () => {
    it('multiple tasks can exist in same column', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      // Create three tasks in TODO
      await user.type(input, 'Task A');
      await user.click(button);
      await user.type(input, 'Task B');
      await user.click(button);
      await user.type(input, 'Task C');
      await user.click(button);

      await waitFor(() => {
        const todoColumn = screen.getByLabelText('Tasks in To Do');
        expect(todoColumn).toHaveTextContent('Task A');
        expect(todoColumn).toHaveTextContent('Task B');
        expect(todoColumn).toHaveTextContent('Task C');
      });
    });

    it('moving one task does not affect others', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      // Create two tasks
      await user.type(input, 'Static Task');
      await user.click(button);
      await user.type(input, 'Moving Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Static Task')).toBeInTheDocument();
        expect(screen.getByText('Moving Task')).toBeInTheDocument();
      });

      // Move only "Moving Task"
      const rightButton = screen.getByRole('button', { name: 'Move "Moving Task" right' });
      await user.click(rightButton);

      await waitFor(() => {
        const inProgressColumn = screen.getByLabelText('Tasks in In Progress');
        expect(inProgressColumn).toHaveTextContent('Moving Task');
      });

      // "Static Task" should still be in TODO
      const todoColumn = screen.getByLabelText('Tasks in To Do');
      expect(todoColumn).toHaveTextContent('Static Task');
      expect(todoColumn).not.toHaveTextContent('Moving Task');
    });

    it('tasks maintain their identity during movement', async () => {
      const user = userEvent.setup();
      render(<ChallengeComponent taskService={mockService}/>);

      const input = await screen.findByLabelText('Task creator input', {}, { timeout: 2000 });

      const button = screen.getByRole('button', { name: /add task/i });

      await user.type(input, 'Identity Task');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Identity Task')).toBeInTheDocument();
      });

      // Move the task
      const rightButton = screen.getByRole('button', { name: 'Move "Identity Task" right' });
      await user.click(rightButton);

      // Task title should remain the same
      await waitFor(() => {
        expect(screen.getByText('Identity Task')).toBeInTheDocument();
      });

      // Button labels should still reference the correct task
      expect(screen.getByRole('button', { name: 'Move "Identity Task" left' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Move "Identity Task" right' })).toBeInTheDocument();
    });
  });
});
