import React, { useState } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  useToast
} from "@chakra-ui/react"
import Container from "./Container"
import Completed from "./Completed"
import Success from "./Success"
import Hints from "./Hints"
import Password from "./Password"
import getLevelTexts from "../utils/levels"
import { useAuth } from "../utils/auth"
import { useHistory } from "react-router-dom"

const LANG = "en"
const ERROR5 = "Incorrect password (1e6947ac7fb3a9529a9726eb692c8cc5)"

const Login = ({ level }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { login } = useAuth()
  const texts = getLevelTexts(LANG, level)
  const history = useHistory()
  const toast = useToast()

  if (!texts) {
    return <Completed />
  }

  const errorMessage = message => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      position: "bottom-right",
      isClosable: true
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (texts.password && texts.password !== password) {
      errorMessage("Incorrect password")

    } else {
      setIsLoading(true)
      login(username, password, level).then(json => {
        json.success && setIsLoggedIn(true)
        json.error && errorMessage(
          (level === 5 && !json.success) ? ERROR5 : json.error
        )
      })
      .finally(() => setIsLoading(false))
    }
  }

  const nextLevel = () => {
    setIsLoggedIn(false)
    history.push("/levels/" + (level + 1))
  }

  const { intro, hints, success, readMore } = texts

  return (
    <Container title={`Level ${level}`} level={level}>
      {isLoggedIn
        ? <Success text={success} readMore={readMore} onClick={nextLevel} />
        : (
          <>
            <Text mb={8}>{intro}</Text>
            <Hints hintTexts={hints} />
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  placeholder="admin"
                  onChange={event => setUsername(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Password</FormLabel>
                <Password
                  onChange={event => setPassword(event.currentTarget.value)}
                />
              </FormControl>
              <Button
                type="submit"
                width="full"
                mt={4}
              >
                {isLoading ? (
                  <CircularProgress
                    isIndeterminate
                    size="24px"
                    color="teal"
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </>
        )
      }
    </Container>
  )
}

export default Login
