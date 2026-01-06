import React, { useEffect, useState } from 'react'
import type { Character } from '../types/character';
import CharacterCard from './character-card';
import { getCharacters } from '../services/api';

type genderFilter = 'all' | 'Male' | 'Female' | 'Genderless' | 'unknown';
type statusFilter = 'all' | 'Alive' | 'Dead' | 'unknown' | 'undefined';
type speciesFilter = 'Human' | 'Alien' | 'unknown' | 'all' | 'undefined' |'Humanoid' | 'Poopybutthole' | 'Mythological Creature' | 'Animal' | 'Robot' | 'Cronenberg' |'Disease';


const FilterDashboard = () => {
    const [status, setStatus] = useState<statusFilter>('all');
    const [species, setSpecies] = useState<speciesFilter>('all');
    const [gender, setGender] = useState<genderFilter>('all');
    const [name, setName] = useState<string>('');
    const [characters, setCharacters] = useState<Character[]>([]);
    const [page, setPage] = useState<number>(1);


   useEffect(()=>{
     const fetchData = async () => {
       try {
         const response = await getCharacters({
            page,name,status,species,gender});
            if(response && response.results.length > 0){
                setCharacters(response.results);
            }else{
                console.log('No characters found');
            }
       } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
       }
      }

    fetchData();
  },[status, species, gender, name, page])
    
   
  return (
    <div>
        <section className='flex justify-between gap-10'>
            <input
            type='text'
            placeholder='Search by name'
            value={name}
            onChange={(e)=> setName(e.target.value as string)}
            className='border border-gray-300 rounded-md p-2 mb-4 outline-none'
            />
            <div className='flex items-center gap-5'>
                <select value={status} onChange={(e)=> setStatus(e.target.value as statusFilter)} className='border justify-center border-gray-300 rounded-md p-2 px-4 w-full mb-4 '>
                    <option value='all'>All Status</option>
                    <option value='Alive'>Alive</option>
                    <option value='Dead'>Dead</option>
                    <option value='unknown'>Unknown</option>
                </select>
                 <select value={gender} onChange={(e)=> setGender(e.target.value as genderFilter)} className='border border-gray-300 rounded-md p-2 px-4 w-full mb-4'>
                    <option value='all'>All Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Genderless'>Genderless</option>
                    <option value='unknown'>unknown</option>
                </select>
                <select value={species} onChange={(e)=> setSpecies(e.target.value as speciesFilter)} className='border border-gray-300 rounded-md p-2 px-4 w-full mb-4'>
                    <option value='all'>All Species</option>
                    <option value='Human'>Human</option>
                    <option value='Alien'>Alien</option>
                    <option value='Humanoid'>Humanoid</option>
                    <option value='Poopybutthole'>Poopybutthole</option>
                    <option value='Mythological Creature'>Mythological Creature</option>
                    <option value='Animal'>Animal</option>
                    <option value='Robot'>Robot</option>
                    <option value='Cronenberg'>Cronenberg</option>
                    <option value='Disease'>Disease</option>
                </select>

            </div>
        </section>
        <section className='grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
            characters && characters.map((character,index)=>{
                return <main key={index}>
                    <CharacterCard
                    name={character.name}
                    image={character.image}
                    status={character.status}
                    species={character.species}
                    gender={character.gender}
                    />
                </main>
            })
        }
        </section>
    </div>
  )
}

export default FilterDashboard