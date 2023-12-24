import React from "react";
import { Select } from "@chakra-ui/react";
import { useGetAllLeafCategoriesQuery } from "../../../redux/api/categoryApi";
type CategoryDropdownProps = {
  onChange: (value: string) => unknown;
};
const CategoryDropdown = ({ onChange }: CategoryDropdownProps) => {
  const { data } = useGetAllLeafCategoriesQuery("");
  if (!data) return <></>;
  return (
    <Select
      onChange={(event) => {
        const val = event.target.value;
        onChange(val);
      }}
      placeholder="Select option"
    >
      {data.map((category) => (
        <option value={category.id}>{category.name}</option>
      ))}
    </Select>
  );
};

export default CategoryDropdown;
