export type CodeBlockNode = {
  id?: string
  title: string
  value?: any
  unit?: string
  action: CodeBlockActions
  type: 'ACTION' | 'INPUT'
  hasInput?: boolean
  children?: CodeBlockNode[]
}

type CodeBlockActions = 'repeat' | 'left' | 'right' | 'forward' | 'backward' | 'penup' | 'pendown' | 'rotate'