import { ResumeData } from "@/types/resume";

type Props = {
  resume: ResumeData;
};

export default function ResumePreview({
  resume,
}: Props) {
  const hasExperience = resume.experience.length > 0;
  const hasEducation = resume.education.length > 0;
  const hasProjects = resume.projects.length > 0;
  const hasSkills = resume.skills.length > 0;

  return (
    <div className="resume-preview w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-sm sm:p-4 md:p-6">

      {/* Actual resume paper */}
      <div className="resume-printable mx-auto w-full max-w-[794px] min-w-0 bg-white px-4 py-6 text-slate-900 shadow-sm sm:px-8 sm:py-10 md:px-12 md:py-12">

        {/* ========================================
            HEADER
        ======================================== */}

        <header className="border-b border-slate-300 pb-5">

          <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
            {resume.personal.fullName || "Your Name"}
          </h1>

          <p className="mt-1 break-words text-base font-medium text-slate-700 sm:text-lg">
            {resume.personal.jobTitle || "Professional Title"}
          </p>

          <div className="mt-3 flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 sm:gap-x-4 sm:text-sm">

            {resume.personal.email && (
              <span className="break-all">
                {resume.personal.email}
              </span>
            )}

            {resume.personal.phone && (
              <span className="break-all">
                {resume.personal.phone}
              </span>
            )}

            {resume.personal.location && (
              <span className="break-words">
                {resume.personal.location}
              </span>
            )}

          </div>

          <div className="mt-1 flex min-w-0 flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">

            {resume.personal.linkedin && (
              <span className="break-all">
                {resume.personal.linkedin}
              </span>
            )}

            {resume.personal.github && (
              <span className="break-all">
                {resume.personal.github}
              </span>
            )}

          </div>

        </header>

        {/* ========================================
            SUMMARY
        ======================================== */}

        {resume.summary && (
          <section className="resume-section mt-6">

            <h2 className="break-words border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
              Professional Summary
            </h2>

            <p className="mt-3 break-words text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
              {resume.summary}
            </p>

          </section>
        )}

        {/* ========================================
            EXPERIENCE
        ======================================== */}

        {hasExperience && (
          <section className="resume-section mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Experience
            </h2>

            <div className="mt-4 space-y-5">

              {resume.experience.map((experience) => (

                <div key={experience.id}>

                  <div className="flex flex-col justify-between gap-1 sm:flex-row">

                    <div className="min-w-0">

                      <h3 className="break-words font-bold">
                        {experience.role}
                      </h3>

                      <p className="break-words text-sm font-medium text-slate-700">
                        {experience.company}
                      </p>

                    </div>

                    <div className="text-sm text-slate-600 sm:text-right">

                      <p>
                        {experience.startDate} - {experience.endDate}
                      </p>

                      {experience.location && (
                        <p className="break-words">
                          {experience.location}
                        </p>
                      )}

                    </div>

                  </div>

                  {experience.description && (
                    <p className="mt-2 break-words whitespace-pre-line text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
                      {experience.description}
                    </p>
                  )}

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ========================================
            PROJECTS
        ======================================== */}

        {hasProjects && (
          <section className="resume-section mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Projects
            </h2>

            <div className="mt-4 space-y-5">

              {resume.projects.map((project) => (

                <div key={project.id}>

                  <h3 className="break-words font-bold">
                    {project.name}
                  </h3>

                  {project.technologies && (
                    <p className="mt-1 break-words text-sm font-medium text-slate-600">
                      Technologies: {project.technologies}
                    </p>
                  )}

                  {project.description && (
                    <p className="mt-2 break-words whitespace-pre-line text-sm leading-6 text-slate-700">
                      {project.description}
                    </p>
                  )}

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ========================================
            EDUCATION
        ======================================== */}

        {hasEducation && (
          <section className="resume-section mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Education
            </h2>

            <div className="mt-4 space-y-4">

              {resume.education.map((education) => (

                <div
                  key={education.id}
                  className="flex flex-col justify-between gap-1 sm:flex-row"
                >

                  <div className="min-w-0">

                    <h3 className="break-words font-bold">
                      {education.degree}
                    </h3>

                    <p className="break-words text-sm text-slate-700">
                      {education.institution}
                    </p>

                  </div>

                  <div className="text-sm text-slate-600 sm:text-right">

                    <p>
                      {education.startDate} - {education.endDate}
                    </p>

                    {education.location && (
                      <p className="break-words">
                        {education.location}
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}

        {/* ========================================
            SKILLS
        ======================================== */}

        {hasSkills && (
          <section className="resume-section mt-6">

            <h2 className="border-b border-slate-200 pb-1 text-sm font-bold uppercase tracking-wider">
              Skills
            </h2>

            <p className="mt-3 break-words text-sm leading-6 text-slate-700">
              {resume.skills.join(" • ")}
            </p>

          </section>
        )}

      </div>
    </div>
  );
}
