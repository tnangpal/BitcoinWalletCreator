# Bitcoin Wallet Creator
This web-based application is designed to manage user authentication and Bitcoin wallet creation. Users can sign up, log in, create, and view their Bitcoin wallets, with all information securely stored and managed. The project utilizes the Tatum API to interact with Bitcoin networks. [https://apidoc.tatum.io/tag/Bitcoin]

## Key Features
1. User Signup & Login: Authenticate users and manage sessions.
2. Create BTC Wallet: Generate new Bitcoin wallets for authenticated users.
3. View Wallets: Allow users to view their existing wallets, including Mnemonic and XPUB.

## Technology Stack
Backend:
1. Node.js: Runtime environment for executing server-side JavaScript code.
2. Express: Web application framework for building web and API servers.
3. MySQL: Relational database for storing and retrieving data.
4. bcrypt: Library for hashing and securing user passwords.
5. JWT: Used for authentication and transmitting information between parties in JSON format.
6. Cors: Middleware for enabling Cross-Origin Resource Sharing.
7. dotenv: Module for loading environment variables from a .env file into process.env.

Frontend:
1. HTML/CSS: Standard markup and styling languages for creating web pages.
2. JavaScript: Programming language to make web pages dynamic and interactive.
3. Axios: Promise-based HTTP client for making requests.

Others:
1. Tatum API: An API for creating and managing Bitcoin wallets.

Development Tools: 
1. Visual Studio Code: Code editor.

## Installation 

### Prerequisites
Before you can run the Bitcoin Wallet Management application on your local machine, you'll need the following software installed:

**Node.js:** This is the JavaScript runtime used to execute server-side code. Download and install it from nodejs.org.
**MySQL Workbench:** This project uses MySQL for database management, and MySQL Workbench is the recommended tool for interacting with the MySQL server. Download and install it from the MySQL official website.

### Setup
Follow these steps to set up the project on your local machine:

1. Clone the Repository: Use the command git clone <repository-url> to clone the project repository to your local machine.

2. Navigate to the Project Directory: Use the command cd <directory-name> to navigate to the cloned repository.

3. Install Dependencies: Run npm install to install all the necessary dependencies listed in the package.json file.

4. Configure Environment Variables: Create a .env file in the root directory, and add the necessary environment variables such as SECRET_KEY and DATABASE_URL. Example:
```SECRET_KEY=mysecretkey```
```DATABASE_URL=mysql://username:password@localhost/database_name```

5. MySQL Database Setup: Open MySQL Workbench, connect to your MySQL server, and create the necessary database and tables as defined in the project's SQL schema files. Make sure to configure the connection credentials to match those in the .env file.

6. Start the Server: Run npm start to start the server. The application will be accessible at http://localhost:3000.

### Usage
Here's how to interact with the main functionalities of the application:

**User Signup & Login**
1. Signup: Navigate to http://localhost:3000/signup.html to register as a new user. Enter the required details and click the signup button.

<img width="1452" alt="Screenshot 2023-08-07 at 10 33 59 PM" src="https://github.com/tnangpal/BitcoinWalletCreator/assets/124189649/5274f35b-dc4b-4e6a-a733-a20555384cc9">

2. Login: Navigate to http://localhost:3000/login.html and enter your credentials. Once authenticated, you will be redirected to the getinfo page.

<img width="1450" alt="Screenshot 2023-08-07 at 10 34 20 PM" src="https://github.com/tnangpal/BitcoinWalletCreator/assets/124189649/d6abd30f-545d-4053-bfae-c5a183bd352d">

**Create BTC Wallet**
1. Create Wallet: On the getinfo page, click the 'Create BTC Wallet' button to generate a new Bitcoin wallet using the Tatum API. You will see a confirmation message when the wallet is successfully created.

<img width="1452" alt="Screenshot 2023-08-07 at 10 34 50 PM" src="https://github.com/tnangpal/BitcoinWalletCreator/assets/124189649/c6542acb-308e-4893-9552-ae5b36474e14">

**View Wallets**
1. View Wallets: Click the 'View Wallets' Button on the getinfo page. All of your wallets, including Mnemonic and XPUB, will be displayed in a center-aligned table.

<img width="1449" alt="Screenshot 2023-08-07 at 10 35 02 PM" src="https://github.com/tnangpal/BitcoinWalletCreator/assets/124189649/710e00f5-cc2f-4f09-94e2-26219677c786">





