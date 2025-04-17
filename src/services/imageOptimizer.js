const imageOptimizer = {
  getOptimizedUrl: (originalUrl, options = {}) => {
    const { width, quality = 75, format = 'webp' } = options;
    const baseUrl = process.env.REACT_APP_IMAGE_CDN_URL;
    
    return `${baseUrl}/optimize?url=${encodeURIComponent(originalUrl)}&w=${width}&q=${quality}&fmt=${format}`;
  },

  generateSrcSet: (imageUrl) => {
    const sizes = [320, 640, 768, 1024, 1366, 1600];
    return sizes
      .map(size => `${imageOptimizer.getOptimizedUrl(imageUrl, { width: size })} ${size}w`)
      .join(', ');
  }
};

export default imageOptimizer;