import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ButtonTooltip = () => {
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Add to your favorites
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement='right'
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button
        style={{
          height: '50px',
          width: '50px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '2px 5px 5px rgba(0,0,0,0.3)',
        }}
      >
        <i
          style={{ color: 'red' }}
          className='fa-solid fa-heart-circle-plus'
        ></i>
      </Button>
    </OverlayTrigger>
  );
};

export default ButtonTooltip;
