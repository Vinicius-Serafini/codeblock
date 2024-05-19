import { useContext } from "react"
import { CodeBlockContext } from "../context/CodeBlockContext"
import { CodeBlockReducerState } from "../reducers/codeBlockReducer";

export const useCodeBlockState = () => {
  return useContext(CodeBlockContext) as CodeBlockReducerState;
}