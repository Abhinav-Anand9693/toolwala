"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import EvidencePanel from "./EvidencePanel";

import {
  useResumeStorage,
} from "@/hooks/useResumeStorage";

import SaveStatus from "./SaveStatus";

import ResumeProgress from "./ResumeProgress";

import ResumeToolbar from "./ResumeToolbar";

import ResumeTemplates from "./ResumeTemplates";

import {
  printResume,
} from "@/engine/resume/resumeExporter";

import {
  scoreResume,
} from "@/engine/resume/resumeScorer";

import Container from "@/components/layout/Container";

import { ResumeData } from "@/types/resume";

import { analyzeResume } from "@/engine/resume/resumeValidator";

import {
  analyzeJobDescription,
  JDAnalysis,
} from "@/engine/resume/jdAnalyzer";

import {
  matchResumeToJob,
} from "@/engine/resume/jobMatcher";

import JobDescriptionAnalyzer from "./JobDescriptionAnalyzer";
import ATSHealth from "./ATSHealth";
import JobMatch from "./JobMatch";
import ResumePreview from "./ResumePreview";

/* =========================================================
   INITIAL RESUME
========================================================= */

const initialResume: ResumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },

  summary: "",

  experience: [],

  education: [],

  projects: [],

  skills: [],

  targetJobDescription: "",

  template: "classic",

  evidence: [],
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ResumeBuilder() {
  const {
  resume,
  setResume,
  isSaving,
  lastSaved,
  clearResume,
} = useResumeStorage(
  initialResume
);

  const [skillInput, setSkillInput] =
    useState("");

  const [jdAnalysis, setJdAnalysis] =
    useState<JDAnalysis>({
      jobTitle:"",
      skills: [],
      keywords: [],
      requirements: [],
      responsibilities: [],
      experienceRequirements: [],
      educationRequirements: [],

    
    });

  /* =======================================================
     ATS ANALYSIS
  ======================================================= */

  const atsAnalysis = useMemo(
    () => analyzeResume(resume),
    [resume]
  );
  const resumeScore = useMemo(
  () => scoreResume(resume),
  [resume]
);

  /* =======================================================
     JOB MATCH
  ======================================================= */

  const jobMatch = useMemo(
    () =>
      matchResumeToJob(
        resume,
        jdAnalysis
      ),
    [resume, jdAnalysis]
  );

  /* =======================================================
     PERSONAL INFORMATION
  ======================================================= */

  function updatePersonal(
    field: keyof ResumeData["personal"],
    value: string
  ) {
    setResume((current) => ({
      ...current,

      personal: {
        ...current.personal,

        [field]: value,
      },
    }));
  }

  /* =======================================================
     JOB DESCRIPTION
  ======================================================= */

  function handleAnalyzeJob() {
    const result =
      analyzeJobDescription(
        resume.targetJobDescription
      );

    setJdAnalysis(result);
  }

  /* =======================================================
     EXPERIENCE
  ======================================================= */

  function addExperience() {
    setResume((current) => ({
      ...current,

      experience: [
        ...current.experience,

        {
          id: crypto.randomUUID(),

          company: "",

          role: "",

          location: "",

          startDate: "",

          endDate: "",

          description: "",
        },
      ],
    }));
  }

  function removeExperience(
    id: string
  ) {
    setResume((current) => ({
      ...current,

      experience:
        current.experience.filter(
          (item) =>
            item.id !== id
        ),
    }));
  }

  function updateExperience(
    id: string,

    field:
      | "company"
      | "role"
      | "location"
      | "startDate"
      | "endDate"
      | "description",

    value: string
  ) {
    setResume((current) => ({
      ...current,

      experience:
        current.experience.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  [field]: value,
                }
              : item
        ),
    }));
  }

  /* =======================================================
     EDUCATION
  ======================================================= */

  function addEducation() {
    setResume((current) => ({
      ...current,

      education: [
        ...current.education,

        {
          id: crypto.randomUUID(),

          institution: "",

          degree: "",

          location: "",

          startDate: "",

          endDate: "",
        },
      ],
    }));
  }

  function removeEducation(
    id: string
  ) {
    setResume((current) => ({
      ...current,

      education:
        current.education.filter(
          (item) =>
            item.id !== id
        ),
    }));
  }

  function updateEducation(
    id: string,

    field:
      | "institution"
      | "degree"
      | "location"
      | "startDate"
      | "endDate",

    value: string
  ) {
    setResume((current) => ({
      ...current,

      education:
        current.education.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  [field]: value,
                }
              : item
        ),
    }));
  }

  /* =======================================================
     PROJECTS
  ======================================================= */

  function addProject() {
    setResume((current) => ({
      ...current,

      projects: [
        ...current.projects,

        {
          id: crypto.randomUUID(),

          name: "",

          technologies: "",

          description: "",

          link: "",
        },
      ],
    }));
  }

  function removeProject(
    id: string
  ) {
    setResume((current) => ({
      ...current,

      projects:
        current.projects.filter(
          (item) =>
            item.id !== id
        ),
    }));
  }

  function updateProject(
    id: string,

    field:
      | "name"
      | "technologies"
      | "description"
      | "link",

    value: string
  ) {
    setResume((current) => ({
      ...current,

      projects:
        current.projects.map(
          (item) =>
            item.id === id
              ? {
                  ...item,

                  [field]: value,
                }
              : item
        ),
    }));
  }

  /* =======================================================
     SKILLS
  ======================================================= */

  function addSkill() {
    const skill =
      skillInput.trim();

    if (!skill) {
      return;
    }

    const alreadyExists =
      resume.skills.some(
        (item) =>
          item.toLowerCase() ===
          skill.toLowerCase()
      );

    if (alreadyExists) {
      setSkillInput("");

      return;
    }

    setResume((current) => ({
      ...current,

      skills: [
        ...current.skills,

        skill,
      ],
    }));

    setSkillInput("");
  }

  function removeSkill(
    skill: string
  ) {
    setResume((current) => ({
      ...current,

      skills:
        current.skills.filter(
          (item) =>
            item !== skill
        ),
    }));
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="border-b border-slate-200 bg-white">

        <Container>

          <div className="py-12 sm:py-16">

            <div className="max-w-3xl">

              {/* Badge */}

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">

                <Sparkles className="h-4 w-4" />

                Toolwala Resume Engine

              </div>

              {/* Heading */}

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">

                Build an ATS-friendly resume

              </h1>

              {/* Description */}

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">

                Create a clean, structured resume designed
                to be readable by applicant tracking systems
                and easy for recruiters to understand.

              </p>

            </div>

          </div>

        </Container>

      </section>

      {/* ===================================================
          MAIN BUILDER
      =================================================== */}

      <Container>

  {/* RESUME TOOLBAR */}
  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

    <ResumeToolbar
      onPrint={printResume}
      onClear={clearResume}
    />

    <SaveStatus
      isSaving={isSaving}
      lastSaved={lastSaved}
    />

  </div>

  <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="space-y-6">

                    <ResumeTemplates
          value={resume.template}
          onChange={(template) =>
            setResume((current) => ({
              ...current,
              template,
            }))
          }
/>

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-950">

                Personal information

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Use information that recruiters can easily
                identify.

              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <Input
                  label="Full name"
                  value={
                    resume.personal.fullName
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "fullName",
                      value
                    )
                  }
                  placeholder="John Doe"
                />

                <Input
                  label="Target job title"
                  value={
                    resume.personal.jobTitle
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "jobTitle",
                      value
                    )
                  }
                  placeholder="Software Engineer"
                />

                <Input
                  label="Email"
                  value={
                    resume.personal.email
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "email",
                      value
                    )
                  }
                  placeholder="john@example.com"
                />

                <Input
                  label="Phone"
                  value={
                    resume.personal.phone
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "phone",
                      value
                    )
                  }
                  placeholder="+91 9876543210"
                />

                <Input
                  label="Location"
                  value={
                    resume.personal.location
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "location",
                      value
                    )
                  }
                  placeholder="New Delhi, India"
                />

                <Input
                  label="LinkedIn"
                  value={
                    resume.personal.linkedin
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "linkedin",
                      value
                    )
                  }
                  placeholder="linkedin.com/in/johndoe"
                />

                <Input
                  label="GitHub"
                  value={
                    resume.personal.github
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "github",
                      value
                    )
                  }
                  placeholder="github.com/johndoe"
                />

              </div>

            </section>

            {/* =================================================
                JOB DESCRIPTION
            ================================================= */}

            <JobDescriptionAnalyzer
              value={
                resume.targetJobDescription
              }

              analysis={jdAnalysis}

              onChange={(value) =>
                setResume((current) => ({
                  ...current,

                  targetJobDescription:
                    value,
                }))
              }

              onAnalyze={
                handleAnalyzeJob
              }
            />

            {/* =================================================
                PROFESSIONAL SUMMARY
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-950">

                Professional summary

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Keep it specific, concise and relevant to
                the target role.

              </p>

              <textarea
                value={resume.summary}
                onChange={(event) =>
                  setResume((current) => ({
                    ...current,

                    summary:
                      event.target.value,
                  }))
                }
                rows={6}
                placeholder="Software engineer with experience building..."
                className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">

                {resume.summary.length}{" "}
                characters

              </p>

            </section>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-950">

                    Experience

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Add internships, jobs and relevant
                    professional experience.

                  </p>

                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >

                  <Plus className="h-4 w-4" />

                  Add

                </button>

              </div>

              <div className="mt-6 space-y-6">

                {resume.experience.length ===
                  0 && (
                  <EmptySection
                    text="No experience added yet."
                  />
                )}

                {resume.experience.map(
                  (experience) => (

                    <div
                      key={experience.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            removeExperience(
                              experience.id
                            )
                          }
                          aria-label="Remove experience"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >

                          <Trash2 className="h-4 w-4" />

                        </button>

                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">

                        <Input
                          label="Company"
                          value={
                            experience.company
                          }
                          onChange={(value) =>
                            updateExperience(
                              experience.id,
                              "company",
                              value
                            )
                          }
                          placeholder="ABC Technologies"
                        />

                        <Input
                          label="Role"
                          value={
                            experience.role
                          }
                          onChange={(value) =>
                            updateExperience(
                              experience.id,
                              "role",
                              value
                            )
                          }
                          placeholder="Software Engineer"
                        />

                        <Input
                          label="Location"
                          value={
                            experience.location
                          }
                          onChange={(value) =>
                            updateExperience(
                              experience.id,
                              "location",
                              value
                            )
                          }
                          placeholder="Bangalore, India"
                        />

                        <Input
                          label="Start date"
                          value={
                            experience.startDate
                          }
                          onChange={(value) =>
                            updateExperience(
                              experience.id,
                              "startDate",
                              value
                            )
                          }
                          placeholder="Jun 2024"
                        />

                        <Input
                          label="End date"
                          value={
                            experience.endDate
                          }
                          onChange={(value) =>
                            updateExperience(
                              experience.id,
                              "endDate",
                              value
                            )
                          }
                          placeholder="Present"
                        />

                      </div>

                      <TextArea
                        label="Description"
                        value={
                          experience.description
                        }
                        onChange={(value) =>
                          updateExperience(
                            experience.id,
                            "description",
                            value
                          )
                        }
                        placeholder="Built REST APIs using Spring Boot..."
                      />

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================================
                PROJECTS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-950">

                    Projects

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Highlight projects relevant to your
                    target role.

                  </p>

                </div>

                <button
                  type="button"
                  onClick={addProject}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >

                  <Plus className="h-4 w-4" />

                  Add

                </button>

              </div>

              <div className="mt-6 space-y-6">

                {resume.projects.length ===
                  0 && (
                  <EmptySection
                    text="No projects added yet."
                  />
                )}

                {resume.projects.map(
                  (project) => (

                    <div
                      key={project.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            removeProject(
                              project.id
                            )
                          }
                          aria-label="Remove project"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >

                          <Trash2 className="h-4 w-4" />

                        </button>

                      </div>

                      <div className="space-y-4">

                        <Input
                          label="Project name"
                          value={
                            project.name
                          }
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "name",
                              value
                            )
                          }
                          placeholder="Banking Portal"
                        />

                        <Input
                          label="Technologies"
                          value={
                            project.technologies
                          }
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "technologies",
                              value
                            )
                          }
                          placeholder="Java, Spring Boot, React, MySQL"
                        />

                        <Input
                          label="Project link"
                          value={
                            project.link
                          }
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "link",
                              value
                            )
                          }
                          placeholder="github.com/johndoe/project"
                        />

                        <TextArea
                          label="Description"
                          value={
                            project.description
                          }
                          onChange={(value) =>
                            updateProject(
                              project.id,
                              "description",
                              value
                            )
                          }
                          placeholder="Built a banking platform..."
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================================
                EDUCATION
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold text-slate-950">

                    Education

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Add your academic background.

                  </p>

                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >

                  <Plus className="h-4 w-4" />

                  Add

                </button>

              </div>

              <div className="mt-6 space-y-6">

                {resume.education.length ===
                  0 && (
                  <EmptySection
                    text="No education added yet."
                  />
                )}

                {resume.education.map(
                  (education) => (

                    <div
                      key={education.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex justify-end">

                        <button
                          type="button"
                          onClick={() =>
                            removeEducation(
                              education.id
                            )
                          }
                          aria-label="Remove education"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >

                          <Trash2 className="h-4 w-4" />

                        </button>

                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">

                        <Input
                          label="Institution"
                          value={
                            education.institution
                          }
                          onChange={(value) =>
                            updateEducation(
                              education.id,
                              "institution",
                              value
                            )
                          }
                          placeholder="ABC University"
                        />

                        <Input
                          label="Degree"
                          value={
                            education.degree
                          }
                          onChange={(value) =>
                            updateEducation(
                              education.id,
                              "degree",
                              value
                            )
                          }
                          placeholder="B.Tech Computer Science"
                        />

                        <Input
                          label="Location"
                          value={
                            education.location
                          }
                          onChange={(value) =>
                            updateEducation(
                              education.id,
                              "location",
                              value
                            )
                          }
                          placeholder="Delhi, India"
                        />

                        <Input
                          label="Start date"
                          value={
                            education.startDate
                          }
                          onChange={(value) =>
                            updateEducation(
                              education.id,
                              "startDate",
                              value
                            )
                          }
                          placeholder="2022"
                        />

                        <Input
                          label="End date"
                          value={
                            education.endDate
                          }
                          onChange={(value) =>
                            updateEducation(
                              education.id,
                              "endDate",
                              value
                            )
                          }
                          placeholder="2026"
                        />

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================================
                SKILLS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-950">

                Skills

              </h2>

              <p className="mt-1 text-sm text-slate-500">

                Add genuine skills relevant to your target
                role.

              </p>

              <div className="mt-5 flex gap-2">

                <input
                  value={skillInput}
                  onChange={(event) =>
                    setSkillInput(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {

                    if (
                      event.key ===
                      "Enter"
                    ) {

                      event.preventDefault();

                      addSkill();

                    }

                  }}
                  placeholder="Java"
                  className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-blue-600"
                >

                  Add

                </button>

              </div>

              <div className="mt-4 flex flex-wrap gap-2">

                {resume.skills.map(
                  (skill) => (

                    <button
                      key={skill}
                      type="button"
                      onClick={() =>
                        removeSkill(
                          skill
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >

                      {skill} ×

                    </button>

                  )
                )}

              </div>

            </section>

          </div>


                      {/* =====================================================
                EVIDENCE VAULT
            ===================================================== */}

            <div className="mt-8">
              <EvidencePanel
                evidence={resume.evidence}
                onAdd={(item) =>
                  setResume((current) => ({
                    ...current,
                    evidence: [
                      ...current.evidence,
                      item,
                    ],
                  }))
                }
              />
            </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* ATS */}

            <ATSHealth
              analysis={atsAnalysis}
            />

            {/* JOB MATCH */}

            <JobMatch
              analysis={jobMatch}
            />

            {/* TRUTH LOCK */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <h3 className="font-bold text-blue-950">

                Toolwala Truth Lock

              </h3>

              <p className="mt-2 text-sm leading-6 text-blue-800">

                Toolwala will never invent companies,
                achievements, metrics, certifications or
                skills just to improve your job match.

              </p>

            </div>

          </aside>

        </div>

        {/* ===================================================
            LIVE RESUME PREVIEW
        =================================================== */}

        <section className="pb-16">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-950">

              Live resume preview

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Your resume uses a clean, single-column
              structure designed for reliable parsing.

            </p>

          </div>

          <ResumePreview
            resume={resume}
          />

        </section>

      </Container>

    </main>
  );
}

/* =========================================================
   INPUT COMPONENT
========================================================= */

type InputProps = {
  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;
};

function Input({
  label,
  value,
  onChange,
  placeholder,
}: InputProps) {
  return (
    <label className="block">

      <span className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

    </label>
  );
}

/* =========================================================
   TEXTAREA COMPONENT
========================================================= */

type TextAreaProps = {
  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;
};

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  return (
    <label className="mt-4 block">

      <span className="mb-2 block text-sm font-semibold text-slate-700">

        {label}

      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        rows={5}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

    </label>
  );
}

/* =========================================================
   EMPTY SECTION
========================================================= */

function EmptySection({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">

      <p className="text-sm text-slate-500">

        {text}

      </p>

    </div>
  );
}