# To-Do Application
This is a To-Do and Buckets application.


## Table of Contents
* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)


## About The Project
A simple Full-Stack To-Do application. 


### Built With
* [Flask](https://flask.palletsprojects.com/en/1.1.x/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)


## Getting Started
To get a local copy up and running follow these simple steps.


### Prerequisites
You need the following prerequisite dependencies to run the project.
* node
* yarn
* python3
* pipenv


### Installation 
* Clone the repo
```shell script
git clone https://github.com/skb1129/todo-app.git
```
* Install server dependencies
```shell script
pipenv install
```
* Install client dependencies
```shell script
cd client && yarn install
```


### Development
* Start the Flask server
```shell script
pipenv run start
```
The server would run at http://localhost:5000/.
* Start the Webpack server
```shell script
cd client && yarn start
```
The client would run at http://localhost:3000/.
You can access the application at the client URL.


### Testing
Execute the following command to run the unit tests of this application:
```shell script
export DATABASE_URL=<TEST_DATABASE_URL>
python3 -m test.test_flaskr
``` 


### Production
* Create a client build
```shell script
cd client && yarn build
```
* Start the production `gunicorn` server
```shell script
export DATABASE_URL=<DATABASE_URL>
gunicorn wsgi:app
```
The application would run at http://localhost:8000/.


## Usage
Use the "Use this template" button on the [repository page](https://github.com/skb1129/flask-react-boilerplate) to create a new repository with this repository as a base.


## Contributing
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License
Distributed under the MIT License. See `LICENSE` for more information.


## Authors
* Surya Kant Bansal - Initial work - [skb1129](https://github.com/skb1129)
