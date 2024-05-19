import { CodeBlockNode } from "../types";

type CodeBlockReducerKind = "INSERT" | "UPDATE" | "DELETE" | "MOVE";

export type CodeBlockReducerAction = {
  type: CodeBlockReducerKind;
  payload: CodeBlockNode;
  targetId?: string
};

export type CodeBlockReducerState = CodeBlockNode[];

const insertAt = (state: CodeBlockReducerState, newNode: CodeBlockNode, targetId: string): CodeBlockReducerState => {
  return state.reduce((acc, node): CodeBlockReducerState => {
    const currentNode = { ...node };

    if (currentNode.id === targetId && Array.isArray(currentNode.children)) {
      currentNode.children = [...currentNode.children, newNode];
    }

    if (currentNode.id !== targetId && currentNode.children) {
      currentNode.children = insertAt(currentNode.children, newNode, targetId);
    }

    return [...acc, currentNode];
  }, [] as CodeBlockReducerState);
}

const removeAt = (state: CodeBlockReducerState, targetId: string): CodeBlockReducerState => {
  return state.reduce((acc, node): CodeBlockReducerState => {
    const currentNode = { ...node };

    if (currentNode.id === targetId) {
      return acc;
    }

    if (currentNode.children) {
      currentNode.children = removeAt(currentNode.children, targetId);
    }

    return [...acc, currentNode];

  }, [] as CodeBlockReducerState);
}

const updateAt = (state: CodeBlockReducerState, newNode: CodeBlockNode, targetId: string): CodeBlockReducerState => {
  return state.reduce((acc, node): CodeBlockReducerState => {
    const currentNode = node.id === targetId ? newNode : node;

    if (currentNode.children) {
      currentNode.children = updateAt(currentNode.children, newNode, targetId);
    }

    return [...acc, currentNode];
  }, [] as CodeBlockReducerState);
}

export const CodeBlockReducer = (state: CodeBlockReducerState, action: CodeBlockReducerAction): CodeBlockReducerState => {
  switch (action.type) {
    case "INSERT":
      if (!action.targetId) {
        return [...state, action.payload];
      }

      return insertAt(state, action.payload, action.targetId);

    case "UPDATE":
      if (!action.targetId) {
        return state;
      }

      return updateAt(state, action.payload, action.targetId);

    case "DELETE":
      if (!action.targetId) {
        return state;
      }

      return removeAt(state, action.targetId);

    case "MOVE":
      if (!action.targetId) {
        const newState = removeAt(state, action.payload.id as string);

        return [...newState, action.payload];
      }

      const newState = removeAt(state, action.payload.id as string);
      return insertAt(newState, action.payload, action.targetId);

    default:
      return state;
  }
}
