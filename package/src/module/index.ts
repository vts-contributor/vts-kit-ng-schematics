import { strings } from "@angular-devkit/core";
import { chain, externalSchematic, Rule, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { findModule, getScamModulePath } from "../utils/helpers";

export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const fullModulePath = await getScamModulePath(tree, options)
    const opts = omit(options, ['exportClassName', 'shared'])

    const rules = compact([
      externalSchematic('@schematics/angular', 'module', {
        ...opts,
        path: fullModulePath
      }),
      (tree: Tree) => {
        if (options.exportClassName) {
          const [_, modulePath] = findModule(tree, fullModulePath, options.name)
          const text = tree.read(modulePath) || ''
          const sourceText = text.toString('utf-8');
          const oldName = `${strings.classify(options.name)}Module`
          const newName = options.exportClassName
          tree.overwrite(modulePath, sourceText.replace(oldName, newName))
        }
      }
    ])

    return chain(rules);
  }
} 