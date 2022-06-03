import { strings } from "@angular-devkit/core";
import { apply, applyTemplates, chain, filter, mergeWith, move, noop, Rule, schematic, SchematicContext, SchematicsException, url } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact } from "lodash";
import { findModule, getScamModulePath } from "../utils/helpers";
import CONSTANTS from '../declare'
import { addDeclarationToModule, addExportToModule } from '@schematics/angular/utility/ast-utils';
import * as ts from '@schematics/angular//third_party/github.com/Microsoft/TypeScript/lib/typescript';
import * as path from 'path';
import { InsertChange } from "@schematics/angular/utility/change";
import { buildRelativePath } from "schematics-utilities";

export default function (options: any): Rule {
  return async (tree: Tree, _context: SchematicContext) => {
    const validatorPath = await getScamModulePath(tree, options)

    const templateSource = apply(url('./files'), [
      options.form === 'reactive' ? filter((path) => path.endsWith(`__VALIDATOR_EXT__.template`)) : noop(),
      applyTemplates({
        ...strings,
        ...options,
        ...CONSTANTS
      }),
      move(validatorPath)
    ]);

    
    const modulePath = options.path
    const fullModulePath = validatorPath
    const moduleName = options.name
    const [moduleExist, moduleFile] = findModule(tree, fullModulePath, moduleName)

    const rules = compact([
      mergeWith(templateSource),
      options.form === 'template' && !moduleExist 
      ? schematic('module', {
        project: options.project,
        path: modulePath,
        name: moduleName,
        commonModule: false,
        exportClassName: `${strings.classify(moduleName)}ValidatorModule`,
        shared: options.shared
      })
      : null,
      options.form === 'template' 
      ? (tree: Tree) => {
        const text = tree.read(moduleFile);
        if (text === null) {
          throw new SchematicsException(`File ${moduleFile} does not exist.`);
        }
        const sourceText = text.toString('utf-8');
        const source = ts.createSourceFile(moduleFile, sourceText, ts.ScriptTarget.Latest, true);
        const directivePath = path.posix.join(fullModulePath, options.name, strings.dasherize(options.name) + CONSTANTS.DIRECTIVE_EXT.slice(0, -3))
        const relativePath = buildRelativePath(moduleFile, directivePath);
        const declarationChanges = addDeclarationToModule(
          source,
          moduleFile,
          strings.classify(`${options.name}ValidatorDirective`),
          relativePath,
        )
        const declareRecorder = tree.beginUpdate(moduleFile);
        for (const change of declarationChanges) {
          if (change instanceof InsertChange) {
            declareRecorder.insertLeft(change.pos, change.toAdd);
          }
        }
        tree.commitUpdate(declareRecorder);

        const declaredText = tree.read(moduleFile) || '';
        const declaredSource = ts.createSourceFile(moduleFile, declaredText.toString('utf-8'), ts.ScriptTarget.Latest, true);
        const exportRecorder = tree.beginUpdate(moduleFile);
        const exportChanges = addExportToModule(
          declaredSource,
          moduleFile,
          strings.classify(`${options.name}ValidatorDirective`),
          relativePath,
        );
  
        for (const change of exportChanges) {
          if (change instanceof InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
          }
        }
        tree.commitUpdate(exportRecorder);
        return tree
      }
      : null
    ])

    return chain(rules);
  }
} 