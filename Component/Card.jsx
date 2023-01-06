import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Card = ({
  language,
  name,
  owner,
  html_url,
  stargazers_count,
  forks_count,
}) => {
  return (
    <Link href={html_url}>
      <Box
        p={"10%"}
        border={"1px solid #ddd"}
        rounded="md"
        bg="white"
        textAlign={"center"}
      >
        <Image src={owner.avatar_url} alt="" w={"100%"} />
        <Text as="b">{name}</Text>
        <br />
        <Text as="b">{language}</Text>
        <Flex justifyContent={"space-between"}>
          <Text>{stargazers_count}</Text> <Text>{forks_count}</Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default Card;
