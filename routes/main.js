const indexRouter = require('./index');
const usersRouter = require('./users');
const authRouter = require('./auth');
const groupsRouter = require('./groups');
const parliamentRouter = require('./parliament');
const debatesRouter = require('./debates');
const filesRouter = require('./files');
const debateTimers = require('./debateTimer');

const setupRoutes = (app) => {
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/auth', authRouter);
    app.use('/groups', groupsRouter);
    app.use('/parliaments', parliamentRouter);
    app.use('/debates', debatesRouter);
    app.use('/files', filesRouter);
    app.use('/timers', debateTimers)
};

module.exports = { setupRoutes };