import connectMongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'
import mongoDB from '../plugins/mongo'

const MongoStore = connectMongo(session)
export default app => {
    app.use(cors())
    app.use(cookieParser());
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoDB })
      }));
}