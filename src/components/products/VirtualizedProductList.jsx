import React, { useState, useCallback, useRef } from 'react';
import { Box } from '@mui/material';
import { useVirtualization, useInfiniteLoader, useResizeObserver } from '../../utils/performanceUtils';
import ProductCard from './ProductCard';

const ITEM_HEIGHT = 400; // Approximate height of product card

const VirtualizedProductList = ({ 
  products = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 }
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const handleResize = useCallback(({ height }) => {
    setContainerHeight(height);
  }, []);

  const resizeRef = useResizeObserver(handleResize);

  const loadMoreRef = useInfiniteLoader(() => {
    if (!loading && hasMore) {
      onLoadMore?.();
    }
  });

  const { totalHeight, getVisibleRange } = useVirtualization(
    products,
    ITEM_HEIGHT,
    containerHeight
  );

  const { startIndex, endIndex } = getVisibleRange(scrollTop);
  const visibleProducts = products.slice(startIndex, endIndex);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        height: '100%',
        overflow: 'auto',
        position: 'relative'
      }}
    >
      <Box
        ref={resizeRef}
        sx={{
          height: totalHeight,
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 2,
          p: 2
        }}
      >
        {visibleProducts.map((product, index) => (
          <Box
            key={product.id}
            sx={{
              position: 'absolute',
              top: (startIndex + index) * ITEM_HEIGHT,
              left: 0,
              right: 0,
              height: ITEM_HEIGHT,
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
      <div ref={loadMoreRef} style={{ height: 1 }} />
    </Box>
  );
};

export default React.memo(VirtualizedProductList);