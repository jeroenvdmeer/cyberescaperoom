import React from "react"
import { ChakraProvider, VStack, Grid, theme } from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import Login from "./components/Login"

const App = () => (
  <ChakraProvider theme={theme}>
    <Grid minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={8}>
        <Login />
      </VStack>
    </Grid>
  </ChakraProvider>
)

export default App
