import cors from 'cors';
import createError from 'http-errors';
import session from 'express-session';
import express from 'express';
import path from 'path';
import passport from 'passport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MemoryStore = require('memorystore')(session)
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {ApolloServer, ExpressContext} from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core';
import typeDefs from './graphQl/typeDefs';
import resolvers from './graphQl/resolvers/index';
import indexRouter from './routes/index';
import usersRouter from './routes/userRoute';
import ssoRouter from './routes/sso-auth';
import './events';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Passport config
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./config/passport-social-setup')(passport);

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET as string,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);

async function startApolloServer(): Promise<ApolloServer<ExpressContext>> {
  const apolloServer = new ApolloServer({
    cache: 'bounded',
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault({
            graphRef: process.env.APOLLO_GRAPH_REF,
            footer: false,
          })
        : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ],
    context:({req})=>({req})
  })

  await apolloServer.start()

  //attach the appollo server middleware to app
  apolloServer.applyMiddleware({app, path:'/decafit'})
  app.use('/auth', ssoRouter);
  app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// eslint-disable-next-line max-len, @typescript-eslint/no-unused-vars
app.use(function (err: createError.HttpError, req: express.Request, res: express.Response, _next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});
return apolloServer;
}

export default {
  app, 
  startApolloServer
};