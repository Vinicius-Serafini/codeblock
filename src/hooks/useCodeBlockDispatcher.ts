import { useContext } from "react";
import { CodeBlockDispatchContext } from "../context/CodeBlockContext";
import { CodeBlockReducerAction } from "../reducers/codeBlockReducer";

export const useCodeBlockDispatcher = () => {
  return useContext(CodeBlockDispatchContext) as React.Dispatch<CodeBlockReducerAction>;
}