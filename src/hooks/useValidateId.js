import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useValidateId = (id) => {
  const [validId, setValidId] = useState(null);
  const navigate  = useNavigate();
  useEffect(() => {
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isValid = regex.test(id);
    if (!isValid) {
      setValidId(null);
      navigate("/hospital/services");
    } else {
      setValidId(id);
    }
  }, []);
  return { validId };
};
