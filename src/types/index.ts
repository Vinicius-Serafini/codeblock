export type CodeBlockNode = {
  id?: string
  title: string
  value: unknown
  unit?: string
  action: string
  type: 'ACTION' | 'INPUT'
  hasInput?: boolean
  children?: CodeBlockNode[]
}