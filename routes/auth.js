const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require('../middleware/authentication');

const {
  register,
  login,
  addUser,
  verifyEmail,
} = require('../controllers/authController');
/**
 * @swagger
 * /api/v1/auth/add-user:
 *  post:
 *    requestBody:
 *      content: 
 *         application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: info@gmail.com
 *                    password:
 *                      type: string
 *                      example: ahmed@1234
 *                    username:
 *                      type: string
 *                      example: ahmed1
 *    description: Register To AIactive for users
 *    responses:
 *      '201':
 *        description: User Added To info System
 *      '400':
 *        description: Bad Request
 *      '409':
 *        description: Conflict User Alreday Registered
 *      '500':
 *        description: Internal Server Error
 *      '209':
 *        description: Registered But Messanger Failed to Send OTP 
 */
router.post('/add-user',authenticateUser,authorizeRoles('admin'), addUser);
/**
 * @swagger
 * /api/v1/auth/register-admin:
 *  post:
 *    requestBody:
 *      content: 
 *         application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                      example: info@gmail.com
 *                    password:
 *                      type: string
 *                      example: ahmed@1234
 *                    username:
 *                      type: string
 *                      example: ahmed1
 *    description: Register To Safe-road Mobile App Using Valid Saudi Number && Password
 *    responses:
 *      '201':
 *        description: User Added To info System
 *      '400':
 *        description: Bad Request
 *      '409':
 *        description: Conflict User Alreday Registered
 *      '500':
 *        description: Internal Server Error
 *      '209':
 *        description: Registered But Messanger Failed to Send OTP 
 */
router.post('/register-admin', register);
/**
     * @swagger
     * /api/v1/auth/login:
     *  post:
     *      name: login
     *      produces:
     *          - application/json
     *      consumes:
     *          - application/json
     *      summary: login
     *      requestBody:
     *         content:
     *            application/json:
     *               schema:
     *                  type: object
     *                  properties:
     *                     email:          # <!--- form field name
     *                        type: string
     *                        example: info@gmail.com
     *                     password:          # <!--- form field name
     *                        type: string
     *                        example: ahmed1234
     *      responses:
     *            200:
     *                description: everything is ok
     *            400:
     *                description: bad request
     *            500:
     *                description: internal server error
     */
router.post('/login', login);
router.post('/verify-email', verifyEmail);

module.exports = router;