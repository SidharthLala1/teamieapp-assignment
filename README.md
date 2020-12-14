# web-automation

# Cypress.io end-to-end tests

# Install Node.js

As we know that Node.js is a JavaScript runtime environment and Cypress being a Node-based application, the first step in the journey of Cypress will be to install and set up Node.js.

# package.json

The project has a file which has all its dependencies. So, npm install should install the dependencies which are required for this project.

# Cypress Installation

Install Cypress via npm
$ cd /your/project/path
$ npm install cypress --save-dev

[Cypress.io](https://www.cypress.io) is an open source, MIT licensed end-to-end test runner

## Folder structure

These folders hold end-to-end tests and supporting files for the Cypress Test Runner.

- [fixtures](fixtures) holds optional JSON data for mocking, [read more](https://on.cypress.io/fixture)
- [integration](integration) holds the actual test files, [read more](https://on.cypress.io/writing-and-organizing-tests)
- [plugins](plugins) allow us to customize how tests are loaded, [read more](https://on.cypress.io/plugins)
- [support](support) file runs before all tests and is a great place to write or load additional custom commands, [read more](https://on.cypress.io/writing-and-organizing-tests#Support-file)

## `cypress.json` file

We can configure project options in the [../cypress.json](../cypress.json) file, see [Cypress configuration doc](https://on.cypress.io/configuration).

## How to run a Cypress test Browser Mode and HeadLess Mode.

# Browser Mode:

npm run cy:open

# Headless Mode:

npm run cy:run

# Run TestSuite on Sanbox

npm run cy:run:sandbox

## Server setup and installing Cypress dependencies

- sudo apt update
- sudo apt install nodejs
- sudo apt install npm

## Check Node and npm version

- nodejs -v
- npm -v

# Using npm to install Cypress, we support: Node.js 10 or 12 and above

## Required dependencies to be installed on system for Cypress to work

- apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
- Create a directory where we need to checkout the code mkdir.
- Git checkout the branch name.
- cd /your/project/path

# Npm install will look at package.json file and will install all the required dependencies.

- npm install

## Steps to install chrome browser dependency on linux ubuntu.

- export CHROME_BIN=/usr/bin/google-chrome
- export DISPLAY=:99.0
- sh -e /etc/init.d/xvfb start
- sudo apt-get update
- sudo apt-get install -y libappindicator1 fonts-liberation libasound2 libgconf-2-4 libnspr4 libxss1 libnss3 xdg-utils
- wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
- sudo dpkg -i google-chrome\*.deb

# Uninstall previous chrome from the system

sudo apt-get purge chromium-browser

## Removing Node.js and npm

# To remove Node.js and npm, type the following:

- sudo apt remove nodejs npm

This command will remove the package and retain the configuration files. These may be of use to you if you intend to install the package again at a later point. If you don’t want to save the configuration files for later use, then run the following:

- sudo apt purge nodejs

This will uninstall the package and remove the configuration files associated with it.

As a final step, you can remove any unused packages that were automatically installed with the removed package:

- sudo apt autoremove
