import './App.css';
import ImageProfile from './assets/profissao-programador.jpg'
import UserProfile from './assets/user-profile.png'
import SendMessageIcon from './assets/send.png'
import socket from 'socket.io-client';
import { useEffect, useState, useRef } from "react";

const io = socket('http://localhost:4000');

function App() {

  const [userName, setUserName] = useState('');
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setuserId] = useState('');

  useEffect(() => {
    io.on("users", (users) => {
      setUsers(users);
    })
    io.on("message", (message) => setMessages((messages) => [...messages, message]));
    io.on("connect", () => setuserId(io.id))
  }, [])

  const handleJoin = () => {
    if (userName) {
      io.emit("join", userName);
      setJoined(true);
    }
  }

  const textAreaRef = useRef(null);

  const handleTextareaChange = () => {

    const content = textAreaRef.current.value;

    if (content.includes('\n')) {
      const textarea = textAreaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleMessage = () => {
    if (message.trim()) {
      io.emit("message", { message, userName });
      setMessage('');
      if (textAreaRef.current) {
        textAreaRef.current.focus()
      }
    }
  }

  if (!joined) {
    return (
      <form id='form-login' className='container'>
        <h3>Digite seu Nome:</h3>
        <h5>para entrar no chat</h5>

        <input
          type='text'
          className='input-login'
          placeholder='Digite seu nome'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className='button-login' onClick={handleJoin}>Entrar</button>

      </form>
    )
  }

  return (
    <div className="container">

      <div className='back-ground' />

      <div className='chat-container'>
        <div className='chat-contacts'>
          <div className='chat-options'>
            <img src={UserProfile} className='user-profile' alt='' />
            <span className='user-conected-name'>{userName}</span>
          </div>
          <div className='chat-search'>
            <input className='search-input' placeholder='Pesquisar ou começar uma nova conversa' />
          </div>


          <div className='chat-item'>
            <img src={ImageProfile} className='image-profile' alt='' />
            <div className='chat-title-container'>
              <span className='title-message'>Networking profissão programador</span>
              <span className='last-message'>
                {messages.length ? `${messages[messages.length - 1].userName}: ${messages[messages.length - 1].message}` : ''}
              </span>
            </div>
          </div>


        </div>


        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-header'>
              <img src={ImageProfile} className='user-profile' alt='' />
              <div className='chat-title-container'>
                <span className='title-message'>Networking profissão programador</span>
                <span className='last-message'>
                  {users.map((user, index) => (
                    <span key={index}>
                      {user.userName}{index + 1 < users.length && users.length !== 0 ? ', ' : ''}

                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className='chat-messages-area'>
            {messages.map((message, index) => (
              <div key={index} className={message.userName === userName ? 'user-container-message right' : 'user-container-message left'}>
                <span className={message.userName === userName ? 'user-my-message' : 'user-other-message'}>
                  {message.userName !== userName && (
                    <div>
                      <a href={userId} onClick={(e) => {
                        e.preventDefault()
                        console.log(userId);
                      }
                      }>{message.userName}</a>
                    </div>
                  )}
                  {message.message}
                </span>
              </div>
            ))}
          </div>

          <div className='chat-input-area'>
            <input
              className='chat-input'
              placeholder=' Digite uma mensagem'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                handleTextareaChange()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleMessage();
                }
              }}
              ref={textAreaRef}
              currentHeight={textAreaRef.current ? textAreaRef.current.scrollHeight : 0}
            />
            <img className='send-message-icon' src={SendMessageIcon} alt='' onClick={() => handleMessage()} />
          </div>
        </div>



      </div>
    </div>
  );
}

export default App;
