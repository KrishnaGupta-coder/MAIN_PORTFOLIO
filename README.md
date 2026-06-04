# Interactive 3D Portfolio — Next-Gen AI & HCI Interfaces

An immersive, cyber-themed interactive portfolio built using **React, Vite, Three.js, and Framer Motion**. It showcases cutting-edge human-computer interaction (HCI) designs, deep learning tools, and automated system simulations.

---

## 🚀 Live Features & Interactive Simulators

This portfolio is built as an interactive developer terminal console, offering several custom modules:

### 1. 🌐 WebGL Nodes Constellation (Three.js)
A custom background rendering flowing 3D spatial points. Moving your mouse alters the camera perspective, and lines dynamically link nodes when they float close to one another.

### 2. 🌍 3D Skills Orbit Sphere (Canvas 2D)
A custom-engineered 3D globe plotting technical tags on latitude and longitude lines. It features glowing intersection dots and is fully interactive—you can click and drag to manually rotate the tag sphere.

### 3. 🖐️ ZeroTouchSec Simulator (Gesture Control)
Simulates a touchless hand-tracking system (PyTorch + OpenCV). When activated, moving your mouse over the radar zone mimics gestures:
* **Swipe Left/Right**: Swipes slides
* **Top Hover**: Toggles Play/Pause
* **Bottom Hover**: Mutes volume
* **Center Hover**: Scales volume relative to vertical position

### 4. 📊 AI Campus Attendance Tracker Console
Simulates a face recognition attendance pipeline matching facial crops against a Qdrant Vector Database with sub-millisecond search latencies.

### 5. 🚨 Smart Disaster Agent (SDA) Warning Broadcast
Demonstrates an early hazard warning platform. Select a disaster category, set the danger radius, and dispatch a simulated warning broadcast through offline cellular and SMS fallback nodes.

### 6. ⚡ Holographic Transmission Form
A hacker-console styled contact form integrated with **EmailJS** for real-world message delivery directly to your inbox.

---

## 🛠️ Technology Stack

* **Frontend Framework**: [React (Vite)](https://react.dev/)
* **3D Graphics & Math**: [Three.js](https://threejs.org/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Email Transmission Service**: [EmailJS](https://www.emailjs.com/)
* **Styling**: Cyberpunk-themed custom CSS variables, Glassmorphism, and slow-pulse Aurora layers.

---

## 📂 Project Structure

```bash
├── dist/                  # Optimized build folder
├── src/
│   ├── App.css            # Stylesheets with custom variables & animations
│   ├── App.jsx            # Core layout, simulators, & form handling
│   ├── index.css          # Base styles & typography configurations
│   └── main.jsx           # Entry point
├── index.html             # HTML Shell
├── vite.config.js         # Build configuration
└── package.json           # Project dependencies & scripts
```

---

## 💻 Local Installation & Setup

To run this portfolio locally on your machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KrishnaGupta-coder/MAIN_PORTFOLIO.git
   cd MAIN_PORTFOLIO
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## ✉️ Setting up the Live Email Transmission (EmailJS)

To connect the contact form to your own email address:
1. Register a free account at [EmailJS](https://www.emailjs.com/).
2. Create an Email Service connected to your inbox.
3. Create an Email Template with placeholders: `{{from_name}}`, `{{reply_to}}`, and `{{message}}`.
4. In `src/App.jsx` (under `handleContactSubmit`), replace the placeholder keys with yours:
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID';
   const templateId = 'YOUR_TEMPLATE_ID';
   const publicKey = 'YOUR_PUBLIC_KEY';
   ```

---

## 🧑‍💻 Developer Context
* **Developer**: Krishna Gupta
* **Education**: B.Tech in Artificial Intelligence & Data Science, Arya College of Engineering & IT (2024 - 2028).
* **Focus**: Machine Learning, Computer Vision, HCI, Vector DBs (Qdrant).
