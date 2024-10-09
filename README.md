<p align="center">
  <a href="https://github.com/iamsahebgiri/betabuzz">
    <img alt="MentorLab Logo" height="80" src="https://github.com/user-attachments/assets/8e22fe9c-9c46-487e-a3a2-37563a9ddbdf">
  </a>
</p>

<h1 align="center">Mentor Lab</h1>

<div align="center">
  <strong>Learn, Grow, and Achieve with Expert-Led Courses.</strong>
</div>

<br />

## ⚡️ Introduction

**Mentor Lab** is a modern **Learning Management System (LMS)** built using cutting-edge technologies like **React**, **Vite**, **Tailwind CSS**, **ShadCN**, and **Firebase**. It provides two distinct portals, catering to instructors and students alike.

- **Instructors** can create and upload course materials in multiple formats such as PDFs, PowerPoint presentations (PPTs), quizzes, and YouTube video links.
- **Students** can explore courses, enroll, and learn from various instructors across different subjects.

With its intuitive interface, real-time updates, and flexible content management, Mentor Lab simplifies and enhances the learning process for educators and learners.

## 🎯 Features

- **Firebase Authentication** for secure user login and management.
- **Firestore** for storing user-generated content and course data.
- User-friendly interface for both **instructors** and **students**.
- Real-time updates for dynamic learning experiences.

## 📁 Folder Structure

Below is the folder structure of the `MentorLab` project:

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

## ⚙️ Installation

Ensure you have [Node.js](https://nodejs.org/en/download/) installed before proceeding.

To install and run the MentorLab web application:

1. Clone the repository and navigate to the project folder:

   ```bash
   git clone https://github.com/jayshreee10/MentorLab.git
   cd MentorLab
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your Firebase credentials and other configurations.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:8000`.

5. To build the app for production:

   ```bash
   npm run build
   ```

   The optimized output will be in the `dist/` directory.

## 🌱 Third-Party Libraries

MentorLab leverages several powerful libraries and frameworks:

- [Firebase](https://console.firebase.google.com) - For authentication, real-time database, and hosting.
- [Tailwind CSS](https://tailwindcss.com/docs/installation) - Utility-first CSS framework for rapid UI development.
- [ShadCN](https://ui.shadcn.com/docs/installation/vite) - UI components for building modern React applications.

## 📚 Roadmap

Planned features and improvements:

- [ ] Integration with Google and GitHub for seamless login.
- [ ] AI-based product description generator for enhancing course content.

Stay tuned for more exciting updates!

## 👨‍💻 Author

- **Jayshree Sadangi** - [@Jayshree10](https://github.com/jayshreee10)

## ⭐️ Contributing

Want to support the active development of **Mentor Lab**? Here’s how:

1. Give the repository a **star** on GitHub.
2. Share the project on social media like **Twitter** or **LinkedIn**.
3. Write a **review** or tutorial on platforms like **Medium** or **Dev.to**.
4. Buy me a coffee to show your appreciation!
