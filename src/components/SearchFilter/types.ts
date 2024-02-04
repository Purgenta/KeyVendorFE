export type SearchFilterValues = {
  name?: string;
  categoryId?: string;
  price?: number;
  vendorId?: string;
};
export type SearchFilterProps = {
  onSearchSubmit: (values: SearchFilterValues) => void;
};
