type Props = {
  value: string;
};

export default function JsonOutput({
  value,
}: Props) {
  return (
   <pre
  className="min-h-[450px] overflow-auto rounded-xl bg-slate-900 p-5 text-green-400"
>
  {value}
</pre>
  );
}