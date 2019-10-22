import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserRequest } from '../interfaces/userInterface';
const jwtSecret: any = process.env.jwtSecret;

const auth: any = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: any = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send({ message: 'No token. Authorization denied.' });
  }

  try {
    // Change the value of the jwtSecret in the config file in the config folder
    const decoded: any = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).send({ message: 'Invalid token.' });
  }
};

export default auth;
