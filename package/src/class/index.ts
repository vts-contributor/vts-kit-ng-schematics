import { chain, externalSchematic, Rule, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { getScamModulePath } from "../utils/helpers";



export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    if (options.shared === undefined) {
      options.shared = false
    }

    const classPath = await getScamModulePath(tree, options)
    const opts = omit(options, ['shared'])

    const rules = compact([
      externalSchematic('@schematics/angular', 'class', {
        ...opts,
        path: classPath
      }),
    ])

    return chain(rules);
  }
} 