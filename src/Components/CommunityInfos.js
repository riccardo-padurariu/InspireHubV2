import React from "react";
import '../Styles/Quote.css';
import img from '../Assets/Image.svg';
import pfp from '../Assets/User.svg';

export default function CommunityInfo(props) {

  const aiStyle = {
    background: 'linear-gradient(90deg, #244CA1 0%, #872341 100%)'
  }

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let postOfTheDay = {};
  const list = props.postsList || [];
  day = date.getDate();
  month = date.getMonth()+1;
  year = date.getFullYear();
  hour = date.getHours();
  minutes = date.getMinutes();
  //console.log(day);
  //console.log(month);
  //console.log(year);
  //console.log(hour);
  //console.log(minutes);
  let max = -1;
  for(let i=0;i<list.length;i++){
    if(list[i].likes > max){
      max = list[i].likes;
      postOfTheDay=list[i];
    }
  }
  //console.log(postOfTheDay);

  return (
    <div className="quote-main-div">
      <div className="quote-container" style={aiStyle}>
        <p className="quote-title" style={{fontSize: 32 + 'px',margin: 0 + 'px'}}>Welcome to the InspireHub Community Forum</p>
        <p className="quote-description" style={{margin: 0 + 'px'}}>Got a question, idea, or need support? Share it here! This is a space where people help each other, grow together, and spark inspiration. </p>
        <p className="quote-description" style={{margin: 0 + 'px',fontWeight: 700}}>Let’s build progress — together.</p>
      </div>
      <div className="more-quotes-container day-container">
        <p className="more-quotes-title">Post Of The Day!</p>
        <div className="day-post-div">
            <div className="day-post-info day-p">
                <p className="user-day-post day-p">By User: {postOfTheDay.user}</p>
                <p className="user-day-inspire-points day-p">With {postOfTheDay.likes} Inspire Points</p>
                <p className="day-title-post day-p">{postOfTheDay.postName}</p>
            </div>
            <div className="img-day">
                <img src={pfp}></img>
            </div>
        </div>
      </div>
    </div>
  );
}