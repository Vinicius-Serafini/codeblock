import { CodeBlockNode } from "../types";
import { CodeBlock } from "./CodeBlock";

const AVAILABLE_MENU_OPTIONS: CodeBlockNode[] = [
  {
    action: 'repeat',
    title: 'Repeat',
    type: 'ACTION',
    value: 3,
    hasInput: true,
    children: [],
  },
  {
    title: 'Left',
    action: 'left',
    unit: 'degrees',
    type: 'INPUT',
    value: 3,
    hasInput: true,
  },
  {
    title: 'Right',
    action: 'right',
    unit: 'degrees',
    type: 'INPUT',
    value: 3,
    hasInput: true
  }
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