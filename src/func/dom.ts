export function prevent(fn: () => void) {
  return (e: { preventDefault: () => void }) => {
    e.preventDefault();
    return fn();
  };
}
