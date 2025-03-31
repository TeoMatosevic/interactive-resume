const cv_txt = `\
TEO MATOŠEVIĆ

Developer

+385 98 917 4415 | matosevicteo@gmail.com

WORK EXPERIENCE:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
VALAMAR RIVIERA D.D.
Junior Developer | July, 2022 - Present

As part of a small team of students, contributed to the development of an internal application
designed to provide personalized benefits for employees.
Participated in several smaller projects focused on enhancing and supporting an existing
employee data platform and master data platform.
Played a role in optimizing call center operations using the previously mentioned master data
platform, resulting in a 40% reduction in average call time.
Technologies used: Azure Cloud Services, MongoDB, Apache Kafka, C#, Angular...

RELEVANT PROJECTS:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
Lost & Found

Developed software as part of a small team for the Lumen Development competition.
The mentioned web application leverages machine learning to connect individuals who have
lost items with those who have found them.

Bachelors Degree Final Project

Developed a software designed to identify and correct contextually incorrect words within
predefined confusion sets.
Prediction is made using probability and raw data of n-gram occurrences (~1.7 billion 3-grams)
This project was a part of a larger and still ongoing project called ispravi.me.

BytePit

Developed a software platform for hosting code competitions, similar to LeetCode, as part of a
college project.

Krab

Terminal UI password manager. (Passion project)

SKILLS:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

TypeScript, C#, Rust, Go, Docker, mentoring, software architecture, SQL, .NET, ScyllaDB.

EDUCATION:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
Faculty of Electrical Engineering and Computing, University of Zagreb
2021 - 2024 | Bachelor’s degree in Computer science
2024 - present | Master’s degree in Software engineering

Some more tech I used: C, Lua, Python, NodeJS, Java, C++, React, FastAPI, TailwindCSS, Ratatui,
Kubernetes, RabbitMQ, SQLite, PostgreSQL, MySQL, MongoDB Triggers, Git, GitHub, Bitbucket, GitHub
actions, Jira, Confluence, Render, CI/CD, Vim, Linux...
`;

const cv_md = `\
# TEO MATOŠEVIĆ

## Developer

### +385 98 917 4415 | matosevicteo@gmail.com

## WORK EXPERIENCE:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
### VALAMAR RIVIERA D.D.
### Junior Developer | July, 2022 - Present

\`\`\`
As part of a small team of students, contributed to the development of an internal application
designed to provide personalized benefits for employees.
Participated in several smaller projects focused on enhancing and supporting an existing
employee data platform and master data platform.
Played a role in optimizing call center operations using the previously mentioned master data
platform, resulting in a 40% reduction in average call time.
Technologies used: Azure Cloud Services, MongoDB, Apache Kafka, C#, Angular...
\`\`\`

## RELEVANT PROJECTS:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
\`\`\`
Lost & Found

Developed software as part of a small team for the Lumen Development competition.
The mentioned web application leverages machine learning to connect individuals who have
lost items with those who have found them.
\`\`\`
\`\`\`
Bachelors Degree Final Project

Developed a software designed to identify and correct contextually incorrect words within
predefined confusion sets.
Prediction is made using probability and raw data of n-gram occurrences (~1.7 billion 3-grams)
This project was a part of a larger and still ongoing project called ispravi.me.
\`\`\`
\`\`\`
BytePit

Developed a software platform for hosting code competitions, similar to LeetCode, as part of a
college project.
\`\`\`
\`\`\`
Krab

Terminal UI password manager. (Passion project)
\`\`\`

## SKILLS:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
\`\`\`
TypeScript, C#, Rust, Go, Docker, mentoring, software architecture, SQL, .NET, ScyllaDB.
\`\`\`

## EDUCATION:
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
\`\`\`
Faculty of Electrical Engineering and Computing, University of Zagreb
2021 - 2024 | Bachelor’s degree in Computer science
2024 - present | Master’s degree in Software engineering
\`\`\`

Some more tech I used: C, Lua, Python, NodeJS, Java, C++, React, FastAPI, TailwindCSS, Ratatui,
Kubernetes, RabbitMQ, SQLite, PostgreSQL, MySQL, MongoDB Triggers, Git, GitHub, Bitbucket, GitHub
actions, Jira, Confluence, Render, CI/CD, Vim, Linux...
`;

const user_manual_txt = `\
User Manual

This is a user manual for the terminal emulator web application. The application is designed to
simulate a terminal environment. The user can interact with the terminal by typing commands and
receiving output. The application supports various commands. The user can navigate the file system as 
he would in a real unix terminal.

For novice users, short explanation of how to navigate the file system is provided below.

Commands:
- ls: list directory contents
- cd: change directory
- cat: concatenate files and print on the standard output
- clear: clear the terminal screen
- help: display help information
- read: display markdown files (not standard unix command but added for the purpose of this application)

Navigation:
- To list the contents of the current directory, type ls and press Enter.
- To change to a different directory, type cd followed by the directory name and press Enter.
- To display the contents of a file, type cat followed by the file name and press Enter.
- To clear the terminal screen, type clear and press Enter.
- Directory names are case-sensitive. Make sure to type the directory name exactly as it appears.
- To go back to the previous directory, type cd .. and press Enter. (.. is a special directory name that represents the parent directory)
- To move multiple directories in the same command, separate the directory names with a forward slash (/). 
  For example, cd directory1/directory2 will move to directory2 inside directory1.
- It is very important to be in the correct directory when executing commands.

For more information, type help and press Enter.

Most of the content of this application is inside the Projects/github-projects directory.
All of my public projects are there. Feel free to explore them. Use the cat command to view the content of the files.
Use the read command to view markdown files (README.md most notably).

My CV is located in the root directory. Use cat and read commands to view it (CV.txt and CV.md).

Feel free to explore the application and have fun!

For more information contact me. :)
`;

export {
    cv_txt,
    cv_md,
    user_manual_txt
};
