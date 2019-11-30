import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'
import db from '../database'

const MongoStore = connectMongo(session)
export default app => {
    app.use(cors())
    app.use(cookieParser());
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: db })
      }));
}