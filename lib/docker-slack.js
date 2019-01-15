const request = require('request')
const { slackwebhook, slackchannel, slack_emoji, slackbot } = require('../config')
const logger = require('./log')
const slacksend = require('./slack-send')

module.exports = (payload) => {  
              var data = {
                  "channel": slackchannel,
                  "username": slackbot,
                  "icon_emoji": slack_emoji,
                  "text": payload
              }
              slacksend(data)
            }