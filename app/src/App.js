import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import { Provider } from "./components/ui/provider"
import { Toaster } from "./components/ui/toaster"
import ColorModeSwitcher from "./components/ColorModeSwitcher"
import GitHubIcon from "./components/GitHubIcon"
import Introduction from "./components/Introduction"
import Login from "./components/Login"
import { AuthProvider } from "./utils/auth"

const LEVELS = 8

const App = () => (
  <AuthProvider>
    <Provider>
      <Router>
        <Flex justifyContent="flex-end" alignItems="center" p={2}>
          <span />
          <GitHubIcon />
          <ColorModeSwitcher />
        </Flex>

        <Routes>
          <Route path="/" element={<Introduction />} />
          {Array.from(Array(LEVELS).keys()).map(level => (
            <Route
              path={`/levels/${level + 1}`}
              key={level}
              element={<Login level={level + 1} />}
            />
          ))}
        </Routes>

        <Toaster />
      </Router>
    </Provider>
  </AuthProvider>
)

export default App
