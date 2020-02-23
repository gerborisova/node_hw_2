# node_hw_2

Set Up PostgreSQL: 
1. Install Postgres via this link : 
https://www.postgresql.org/

2.Install following the steps. 
-You will have to choose your password and username.It's important to remember then because you will use them for following connections.

If you have set up your postgres you can proceed with creating the database. 

Creating database. 
-You can create database using the cmd and the export.sql file in the repo.

1. In the cmd type : 
createdb -U postgres #NAME_OF_DB 
example : createdb -U postgres myDB
-After the command you will have to insert your postgres password 
-If you wrote the right password you db have to be already created

2.In the cmd type : 
(Make sure you are in the root of the project)
psql -U postgres #NAME_OF_DB  < #NAME_OF_DB_EXPORT
example : psql -U postgres myDB < export.pgsql

After this you have to be able to acceess the created db with the required tables.

Access the DB via node. 

1. In the project fowder go to "data-access/database.js".

2.In the following line make the required changes :
  export default new Sequelize('#NAME_OF_DB', '#POSGRES_USERNAME', '#POSTGRES_PASSWORD';
  
  example : export default new Sequelize('myDB', 'postgres', 'postgres';
-After this you should be able to connect with the db after ypu start the project . 

Starting the project. 
1.In the terminal make sure you are in the root folder and type: 

npm run dev
