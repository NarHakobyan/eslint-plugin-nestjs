import type { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../../utils/createRule';
import { typedTokenHelpers } from '../../utils/typedTokenHelpers';

export const shouldUseApiResponseDecorator = (
  node: TSESTree.MethodDefinition,
): boolean => {
  const hasApiMethodDecorator = typedTokenHelpers.nodeHasDecoratorsNamed(node, [
    'Get',
    'Post',
    'Put',
    'Delete',
    'Patch',
    'Options',
    'Head',
    'All',
  ]);

  const hasApiResponseDecorator = typedTokenHelpers.nodeHasDecoratorsNamed(
    node,
    [
      'ApiResponse',
      'ApiOkResponse',
      'ApiCreatedResponse',
      'ApiAcceptedResponse',
      'ApiNoContentResponse',
      'ApiMovedPermanentlyResponse',
      'ApiFoundResponse',
      'ApiBadRequestResponse',
      'ApiUnauthorizedResponse',
      'ApiTooManyRequestsResponse',
      'ApiNotFoundResponse',
      'ApiInternalServerErrorResponse',
      'ApiBadGatewayResponse',
      'ApiConflictResponse',
      'ApiForbiddenResponse',
      'ApiGatewayTimeoutResponse',
      'ApiGoneResponse',
      'ApiMethodNotAllowedResponse',
      'ApiNotAcceptableResponse',
      'ApiNotImplementedResponse',
      'ApiPreconditionFailedResponse',
      'ApiPayloadTooLargeResponse',
      'ApiRequestTimeoutResponse',
      'ApiServiceUnavailableResponse',
      'ApiUnprocessableEntityResponse',
      'ApiUnsupportedMediaTypeResponse',
      'ApiDefaultResponse',
    ],
  );

  return hasApiMethodDecorator && !hasApiResponseDecorator;
};

export const apiMethodsShouldSpecifyApiResponse = createRule({
  name: 'api-method-should-specify-api-response',
  meta: {
    docs: {
      description:
        'Api methods should at least specify the expected OK response with @ApiOkResponse. But also add any error responses that might not be expected (e.g. 429)',
      recommended: false,
      requiresTypeChecking: false,
    },
    messages: {
      shouldSpecifyApiResponse:
        'A method decorated with @Get, @Post etc. should specify the expected ApiResponse e.g. @ApiOkResponse(type: MyType)',
    },
    schema: [],
    hasSuggestions: false,
    type: 'suggestion',
  },
  defaultOptions: [],

  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      MethodDefinition(node: TSESTree.MethodDefinition): void {
        if (shouldUseApiResponseDecorator(node)) {
          context.report({
            node,
            messageId: 'shouldSpecifyApiResponse',
          });
        }
      },
    };
  },
});
