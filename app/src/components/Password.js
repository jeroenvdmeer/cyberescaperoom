import { useState } from "react"
import {
    Input,
    InputGroup,
    InputRightElement,
    IconButton
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const Password = ({ onChange }) => {
    const [showPassword, setShowPassword] = useState(false)
    const handlePasswordVisibility = () => setShowPassword(!showPassword)

    return (
        <InputGroup>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="*******"
                onChange={onChange}
            />
            <InputRightElement width="3rem">
                <IconButton
                h="1.75rem"
                size="sm"
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={handlePasswordVisibility}
                />
            </InputRightElement>
        </InputGroup>
    )
}

export default Password
