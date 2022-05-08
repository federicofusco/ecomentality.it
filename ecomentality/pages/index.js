import Head from "next/head"

export default function Home() {
	return (
		<>
			<Head>
				<title>Home - GEM</title>
				<meta name="author" content={ author.displayName } />
				<meta name="language" content="EN" />
				<meta name="robots" content="index, follow" />
			</Head>
			<h1>Hello World!</h1>
		</>
	)
}
