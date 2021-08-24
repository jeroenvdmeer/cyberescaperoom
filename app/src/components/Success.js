import { Box, Button, Text } from "@chakra-ui/react"

const Success = ({ text, onClick }) => (
    <Box textAlign="center">
        <Text>{text}</Text>
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
