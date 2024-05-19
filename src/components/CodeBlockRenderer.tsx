import React, { useId, useReducer, useState } from "react";
import { CodeBlockNode } from "../types";
import { CodeBlockReducer } from "../reducers/codeBlockReducer";
import { generateRandomString, isMouseOverElement } from "../utils";
import { CodeBlockList } from "./CodeBlockList";

export const CodeBlockRenderer = (props: JSX.IntrinsicElements['div']) => {
  const [currentDropTargetId, setCurrentDropTargetId] = useState<string | null>(null);
  const [currentDragTargetId, setCurrentDragTargetId] = useState<string | null>(null);

  const [nodes, dispatch] = useReducer(CodeBlockReducer, []);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();
    // e.preventDefault();
    const target = e.target as HTMLDivElement;

    if (!target.id) {
      return;
    }

    if (currentDropTargetId === target.id) {
      setCurrentDropTargetId(null);
    }

    if (node.id) {
      setCurrentDragTargetId(node.id);
    }

    e.dataTransfer.setData('application/json', JSON.stringify(node));
  }

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setCurrentDragTargetId(null);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();
    e.preventDefault();

    setCurrentDropTargetId(null);

    if (currentDragTargetId === node?.id) {
      return;
    }

    const payload: CodeBlockNode = JSON.parse(e.dataTransfer.getData('application/json'));

    dispatch({
      type: 'MOVE',
      targetId: node.id,
      payload: {
        ...payload,
      }
    });
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLDivElement;

    if (!target.id) {
      return;
    }

    if (currentDropTargetId === target.id) {
      return;
    }

    if (node.id && currentDropTargetId !== node.id) {
      setCurrentDropTargetId(node.id);

      return;
    }

    setCurrentDropTargetId(target.id);
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLDivElement;

    if (!target.id) {
      return;
    }

    if (currentDropTargetId === target.id && isMouseOverElement(e.clientX, e.clientY, target)) {
      setCurrentDropTargetId(null);
    }
  }


  const id = useId();

  const onDropInitial = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.currentTarget.id !== id) {
      return;
    }

    const payload = JSON.parse(e.dataTransfer.getData('application/json'));

    if (payload.id) {
      return dispatch({
        type: 'MOVE',
        payload
      });
    }

    dispatch({
      type: 'INSERT',
      payload: {
        ...payload,
        id: generateRandomString()
      }
    });
  }


  return (
    <div
      id={id}
      {...props}
      className={`flex flex-col gap-2 min-h-fit ${props.className ? props.className : ''}`}
      onDrop={onDropInitial}
      onDragOver={e => e.preventDefault()}>
      <CodeBlockList
        nodes={nodes}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        currentDropTargetId={currentDropTargetId}
        currentDragTargetId={currentDragTargetId}
      />
    </div>
  )
}