// Should turn off swagger rules for folks not using swagger typings
export = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  rules: {
    '@moneteam/nestjs/api-property-matches-property-optionality':
      'off',
    '@moneteam/nestjs/api-method-should-specify-api-response':
      'off',
    '@moneteam/nestjs/controllers-should-supply-api-tags':
      'off',
    '@moneteam/nestjs/api-enum-property-best-practices':
      'off',
    '@moneteam/nestjs/api-property-returning-array-should-set-array':
      'off',
  },
};
