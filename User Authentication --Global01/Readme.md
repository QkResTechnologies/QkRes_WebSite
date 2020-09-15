To be added/Changed:

// Init

1. Create an Atlas DB and type server link with password in config.env 
2. Define an encryption key in the config.env
3. Register App on Twitter,Facebook,Google and type the App IDs in auth.js

// Future Updates

1. Implement a Reset Password feature with nodeMailer
2. Link Backend to Signup Page :heavy_check_mark:
3. Link Signup-Login Page to HomePage. Do not display the hashed password on the Profile page - SEVERITY: HIGH  :heavy_check_mark:
4. Link Rest of Website to function with this backend
5. Move Error Handling to a new File
6. Implement UnHandledErrorRejections
7. Do Not send StackTrace for 500 error. Design a Page to be displayed
8. Implement a Connection limit to block brute-force Regex attacks

// Testing:

1. Test All possible errors and ensure app does not break
2. Test Linking and Unlinking
3. Test UnhandledErrorRejections
4. Try to cause a 500 error
5. Try to break through using a Regex pattern matching
