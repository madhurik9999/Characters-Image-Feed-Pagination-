import { Constant } from "@/constants";
import { EpisodeType } from "@/types/episode.type";
import { useState, useEffect, useRef } from "react";

interface EpisodeListProps {
  onChange?: (characterIds: string[], episode: EpisodeType) => void;
  selectedEpisode?: EpisodeType | null;
}

const EpisodeList: React.FC<EpisodeListProps> = (props) => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLUListElement | null>(null);

  const fetchEpisodes = async (page: number) => {
    try {
      const response = await fetch(`${Constant.API}episode?page=${page}`);
      const responseData = await response.json();
      setEpisodes((prevEpisodes) => [...prevEpisodes, ...responseData.results]);
      setTotalPages(responseData.info.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  // Add an event listener to detect when the user has scrolled to the bottom
  useEffect(() => {
    const onScroll = () => {
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.scrollHeight -
          scrollContainerRef.current.clientHeight <=
          scrollContainerRef.current.scrollTop
      ) {
        if (currentPage < totalPages && !loading) {
          setLoading(true);
          setCurrentPage(currentPage + 1);
        }
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", onScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, [currentPage, totalPages, loading]);

  const getCharacterIds = (episode: EpisodeType): string[] => {
    const characterIds = episode.characters.map((characterUrl) => {
      // Split the URL by '/' and get the last segment, which is the character ID
      const segments = characterUrl.split("/");
      return segments[segments.length - 1];
    });
    return characterIds;
  };

  return (
    <>
      <h6 className="text-lg font-bold dark:text-white border-b-2 pb-1 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        Episodes
      </h6>
      <ul
        ref={scrollContainerRef}
        className="max-w-md mt-4 divide-gray-200 dark:divide-gray-700  overflow-x-hidden p-2"
        style={{ maxHeight: "85vh", overflowY: "auto" }}
      >
        {episodes.map((episode) => (
          <li className="pb-0 text-left" key={episode.id}>
              <button
                onClick={() => {
                  props.onChange && props.onChange(getCharacterIds(episode), episode);
                }}
                type="button"
                className={`py-2.5 w-full max-w-md px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                  episode.id === props.selectedEpisode?.id ? 'bg-blue-700 hover:bg-blue-800 text-white hover:text-white' : ''
                }`}
              >
                {episode.name}
              </button>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </>
  );
};

export default EpisodeList;
