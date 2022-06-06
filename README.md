## VTS Kit Angular Schematics

This library provides a collection of [schematics](https://angular.io/guide/schematics) to implement SCAM (Single Component Angular Module) pattern.

Check out [references](#references) for more details about SCAM pattern.

## Testing

This library was last tested with Angular 13.

## Important note

We don't recommend using this library in currently developing project, it may cause problems with project structure. Instead, this library is intended to create a compatible workspace and is ready to integrate with our schematics.

## Structure

```
.
└── <workspace_name>/
    ├── projects/
    │   └── <project_name_1>/
    │       ├── src/
    │       │   ├── app/                      // Entry module, provide lazy load to feature group module
    │       │   ├── libs/                     // Shared modules and feature group modules
    │       │   │   ├── layout/               // Feature group, layout
    │       │   │   │   ├── ui/               // Shared, stateless UI components, SCAM for components
    │       │   │   │   │   ├── <topbar_scam>
    │       │   │   │   │   └── <sider_scam>
    │       │   │   │   ├── feature/          // Layout components, SCAM for components
    │       │   │   │   │   ├── <dasboard_layout_scam>
    │       │   │   │   │   └── <home_layout_scam>
    │       │   │   │   ├── data-access/      // State management, store
    │       │   │   │   └── layout.module.ts  // Export declared layouts
    │       │   │   ├── <feature_group_1>/    // Feature group
    │       │   │   │   ├── ui/               // Shared, stateless UI components, SCAM for components
    │       │   │   │   ├── feature/          // Layout components, SCAM for components
    │       │   │   │   ├── data-access/      // State management, store
    │       │   │   │   └── feature.module.ts // Provide lazy load to feature modules
    │       │   │   └── shared/               // All shared modules, SCAM for components
    │       │   │       ├── directives/
    │       │   │       ├── pipes/
    │       │   │       ├── guards/
    │       │   │       ├── interceptors/
    │       │   │       ├── mixins/
    │       │   │       ├── services/
    │       │   │       ├── ui/
    │       │   │       ├── utils/
    │       │   │       └── validators/
    │       │   ├── environments/             // Angular starter files
    │       │   ├── styles/                   // Angular starter files
    │       │   ├── assets/                   // Angular starter files
    │       │   ├── favicon.ico               // Angular starter files
    │       │   ├── index.html                // Angular starter files
    │       │   ├── main.ts                   // Angular starter files
    │       │   ├── polyfills.ts              // Angular starter files
    │       │   ├── styles.scss               // Angular starter files
    │       │   └── test.ts                   // Angular starter files
    │       ├── karma.conf.js                 // Angular starter files
    │       ├── tsconfig.app.json             // Angular starter files
    │       └── tsconfig.spec.json            // Angular starter files
    ├── package.json
    ├── angular.json
    ├── tsconfig.json
    └── README.md
```

## Installation

- Make sure Angular CLI is installed.

```
# Check Angular CLI version
ng version

# If Angular CLI has not been installed.
# Install Angular CLI using npm
npm install -g @angular/cli
```

- Install VTS Kit Angular Schematics

```
npm install -g @vts-kit/ng-schematics
```

## Usage

### Schematics

| No | Name                                      | Description                                                                                                                                                                        |
|----|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | [ng-new](#schematic-ng-new)               | Creates a new project by combining the workspace and application schematics.                                                                                                       |
| 2  | [project](#schematic-project)             | Generates a new basic application definition in the \"projects\" subfolder of the workspace.                                                                                       |
| 3  | [feature-group](#schematic-feature-group) | Creates a new feature group in the given or default project.                                                                                                                       |
| 4  | [module](#schematic-module)               | Creates a new, generic NgModule definition in the given or default project.                                                                                                        |
| 5  | [component](#schematic-component)         | Creates a new, generic component definition in the given or default project.                                                                                                       |
| 6  | [feature](#schematic-feature    )         | Creates a new, generic feature definition in the given or default project (feature schematic is the same as the component but has an additional import of RouterModule for child lazy load). |
| 7  | [directive](#schematic-directive)         | Creates a new, generic directive definition in the given or default project.                                                                                                       |
| 8  | [pipe](#schematic-pipe)                   | Creates a new, generic pipe definition in the given or default project.                                                                                                            |
| 9  | [service](#schematic-service)             | Creates a new, generic service definition in the given or default project.                                                                                                         |
| 10 | [class](#schematic-class)                 | Creates a new, generic class definition in the given or default project.                                                                                                           |
| 11 | [interface](#schematic-interface)         | Creates a new, generic interface definition in the given or default project.                                                                                                       |
| 12 | [enum](#schematic-enum)                   | Creates a new, generic enum definition in the given or default project.                                                                                                            |
| 13 | [validator](#schematic-validator)         | Creates a new sync or async validator in the given or default project.                                                                                                             |
| 14 | [guard](#schematic-guard)                 | Creates a new, generic route guard definition in the given or default project.                                                                                                     |
| 15 | [interceptor](#schematic-interceptor)     | Creates a new, generic route interceptor definition in the given or default project.                                                                                               |
| 16 | [resolver](#schematic-resolver)           | Creates a new, generic resolver definition in the given or default project.                                                                                                        |

## Quick guide

- `ng-new` is schematic to generate a workspace and is used with `ng new` command.

```
ng new -c @vts-kit/ng-schematics

# List options
ng new -c @vts-kit/ng-schematics --help
```

- Except for `ng-new`, other schematics can be used by using `ng g` command.
- Note: `ng g` must be ran inside workspace root (same base path as angular.json).

```
ng g @vts-kit/ng-schematics:<name in table> [--options=value]

# List options
ng g @vts-kit/ng-schematics:<name in table> --help
```

- Using `ng g` with an empty parameter will trigger a prompt to ask for required inputs.

```
ng g @vts-kit/ng-schematics:<name in table>
```

## Schematic: ng-new

Creates a new project by combining the workspace and application schematics.

#### Command

```
ng new -c @vts-kit/ng-schematics
```

#### Options

| No  | Name              | Description                                                                                                                                                                                                                   | Type                                | Require | Default |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- | ------- |
| 1   | name              | The name of the new workspace.                                                                                                                                                                                                | string                              | ✔       |         |
| 2   | directory         | The directory name to create the workspace in.                                                                                                                                                                                | string                              |         |         |
| 3   | skipInstall       | Do not install dependency packages.                                                                                                                                                                                           | boolean                             |         | false   |
| 4   | skipGit           | Do not initialize a git repository.                                                                                                                                                                                           | boolean                             |         |         |
| 5   | commit            | Initial git repository commit information.                                                                                                                                                                                    | boolean or { name, email, message } |         | true    |
| 6   | newProjectRoot    | The path where new projects will be created, relative to the new workspace root.                                                                                                                                              | boolean                             |         |         |
| 7   | inlineStyle       | Include styles inline in the component TS file. By default, an external styles file is created and referenced in the component TypeScript file.                                                                               | boolean                             |         |         |
| 8   | inlineTemplate    | Include template inline in the component TS file. By default, an external template file is created and referenced in the component TypeScript file.                                                                           | boolean                             |         |         |
| 9   | viewEncapsulation | The view encapsulation strategy to use in the initial project.                                                                                                                                                                | ["Emulated", "None", "ShadowDom"]   |         |         |
| 10  | routing           | Generate a routing module for the initial project.                                                                                                                                                                            | boolean                             |         |         |
| 11  | prefix            | The prefix to apply to generated selectors for the initial project.                                                                                                                                                           | string                              |         | app     |
| 12  | style             | The file extension or preprocessor to use for style files.                                                                                                                                                                    | ["css", "scss", "sass", "less"]     | ✔        |   'css'      |
| 13  | skipTests         | Do not generate \"spec.ts\" test files.                                                                                                                                                                                       | boolean                             |         | false   |
| 14  | minimal           | Create a workspace without any testing frameworks.                                                                                                                                                                            | boolean                             |         |         |
| 15  | strict            | Creates a workspace with stricter type checking and stricter bundle budgets settings. This setting helps improve maintainability and catch bugs ahead of time. For more information, see https://angular.io/guide/strict-mode | boolean                             |         |         |
| 16  | packageManager    | The package manager used to install dependencies.                                                                                                                                                                             | ["npm", "yarn", "pnpm", "cnpm"]     |         |         |

## Schematic: project

Generates a new basic application definition in the "projects" subfolder of the workspace.

#### Command

```
ng g @vts-kit/ng-schematics:project
```

#### Options

| No  | Name              | Description                                                                                                                                                                                                                   | Type                              | Require | Default                |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- | ---------------------- |
| 1   | name              | The name of the new project.                                                                                                                                                                                                  | string                            | ✔       |                        |
| 2   | inlineStyle       | Include styles inline in the component TS file. By default, an external styles file is created and referenced in the component TypeScript file.                                                                               | boolean                           |         |                        |
| 3   | inlineTemplate    | Include template inline in the component TS file. By default, an external template file is created and referenced in the component TypeScript file.                                                                           | boolean                           |         |                        |
| 4   | viewEncapsulation | The view encapsulation strategy to use in the initial project.                                                                                                                                                                | ["Emulated", "None", "ShadowDom"] |         |                        |
| 5   | routing           | Generate a routing module for the initial project.                                                                                                                                                                            | boolean                           |         |                        |
| 6   | prefix            | The prefix to apply to generated selectors for the initial project.                                                                                                                                                           | string                            |         | app                    |
| 7   | style             | The file extension or preprocessor to use for style files.                                                                                                                                                                    | ["css", "scss", "sass", "less"]   |         | Same as initial choice |
| 8   | skipTests         | Do not generate \"spec.ts\" test files.                                                                                                                                                                                       | boolean                           |         | false                  |
| 9   | skipPackageJson   | Do not add dependencies to the \"package.json\" file.                                                                                                                                                                         | boolean                           |         |                        |
| 10  | minimal           | Create a workspace without any testing frameworks.                                                                                                                                                                            | boolean                           |         |                        |
| 11  | skipInstall       | Do not install dependency packages.                                                                                                                                                                                           | boolean                           |         | false                  |
| 12  | strict            | Creates a workspace with stricter type checking and stricter bundle budgets settings. This setting helps improve maintainability and catch bugs ahead of time. For more information, see https://angular.io/guide/strict-mode | boolean                           |         |                        |

## Schematic: feature-group

Creates a new feature group in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:feature-group [--options=value]
```

#### Options

| No  | Name              | Description                                                                                                                                         | Type                              | Require | Default                |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- | ---------------------- |
| 1   | project           | The name of the project.                                                                                                                            | string                            |         |                        |
| 2   | name              | The name of the new feature group.                                                                                                                  | string                            | ✔       |                        |
| 3   | feature           | The name of first-created feature to be lazy-loaded.                                                                                                | string                            | ✔       |                        |
| 4   | displayBlock      | Specifies if the style will contain `:host { display: block; }`.                                                                                    | boolean                           |         |                        |
| 5   | inlineStyle       | Include styles inline in the component TS file. By default, an external styles file is created and referenced in the component TypeScript file.     | boolean                           |         |                        |
| 6   | inlineTemplate    | Include template inline in the component TS file. By default, an external template file is created and referenced in the component TypeScript file. | boolean                           |         |                        |
| 7   | viewEncapsulation | The view encapsulation strategy to use in the initial project.                                                                                      | ["Emulated", "None", "ShadowDom"] |         |                        |
| 8   | changeDetection   | The change detection strategy to use in the new component.                                                                                          | ["Default", "OnPush"]             |         | Default                |
| 9   | prefix            | The prefix to apply to generated selectors for the initial project.                                                                                 | string                            |         | app                    |
| 10  | style             | The file extension or preprocessor to use for style files.                                                                                          | ["css", "scss", "sass", "less"]   |         | Same as initial choice |
| 11  | skipTests         | Do not generate \"spec.ts\" test files.                                                                                                             | boolean                           |         | false                  |
| 12  | selector          | The HTML selector to use for this component.                                                                                                        | string                            |         |                        |
| 13  | skipSelector      | Specifies if the component should have a selector or not.                                                                                           | boolean                           |         | false                  |
| 14  | routing           | Generate routing for feature.                                                                                                                       | boolean                           |         | true                   |

## Schematic: module

Creates a new, generic NgModule definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:module [--options=value]
```

#### Options

| No  | Name            | Description                                                                                                                                                                                                         | Type              | Require | Default |
| --- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- | ------- |
| 1   | project         | The name of the project.                                                                                                                                                                                            | string            |         |         |
| 2   | shared          | Specifies whether to create NgModule in shared directory (libs/shared).                                                                                                                                             | boolean           |         | false   |
| 3   | path            | The path at which to create the NgModule, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder).                                                                              | boolean           | ✔       |
| 4   | name            | The name of the NgModule.                                                                                                                                                                                           | string            | ✔       |
| 5   | exportClassName | Custom name of the NgModule.                                                                                                                                                                                        | string            |         |
| 6   | routing         | Create a routing module.                                                                                                                                                                                            | boolean           |         | false   |
| 7   | routingScope    | The scope for the new routing module.                                                                                                                                                                               | ["Child", "Root"] |         | Child   |
| 8   | route           | The route path for a lazy-loaded module. When supplied, creates a component in the new module, and adds the route to that component in the `Routes` array declared in the module provided in the `--module` option. | string            |         |
| 9   | commonModule    | The new NgModule imports \"CommonModule\".                                                                                                                                                                          | boolean           |         | true    |
| 10  | module          | The declaring NgModule which import new created module.                                                                                                                                                             | string            |         |

## Schematic: component

Creates a new, generic component definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:component [--options=value]
```

#### Options

| No  | Name              | Description                                                                                                                                                                     | Type                              | Require | Default                |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- | ---------------------- |
| 1   | project           | The name of the project.                                                                                                                                                        | string                            |         |                        |
| 2   | shared            | Specifies whether to create component in shared directory (libs/shared).                                                                                                        | boolean                           |         | false                  |
| 3   | path              | The path at which to create the component, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder).                                         | boolean                           | ✔       |                        |
| 4   | name              | The name of the NgModule.                                                                                                                                                       | string                            | ✔       |                        |
| 5   | displayBlock      | Specifies if the style will contain `:host { display: block; }`.                                                                                                                | boolean                           |         | false                  |
| 6   | inlineStyle       | Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file. | boolean                           |         | false                  |
| 7   | inlineTemplate    | Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.                                     | boolean                           |         | false                  |
| 8   | viewEncapsulation | The view encapsulation strategy to use in the new component.                                                                                                                    | ["Emulated", "None", "ShadowDom"] |         |                        |
| 9   | changeDetection   | The change detection strategy to use in the new component.                                                                                                                      | ["Default", "OnPush"]             |         | Default                |
| 10  | prefix            | The prefix to apply to generated selectors for the initial project.                                                                                                             | string                            |         | app                    |
| 11  | style             | The file extension or preprocessor to use for style files.                                                                                                                      | ["css", "scss", "sass", "less"]   |         | Same as initial choice |
| 12  | skipTests         | Do not generate \"spec.ts\" test files.                                                                                                                                         | boolean                           |         | false                  |
| 13  | selector          | The HTML selector to use for this component.                                                                                                                                    | string                            |         |                        |
| 14  | skipSelector      | Specifies if the component should have a selector or not.                                                                                                                       | boolean                           |         | false                  |

## Schematic: feature

Creates a new, generic feature definition in the given or default project (feature schematic is the same as the component but has an additional import of RouterModule for child lazy load).

#### Command

```
ng g @vts-kit/ng-schematics:feature [--options=value]
```

#### Options

| No  | Name              | Description                                                                                                                                                                     | Type                              | Require | Default                |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- | ---------------------- |
| 1   | project           | The name of the project.                                                                                                                                                        | string                            |         |                        |
| 2   | shared            | Specifies whether to create component in shared directory (libs/shared).                                                                                                        | boolean                           |         | false                  |
| 3   | path              | The path at which to create the component, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder).                                         | boolean                           | ✔       |                        |
| 4   | name              | The name of the NgModule.                                                                                                                                                       | string                            | ✔       |                        |
| 5   | displayBlock      | Specifies if the style will contain `:host { display: block; }`.                                                                                                                | boolean                           |         | false                  |
| 6   | inlineStyle       | Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file. | boolean                           |         | false                  |
| 7   | inlineTemplate    | Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.                                     | boolean                           |         | false                  |
| 8   | viewEncapsulation | The view encapsulation strategy to use in the new component.                                                                                                                    | ["Emulated", "None", "ShadowDom"] |         |                        |
| 9   | changeDetection   | The change detection strategy to use in the new component.                                                                                                                      | ["Default", "OnPush"]             |         | Default                |
| 10  | prefix            | The prefix to apply to generated selectors for the initial project.                                                                                                             | string                            |         | app                    |
| 11  | style             | The file extension or preprocessor to use for style files.                                                                                                                      | ["css", "scss", "sass", "less"]   |         | Same as initial choice |
| 12  | skipTests         | Do not generate \"spec.ts\" test files.                                                                                                                                         | boolean                           |         | false                  |
| 13  | selector          | The HTML selector to use for this component.                                                                                                                                    | string                            |         |                        |
| 14  | skipSelector      | Specifies if the component should have a selector or not.                                                                                                                       | boolean                           |         | false                  |

## Schematic: directive

Creates a new, generic directive definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:directive [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                             | Type    | Require | Default |       |
| --- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- | ----- |
| 1   | project   | The name of the project.                                                                                                                | string  |         |         |       |
| 2   | shared    | Specifies whether to create directive in shared directory (libs/shared).                                                                | boolean |         | false   |       |
| 3   | path      | The path at which to create the directive, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |       |
| 4   | name      | The name of the directive.                                                                                                              | string  | ✔       |         |       |
| 5   | prefix    | The prefix to apply to generated selectors for the initial project.                                                                     | string  |         | app     |       |
| 6   | skipTests | Do not generate \"spec.ts\" test files.                                                                                                 | boolean |         | false   |       |
| 7   | selector  | The HTML selector to use for this component.                                                                                            | string  |         |         | false |

## Schematic: pipe

Creates a new, generic pipe definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:pipe [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                        | Type    | Require | Default |
| --- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project   | The name of the project.                                                                                                           | string  |         |         |
| 2   | shared    | Specifies whether to create pipe in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path      | The path at which to create the pipe, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name      | The name of the pipe.                                                                                                              | string  | ✔       |         |
| 5   | prefix    | The prefix to apply to generated selectors for the initial project.                                                                | string  |         | app     |
| 6   | skipTests | Do not generate \"spec.ts\" test files.                                                                                            | boolean |         | false   |

## Schematic: service

Creates a new, generic service definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:service [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                           | Type    | Require | Default |
| --- | --------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project   | The name of the project.                                                                                                              | string  |         |         |
| 2   | shared    | Specifies whether to create service in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path      | The path at which to create the service, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name      | The name of the service.                                                                                                              | string  | ✔       |         |
| 5   | skipTests | Do not generate \"spec.ts\" test files.                                                                                               | boolean |         | false   |

## Schematic: class

Creates a new, generic class definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:class [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                         | Type    | Require | Default |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project   | The name of the project.                                                                                                            | string  |         |         |
| 2   | shared    | Specifies whether to create class in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path      | The path at which to create the class, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name      | The name of the class.                                                                                                              | string  | ✔       |         |
| 5   | skipTests | Do not generate \"spec.ts\" test files.                                                                                             | boolean |         | false   |
| 6   | type      | Adds a developer-defined type to the filename, in the format \"name.type.ts\".                                                      | string  |         |         |

## Schematic: interface

Creates a new, generic interface definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:interface [--options=value]
```

#### Options

| No  | Name    | Description                                                                                                                             | Type    | Require | Default |
| --- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project | The name of the project.                                                                                                                | string  |         |         |
| 2   | shared  | Specifies whether to create interface in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path    | The path at which to create the interface, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name    | The name of the interface.                                                                                                              | string  | ✔       |         |
| 5   | prefix  | A prefix to apply to generated selectors.                                                                                               | string  |         |         |
| 6   | type    | Adds a developer-defined type to the filename, in the format \"name.type.ts\".                                                          | string  |         |         |

## Schematic: enum

Creates a new, generic enum definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:enum [--options=value]
```

#### Options

| No  | Name    | Description                                                                                                                        | Type    | Require | Default |
| --- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project | The name of the project.                                                                                                           | string  |         |         |
| 2   | shared  | Specifies whether to create enum in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path    | The path at which to create the enum, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name    | The name of the enum.                                                                                                              | string  | ✔       |         |
| 5   | type    | Adds a developer-defined type to the filename, in the format \"name.type.ts\".                                                     | string  |         |         |

## Schematic: validator

Creates a new sync or async validator in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:validator [--options=value]
```

#### Options

| No  | Name    | Description                                                                                                                             | Type                     | Require | Default |
| --- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------- | ------- |
| 1   | project | The name of the project.                                                                                                                | string                   |         |         |
| 2   | shared  | Specifies whether to create validator in shared directory (libs/shared).                                                                | boolean                  |         | false   |
| 3   | path    | The path at which to create the validator, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean                  | ✔       |         |
| 4   | name    | The name of the validator.                                                                                                              | string                   | ✔       |         |
| 5   | type    | Specifies type of validator.                                                                                                            | ["sync", "async"]        | ✔       |         |
| 6   | form    | Specifies type of Angular form in which validator be used (Reactive form / Template-driven form).                                       | ["reactive", "template"] | ✔       |         |

## Schematic: guard

Creates a new, generic route guard definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:guard [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                         | Type                                                                            | Require | Default         |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- | --------------- |
| 1   | project   | The name of the project.                                                                                                            | string                                                                          |         |                 |
| 2   | shared    | Specifies whether to create guard in shared directory (libs/shared).                                                                | boolean                                                                         |         | false           |
| 3   | path      | The path at which to create the guard, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean                                                                         | ✔       |                 |
| 4   | name      | The name of the guard.                                                                                                              | string                                                                          | ✔       |                 |
| 5   | skipTests | Do not generate \"spec.ts\" test files.                                                                                             | boolean                                                                         |         | false           |
| 6   | skipTests | Specifies which route guards to implement.                                                                                          | Multiple choice ["CanActivate", "CanActivateChild", "CanDeactivate", "CanLoad"] |         | ["CanActivate"] |

## Schematic: interceptor

Creates a new, generic route interceptor definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:interceptor [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                               | Type    | Require | Default |
| --- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project   | The name of the project.                                                                                                                  | string  |         |         |
| 2   | shared    | Specifies whether to create interceptor in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path      | The path at which to create the interceptor, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name      | The name of the interceptor.                                                                                                              | string  | ✔       |         |
| 5   | skipTests | Do not generate \"spec.ts\" test files.                                                                                                   | boolean |         | false   |

## Schematic: resolver

Creates a new, generic resolver definition in the given or default project.

#### Command

```
ng g @vts-kit/ng-schematics:resolver [--options=value]
```

#### Options

| No  | Name      | Description                                                                                                                            | Type    | Require | Default |
| --- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- | ------- |
| 1   | project   | The name of the project.                                                                                                               | string  |         |         |
| 2   | shared    | Specifies whether to create resolver in shared directory (libs/shared).                                                                | boolean |         | false   |
| 3   | path      | The path at which to create the resolver, relative to 'libs' folder (if --shared is setted, path will be relative to 'shared' folder). | boolean | ✔       |         |
| 4   | name      | The name of the resolver.                                                                                                              | string  | ✔       |         |
| 5   | skipTests | Do not generate \"spec.ts\" test files.                                                                                                | boolean |         | false   |

## References

* https://dev.to/this-is-angular/emulating-tree-shakable-components-using-single-component-angular-modules-13do
* https://dev.to/this-is-angular/angular-revisited-tree-shakable-components-and-optional-ngmodules-36d2


## Contribute Guidelines

If you have any ideas, just open an issue and tell us what you think.

If you'd like to contribute, please refer [Contributors Guide](CONTRIBUTING.md)

## License

This code is under the [MIT License](https://opensource.org/licenses/MIT).

See the [LICENSE](LICENSE) file for required notices and attributions.
