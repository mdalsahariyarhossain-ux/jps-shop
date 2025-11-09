const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' })
    }

    const token = authHeader.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error('Auth middleware error:', err.message)
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }
}
