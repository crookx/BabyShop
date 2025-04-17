class CacheService {
  static async getData(key, fetchCallback, options = {}) {
    const { ttl = 3600000 } = options; // Default TTL: 1 hour

    try {
      // Check localStorage first
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < ttl) {
          return data;
        }
      }

      // Fetch fresh data
      const freshData = await fetchCallback();
      
      // Cache the new data
      localStorage.setItem(key, JSON.stringify({
        data: freshData,
        timestamp: Date.now()
      }));

      return freshData;
    } catch (error) {
      console.error('Cache Service Error:', error);
      throw error;
    }
  }

  static clearCache(pattern) {
    Object.keys(localStorage)
      .filter(key => key.match(pattern))
      .forEach(key => localStorage.removeItem(key));
  }
}

export default CacheService;