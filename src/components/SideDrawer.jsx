import React from 'react';
import { useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import MonsterCard from './MonsterCard';
import { MonstersContext } from '../context/monsters-context';

const SideDrawer = ({ show, handleClose }) => {
  const favorites = useContext(MonstersContext).monstersList.filter(
    (monster) => monster.isFav === true
  );

  console.log('in SideDrawer favs:', favorites);
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      responsive='lg'
      placement='end'
      className='side-drawer'
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Favorites</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {favorites.map((fav, idx) => (
          <MonsterCard key={idx} monster={fav} />
        ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideDrawer;
