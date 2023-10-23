"use client";
import CharacterList from "@/components/CharacterList";
import Loading from "@/components/Loading";
import PageList from "@/components/PageList";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="block  w-3/5 m-auto text-center mb-11 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Rick And Marty Characters
      </h5>
      {!data ? <Loading></Loading> : ""}
      <div className="mt-11">{data ? <CharacterList data={data} /> : ""}</div>
      <div className="mt-11">
        {data ? <PageList data={data} page={page} setPage={setPage} /> : ""}
      </div>
    </div>
  );
}
