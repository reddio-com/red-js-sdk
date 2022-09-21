import { Button, Row, Col } from 'tdesign-react';
import { ShopIcon } from 'tdesign-icons-react';
import Text from '../typography';
import styles from './index.less';

const OrderList = () => {
  return (
    <div className={styles.orderListWrapper}>
      <Text type="bold">Order List</Text>
      <Row gutter={[20, 24]}>
        {Array(10)
          .fill(0)
          .map((item) => {
            return (
              <Col flex="190px" className={styles.item}>
                <div>
                  <img src={require('@/assets/user.png')} alt="" />
                  <Button icon={<ShopIcon />} shape="round">
                    Buy
                  </Button>
                </div>
                <Text>0.01 ETH</Text>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default OrderList;
