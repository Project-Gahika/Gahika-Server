import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
const jwtSecret: any = process.env.jwtSecret;
const router = express.Router();

// Models
import { User } from '../../models/User';

// Middleware
import auth from '../../middleware/auth';

// @route   GET /api/auth
// @desc    Get basic user info
// @access  Private
router.get('/', auth, async (req: any, res: Response) => {
  try {
    const user: any = await User.findOne({ _id: req.user.id });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).send(userObj);
  } catch (e) {
    res.status(500).send({ message: 'Server error' });
  }
});

// @route   post /api/auth
// @desc    Authenticate (Login) User & get token
// @access  Public
router.post(
  '/',
  [
    // Second parameter is the error message
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Plaese is required').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // If an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ message: 'Invalid credentials.' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          // mongoose allows .id instead of ._id
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          // Change this value at your will
          // By default, it is set to 360000, or 5 days
          expiresIn: 360000,
        },
        (err: any, token: string) => {
          if (err) throw err;

          return res.status(200).send({ user, token });
        },
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
);

module.exports = router;
