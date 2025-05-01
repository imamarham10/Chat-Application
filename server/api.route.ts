import express from 'express';
import authRouter from './src/routes/auth.routes';
import { chatRoomRouter } from './src/routes/chatRoom.route';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/chatRoom', chatRoomRouter);

export {apiRouter}