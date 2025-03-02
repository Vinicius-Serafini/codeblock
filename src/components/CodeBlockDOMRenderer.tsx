import React, { useEffect, useId, useState } from "react";
import { CodeBlockNode } from "../types";
import { generateRandomString, isMouseOverElement } from "../utils";
import { CodeBlockList } from "./CodeBlockList";
import { useCodeBlockState } from "../hooks/useCodeBlockState";
import { useCodeBlockDispatcher } from "../hooks/useCodeBlockDispatcher";

export const CodeBlockDOMRenderer = (props: JSX.IntrinsicElements['div']) => {
  const [currentDropTargetId, setCurrentDropTargetId] = useState<string | null>(null);
  const [currentDragOverTargetPosition, setCurrentDragOverTargetPosition] = useState<'before' | 'after' | 'list-before' | 'list-after' | null>(null);
  const [currentDragTargetId, setCurrentDragTargetId] = useState<string | null>(null);

  const codeBlocks = useCodeBlockState();
  const codeBlocksDispatch = useCodeBlockDispatcher();

  useEffect(() => {
    if (!currentDropTargetId) {
      setCurrentDragOverTargetPosition(null);
    }
  }, [currentDropTargetId]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();

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

    if (currentDragOverTargetPosition === null) {
      return;
    }

    setCurrentDropTargetId(null);

    if (currentDragTargetId === node?.id) {
      return;
    }

    const payload: CodeBlockNode = JSON.parse(e.dataTransfer.getData('application/json'));

    codeBlocksDispatch({
      type: 'DELETE',
      targetId: payload.id,
      payload
    });

    if (currentDragOverTargetPosition === 'before') {
      codeBlocksDispatch({
        type: 'INSERT_BEFORE',
        targetId: node.id,
        payload: {
          ...payload,
          id: payload.id || generateRandomString(),
        }
      })
    }

    if (currentDragOverTargetPosition === 'after') {
      codeBlocksDispatch({
        type: 'INSERT_AFTER',
        targetId: node.id,
        payload: {
          ...payload,
          id: payload.id || generateRandomString(),
        }
      })
    }

    if (currentDragOverTargetPosition === 'list-before' || currentDragOverTargetPosition === 'list-after') {
      codeBlocksDispatch({
        type: 'INSERT',
        targetId: node.id,
        payload: {
          ...payload,
          id: payload.id || generateRandomString(),
        }
      })
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentDropTargetId) {
      return;
    }

    if (node.id === currentDragTargetId) {
      return;
    }

    const target = e.target as HTMLElement;

    if (!target) {
      return;
    }

    const { height, y } = target.getBoundingClientRect();

    const isHoveringBeforeMiddle = (y + height / 3) > e.clientY;

    const isHoveringAfterMiddle = (y + height / 3 * 2) < e.clientY;

    if (target.dataset.listDropTarget) {
      if (node.children?.length === 0) {
        setCurrentDragOverTargetPosition('list-after');

        return;
      }

      if (node.children?.find((child: CodeBlockNode) => child.id === currentDragTargetId)) {
        return;
      }

      if (isHoveringBeforeMiddle) {
        setCurrentDragOverTargetPosition('list-before');

        return;
      }

      if (isHoveringAfterMiddle) {
        setCurrentDragOverTargetPosition('list-after');

        return;
      }

      return;
    }

    if (isHoveringBeforeMiddle) {
      setCurrentDragOverTargetPosition('before');

      return;
    }

    if (isHoveringAfterMiddle) {
      setCurrentDragOverTargetPosition('after');

      return;
    }

    setCurrentDragOverTargetPosition(null);
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    const targetId = target.id || target.parentElement?.id;

    if (!targetId) {
      return;
    }

    if (currentDropTargetId === targetId) {
      return;
    }

    if (node.id && currentDropTargetId !== node.id) {
      setCurrentDropTargetId(node.id);

      return;
    }

    setCurrentDropTargetId(targetId);
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

  const onInitialDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.id !== id) {
      return;
    }

    setCurrentDropTargetId(null);

    const payload = JSON.parse(e.dataTransfer.getData('application/json'));

    if (payload.id) {
      codeBlocksDispatch({
        type: 'DELETE',
        payload,
        targetId: payload.id
      });
    }

    codeBlocksDispatch({
      type: 'INSERT',
      payload: {
        ...payload,
        id: generateRandomString()
      }
    });
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>, node: CodeBlockNode) => {
    let value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null;

    if (typeof value === 'number' && value < 0) {
      value = 0;
    }

    codeBlocksDispatch({
      type: 'UPDATE',
      payload: {
        ...node,
        value: !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : null
      },
      targetId: node.id
    });
  }

  const onDelete = (node: CodeBlockNode) => {
    codeBlocksDispatch({
      type: 'DELETE',
      payload: node,
      targetId: node.id
    });
  };

  const onInitialDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (codeBlocks.find((node: CodeBlockNode) => node.id === currentDragTargetId)) {
      return;
    }

    setCurrentDropTargetId(id);
  }

  const onInitialDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentDropTargetId === id) {
      setCurrentDropTargetId(null);
    }
  }

  return (
    <div
      id={id}
      className={`${props.className} h-full w-full flex flex-col overflow-hidden`}
      onDrop={onInitialDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={onInitialDragEnter}
      onDragLeave={onInitialDragLeave}>
      <div className="overflow-auto p-4 flex-1">
        <CodeBlockList
          className={`${currentDropTargetId === id ? 'drag-over-placeholder--after' : ''} `}
          nodes={codeBlocks}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          currentDragOverPosition={currentDragOverTargetPosition}
          currentDropTargetId={currentDropTargetId}
          currentDragTargetId={currentDragTargetId}
          onInput={onInput}
          onDelete={onDelete}
        />
      </div>
      <div className="w-full p-4 shadow-[#00000030_0px_-1px_8px_0px]">
        <button className="p-2 border-2 border-black font-bold rounded ml-auto block">
          Limpar
        </button>
      </div>
    </div>
  )
}