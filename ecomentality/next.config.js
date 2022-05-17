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
			'via.placeholder.com'
		]
	}
}

module.exports = nextConfig
