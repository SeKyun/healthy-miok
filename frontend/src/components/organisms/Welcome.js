import React from 'react';

const Welcome = (props) => {
  if (!props.warn) {
    return null;
  }
  const { welcome } = props;
  return (
    <div>{{ welcome } ? <div>Miok님 환영합니다!</div> : <div>꺼져!</div>}</div>
  );
};

export default Welcome;
