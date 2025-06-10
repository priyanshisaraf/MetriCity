import { useState } from "react";
import Select from "react-select";

export default function RegistrationForm({ email, onSuccess }) {
  const [form, setForm] = useState({
    alertEmail: email || "",
    city: null,
    ageGroup: { value: "adult", label: "Adult" },
    mode: { value: "auto", label: "Auto" },
    aqi: "",
    temp: "",
    humidity: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const cityOptions = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "bengaluru", label: "Bengaluru" },
    { value: "hyderabad", label: "Hyderabad" },
  ];

  const ageGroupOptions = [
    { value: "child", label: "Child" },
    { value: "adult", label: "Adult" },
    { value: "elderly", label: "Elderly" },
  ];

  const modeOptions = [
    { value: "auto", label: "Auto" },
    { value: "manual", label: "Manual" },
  ];

  const handleSelectChange = (selectedOption, { name }) => {
    setForm({ ...form, [name]: selectedOption });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!form.alertEmail || !form.city) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const payload = {
      email: form.alertEmail,
      city: form.city.value,
      ageGroup: form.ageGroup.value,
      mode: form.mode.value,
      ...(form.mode.value === "manual" && {
        aqi: form.aqi,
        temp: form.temp,
        humidity: form.humidity,
      }),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://rqbgqjaw37.execute-api.ap-south-1.amazonaws.com/dev/RegisterUserHandler",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Registration successful!");
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage("❌ " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("❌ Network error. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Registration Form
        </h2>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <div className="space-y-2">
          <label
            htmlFor="alertEmail"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Alert Email *
          </label>
          <input
            id="alertEmail"
            name="alertEmail"
            type="email"
            value={form.alertEmail}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            City *
          </label>
          <Select
            name="city"
            value={form.city}
            onChange={handleSelectChange}
            options={cityOptions}
            placeholder="Select City"
            classNamePrefix="react-select"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Age Group
          </label>
          <Select
            name="ageGroup"
            value={form.ageGroup}
            onChange={handleSelectChange}
            options={ageGroupOptions}
            classNamePrefix="react-select"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
            Alert Mode
          </label>
          <Select
            name="mode"
            value={form.mode}
            onChange={handleSelectChange}
            options={modeOptions}
            classNamePrefix="react-select"
          />
        </div>

        {form.mode.value === "manual" && (
          <div className="space-y-4 border-t pt-4 dark:border-gray-600">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                AQI Threshold
              </label>
              <input
                name="aqi"
                type="number"
                value={form.aqi}
                onChange={handleInputChange}
                placeholder="e.g. 150"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Temperature Threshold (°C)
              </label>
              <input
                name="temp"
                type="number"
                value={form.temp}
                onChange={handleInputChange}
                placeholder="e.g. 40"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Humidity Threshold (%)
              </label>
              <input
                name="humidity"
                type="number"
                value={form.humidity}
                onChange={handleInputChange}
                placeholder="e.g. 70"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md transition duration-200 text-white ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
