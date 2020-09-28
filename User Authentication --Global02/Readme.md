To be added/Changed:

// Init

1. Create an Atlas DB and type server link with password in config.env
2. Define an encryption key in the config.env
3. Register App on Twitter,Facebook,Google and type the App IDs in auth.js

// Future Updates

1. Implement a Reset Password feature with nodeMailer :heavy_check_mark:
2. Link Signup-Login Page to HomePage :heavy_check_mark:
3. Do not display the hashed password on the Profile page - SEVERITY: HIGH :heavy_check_mark:
4. Link Rest of Website to function with this backend :heavy_check_mark:
5. Move Error Handling to a new File :heavy_check_mark:
6. Implement UnHandledErrorRejections :heavy_check_mark:
7. Do Not send StackTrace for 500 error. Design a Page to be displayed :heavy_check_mark:
8. Implement a Connection limit to block brute-force Regex attacks :heavy_check_mark:

// Testing:

1. Test All possible errors and ensure app does not break :heavy_check_mark:
2. Test Linking and Unlinking :heavy_check_mark:
3. Test UnhandledErrorRejections :heavy_check_mark:
4. Try to cause a 500 error :heavy_check_mark:
5. Try to break through using a Regex pattern matching

// Final:

1. After Registering the App on the third party applications, place the corresponding data in the /config/auth.js file
2. Place the Database URL and Password in the config.env file
3. Register the app on free email service providers like SendGrid to be able to send reset mails. Place these details in the config.env file as well
4. Place any static HTML files in the /public folder an dynamic files as .ejs files in the /views folder
5. Route any file serving for the website through - /app/staticRoutes.js for static files in the format shown

// Steps to make this work locally:

1. Install Node, MongoDB on your machine.
2. in the terminal of the editor - type npm install for all the node modules to be installed.
3. Set the Current Working directory(where this folder is stored) in the CWD setting in the process.env file

// Linking Frontend

1. Remove all # in the <a> tags
2. Route all Static HTMLs through the staticRoutes.js
3. If any pages need to modify/use the User database:
   - The fields identifying a user are: name,email,password and passwordConfirm (case sensitive)
   - Any modifications can be made to the database schema by modifying the /app/models/user.js file
4. HTMLs to be designed/modified:
   - The Static HTML files taken are from 27-09-20. Update any files necessary. Home page is titles as index.ejs under the views folder.
   - The Login page has not yet been updated. In case of future updates, change the HTML retaining the <%message%> tag
   - Redesign the 404.ejs, 500.ejs, deactivate.ejs, forgot.ejs, reset.ejs, profile.ejs

@Karthik Karumanchi
