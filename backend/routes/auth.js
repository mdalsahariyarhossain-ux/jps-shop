const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

// 📌 Register user
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, email, password, phone, dob, gender } = req.body

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        dob,
        gender
      })
      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' })

      res.status(201).json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          dob: newUser.dob,
          gender: newUser.gender
        }
      })
    } catch (err) {
      console.error('Register error:', err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// 📌 Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender
      }
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// 📌 Get logged-in user details
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error('Get user error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// 📌 Logout user
router.post('/logout', auth, async (req, res) => {
  try {
    // If you were using sessions, you could destroy them here.
    // Since you use JWT, the frontend will simply delete the token.
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (err) {
    console.error('Logout error:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router