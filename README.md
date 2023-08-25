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

<img width="701" alt="Screenshot 2023-08-25 at 4 53 23 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/af14e971-38de-46bb-bb68-893a8c821982">
<img width="678" alt="Screenshot 2023-08-25 at 4 54 04 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/f6f55f00-9e11-44ad-868e-7e3d0a69a30f">


# 📒Normalization
<img width="408" alt="Screenshot 2023-08-25 at 4 56 15 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/b6de501a-6234-4228-9ee6-3ca7ac0ac1ad">
<img width="434" alt="Screenshot 2023-08-25 at 4 56 38 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/08f85400-b02d-4d49-abfd-800e0650f6ac">
<img width="443" alt="Screenshot 2023-08-25 at 4 56 47 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/747d08cc-8a1f-4c78-b1f3-1d03906082ea">
<img width="432" alt="Screenshot 2023-08-25 at 4 56 58 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/ab61eca4-5954-491e-8679-46fce21797f4">
<img width="432" alt="Screenshot 2023-08-25 at 4 57 10 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/778c277f-6155-46fe-8df4-8e60ca4b4a8a">


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
<img width="723" alt="Screenshot 2023-08-25 at 4 57 49 PM" src="https://github.com/Singularity2050/DatabaseDesign/assets/67400401/8f7dd9ea-d88f-4c43-9fb3-52acf40d2a69">

