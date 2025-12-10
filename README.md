# OpenLearnAI 🎓

> **AI-Powered Learning Platform** - Transform documents into interactive, structured courses with AI-generated content, quizzes, and personalized learning paths.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://stephenkyaw.github.io/OpenLearnAI/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🌟 Live Demo

**[View Live Demo →](https://stephenkyaw.github.io/OpenLearnAI/)**

Experience OpenLearnAI's modern, intuitive interface and AI-powered learning features.

---

## ✨ Features

### 📚 Course Management
- **AI Course Generation** - Upload documents (PDF, DOCX, TXT) and automatically generate structured courses
- **Interactive Learning** - Engage with AI-enriched content, examples, and multimedia resources
- **Progress Tracking** - Monitor your learning journey with detailed progress indicators
- **Course Library** - Browse and manage all your courses in one place

### 🎯 Learning Experience
- **Structured Content** - Courses organized into modules, lessons, and topics
- **Interactive Quizzes** - AI-generated quizzes with multiple choice, true/false, and open-ended questions
- **Final Exams** - Comprehensive assessments to validate your knowledge
- **External Resources** - Curated links to YouTube videos, articles, and additional learning materials

### 👤 User Features
- **Personal Dashboard** - Overview of active courses, progress, and achievements
- **Profile Management** - Track learning stats, streaks, and earned certificates
- **Settings** - Customize notifications, billing, and appearance preferences
- **Achievements** - Earn badges and XP points for completing courses and maintaining streaks

### 🎨 Modern UI/UX
- **Clean Design** - Minimalist, paper-like aesthetic with high contrast and optimal readability
- **Responsive Layout** - Seamless experience across desktop, tablet, and mobile devices
- **Dark Mode Ready** - Theme preferences for comfortable learning
- **Smooth Animations** - Polished transitions and micro-interactions

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **React 18** + **TypeScript** - Modern, type-safe UI development
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful, consistent iconography

### Backend (Planned)
- **Python** + **FastAPI** - High-performance async API
- **PostgreSQL** - Structured data storage with JSONB support
- **Qdrant** - Vector database for semantic search
- **LangChain** - AI content generation and processing
- **Celery** + **RabbitMQ** - Asynchronous task processing

### AI Capabilities
- **Document Analysis** - Intelligent chunking and embedding generation
- **Course Generation** - Automated structure creation (units, chapters, topics)
- **Content Enrichment** - AI-enhanced explanations and examples
- **Quiz Generation** - Contextual questions and assessments
- **Adaptive Learning** - Personalized recommendations based on performance

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/stephenkyaw/OpenLearnAI.git
cd OpenLearnAI
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Run development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

---

## 📁 Project Structure

```
OpenLearnAI/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── layouts/        # Layout components
│   │   ├── context/        # React context providers
│   │   ├── lib/            # Utility functions
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Backend services (coming soon)
└── README.md
```

---

## 🎨 Key Pages

### Dashboard
- Welcome message and quick actions
- Active course overview with progress
- Stats cards (courses, completions, certificates)
- In-progress courses list

### My Courses
- Grid/List view toggle
- Filter by status (Active, Completed, Generating)
- Search functionality
- Pagination

### Course Detail
- Module-based navigation
- Lesson content with markdown support
- Interactive quizzes and exercises
- Progress tracking
- Final exam

### Profile
- User stats (streak, learning time, XP)
- Skills progress bars
- Recent achievements
- Social links
- Activity heatmap

### Settings
- Profile information management
- Security settings
- Notification preferences
- Billing & subscription
- Theme customization

---

## 🤝 Contributing

OpenLearnAI is **open-source** and welcomes contributions!

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🎨 Improve UI/UX design
- 📝 Enhance documentation
- 🔧 Submit pull requests

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Stephen Kyaw**
- GitHub: [@stephenkyaw](https://github.com/stephenkyaw)
- Email: [info.kyawmyo@gmail.com](mailto:info.kyawmyo@gmail.com)

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide** for the icon set
- **Tailwind CSS** for the styling framework
- **Vite** for the blazing-fast build tool

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Modern UI/UX design
- ✅ Course browsing and navigation
- ✅ Interactive quizzes and exams
- ✅ User profile and settings
- ✅ Responsive design

### Phase 2 (Upcoming)
- 🔄 Backend API integration
- 🔄 AI course generation from documents
- 🔄 Real user authentication
- 🔄 Progress persistence
- 🔄 Certificate generation

### Phase 3 (Future)
- 📱 Mobile app (React Native)
- 🎤 Voice-based exercises
- 📊 Advanced analytics dashboard
- 👥 Collaborative learning features
- 🌐 Multi-language support

---

<div align="center">

**[⭐ Star this repo](https://github.com/stephenkyaw/OpenLearnAI)** if you find it useful!

Made with ❤️ by [Stephen Kyaw](https://github.com/stephenkyaw)

</div>
