import { strings } from "@angular-devkit/core";
import { apply, applyTemplates, chain, filter, move, noop, Rule, schematic, SchematicContext, url } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, mergeWith } from "lodash";
import { getScamModulePath, isInsideSharedDir } from "../utils/helpers";
import CONSTANTS from '../declare';
import * as path from 'path';


export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    options.path = options.name
    const groupPath = await getScamModulePath(tree, options)

    const featureOptions = {
      project: options.project,
      displayBlock: options.displayBlock,
      inlineStyle: options.inlineStyle,
      inlineTemplate: options.inlineTemplate,
      viewEncapsulation: options.viewEncapsulation,
      changeDetection: options.changeDetection,
      prefix: options.prefix,
      style: options.style,
      selector: options.selector,
      skipSelector: options.skipSelector,
      path: path.posix.join(options.path, 'feature'),
      name: options.feature,
      shared: false
    };
  
    const rules = compact([
      async (_tree: Tree, context: SchematicContext) => {
        const source = apply(url('./files'), [
          options.generateFeatureModule 
            ? noop() 
            : filter((path) => !path.endsWith(`____MODULE_EXT__.template`)),
          applyTemplates({
            ...strings,
            ...options,
            ...CONSTANTS
          }),
          move(groupPath)
        ])(context) as any
        const fileToCreate = await source.toPromise()
        _tree.merge(fileToCreate)
      },
      schematic('component', {
        ...featureOptions
      })
    ])

    return chain(rules);
  }
} 