export const dev = process.env.NODE_ENV === "development";
export const url = dev
	? "http://localhost:3000"
	: "https://lost-ark-engravings.vercel.app";
