import React from 'react';
import './App.css';
import Basebread from './components/Basebread';
import TopBread from './components/TopBread';
import Meat from './components/Meat';
import Tomato from './components/Tomato';
import Lettuce from './components/Lettuce';
import { useState } from 'react';

interface BurgerComponent {
  component: JSX.Element;
  id: string;
}

function App() {
  const [burgerComponents, setBurgerComponents] = useState<BurgerComponent[]>([
    { component: <TopBread />, id: 'top-bread' },
    { component: <Basebread />, id: 'base-bread' },
  ]);

  const addComponentToBurger = (component: JSX.Element) => {
    setBurgerComponents([...burgerComponents, { component, id: Date.now().toString() }]);
  };

  const moveComponent = (index: number, direction: 'up' | 'down') => {
    const updatedBurgerComponents = [...burgerComponents];
    const currentIndex = index;

    if (direction === 'up' && currentIndex > 0) {
      [updatedBurgerComponents[currentIndex], updatedBurgerComponents[currentIndex - 1]] = [
        updatedBurgerComponents[currentIndex - 1],
        updatedBurgerComponents[currentIndex],
      ];
    } else if (direction === 'down' && currentIndex < updatedBurgerComponents.length - 1) {
      [updatedBurgerComponents[currentIndex], updatedBurgerComponents[currentIndex + 1]] = [
        updatedBurgerComponents[currentIndex + 1],
        updatedBurgerComponents[currentIndex],
      ];
    }

    setBurgerComponents(updatedBurgerComponents);
  };

  return (
    <div className="App">
      <h1>Customizable Burger</h1>
      <div className="burger">
        {burgerComponents.map((burgerComponent, index) => (
          <div key={burgerComponent.id} className="burger-component">
            <div className="move-buttons">
            {burgerComponent.component}
            {index !== 0 && (
              <button className = "move-button" onClick={() => moveComponent(index, 'up')}>&uarr; Move Up</button>
            )}
            {index !== burgerComponents.length - 1 && (
              <button  className = "move-button" onClick={() => moveComponent(index, 'down')}>&darr; Move Down</button>
            )}
          </div>
          </div>
        ))}
        <div className="ingredient-options">
          <div className="ingredient" onClick={() => addComponentToBurger(<Tomato />)}>
            <span role="img" aria-label="Tomato">
        Tomato
            </span>
          </div>
          <div className="ingredient" onClick={() => addComponentToBurger(<Meat />)}>
            <span role="img" aria-label="Meat">
            Meat
            </span>
          </div>
          <div className="ingredient" onClick={() => addComponentToBurger(<Lettuce />)}>
            <span role="img" aria-label="Lettuce">
              Lettuce
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;