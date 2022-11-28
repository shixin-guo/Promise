const commerce = require('./commerce.config.json')
const { withCommerceConfig, getProviderName } = require('./commerce-config')

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
  commerce,
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
  // Avoid Module not found: ESM packages (supports-color) need to be imported. Use 'import' to reference the package instead. https://nextjs.org/docs/messages/import-esm-externals
  experimental: {
    esmExternals: 'loose',
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
})

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
