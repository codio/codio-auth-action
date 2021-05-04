import querystring from 'querystring'
import * as core from '@actions/core'
import codio from 'codio-api-js'



const main = async () => {
  try {
    const clientId = core.getInput('client-id', { required: true })
    const secretId = core.getInput('secret-id', { required: true })
    const domain = core.getInput('domain')
    codio.v1.setDomain(domain)
    const token = await codio.v1.auth(clientId, secretId)
    core.setSecret('token')
    core.setOutput('token', token)
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()