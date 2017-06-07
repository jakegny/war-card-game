import React from 'react';
import Player from '../Player';

const Players = props => {
  return (
    <div>
      {props.game.players
        ? props.game.players.map(player => {
            return (
              <Player
                myId={props.myId}
                player={player}
                clickPlay={props.clickPlay}
              />
            );
          })
        : null}
    </div>
  );
};

export default Players;
