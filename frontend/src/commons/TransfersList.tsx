import { map } from 'lodash'
import { type Transfer } from './types'
import { Card, Col, Row } from 'antd'

function TransfersList ({
  transfers
}: {
  transfers: Transfer[]
}) {
  return (
    map(transfers, (t) => (
        <Row
            justify='center'
            style={{
              margin: 10
            }}
        >
            <Col span={18}>
                <Card>
                    <h1>Tranfers</h1>
                </Card>
            </Col>
        </Row>
    ))
  )
}

export default TransfersList
