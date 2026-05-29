import { useState } from "react"
import { Input, InputGroup, IconButton } from "@chakra-ui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"

const Password = ({ onChange }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <InputGroup
      endElement={
        <IconButton
          h="1.75rem"
          size="sm"
          variant="ghost"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={handlePasswordVisibility}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </IconButton>
      }
    >
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="*******"
        onChange={onChange}
      />
    </InputGroup>
  )
}

export default Password
