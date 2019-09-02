import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import styles from './BasketItem.css';
const cx = classNames.bind(styles);


const BasketItem = ({ name, price, count, onTake }) => {
  return (
    <div className={cx('BasketItem')}>
      <div className={cx('name')}>{name}</div>
      <div className={cx('price')}>{price}원</div>
      <div className={cx('count')}>{count}</div>
      <div className={cx('return')} onClick={() => onTake(name)}>갖다놓기</div>
    </div>
  );
};

export default BasketItem;
