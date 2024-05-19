import { ReactNode, createContext, useReducer } from "react";
import { CodeBlockReducer } from "../reducers/codeBlockReducer";

export const CodeBlockContext = createContext({});
export const CodeBlockDispatchContext = createContext({});

type CodeBlockProviderProps = {
  children: ReactNode,
}
export const CodeBlockProvider = ({ children }: CodeBlockProviderProps) => {
  const [codeBlocks, codeBlockDisaptch] = useReducer(CodeBlockReducer, []);

  return (
    <CodeBlockContext.Provider value={codeBlocks}>
      <CodeBlockDispatchContext.Provider value={codeBlockDisaptch}>
        {children}
      </CodeBlockDispatchContext.Provider>
    </CodeBlockContext.Provider>
  );
}