const jwtUtils = require('../utils/jwtUtils');
const userService = require('../services/UserService');

/**
 * Middleware to protect routes and verify JWT tokens
 */
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // 2. Verify token
    const decoded = jwtUtils.verifyToken(token);

    // 3. Attach user profile to request (including role-specific data)
    // We already fetch the full profile in the service to save on DB calls later
    const user = await userService.getUserProfile(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this ID'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

/**
 * Middleware to restrict access based on user roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
