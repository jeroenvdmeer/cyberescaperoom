import React from "react"
import { Box, Flex, Heading, Spacer, Spinner } from "@chakra-ui/react"
import { Redirect } from "react-router-dom"
import { Previous, Next } from "./NavigationButtons"
import { useAuth } from "../utils/auth"

const Container = ({ title, level, children }) => {
  const { maxLevel, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Box width="full" textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    )
  }

  return (!level || maxLevel >= level)
    ? (
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          width="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Flex textAlign="center">
            <Previous currentLevel={level} />
            <Spacer />
            <Heading>{title}</Heading>
            <Spacer />
            <Next currentLevel={level} maxLevel={maxLevel} />
          </Flex>
          <Box mt={4} textAlign="left">
            {children}
          </Box>
        </Box>
      </Flex>
    )
  : (
    <Redirect
      to={{
        pathname: "/levels/" + maxLevel,
        from: "/levels/" + level
      }}
    />
  )
}

export default Container
