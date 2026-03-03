const userService = require('../services/UserService');
const jwtUtils = require('../utils/jwtUtils');

/**
 * Register a new user
 * @route POST /api/auth/signup
 */
const signup = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    const token = jwtUtils.generateToken(user.user_id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  signup
};
