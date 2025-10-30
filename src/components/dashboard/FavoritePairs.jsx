import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { POPULAR_PAIRS } from '../../utils/constants';
import '../../styles/components/FavoritePairs.css';

const FavoritePairs = ({ rates, onPairSelect }) => {
  // Persist favorites across sessions
  const [favorites, setFavorites] = useLocalStorage('favoritePairs', POPULAR_PAIRS);

  // Calculate rate for a pair
  const getRate = (from, to) => {
    if (!rates || !rates[from] || !rates[to]) return 0;
    return (rates[to] / rates[from]).toFixed(4);
  };

  // Handle pair click
  const handlePairClick = (pair) => {
    const [from, to] = pair.split('/');
    onPairSelect({ from, to });
  };

  return (
    <div className="favorite-pairs">
      <h2>Popular Currency Pairs</h2>
      <div className="pairs-grid">
        {favorites.map(pair => {
          const [from, to] = pair.split('/');
          const rate = getRate(from, to);
          
          return (
            <div 
              key={pair}
              className="pair-card"
              onClick={() => handlePairClick(pair)}
            >
              <div className="pair-header">
                <h3>{pair}</h3>
                <span className="change positive">↑ 1.2%</span>
              </div>
              <div className="pair-rate">{rate}</div>
              <div className="pair-label">1 {from} = {rate} {to}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FavoritePairs;