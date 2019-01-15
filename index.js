const { json, send } = require('micro')
const { parse } = require('url')
const logger = require('./lib/log')
const slacksend = require('./lib/slack-send')
const validateReq = require('./lib/validate-req')
const runScript = require('./lib/run-script')
const dockerslack = require('./lib/docker-slack')
const { slackenabled } = require('./config')


module.exports = async (req, res) => {
  const hooks = require('./scripts')
  const { pathname } = await parse(req.url, false) // gets url path

  if (pathname === '/ping') return send(res, 200, 'pong')

  let payload
  try {
    payload = await json(req) // gets payload
  } catch (e) {
    logger('err', 'Missing JSON payload')
    return send(res, 400, 'Missing JSON payload')
  }

  logger('debug', `Requesting ${pathname}`)

  try {
    await validateReq({ pathname, payload, hooks }) // validates token and payload
  } catch (e) {
    logger('err', e.message)
    return send(res, 400, e.message)
  }
  // everything is on it's right place...
  //send(res, 204) // sends 'no content' to client
  
  logger('debug', `Payload from docker hub:\n ${JSON.stringify(payload, null, 2)} \nRunning hook on repo: ${payload.repository.repo_name}`)
  const hook = hooks[`${payload.repository.repo_name}:${payload.push_data.tag}`] || hooks[payload.repository.repo_name] // looks for tag first

  try {
    const result = await runScript(hook, payload) // runs script
    logger('debug', `${result}\nFinished running hook "${hook}" for repository "${payload.repository.repo_name}"`)
    if (slackenabled) {
       dockerslack(`Payload from docker hub:\n ${JSON.stringify(payload, null, 2)} \nRan hook on repo: ${payload.repository.repo_name}`) }
    } 
    
    catch (e) {
    logger('err', e)
  }
}
