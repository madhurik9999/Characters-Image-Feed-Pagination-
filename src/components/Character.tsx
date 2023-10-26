import Image from "next/image";
import React, { FC } from "react";

interface CharacterProps {
  imageUrl: string;
  caption: string;
}

const Character: FC<CharacterProps> = ({ imageUrl, caption }) => {
  return (
    <figure className="max-w-lg">
      <Image
        className="h-auto max-w-full rounded-lg relative char-image"
        fill
        sizes="(max-width: 576px) 100vw, (max-width: 768px) 80vw, 60vw, 40vw, 30vw, 20vw"
        alt={caption}
        src={imageUrl}
        priority={true}
      />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 truncate ">
        {caption}
      </figcaption>
    </figure>
  );
};

export default Character;
