
const FAV_KEY = 'favorite_characters';

export const getFavorites = ():number[] =>{
    const favs = localStorage.getItem(FAV_KEY);
    return favs ? JSON.parse(favs) : [];
}

export const addFavorite = (id:number):void => {
    const favs = getFavorites();
    if(!favs.includes(id)){
        favs.push(id);
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }
}

export const removeFavorite = (id:number):void => {
    const favs = getFavorites();
    const updatedFavs = favs.filter(favId => favId !== id);
    localStorage.setItem(FAV_KEY, JSON.stringify(updatedFavs));
}

export const isFavorite = (id:number):boolean => {
    const favs = getFavorites();
    return favs.includes(id);
}