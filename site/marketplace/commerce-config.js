/**
 * This file is expected to be used in next.config.js only
 */

const path = require('path')
const fs = require('fs')
const merge = require('deepmerge')
const prettier = require('prettier')
const core = require('@pearl/commerce/config')

function withCommerceConfig(nextConfig = {}) {
  const config = merge(
    { commerce: { provider: '@pearl/api-provide' } },
    nextConfig
  )
  const { commerce } = config
  const { provider } = commerce

  // Update paths in `tsconfig.json` to point to the selected provider
  if (commerce.updateTSConfig !== false) {
    const tsconfigPath = path.join(
      process.cwd(),
      commerce.tsconfigPath || 'tsconfig.json'
    )
    const tsconfig = require(tsconfigPath)
    // The module path is a symlink in node_modules
    // -> /node_modules/[name]/dist/index.js
    const absolutePath = require.resolve(provider)
    // but we want references to go to the real path in /packages instead
    // -> packages/[name]/dist
    const distPath = path.join(path.relative(process.cwd(), absolutePath), '..')
    // -> /packages/[name]/src
    const modulePath = path.join(distPath, '../src')

    tsconfig.compilerOptions.paths['@framework'] = [`${modulePath}`]
    tsconfig.compilerOptions.paths['@framework/*'] = [`${modulePath}/*`]

    fs.writeFileSync(
      tsconfigPath,
      prettier.format(JSON.stringify(tsconfig), { parser: 'json' })
    )

    const webpack = config.webpack

    // To improve the DX of using references, we'll switch from `src` to `dist`
    // only for webpack so imports resolve correctly but typechecking goes to `src`
    config.webpack = (cfg, options) => {
      if (Array.isArray(cfg.resolve.plugins)) {
        const jsconfigPaths = cfg.resolve.plugins.find(
          (plugin) => plugin.constructor.name === 'JsConfigPathsPlugin'
        )

        if (jsconfigPaths) {
          jsconfigPaths.paths['@framework'] = [distPath]
          jsconfigPaths.paths['@framework/*'] = [`${distPath}/*`]
        }
      }

      return webpack ? webpack(cfg, options) : cfg
    }
  }

  return core.withCommerceConfig(config)
}

module.exports = { withCommerceConfig }
