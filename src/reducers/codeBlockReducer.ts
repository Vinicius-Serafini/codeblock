import { CodeBlockNode } from "../types";

type CodeBlockReducerType = "INSERT" | "UPDATE" | "DELETE" | "INSERT_AFTER" | "INSERT_BEFORE";

export type CodeBlockReducerAction = {
  type: CodeBlockReducerType;
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

const insertAfter = (state: CodeBlockReducerState, newNode: CodeBlockNode, targetId: string): CodeBlockReducerState => {
  return state.reduce((acc, node,): CodeBlockReducerState => {
    const currentNode = { ...node };

    if (currentNode.id === targetId) {
      return [...acc, currentNode, newNode];
    }

    if (currentNode.children?.find((child: CodeBlockNode) => child.id === targetId)) {
      currentNode.children = insertAfter(currentNode.children, newNode, targetId);
    }

    return [...acc, currentNode];
  }, [] as CodeBlockReducerState);
}

const insertBefore = (state: CodeBlockReducerState, newNode: CodeBlockNode, targetId: string): CodeBlockReducerState => {
  return state.reduce((acc, node): CodeBlockReducerState => {
    const currentNode = { ...node };

    if (currentNode.id === targetId) {
      return [...acc, newNode, currentNode];
    }

    if (currentNode.children?.find((child: CodeBlockNode) => child.id === targetId)) {
      currentNode.children = insertBefore(currentNode.children, newNode, targetId);
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

    case "INSERT_AFTER":
      if (!action.targetId) {
        return [...state, action.payload];
      }

      return insertAfter(state, action.payload, action.targetId);

    case "INSERT_BEFORE":
      if (!action.targetId) {
        return [action.payload, ...state];
      }

      return insertBefore(state, action.payload, action.targetId);

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

    default:
      return state;
  }
}
