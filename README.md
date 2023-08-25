# 📜 General Idea of Project

Our application is designed to provide a collection of SUNY Korea zoom lectures, which can be accessed by users through the website SunyFlex. The zoom lectures are taught by SUNY Korea professors and access is limited to SUNY Korea students only. The database will be used to store information to categorize the zoom lectures, search for zoom lectures, determine which zoom lectures to show up for each student, and verify whether the user can access the zoom lectures.

The zoom lectures are categorized by the professor that the course is taught by, the course number, and the major. Moreover, students can easily find lectures by searching for a professor’s name, course number, or major.

The domain of the application is an online lecture service between the students and faculties at
SUNY Korea. The application is designed to provide a collection of SUNY Korea zoom lectures,
assignments, and exams, which can be accessed by users through the website Stonyflix. The
zoom lectures are taught by SUNY Korea faculties and access is limited to SUNY Korea students
and faculties only. The database will be used to store information to categorize the zoom
lectures, determine which courses to show up for each student, verify whether the user can
access the zoom lectures, and etc.
Our goal is to have a login feature where SUNY Korea students and faculty members can create
their accounts and use the website with their accounts. After logging in, a student user can
access zoom links, add or remove courses, and view assignments and exams. By clicking on a
course on the website, the student will be redirected to the zoom lecture. For a faculty user, the
user can add or delete courses and upload zoom links, assignments, or exams. There will also
be a search bar feature where students can find zoom lectures easily by searching with a
faculty’s name or course number.

# 🗝Domain of Application

The domain of our application is an online lecture service between the students and professors at SUNY Korea. In the database, we have tables for employees, professors, students, courses, majors, profiles, and lectures.

# 📚 Key Features

There will be a login feature where SUNY Korea students can create their account and use the website with their accounts. This feature makes sure that only SUNY Korea students can access the zoom lectures. There will also be a search bar feature where students can find zoom lectures easily by searching with a professor’s name or course number.

# 🛠️ Key Technologies and Tools

- Language: Javascript, HTML5, and CSS3.
- Template: Node.js and React.js. Express
- Programming Environment: npm 7.12.1, nodejs 14.8.0, react 17.0.1
- Database Server: Mysql 8.0.23

# 🏅 Expected Results

SUNY Korea students will be able to create an account through the SunyFlex website with their university email addresses. After verifying that they are SUNY Korea students, they can log into their accounts and browse through the website to look for the zoom lectures that they need. Only the zoom lectures of the courses the student takes will show up. By using the search bar, students can find the videos more easily. By clicking on a course in the website, the student will be directed to the zoom lecture.

# 🗓️ Tentative Schedule

- Project Planning: 5/14
- Project Proposal: 5/16
- Database Design
    - ER Model: 5/15
    - Normalization: 5/23
- Front-end Design: 5/23
- Back-end Design: 5/23
- Testing: 5/23
- Fix errors by 5/30

# ✏️ Task Assignment

- **Sije Park:** Project Planning, Front-end design, Normalization, Back-end design
- **Christine Kim:** Project proposal, ER model,Back-end design

# 🏷️Use Cases

There are two main users for our application: Students and Faculties.

1. A faculty user will first log in with the university email. The user will be redirected to the
profiles page where he or she would choose “Faculty” for the occupation and add the
office number, name, nickname, and major. If the user wants to add a course, the user
can click the profile icon at the top right corner, which would go to the profile page. At the
bottom of the page under “Faculty: Course,” the user can input the course name, major,
zoom link, and assignment. The user can add more courses with the “add” button or
delete courses with the “delete” button. Then, the user should click the save button, and
the user will be redirected to the content page. By scrolling down, the user will see the
courses they have added.
a. If the user wants to update an assignment, the faculty can go to the profile page
and go to the assignment section under “Faculty: Course.” And save the changes.
2. A student user will log in with the school email and be redirected to the profiles page.
The user would choose “Student” for the occupation and add the student id, name,
nickname, and major. If the student user wants to add a course, the user will go to the
navigation bar and click “Course” and select the major of the course to add. When the
user hovers over the course icons displayed, the user can see the course name, faculty,
office number, and semester. By clicking the plus button at the top right corner, the user
can add the course.
a. If the user wants to remove a course, the user can click the check button on the
top right corner to unselect.
b. The course and the course’s assignment will display when the user returns to the
content page (by clicking the Stonyflix logo). The course and assignment details
will appear when hovering over the course or assignment icons.
c. If the user wants to access the zoom link, the user can click the icon under “Your
Course” on the content page. After clicking, the user will be redirected to the
zoom lecture.

To log out, the user will go to the profile page and click the logout button at the bottom of the
page.

# 📒ER-Diagram

Relationships are represented by the diamonds (Takes, Teaches, Have, HaveExam).
10 tables before normalization and 12 tables after normalization.

![스크린샷 2022-06-23 오후 3.38.48.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/00820f45-f6ee-445e-92cb-31f92905da51/스크린샷_2022-06-23_오후_3.38.48.png)

![스크린샷 2022-06-23 오후 3.39.11.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea82b6c5-7e49-4e97-bda4-5a17c848d642/스크린샷_2022-06-23_오후_3.39.11.png)

# 📒Normalization

![스크린샷 2022-06-23 오후 3.40.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a743685d-2128-454d-99b5-e1a482273899/스크린샷_2022-06-23_오후_3.40.52.png)

![스크린샷 2022-06-23 오후 3.40.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/af161edb-01a4-46bb-8692-cb0b7467d3fd/스크린샷_2022-06-23_오후_3.40.13.png)

![스크린샷 2022-06-23 오후 3.41.22.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f12217c6-5bfd-441f-8fc7-a10a791088c2/스크린샷_2022-06-23_오후_3.41.22.png)

![스크린샷 2022-06-23 오후 3.46.09.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed236486-2c01-46f4-8086-dcd8bcd91813/스크린샷_2022-06-23_오후_3.46.09.png)

![스크린샷 2022-06-23 오후 3.42.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1d382fc-020c-40a3-9931-b571d9c5945b/스크린샷_2022-06-23_오후_3.42.49.png)

![스크린샷 2022-06-23 오후 3.44.43.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/52e99aac-e95e-4200-9568-b264f96c19a1/스크린샷_2022-06-23_오후_3.44.43.png)

![스크린샷 2022-06-23 오후 3.47.13.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5d6a558-fffd-4c2e-aea5-14b58dcf2a1e/스크린샷_2022-06-23_오후_3.47.13.png)

![스크린샷 2022-06-23 오후 3.47.25.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c34ac8c-871e-4bd9-8101-94353cb5a9ed/스크린샷_2022-06-23_오후_3.47.25.png)

# 📒 User Documentation

1. Start your local MySQL Server
2. Create stonyflix database in the local host
3. There should be a user whose name is “root”, and the password should not be set.
4. In the terminal, locate the server folder.
a. Use command npm install to install all modules listed as dependencies in
package.json.
b. Use command npm start to run the client.
5. Open another terminal window and locate the client folder.
a. Use command npm install to install all modules listed as dependencies in
package.json.
    
    b. Use command npm start to run the server.
    

6. Go to http://localhost:3000/ to view our website.

     URL of the front page: http://localhost:3000/
     URL of back-end: [http://localhost:5000](http://localhost:5000/)
     Please check the correct version of the application below.

- Programming Environment: npm 7.12.1, nodejs 14.8.0, react 17.0.1
- Database Server: Mysql 8.0.23

# ⛳ Goal

We met most of our goals except for the search and exam features. We did not have enough
time to implement those features. Front-end design took longer than expected.

# ↗️ Improvements

 If we had more time for this project, we would modify the login feature to make sure that only
users with the university emails can log in and register their accounts. This could help us verify
that the user is a student or faculty at SUNY Korea.

Also, we would allow faculties to add multiple assignments for each course instead of only one.
We would allow faculties to upload assignment files that users can access by clicking on the
icons under “Your Assignments.” Moreover, we would allow a faculty to view the names of
students who have added a course.

For our database design, we would use indexes for uid of Users1 relation and cid of Courses1
relation to obtain better performances.

# ➕ Additional Features

We would add a pop-up feature that informs users 10 minutes before a course starts by default,
and also allow the user to choose when they want to be informed. The pop-up would have a
button that will redirect the user to the zoom lecture when clicked.

Also, we would add a streaming service where faculties can upload lecture videos and student
users can watch the lecture videos through our application.

# 🖼️ Example Image

![KakaoTalk_Photo_2022-06-23-16-02-33-1-min.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/95d242be-53bf-4fce-9cfb-05e0e23197b5/KakaoTalk_Photo_2022-06-23-16-02-33-1-min.png)

![KakaoTalk_Photo_2022-06-23-16-02-33-2.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c632d7bd-fcd4-47c3-8008-9adb718aceaf/KakaoTalk_Photo_2022-06-23-16-02-33-2.png)

![KakaoTalk_Photo_2022-06-23-16-02-33-5.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec921a94-d324-44f0-b2f0-440ae4bcaf70/KakaoTalk_Photo_2022-06-23-16-02-33-5.png)

![KakaoTalk_Photo_2022-06-23-16-02-33-3.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/157f9aac-5f66-4328-bc61-8ef91dafbf49/KakaoTalk_Photo_2022-06-23-16-02-33-3.png)

![KakaoTalk_Photo_2022-06-23-16-02-33-6.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a783d48-2422-4ba0-90be-3b33caabc18c/KakaoTalk_Photo_2022-06-23-16-02-33-6.png)

![KakaoTalk_Photo_2022-06-23-16-02-33-4.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c1bb8440-7b57-49b5-b1f6-b0a2024912ad/KakaoTalk_Photo_2022-06-23-16-02-33-4.png)
