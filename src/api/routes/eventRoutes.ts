import express from 'express';
import { 
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  listEvents,
  triggerEvent
} from '../controllers/EventController';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateJWT, createEvent);
router.get('/:eventId', authenticateJWT, getEvent);
router.put('/:eventId', authenticateJWT, updateEvent);
router.delete('/:eventId', authenticateJWT, deleteEvent);
router.get('/', authenticateJWT, listEvents);
router.post('/trigger', authenticateJWT, triggerEvent);

export default router;