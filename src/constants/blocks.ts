import { CodeBlockNode } from "../types";

export const REPEAT_BLOCK: CodeBlockNode = {
  action: 'repeat',
  title: 'Repeat',
  type: 'ACTION',
  hasInput: true,
  value: 3,
  children: [],
};

export const LEFT_BLOCK: CodeBlockNode = {
  title: 'Left',
  action: 'left',
  unit: 'degrees',
  type: 'INPUT',
  value: 3,
  hasInput: true,
}

export const RIGHT_BLOCK: CodeBlockNode = {
  title: 'Right',
  action: 'right',
  unit: 'degrees',
  type: 'INPUT',
  value: 3,
  hasInput: true
}

export const FORWARD_BLOCK: CodeBlockNode = {
  title: 'Forward',
  action: 'forward',
  unit: 'steps',
  type: 'INPUT',
  value: 3,
  hasInput: true
}

export const BACKWARD_BLOCK: CodeBlockNode = {
  title: 'Backward',
  action: 'backward',
  unit: 'steps',
  type: 'INPUT',
  value: 3,
  hasInput: true
}

export const PEN_UP_BLOCK: CodeBlockNode = {
  title: 'Pen Up',
  action: 'penup',
  hasInput: false,
  type: 'ACTION',
}

export const PEN_DOWN_BLOCK: CodeBlockNode = {
  title: 'Pen Down',
  action: 'pendown',
  hasInput: false,
  type: 'ACTION',
}
