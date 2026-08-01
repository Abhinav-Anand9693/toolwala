import { ToolFormConfig } from "@/types/form";

type Props = {
  config: ToolFormConfig;
};

export default function ToolForm({ config }: Props) {
  return (
    <div className="space-y-6">
      {config.fields.map((field) => (
        <div key={field.id}>
          <label className="mb-2 block font-medium">
            {field.label}
          </label>

          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full rounded-lg border p-3"
          />
        </div>
      ))}

      <button className="rounded-lg bg-black px-6 py-3 text-white">
        Run Tool
      </button>
    </div>
  );
}