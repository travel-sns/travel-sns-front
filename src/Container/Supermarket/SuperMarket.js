import React from 'react';
import SuperMarketTemplate from './SuperMarketTemplate';
import ShopItemList from './components/ShopItemList';
import BasketItemList from './components/BasketItemList';

const SuperMarket = () => {
  return <SuperMarketTemplate items={<ShopItemList />} basket={<BasketItemList />} />;
};

export default SuperMarket;
