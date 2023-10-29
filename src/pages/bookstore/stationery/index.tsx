import { ChangeEvent,  useState } from "react";

import { Layout } from "@/components/layouts/app";
import { SingleFormControl } from "@/components/ui";

const initialForm = {
  price: 0,
  discount: 0,
  total: 0,
};

function AdminStationeries() {
  const [value, setValue] = useState(initialForm);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;

    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout title="papelería">
      <SingleFormControl
        label="price"
        type="number"
        placeholder="Price"
        name="price"
        value={value.price}
        onChange={onChange}
      />
      <SingleFormControl
        label="discount"
        type="number"
        placeholder="Discount"
        name="discount"
        value={value.discount}
        onChange={onChange}
      />
      <SingleFormControl
        label="total"
        type="number"
        placeholder="Total"
        name="total"
        value={Number(value.price) + (value.price * value.discount) / 100}
        onChange={onChange}
        disabled
      />
    </Layout>
  );
}

export default AdminStationeries;
