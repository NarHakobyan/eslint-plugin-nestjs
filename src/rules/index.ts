import { allPropertiesAreWhitelisted } from './allPropertiesAreWhitelisted/allPropertiesAreWhitelisted';
import { apiEnumPropertyBestPractices } from './apiEnumPropertyBestPractices/apiEnumPropertyBestPractices';
import { apiMethodsShouldSpecifyApiResponse } from './apiMethodsShouldSpecifyApiResponse/apiMethodsShouldSpecifyApiResponse';
import { apiPropertyMatchesPropertyOptionality } from './apiPropertyMatchesPropertyOptionality/apiPropertyMatchesPropertyOptionality';
import { apiPropertyReturningArrayShouldSetArray } from './apiPropertyReturningArrayShouldSetArray/apiPropertyReturningArrayShouldSetArray';
import { controllerDecoratedHasApiTags } from './controllerDecoratedHasApiTags/controllerDecoratedHasApiTags';
import injectableShouldBeProvided from './injectablesShouldBeProvided/injectableShouldBeProvided';
import parameterDecoratorNameMatchesRouteParam from './paramDecoratorNameMatchesRouteParam/paramDecoratorNameMatchesRouteParam';
import providedInjectedShouldMatchFactoryParameters from './providerInjectedShouldMatchFactory/ProviderInjectedShouldMatchFactory';
import shouldSpecifyForbidUnknownValues from './shouldSpecifyForbidUnknownValues/shouldSpecifyForbidUnknownValuesRule';
import validateNonPrimitiveNeedsDecorators from './validate-non-primitves-needs-type-decorator/validateNonPrimitiveNeedsDecorators';
import { validateNestedOfArrayShouldSetEach } from './validateNestedOfArrayShouldSetEach/validateNestedOfArrayShouldSetEach';

const allRules = {
  'api-property-matches-property-optionality':
    apiPropertyMatchesPropertyOptionality,
  'injectable-should-be-provided': injectableShouldBeProvided,
  'provided-injected-should-match-factory-parameters':
    providedInjectedShouldMatchFactoryParameters,
  'controllers-should-supply-api-tags': controllerDecoratedHasApiTags,
  'api-method-should-specify-api-response': apiMethodsShouldSpecifyApiResponse,
  'api-enum-property-best-practices': apiEnumPropertyBestPractices,
  'api-property-returning-array-should-set-array':
    apiPropertyReturningArrayShouldSetArray,
  'should-specify-forbid-unknown-values': shouldSpecifyForbidUnknownValues,
  'param-decorator-name-matches-route-param':
    parameterDecoratorNameMatchesRouteParam,
  'validated-non-primitive-property-needs-type-decorator':
    validateNonPrimitiveNeedsDecorators,
  'validate-nested-of-array-should-set-each':
    validateNestedOfArrayShouldSetEach,
  'all-properties-are-whitelisted': allPropertiesAreWhitelisted,
};

export default allRules;
