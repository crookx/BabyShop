import { Analytics } from '@google-analytics/data';
import mixpanel from 'mixpanel-browser';

class EventTracker {
  constructor() {
    mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN);
  }

  trackEvent(eventName, properties = {}) {
    // Google Analytics
    window.gtag('event', eventName, properties);
    
    // Mixpanel
    mixpanel.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    });
  }

  trackPageView(page) {
    this.trackEvent('page_view', { page });
  }

  trackProductView(product) {
    this.trackEvent('product_view', {
      product_id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    });
  }

  trackAddToCart(product, quantity) {
    this.trackEvent('add_to_cart', {
      product_id: product.id,
      quantity,
      value: product.price * quantity
    });
  }

  trackPurchase(order) {
    this.trackEvent('purchase', {
      order_id: order.id,
      value: order.total,
      products: order.items
    });
  }
}

export default new EventTracker();