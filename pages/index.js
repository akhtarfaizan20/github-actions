import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import Card from "../Component/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const [repos, setRepos] = useState(data.items);
  const [loader, setLoader] = useState(false);
  const handleClick = async (str) => {
    setLoader(true);
    let res = await fetch(
      `https://api.github.com/search/repositories?q=stars:%3E1+language:${str}`
    );
    let data = await res.json();
    setLoader(false);
    setRepos(data.items);
  };

  return (
    <>
      <Head>
        <title>My New App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Flex justifyContent={"space-around"}>
          <Button colorScheme="blue" onClick={() => handleClick("all")}>
            All
          </Button>
          <Button colorScheme="blue" onClick={() => handleClick("html")}>
            HTML
          </Button>
          <Button colorScheme="blue" onClick={() => handleClick("css")}>
            CSS
          </Button>
          <Button colorScheme="blue" onClick={() => handleClick("javascript")}>
            JAVASCRIPT
          </Button>
        </Flex>
        <Grid
          mx={"10%"}
          my={"2%"}
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gap={"20px"}
        >
          {loader ? (
            <Spinner />
          ) : (
            repos.map((repo) => {
              return (
                <Box key={repo.id}>
                  <Card {...repo} />
                </Box>
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
}

export async function getStaticProps(context) {
  let res = await fetch(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:all`
  );
  let data = await res.json();
  return {
    props: { data },
  };
}
