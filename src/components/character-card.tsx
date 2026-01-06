import { TbPointFilled } from "react-icons/tb";

interface CharacterCardProps {
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'Unknown';
}

const CharacterCard = ({
  name,
  image,
  status,
  species,
  gender
}: CharacterCardProps) => {
  return (
    <main className="flex flex-col items-center border border-gray-200 rounded-md">
      <section className="py-7 flex flex-col gap-3">
        <img className="rounded-md" src={image} alt={name} loading="lazy" />
        <h2 className="text-lg font-semibold flex items-center gap-2">
            {name.length>20 ? name.slice(0,20) + "..." : name}
        <p className="border py-0.5 border-gray-200 flex font-semibold items-center rounded-2xl bg-gray-50 px-3 text-xs text-gray-600">{gender}</p>
        </h2>
        <div className="flex items-center gap-2">
          <p className="border border-gray-200 flex font-semibold py-0.5 items-center rounded-2xl bg-gray-50 px-3 text-xs text-gray-600">
            Status:
            {status === "Alive" && (
              <span className="text-green-500 font-extrabold text-lg"><TbPointFilled/></span>
            )}
            {status === "Dead" && (
              <span className="text-red-500 font-extrabold text-lg"><TbPointFilled/></span>
            )}
            {status === "unknown" && (
              <span className="text-gray-400 font-extrabold text-lg"><TbPointFilled/></span>
            )}
            <span>{status}</span>
          </p>
          
          <p className="border py-0.5 border-gray-200 flex font-semibold items-center rounded-2xl bg-gray-50 px-3 text-xs text-gray-600">Species: {species}</p>
        </div>
      </section>
    </main>
  );
};

export default CharacterCard;
