import { Button, type ButtonProps } from 'antd'
import { set } from 'lodash'

interface buttonPropioProps {
  title: string
  nav?: boolean
  buttonProps: ButtonProps
}

function ButtonPropio ({
  title,
  buttonProps,
  nav = false
}: buttonPropioProps) {
  if (nav) {
    set(buttonProps, ['style'], {
      borderRadius: 0,
      flex: '1 1 200px',
      padding: 0,
      height: '60px'
    })
    set(buttonProps, ['type'], 'text')
    set(buttonProps, ['size'], 'large')
  }
  return (
    <Button
        {...buttonProps}
    >
        {title}
    </Button>
  )
}

export default ButtonPropio
