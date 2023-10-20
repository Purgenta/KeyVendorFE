import { useGetAllVendorsQuery } from "../../../redux/api/vendorApi";
import { Select } from "@chakra-ui/react";
type VendorDropdownProps = {
  onChange: (id: string) => unknown;
};
const VendorDropdown = ({ onChange }: VendorDropdownProps) => {
  const { data } = useGetAllVendorsQuery("vendors");
  if (!data) return <></>;
  return (
    <Select
      onChange={(event) => {
        const val = event.target.value;
        onChange(val);
      }}
      placeholder="Select option"
    >
      {data.map((vendor) => (
        <option value={vendor.id}>{vendor.name}</option>
      ))}
    </Select>
  );
};

export default VendorDropdown;
