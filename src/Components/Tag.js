import React from "react";
import '../Styles/Tag.css';

export default function Tag(props){
  return (
    <div onClick={() => props.set(prev => !prev)} className={`tag-component-container-${props.status === 'selected' ? 'selected' : 'normal'}`}>
      <p className={`tag-component-${props.status === 'selected' ? 'selected' : 'normal'}`}>{props.name}</p>
    </div>
  );
}