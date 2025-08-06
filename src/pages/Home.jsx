import Header from "../components/Header";
import "./Home.css";
import { useState } from "react";
  
function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Header/>
    <section class="hero">
  <h1>Welcome to StudyBuddy</h1>
  <p>Your Smart Companion for Focused Learning</p>
  <button onClick={handleGetStarted}>Get Started</button>
</section>

<section class="section">
  <h2>What You Can Do</h2>
  <p>Take notes, manage tasks, read books, bookmark important resources, and search topics – all in one place.</p>
</section>

<section class="section">
  <h2>Why StudyBuddy?</h2>
  <p>Organized, distraction-free, and built to boost your learning with simplicity, speed, and focus.</p>
</section>
{showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🧠 StudyBuddy Features</h2>
            <ul>
              <li><strong>📝 Notes:</strong> Save and manage your study notes.</li>
              <li><strong>✅ Tasks:</strong> Stay on top of your deadlines.</li>
              <li><strong>📚 Books:</strong> Explore helpful reading material.</li>
              <li><strong>🔍 Search:</strong> Search anything with one click.</li>
              <li><strong>⬇️ Downloads:</strong> Download your notes anytime.</li>
            </ul>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
</div>

  );
}

export default Home;
