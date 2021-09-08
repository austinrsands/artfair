# Company Corportation LLC Project
## Note
At a high level, this project is made up of three packages: `client`, `server`, and `common`. The `client` package contains the frontend code, the `server` package contains the backend code, and the `common` package contains code that is shared between `client` and `server`.
## Prerequisites

- Make sure you have [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/), and [git](https://git-scm.com/) installed on your machine.
- We also recommend using [Visual Studio Code](https://code.visualstudio.com/) with the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension.

## Running the Project

1. Install the dependencies and devDependencies:
    ```sh
    yarn
    ```
2. Serve the app locally:
    ```sh
    yarn full-start
    ```
3. View the site at <http://localhost:3000>

## Development
1. Assign yourself a task on [ClickUp](https://app.clickup.com/).
2. Get the latest changes from the `dev` branch:
    ```sh
    git checkout dev
    git fetch && git pull
    ```
3. Create a local feature branch off of `dev` to work on your task:
    ```sh
    git checkout -b feature/<new-branch-name>
    ```
    where `<new-branch-name>` is a short name for your task in lower kebab-case.
    Ex: My task is to add canvas drawing functionality so my branch is called `feature/canvas-drawing`
4. Push your local feature branch to the remote repository:
    ```sh
    git push -u origin feature/<new-branch-name>
    ```
5. Create/Edit/Delete files as necessary to complete your task.
6. Stage your new, modified, or deleted files:
    ```sh
    git add -A
    ```
7. Commit your staged changes:
    ```sh
    git commit -m <message>
    ```
    where `<message>` is a short imperative statement describing your changes. The message should start with a capital letter and end without a period. There is no need for a longer description here as that information can be added to the task on ClickUp.
    Ex: I wrote code to enable the user to draw on the canvas so my commit message would be `"Enable user to draw on canvas"`
8. Push your commit(s) to your remote branch:
    ```sh
    git push
    ```
9. Once you have completed your task and pushed all commits to your remote brach, create a **Pull Request** on GitHub to merge your feature branch into the `dev` branch.
10. Add at least one programmer as a reviewer for your pull request. If any changes are requested by the reviewer(s), just commit those changes and the pull request will automatically include those changes.
11. Once your pull request is approved by the reviewer(s), you may merge the pull request into `dev`.