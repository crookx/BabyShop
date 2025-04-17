import { createSelector } from '@reduxjs/toolkit';

export const selectProductsState = state => state.products;

export const selectFeaturedProducts = createSelector(
  [selectProductsState],
  products => products.featured || []
);

export const selectCategories = createSelector(
  [selectProductsState],
  products => products.categories || []
);

export const selectSpecialOffers = createSelector(
  [selectProductsState],
  products => products.specialOffers || []
);

export const selectProductsLoading = createSelector(
  [state => state.ui],
  ui => ui.loading
);

export const selectProductsError = createSelector(
  [state => state.ui],
  ui => ui.error
);