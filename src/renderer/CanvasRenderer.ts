import { CodeBlockNode } from "@/types";

type Position = [number, number];

export class CanvasRenderer {
  canvas: HTMLCanvasElement;
  pen: Pen

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.pen = new Pen([this.canvas.width / 2, this.canvas.height / 2], this.ctx);
  }

  clear() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get ctx() {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  draw(CodeBlockNodes: CodeBlockNode[]) {
    for (const node of CodeBlockNodes) {
      if (node.action === 'repeat') {
        const repeat = node.value as number;

        for (let i = 0; i < repeat; i++) {
          this.draw(node.children as CodeBlockNode[]);
        }
      }

      if (node.action === 'left') {
        if (!node.value) {
          return;
        }

        const degree = node.value as number;

        this.pen.rotate(-degree);
      }

      if (node.action === 'right') {
        if (!node.value) {
          return;
        }

        const degree = node.value as number;

        this.pen.rotate(degree);
      }

      if (node.action === 'forward') {
        if (!node.value) {
          return;
        }

        const steps = node.value as number;

        this.pen.move(steps);
      }

      if (node.action === 'backward') {
        if (!node.value) {
          return;
        }

        const steps = node.value as number;

        this.pen.move(-steps);
      }

      if (node.action === 'penup') {
        this.pen.penUp();
      }

      if (node.action === 'pendown') {
        this.pen.penDown();
      }
    }
  }
}

class Pen {
  position: Position;
  ctx: CanvasRenderingContext2D;
  isDrawing: boolean = true;
  radians: number = 0;

  constructor(position: Position, context: CanvasRenderingContext2D) {
    this.position = position;
    this.ctx = context;
  }

  penUp() {
    this.isDrawing = false;
  }

  penDown() {
    this.isDrawing = true;
  }

  rotate(degrees: number) {
    this.radians += degrees * Math.PI / 180;
  }

  move(steps: number) {
    if (this.isDrawing) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = '#000000';
      this.ctx.moveTo(this.position[0], this.position[1]);
    }

    this.position[0] += Math.cos(this.radians) * steps;
    this.position[1] += Math.sin(this.radians) * steps;

    if (this.isDrawing) {
      this.ctx.lineTo(this.position[0], this.position[1]);
      this.ctx.stroke();
    }
  }
}