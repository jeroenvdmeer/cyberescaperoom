import React from "react"
import { IconButton } from "@chakra-ui/react"
import { useColorMode, useColorModeValue } from "./ui/color-mode"
import { FaMoon, FaSun } from "react-icons/fa"

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      {...props}
    >
      <SwitchIcon />
    </IconButton>
  )
}

export default ColorModeSwitcher
