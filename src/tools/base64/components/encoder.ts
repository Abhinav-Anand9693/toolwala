export function encode(text: string) {
  return btoa(text);
}

export function decode(text: string) {
  try {
    return atob(text);
  } catch {
    return "Invalid Base64";
  }
}