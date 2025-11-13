# Every.io Code Challenge


To time box this coding challenge, I have decided not to proceed with the following enehancemnets. Instead, I will explain them in depth in a follow up meeting on this project =).

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── TaskBoard.tsx
│   │   ├── TaskColumn.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskCreator.tsx
│   ├── test/                # Test files
│   │   ├── unit/
│   │   └── integration/
│   ├── App.tsx              # Main App component
│   ├── ChallengeComponent.tsx # Challenge component (add your code here)
│   ├── main.tsx             # App entry point
│   ├── index.css            # Global styles with Tailwind
│   └── setupTests.ts        # Test setup
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Recommended Next Steps

Based on architectural analysis, here are suggested improvements to make this codebase production-ready:

### High Priority

1. **Type System Organization**
   - Create `src/types/index.ts` to centralize all type definitions (Task, TaskStatus, ColumnConfig)
   - Currently types are scattered across files, creating import dependencies on component files

2. **Separate Business Logic from UI**
   - Extract state management to `src/hooks/useTasks.ts` custom hook
   - Move status transition logic to `src/utils/taskStatusTransitions.ts`
   - Create data-driven approach for status transitions instead of switch statements

3. **File Organization**
   - Create `src/constants/columns.ts` for static column configuration
   - Remove columns from React state (they're static config, not dynamic data)

### Medium Priority

5. **Performance Optimization**
   - Add `useMemo` to TaskBoard for task filtering (currently O(n × 3) on every render)
   - Wrap callbacks in `useCallback` to prevent unnecessary re-renders
   - Add `React.memo` to TaskCard component (most frequently rendered)

6. **Error Handling & Resilience**
   - Add Error Boundary component for production readiness
   - Add loading and error states to UI
   - Implement proper API abstraction layer (replace setTimeout simulation)

### Architectural Benefits

These changes would achieve:
- **Separation of Concerns**: Business logic decoupled from UI components
- **Testability**: Pure functions testable independently of React
- **Scalability**: Memoization and optimization for 100+ tasks
- **Maintainability**: Clear file organization and single responsibility
- **Type Safety**: Centralized types preventing circular dependencies
- **Production Readiness**: Proper ID generation, error handling, and performance optimization

### Proposed Enhanced Structure

```
src/
├── components/          # Presentation layer (UI only)
├── hooks/              # Custom hooks (state management)
├── utils/              # Pure business logic functions
├── types/              # TypeScript type definitions
├── constants/          # Static configuration
├── data/               # Mock/seed data
└── test/               # Test files
```

This architecture follows React best practices with clear separation between presentation, business logic, and data layers.





https://www.loom.com/share/3df7fcb5424644638b00724cb178e2ff

## Getting Started with the Every.io engineering challenge.

Thanks for taking the time to complete the Every.io code challenge. Don't worry, it's not too hard, and please do not spend more than an hour or two. We know you have lots of these to do, and it can be very time consuming. If you feel like adding fancy animations, or getting all hip and fresh with the design, go ahead, but it won't earn you any extra points.

The biggest factor will be your code:

- How readable is your code.
- How did you organize your components.
- Are there any bugs.

## Before you start

Feel free to fork this repo. If you want to keep things private, that's understandable and we are totally okay with that. Once you finish send an invite to these users:

- @barrypeterson
- @jmatusevich
- @falecci
- @danfsd
- @mssodhi

## Requirements

See the [prototype](https://www.figma.com/proto/kd49ArXbBt0vi1kBSLkmC1/Code-Challenge?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1) for an example.

You will be creating a basic todo list, with the following requirements.

### The list has 3 columns. Similar to Trello.

- Todo
- In Progress
- Done

### Each list item has a right and left arrow button.

The right arrow moves the list item to the next column:

- Todo to In Progress
- In Progress to Done

The Left arrow moves the list item to the previous column:

- Done to In Progress
- In Progress to Todo

### Button States

- If the list item is in the first column, the left button should be **disabled**
- If the list item is in the last column, the right button should be **disabled**

### Adding New Items

There should be a form with a text input below the columns. When the user submits the form, the text from the text input should be added to a new todo item in the first column.

---

## Tech Stack

- **React 18**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Vitest**
- **ESLint**

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Building

Build for production:

```bash
npm run build
```

### Testing

Run tests:

```bash
npm run test
```

Run tests with UI:

```bash
npm run test:ui
```

### Preview Production Build

```bash
npm run preview
```
