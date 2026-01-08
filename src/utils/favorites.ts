
const FAV_KEY = 'favorite_characters';

export interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Male" | "Female" | "Genderless" | "Unknown";
}

export const getFavorites = ():CharacterCardProps[] =>{
    const favs = localStorage.getItem(FAV_KEY);
    return favs ? JSON.parse(favs) : [] as CharacterCardProps[];
}

export const addFavorite = (favCharacters: CharacterCardProps): void => {
  const favs = getFavorites();
  
  const exists = favs.some(fav => fav.id === favCharacters.id);
  
  if (!exists) {
    favs.push(favCharacters);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  }
}

export const removeFavorite = (id:number):void => {
    const favs = getFavorites();
    const updatedFavs = favs.filter(fav => fav.id !== id);
    localStorage.setItem(FAV_KEY, JSON.stringify(updatedFavs));
}

export const isFavorite = (id:number):boolean => {
    const favs = getFavorites();
    return favs.filter(fav=> fav.id === id).length > 0;
}