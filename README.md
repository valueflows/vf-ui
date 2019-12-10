# ValueFlows UI

VF-UI aims to create a suite of user interface components which can support the rapid iteration and deployment of distributed social and economic coordination apps.

We achieve this by building to the [ValueFlows GraphQL protocol](https://github.com/valueflows/vf-graphql/) - a universal language for resource coordination problems, capable of describing any physical or intangible interaction. This makes VF-UI components both use-case and backend-agnostic, and applicable to a wide variety of scenarios.

<!-- MarkdownTOC -->

- [Development setup](#development-setup)
	- [Project initialisation](#project-initialisation)
	- [Editor setup](#editor-setup)
		- [Sublime Text](#sublime-text)
		- [VSCode](#vscode)
- [Related documentation](#related-documentation)
- [Project structure](#project-structure)
- [License](#license)

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





## Related documentation

These are important API references and resources that developers of this repository will likely need to refer back to often.

- **Component framework:**
	- Official [Svelte documentation](https://svelte.dev/docs)
- **Component styles:**
	- [CSS-preset-env](https://preset-env.cssdb.org/features) feature reference. Note that we only target `stage 2+`.
- **Testing:**
	- We use [Jest](https://jestjs.io/docs/en/) and its [expect API](https://jestjs.io/docs/en/expect.html) for test assertions.
	- [@testing-library/svelte API](https://testing-library.com/docs/svelte-testing-library/api) is used to handle component test rendering. *(It serves the same function that Enzyme does in React projects.)*
	- [storybook-addon-specifications](https://www.npmjs.com/package/storybook-addon-specifications) manages the integration between Jest and Storybook.





## Project structure

- `src/` contains the component source files and Storybook tests:
	- Components are laid out using the [React Fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) pattern.
	- All components include storybook scenario tests and markdown usage notes.




## License

Licensed under an Apache 2.0 license.
