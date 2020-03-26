import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'
import mongoDB from '../plugins/mongo'

const MongoStore = connectMongo(session)
const corsOptions = { credentials: true, origin: 'http://localhost:3000', };
export default app => {
  app.use(cors(corsOptions))
  app.use(cookieParser());
  app.use(session({
    name: "_audio_",
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoDB })
  }));
}