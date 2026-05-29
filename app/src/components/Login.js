import React, { useState } from "react"
import {
  Field,
  Input,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react"
import { toaster } from "./ui/toaster"
import Container from "./Container"
import Completed from "./Completed"
import Success from "./Success"
import Hints from "./Hints"
import Password from "./Password"
import getLevelTexts from "../utils/levels"
import { useAuth } from "../utils/auth"
import { useNavigate } from "react-router-dom"

const LANG = "en"
const ERROR5 = "Incorrect password (1e6947ac7fb3a9529a9726eb692c8cc5)"

const Login = ({ level }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { login } = useAuth()
  const texts = getLevelTexts(LANG, level)
  const navigate = useNavigate()

  if (!texts) {
    return <Completed />
  }

  const errorMessage = message => {
    toaster.create({
      title: "Error",
      description: message,
      type: "error",
      placement: "bottom-end",
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
    navigate("/levels/" + (level + 1))
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
              <Field.Root required>
                <Field.Label>Username</Field.Label>
                <Input
                  type="text"
                  placeholder="admin"
                  onChange={event => setUsername(event.currentTarget.value)}
                />
              </Field.Root>
              <Field.Root required mt={6}>
                <Field.Label>Password</Field.Label>
                <Password
                  onChange={event => setPassword(event.currentTarget.value)}
                />
              </Field.Root>
              <Button
                type="submit"
                width="full"
                mt={4}
              >
                {isLoading ? <Spinner size="sm" /> : "Sign In"}
              </Button>
            </form>
          </>
        )
      }
    </Container>
  )
}

export default Login
