# Simple eCommerce Site w/GraphQL

Simple React application with an admin panel which gives the ability to create, edit, and view customer details.

## Easy Setup

In the root directory, run:

```
npm install
```

After all the node modules are finished installing, run:

```
npm run dev
```

This will start the node server and run the app at:
[http://localhost:4000]

## Application Overview

The home page displays a list of customers with the ability to edit the customer details. Clicking on the customer name takes you to the Customer Detail page, this is the customer's home page. The pencil link goes to the Edit Customer Page. At the bottom, there is also a link to create a new customer. This goes to a separate Create New Customer Page.

### Editing a Customer

The customer name, email, and prime membership can all be edited by the admin.
Hitting 'Submit' will run the `updateCustomer` mutation. A button is used here instead of automatically updating in order to avoid making backend requests for every character change. The 'Submit' button is also be more intuitive as it gives the user immediate feedback.

## Testing

There are two unit tests in the app for the CustomerList and CustomerCreate components. To run tests:

```
npm run test
```
