import { useQuery } from "react-query";
import axios from "axios";

const fetchFormData = async () => {
  const { data } = await axios.get("http://localhost:8000/api/formData");
  return data;
};

const useFormData = () => {
  return useQuery("formData", fetchFormData);
};

export default useFormData;
