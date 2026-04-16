import {
  getAbout,
  getProjects,
  getSkills,
  getExperience,
  getEducation,
  getContact
} from '../services/portfolioService.js';

const respond = (serviceFn) => async (_req, res, next) => {
  try {
    const data = await serviceFn();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const fetchAbout = respond(getAbout);
export const fetchProjects = respond(getProjects);
export const fetchSkills = respond(getSkills);
export const fetchExperience = respond(getExperience);
export const fetchEducation = respond(getEducation);
export const fetchContact = respond(getContact);
