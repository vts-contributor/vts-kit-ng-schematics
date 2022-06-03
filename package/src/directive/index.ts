import { chain, externalSchematic, Rule, schematic, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { findModule, getScamModulePath } from "../utils/helpers";
import * as path from 'path';
import { strings } from "@angular-devkit/core";



export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    if (options.shared === undefined) {
      options.shared = false
    }

    const modulePath = options.path
    const fullModulePath = await getScamModulePath(tree, options)
    const moduleName = options.name
    const directivePath = path.posix.join(
      fullModulePath,
      options.name
    )
    const opts = omit(options, ['shared'])

    const [moduleExist, _] = findModule(tree, fullModulePath, moduleName)

    const rules = compact([
      moduleExist 
      ? null 
      : schematic('module', {
        project: options.project,
        path: modulePath,
        name: moduleName,
        commonModule: false,
        exportClassName: `${strings.classify(moduleName)}DirectiveModule`,
        shared: options.shared
      }),
      externalSchematic('@schematics/angular', 'directive', {
        ...opts,
        path: directivePath,
        export: true
      }),
    ])

    return chain(rules);
  }
} 