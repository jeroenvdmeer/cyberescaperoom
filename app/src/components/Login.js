import React, { useState, useEffect } from "react"
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import Completed from "./Completed"
import Success from "./Success"
import Hints from "./Hints"
import { loginApi } from "../utils/api"
import getLevelTexts from "../utils/levels"
import {
  getTokens,
  getLevelFromLocalStorage,
  updateLocalStorage
} from "../utils/localstorage"

const LANG = "en"
const ERROR5 = "Incorrect password (1e6947ac7fb3a9529a9726eb692c8cc5)"

const Login = () => {
  const [level, setLevel] = useState(1)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const texts = getLevelTexts(LANG, level)
  const toast = useToast()

  useEffect(() => {
    const getLevel = async () => setLevel(await getLevelFromLocalStorage())
    getLevel()
  }, [])

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
      login()
    }
  }

  const login = () => {
    setIsLoading(true)
    loginApi({ level, username, password, tokens: getTokens() })
    .then(response => response.json())
    .then(json => {
      setIsLoggedIn(json.success)
      json.success && updateLocalStorage(json.token)
      json.error && errorMessage(
        (level === 5 && !json.success) ? ERROR5 : json.error
      )
    })
    .finally(() => setIsLoading(false))
  }

  const nextLevel = () => {
    setLevel(level + 1)
    setIsLoggedIn(false)
  }

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isLoggedIn ? (
          <Success text={texts.success} onClick={nextLevel} />
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Level {level}</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <Text mb={8}>{texts.intro}</Text>
              <Hints hintTexts={texts.hints} />
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
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="*******"
                      onChange={event => setPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        onClick={handlePasswordVisibility}
                      />
                    </InputRightElement>
                  </InputGroup>
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
                    'Sign In'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Login
