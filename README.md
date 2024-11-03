npm install
to start the app - npm start
to run the tests - npm test

create a postgres database with the name noteapp
update on the env file your database user and database password
run createtables.js
run server

How might you make this app more secure?
the app could be more secure if we add authentication and authorization, regularly update dependencies and libraries,
we should encrrypt our data that goes on the backend, we should avoid storing sensitive data in insecure client side storage

How would you make this solution scale to millions of records?
Proper database design, and about frontend we could apply lazy load or pagination. we also could use caching strategies in front end and backend