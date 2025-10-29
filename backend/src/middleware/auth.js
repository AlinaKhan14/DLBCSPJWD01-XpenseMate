const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Middleware to check if user is authenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requireAuth = async (req, res, next) => {
  try {
    let token = null;

    // Only use Authorization header if it's properly formatted
    const authHeader = req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ') && !authHeader.includes('undefined')) {
      token = authHeader.replace('Bearer ', '');
      logger.debug('Using token from Authorization header');
    } else if (req.cookies?.token) {
      token = req.cookies.token;
      logger.debug('Using token from cookie');
    }

    if (!token) {
      logger.error('No valid token found', {
        hasAuthHeader: !!req.header('Authorization'),
        hasCookie: !!req.cookies?.token
      });
      throw new Error('No token provided, Unauthorized User!');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      logger.debug('JWT verified successfully', { userId: decoded.id });
      
      const user = await User.findOne({ _id: decoded.id });

      if (!user) {
        throw new Error('User not found');
      }
      req.token = token;
      req.user = user;
      next();
    } catch (jwtError) {
      logger.error('JWT verification failed', {
        error: jwtError.message,
        tokenSource: authHeader ? 'header' : 'cookie'
      });
      throw new Error('Invalid token');
    }
  } catch (error) {
    logger.info('what the fuck is going on');
    logger.error('Authentication error 1234', { 
      error: error.message,
      path: req.path
    });
  
    return res.status(401).json({
      type: 'error',
      title: 'Authentication Failed',
      message: 'Please log in to access this resource'
    });
  }
};

module.exports = { requireAuth }; 