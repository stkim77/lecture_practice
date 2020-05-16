import React from 'react';
import icon from './resouces/images/icon.png';
import './App.css';

const commentData = {
  name : '로건',
  comment : '테스트 코멘트',
  countOfLike : 5,
  createdAt : '2020-05-16T17:40:00'
};

const getDateDiffFromNow = (from) => {
  const fromDate = new Date(from);
  const nowDate = new Date();
  // diffMilliseond is millisecond
  const diffMilliseond = nowDate.getTime() - fromDate.getTime();
  const diffMinute = Math.ceil(diffMilliseond / (1000 * 60));
  return diffMinute;
}

function Comment(props) {
  const {name, comment, countOfLike, createdAt} = props.commentData;
  return (
    <div className='comment_container'>
      {props.children}
      <div className='contents'>
        <div className='main_info'>
          <div className='name'>{name}</div>
          <div className='comment'>{comment}</div>
        </div>
        <div className='additional_info'>
          <a href="#">좋아요</a>
          <span>&nbsp;·&nbsp;</span>
          <div className='num_like'>{countOfLike}개</div>
          <span>&nbsp;·&nbsp;</span>
          <div className='reg_time'>{getDateDiffFromNow(createdAt)}분전</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
          This is for comment
      </header>
      <div className='App-body'>
        <Comment commentData={commentData}>
          <div className='icon'>
            <img src={icon} alt='icon' />
          </div>
        </Comment>
      </div>
    </div>
  );
}

export default App;
