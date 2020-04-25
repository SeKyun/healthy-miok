import React from 'react';
import { Menu } from 'antd';

const Antmenu = () => {
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">기록보기</Menu.Item>
        <Menu.Item key="2">그래프보기</Menu.Item>
        <Menu.Item key="3">달력</Menu.Item>
      </Menu>
    </div>
  );
};

export default Antmenu;
