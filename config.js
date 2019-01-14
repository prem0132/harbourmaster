module.exports = {
  debug: process.env.DEBUG || true, // true: enable debug | any other: disable debug
  token: process.env.TOKEN || 'abc123', // your secret token
  slackenabled: process.env.SLACK_ENABLED || false,
  slackwebhook: process.env.SLACK_WEBHOOK || 'http://127.0.0.1:6000/abc123' // your secret token
}
