<p align="center">
  <a href="https://github.com/iamsahebgiri/betabuzz">
    <img alt="MentorLab" height="80" src="https://github.com/user-attachments/assets/8e22fe9c-9c46-487e-a3a2-37563a9ddbdf">
  </a>
</p>
<h1 align="center">Mentor Lab</h1>

<div align="center">
Creating a buzz around the latest beta products
</div>

<br />

## ⚡️ Introduction

**Mentor Lab** is a modern **LMS: Learning Management System** platform built with **React**, **Vite**, **Tailwind CSS**, **ShadCN**, and **Firebase**.
It offers two distinct portals: one for instructors and another for students.

Instructors can create and upload course materials in various formats, including PDFs, PowerPoint presentations (PPTs), quizzes, and YouTube video links.
Students can easily browse, enroll in courses, and access content from different instructors across a variety of subjects.
With its intuitive interface, real-time updates, and flexible content management, Mentor Lab simplifies the learning process for both educators and learners.

## 🎯 Features

- FireBase Authentication
- Storing user generated content in FireStore

## 📁 Folder

Here's the folder structure of the api and app:

```sh
MentorLab
├── src
│   ├── components
│   │   ├── common-form
│   │   │   ├──form-controls.jsx
│   │   │   └──index.jsx
│   │   ├── instructor-view
│   │   │   ├──courses
│   │   │   └──dashboard
│   │   ├── landing
│   │   ├── modals
│   │   ├── student-view
│   │   └── ui
│   ├── config
│   │   └── index.js
│   ├── context
│   │   ├── authContext
│   │   ├── firebase-context
│   │   └── instructor-context
│   ├── lib
│   │   └── utils.js
│   ├── pages
│   │   ├── Auth.jsx
│   │   ├── Hero.jsx
│   │   ├── Student.jsx
│   │   └── Teacher.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css



```

## ⚙️ Installation

Make sure you have [Node.js](https://nodejs.org/en/download/) installed.
Run this followed commands:

To install the api

```bash
# Change directory to api
cd api

# Copy environment variables and Make sure to change them
cp .env.example .env

# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8000
npm run dev
```

To run the web app

```sh
# Change directory to app
cd app
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:3000
npm run dev

# Build for production in the dist/ directory
npm run build
```

## 🌱 Third Party Libraries

- [vercel/next.js](https://github.com/vercel/next.js)
- [expressjs/express](https://github.com/expressjs/express)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)

## 📚️ Roadmap

- [ ] Login with Google and Github
- [ ] AI Integration for creating product description

## ❤️ Acknowledgements

- [plane](https://github.com/makeplane/plane)

## ‍💻 Author

- [@iamsahebgiri](https://github.com/iamsahebgiri)

## ⭐️ Contribute

If you want to say thank you and/or support the active development of betabuzz:

1. Add a GitHub Star to the project.
2. Tweet about the project on your Twitter.
3. Write a review or tutorial on Medium, Dev.to or personal blog.
4. Support the project by donating a cup of coffee.

## 🧾 License

MIT License Copyright (c) 2023 [Saheb Giri](https://github.com/iamsahebgiri).
