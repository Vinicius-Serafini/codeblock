import React, { ReactNode, useMemo } from "react";
import { CodeBlockNode } from "../types";
import "./CodeBlock.css";

export type CodeBlockProps = {
  node: CodeBlockNode
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  onInput?: (e: React.ChangeEvent<HTMLInputElement>, node: CodeBlockNode) => void
  hasDrop?: boolean
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void
  isBeingDraggedOver?: boolean
  draggedOverPosition?: 'after' | 'before' | 'list-after' | 'list-before' | null
  hasInput?: boolean
  inputDisbled?: boolean
  children?: ReactNode
  onDelete?: (node: CodeBlockNode) => void
}

export const CodeBlock = ({
  hasInput = false,
  ...props
}: CodeBlockProps) => {
  const dragEventDecorator = (callback?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void) => {
    return (e: React.DragEvent<HTMLDivElement>) => callback?.(e, {
      ...props.node,
      hasInput: hasInput,
    });
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onInput?.(e, { ...props.node, value: e.target.value })
  }

  const dragOverClass = useMemo(() => {
    if (!props.isBeingDraggedOver) {
      return '';
    }

    if (props.draggedOverPosition === 'before') {
      return 'drag-over-placeholder--before';
    }

    if (props.draggedOverPosition === 'after') {
      return 'drag-over-placeholder--after';
    }

    if (props.draggedOverPosition === 'list-before') {
      return 'drag-over--list-before';
    }

    if (props.draggedOverPosition === 'list-after') {
      return 'drag-over--list-after';
    }

    return '';
  }, [props.isBeingDraggedOver, props.draggedOverPosition])

  return (
    <div
      id={props.node.id}
      className={`${dragOverClass} flex flex-col gap-2`}
      draggable
      onDragStart={dragEventDecorator(props.onDragStart)}
      onDragEnd={dragEventDecorator(props.onDragEnd)}
      onDrop={dragEventDecorator(props.onDrop)}
      onDragOver={dragEventDecorator(props.onDragOver)}
      onDragEnter={dragEventDecorator(props.onDragEnter)}
      onDragLeave={dragEventDecorator(props.onDragLeave)}>
      <div className='bg-blue-400 flex flex-col gap-3 rounded-lg py-2 pl-2'>
        <div className={`flex gap-4 items-center pr-2 flex-wrap ${props.isBeingDraggedOver ? 'pointer-events-none' : ''}`}>
          <p className="font-bold capitalize">
            {props.node.title}
          </p>
          {hasInput && (
            <>
              <input
                className='rounded p-1 flex-1 max-w-40 bg-white disabled:cursor-not-allowed'
                type="number"
                min="0"
                value={props.node.value ? props.node.value as string : ''}
                onInput={onInput}
                disabled={props.inputDisbled}
              />
              {props.node.unit && (
                <p className="font-bold">
                  {props.node.unit}
                </p>
              )}
            </>)
          }
          {props.node.id && (
            <button
              onClick={() => props.onDelete?.(props.node)}
              className="font-bold border-2 border-black  ml-auto rounded">
              <span className="material-symbols-outlined block my-auto mx-auto">
                delete
              </span>
            </button>
          )}
        </div>
        {props.node.children && (<>
          <div
            data-list-drop-target
            className='code-block-list'>
            {props.children}
          </div>
          <span className=""></span>
        </>
        )}
      </div>
    </div>
  )
}