import React, { useState, useEffect } from 'react';
import icon from './resouces/images/icon.png';
import './App.css';

const getDateDiffFromNow = (from) => {
  const fromDate = new Date(from);
  const nowDate = new Date();
  const diffSecond = (nowDate.getTime() - fromDate.getTime()) / 1000;
  const displayMinute = Math.ceil(diffSecond / 60);
  const displaySecond = Math.ceil(diffSecond % 60);
  return `${displayMinute}분 ${displaySecond}초`;
}

function Comment(props) {
  const {id, name, comment, isLike, countOfLike, createdAt} = props.commentData;
  const [diffTime, setDiffTime] = useState(getDateDiffFromNow(createdAt));
  
  useEffect(()=>{
    let timerID = setInterval(
      () => {
        setDiffTime(getDateDiffFromNow(createdAt));
      },
      1000
    );
    return ()=>{
      clearInterval(timerID);
    };
  });

  function handleLikeClick(e) {
    e.preventDefault();
    props.changeCountOfLike(id);
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
          <div className='reg_time'>{diffTime}전</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [commentData, setCommentData] = useState([
    {
      id : 1,
      name : '로건',
      comment : '테스트 코멘트',
      countOfLike : 5,
      createdAt : '2020-05-17T17:30:00'
    },
    {
      id : 2,
      name : '헐크',
      comment : '코멘트 작성하기',
      countOfLike : 4,
      createdAt : '2020-05-17T17:50:00'
    },
    {
      id : 3,
      name : '아이언맨',
      comment : '코멘트들....',
      countOfLike : 7,
      createdAt : '2020-05-17T17:55:00'
    },
  ]);

  function changeCountOfLike(paramId) {
    const index = commentData.findIndex(({id})=>(id===paramId));
    const selectComment = commentData[index];

    console.log(index);
    setCommentData([
      ...commentData.slice(0, index),
      {
        ...selectComment,
        isLike: !selectComment.isLike,
        countOfLike: !selectComment.isLike ? selectComment.countOfLike+1 : selectComment.countOfLike-1
      },
      ...commentData.slice(index+1)
    ]);
  }
  
  return (
    <div className="App">
      <header className="App-header">
          This is for comment
      </header>
      <div className='App-body'>
        {
          commentData.map((data)=>{
            return (
              <Comment key={data.id} commentData={data} changeCountOfLike={changeCountOfLike}>
                <div className='icon'>
                  <img src={icon} alt='icon' />
                </div>
              </Comment>    
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
