import { useState } from "react"
import { Text, Button } from "@chakra-ui/react"

const Hints = ({ hintTexts }) => {
    const [hintsShown, sethintsShown] = useState(0)
    const showHint = () => sethintsShown(hintsShown + 1)

    if (Array.isArray(hintTexts) === false) {
        return <div />
    }

    return (
        <>
            {
                hintTexts.slice(0, hintsShown).map((hint, index) =>
                    <Text pb={8} key={index}>Hint {index + 1}: {hint}</Text>
                )
            }
            {
                hintTexts.length > hintsShown
                && <Button mb={8} onClick={showHint}>Hint</Button>
            }
            
        </>
    )
}

export default Hints
