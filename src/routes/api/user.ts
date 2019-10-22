import express, { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
const jwtSecret: any = process.env.jwtSecret;
import { check, validationResult } from 'express-validator';

// Models
import { User } from '../../models/User';

// @route   post /api/user
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    // Second parameter is the error message
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email.').isEmail(),
    check(
      'password',
      'Plaese enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req: any, res: Response) => {
    const errors = validationResult(req);

    // If an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user: any = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists.' }] });
      }

      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Change the value of the jwtSecret in the config file in the config folder
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err: any, token: string) => {
          if (err) throw err;
          res.send(token);
        },
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
);

module.exports = router;
