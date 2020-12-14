import React from 'react';

import './Button.scss';

const Button = (props) => {
  const caption = props.caption;
  const action = props.action;

  return (
    <button onClick={action}>{caption}</button>
  )
}

export default Button;
