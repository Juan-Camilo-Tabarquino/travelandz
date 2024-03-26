import { Row } from "antd";
import ButtonPropio from "./components/ButtonPropio";
import { useRouter } from "next/router";

export default function NavMenu () {  
  const { push } = useRouter();
    return (
        <Row>
            <ButtonPropio
            title="Home"
            nav
            buttonProps={{
                onClick: () => push('/')
            }}
            />
            <ButtonPropio
            title="Booking"
            nav
            buttonProps={{
                onClick: () => push('/booking')
            }}
            />
            <ButtonPropio
            title="Gestion"
            nav
            buttonProps={{
                onClick: () => push('/gestion')
            }}
            />
      </Row>
    )
}