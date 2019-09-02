import MarketStore from './market';

class RootStore {
  constructor() {
    this.market = new MarketStore(this);
  }
}

export default RootStore;
