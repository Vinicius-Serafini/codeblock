import { useCodeBlockState } from "@/hooks/useCodeBlockState";
import { useWindowResize } from "@/hooks/useResizeWindow";
import { CanvasRenderer } from "@/renderer/CanvasRenderer";
import { HTMLProps, useEffect, useRef, useState } from "react"

export const CodeBlockCanvas = (props: HTMLProps<HTMLCanvasElement>) => {

  const codeBlocksState = useCodeBlockState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasRenderer, setCanvasRenderer] = useState<CanvasRenderer | null>(null);
  const windowSize = useWindowResize();

  function buildCanvasRenderer(canvas: HTMLCanvasElement) {
    const { width, height } = canvas.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    return new CanvasRenderer(canvas);
  }

  useEffect(() => {
    if (canvasRef.current) {
      setCanvasRenderer(buildCanvasRenderer(canvasRef.current));
    }
  }, [canvasRef, codeBlocksState, windowSize]);

  useEffect(() => {
    if (canvasRenderer) {
      canvasRenderer.draw(codeBlocksState);
    }
  }, [canvasRenderer]);

  return (
    <canvas
      className="h-full w-full"
      {...props}
      ref={canvasRef}
    />)
}