import React from 'react';
import { Menu } from 'antd';
const TreatmentMenu = (props) => {
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
          투약 등록
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => {
            func(1);
          }}
        >
          처치 등록
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            func(2);
          }}
        >
          투약 / 처치기록
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            func(3);
          }}
        >
          처방전 등록
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={() => {
            func(4);
          }}
        >
          약 정보
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default TreatmentMenu;
