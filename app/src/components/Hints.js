import { useState } from "react"
import { Text, Button } from "@chakra-ui/react"

const Hints = ({ hintTexts }) => {
    const [shown, setShown] = useState(0)

    if (Array.isArray(hintTexts) === false) {
        console.warn("Invalid hintTexts")
        return <span />
    }

    const showHint = () => {
        setShown(shown + 1)
    }

    return (
        <>
            {
                hintTexts.slice(0, shown).map((hint, index) =>
                    <Text pb={8}>Hint {index + 1}: {hint}</Text>
                )
            }
            {
                hintTexts.length > shown
                && <Button mb={8} onClick={showHint}>Hint</Button>
            }
            
        </>
    )
}

export default Hints
