import { CodeBlockNode } from "../types";
import { CodeBlock, CodeBlockProps } from "./CodeBlock";

type CodeBlockListProps = Omit<CodeBlockProps, "node" | "isBeingDraggedOver"> & {
  nodes: CodeBlockNode[]
  currentDropTargetId: string | null
  currentDragTargetId: string | null
  currentDragOverPosition: 'list-before' | 'list-after' | 'before' | 'after' | null
  className?: string
}

export const CodeBlockList = ({
  nodes,
  ...props
}: CodeBlockListProps) => {


  return (
    <div
      className={`flex flex-col gap-2 ${props.className}`}>
      <CodeBlockRecursive
        {...props}
        nodes={nodes}
      />
    </div>);
}

type CodeBlockRecursiveProps = Omit<CodeBlockListProps, "className"> & {
  nodes: CodeBlockNode[]
}

const CodeBlockRecursive = ({ nodes, currentDragTargetId, currentDropTargetId, ...props }: CodeBlockRecursiveProps) => {

  const isBeingDraggerOver = (node: CodeBlockNode) => currentDropTargetId === node.id && node.id !== currentDragTargetId;

  return (
    <>
      {nodes.map((node: CodeBlockNode) => (
        <CodeBlock
          key={node.id}
          {...props}
          node={node}
          hasInput={node.hasInput}
          isBeingDraggedOver={isBeingDraggerOver(node)}
          draggedOverPosition={isBeingDraggerOver(node) ? props.currentDragOverPosition : null}>
          {node.children && (
            <CodeBlockRecursive
              {...props}
              nodes={node.children}
              currentDragTargetId={currentDragTargetId}
              currentDropTargetId={currentDropTargetId}
            />)
          }
        </CodeBlock>
      ))}</>
  );
}
