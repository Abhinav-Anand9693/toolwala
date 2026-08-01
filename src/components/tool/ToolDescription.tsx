type Props = {
  description: string;
};

export default function ToolDescription({
  description,
}: Props) {
  return (
    <p className="mt-4 max-w-3xl text-lg text-gray-600">
      {description}
    </p>
  );
}