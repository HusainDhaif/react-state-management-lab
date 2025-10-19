// src/App.jsx
import { useState } from 'react';
import './App.css';

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [customImages, setCustomImages] = useState({});
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
    },
  ]);

  const handleAddFighter = (fighter) => {
    if (money < fighter.price) {
      console.log('Not enough money');
      return;
    }

    setTeam([...team, fighter]);

    setZombieFighters(zombieFighters.filter((f) => f.id !== fighter.id));

    setMoney(money - fighter.price);
  };

  const handleRemoveFighter = (fighter) => {
    setTeam(team.filter((f) => f.id !== fighter.id));

    setZombieFighters([...zombieFighters, fighter]);

    setMoney(money + fighter.price);
  };

  const handleImageUpload = (fighterId, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomImages(prev => ({
          ...prev,
          [fighterId]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getFighterImage = (fighter) => {
    return customImages[fighter.id] || fighter.img;
  };

  const handleImageError = (fighterId) => {
    // Create a placeholder image with fighter's name
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    
    // Set background color based on fighter ID for variety
    const colors = ['#0c2d6b', '#033a16', '#262c36', '#3c1e70', '#4b2900', '#5a1e02', '#5e103e', '#67060c', '#ac3220', '#e41f26'];
    const color = colors[(fighterId - 1) % colors.length];
    
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 150, 150);
    
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('150 x 150', 75, 75);
    
    return canvas.toDataURL();
  };

  const totalStrength = team.reduce((sum, fighter) => sum + fighter.strength, 0);
  const totalAgility = team.reduce((sum, fighter) => sum + fighter.agility, 0);

  return (
    <div className="app">
      <h1>Zombie Fighters</h1>
      
      <div className="stats">
        <p>Money: {money}</p>
        <p>Team Strength: {totalStrength}</p>
        <p>Team Agility: {totalAgility}</p>
      </div>
      
      <div className="team-section">
        <h2>Team</h2>
        {team.length === 0 ? (
          <p>Pick some team members!</p>
        ) : (
          <div className="team-grid">
            {team.map((fighter) => (
              <div key={fighter.id} className="fighter-card">
                <img 
                  src={getFighterImage(fighter)} 
                  alt={fighter.name}
                  onError={(e) => {
                    e.target.src = handleImageError(fighter.id);
                  }}
                />
                <h3>{fighter.name}</h3>
                <p>Price: {fighter.price}</p>
                <p>Strength: {fighter.strength}</p>
                <p>Agility: {fighter.agility}</p>
                <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fighters-section">
        <h2>Fighters</h2>
        <div className="fighters-grid">
          {zombieFighters.map((fighter) => (
            <div key={fighter.id} className="fighter-card">
              <div className="image-container">
                <img 
                  src={getFighterImage(fighter)} 
                  alt={fighter.name}
                  onError={(e) => {
                    e.target.src = handleImageError(fighter.id);
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(fighter.id, e)}
                  style={{ display: 'none' }}
                  id={`image-upload-${fighter.id}`}
                />
                <label htmlFor={`image-upload-${fighter.id}`} className="image-upload-label">
                  Change Image
                </label>
              </div>
              <h3>{fighter.name}</h3>
              <p>Price: {fighter.price}</p>
              <p>Strength: {fighter.strength}</p>
              <p>Agility: {fighter.agility}</p>
              <button onClick={() => handleAddFighter(fighter)}>Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
