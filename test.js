const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
const app = {
  PORT:  Math.floor(5000 + (Math.random() * 5000))
}
const env = Object.assign({}, process.env, {...app, APP_TARGET: 'test', APP_TARGET_TITLE: 'kit-test'});
const child = spawn('node', ['index.js'], {env});


test('responds to requests', (t) => {
  t.plan(3);
  child.stderr.on('data', error => console.error(error.toString()));
  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    (async () => {
      const response = await got(`http://127.0.0.1:${app.PORT}`);

      console.log(response.body)
      // stop the server
      child.kill();
      // No error
      t.false(response.error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(response.body.indexOf(`<title>${env.APP_TARGET_TITLE}</title>`), -1);
    })();
  });
});
