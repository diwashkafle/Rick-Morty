import React, { useCallback, useEffect, useState } from "react";
import type { Character } from "../types/character";
import CharacterCard from "./character-card";
import { getCharacters } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCardSkeleton from "./character-card-loading";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "./pagination";
import { BsToggleOn } from "react-icons/bs";
import { BsToggleOff } from "react-icons/bs";
import { getFavorites, type CharacterCardProps } from "../utils/favorites";

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
  const [favCharacters, setFavCharacters] = useState<CharacterCardProps[]>(()=> getFavorites());
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>(searchParams.get("name") || "");
  const deboucedName = useDebounce<string>(name, 500);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const status = (searchParams.get("status") as statusFilter) || "all";
  const species = (searchParams.get("species") as speciesFilter) || "all";
  const gender = (searchParams.get("gender") as genderFilter) || "all";
  const [isFavButton, setIsFavButton] = useState<boolean>(false);

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
    if (deboucedName) {
      searchParams.set("name", deboucedName);
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    } else {
      searchParams.delete("name");
      setSearchParams(searchParams);
    }
  }, [deboucedName]);


  const handlePaginationButton = useCallback((pageNo: number | undefined): void => {
    window.scrollTo(0, 0);
    if (!pageNo) return;
    searchParams.set("page", pageNo.toString());
    setSearchParams(searchParams);
  },[searchParams,setSearchParams])

  const handleFavButton = () => {
    const favButtonState = !isFavButton;
    setIsFavButton(favButtonState);
    if(favButtonState){
      const favs = getFavorites();  
      setFavCharacters(favs);
    }
  }
  return (
    <div>
      <section className="flex flex-col sm:flex-row items-center justify-between sm:gap-10 mb-4">
        <div className="flex items-center">
          <input
          disabled={isFavButton}
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={handleNameChange}
          className="border border-gray-300 h-9 text-xs px-2 md:px-4 md:text-base rounded-md p-2 outline-none"
        />
       <button 
       onClick={handleFavButton}
       className={`border gap-1 text-[12px] flex items-center h-9 md:text-base border-gray-300 text-gray-800 px-4 p-2 rounded-md m-2 ${isFavButton ? 'bg-green-100 border-green-400' : 'bg-white hover:bg-gray-100'}`}>
        Favorites {isFavButton ? <BsToggleOn color="green" size={20}/> : <BsToggleOff size={20}/>}
       </button>
        </div>

      
        <div className="flex items-center gap-1 lg:gap-5">
          <select
          disabled={isFavButton}
            value={status}
            onChange={handleStatusChange}
            className="border justify-center border-gray-300 rounded-md text-xs px-2 md:px-4 md:text-base p-2 w-full "
          >
            <option value="all">All Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <select
          disabled={isFavButton}
            value={gender}
            onChange={handleGenderChange}
            className="border border-gray-300 rounded-md text-xs px-2 md:px-4 md:text-base p-2 w-full "
          >
            <option value="all">All Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
          <select
          disabled={isFavButton}
            value={species}
            onChange={handleSpeciesChange}
            className="border border-gray-300 text-xs px-2 md:px-4 md:text-base  rounded-md p-2  w-full"
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
          <section className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CharacterCardSkeleton />
          </section>
        ) : (
          <>
            {error !== null ? (
              <div className="flex justify-center items-center h-48">
                <div className="text-gray-500 text-2xl flex gap-2 items-center">
                  <FaRegFaceSadCry />
                  <span>
                    Character not Found or some error occurred try again
                  </span>
                </div>
                <button>Reset</button>
              </div>
            ) : (
              <main>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
                 {
                  !isFavButton ? <>
                   {characters &&
                    characters.map((character, index) => {
                      return (
                        <main key={index}>
                          <CharacterCard
                            id={character.id}
                            name={character.name}
                            image={character.image}
                            status={character.status}
                            species={character.species}
                            gender={character.gender}
                          />
                        </main>
                      );
                    })}
                  </>:<>
                  {favCharacters &&
                    favCharacters.map((character, index) => {
                      return (
                        <main key={index}>
                          <CharacterCard
                            id={character.id}
                            name={character.name}
                            image={character.image}
                            status={character.status}
                            species={character.species}
                            gender={character.gender}
                          />
                        </main>
                      ); 
                    })}
                  </>
                 }
                </section>

                {
                  !isFavButton && 
                  <section className="flex justify-center items-center gap-3 mt-6">
                  <Pagination
                    totalPages={totalPage}
                    currentPage={currentPage}
                    onPageChange={handlePaginationButton}
                  />
                </section>
                }
              </main>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default FilterDashboard;
