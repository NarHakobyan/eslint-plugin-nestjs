// Should turn off swagger rules for folks not using swagger typings
export = {
    parser: "@typescript-eslint/parser",
    parserOptions: {sourceType: "module"},
    rules: {
        "@awesome-nestjs-boilerplate/nestjs/api-property-matches-property-optionality":
            "off",
        "@awesome-nestjs-boilerplate/nestjs/api-method-should-specify-api-response":
            "off",
        "@awesome-nestjs-boilerplate/nestjs/controllers-should-supply-api-tags": "off",
        "@awesome-nestjs-boilerplate/nestjs/api-enum-property-best-practices": "off",
        "@awesome-nestjs-boilerplate/nestjs/api-property-returning-array-should-set-array":
            "off",
    },
};
