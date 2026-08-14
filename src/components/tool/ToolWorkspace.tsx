import JsonFormatter from "@/tools/json-formatter/JsonFormatter";
import Base64Tool from "@/tools/base64/components/Base64Tool";
import ResumeBuilder from "@/components/resume/ResumeBuilder";
import CaseDashboard from "@/components/lawyer/CaseDashboard";


type Props = {
  slug: string;
};

export default function ToolWorkspace({
  slug,
}: Props) {
  if (slug === "json-formatter") {
    return <JsonFormatter />;
  }

  if (slug === "base64-encoder") {
  return <Base64Tool />;
}
if (slug === "resume-generator") {
  return <ResumeBuilder />;
}

if (slug === "lawyer-workspace") {
  return <CaseDashboard />;
}
  return (
    <div className="rounded-xl border p-8 text-center">
      Tool Coming Soon...
    </div>
  );
}