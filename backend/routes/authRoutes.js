import express from 'express';
import {
  signUp,
  signIn,
  completeProfile,
  getProfileByUserID,
  getProfileById
} from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// Profile routes
router.post('/profile/:userId', completeProfile);
router.get('/profile/user/:userID', getProfileByUserID);
router.get('/profile/:userId', getProfileById);

export default router;
