import React, { useCallback, useMemo, useRef } from 'react';
import { useTheme, useMediaQuery, Box } from '@mui/material';
import { useResizeObserver, useVirtualization } from '../../utils/performanceUtils';

const VirtualizedGrid = ({ 
  items, 
  renderItem, 
  rowGap = 16, 
  columnGap = 16,
  overscan = 5
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  
  const { width } = useResizeObserver(containerRef);

  const { columns, itemWidth } = useMemo(() => {
    let cols;
    if (isMobile) cols = 1;
    else if (isTablet) cols = 2;
    else if (width < 1280) cols = 3;
    else cols = 4;

    const itemW = width ? (width - (columnGap * (cols - 1))) / cols : 0;
    return { columns: cols, itemWidth: itemW };
  }, [width, isMobile, isTablet, columnGap]);

  const rowHeight = itemWidth;
  const totalItems = items.length;
  const totalRows = Math.ceil(totalItems / columns);
  const totalHeight = totalRows * (rowHeight + rowGap) - rowGap;

  const renderGridItems = () => {
    return items.map((item, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      const top = row * (rowHeight + rowGap);
      const left = col * (itemWidth + columnGap);

      return (
        <Box
          key={item.id || index}
          sx={{
            position: 'absolute',
            top,
            left,
            width: itemWidth,
            height: rowHeight,
            transition: 'transform 0.2s ease'
          }}
        >
          {renderItem(item)}
        </Box>
      );
    });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: totalHeight,
          width: '100%'
        }}
      >
        {renderGridItems()}
      </Box>
    </Box>
  );
};

export default React.memo(VirtualizedGrid);