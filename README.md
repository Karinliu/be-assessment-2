# be-assessment-2

## The product
The product what is made is a datingsite. On the site u can 

## Installation
Download or clone this document with the following command:
`https://github.com/Karinliu/techproject.git`

Run `npm install`

## Using MYSQL
Because

## Created database for new profile
First I created a database.
![untitled-1](https://user-images.githubusercontent.com/32538678/38473121-af837cf0-3b8a-11e8-92af-b04ffba71c95.png)

See above the following columns with the data.

When someone is going to register, the data will be put in the table. 

## Create templates
After the table is, I made a EJS files where the data from the database can be put in with the following command: `<% input.(databasetype)%>`. 

The EJS files can be found in the views document.

## Read tables
After someone is registered, the data can be put in by the input type off the profile. Before the data can put in, u have to tell the table "hey, i want this column with the folowing data from u!". So I created a javascript file where the ejs files and the MYSQL table can be run. `see server.js`

In the javascript file I wrote some code where the user can register into the site, can run the site, can delete a profile and log in. 
