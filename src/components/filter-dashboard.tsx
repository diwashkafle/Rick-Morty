import React, { useEffect, useState } from "react";
import type { Character } from "../types/character";
import CharacterCard from "./character-card";
import { getCharacters } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCardSkeleton from "./character-card-loading";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

type genderFilter = "all" | "Male" | "Female" | "Genderless" | "unknown";
type statusFilter = "all" | "Alive" | "Dead" | "unknown" | "undefined";
type speciesFilter =
  | "Human"
  | "Alien"
  | "unknown"
  | "all"
  | "undefined"
  | "Humanoid"
  | "Poopybutthole"
  | "Mythological Creature"
  | "Animal"
  | "Robot"
  | "Cronenberg"
  | "Disease";

const FilterDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<string | null>(searchParams.get('page') || "1");
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>(searchParams.get("name") || "");
  const deboucedName = useDebounce<string>(name, 500);

  const status = (searchParams.get("status") as statusFilter) || "all";
  const species = (searchParams.get("species") as speciesFilter) || "all";
  const gender = (searchParams.get("gender") as genderFilter) || "all";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCharacters({
          currentPage,
          deboucedName,
          status,
          species,
          gender,
        });
        if (response && response.results.length > 0) {
          setTotalPage(response.info.pages);
          setCharacters(response.results);
        } else {
          console.log("No characters found");
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
        throw new Error(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    };

    fetchData();
  }, [searchParams]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("status", e.target.value as statusFilter);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("species", e.target.value as speciesFilter);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("gender", e.target.value as genderFilter);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if(deboucedName){
    searchParams.set("name", deboucedName);
    }else {
    searchParams.delete("name");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  },[deboucedName]);
  return (
    <div>
      <section className="flex justify-between gap-10">
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={handleNameChange}
          className="border border-gray-300 rounded-md p-2 mb-4 outline-none"
        />
        <div className="flex items-center gap-5">
          <select
            value={status}
            onChange={handleStatusChange}
            className="border justify-center border-gray-300 rounded-md p-2 px-4 w-full mb-4 "
          >
            <option value="all">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="border border-gray-300 rounded-md p-2 px-4 w-full mb-4"
          >
            <option value="all">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
          <select
            value={species}
            onChange={handleSpeciesChange}
            className="border border-gray-300 rounded-md p-2 px-4 w-full mb-4"
          >
            <option value="all">All Species</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="Poopybutthole">Poopybutthole</option>
            <option value="Mythological Creature">Mythological Creature</option>
            <option value="Animal">Animal</option>
            <option value="Robot">Robot</option>
            <option value="Cronenberg">Cronenberg</option>
            <option value="Disease">Disease</option>
          </select>
        </div>
      </section>
      <section>
        {loading ? (
          <section className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CharacterCardSkeleton />
          </section>
        ) : (
          <>
            {error !== null ? (
              <div className="flex justify-center items-center h-48">
                <div className="text-gray-500 text-2xl flex gap-2 items-center">
                  {" "}
                  <FaRegFaceSadCry />{" "}
                  <span>
                    Character not Found or some error occurred try again
                  </span>
                </div>
              </div>
            ) : (
              <main>
                <section className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {characters &&
                    characters.map((character, index) => {
                      return (
                        <main key={index}>
                          <CharacterCard
                            name={character.name}
                            image={character.image}
                            status={character.status}
                            species={character.species}
                            gender={character.gender}
                          />
                        </main>
                      );
                    })}
                </section>

                <section className="flex justify-center items-center gap-3 mt-6">
                  {/* pagination */}
                  {[...Array(totalPage)].map((_, i) => (
                    <button
                      className="h-10 w-10 border border-gray-200 bg-gray-50"
                      key={i}
                    >
                      {i + 1}
                    </button>
                  ))}
                </section>
              </main>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default FilterDashboard;
