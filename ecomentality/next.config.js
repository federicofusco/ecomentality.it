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
	}
}

module.exports = nextConfig
