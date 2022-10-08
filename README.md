# GitHub Labels export import
Originally published by [github-labels-export-import](https://github.com/ryota-k0827/github-labels-export-import)

## About
Export the Labels of a repository on GitHub and import them into another repository.

## Description
1. Remove all labels from the import repository
2. Get all labels from the export repository
3. Add labels retrieved from the export repository to the import repository

## Setup
1. Clone this repository or download the zip file.
2. Create a Personal Access Token on GitHub

## Installation
### 1. Check node and yarn version
```
$ node -v
v16.17.1
$ yarn -v
1.22.19
```

### 2. Install the dependencies
```bash
$ yarn install
```
## Running the app
### 1. Start the app
```bash
$ yarn dev
```
### 2. Access to http://localhost:3000/github-labels-export-import-web/

## LICENSE
[MIT](LICENSE)
