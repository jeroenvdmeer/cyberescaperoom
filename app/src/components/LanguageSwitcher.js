//import { useState } from "react"
import { Select } from "@chakra-ui/react"

const LanguageSwitcher = () => {
    /*const [language, setLanguage] = useState(null)

    const changeLanguage = event => {
        setLanguage(event.currentTarget.value)
    }*/

    return (
        <Select
            placeholder="Language"
            width="15ch"
            mx={4}
            //onChange={changeLanguage}
        >
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
        </Select>
    )
}

export default LanguageSwitcher
