import { TbPointFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import { addFavorite, isFavorite, removeFavorite } from "../utils/favorites";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Male" | "Female" | "Genderless" | "Unknown";
}

const CharacterCard = ({
  id,
  name,
  image,
  status,
  species,
  gender,
}: CharacterCardProps) => {
  const [isFav, setIsFav] = useState<boolean>(false);


  const onFavClick = () => {
    setIsFav(!isFav);
    if (!isFav) {
        console.log('inside if(!isFav), value: ',isFav)
      addFavorite({id,name,image,status,species,gender});
    }
    if (isFav) {
        console.log('inside if(isFav), value: ',isFav)
      removeFavorite(id);
    }
  };

  useEffect(() => {
    const checkIsFav = () => {
      setIsFav(isFavorite(id));
    };

    checkIsFav();
  },[id]);

  return (
    <main className="flex relative flex-col items-center border border-gray-200 bg-[whitesmoke] p-1 rounded-md">
      <section className="py-7 flex flex-col gap-3">
        <img
          className="rounded-md w-48 h-48 sm:w-64 sm:h-64"
          src={image}
          alt={name}
          loading="lazy"
        />
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Link className="hover:underline" to={`/characters/${id}`}>
            {name.length > 20 ? name.slice(0, 15) + "..." : name}
          </Link>
          <p className="border py-0.5 border-gray-200 flex font-semibold items-center rounded-md bg-gray-50 px-1.5 text-[10px] text-gray-600">
            {gender}
          </p>
        </h2>
        <div className="flex items-center gap-2">
          <p className="border border-gray-200 flex font-semibold py-0.5 items-center rounded-md bg-gray-50 px-1.5 text-[10px] text-gray-600">
            Status:
            {status === "Alive" && (
              <span className="text-green-500 font-extrabold text-lg">
                <TbPointFilled />
              </span>
            )}
            {status === "Dead" && (
              <span className="text-red-500 font-extrabold text-lg">
                <TbPointFilled />
              </span>
            )}
            {status === "unknown" && (
              <span className="text-gray-400 font-extrabold text-lg">
                <TbPointFilled />
              </span>
            )}
            <span>{status}</span>
          </p>

          <p className="border py-0.5 border-gray-200 flex font-semibold items-center rounded-md bg-gray-50 px-1.5 text-[10px] text-gray-600">
            Species: {species}
          </p>
        </div>
      </section>
      <div className="absolute right-2 top-2 cursor-pointer">
        <button onClick={onFavClick}>
          {isFav ? (
            <IoHeart className="text-red-500 text-2xl" />
          ) : (
            <IoIosHeartEmpty className="text-2xl" />
          )}
        </button>
      </div>
    </main>
  );
};

export default CharacterCard;
