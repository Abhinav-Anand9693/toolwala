export function JSONProcessor(data: unknown) {
  console.log("JSON Processor Running");

  return {
    success: true,
    result: JSON.stringify(data, null, 2),
  };
}