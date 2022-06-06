import { strings } from "@angular-devkit/core";
import { chain, externalSchematic, Rule, schematic, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { findModule, getScamModulePath } from "../utils/helpers";

export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    if (options.shared === undefined) {
      options.shared = false
    }

    const modulePath = options.path
    const fullModulePath = await getScamModulePath(tree, options)
    const moduleName = options.name
    const opts = omit(options, ['shared'])

    const [moduleExist, moduleFile] = findModule(tree, fullModulePath, moduleName)

    const rules = compact([
      moduleExist 
      ? null 
      : schematic('module', {
        project: options.project,
        path: modulePath,
        name: moduleName,
        exportClassName: `${strings.classify(moduleName)}ComponentModule`,
        shared: options.shared
      }),
      externalSchematic('@schematics/angular', 'component', {
        ...opts,
        path: fullModulePath,
        export: true
      })
    ])

    return chain(rules);
  }
} 