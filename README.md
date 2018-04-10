# be-assessment-2

## Dating website
<img width="1280" alt="screenshot 2018-04-10 15 14 03" src="https://user-images.githubusercontent.com/32538678/38558999-21dd8dfc-3cd2-11e8-97c6-f40b21e98728.png">

The website prototype is made with HTML, CSS and Javascript. 

My dating website `Find your match` is a site where users can match themselves based on intrests. To use the website, they need to log in by creating an account. When the user is going to create an account, he/she  have to enter some data, for example: <br>
`• Name ` <br>
`• Your birthday ` <br>
`• Gender (from your self) ` <br>
`• Gender (you are looking for) ` <br>
`• Description of your self ` <br>
`• Characteristics` <br>
`• Your own profile picture ` <br>

At last, the user need to fill in a short questionnaire where they can answer with `yes`, `maybe` or `no`. Every question has its own icon. So when someone have filled the answer `yes` of `maybe`, the icon will appear beneath their profile.

When you are looking at other peoples profile or someone is looking at your profile, you can easily see all the features that you have in common.

## Prerequisites
Before you can use this website u need to do the following thing:

1. Download or clone this document with the following command:
`https://github.com/Karinliu/techproject.git`

2. Run `npm install`


## Created database for new profile
First we are going to create a database, to do that u can do the following things: <br>

`*NOTE!* I  have chosen to work in MYSQL, because I got lessons from school about MYSQL and they gave examples on how to work with it with NodeJS. U can choose your own database if you like.`

<br>
1. Open your terminal
2. Log into MySQL with the following command:  `mysql -u your-username -p`
3. Create a database with the following command: `CREATE DATABASE IF NOT EXISTS data;`
4. Then type `USE data;` So u can use this database and insert tables in it.
5. Make a table with the data u want to save into your table like this:  <br> 
`CREATE TABLE IF NOT EXISTS newprofile (` <br>
`id INT NOT NULL AUTO_INCREMENT,` <br>
`hash INT NOT NULL AUTO_INCREMENT,` <br>
`email TEXT CHARACTER SET utf8,` <br> 
`name TEXT CHARACTER SET utf8,` <br> 
`place TEXT CHARACTER SET utf8,` <br> 
`description TEXT CHARACTER SET utf8,` <br> 
`birthday DATE,` <br> 
`email TEXT CHARACTER SET utf8,` <br> 
`gender ENUM (‘f’, ’m’) NOT NULL,` <br>
`choosegender ENUM (‘f’, ’m’) NOT NULL,` <br>
`profilepicture TEXT CHARACTER SET utf8,` <br>
`characteristics ENUM (‘avontuurlijk’, ’accuraat’, ’loyaal’, ‘zorgzaam’, ’openhartig’, ’impulsief’, ‘assertief’, ’chaotisch’, ’zelfstandig’, ‘ondernemend’, ’creatief’, ’romantisch’, ’verlegen') NOT NULL;`, <br>
`food ENUM ('y','m','n') NOT NULL,` <br> 
`animals ENUM ('y','m','n') NOT NULL,` <br> 
`drink ENUM ('y','m','n') NOT NULL,` <br> 
`family ENUM ('y','m','n') NOT NULL,` <br> 
`movie ENUM ('y','m','n') NOT NULL,` <br> 
`smoke ENUM ('y','m','n') NOT NULL,` <br> 
`sport ENUM ('y','m','n') NOT NULL,` <br> 
`travel ENUM ('y','m','n') NOT NULL,` <br> 
`PRIMARY KEY (id) );`

6. `exit` (database is created!)

When you have made the table it will looks like this:
![untitled-1](https://user-images.githubusercontent.com/32538678/38473121-af837cf0-3b8a-11e8-92af-b04ffba71c95.png)

This table is made so you can save the data from the user into the table. The javascript and EJS templates will look into the database for the data to render the website.

## Create templates
After the database and the table is made. U can edit or create a new EJS Template file. In the EJS file we can render the data from the database in it. To render the data into the EJS file we have to use the following command: `<% databasename(databasetype) %>`.

The databasetemplate input type can be run where you want it.

For example what I have done. We just created the databasename `data` and we created a table with the columns. So when a user is going to register on my website, the data will be stored into the database.

So to show some data to other users, I created a EJS file with the name `details.ejs` and I saved it in the `views` document. Then I made some fields where I want the data be put in. (I want to show other people the name of the person. To do that, I made a header 1 with <%= data.name %> in it. 

So if you do that, it will say search in database `data` and give me the value from column `name`. 

## But how do we read the tables?!
Like I said before, when someone is registered the data can be put in with the input type off the profile. But before the data can be seen in the templates, you have to tell the table "hey, i want this column with the folowing data from u!". So to do that we can create a javascript file where the ejs files and the MYSQL table can be run. `see server.js`

In the javascript file u can tell: "Hey I want to get some data from the database. Can you give me from database `data` the table `newprofile` the `name` column? After that, the data will be run on your website.

## What next!
Now we know how to make a database with columns, template EJS files where we can render in the data from the database and we created an Javascript file to run the database and tables. But how can we make it work on localhost?!

To check if it works on localhost you have to open your terminal and open the document file `be-assessment-2`. Then you type in the following command: `npm start`. 

After you have done that, you can see that the created database will be rendered into your templates on localhost!

## Sources
Push form. Hack Sparrow. (z.d.)
https://www.hacksparrow.com/form-handling-processing-in-express-js.html

Delete. Mukesh Chapagain (z.d.) 
http://blog.chapagain.com.np/node-js-express-mysql-simple-add-edit-delete-view-crud/

MySQL server. Titus Wormer. (z.d.)
https://github.com/cmda-be/course-17-18/tree/master/examples/mysql-server

Express.js server. Titus Wormer. (z.d.) https://docs.google.com/presentation/d/1QVPTtENQ8d6td9ioNZHnbSoiilUZdsZ8n_F5naxw_Rw/edit#slide=id.g32339aa0a1_0_758

Login, logout and loginsessions. Titus Wormer. (z.d.) https://docs.google.com/presentation/d/1BHMqO9UV5ePt29n8cnjaznvye8Gu_HrdzhzC3h5rgOI/edit#slide=id.g349f599a27_0_360
