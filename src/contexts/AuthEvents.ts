let onLogout: (() => void) | null = null;

export function registerLogout(fn: () => void) {
  onLogout = fn;
}

export function triggerLogout() {
  if (onLogout) {
    onLogout();
  }
}