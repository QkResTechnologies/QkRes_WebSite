To be added/Changed:

// Init
<ol>
  <li> Create an Atlas DB and type server link with password in config.env  </li>
  <li> Define an encryption key in the config.env </li>
  <li> Register App on Twitter,Facebook,Google and type the App IDs in auth.js </li>
</ol>
// Future Updates
<ol>
  <li> Implement a Reset Password feature with nodeMailer </li>
  <li> Link Backend to Signup Page :heavy_check_mark: </li>
  <li> Link Signup-Login Page to HomePage.   </li>                              
<li>Do not display the hashed password on the Profile page - SEVERITY: HIGH  :heavy_check_mark: </li>
  <li> Link Rest of Website to function with this backend </li>
  <li> Move Error Handling to a new File </li>
  <li> Implement UnHandledErrorRejections </li>
  <li> Do Not send StackTrace for 500 error. Design a Page to be displayed </li>
  <li> Implement a Connection limit to block brute-force Regex attacks </li>
</ol>
// Testing:
<ol>
  <li> Test All possible errors and ensure app does not break </li>
  <li> Test Linking and Unlinking </li>
  <li> Test UnhandledErrorRejections </li>
  <li> Try to cause a 500 error </li>
  <li> Try to break through using a Regex pattern matching </li>
</ol>
