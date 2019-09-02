import React from 'react';
import classNames from 'classnames/bind';
import styles from './SuperMarketTemplate.css';
const cx = classNames.bind(styles);

const SuperMarketTemplate = ({ items, basket }) => {
  console.log(basket)
  return (
    <div className={cx('SuperMarketTemplate')}>
      <div className={cx('items-wrapper')}>
        <h2>상품</h2>
        {items}
      </div>
      <div className={cx('basket-wrapper')}>
        <h2>장바구니</h2>
        {basket}
      </div>
    </div>
  );
};

export default SuperMarketTemplate;
