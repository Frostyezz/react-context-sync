import React, { createContext, useEffect, useReducer, useRef } from "react";
import { SyncEngine } from "./SyncEngine";

type SyncProviderProps = {
  children: React.ReactNode;
  initialState: any;
  reducer: React.Reducer<any, any>;
  channelName: string;
};

export const SyncContext = createContext<any | null>(null);

export const SyncProvider: React.FC<SyncProviderProps> = ({
  children,
  initialState,
  reducer,
  channelName,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const syncEngine = useRef(new SyncEngine(channelName)).current;

  useEffect(() => {
    syncEngine.onMessage((action) => {
      dispatch(action);
    });
    return () =>
      // Prevent instant channel closure in development when using React Strict Mode
      // https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development
      process.env.NODE_ENV === "prod" ? syncEngine.close() : undefined;
  }, [syncEngine]);

  const syncDispatch = (action: any) => {
    dispatch(action);
    syncEngine.sendMessage(action);
  };

  return (
    <SyncContext.Provider value={{ state, dispatch: syncDispatch }}>
      {children}
    </SyncContext.Provider>
  );
};
