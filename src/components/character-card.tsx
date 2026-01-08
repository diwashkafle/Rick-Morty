import { TbPointFilled } from "react-icons/tb";
import React from "react";
import { type CharacterCardProps } from "../utils/favorites";
import { Link } from "react-router-dom";
import AddToFavButton from "./add-to-fav-button";

const CharacterCard = React.memo(
    ({
  id,
  name,
  image,
  status,
  species,
  gender,
}: CharacterCardProps) => {

  return (
    <main className="flex  xl:w-75 relative flex-col items-center border border-gray-200 bg-[whitesmoke] p-1 rounded-md">
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
      
       <AddToFavButton
          id={id}
          name={name}
          image={image}
          status={status}
          species={species}
          gender={gender}
        />
    </main>
  );
}

);

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
