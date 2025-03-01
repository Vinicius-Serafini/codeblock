import { CodeBlockNode } from "../types";
import { CodeBlock, CodeBlockProps } from "./CodeBlock";

type CodeBlockListProps = Omit<CodeBlockProps, "node" | "isBeingDraggedOver"> & {
  nodes: CodeBlockNode[],
  currentDropTargetId: string | null,
  currentDragTargetId: string | null,
}

export const CodeBlockList = (props: CodeBlockListProps) => {
  return (<>
    {props.nodes.map((node: CodeBlockNode) => (
      <CodeBlock
        key={node.id}
        node={node}
        hasInput={node.hasInput}
        onDragStart={props.onDragStart}
        onDragOver={props.onDragOver}
        onDragEnter={props.onDragEnter}
        onDragLeave={props.onDragLeave}
        onDrop={props.onDrop}
        onDragEnd={props.onDragEnd}
        onInput={props.onInput}
        isBeingDraggedOver={props.currentDropTargetId === node.id && node.id !== props.currentDragTargetId}>
        {node.children ? <CodeBlockList {...props} nodes={node.children} /> : null}
      </CodeBlock>
    ))}
  </>);
}