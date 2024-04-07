const indexRouter = require('./index');
const usersRouter = require('./users');
const authRouter = require('./auth');
const groupsRouter = require('./groups');
const parliamentRouter = require('./parliament');
const filesRouter = require('./files');

const setupRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/groups', groupsRouter);
    app.use('/parliaments', parliamentRouter);
    app.use('/files', filesRouter);
};

module.exports = { setupRoutes };