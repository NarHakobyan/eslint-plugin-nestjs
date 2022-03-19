import type { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../../utils/createRule';
import { typedTokenHelpers } from '../../utils/typedTokenHelpers';

export const shouldUseApiTagDecorator = (
  node: TSESTree.ClassDeclaration,
): boolean => {
  const hasControllerDecorator = typedTokenHelpers.nodeHasDecoratorsNamed(
    node,
    ['Controller'],
  );

  const hasApiTagDecorator = typedTokenHelpers.nodeHasDecoratorsNamed(node, [
    'ApiTags',
  ]);

  return hasControllerDecorator && !hasApiTagDecorator;
};

export const controllerDecoratedHasApiTags = createRule({
  name: 'controllers-should-supply-api-tags',
  meta: {
    docs: {
      description:
        'Controllers should supply an ApiTag to make swagger UI easier to navigate',
      recommended: false,
      requiresTypeChecking: false,
    },
    messages: {
      shouldUseApiTagDecorator:
        'Controllers should use @ApiTags decorator. This makes it much easier to navigate swagger UI.',
    },
    schema: [],
    hasSuggestions: false,
    type: 'suggestion',
  },
  defaultOptions: [],

  create(context) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ClassDeclaration(node: TSESTree.ClassDeclaration): void {
        if (shouldUseApiTagDecorator(node)) {
          context.report({
            node,
            messageId: 'shouldUseApiTagDecorator',
          });
        }
      },
    };
  },
});
