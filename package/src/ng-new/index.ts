import { chain, externalSchematic, Rule, schematic, SchematicContext, Tree } from "@angular-devkit/schematics";
import chalk from "chalk";
import { omit } from "lodash";
import * as path from 'path';
import { NodeDependencyType } from "schematics-utilities";
import { addDependency, formatJson } from "../utils/helpers";

export default function (options: any): Rule {
  const packageJson = require('../../package.json')

  return (_tree: Tree, _context: SchematicContext) => {
    const newOptions = {
      ...omit(options, ['projectName']),
      createApplication: false
    }

    const projectOptions = {
      inlineStyle: options.inlineStyle,
      inlineTemplate: options.inlineTemplate,
      prefix: options.prefix,
      viewEncapsulation: options.viewEncapsulation,
      routing: options.routing,
      style: options.style,
      skipTests: options.skipTests,
      skipPackageJson: false,
      skipInstall: true,
      strict: options.strict,
      minimal: options.minimal,
      name: options.projectName
    };

    let defaultProject = ''

    const rules = [
      (_tree: Tree) => {
        return Tree.empty()
      },
      externalSchematic('@schematics/angular', 'ng-new', {
        ...newOptions
      }),
      (tree: Tree) => {
        // Rename to apply project schematic
        tree.getDir(options.name).visit(file => {
          const newPath = file.substring(options.name.length + 2)
          tree.rename(file, newPath)
        })
      },
      externalSchematic(packageJson.name, 'project', {
        ...projectOptions
      }),
      (tree: Tree) => {
        const name = packageJson.name
        const version = packageJson.version
        // Add Dependency
        addDependency(tree, {
          type: NodeDependencyType.Dev,
          name,
          version
        })
      },
      () => {
        console.log('\n')
        console.log(chalk.cyan('Create first feature group: '))
      },
      (tree: Tree) => {
        const angularJsonBuffer = tree.read('angular.json')
        if (!angularJsonBuffer)
          throw 'Unable to resolve angular.json'
        
        const angularJson = JSON.parse(angularJsonBuffer.toString())
        // Update schematic
        defaultProject = angularJson.defaultProject
        const schematics = angularJson.projects[defaultProject].schematics
        schematics[`${packageJson.name}:project`] = { style: options.style }
        schematics[`${packageJson.name}:component`] = { style: options.style }
        schematics[`${packageJson.name}:feature-group`] = { style: options.style }
        console.log(options, schematics)

        tree.overwrite('angular.json', JSON.stringify(angularJson))
        formatJson(tree, 'angular.json')

        // Create feature
        return chain([
          schematic('feature-group', {
            project: defaultProject,
            name: 'layout',
            feature: 'main-layout',
            routing: false,
            generateFeatureModule: false,
            style: options.style
          }),
          schematic('feature-group', {
            project: defaultProject,
            style: options.style
          }),
        ])
      },
      (tree: Tree) => {
        // Revert name to origin
        tree.visit(file => {
          const newPath = path.posix.join(options.name, file)
          tree.rename(file, newPath)
        })
      }
    ]

    return chain(rules);
  }
}
