import React, { useState } from "react"
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
  Icon
} from "@chakra-ui/react"
import api from "../utils/api"
import getLevel from "../utils/levels"

const language = "nl"

const Login = () => {
  const [level, setLevel] = useState(1)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const texts = getLevel(language, level)
  console.log(texts)

  if (!texts) {
    return <span>🎉</span>
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    api({ level, username, password })
    .then(response => {
      setIsLoading(false)
      return response.json()
    })
    .then(json => {
      setIsLoggedIn(json.success)
      setError(json.error)
    })
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
          <Box textAlign="center">
            <Text>{texts.success}</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => nextLevel()}
            >
              Volgende
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Level {level}</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <Text mb={4}>{texts.intro}</Text>
              <form onSubmit={handleSubmit}>
                {error && <Text>{error}</Text>}
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="admin"
                    size="lg"
                    onChange={event => setUsername(event.currentTarget.value)}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      size="lg"
                      onChange={event => setPassword(event.currentTarget.value)}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off" />
                        ) : (
                          <Icon name="view" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  variantColor="teal"
                  variant="outline"
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
