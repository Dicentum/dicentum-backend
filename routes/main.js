const indexRouter = require('./index');
const usersRouter = require('./users');
const authRouter = require('./auth');
const groupsRouter = require('./groups');
const parliamentRouter = require('./parliament');

const setupRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/groups', groupsRouter);
    app.use('/parliaments', parliamentRouter);
};

module.exports = { setupRoutes };