import type { AppProps } from "next/app";
import { ChakraProvider, Box, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	fonts: {
		heading: "Montserrat Regular",
		body: "Montserrat Regular",
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Box>
				<Component {...pageProps} />
			</Box>
			<style jsx global>{`
				html,
				body {
					height: 100% !important;
					width: 100% !important;
					background-color: #223 !important;
					// background-image: url(/background.jpeg) !important;
					// background-repeat: no-repeat !important;
					// background-attachment: fixed !important;
					// background-size: cover !important;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</ChakraProvider>
	);
}

export default MyApp;
