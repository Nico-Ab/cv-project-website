export interface SqlDemoPreset {
  id: string;
  label: string;
  description: string;
  sql: string;
}

export interface SqlDemoSchemaTable {
  name: string;
  description: string;
  columns: string[];
}

export const sqlDemoSchema: SqlDemoSchemaTable[] = [
  {
    name: "staff_members",
    description: "Staff records grouped by faculty and department.",
    columns: ["id", "full_name", "faculty", "department"],
  },
  {
    name: "mobility_cases",
    description: "Sample Erasmus-style mobility cases with status, destination, and budget fields.",
    columns: [
      "id",
      "staff_id",
      "host_country",
      "programme",
      "status",
      "planned_days",
      "requested_budget_eur",
      "approved_budget_eur",
      "submitted_on",
    ],
  },
  {
    name: "case_documents",
    description: "Uploaded case documents and their review state.",
    columns: ["id", "case_id", "document_type", "review_state", "uploaded_on"],
  },
];

export const sqlDemoPresets: SqlDemoPreset[] = [
  {
    id: "latest_cases",
    label: "Latest case list",
    description: "Inspect the most recent cases with staff and faculty context.",
    sql: `SELECT
  m.id AS case_id,
  s.full_name,
  s.faculty,
  m.host_country,
  m.status,
  m.planned_days,
  m.requested_budget_eur
FROM mobility_cases AS m
JOIN staff_members AS s ON s.id = m.staff_id
ORDER BY m.submitted_on DESC
LIMIT 8;`,
  },
  {
    id: "faculty_summary",
    label: "Cases by faculty",
    description: "Count cases and approved cases per faculty.",
    sql: `SELECT
  s.faculty,
  COUNT(*) AS case_count,
  SUM(CASE WHEN m.status = 'approved' THEN 1 ELSE 0 END) AS approved_count
FROM mobility_cases AS m
JOIN staff_members AS s ON s.id = m.staff_id
GROUP BY s.faculty
ORDER BY case_count DESC, s.faculty;`,
  },
  {
    id: "country_duration",
    label: "Average duration by country",
    description: "Compare average planned mobility length by destination country.",
    sql: `SELECT
  host_country,
  ROUND(AVG(planned_days), 1) AS avg_days,
  COUNT(*) AS case_count
FROM mobility_cases
WHERE status IN ('submitted', 'approved', 'completed')
GROUP BY host_country
ORDER BY avg_days DESC, host_country;`,
  },
  {
    id: "missing_documents",
    label: "Missing signed agreements",
    description: "Find submitted or approved cases without a signed agreement document.",
    sql: `SELECT
  m.id AS case_id,
  s.full_name,
  m.host_country,
  m.status
FROM mobility_cases AS m
JOIN staff_members AS s ON s.id = m.staff_id
LEFT JOIN case_documents AS d
  ON d.case_id = m.id
 AND d.document_type = 'signed_agreement'
WHERE m.status IN ('submitted', 'approved')
GROUP BY m.id, s.full_name, m.host_country, m.status
HAVING COUNT(d.id) = 0
ORDER BY m.id;`,
  },
  {
    id: "approved_budget",
    label: "Approved budget by programme",
    description: "Summarize approved budgets across programme types.",
    sql: `SELECT
  programme,
  COUNT(*) AS approved_cases,
  SUM(approved_budget_eur) AS approved_budget_eur
FROM mobility_cases
WHERE status = 'approved'
GROUP BY programme
ORDER BY approved_budget_eur DESC, programme;`,
  },
];

export const sqlDemoDefaultQuery = sqlDemoPresets[0].sql;

export const sqlDemoSeedSql = `
CREATE TABLE staff_members (
  id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  faculty TEXT NOT NULL,
  department TEXT NOT NULL
);

CREATE TABLE mobility_cases (
  id INTEGER PRIMARY KEY,
  staff_id INTEGER NOT NULL,
  host_country TEXT NOT NULL,
  programme TEXT NOT NULL,
  status TEXT NOT NULL,
  planned_days INTEGER NOT NULL,
  requested_budget_eur INTEGER NOT NULL,
  approved_budget_eur INTEGER,
  submitted_on TEXT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_members(id)
);

CREATE TABLE case_documents (
  id INTEGER PRIMARY KEY,
  case_id INTEGER NOT NULL,
  document_type TEXT NOT NULL,
  review_state TEXT NOT NULL,
  uploaded_on TEXT NOT NULL,
  FOREIGN KEY (case_id) REFERENCES mobility_cases(id)
);

INSERT INTO staff_members (id, full_name, faculty, department) VALUES
  (1, 'Anna Petrova', 'Informatics', 'Distributed Systems'),
  (2, 'Georgi Stoyanov', 'Mathematics', 'Applied Analysis'),
  (3, 'Maria Ivanova', 'Philology', 'German Studies'),
  (4, 'Stefan Dimitrov', 'Economics', 'Management'),
  (5, 'Elena Koleva', 'Informatics', 'Software Engineering'),
  (6, 'Nikolay Marinov', 'Education', 'Pedagogy'),
  (7, 'Viktoria Ilieva', 'Philology', 'Linguistics'),
  (8, 'Dimitar Hristov', 'Economics', 'Finance');

INSERT INTO mobility_cases (
  id,
  staff_id,
  host_country,
  programme,
  status,
  planned_days,
  requested_budget_eur,
  approved_budget_eur,
  submitted_on
) VALUES
  (101, 1, 'Germany', 'Teaching', 'approved', 5, 1400, 1250, '2026-02-12'),
  (102, 3, 'Austria', 'Training', 'submitted', 4, 1100, NULL, '2026-02-18'),
  (103, 5, 'Netherlands', 'Teaching', 'completed', 6, 1550, 1500, '2026-01-24'),
  (104, 2, 'Poland', 'Training', 'approved', 3, 900, 880, '2026-02-05'),
  (105, 4, 'Spain', 'Teaching', 'draft', 7, 1800, NULL, '2026-03-04'),
  (106, 6, 'Belgium', 'Training', 'submitted', 5, 1320, NULL, '2026-03-01'),
  (107, 7, 'Germany', 'Teaching', 'approved', 4, 1200, 1180, '2026-02-27'),
  (108, 8, 'Italy', 'Training', 'rejected', 5, 1280, NULL, '2026-02-08'),
  (109, 1, 'Czech Republic', 'Training', 'submitted', 2, 650, NULL, '2026-03-08'),
  (110, 5, 'France', 'Teaching', 'approved', 8, 2100, 1980, '2026-01-30');

INSERT INTO case_documents (id, case_id, document_type, review_state, uploaded_on) VALUES
  (201, 101, 'invitation_letter', 'approved', '2026-02-10'),
  (202, 101, 'signed_agreement', 'approved', '2026-02-11'),
  (203, 101, 'budget_form', 'approved', '2026-02-11'),
  (204, 102, 'invitation_letter', 'approved', '2026-02-17'),
  (205, 102, 'budget_form', 'pending', '2026-02-18'),
  (206, 103, 'invitation_letter', 'approved', '2026-01-20'),
  (207, 103, 'signed_agreement', 'approved', '2026-01-21'),
  (208, 104, 'invitation_letter', 'approved', '2026-02-02'),
  (209, 104, 'signed_agreement', 'approved', '2026-02-04'),
  (210, 106, 'invitation_letter', 'approved', '2026-02-28'),
  (211, 107, 'invitation_letter', 'approved', '2026-02-25'),
  (212, 107, 'signed_agreement', 'approved', '2026-02-26'),
  (213, 108, 'invitation_letter', 'rejected', '2026-02-06'),
  (214, 109, 'invitation_letter', 'approved', '2026-03-07'),
  (215, 110, 'invitation_letter', 'approved', '2026-01-27'),
  (216, 110, 'signed_agreement', 'approved', '2026-01-28'),
  (217, 110, 'budget_form', 'approved', '2026-01-28');
`;
