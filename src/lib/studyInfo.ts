/** Derive admission year, year of study, and semester from enrollment (e.g. 841/24). */
export function getStudyInfo(enrollment: string): {
  admissionYear: number | null;
  yearOfStudy: number | null;
  semester: number | null;
} {
  if (!enrollment.includes("/")) {
    return { admissionYear: null, yearOfStudy: null, semester: null };
  }

  try {
    const parts = enrollment.split("/");
    const admissionYear = 2000 + parseInt(parts[1], 10);
    const now = new Date();
    const yearOfStudy = now.getFullYear() - admissionYear + 1;
    const semester =
      now.getMonth() + 1 >= 7 ? yearOfStudy * 2 - 1 : yearOfStudy * 2;

    return { admissionYear, yearOfStudy, semester };
  } catch {
    return { admissionYear: null, yearOfStudy: null, semester: null };
  }
}
