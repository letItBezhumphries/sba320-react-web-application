import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useContext } from 'react';
import { MonstersContext } from '../context/monsters-context';

const ButtonTooltip = ({ monster }) => {
  const { isFav } = monster;
  console.log('isFav in button tooltip:', isFav);
  const toggleFav = useContext(MonstersContext).toggleFav;

  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Add to your favorites
    </Tooltip>
  );

  const handleToggleClick = () => {
    toggleFav(monster.slug);
  };

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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          backgroundColor: '#fff',
          boxShadow: '2px 5px 5px rgba(0,0,0,0.3)',
          marginLeft: '30px',
        }}
        onClick={handleToggleClick}
      >
        <i
          style={isFav ? { color: 'red' } : { color: 'grey' }}
          className='fa-solid fa-heart-circle-plus fa-2xl'
        ></i>
      </Button>
    </OverlayTrigger>
  );
};

export default ButtonTooltip;
