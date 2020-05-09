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
          <div className='contents'>
            <div>
              <img src={icon} alt='icon' />
            </div>
            <div className='name'>이름</div>
            <div className='comment'>코멘트</div>
          </div>
          <div className='additional_info'>
            <div className='like'>좋아요</div>
            <div className='num_like'>갯수</div>
            <div className='reg_time'>몇분전</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
