import { Text, Button } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import Container from "./Container"

const Introduction = () => {
  const history = useHistory()
  const start = () => history.push("/level1")

  return (
    <Container title="Welcome!">
      <Text>Hello!</Text>
      <Button
        type="button"
        width="full"
        mt={4}
        onClick={start}
        autoFocus={true}
      >
        Lets go!      
      </Button>
    </Container>
  )
}

export default Introduction
