import { Button as ButtonUI } from '@chakra-ui/react';

const Button = ({ text, onClick, color = 'red', width = '100%', mt = 0, disabled = false, ...props }) => {
  return (
    <ButtonUI
      colorScheme={color}
      width={width}
      onClick={onClick}
      style={{ marginTop: mt }}
      disabled={disabled}
      {...props}
    >
      {text}
    </ButtonUI>
  )
}

export default Button;