import { strings } from "@angular-devkit/core";
import { chain, externalSchematic, Rule, schematic, SchematicContext } from "@angular-devkit/schematics";
import { Tree } from "@angular-devkit/schematics/src/tree/interface";
import { compact, omit } from "lodash";
import { findModule, getScamModulePath } from "../utils/helpers";
import * as ts from '@schematics/angular//third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { addSymbolToNgModuleMetadata, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from "@schematics/angular/utility/change";

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
      }),
      (tree: Tree) => {
        const declaredText = tree.read(moduleFile) || '';
        const declaredSource = ts.createSourceFile(moduleFile, declaredText.toString('utf-8'), ts.ScriptTarget.Latest, true);
        const importRecord = tree.beginUpdate(moduleFile);
        const importChange = insertImport(
          declaredSource,
          moduleFile,
          `RouterModule`,
          '@angular/router',
        );
        for (const change of [importChange]) {
          if (change instanceof InsertChange) {
            importRecord.insertLeft(change.pos, change.toAdd);
          }
        }
        tree.commitUpdate(importRecord);

        const newText = tree.read(moduleFile) || '';
        const newSource = ts.createSourceFile(moduleFile, newText.toString('utf-8'), ts.ScriptTarget.Latest, true);
        const metaRecord = tree.beginUpdate(moduleFile);
        const metadataChange = addSymbolToNgModuleMetadata(
          newSource,
          moduleFile,
          'imports',
          `RouterModule.forChild([{path: '', component: ${strings.classify(moduleName)}Component}])`,
        );
        for (const change of metadataChange) {
          if (change instanceof InsertChange) {
            metaRecord.insertLeft(change.pos, change.toAdd);
          }
        }
        tree.commitUpdate(metaRecord);
        return tree
      }
    ])

    return chain(rules);
  }
} 