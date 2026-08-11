"use client";

import { useEffect, useState } from "react";
import { ResumeData } from "@/types/resume";

const STORAGE_KEY = "toolwala-resume-v1";

export function useResumeStorage(
  initialResume: ResumeData
) {
  const [resume, setResume] =
    useState<ResumeData>(() => {
      if (
        typeof window === "undefined"
      ) {
        return initialResume;
      }

      try {
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (saved) {
          const parsed =
            JSON.parse(saved);

          return {
            ...initialResume,
            ...parsed,
          };
        }
      } catch (error) {
        console.error(
          "Failed to load resume:",
          error
        );
      }

      return initialResume;
    });

  const [isSaving, setIsSaving] =
    useState(false);

  const [lastSaved, setLastSaved] =
    useState<Date | null>(null);

  /*
   * Automatically save whenever
   * resume data changes.
   */
  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        setIsSaving(true);

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(resume)
          );

          setLastSaved(new Date());
        } catch (error) {
          console.error(
            "Failed to save resume:",
            error
          );
        } finally {
          setIsSaving(false);
        }
      }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [resume]);

  /*
   * Clear the complete resume.
   */
  function clearResume() {
    localStorage.removeItem(
      STORAGE_KEY
    );

    setResume(initialResume);

    setLastSaved(null);
  }

  return {
    resume,
    setResume,
    isSaving,
    lastSaved,
    clearResume,
  };
}