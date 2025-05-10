# Pulse
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen)](https://pulse-project-managment.netlify.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub%20Repo-View-blue)](https://github.com/austinxewell/pulse-project-management)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](https://opensource.org/licenses/MIT)

![Pulse Logo](https://i.postimg.cc/Gp5JydPy/pulse-landing.png)

**Pulse** is a modern project management application built with a cutting-edge frontend stack to help you manage and track workflows. Designed for teams and individuals, Pulse offers seamless task management, real-time updates, and project-level dashboards.

[Live Demo](https://pulse-project-managment.netlify.app/) | [GitHub Repo](https://github.com/austinxewell/pulse-project-management)

---

## Overview

**Pulse** is a full-featured project management application built with **Nuxt 3**, **TypeScript**, and **Tailwind CSS**. The platform is designed to help users manage complex workflows with clarity and speed. Pulse includes features such as:

- **Task Management**: Create, organize, and track tasks efficiently.
- **Project-level Dashboards**: Get an overview of your projects and their progress.
- **Collaborative Workspaces**: Work with teams in real-time.
- **User Authentication**: Secure login and account management with **Supabase**.

On the technical side, Pulse integrates **Supabase** for backend services such as authentication and database management, and uses **Pinia** for state management. **Vite** ensures fast builds, while **Reka UI** and **Tailwind CSS** provide consistent, responsive design components.

---

## Features

- **Real-time Feedback**: Instant updates and notifications.
- **Light/Dark Mode**: Toggle between light and dark themes globally.
- **Form Validation**: Inline validation for forms with clear error messages.
- **Task & Project Management**: Detailed tracking of tasks and project timelines.
- **Responsive UI**: Optimized for both desktop and mobile environments.
- **Collaborative**: Real-time updates for all members within a workspace.

---

## Tech Stack

- **Frontend**: 
  - Nuxt 3
  - TypeScript
  - Tailwind CSS
  - Pinia
  - Vite
  - FormKit
  - TanStack Table
  - Reka UI
  - Iconify
  - SweetAlert2
  - FakerJS

- **Backend**:
  - Supabase (Authentication, Database, Real-time)

---

## Screenshots

![Landing Page](https://i.postimg.cc/Gp5JydPy/pulse-landing.png)
*Landing Page - Dark Mode*

![Login](https://i.postimg.cc/bvTph7cJ/pulse-login.png)
*Login Screen*

![Projects](https://i.postimg.cc/vTRr0hN8/pulse-projects.png)
*Project Management Overview*

![Task Management](https://i.postimg.cc/TPdk5SSB/Tasks.png)
*Task Overview*

![Create New Task Form](https://i.postimg.cc/gjHXhM1B/pulse-task-creating.png)
*Creating a New Task*

![Create New Project Form](https://i.postimg.cc/9MTqmXb2/pulse-project-creation.png)
*Creating a New Project*

---

## Setup

To run Pulse locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/austinxewell/pulse-project-management.git
   ```

2. Install dependencies:
   ```bash
   cd pulse-project-management
   npm install
   ```

3. Set up environment variables for Supabase authentication.

4. Run the development server:
    ```bash
    npm run dev
    ```
## Live Demo Access
**Note:** Account creation is disabled due to Supabase limitations on the free-tier project. To explore the full functionality, use the following demo credentials:

- **Email:** austin.ewell86@gmail.com
- **Password:** password

## Contributing
1. Fork the repository
2. Create your feature branch (git checkout -b feature/your-feature)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to the branch (git push origin feature/your-feature)
5. Open a Pull Request

## License
Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.

## Acknowledgements
- Supabase for the backend services.
- Nuxt 3 for the framework.
- Tailwind CSS for styling.
- Pinia for state management.
- Vite for fast development builds.
