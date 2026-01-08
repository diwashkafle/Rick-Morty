export interface Character { 
    id: number 
    name: string 
    status: 'Alive' | 'Dead' | 'unknown'
    species: string 
    type: string 
    gender: 'Male' | 'Female' | 'Genderless' | 'Unknown'
    origin: Origin
    location : Location
    image: string 
    episode: string[]
    url: string 
    created: string 
}

export interface Origin {
    name: string 
    url: string
}

export interface Location {
    name: string 
    url : string 
}

export interface ApiResponse {
   info:{
     count: number
    pages: number
    next: string | null
    prev: string | null
   }
    results: Character[]
}

export interface GetCharactersParams {
  currentPage?: number;
  debouncedName?: string;
  status?: 'Alive' | 'Dead' | 'unknown' | 'undefined' | 'all';
  species?: 'Human' | 'Alien' | 'unknown' | 'all' | 'undefined' |'Humanoid' | 'Poopybutthole' | 'Mythological Creature' | 'Animal' | 'Robot' | 'Cronenberg' | 'Disease';
  gender?: 'Male' | 'Female' | 'Genderless' | 'unknown' | 'undefined' | 'all';
}