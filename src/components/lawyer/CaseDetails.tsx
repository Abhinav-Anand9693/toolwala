"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import type { LawyerCase } from "@/types/lawyer";

type Tab =
  | "overview"
  | "documents"
  | "timeline"
  | "notes";

type DocumentItem = {
  id: string;
  name: string;
  fileName: string;
  mimeType: string;
  size: number;
  storagePath: string | null;
  createdAt: string;
};

type Note = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type Activity = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  createdAt: string;
};

export default function CaseDetails({
  caseId,
}: {
  caseId: string;
}) {
  const [caseItem, setCaseItem] =
    useState<LawyerCase | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

  const loadCase = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        `/api/cases/${caseId}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load case"
        );
      }

      setCaseItem(data.case);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load case"
      );
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadCase();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadCase]);

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading case workspace...
        </p>
      </div>
    );
  }

  if (error || !caseItem) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error || "Case not found"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/lawyer"
        className="inline-flex text-sm font-semibold text-slate-500 transition hover:text-slate-950"
      >
        ← Back to Cases
      </Link>

      {/* CASE HEADER */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="p-6 sm:p-8">
          <StatusBadge status={caseItem.status} />

          <h1 className="mt-4 text-3xl font-bold text-slate-950">
            {caseItem.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {caseItem.caseNumber ||
              "No case number provided"}
          </p>
        </div>

        <div className="grid border-t border-slate-100 sm:grid-cols-2 lg:grid-cols-4">
          <QuickInfo
            label="Court"
            value={caseItem.court || "Not provided"}
          />

          <QuickInfo
            label="Client"
            value={
              caseItem.clientName || "Not provided"
            }
          />

          <QuickInfo
            label="Opposite Party"
            value={
              caseItem.oppositeParty ||
              "Not provided"
            }
          />

          <QuickInfo
            label="Created"
            value={formatDate(caseItem.createdAt)}
          />
        </div>
      </section>

      {/* TABS */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4">
          <div className="flex gap-1 overflow-x-auto">
            <TabButton
              label="Overview"
              active={activeTab === "overview"}
              onClick={() =>
                setActiveTab("overview")
              }
            />

            <TabButton
              label="Documents"
              active={activeTab === "documents"}
              onClick={() =>
                setActiveTab("documents")
              }
            />

            <TabButton
              label="Timeline"
              active={activeTab === "timeline"}
              onClick={() =>
                setActiveTab("timeline")
              }
            />

            <TabButton
              label="Notes"
              active={activeTab === "notes"}
              onClick={() =>
                setActiveTab("notes")
              }
            />
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {activeTab === "overview" && (
            <Overview caseItem={caseItem} />
          )}

          {activeTab === "documents" && (
            <DocumentsTab caseId={caseId} />
          )}

          {activeTab === "timeline" && (
            <TimelineTab
              caseId={caseId}
              caseItem={caseItem}
            />
          )}

          {activeTab === "notes" && (
            <NotesTab caseId={caseId} />
          )}
        </div>
      </section>
    </div>
  );
}

/* =====================================================
   OVERVIEW
===================================================== */

function Overview({
  caseItem,
}: {
  caseItem: LawyerCase;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-950">
        Case Description
      </h2>

      <div className="mt-4 rounded-2xl bg-slate-50 p-6">
        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
          {caseItem.description ||
            "No description provided."}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   DOCUMENTS
===================================================== */

function DocumentsTab({
  caseId,
}: {
  caseId: string;
}) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [documents, setDocuments] =
    useState<DocumentItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] =
    useState(false);

  const [error, setError] = useState("");

  const loadDocuments = useCallback(
    async () => {
      try {
        setError("");

        const response = await fetch(
          `/api/cases/${caseId}/documents`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Failed to load documents"
          );
        }

        setDocuments(data.documents || []);
      } catch (error) {
        console.error(
          "Failed to load documents:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load documents"
        );
      } finally {
        setLoading(false);
      }
    },
    [caseId]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDocuments();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadDocuments]);

  async function uploadFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        `/api/cases/${caseId}/documents/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to upload document"
        );
      }

      setDocuments((current) => [
        data.document,
        ...current,
      ]);

      event.target.value = "";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  async function deleteDocument(
    documentId: string
  ) {
    const confirmed = window.confirm(
      "Delete this document?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `/api/cases/${caseId}/documents?documentId=${documentId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete document"
        );
      }

      setDocuments((current) =>
        current.filter(
          (document) =>
            document.id !== documentId
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete document"
      );
    }
  }

  if (loading) {
    return (
      <p className="py-10 text-sm text-slate-500">
        Loading documents...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.webp"
        onChange={uploadFile}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Documents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {documents.length} document
            {documents.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading
            ? "Uploading..."
            : "Upload Document"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {documents.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
          <p className="font-semibold text-slate-800">
            No documents yet
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Upload your first case document.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {document.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatBytes(document.size)}
                  {" · "}
                  {formatDate(document.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  deleteDocument(document.id)
                }
                className="text-sm font-semibold text-red-600 transition hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   NOTES
===================================================== */

function NotesTab({
  caseId,
}: {
  caseId: string;
}) {
  const [notes, setNotes] =
    useState<Note[]>([]);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = useCallback(
    async () => {
      try {
        setError("");

        const response = await fetch(
          `/api/cases/${caseId}/notes`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load notes"
          );
        }

        setNotes(data.notes || []);
      } catch (error) {
        console.error(
          "Failed to load notes:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load notes"
        );
      } finally {
        setLoading(false);
      }
    },
    [caseId]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadNotes();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadNotes]);

  async function addNote() {
    if (!content.trim()) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `/api/cases/${caseId}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: content.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to add note"
        );
      }

      setNotes((current) => [
        data.note,
        ...current,
      ]);

      setContent("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to add note"
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote(noteId: string) {
    try {
      setError("");

      const response = await fetch(
        `/api/cases/${caseId}/notes?noteId=${noteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete note"
        );
      }

      setNotes((current) =>
        current.filter(
          (note) => note.id !== noteId
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete note"
      );
    }
  }

  if (loading) {
    return (
      <p className="py-10 text-sm text-slate-500">
        Loading notes...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-950">
          Private Notes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Notes are connected to this case.
        </p>
      </div>

      <textarea
        value={content}
        onChange={(event) =>
          setContent(event.target.value)
        }
        placeholder="Write a case note..."
        rows={5}
        className="w-full rounded-2xl border border-slate-200 p-4 text-sm outline-none transition focus:border-blue-500"
      />

      <button
        type="button"
        onClick={addNote}
        disabled={saving || !content.trim()}
        className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Add Note"}
      </button>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-2xl border border-slate-200 p-5"
          >
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {note.content}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Updated{" "}
                {formatDate(note.updatedAt)}
              </p>

              <button
                type="button"
                onClick={() =>
                  deleteNote(note.id)
                }
                className="text-xs font-semibold text-red-600 transition hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">
            No notes yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   TIMELINE
===================================================== */

function TimelineTab({
  caseId,
  caseItem,
}: {
  caseId: string;
  caseItem: LawyerCase;
}) {
  const [activities, setActivities] =
    useState<Activity[]>([]);

  const loadTimeline = useCallback(
    async () => {
      try {
        const response = await fetch(
          `/api/cases/${caseId}/activities`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setActivities(data.activities || []);
      } catch {
        // Case creation will still be shown.
      }
    },
    [caseId]
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadTimeline();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadTimeline]);

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-950">
        Case Timeline
      </h2>

      <div className="mt-8 space-y-6 border-l border-slate-200 pl-6">
        <TimelineItem
          title="Case created"
          description={`Case "${caseItem.title}" was created.`}
          date={caseItem.createdAt}
        />

        {activities.map((activity) => (
          <TimelineItem
            key={activity.id}
            title={activity.title}
            description={
              activity.description || ""
            }
            date={activity.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

/* =====================================================
   SMALL COMPONENTS
===================================================== */

function TimelineItem({
  title,
  description,
  date,
}: {
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="relative">
      <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-slate-950" />

      <p className="font-semibold text-slate-900">
        {title}
      </p>

      {description && (
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      )}

      <p className="mt-2 text-xs text-slate-400">
        {formatDate(date)}
      </p>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative whitespace-nowrap px-4 py-4 text-sm font-semibold transition ${
        active
          ? "text-slate-950"
          : "text-slate-500 hover:text-slate-950"
      }`}
    >
      {label}

      {active && (
        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-slate-950" />
      )}
    </button>
  );
}

function QuickInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-100 p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles = {
    ACTIVE:
      "bg-emerald-50 text-emerald-700",
    PENDING:
      "bg-amber-50 text-amber-700",
    CLOSED:
      "bg-slate-100 text-slate-700",
  };

  const className =
    styles[status as keyof typeof styles] ||
    styles.ACTIVE;

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}
    >
      {status}
    </span>
  );
}

/* =====================================================
   HELPERS
===================================================== */

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
  ];

  const index = Math.min(
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    ),
    units.length - 1
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(1)} ${units[index]}`;
}