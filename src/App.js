import './App.css';
import ImageProfile from './assets/profissao-programador.jpg'
import UserProfile from './assets/user-profile.png'
import SendMessageIcon from './assets/send.png'

function App() {
  return (
    <div className="container">

      <div className='back-ground' />

      <div className='chat-container'>
        <div className='chat-contacts'>
          <div className='chat-options'>
            <img src={UserProfile} className='user-profile' alt='' />
          </div>
          <div className='chat-search'>Barra de Pesquisa</div>
          <div className='chat-item'>
            <img src={ImageProfile} className='image-profile' alt='' />
            <div className='chat-title-container'>
              <span className='title-message'>Networking profissão programador</span>
              <span className='last-message'>Guilherme: Bom dia!</span>
            </div>
          </div>
          


        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-header'>
              <img src={ImageProfile} className='user-profile' alt='' />
              <div className='chat-title-container'>
                <span className='title-message'>Networking profissão programador</span>
                <span className='last-message'>Guilherme, Sicrano, Bertano</span>
              </div>
            </div>
          </div>
          <div className='chat-messages-area'>

          </div>
          <div className='chat-input-area'>
            <input className='chat-input' placeholder=' Digite uma mensagem' />
            <img className='send-message-icon' src={SendMessageIcon} alt=''/>
          </div>
        </div>



      </div>
    </div>
  );
}

export default App;
