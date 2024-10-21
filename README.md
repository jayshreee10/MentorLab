<p align="center">
  <a href="">
    <img alt="MentorLab Logo" height="80" src="https://github.com/user-attachments/assets/8e22fe9c-9c46-487e-a3a2-37563a9ddbdf">
  </a>
</p>

<h1 align="center">MentorLab</h1>

<div align="center">
  <strong>Learn, Grow, and Achieve with Expert-Led Courses.</strong>
</div>

<br />

## ⚡️ Introduction

**MentorLab** is a modern **Learning Management System (LMS)** designed to empower both educators and learners with a streamlined digital experience. Built using technologies like **React**, **Vite**, **Tailwind CSS**, **ShadCN-UI**, **Node.js**, **Express.js**, **MongoDB**, and **Firebase**, MentorLab offers two tailored portals for instructors and students:

- **Instructors** can create, manage, and share course materials in various formats, including PDFs, PowerPoint presentations, quizzes, and video links from YouTube.
- **Students** can discover courses, enroll, and learn at their own pace from a wide range of subjects.

With real-time updates and intuitive navigation, MentorLab enhances the learning process, making it accessible and enjoyable for everyone.

## 🎯 Key Features

- **Secure Authentication**: Node.js and Express.js handle user authentication using JWT tokens.
- **MongoDB**: Manages all user-generated content and course data efficiently.
- **Intuitive UI**: Designed for ease of use for both instructors and students.
- **Real-Time Learning**: Dynamic updates ensure the learning environment remains engaging and up-to-date.

## 📂 Project Structure

Here is the folder structure for the `MentorLab` project:

```sh
MentorLab
├── src
│   ├── components
│   │   ├── common-form
│   │   │   ├── form-controls.jsx
│   │   │   └── index.jsx
│   │   ├── instructor-view
│   │   │   ├── courses
│   │   │   └── dashboard
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

## ⚙️ Installation Guide

To get started with MentorLab, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jayshreee10/MentorLab.git
   cd MentorLab
   ```

2. **Set Up Environment Variables**:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file with your Firebase credentials and necessary configurations.

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:3000`.

5. **Build the Application**:

   For production builds, use:

   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist/` directory.

6. **Set Up the Server-Side Code**:

   Clone and configure the server-side API for MentorLab:

   ```bash
   git clone https://github.com/jayshreee10/MentorLabApi.git
   ```

## 🌱 Third-Party Libraries

MentorLab leverages the following libraries and tools to ensure optimal performance and a great user experience:

- **[ExpressJS](https://expressjs.com/)**: For backend API handling.
- **[MongoDB](https://www.mongodb.com/)**: For a robust, real-time database.
- **[Firebase](https://firebase.google.com/)**: For secure storage and hosting.
- **[Tailwind CSS](https://tailwindcss.com/)**: For rapid and efficient UI development.
- **[ShadCN-UI](https://ui.shadcn.com/)**: For modern UI components with Vite integration.

## 📅 Roadmap

Here's what I plan to add in future releases:

- [ ] **GitHub Integration**: Enable seamless GitHub login for users.
- [ ] **Profile Pages**: Instructor and student profiles.
- [ ] **Course Progress Tracking**: Allow students to track their learning progress.
- [ ] **Course Enrollment and Purchases**: Streamline enrollment and payment.
- [ ] **Creator Payment Page**: View and manage payment details.

Stay tuned for exciting new features!

## 👤 Author

- **Jayshree Sadangi** - [@Jayshree10](https://github.com/jayshreee10)

## ⭐️ Contributing

Support the ongoing development of **MentorLab** by:

1. Starring this repository on GitHub.
2. Sharing the project with your network on **Twitter** and **LinkedIn**.
3. Writing tutorials or reviews on platforms like **Medium** or **Dev.to**.
4. Buying me a coffee to show appreciation!

---
