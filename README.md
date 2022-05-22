## Technical Interview

## Goal

The main objective of this technical test is to create an application that will have as input data a Github repository and as output a list of extensions of the files in the repository. In addition, it must be indicated how many times each extension appears

One of the important things is that the Github repository is required to have at least three levels of directories.

In practice this has been achieved, but recursively attacking the github endpoint consumed my hourly limit very fast.

I tested mainly with mocked data, then with a [repo with 2 levels](https://github.com/argoproj/argo-site/tree/master) and later [this one](https://github.com/zero-to-mastery/book-tracker) with 4 leves if I am not wrong.

## Extra Goals

As extra points I have put a dropdown of the branches of the repository also the extensions can be sorted alphabetically or the other way around and finally an Input that it will filter them by name.

Some tests have been added and I would have continued refactoring ad infinitum but I think it was a good exercise for now and I really had fun doing it.

Thank you very much for the opportunity.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode, if it give you any errors related with the imports it could be the node version.
