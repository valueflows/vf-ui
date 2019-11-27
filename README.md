# ValueFlows UI

VF-UI aims to create a suite of user interface components which can support the rapid iteration and deployment of distributed social and economic coordination apps.

We achieve this by building to the [ValueFlows GraphQL protocol](https://github.com/valueflows/vf-graphql/) - a universal language for resource coordination problems, capable of describing any physical or intangible interaction. This makes VF-UI components both use-case and backend-agnostic, and applicable to a wide variety of scenarios.

<!-- MarkdownTOC -->

- [Development setup](#development-setup)
	- [Project initialisation](#project-initialisation)
	- [Editor setup](#editor-setup)
		- [Sublime Text](#sublime-text)
		- [VSCode](#vscode)

<!-- /MarkdownTOC -->


## Development setup

### Project initialisation

- Install Nix:  
  ```
  curl https://nixos.org/nix/install | sh
  ```
- Clone the repository
- Run `nix-shell` from this directory to ensure the correct tooling is available
- Run `yarn` or `npm i` to install all dependencies

Now you can use `npm run storybook` to load up the live development view.

### Editor setup

This project is configured with [eslint](https://eslint.org/) for linting the [Svelte]() views. Editor setup requires a few extra steps:

#### Sublime Text

1. Install the `Svelte` package from Package Control
2. Ensure the `SublimeLinter` and `SublimeLinter-contrib-eslint` packages are also installed
3. Set the following configuration for the `eslint` linter under **Preferences: SublimeLinter Settings**:

```json
{
  "@disable": false,
  "selector": "source.js,text.html.svelte",
  "args":
  [
  ],
  "excludes":
  [
    "*/node_modules/**"
  ]
}
```

The key element is `selector`, which must have the svelte source type added to it in order to trigger linting.

#### VSCode

TBC
