function Input({ name, type = "text", placeholder, value, onChange }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full border border-gray-300 p-2 rounded"
    />
  );
}

export default Input;
