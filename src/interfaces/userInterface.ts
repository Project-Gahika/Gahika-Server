import express, { Request } from 'express';

export interface UserRequest extends Request {
  user: string;
}
