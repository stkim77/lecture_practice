import React, { useState } from 'react';
import icon from './resouces/images/icon.png';
import './App.css';

const getDateDiffFromNow = (from) => {
  const fromDate = new Date(from);
  const nowDate = new Date();
  // diffMilliseond is millisecond
  const diffMilliseond = nowDate.getTime() - fromDate.getTime();
  const diffMinute = Math.ceil(diffMilliseond / (1000 * 60));
  return diffMinute;
}

function Comment(props) {
  // const [isLike, setLike] = useState(false);
  const {name, comment, isLike, countOfLike, createdAt} = props.commentData;
  function handleLikeClick(e) {
    e.preventDefault();
    props.changeCountOfLike();
  }

  return (
    <div className='comment_container'>
      {props.children}
      <div className='contents'>
        <div className='main_info'>
          <div className='name'>{name}</div>
          <div className='comment'>{comment}</div>
        </div>
        <div className='additional_info'>
          <a href="#" onClick={handleLikeClick}>{isLike ? '취소' : '좋아요'}</a>
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
  const [commentData, setCommentData] = useState({
    name : '로건',
    comment : '테스트 코멘트',
    countOfLike : 5,
    createdAt : '2020-05-17T12:20:00'
  });

  function changeCountOfLike() {
    setCommentData({
      ...commentData,
      isLike: !commentData.isLike,
      countOfLike: !commentData.isLike ? commentData.countOfLike+1 : commentData.countOfLike-1
    });
  }
  
  return (
    <div className="App">
      <header className="App-header">
          This is for comment
      </header>
      <div className='App-body'>
        <Comment commentData={commentData} changeCountOfLike={changeCountOfLike}>
          <div className='icon'>
            <img src={icon} alt='icon' />
          </div>
        </Comment>
      </div>
    </div>
  );
}

export default App;
