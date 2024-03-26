import { Button, ButtonProps, ConfigProvider } from "antd";
import { set } from 'lodash';

type buttonPropioProps = {
    title: string,
    nav?: boolean,
    buttonProps: ButtonProps
}

function ButtonPropio ({
    title,
    buttonProps,
    nav = false,
}: buttonPropioProps) {
    if (nav) {
      set(buttonProps, ['style'], {
            borderRadius: 0,
            flex: '1 1 200px',
            padding: 0,
            height: '60px',
      });
      set(buttonProps, ['type'], 'text');
      set(buttonProps, ['size'], 'large');
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: nav ? '#E6E9F5' : undefined
                }
            }}
        >
            <Button
                {...buttonProps}
            >
                {title}
            </Button>
        </ConfigProvider>
    )
}

export default ButtonPropio;
