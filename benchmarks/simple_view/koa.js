'use strict';

const koa = require('koa');
const nunjucks = require('nunjucks');
const path = require('path');

const app = koa();
let n = 10;

while (n--) {
  app.use(function* (next) {
    yield next;
  });
}

const options = {
  noCache: false,
};
const viewPaths = path.join(__dirname, 'app/view');
const engine = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPaths, options), options);

function render(name, locals) {
  return new Promise((resolve, reject) => {
    engine.render(name, locals, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

app.use(function* () {
  this.body = yield render('home.html', {
    user: {
      name: 'fookoa',
    },
    title: 'koa view example',
  });
});

console.log('koa app listen on 7002');
app.listen(7002);
