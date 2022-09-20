const { withCommerceConfig } = require('./commerce-config')
// const CircularDependencyPlugin = require('circular-dependency-plugin')
const ContentSecurityPolicy = `
  default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval' *.googleapis.com *.google.com *.gstatic.com vitals.vercel-insights.com *.googletagmanager.com *.firebase.com;
  connect-src *;
`
// https://nextjs.org/docs/advanced-features/security-headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]
module.exports = withCommerceConfig({
  i18n: {
    locales: ['en-US', 'es'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  rewrites() {
    return [].filter(Boolean)
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Note: we provide webpack above so you should not `require` it
  //   // Perform customizations to webpack config
  //   config.plugins.push(
  //     new CircularDependencyPlugin({
  //       // `onStart` is called before the cycle detection starts
  //       onStart({ compilation }) {
  //         console.log('start detecting webpack modules cycles')
  //       },
  //       // `onDetected` is called for each module that is cyclical
  //       onDetected({ module: webpackModuleRecord, paths, compilation }) {
  //         // `paths` will be an Array of the relative module paths that make up the cycle
  //         // `module` will be the module record generated by webpack that caused the cycle
  //         compilation.errors.push(new Error(paths.join(' ----> ')))
  //       },
  //       // `onEnd` is called before the cycle detection ends
  //       onEnd({ compilation }) {
  //         console.log('end detecting webpack modules cycles')
  //       },
  //     })
  //   )

  //   // Important: return the modified config
  //   return config
  // },
})

// Don't delete this console log, useful to see the commerce config in Vercel deployments
// eslint-disable-next-line no-console
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
