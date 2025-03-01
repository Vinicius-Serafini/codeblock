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
      const canvas = buildCanvasRenderer(canvasRef.current);
      canvas.clear();

      setCanvasRenderer(canvas);
    }
  }, [canvasRef]);

  useEffect(() => {
    if (canvasRenderer) {
      canvasRenderer.draw(codeBlocksState);

      return () => canvasRenderer.clear();
    }
  }, [codeBlocksState]);

  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current.getBoundingClientRect();

      canvasRenderer?.setSize(width, height);
      canvasRenderer?.clear();
      canvasRenderer?.draw(codeBlocksState);
    }
  }, [windowSize]);

  return (
    <canvas
      className="h-full w-full"
      {...props}
      ref={canvasRef}
    />)
}