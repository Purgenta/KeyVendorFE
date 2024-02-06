export type SearchFilterValues = {
  name?: string;
  categoryId?: string;
  price?: string;
  vendorId?: string;
};
export type SearchFilterProps = {
  onSearchSubmit: (values: SearchFilterValues) => void;
};
