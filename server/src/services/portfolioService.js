import { query } from '../config/db.js';

export const getAbout = async () => {
  const rows = await query(
    `SELECT id, name, title, bio
     FROM about
     ORDER BY id ASC
     LIMIT 1`
  );

  return rows[0] ?? null;
};

export const getProjects = async () =>
  query(
    `SELECT id, title, description, tech_stack, github_link, live_link
     FROM projects
     ORDER BY id ASC`
  );

export const getSkills = async () => {
  const rows = await query(
    `SELECT id, category, skill_name
     FROM skills
     ORDER BY category ASC, skill_name ASC`
  );

  return rows.reduce((groups, row) => {
    if (!groups[row.category]) {
      groups[row.category] = [];
    }

    groups[row.category].push({
      id: row.id,
      skillName: row.skill_name
    });

    return groups;
  }, {});
};

export const getExperience = async () =>
  query(
    `SELECT id, role, company, duration, description
     FROM experience
     ORDER BY id DESC`
  );

export const getEducation = async () =>
  query(
    `SELECT id, degree, institution, year
     FROM education
     ORDER BY year DESC`
  );

export const getContact = async () =>
  query(
    `SELECT id, type, value
     FROM contact
     ORDER BY id ASC`
  );
