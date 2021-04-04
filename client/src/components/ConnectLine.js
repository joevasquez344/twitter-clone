import React from 'react';

const ConnectLine = ({lineStyles}) => {
    const styles = {
        line: {
          position: 'absolute',
          top: lineStyles.top,
          left: '50%',
          right: '50%',
          width: '2px',
          height: `calc(100% - ${lineStyles.diff})`,
          background: '#3d5466'
        },
      };
  return <div style={{...styles.line}}></div>;
};



export default ConnectLine;
