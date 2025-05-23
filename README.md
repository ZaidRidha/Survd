# SURVD

A react native mobile app powered by Expo.

## 1. Setting up the development enviorment

For the sake of keeping the integrity of this repo and having a better dev experience we are going to use the extensions VSCode extensions "Prettier - Code formatter" and "ESLint".

The goal is to achieve a high standard of code quality and readability. This way, different developers will be able to collaborate more efficiently, all following the very same rules.

The code must be properly formatted before pushing it to GitHub. To do this, you should do at least one of the following:

1.  In your file, right click in the body and click on "Format Document".
2.  In your file, use the keyboard shortcut "Shift+Alt+F".
3.  Configure your VSCode to run the formatter every time you save the file (ideal).

If you want this task automated, you can configure your VSCode to do so like this: hit Ctrl + Shift + P > Preferences Open User settings (JSON), and add the following configuration:

```json
{
  ... Other configurations,
  "typescript.format.insertSpaceAfterCommaDelimiter": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.guides.bracketPairs": true,
  "[jsonc]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  }
}
```

## 2. Installing dependencies

Install yarn by running ```npm install --global yarn```.

Install the project dependencies by running ```yarn install``` in the root folder.

Run the project with ```expo start```.

or ```npx expo start```

## 3. Contributing: Pushing your code to GitHub

### Before you begin
1. Pull Changes from main: Before creating a new branch for your feature or bug fix, make sure to pull the latest changes from the main branch to your local repository. This helps ensure your feature branch is up-to-date and minimizes the chances of conflicts.

2. Resolve any conflicts locally: Resolve the conflicts before submiting your changes. make sure you don't break existing code unintentionally.

### Branching Strategy
1. Create a New Branch: For each new feature, functionality, or bug fix, create a new branch from the main branch. Use the following naming convention: feature/the-name-of-the-functionality.

2. Work on Your Changes: Make your changes, write your code, and commit them to your feature branch.

3. Push Changes: Push your feature branch to this repository.

4. Open a Pull Request: Create a Pull Request (PR) from your feature branch into the main branch. Be sure to provide a clear title and description of your changes.

### Why Branching?
Using branches and pull requests helps us maintain a stable main branch and encourages collaboration in a controlled manner. It also allows for proper code review and testing before merging changes into the main codebase.

Submitting Your Changes
When submitting a PR, please ensure the following:

- Your code is thoroughly tested and free from errors.
- You've provided relevant documentation for your changes if needed.
- Your commit messages are clear and concise, following the conventional style if possible.
- Our team will review your PR, provide feedback, and, once approved, merge your changes into the main branch.

## Github Codespaces

1. ```npx expo login```
2. ```npx expo start --tunnel```

## How to Clone This Repository Using GitHub Desktop

Follow these steps to clone this repository to your local machine using **GitHub Desktop**:

### 1. Install GitHub Desktop (if not already installed)
- Download GitHub Desktop from [here](https://desktop.github.com/).
- Install it and log in using your GitHub account.

### 2. Clone the Repository

#### Option 1: Open with GitHub Desktop
- Go to the [repository page]([Insert Your Repo Link Here]).
- Click the **Code** button (the green button near the top).
- In the dropdown, click **Open with GitHub Desktop**.
- If prompted, allow your browser to open GitHub Desktop.
- In GitHub Desktop, choose a local path where you want to clone the repository and click **Clone**.

#### Option 2: Manually Clone via GitHub Desktop
- On the repository page, click the **Code** button and copy the repository URL.
- Open **GitHub Desktop**.
- Click **File** > **Clone Repository**.
- In the **URL** tab, paste the repository URL.
- Choose a local path on your computer to store the repository.
- Click **Clone**.

### 3. You're Done!
The repository is now cloned to your local machine. You can now modify the files, commit changes, and push updates using GitHub Desktop.
