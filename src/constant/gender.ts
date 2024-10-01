const Gender = ["male", "female"];

export const GenderSelectItems = Gender.map((gender) => ({
  label: gender.charAt(0).toUpperCase() + gender.slice(1),
  value: gender,
}));

export default Gender;
