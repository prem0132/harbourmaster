const request = require('request')
const { slackwebhook } = require('../config')
const logger = require('./log')

module.exports = (payload) => { 
            logger('debug', 'slack notification sent')
            request.post( slackwebhook,
                    { json: payload },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                        }
                    }
                )
            }