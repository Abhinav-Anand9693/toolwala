export function formatJson(input: string) {
  try {
    const parsed = JSON.parse(input);

    return {
      success: true,
      output: JSON.stringify(parsed, null, 2),
      error: "",
    };
  } catch {
    return {
      success: false,
      output: "",
      error: "Invalid JSON",
    };
  }
}