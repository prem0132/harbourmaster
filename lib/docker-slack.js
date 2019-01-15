const request = require('request')
const { slackwebhook, slackchannel, slack_emoji, slackbot } = require('../config')
const logger = require('./log')
const slacksend = require('./slack-send')

module.exports = (payload) => {
              logger('debug', 'slack ')

              var statement = `Docker Webhook Triggered\n
              Repo: ${payload.repository.repo_name}\r\n
              RepoUrl: ${payload.repository.repo_url}\n
              ImageTag: ${payload.push_data.tag}\n
              PushedAt: ${payload.push_data.pushed_at}\n
              Pusher: ${payload.push_data.pusher}\n`
              logger('debug',`${statement}`)
              //var text = JSON.stringify(payload)
              //logger('debug',`${text}`)
  
              var data = {
                  "channel": slackchannel,
                  "username": slackbot,
                  "icon_emoji": slack_emoji,
                  "text": statement
              }


              slacksend(data)
            }