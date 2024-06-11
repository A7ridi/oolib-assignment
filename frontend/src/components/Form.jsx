import React, { useState } from "react";
import useFormData from "../utils/hooks/useFormData";
import {
  DropdownSingle,
  CheckboxList,
  RadioList,
  DatePicker,
  TextInput,
} from "oolib";

const Form = () => {
  const { data, isLoading, error } = useFormData();
  const [formState, setFormState] = useState({});
  const [dateValue, setDateValue] = useState(Date.now());
  const [checkedOptions, setCheckedOptions] = useState([]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  const handleChange = (value, valuePath) => {
    setFormState((prevState) => ({
      ...prevState,
      [valuePath]: value,
    }));
  };

  const checkBoxHandler = (opt) => {
    setCheckedOptions(opt);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      {data.map((field) => {
        const { comp, valuePath, props } = field;

        if (comp === "TextInput") {
          return (
            <TextInput
              {...props}
              key={props.id}
              placeholder="Enter text..."
              value={formState[valuePath] || ""}
              onChange={(_, value) => handleChange(value, valuePath)}
            />
          );
        }

        // Something wrong with this DropdownSingle, always showing Destroy is not a function

        // if (comp === "DropdownSingle") {
        //   return (
        //     <DropdownSingle
        //       id="example-dropdown"
        //       key={props.id}
        //       {...props}
        //       value=""
        //       options={props.options}
        //       onChange={(_, newValue) =>
        //         console.log("Selected value:", newValue)
        //       }
        //       placeholder="Select an option"
        //     />
        //   );
        // }

        if (comp === "CheckboxList") {
          return (
            <CheckboxList
              key={props.id}
              {...props}
              value={checkedOptions}
              onChange={(_, value) => checkBoxHandler(value)}
            />
          );
        }

        if (comp === "RadioList") {
          return (
            <RadioList
              key={props.id}
              {...props}
              value={formState[valuePath] || ""}
              onChange={(_, value) => handleChange(value, valuePath)}
            />
          );
        }

        if (comp === "DatePicker") {
          return (
            <DatePicker
              key={props.id}
              {...props}
              value={new Date(dateValue)}
              onChange={(_, value) => setDateValue(value)}
            />
          );
        }

        return null;
      })}
    </form>
  );
};

export default Form;
