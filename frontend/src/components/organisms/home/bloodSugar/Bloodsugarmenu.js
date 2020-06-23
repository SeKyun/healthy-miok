import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const Antmenu = ({ func }) => {
  return (
    <div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        <Menu.Item
          key="0"
          onClick={() => {
            func(0);
          }}
        >
          혈당등록
        </Menu.Item>
        <Menu.Item
          key="1"
          onClick={() => {
            func(1);
          }}
        >
          혈당기록
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            func(2);
          }}
        >
          그래프
        </Menu.Item>
      </Menu>
    </div>
  );
};

Antmenu.propTypes = {
  func: PropTypes.func.isRequired,
};

export default Antmenu;
