const express = require("express"),
    http = require("http"),
    path = require("path"),
    bodyParser = require("body-parser"),
    static = require("serve-static"),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    session = require('express-session'),
    dotenv = require('dotenv'),
    passport = require('passport'),
    hpp = require('hpp'),
    ExpressError = require('./utils/ExpressError'),
    RedisStore = require('connect-redis')(session),
    redis = require('redis');

dotenv.config();

// const redisPort = process.env.REDIS_PORT,
//     redisHost = process.env.REDIS_HOST,
//     redisPass = process.env.REDIS_PASSWORD,
//     redisClinet = redis.createClient(redisPort, redisHost),
//     redisConnectionResult = redisClinet.auth(redisPass, err => {if (err) console.log(err, " 에러 발생했습니다");});
//
// console.log("redis 연결 결과는? - ", redisConnectionResult);
//
//
const pageRouter = require('./routes/post');
const authRouter = require('./routes/auth');
// const postRouter = require('./routes/post');
const passportConfig = require('./passport');
const passportGoogleConfig = require('./passport/googleStrategy');
const sequelize = require('./models').sequelize;
//
const app = express();
//
//
passportConfig();
passportGoogleConfig();
app.set("port", process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,'views'));

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

//
if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(hpp(undefined));
}else{
    app.use(morgan('dev'));
}
//
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({
    limit:"50mb",
    extended:false
}));

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    }));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
// app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cookieParser(process.env.COOKIE_SECRET));
// const sessionOption ={
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
//     store: new RedisStore({
//         client: redisClinet,
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT,
//         pass: process.env.REDIS_PASSWORD,
//         logErrors: true,
//     }),
// };
//
//  if(process.env.NODE_ENV === 'production'){
//    sessionOption.proxy = true;
//  }
//
// app.use(session(sessionOption));
// app.use(passport.initialize());
// app.use(passport.session());
//
app.use('/api',pageRouter);
app.use('/api/auth', authRouter);
// app.use('/post',postRouter);
//
// app.use((req, res, next) => {
//     const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//     error.status = 404;
//     next(error);
// });
//
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'development' ? err : {};
//     res.status(err.status || 500);
//     console.log(err);
//     res.redirect('/404');
// });
const handleValidationErr = err => {
    return new ExpressError(`Data validation error: ${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log("Error name: " + err.name);
    if (err.name === 'ValidationError') {
        err = handleValidationErr(err)
    }
    next(err);
})

app.use((err, req, res, next) => {
    console.log("Error handling called");
    const {status = 500, message = 'An error has occurred'} = err;
    res.status(status).send(message);
})

const server = http.createServer(app);
server.listen(app.get("port"), function () {
    console.log("started");
});
