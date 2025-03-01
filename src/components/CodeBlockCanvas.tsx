import { useCodeBlockState } from "@/hooks/useCodeBlockState";
import { CanvasRenderer } from "@/renderer/CanvasRenderer";
import { HTMLProps, useEffect, useRef } from "react"

export const CodeBlockCanvas = (props: HTMLProps<HTMLCanvasElement>) => {

  const codeBlocksState = useCodeBlockState();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const { width, height } = canvas.getBoundingClientRect();

      canvas.width = width;
      canvas.height = height;

      const canvasRenderer = new CanvasRenderer(canvasRef.current);

      canvasRenderer.draw(codeBlocksState);

      return () => canvasRenderer.clear();
    }
  }, [canvasRef, codeBlocksState]);

  return (
    <canvas
      className="h-full w-full"
      {...props}
      ref={canvasRef}
    />)
}