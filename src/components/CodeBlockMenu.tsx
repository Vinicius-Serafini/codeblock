import { CodeBlockNode } from "../types";
import { CodeBlock } from "./CodeBlock";
import * as BLOCKS from "@/constants/blocks";

const AVAILABLE_MENU_OPTIONS: CodeBlockNode[] = [
  BLOCKS.REPEAT_BLOCK,
  BLOCKS.LEFT_BLOCK,
  BLOCKS.RIGHT_BLOCK,
  BLOCKS.FORWARD_BLOCK,
  BLOCKS.BACKWARD_BLOCK,
  BLOCKS.PEN_UP_BLOCK,
  BLOCKS.PEN_DOWN_BLOCK,
];

type CodeBlockMenuProps = JSX.IntrinsicElements['aside'];

export const CodeBlockMenu = (props: CodeBlockMenuProps) => {
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, node: CodeBlockNode) => {
    e.stopPropagation();

    e.dataTransfer.setData('application/json', JSON.stringify(node));
  }

  return (
    <aside
      {...props}
      className={`p-4 flex flex-col gap-2 bg-gray-300 rounded-lg ${props.className ? props.className : ''}`} >
      {AVAILABLE_MENU_OPTIONS.map((option, idx) =>
        <CodeBlock
          key={idx}
          node={option}
          onDragStart={onDragStart}
          inputDisbled
          hasInput={option.hasInput}
        />
      )}
    </aside>
  )
}