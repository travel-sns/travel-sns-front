import React from 'react';
import classNames from 'classnames/bind';
import styles from './ShopItem.css';
const cx = classNames.bind(styles);


const ShopItem = ({ name, price, onPut }) => {
  return (
    <div className={cx('ShopItem')} onClick={() => onPut(name, price)}>
      <h4>{name}</h4>
      <div>{price}원</div>
    </div>
  );
};

export default ShopItem;
