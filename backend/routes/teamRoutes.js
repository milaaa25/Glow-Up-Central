// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllTeam,
  getTeamById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');

router.get('/', getAllTeam);          // GET    /api/team
router.get('/:id', getTeamById);      // GET    /api/team/:id
router.post('/', createTeamMember);   // POST   /api/team
router.put('/:id', updateTeamMember); // PUT    /api/team/:id
router.delete('/:id', deleteTeamMember); // DELETE /api/team/:id

module.exports = router;
