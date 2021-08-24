import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import { ChakraProvider, Flex } from "@chakra-ui/react"
//import LanguageSwitcher from "./components/LanguageSwitcher"
import ColorModeSwitcher from "./components/ColorModeSwitcher"
import GitHubIcon from "./components/GitHubIcon"
import Introduction from "./components/Introduction"
import Login from "./components/Login"
import { AuthProvider } from "./utils/auth"

const LEVELS = 8

const App = () => (
  <AuthProvider>
    <ChakraProvider>
      <Router>
        <Flex justifyContent="flex-end" alignItems="center" p={2}>
          <span />
          <GitHubIcon />
          <ColorModeSwitcher />
        </Flex>

        <Switch>
          <Route exact path="/">
            <Introduction />
          </Route>
          {Array.from(Array(LEVELS).keys()).map(level => (
            <Route path={`/level${level + 1}`} key={level}>
              <Login level={level + 1} />
            </Route>
          ))}
        </Switch>
      </Router>
    </ChakraProvider>
  </AuthProvider>
)

export default App
