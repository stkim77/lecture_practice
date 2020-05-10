import React from 'react';
import icon from './resouces/images/icon.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          This is for comment
      </header>
      <div className='App-body'>
        <div className='comment_container'>
          <div className='icon'>
            <img src={icon} alt='icon' />
          </div>
          <div className='contents'>
            <div className='main_info'>
              <div className='name'>로건</div>
              <div className='comment'>테스트 코멘트</div>
            </div>
            <div className='additional_info'>
              <div className='like'>좋아요</div>
              <span>&nbsp;·&nbsp;</span>
              <div className='num_like'>2개</div>
              <span>&nbsp;·&nbsp;</span>
              <div className='reg_time'>5분전</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
