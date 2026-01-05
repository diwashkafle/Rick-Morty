export interface Character { 
    id: string 
    name: string 
    status: 'alive' | 'dead' | 'unknown'
    species: string 
    type: string 
    gender: 'male' | 'female' | 'genderless' | 'unknown'
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
    count: number
    pages: number
    next: string | null
    prev: string | null
    results: Character[]
}