const BloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const BloodGroupSelectItems = BloodGroup.map((bloodGroup) => ({
  label: bloodGroup,
  value: bloodGroup,
}));

export default BloodGroup;
