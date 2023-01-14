const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
/**
* @swagger
*
* definitions:
 *     userCerdentials:
 *        type: object
 *        required:
 *        - email
 *        - password
 *        properties:
 *            email:
 *                    type: string
 *                    example: ahmed123
 *            password:
 *                    type: string
 *                    example: 1234
*/

// User
/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    description: Get ALl users
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Un Authorized-Access
 *      '404':
 *        description: user has no cars
 *      '204':
 *        description: No Violations found
 */
router
  .route('/')
  .get(authenticateUser, authorizeRoles('admin'), getAllUsers);
/**
 * @swagger
 * /api/v1/user/profile:
 *  get:
 *    description: Get user profile 
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Un Authorized-Access
 *      '404':
 *        description: user has no cars
 *      '204':
 *        description: No Violations found
 */
router.route('/profile').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

router.route('/:id').get(authenticateUser,getSingleUser);

module.exports = router;