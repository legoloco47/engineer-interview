import React, { useState, KeyboardEvent, FormEvent, useRef } from 'react';

type TaskCreatorProps = {
  onCreateTask: (title: string) => void;
};

function TaskCreator({ onCreateTask }: TaskCreatorProps) {
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onCreateTask(trimmed);
    setTitle('');
    inputRef.current?.focus();
  };

  const isEmpty = title.trim().length === 0;

  return (
    <form
        id="task-creator-form"
        onSubmit={handleSubmit}
        className="mt-6 flex items-center gap-4 px-8 pb-6"
        aria-label="Create task"
    >
      <input
        id="task-creator-input"
        aria-label="Task creator input"
        type="text"
        placeholder="Add Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={inputRef}
        className="flex-1 rounded-md border border-gray-400 px-4 py-2 text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 max-w-[300px]"
      />
      <button
        type="submit"   
        id="task-creator-submit-button"
        disabled={isEmpty}
        aria-label="Add task"
        className="flex h-12 w-16 items-center justify-center rounded-lg bg-blue-600 text-2xl font-bold text-white shadow-md disabled:opacity-50"
      >
        +
      </button>
    </form>
  );
}

export default TaskCreator;