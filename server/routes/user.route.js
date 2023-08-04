const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToekn');
const router = express.Router();

const app = express();
router.use(verifyToken)

router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.get('/', userController.getUsers);
router.patch('/org', userController.updateOrg)
router.patch('/:userId', userController.updateUserInfo);
router.patch('/role/:userRoleId', userController.updateUserRole);
router.delete('/:userId', userController.deleteUser);

module.exports = router;