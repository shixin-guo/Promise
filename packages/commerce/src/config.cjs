/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const merge = require('deepmerge')
const importCwd = require('import-cwd')

function withCommerceConfig(nextConfig = {}) {
  const commerce = nextConfig.commerce || {}
  const { provider } = commerce

  if (!provider) {
    throw new Error(
      `The commerce provider is missing, please add a valid provider name`
    )
  }

  const commerceNextConfig = importCwd(path.posix.join(provider, 'next.config'))
  const config = merge(nextConfig, commerceNextConfig)
  config.env = config.env || {}
  return config
}

module.exports = { withCommerceConfig }
