import { ResumeData } from "@/types/resume";

type Props = {
  resume: ResumeData;
};

export default function ResumePreview({
  resume,
}: Props) {
  const hasExperience =
    resume.experience.length > 0;

  const hasEducation =
    resume.education.length > 0;

  const hasProjects =
    resume.projects.length > 0;

  const hasSkills =
    resume.skills.length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">

      <div className="mx-auto max-w-[850px] bg-white px-8 py-10 text-slate-900 shadow-sm sm:px-12 sm:py-12">

        {/* ========================================
            HEADER
        ======================================== */}

        <header className="border-b border-slate-300 pb-5">

          <h1 className="text-3xl font-bold tracking-tight">
            {resume.personal.fullName ||
              "Your Name"}
          </h1>

          <p className="mt-1 text-lg font-medium text-slate-700">
            {resume.personal.jobTitle ||
              "Professional Title"}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">

            {resume.personal.email && (
              <span>
                {resume.personal.email}
              </span>
            )}

            {resume.personal.phone && (
              <span>
                {resume.personal.phone}
              </span>
            )}

            {resume.personal.location && (
              <span>
                {resume.personal.location}
              </span>
            )}

          </div>

          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">

            {resume.personal.linkedin && (
              <span>
                {resume.personal.linkedin}
              </span>
            )}

            {resume.personal.github && (
              <span>
                {resume.personal.github}
              </span>
            )}

          </div>

        </header>

        {/* ========================================
            SUMMARY
        ======================================== */}

        {resume.summary && (

          <section className="mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Professional Summary
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              {resume.summary}
            </p>

          </section>

        )}

        {/* ========================================
            EXPERIENCE
        ======================================== */}

        {hasExperience && (

          <section className="mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Experience
            </h2>

            <div className="mt-4 space-y-5">

              {resume.experience.map(
                (experience) => (

                  <div key={experience.id}>

                    <div className="flex flex-col justify-between gap-1 sm:flex-row">

                      <div>

                        <h3 className="font-bold">
                          {experience.role}
                        </h3>

                        <p className="text-sm font-medium text-slate-700">
                          {experience.company}
                        </p>

                      </div>

                      <div className="text-sm text-slate-600 sm:text-right">

                        <p>
                          {experience.startDate}{" "}
                          -{" "}
                          {experience.endDate}
                        </p>

                        {experience.location && (
                          <p>
                            {experience.location}
                          </p>
                        )}

                      </div>

                    </div>

                    {experience.description && (

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                        {experience.description}
                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          </section>

        )}

        {/* ========================================
            PROJECTS
        ======================================== */}

        {hasProjects && (

          <section className="mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Projects
            </h2>

            <div className="mt-4 space-y-5">

              {resume.projects.map(
                (project) => (

                  <div key={project.id}>

                    <h3 className="font-bold">
                      {project.name}
                    </h3>

                    {project.technologies && (

                      <p className="mt-1 text-sm font-medium text-slate-600">
                        Technologies:{" "}
                        {project.technologies}
                      </p>

                    )}

                    {project.description && (

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                        {project.description}
                      </p>

                    )}

                  </div>

                )
              )}

            </div>

          </section>

        )}

        {/* ========================================
            EDUCATION
        ======================================== */}

        {hasEducation && (

          <section className="mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Education
            </h2>

            <div className="mt-4 space-y-4">

              {resume.education.map(
                (education) => (

                  <div
                    key={education.id}
                    className="flex flex-col justify-between gap-1 sm:flex-row"
                  >

                    <div>

                      <h3 className="font-bold">
                        {education.degree}
                      </h3>

                      <p className="text-sm text-slate-700">
                        {education.institution}
                      </p>

                    </div>

                    <div className="text-sm text-slate-600 sm:text-right">

                      <p>
                        {education.startDate}{" "}
                        -{" "}
                        {education.endDate}
                      </p>

                      {education.location && (
                        <p>
                          {education.location}
                        </p>
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

        )}

        {/* ========================================
            SKILLS
        ======================================== */}

        {hasSkills && (

          <section className="mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Skills
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              {resume.skills.join(" • ")}
            </p>

          </section>

        )}

      </div>

    </div>
  );
}