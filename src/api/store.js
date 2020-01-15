export default class Store {

  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  /**
   * Returns items from local storage
   * @return {Object} - items object
   */
  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey));
    } catch (err) {
      return {};
    }
  }

  /**
   * Returns item from storage by id
   * @param {String} id - item's id
   * @return {Object} - item
   */
  getItem(id) {
    const store = this.getAll();
    return store[id];
  }

  /**
   * Saves item in local storage
   * @param {String} key - item's key
   * @param {Object} value - item
   */
  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {[key]: value})
        )
    );
  }

  /**
   * Removes item from local storage
   * @param {String} key - item's key
   */
  removeItem(key) {
    const store = this.getAll();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store)
        )
    );
  }
}
