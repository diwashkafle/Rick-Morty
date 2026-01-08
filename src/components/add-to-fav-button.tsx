import { useEffect, useState } from 'react'
import { addFavorite, isFavorite, removeFavorite, type CharacterCardProps } from '../utils/favorites';
import { IoHeart } from 'react-icons/io5';
import { IoIosHeartEmpty } from 'react-icons/io';

const AddToFavButton = ({
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
    <div className="absolute right-1 top-2 cursor-pointer">
     <button onClick={onFavClick}>
              {isFav ? (
                <IoHeart className="text-red-500 text-2xl" />
              ) : (
                <IoIosHeartEmpty className="text-2xl" />
              )}
            </button>
      </div>     
  )
}

export default AddToFavButton