import { useHistory } from "react-router-dom"
import {
    Box,
    IconButton
} from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

const Ghost = () => <Box width={10} />

export const Previous = ({ currentLevel }) => {
    const history = useHistory()
    const onClick = () => history.push(
        (currentLevel && currentLevel === 1)
            ? "/"
            : "/levels/" + (currentLevel - 1)
    )

    return currentLevel
        ? <IconButton icon={<ArrowBackIcon />} onClick={onClick} />
        : <Ghost />
}

export const Next = ({ currentLevel, maxLevel }) => {
    const history = useHistory()
    const onClick = () => history.push("/levels/" + (currentLevel + 1))
    const props = currentLevel !== 7 ? null : {
        colorScheme: "green",
        autoFocus: true
    }

    return ((currentLevel && maxLevel > currentLevel)
        ? (
            <IconButton
                icon={<ArrowForwardIcon />}
                onClick={onClick}
                {...props}
            />
        ) : <Ghost />
    )
}
