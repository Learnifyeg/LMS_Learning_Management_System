export const customSelectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "var(--border)",
    boxShadow: "none",
    "&:hover": {
      borderColor: "var(--border)",
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "var(--text-primary)", // or your own variable
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--text-primary)", // main text color
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "rgba(255,255,255,0.1)" : "transparent",
    color: "var(--foreground)", // dropdown option text color
  }),
  input: (base: any) => ({
    ...base,
    color: "var(--text-primary)", // dropdown input text color
  }),
};
