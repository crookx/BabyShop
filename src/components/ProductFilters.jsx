import React, { useState } from 'react';
import { Slider, Select, Form } from 'antd';

const ProductFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: null,
    priceRange: [0, 1000]
  });

  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

  const handleChange = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters-container">
      <Form layout="vertical">
        <Form.Item label="Category">
          <Select
            placeholder="Select category"
            allowClear
            onChange={(value) => handleChange('category', value)}
            options={categories.map(cat => ({ value: cat, label: cat }))}
          />
        </Form.Item>
        <Form.Item label="Price Range">
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={[0, 1000]}
            onChange={(value) => handleChange('priceRange', value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductFilters;