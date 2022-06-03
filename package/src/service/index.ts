import { chain, externalSchematic, Rule, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { getScamModulePath } from "../utils/helpers";
import * as path from 'path';



export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    if (options.shared === undefined) {
      options.shared = false
    }

    const servicePath = await getScamModulePath(tree, options)
    const opts = omit(options, ['shared'])

    const rules = compact([
      externalSchematic('@schematics/angular', 'service', {
        ...opts,
        path: servicePath
      }),
    ])

    return chain(rules);
  }
} 