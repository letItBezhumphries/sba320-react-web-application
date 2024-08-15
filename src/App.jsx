import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MonstersScreen from './screens/MonstersScreen';
import DungeonScreen from './screens/DungeonScreen';
import CharacterScreen from './screens/CharacterScreen';

function App() {
  return (
    <div id='app'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/monsters' element={<MonstersScreen />} exact></Route>
          <Route path='/characters' element={<CharacterScreen />} exact></Route>
          <Route path='/dungeons' element={<DungeonScreen />} exact></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
