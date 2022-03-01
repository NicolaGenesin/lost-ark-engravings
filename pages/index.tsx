import type { NextPage } from "next";
import Head from "next/head";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Box,
	Link,
	Center,
	Text,
	VStack,
	HStack,
	TableCaption,
} from "@chakra-ui/react";
import getResults from "../utils/getResults";
import { SocialButton } from "../components/SmallFooterWithSocial";
import { FaDiscord } from "react-icons/fa";

interface HomeProps {
	rows: string[][];
	headers: string[];
}

const Home: NextPage<HomeProps> = ({ rows, headers }: HomeProps) => {
	return (
		<Box>
			<Head>
				<title>Engravings | Lost Ark</title>
				<meta name="description" content="Engravings from Levelling Quests" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Center m={"24px"}>
				<VStack>
					<Text
						as="h1"
						fontSize={["xl", "3xl"]}
						fontWeight="bold"
						color="white"
					>
						Engravings from Yellow Quests
					</Text>
					<HStack pb="24px">
						<Center>
							<Text
								textAlign="center"
								color="white"
								fontWeight="bold"
								fontSize={["lg", "xl"]}
								as="h1"
							>
								<a href="">
									by{" "}
									<span
										style={{
											backgroundImage:
												"linear-gradient(120deg, #778 0%, #778 100%)",
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 0.4em",
											backgroundPosition: "0 88%",
											transition: "background-size 0.25s ease-in",
										}}
									>
										ItsKarma#7822
									</span>{" "}
									| Join the discord{" "}
									<span
										style={{
											backgroundImage:
												"linear-gradient(120deg, #778 0%, #778 100%)",
											backgroundRepeat: "no-repeat",
											backgroundSize: "100% 0.4em",
											backgroundPosition: "0 88%",
											transition: "background-size 0.25s ease-in",
										}}
									>
										here
									</span>
								</a>
							</Text>
						</Center>
						<SocialButton size={12} label={"Twitch"} href={""}>
							<FaDiscord color="#223" size={28} />
						</SocialButton>
					</HStack>
					<Box p="8px" bg="#cce" borderRadius="md">
						<Table
							overflowX="auto"
							size="xs"
							variant="unstyled"
							style={{ borderSpacing: "0" }}
							textAlign="center"
							fontSize="sm"
						>
							<TableCaption fontSize="xs" textAlign="left" p="8px">
								<Text
									fontSize="sm"
									fontWeight="bold"
									textAlign="center"
									mb="8px"
								>
									ADDITIONAL NOTES
								</Text>
								1) The quests should be in the order you encounter them <br />
								2) These quests only give you 10/20 Blue Class engraving books,
								to get the rest you will need to be at least Lv50{" "}
								<Link
									textDecoration="underline"
									isExternal
									href="https://www.twitch.tv/choilicious"
								>
									Choilicious
								</Link>{" "}
								suggests to do the island quests on{" "}
								<Link
									textDecoration="underline"
									isExternal
									href="https://lost-ark.maxroll.gg/island/argon"
								>
									Argon
								</Link>{" "}
								(rewards 2 books) and{" "}
								<Link
									isExternal
									textDecoration="underline"
									href="https://lost-ark.maxroll.gg/island/shadowmoon-market"
								>
									Shadowmoon Market
								</Link>{" "}
								(rewards 9 books - need to be 460iLvl and unlock Procyon Sea){" "}
								<br />
								3) These rewards can be received repeatedly on manually levelled
								or knowledge transferred characters (Not Power Pass). <br />
								4) Books obtained from these pouches are untradeable
							</TableCaption>
							<Thead>
								<Tr>
									{headers.map((header, index: number) => {
										return (
											<Th fontSize="xs" textAlign="center" key={`th-${index}`}>
												{header}
											</Th>
										);
									})}
								</Tr>
							</Thead>
							<Tbody>
								{rows.map((row, index: number) => {
									return (
										<Tr
											key={`tr-${index}`}
											bg={index % 2 === 0 ? "#eee" : "#fff"}
										>
											{row.map((item: any, index: number) => {
												let width;
												let fontSize = "sm";

												if (index === 0) {
													width = "10%";
												} else if (index === 1) {
													width = "10%";
												} else if (index === 2) {
													width = "10%";
												} else if (index === 3) {
													width = "40%";
													fontSize = "xs";
												} else if (index === 4) {
													width = "5%";
												} else if (index === 5) {
													width = "10%";
												}

												if (item.hyperlink) {
													return (
														<Td
															bg={item.backgroundColor}
															key={`td-${index}`}
															w={width}
															textAlign="center"
															fontSize={fontSize}
														>
															<Link
																href={item.hyperlink}
																isExternal
																textDecoration="underline"
															>
																{item.value}
															</Link>
														</Td>
													);
												}

												return (
													<Td
														bg={item.backgroundColor}
														key={`td-${index}`}
														w={width}
														textAlign="center"
														fontSize={fontSize}
													>
														{item.value}
													</Td>
												);
											})}
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</Box>
				</VStack>
			</Center>
		</Box>
	);
};

export async function getStaticProps() {
	const { rows, headers } = await (await getResults()).json();

	return {
		props: {
			rows,
			headers,
		},
		revalidate: 60,
	};
}

export default Home;
