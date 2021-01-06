import querystring from 'querystring'
import * as core from '@actions/core'
import bent from 'bent'

const getJson = bent('json')



const main = async () => {
  try {
    const clientId = core.getInput('client-id', { required: true })
    const secretId = core.getInput('secret-id', { required: true })
    const domain = core.getInput('domain')
    const params = {
      'grant_type': 'client_credentials',
      'client_id': clientId,
      'client_secret': secretId
    }
    const paramsString = querystring.encode(params)
    const url = `https://oauth.${domain}/api/v1/token?${paramsString}`

    const response = await getJson(url)

    core.setSecret('token')
    core.setOutput('token', response['access_token'])
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()