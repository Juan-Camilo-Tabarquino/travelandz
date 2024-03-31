import { Button, type ButtonProps } from 'antd'
import { set } from 'lodash'
import { type ReactElement } from 'react'

interface buttonPropioProps {
  title: string
  nav?: boolean
  buttonProps?: ButtonProps
  secondIcon?: ReactElement
}

function ButtonPropio ({
  title,
  buttonProps = {},
  nav = false,
  secondIcon
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
        {
          secondIcon ?? null
        }
    </Button>
  )
}

export default ButtonPropio
