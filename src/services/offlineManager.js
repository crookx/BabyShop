import { openDB } from 'idb';

class OfflineManager {
  constructor() {
    this.dbPromise = openDB('qaran-store', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('orders')) {
          db.createObjectStore('orders', { keyPath: 'id' });
        }
      }
    });
  }

  async saveForOffline(storeName, data) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(data);
    await tx.complete;
  }

  async getOfflineData(storeName, id) {
    const db = await this.dbPromise;
    return db.get(storeName, id);
  }

  async getAllOfflineData(storeName) {
    const db = await this.dbPromise;
    return db.getAll(storeName);
  }

  async syncOfflineData() {
    if (!navigator.onLine) return;

    const db = await this.dbPromise;
    const tx = db.transaction(['orders'], 'readwrite');
    const store = tx.objectStore('orders');
    const offlineOrders = await store.getAll();

    for (const order of offlineOrders) {
      try {
        await fetch('/api/orders', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        await store.delete(order.id);
      } catch (error) {
        console.error('Sync failed for order:', order.id);
      }
    }
  }
}

export default new OfflineManager();