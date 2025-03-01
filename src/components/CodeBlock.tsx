import React, { ReactNode } from "react";
import { CodeBlockNode } from "../types";

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
  hasInput?: boolean
  inputDisbled?: boolean,
  children?: ReactNode
}

export const CodeBlock = ({
  hasInput = false,
  ...props
}: CodeBlockProps) => {
  const dragEventDecorator = (callback?: (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => void) => {
    return (e: React.DragEvent<HTMLDivElement>) => callback?.(e, {
      action: props.node.action,
      id: props.node.id,
      title: props.node.title,
      value: props.node.value,
      unit: props.node.unit,
      type: props.node.type,
      hasInput: hasInput,
      children: props.node.children
    });
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onInput?.(e, { ...props.node, value: e.target.value })
  }

  return (
    <div
      id={props.node.id}
      className='bg-blue-400 rounded-lg flex flex-col gap-3 pl-3 py-3 cursor-grab'
      draggable
      onDragStart={dragEventDecorator(props.onDragStart)}
      onDragEnd={dragEventDecorator(props.onDragEnd)}
      onDrop={dragEventDecorator(props.onDrop)}
      onDragOver={dragEventDecorator(props.onDragOver)}
      onDragEnter={dragEventDecorator(props.onDragEnter)}
      onDragLeave={dragEventDecorator(props.onDragLeave)}>
      <div className="flex gap-4 items-center pr-3 flex-wrap">
        <p className="font-bold capitalize">
          {props.node.title}
        </p>
        {hasInput && (
          <>
            <input
              className='rounded p-1 flex-1 max-w-40 bg-white disabled:cursor-not-allowed'
              type="number"
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
      </div>
      {props.node.children && (
        <div
          className={`bg-gray-300 pl-2 py-2 rounded-l ml-8 min-h-7 mb-4 flex flex-col gap-2 ${props.isBeingDraggedOver ? 'after:h-40 after:w-full after:bg-blue-300 after:border-2 after:border-blue-400 after:rounded-lg' : ''}`}>
          {props.children}
        </div>
      )}
    </div>
  )
}