export const generateRandomString = () => {
  return Math.random().toString(36).slice(2)
}

export const isMouseOverElement = (x: number, y: number, target: HTMLElement) => {
  const rect = target.getBoundingClientRect();
  return x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom
}
