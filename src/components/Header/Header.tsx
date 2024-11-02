import { Layout, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  return (
    <AntHeader className={styles.header}>
      <Title level={3} className={styles.title}>Your Notes</Title>
      <Button icon={<CloseOutlined />} type="text" className={styles.logoutButton}>
      </Button>
    </AntHeader>
  );
};

export default Header;