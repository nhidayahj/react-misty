# Fullstack Web Development

# Project Summary 
The e-commerce webpage is build and inspired by yoga trainers and meditation instructors who comes together and decided to 
set up a business togeher by selling diffusers and essential oils as aromatherapy also plays a huge part during these practices

# How to Use 
This project webpage is a fullstack application. In the first part of the application, the page is available to the public and customers can 
purchase these items directly. However, users must be a member, hence registering for an account is mandatory in order to add items 
to the cart and to complete the payment/shipping process. 

The second part is the vendor services, where vendors are able to add new items, update and/or delete existing
products from their store. Vendors are also able to view all the orders that is made by the customers 
in the vendor portal to provide visibility if certain order items is pending for payment/in-transit for shipping or 
if the ordered items has successfully been delivered to the customer. Vendors also has authorization to update/delete 
order items. In addition, those action functions are possible if vendor has an account. 

In both applications, users are required to register and sign-in when making any service action.

# Strategy 
## Identifying External Users 
As mentioned above, this application was designed and built from people who enjoys yoga and practices meditation and 
aromatherapy helps to enhance the physical and mental exercises. However, aromatherapy is not only for those who does such
activity but for the general public as well.

Finding the right kind of diffuser that is suitable for certain settings or environment is important to ensure 
that the essential oils are used up efficiently, and that one is able to enjoy the scent and fragrance without 
worrying of the maintenance.

## Identifying External's Users Goals 
Since the items sold in this application can cater to the general public, therefore, 
the page should be straightforward when making an online purchase, such as:

1. Able to view all kinds of diffusers and essential oils
2. Price of the products
3. Add selected item to cart
4. Checkout their shopping cart for payment
5. Include shipping details 
6. View individual orders made 
7. Register/Log in an account 
8. Update account details 

## Identifying Site Owner's Goals 
My goals as the site owner is to demonstrate my ability to incorporate these technologies: Bookshlef ORM, 
planning and creating ER diagrams and logical schema for MySQL, make use of Caolan form validations and 
implementing user authentication and routings. 

Using image uploader from Uploadecare to store screenshots of the store products. 

To complete the online purchase, is to import a third-party payment gateway
from Stripe.

## User stories
Customer-end:
1. As a customer, I want to be able view all the products(diffusers and essential oils) that are available in the store
2. As a customer, I want to be able to add items to my shopping cart
3. As a customer, I want to be able to do search function on the products
4. As a customer, I want to be able to view all the items that are in my shopping cart 
5. As a customer, I want to be able to change the quantities or delete items from my cart 
 
Vendor-end:
1. As a vendor, I want to be able to view products that is in the inventory
2. As a vendor, I want to be able to see items that are low in stock
3. As a vendor, I want to be able to create new/update/delete products from my inventory 
4. As a vendor, I want to be able to view orders made by the customer 
5. As a vendor, I want to be able to view the products that the customer purchased from the orders
6. As a vendor, I want to be able to update the status of the orders if items has successfully been 
delivered to the customer or still in-transit. 

# Scope
## Functional Requirement
The project should be able to perform the followig functions:
1. MySQL database is able to store product items and the relevant relationship between product tables
must be properly declared
2. Vendor is able create/update/delete items from the inventory page
3. Database is able to hold url links of the image uploaded to the third-party image storage
4. Private information are properly hashed in the database (eg. users' password accounts)
5. Customers' cart items are stored in database, and can be easily retrieved when 
customers goes to their shopping cart 

## Non-Functional Requirement 
1. Ensure mobile responsiveness

# Content Requirement 
## Mandatory Requirement
These are the requirements needed to ensure end-user's goals are met:
1. Simple layout display of products for customers
2. Orders are structured in a tablelist manner 
3. Search filter function
4. Add to cart function
5. Update quantities and/or delete cart item 
6. Implementation of UploadCare and Stripe checkout payment
7. Forms for registration and logging ins.


## Future Implementation
1. Choosing only specific items from the shopping cart to be sent for payment
2. Stock items can be automatically updated after a successfull payment 

# Structure 
## ER Diagram 
All mandatory relationships and tables are presented in the Logical Schema diagram
![project3](/src/readmeImg/project3.PNG)


# Skeleton 
## Interface Design
For the vendors, product stocks and orders are organized in a table manner. 
Diffuser Tables: 
![vendor](misty/src/readmeImg/vendor.png)

Orders Table for both diffusers and Oils 
![vendor-orders](misty/src/readmeImg/vendor-orders.png)



# Surface 

# Features 

# Deployment 


# Technologies Used 
- Express 



# Acknowledgements


