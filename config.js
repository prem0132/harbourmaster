require('dotenv').config()

module.exports = {
  debug: process.env.DEBUG || true, // true: enable debug | any other: disable debug
  token: process.env.TOKEN || 'abc123', // your secret token
  slackenabled: process.env.SLACK_ENABLED || false,
  slackbot: process.env.SLACK_BOT || 'harbourmaster',
  slackchannel: process.env.SLACK_CHANNEL || 'notifications',
  slackwebhook: process.env.SLACK_WEBHOOK || 'http://127.0.0.1:5000/abc123', // your secret token
  slack_emoji: process.env.SLACK_ICON || ':bat:'
}

