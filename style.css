:root {
  --primary: #FF0000;
  --dark: #0F0F0F;
  --light: #FFFFFF;
  --gray: #272727;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: var(--dark);
  color: var(--light);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 800px;
  height: 90vh;
  background: var(--gray);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.header {
  background: var(--primary);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}

h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.chat-box {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.welcome-msg {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  align-self: center;
  text-align: center;
  margin-bottom: 20px;
}

.message {
  max-width: 80%;
  padding: 12px 15px;
  border-radius: 15px;
  line-height: 1.5;
  word-wrap: break-word;
}

.user-message {
  background: var(--primary);
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.ai-message {
  background: rgba(255, 255, 255, 0.1);
  align-self: flex-start;
  border-bottom-left-radius: 5px;
}

.input-area {
  display: flex;
  padding: 15px;
  gap: 10px;
  background: rgba(0, 0, 0, 0.5);
}

input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--light);
  font-size: 1rem;
}

input:focus {
  outline: 2px solid var(--primary);
}

button {
  padding: 0 25px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

button:hover {
  background: #ff3333;
}

/* Typing animation */
.typing {
  display: inline-block;
}

.typing-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  margin-right: 3px;
  animation: typing 1.5s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: 0s;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.ai-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  display: block;
}
