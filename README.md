A lightweight library for synchronizing React context state across browser tabs or windows using the Broadcast Channel API.

---

## ✨ Features

- **State Synchronization:** Share and sync state across multiple tabs/windows.
- **React Integration:** Easily integrate with React context and hooks.
- **Minimal Dependencies:** Built with zero external dependencies apart from React.
- **TypeScript Support:** Fully typed for better developer experience.

---

## 📦 Installation

Install the package via NPM:

```bash
npm install react-context-sync
```

or via Yarn:

```bash
yarn add react-context-sync
```

---

## 🚀 Usage Example

Here's how to synchronize context state across tabs with `react-context-sync`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { SyncProvider, useSyncContext } from 'react-context-sync';

// Step 1: Define the initial state and reducer
const initialState = { count: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Step 2: Create the main App component with SyncProvider
const App = () => (
  <SyncProvider
    initialState={initialState}
    reducer={reducer}
    channelName="my-app-sync"
  >
    <Counter />
  </SyncProvider>
);

// Step 3: Create a Counter component that uses the shared context
const Counter = () => {
  const { state, dispatch } = useSyncContext();

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## ⚙️ API

### **`SyncProvider`**
The `SyncProvider` component wraps your application and synchronizes state across tabs.

#### Props:
| Name           | Type               | Required | Description                                 |
|----------------|--------------------|----------|---------------------------------------------|
| `initialState` | `any`             | ✅        | The initial state of the context.           |
| `reducer`      | `(state, action) => state` | ✅ | A reducer function to handle actions.       |
| `channelName`  | `string`           | ✅        | A unique name for the BroadcastChannel.     |

---

### **`useSyncContext`**
A hook to access the synchronized context.

#### Returns:
| Name     | Type         | Description                                   |
|----------|--------------|-----------------------------------------------|
| `state`  | `any`        | The current state of the context.             |
| `dispatch` | `(action) => void` | Function to dispatch an action to the reducer. |

---

## 🐜 License

This project is licensed under the MIT License.

