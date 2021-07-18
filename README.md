
 # THIS WAS  A SCHOOL PERSONAL BASED PROJECT AND IN 2019 - 2020 . 
 
##### Most of the code is not written in modern javascript and few updates have been made since then.

## Pata space rental management system was a system I designed and wrote using the following technologies :
	1. Backend - Node.js (Express) / Postegres
	2. Frontend - Javascript(Ajax for API calls), EJS templating, Html, bootstrap
> The main purpose was to link users / people looking for property directly to agents /owners via pataspace management in a way to avoid online fraud

#### The system consists of four entities.Landlord/agents, users, Pata space management and the properties.


#### Functional Requirements :
	1. All users of the system could create an account.
	2. All users could login and out (Authentication was handled using passport js).
	3. Agents/ Landlords could CRUD their properties.
	4. Agents/ landlords could receive email for verification during account creation
	5. Admin could view all user data except for passwords . 
	6. Admin could CRUD / Block users / agents and all their data incase of violations.
	7. Users could report any mischievious behavior to admins.
	8. google maps was used to show the exact position of each property.
	9. users could CRUD comments.
	
	
## Features of the system
	1. Role based system. Admin, user, Agents/landlords
	2. Route Security using passport js to secure all routes against non-logged in users
	3. Password reset section.
	4. Email dispenser using nodemailer and sendgrid for  confirmation .
	5. Postgres for storing user data.


