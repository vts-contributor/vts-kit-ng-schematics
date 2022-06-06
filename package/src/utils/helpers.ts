import { Tree } from '@angular-devkit/schematics'
import { createDefaultPath, getWorkspace } from '@schematics/angular/utility/workspace'
import * as nodePath from 'path'
import { normalize, strings } from '@angular-devkit/core'
import CONSTANTS from '../declare'
import { addPackageJsonDependency, NodeDependency } from 'schematics-utilities'

export function getLibDir(path: string) {
  return nodePath.posix.join(strings.dasherize(CONSTANTS.LIB_DIR), path)
}

export function getSharedDir(path: string) {
  return nodePath.posix.join(strings.dasherize(CONSTANTS.LIB_DIR), strings.dasherize(CONSTANTS.SHARED_DIR), path)
}

export function removeLastSlash(str: string) {
  return str.slice(0, -1)
}

export async function getScamModulePath(tree: Tree, options: any) {
  // const defaultPath = await createDefaultPath(tree, options.project as string)
  const workspace = await getWorkspace(tree)
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new Error(`Project "${options.project}" does not exist.`);
  }
  const defaultPath = project.sourceRoot ? `/${project.sourceRoot}/` : `/${project.root}/src/`

  const modulePath = removeLastSlash(nodePath.posix.join(
    defaultPath,
    `${options.shared ? getSharedDir(options.path) : getLibDir(options.path)}/`
  ))
  return modulePath
}

export function isInsideSharedDir(path: string) {
  const normalize = nodePath.posix.normalize(path)
  return normalize.startsWith(`/${CONSTANTS.SHARED_DIR}/`) || normalize.startsWith(`${CONSTANTS.SHARED_DIR}/`)
}

export function findModule(tree: Tree, modulePath: string, moduleName: string, moduleExt = CONSTANTS.MODULE_EXT): [boolean, string] {
  const fileName = `${moduleName}${moduleExt}`
  const fullPath = normalize(nodePath.posix.join(modulePath, moduleName, fileName))
  const exist = tree.exists(fullPath)
  return [exist, fullPath]
}

export function formatJson(tree: Tree, path: string) {
  const text = tree.read(path)
  if (!text)
    return

  
  const formatted = JSON.stringify(JSON.parse(text.toString()), null, "\t")
  tree.overwrite(path, formatted)
}

export function addDependency(tree: Tree, dep: NodeDependency) {
  // Add Dependency
  addPackageJsonDependency(tree, dep)
  formatJson(tree, '/package.json')
}