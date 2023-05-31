# Technical Test

This read me is to provide the current progress of the test. Due to time constraint, the following mentioned are the parts of the test that have been done.

## Backend
The backend makes use of:
- ExpressJS
- Nodemon
- DOTENV (set up basic connection to database)
- CORS (for bypassing CORS issue when transferring data between local database and client app)
- Mongoose (for connecting to local MongoDB database)
- MongoDB (for the database)

All Schemas and endpoints has been created as per instruction in the Technical test document.

However, as mentioned in the technical document, I created new UUIDs. But the foreign key of the employee table makes used of the cafes' _id field, because I did not want to assume that the cafe's created ID was to be used.


## Frontend
React, React-Router, React-Redux, AG-Grid and Material UI has been installed
Axios is used to read the data from the database

What's currently done is the basic layout for the cafes list page. The basic CRUD functions for the cafes are done as follows:

C - Users can create a new cafe by clicking on the Add New Cafe button, which redirects the user to the create cafe page. The page is connected to the POST API endpoint that stores the newly created cafe data.

R - The cafe list page shows a list of the cafes with its explicit details, along with the number of employees, with the edit and delete button. Makes use of the AG-Grid table component (do note that I'm using v29 for Ag-grid). This page reads from the GET API endpoint.

U - The edit buttons of the cafe list redirects to individual edit pages of a cafe by id. It makes use of the existing data by using the cafe _id to read from a GET API endpoint, and updating by PUT API endpoint to push the data with the updated data.

D - The delete buttons of the cafe list immediately deletes an entry from the cafe table. After sending a request to the DELETE API endpoint that references the entry's cafe _id, on success, will trigger the page to re-render with the updated list of cafe details.

The Employee's CRUD pages are not complete yet, due to the mentioned time constraint.

### Notes on the Material UI and AG Grid
It is my first time using AG-Grid and Material UI. It took me 48 hours to understand how the components work, especially since there was an update to the AG-Grid API. Although it is my first time as well using Material UI on react, I am able to infer how the components work as I have worked with Flutter's syntax on created widgets using its internal Material UI.