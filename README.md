## Overview

This project is a school assignment designed to address three API risks: Broken Authentication, Broken Function Level Authorization, and Server-Side Request Forgery. It consists of an Express.js server-side application with a main `app.js` file containing all API routes and middlewares.

## Project Structure

.<br />
├── app.js # Main entry point for the application <br />
├── api # Directory containing API route functions <br />
├── middleware # Directory containing middleware functions <br />
├── models # Directory containing models <br />
└── scripts # Directory containing utility scripts <br />

### `app.js`

The `app.js` file serves as the primary entry point for the application. It contains all API routes and middleware configurations.

### `api/`

The `api/` directory houses individual JavaScript files, each representing a specific API route. These files contain functions responsible for handling the logic associated with their respective routes.

### `middleware/`

The `middleware/` directory contains various middleware functions used within the application. These functions are responsible for implementing authentication, authorization, rate limiting and SSRF protection crafted to mitigate risks associated with uploading images.

## Project Purpose

This project aims to demonstrate the implementation of secure API practices by addressing common risks such as Broken Authentication, Broken Function Level Authorization, and Server-Side Request Forgery. By organizing API routes and middleware functions effectively, the application showcases a structured approach to building secure web services.

## API Risks Covered

1. **Broken Authentication**: Ensuring that authentication mechanisms are robust and cannot be easily compromised or bypassed.

    - The route `/api/login` is vulnerable to brute force attacks. However, it is protected by a rate limiter that tracks the number of requests executed for each concrete username. This helps mitigate the risk of brute force attacks by limiting the rate at which login attempts can be made.

2. **Broken Function Level Authorization**: Implementing proper authorization checks at each API endpoint to prevent unauthorized access to sensitive resources.

    - Routes such as `/api/users` are vulnerable because anyone can send a POST request to create a user with an admin role or retrieve all users. This vulnerability is addressed by verifying the JWT token present in the request header, ensuring that only users with an admin role can perform these actions.

3. **Server-Side Request Forgery (SSRF)**: Mitigating the risk of SSRF attacks by validating and sanitizing user inputs, especially those used in requests to external resources.

    - The route `/api/images/upload` is vulnerable to SSRF attacks because it executes any URL passed to it without proper validation or sanitization. To address this vulnerability, input validation and sanitization measures are implemented to ensure that only trusted URLs are processed, like URL schema, white list and disabled redirection, thereby mitigating the risk of SSRF attacks.

