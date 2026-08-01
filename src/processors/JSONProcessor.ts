export function JSONProcessor(input: string) {
  try {
    const parsed = JSON.parse(input);

    return {
      success: true,
      result: JSON.stringify(parsed, null, 2),
    };
  } catch {
    return {
      success: false,
      result: "Invalid JSON",
    };
  }
}