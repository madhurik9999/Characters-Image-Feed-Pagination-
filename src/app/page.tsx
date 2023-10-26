"use client";
import CharacterList from "@/components/CharacterList";
import EpisodeList from "@/components/EpisodesList";
import Loading from "@/components/Loading";
import PageList from "@/components/PageList";
import { Constant } from "@/constants";
import { CharacterType } from "@/types/character.type";
import { EpisodeType } from "@/types/episode.type";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [isSpecificEpisode, setIsSpecificEpisode] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeType | null>(
    null
  );
  const [characterList, setCharacterList] = useState<CharacterType[] | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${Constant.API}character/?page=${page}`);
      const responseData = await response.json();
      setData(responseData);
      setCharacterList(responseData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getCharactersInfo = async (ids: string[]) => {
    try {
      const response = await fetch(
        `${Constant.API}character/${ids.toString()}`
      );
      const responseData = await response.json();
      setIsSpecificEpisode(true);
      setCharacterList(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="block  w-3/5 m-auto text-center  overflow-auto mb-11 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Rick And Marty Characters
      </h5>
      {!data ? <Loading></Loading> : ""}

      <div className="container flex gap-5">
        <div style={{ width: "30%" }}>
          {" "}
          <EpisodeList
            selectedEpisode={selectedEpisode}
            onChange={(characterIds: string[], episode: EpisodeType) => {
              if(episode.id!==selectedEpisode?.id){
                getCharactersInfo(characterIds);
                setSelectedEpisode(episode);
              }else{
                setSelectedEpisode(null);
                setIsSpecificEpisode(false);
                fetchData();
              }
           
              //setCharacterList()
            }}
          ></EpisodeList>
        </div>

        <div style={{ width: "70%" }}>
          <div className="mt-11">
            {selectedEpisode ? (
              <p className="text-left mb-4  text-black-500 dark:text-black-400">
                {selectedEpisode.characters.length} character in episode "
                {selectedEpisode.name}"
              </p>
            ) : (
              ""
            )}{" "}
            {characterList ? <CharacterList characters={characterList} /> : ""}
          </div>
          <div className="mt-11">
            {data && !isSpecificEpisode ? (
              <PageList data={data} page={page} setPage={setPage} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
