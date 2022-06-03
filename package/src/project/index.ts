import { strings } from "@angular-devkit/core";
import { apply, applyTemplates, chain, externalSchematic, move, Rule, SchematicContext, url, MergeStrategy } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { getWorkspace } from "@schematics/angular/utility/workspace";
import _, { compact } from "lodash";
import CONSTANTS from '../declare';
import * as path from 'path';

export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    if (!options.projectRoot)
      options.projectRoot = (workspace.extensions.newProjectRoot as string | undefined) || '';

    
    const projectDir = path.posix.join(options.projectRoot, options.name)
    const srcDir = path.posix.join(projectDir, 'src')

    const rules = compact([
      externalSchematic('@schematics/angular', 'app', {
        ...options,
        projectRoot: projectDir
      }),
      async (_tree: Tree, context: SchematicContext) => {
        const source = apply(url('./tree'), [
          applyTemplates({
            ...strings,
            ...CONSTANTS
          }),
          move(srcDir)
        ])(context) as any
        const fileToCreate = await source.toPromise()
        tree.merge(fileToCreate)
      },
    ])

    return chain(rules);
  }
} 