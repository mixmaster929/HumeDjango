#### MILESTONE 1: Design Mockups
1. home page
2. login page
3. signup page
4. User
    1. home page
    2. account settings page
    3. profile page
    4. Manager
        1. upload page image | video
        2. Design Mockup for the video analysis page 
        3. Design Mockup for the image analysis page
    5. Employee
        1. ...
+ ***MVP: Completed design mockups for both video and image analysis pages***
+ ***ETA: x days***

----------------------------------------------------------------------------------------------------
#### MILESTONE 2: Creating the Website
1. account types
    1. Admin
    2. User
        1. Manager
        2. Employee
2. account roles
    1. Admin
        <!-- can admin change the account type of a user to admin -->
        <!-- can admin change the account type of a admin to user -->
        1. create another admin account
        2. Create a user account 
        3. Edit a user account 
        4. Delete a user account
        5. Reset a user account login details
        6. Edit API information (e.g zoom api key, hume ai api key)
    2. User 
        1. Edit his personal information
        2. Reset his password
        3. Manager
            1. Managers can manually upload video  
            2. Managers can manually upload image
            3. HR managers/Marketting managers login
3. System Requirements
    1. on account creation
        1. email acount details to the account's associated email address
        <!-- should this happen if account is created by an admin? -->
    2. on account edit
        1. email acount details to the account's associated email address
        <!-- should this happen if account is edited by an admin? -->


+ ***MVP: Web App with basic admin and user functions***
+ ***ETA: x days***

----------------------------------------------------------------------------------------------------
#### MILESTONE 3: hume.ai API Integration and Analysis
1. Setup an interface for AI hume API 
2. Video page integration
3. Send the image to hume AI to get the data from API and show the chart 
4. Show the facial expressions data in a graphical representation in real time 
    * Each facial representation is  differentiated by some color 
    * Dispay chart for Facial expression 
    * Dispay chart for Speech Prosody 
    * Dispay chart for Vocal Burst 
    * Filter chart by individual person 
    * Filter chart by expressions

+ ***MVP: Interface established for AI Hume API with basic video and image analysis***
+ ***ETA: x days***

----------------------------------------------------------------------------------------------------
#### MILESTONE 4: Zoom Integration
##### Admin Roles:
1. Connect their ZOOM account in this site to provide interface between their zoom account and our API 
##### Users Roles:
2. Create zoom meeting using Zoom API 
3. Send zoom invite to the attendees using Zoom API 
4. View the list of meetings 
5. Initiate the video meeting 
6. Read the video from the zoom call and display in our site
7. Encode the video and send to stream API using WEBSOCKETS
8. Fetch the real time facial expressions data from the API 
9. Capture the data from the API and save it in our database 
10. All the data will be captured and saved associated with the Zoom Call, so the managers can review the data and graphs later 
11. Video will be encoded before sending it to Stream API to get the data from API 

+ ***MVP: Integration with Zoom API allowing users to create and manage meetings***
+ ***ETA: x days***

----------------------------------------------------------------------------------------------------
#### Finalization
1. Testing and bug fixes 
2. Mobile responsiveness

+ ***MVP: Interface established for AI Hume API with basic video integration***
+ ***ETA: x days***
