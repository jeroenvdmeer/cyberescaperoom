import {
  Box,
  Button,
  Text,
  Link,
  List,
  Flex,
} from "@chakra-ui/react"
import { FiExternalLink } from "react-icons/fi"

const Success = ({ text, readMore, onClick }) => (
  <Box>
    <Text>{text}</Text>
    <Text mt={4}>Read more from OWASP about:</Text>
    <List.Root listStyleType="none">
      {Array.isArray(readMore) && readMore.map(link => (
        <List.Item key={link.url}>
          <Flex alignItems="center" gap={2}>
            <FiExternalLink />
            <Link href={link.url} target="_blank" rel="noopener noreferrer">
              {link.text}
            </Link>
          </Flex>
        </List.Item>
      ))}
    </List.Root>
    <Button
      width="full"
      type="button"
      mt={4}
      onClick={onClick}
      autoFocus={true}
    >
      Next
    </Button>
  </Box>
)

export default Success
