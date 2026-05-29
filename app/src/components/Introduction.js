import { Text, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Container from "./Container"

const Introduction = () => {
  const navigate = useNavigate()
  const start = () => navigate("/levels/1")

  return (
    <Container title="Welcome!">
      <Text>
        In this cyber escape room you'll be challenged to break through seven
        login forms. The difficulty level increases gradually to push your
        skill level. After completing each level information is presented about
        preventing the vulnerabilties you've exploited. Good luck!
      </Text>
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
