import { useNavigate } from "react-router-dom"
import { Box, IconButton } from "@chakra-ui/react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

const Ghost = () => <Box width={10} />

export const Previous = ({ currentLevel }) => {
  const navigate = useNavigate()
  const onClick = () => navigate(
    (currentLevel && currentLevel === 1)
      ? "/"
      : "/levels/" + (currentLevel - 1)
  )

  return currentLevel
    ? (
      <IconButton aria-label="Previous level" onClick={onClick}>
        <FiArrowLeft />
      </IconButton>
    )
    : <Ghost />
}

export const Next = ({ currentLevel, maxLevel }) => {
  const navigate = useNavigate()
  const onClick = () => navigate("/levels/" + (currentLevel + 1))
  const props = currentLevel !== 7 ? null : {
    colorPalette: "green",
    autoFocus: true
  }

  return ((currentLevel && maxLevel > currentLevel)
    ? (
      <IconButton
        aria-label="Next level"
        onClick={onClick}
        {...props}
      >
        <FiArrowRight />
      </IconButton>
    ) : <Ghost />
  )
}
