export = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  rules: {
    //  "nestjs-typed/api-methods-have-documentation": "error",
    '@moneteam/nestjs/provided-injected-should-match-factory-parameters':
      'error',
    '@moneteam/nestjs/injectable-should-be-provided': [
      'error',
      {
        src: ['src/**/*.ts'],
        filterFromPaths: ['node_modules', '.test.', '.spec.'],
      },
    ],
    '@moneteam/nestjs/api-property-matches-property-optionality':
      'error',
    '@moneteam/nestjs/api-method-should-specify-api-response':
      'error',
    '@moneteam/nestjs/controllers-should-supply-api-tags':
      'error',
    '@moneteam/nestjs/api-enum-property-best-practices':
      'error',
    '@moneteam/nestjs/api-property-returning-array-should-set-array':
      'error',
    '@moneteam/nestjs/should-specify-forbid-unknown-values':
      'error',
    '@moneteam/nestjs/param-decorator-name-matches-route-param':
      'error',
    '@moneteam/nestjs/validated-non-primitive-property-needs-type-decorator':
      'error',
    '@moneteam/nestjs/validate-nested-of-array-should-set-each':
      'error',
    '@moneteam/nestjs/all-properties-are-whitelisted':
      'error',
  },
};
