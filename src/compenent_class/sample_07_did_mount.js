import React from 'react';
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
    this.props.changeCountOfLike();
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
      commentData : {
        name : '로건',
        comment : '테스트 코멘트',
        isLike : false,
        countOfLike : 5,
        createdAt : '2020-05-17T18:00:00'    
      }
    };
    this.changeCountOfLike = this.changeCountOfLike.bind(this);
  }

  changeCountOfLike() {
    this.setState((state)=>{
      const {commentData} = state;
      return {
        commentData : {
          ...commentData,
          isLike: !commentData.isLike,
          countOfLike: !commentData.isLike ? commentData.countOfLike+1 : commentData.countOfLike-1
        }
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
          <Comment commentData={commentData} changeCountOfLike={this.changeCountOfLike}>
            <div className='icon'>
              <img src={icon} alt='icon' />
            </div>
          </Comment>
        </div>
      </div>
    );
  };
}

export default App;
