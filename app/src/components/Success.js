import {
    Box,
    Button,
    Text,
    Link,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

const Success = ({ text, readMore, onClick }) => (
    <Box>
        <Text>{text}</Text>
        <Text mt={4}>Read more from OWASP about:</Text>
        <List>
            {Array.isArray(readMore) && readMore.map(link => (
                <ListItem>
                    <ListIcon as={ExternalLinkIcon} />
                    <Link href={link.url} isExternal={true}>{link.text}</Link>
                </ListItem>
            ))}
        </List>
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
