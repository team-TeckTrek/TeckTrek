export function startCountdown(
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
) {
  if (count <= 0) return
  const timer = setInterval(() => {
    setCount((prev) => prev - 1)
  }, 1000)
  return timer
}
