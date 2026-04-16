import { Router } from 'express';
import {
  fetchAbout,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchEducation,
  fetchContact
} from '../controllers/portfolioController.js';

const router = Router();

router.get('/about', fetchAbout);
router.get('/projects', fetchProjects);
router.get('/skills', fetchSkills);
router.get('/experience', fetchExperience);
router.get('/education', fetchEducation);
router.get('/contact', fetchContact);

export default router;
