import React from 'react';
import { Menu } from 'antd';
const InsulinMenu = (props) => {
  const { func } = props;
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item
          key="0"
          onClick={() => {
            func(0);
          }}
        >
          인슐린 투여
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => {
            func(1);
          }}
        >
          인슐린 기록
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            func(2);
          }}
        >
          인슐린 & 혈당 그래프
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default InsulinMenu;
