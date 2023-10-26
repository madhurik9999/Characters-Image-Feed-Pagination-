// CharacterList.tsx

import React from "react";
import Character from "./Character";
import { CharacterType } from "@/types/character.type";

interface CharacterListProps {
  characters: CharacterType[] | null;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div>
      {characters && (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {characters.map((character) => (
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
