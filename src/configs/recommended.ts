export = {
    parser: "@typescript-eslint/parser",
    parserOptions: {sourceType: "module"},
    rules: {
        //  "nestjs-typed/api-methods-have-documentation": "error",
        "@awesome-nestjs-boilerplate/nestjs/provided-injected-should-match-factory-parameters":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/injectable-should-be-provided": [
            "error",
            {
                src: ["src/**/*.ts"],
                filterFromPaths: ["node_modules", ".test.", ".spec."],
            },
        ],
        "@awesome-nestjs-boilerplate/nestjs/api-property-matches-property-optionality":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/api-method-should-specify-api-response":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/controllers-should-supply-api-tags": "error",
        "@awesome-nestjs-boilerplate/nestjs/api-enum-property-best-practices": "error",
        "@awesome-nestjs-boilerplate/nestjs/api-property-returning-array-should-set-array":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/should-specify-forbid-unknown-values": "error",
        "@awesome-nestjs-boilerplate/nestjs/param-decorator-name-matches-route-param":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/validated-non-primitive-property-needs-type-decorator":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/validate-nested-of-array-should-set-each":
            "error",
        "@awesome-nestjs-boilerplate/nestjs/all-properties-are-whitelisted": "error",
    },
};
