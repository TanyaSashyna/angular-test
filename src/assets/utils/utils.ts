// Validation rules

// If the password is empty
export const emptyField = (value: string): boolean => {
  return value.length === 0
};

// If the password has less than 8 characters
export const lessEightCharacters = (value: string): boolean => {
  return value.length < 8 && value.length !== 0
};

// If the password has more than 7 characters
export const moreEightCharacters = (value: string): boolean => {
  return value.length >= 8
};

// If the password has only letters/digits/symbols
export const oneTypeCharacters = (value: string): boolean => {
  return !/\D/g.test(value) || !/\w/g.test(value) || !/[\d\W]/g.test(value)
};

// If the password has only letters-digits/letters-symbols/digits-symbols
export const twoTypesCharacters = (value: string): boolean => {
  return !/\W/g.test(value) || !/[a-zA-Z]/g.test(value) || !/\d/g.test(value)
};
