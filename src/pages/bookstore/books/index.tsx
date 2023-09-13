import { PrivateLayout } from "@/components/layouts";
import { Button, Select, selectOption } from "@/components/ui";
import { InputSearch } from "@/components/ui/InputSearch";
import { useState } from "react";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },

]
function AdminBooks() {

  const [value1, setValue1] = useState<selectOption[]>([options[0]]);
  const [value2, setValue2] = useState<selectOption | undefined>(options[0]);
 

  return (
    <PrivateLayout title="libros" >

      <Button
        buttonStyle="iconButton"
        ico="plus"
        bottom="10%"
        position="fixed"
        right="10%"
      />

      {/* <Select
        options={options}
        value={value1}
        onChange={o => setValue1(o)}
        multiple
      />

      <Select
        options={options}
        value={value2}
        onChange={o => setValue2(o)}
      /> */}

<InputSearch />
    </PrivateLayout>
  )
}

export default AdminBooks;
