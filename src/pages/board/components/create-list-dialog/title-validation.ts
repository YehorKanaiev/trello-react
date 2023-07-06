export const titleValidation = {
  required: `Обовязкове поле`,
  validate: (value: string): boolean | string => {
    if (value.length < 3) {
      return 'Заголовок повинен бути довшим за 3 символи';
    }

    if (value.length > 30) {
      return 'Заголовок повинен бути коротшим за 30 символів';
    }

    return true;
  },
};
