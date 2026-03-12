import { useRef, useState } from "react";
import { getPatientDetails } from "../../apis/patients";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";

function PatientSearchField({ name, label, setPatientOptions, patientOptions }) {
  const { register, formState: { errors }, setValue } = useFormContext();

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeout = useRef(null);

  const searchPatients = (value) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(async () => {
      if (!value) {
        setPatientOptions([]);
        return;
      }

      const patients = await getPatientDetails(value);

      const formatted = patients.map((p) => ({
        label: `${p.name} • ${p.age} yrs • ${p.phone}`,
        value: p.id,
        patient: p,
      }));

      setPatientOptions(formatted);
      setShowDropdown(true);
    }, 300);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setQuery(value);
    setValue(name, value);

    setValue("patientAge", "");
    setValue("contactNumber", "");
    setValue("gender", null);

    searchPatients(value);
  };

  const selectPatient = (patient) => {
    setValue(name, patient.name);
    setValue("patientAge", patient.age);
    setValue("contactNumber", patient.phone);

    setValue("gender", {
      label: patient.gender,
      value: patient.gender,
    });

    setQuery(patient.name);
    setShowDropdown(false);
  };

  return (
    <div>
      {label && (
        <label className="form-label">
          {label}
          <span className="ms-1 text-danger">*</span>
        </label>
      )}

      <div style={{ position: "relative" }}>
        <input
          {...register(name, { required: "Patient name is required" })}
          className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
          value={query}
          onChange={handleChange}
          placeholder="Enter patient name"
        />

        {showDropdown && patientOptions?.length > 0 && (
          <div
            className="border rounded bg-white shadow-sm"
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 10,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {patientOptions.map((p) => (
                <div
                    key={p.value}
                    className="px-3 py-2 border-b border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
                    style={{
                        cursor: "pointer",
                        padding: "8px 12px",
                        borderBottom: "1px solid #e5e7eb"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    onClick={() => selectPatient(p.patient)}
                >
                    <div style={{ fontWeight: 600 }}>
                    {p.patient.name}
                    </div>

                    <div style={{ fontSize: "12px", color: "#6c757d" }}>
                    {p.patient.age} yrs | {p.patient.phone}
                    </div>
                </div>
                ))}
          </div>
        )}
      </div>

      {errors?.[name] && (
        <div className="invalid-feedback d-block">
          {errors[name].message}
        </div>
      )}
    </div>
  );
}

PatientSearchField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  setPatientOptions: PropTypes.func.isRequired,
  patientOptions: PropTypes.array.isRequired,
};

export default PatientSearchField;