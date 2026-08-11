export function printResume() {
  if (typeof window === "undefined") {
    return;
  }

  window.print();
}