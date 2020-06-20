import React from 'react';
import icon from './resouces/images/icon.png';
import './App.css';

const getDateDiffFromNow = (from) => {
  const fromDate = new Date(from);
  const nowDate = new Date();
  const diffTime = (nowDate.getTime() - fromDate.getTime()) / 1000;
  const diffSecond = Math.floor(diffTime % 60);
  const diffMinute = Math.floor((diffTime / 60) % 60);
  const diffHour = Math.floor((diffTime / 60 / 60) % 24);
  const diffDay = Math.floor(diffTime / 60 / 60 / 24);
  return diffDay>0 ? `${diffDay}일` : `${diffHour}시간 ${diffMinute}분 ${diffSecond}초`;
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diffTime: getDateDiffFromNow(props.commentData.createdAt)
    };
    // JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다.
    // this.handleLikeClick을 바인딩하지 않고 onClick에 전달하였다면,
    // 함수가 실제 호출될 때 this는 undefined가 됩니다.
    this.handleLikeClick = this.handleLikeClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.setState((state, props)=>{
          return {
            diffTime: getDateDiffFromNow(props.commentData.createdAt)
          }
        })
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleLikeClick(e) {
    e.preventDefault();
    const {id} = this.props.commentData;
    this.props.changeCountOfLike(id);
  }

  render() {
    const {name, comment, countOfLike, isLike} = this.props.commentData;
    const {diffTime} = this.state;

    return (
      <div className='comment_container'>
        {this.props.children}
        <div className='contents'>
          <div className='main_info'>
            <div className='name'>{name}</div>
            <div className='comment'>{comment}</div>
          </div>
          <div className='additional_info'>
            <a href="#" onClick={this.handleLikeClick}>{isLike ? '취소' : '좋아요'}</a>
            <span>&nbsp;·&nbsp;</span>
            <div className='num_like'>{countOfLike}개</div>
            <span>&nbsp;·&nbsp;</span>
            <div className='reg_time'>{diffTime}전</div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData : [
        {
          id : 1,
          name : '로건1',
          comment : '테스트 코멘트1111',
          isLike : false,
          countOfLike : 3,
          createdAt : '2020-06-10T16:10:00'    
        },
        {
          id : 2,
          name : '로건2',
          comment : '테스트 코멘트2222',
          isLike : false,
          countOfLike : 4,
          createdAt : '2020-06-20T14:15:00'    
        },
        {
          id : 3,
          name : '로건3',
          comment : '테스트 코멘트3333',
          isLike : false,
          countOfLike : 5,
          createdAt : '2020-06-20T14:20:00'    
        },
      ]
    };
    this.changeCountOfLike = this.changeCountOfLike.bind(this);
  }

  changeCountOfLike(paramId) {
    this.setState((state)=>{
      const {commentData} = state;
      const index = commentData.findIndex(({id})=>(id===paramId));
      const selectComment = commentData[index];
  
      return {
        commentData : [
          ...commentData.slice(0, index),
          {
            ...selectComment,
            isLike: !selectComment.isLike,
            countOfLike: !selectComment.isLike ? selectComment.countOfLike+1 : selectComment.countOfLike-1
          },
          ...commentData.slice(index+1)    
        ]
      }
    });
  }

  render() {
    const {commentData} = this.state;
    return (
      <div className="App">
        <header className="App-header">
            This is for comment
        </header>
        <div className='App-body'>
          {
            commentData.map((data)=>{
              return (
                <Comment key={data.id} commentData={data} changeCountOfLike={this.changeCountOfLike}>
                  <div className='logo'>
                    <img src={icon} alt='logo' />
                  </div>
                </Comment>    
              );
            })
          }
        </div>
      </div>
    );
  };
}

export default App;
