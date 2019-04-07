## What it does

GitGantt helps you visualize your team's milestones and issues on a gantt chart.

## Thats it?

Yup, that's pretty much by now. However, we plan to bring much more features in! Every feature we plan to add [here](https://github.com/Eguzkiman/git-gantt/issues)

## How to use it

The hosted version is now available at [https://git-gantt.herokuapp.com](https://git-gantt.herokuapp.com)

## Running it locally

You can run GitGantt locally by cloning the repo:

`git clone https://github.com/Eguzkiman/git-gantt`

installing dependencies:

`yarn`

and running the project with your GitHub's account personal token as an evironment variable:


`REACT_APP_GITHUB_TOKEN=<your-personal-access-token-here> yarn start`

Alternatively, you can run it with GitGantt's client id, if you have access to it:

`REACT_APP_CLIENT_ID=<gitgantt-client-id-here> yarn start`


You can build & deploy GitGantt as any [Create React App](https://github.com/facebook/create-react-app) application.

## The git-gantt sever

A (git-gantt-api)[https://github.com/Eguzkiman/git-gantt-api] server is running at https://git-gantt-api.herokuapp.com.

Your cloned git-gantt client will connect to it by default.

## Contributing

All PRs are welcome! You can find a list of issues to tackle here: [URL].

We want GitGantt to be a collective effort to make GitHub's data visualization better, so feel free to add any feature requests you like!