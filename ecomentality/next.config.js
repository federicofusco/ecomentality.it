/** @type {import('next').NextConfig} */
const nextConfig = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
  	reactStrictMode: true,
	images: {
		domains: [
			'firebasestorage.googleapis.com',
			'via.placeholder.com',
			'img.youtube.com'
		]
	},
	async redirects () {
		return [
			{
				source: "/new/interview",
				destination: "/new/interview/random-id",
				permanent: true
			},
			{
				source: "/new/article",
				destination: "/new/article/random-id",
				permanent: true
			}
		]
	},
	async headers () {
		return [{
			source: "/:path*",
			headers: [
				{
					key: "X-DNS-Prefetch-Control",
					value: "on"
				},
				{
					key: "Strict-Transport-Security",
					value: "max-age=63072000; includeSubDomains; preload"
				},
				{
					key: "X-Content-Type-Options",
					value: "nosniff"
				},
				{
					key: "Referrer-Policy",
					value: "origin-when-cross-origin"
				}

				// Will add CSP later
				  
			]
		}];
	}
}

module.exports = nextConfig
