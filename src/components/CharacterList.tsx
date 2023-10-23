// CharacterList.tsx

import React from "react";
import Character from "./Character";

interface Character {
  id: number;
  name: string;
  image: string;
  // Add other properties from your data
}

interface CharacterListProps {
  data: {
    results: Character[];
  };
}

const CharacterList: React.FC<CharacterListProps> = ({ data }) => {
  return (
    <div>
      {data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {data.results.map((character) => (
            <div key={character.id + "wrapper"}>
              <Character
                imageUrl={character.image}
                caption={character.name}
                key={character.id}
              ></Character>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
