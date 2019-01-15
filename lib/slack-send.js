const request = require('request')
const { slackwebhook, slackchannel, slack_emoji, slackbot } = require('../config')
const logger = require('./log')

module.exports = (payload) => {
            logger('debug', `payload slacksend ${payload}`)
            logger('debug', ` slackwebhook ${slackwebhook}`)

            request.post( slackwebhook,
                    { json: payload },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                        }
                    }
                )
            logger('debug', `slack notification sent to #${slackchannel}`)
            }