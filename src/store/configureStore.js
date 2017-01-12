if(process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStorre.prod');
} else {
  module.exports = require('./configureStore.dev');
}