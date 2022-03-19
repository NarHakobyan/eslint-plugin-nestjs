import {TSESTree} from "@typescript-eslint/experimental-utils";
import {RuleContext} from "@typescript-eslint/utils/dist/ts-eslint";
import {createRule} from "../../utils/createRule";
import FileEnumeratorWrapper from "../../utils/files/fileEnumerationWrapper";
import NestProvidedInjectableMapper from "../../utils/nestModules/nestProvidedInjectableMapper";

import {NestProvidedInjectablesMap} from "../../utils/nestModules/models/NestProvidedInjectablesMap";
import {typedTokenHelpers} from "../../utils/typedTokenHelpers";

let listFilesToProcess;
let nestModuleMap: Map<string, NestProvidedInjectablesMap>;

const findModuleMapping = (
    classNAme: string,
    propertyName: "controllers" | "providers",
    nestModuleMap: Map<string, NestProvidedInjectablesMap>
): NestProvidedInjectablesMap | undefined => {
    for (const entry of nestModuleMap.values()) {
        if (entry[propertyName].has(classNAme)) {
            return entry;
        }
    }
    return undefined;
};

// super fragile types but whatevs
const checkNode = (
    node: TSESTree.ClassDeclaration,
    decoratorName: "Injectable" | "Controller",
    propertyName: "controllers" | "providers",
    messageId: "injectableInModule" | "controllersInModule",
    context: Readonly<
        RuleContext<"injectableInModule" | "controllersInModule", never[]>
    >
) => {
    if (
        NestProvidedInjectableMapper.isNestInjectableThatIsNeverProvided(node)
    ) {
        return;
    }
    if (typedTokenHelpers.nodeHasDecoratorsNamed(node, [decoratorName])) {
        const name = node.id?.name;
        if (!name) {
            return;
        }
        const foundMap = findModuleMapping(name, propertyName, nestModuleMap);
        if (foundMap) {
            return;
        }
        // couldn't find map so error
        context.report({
            node: node,
            messageId: messageId,
        });
    }
};

function initialiseModuleMappings(
    sourcePath: string,
    filterFromPaths: string[],
    context: Readonly<RuleContext<never, never[]>>
) {
    const mappedSource = NestProvidedInjectableMapper.mapDefaultSource(
        sourcePath,
        process.cwd()
    );
    listFilesToProcess = FileEnumeratorWrapper.enumerateFiles(
        mappedSource,
        [".ts"],
        filterFromPaths
    );

    nestModuleMap = NestProvidedInjectableMapper.parseFileList(
        listFilesToProcess,
        context
    );
}

const rule = createRule({
    name: "injectable-should-be-provided",
    meta: {
        docs: {
            description: "Public api methods should have documentation",
            recommended: false,
            requiresTypeChecking: false,
        },
        messages: {
            injectableInModule: `Classes marked as Injectable must be added to a module's providers. If you added it already but this error still shows in your editor, please change one character in the injectable file to poke your eslint plugin.`,
            controllersInModule: `Classes marked as Controller must be added to a module's controllers. If you added it already but this error still shows in your editor, please change one character in the controller file to poke your eslint plugin.`,
        },
        schema: [
            {
                properties: {
                    src: {
                        description:
                            "files/paths to be analyzed (only for provided injectable or controller)",
                        type: "array",
                        minItems: 1,
                        items: {
                            type: "string",
                            minLength: 1,
                        },
                    },
                    filterFromPaths: {
                        description:
                            "strings to exclude from checks (only for provided injectable or controller)",
                        type: "array",
                        minItems: 1,
                        items: {
                            type: "string",
                            minLength: 1,
                        },
                    },
                },
            },
        ],
        type: "problem",
    },
    defaultOptions: [],

    create(context) {
        const {
            src,
            filterFromPaths,
            // ignoreExports = [],
            // missingExports,
            // unusedExports,
        } = context.options[0] || {};

        if (nestModuleMap === undefined || nestModuleMap.size === 0) {
            initialiseModuleMappings(src, filterFromPaths, context);
        }

        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ClassDeclaration(node: TSESTree.ClassDeclaration): void {
                checkNode(
                    node,
                    "Injectable",
                    "providers",
                    "injectableInModule",
                    context
                );
                checkNode(
                    node,
                    "Controller",
                    "controllers",
                    "controllersInModule",
                    context
                );
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Program:exit"(): void {
                // map the source to a mapping thing
                // if not undefined set it to the mapping set
                const mappedProvidedInjectables =
                    NestProvidedInjectableMapper.mapAllProvidedInjectables(
                        context.getSourceCode().ast,
                        context.getFilename()
                    );
                if (mappedProvidedInjectables !== null) {
                    nestModuleMap.set(
                        mappedProvidedInjectables[0] as string,
                        mappedProvidedInjectables[1] as NestProvidedInjectablesMap
                    );
                }
            },
        };
    },
});

export default rule;
