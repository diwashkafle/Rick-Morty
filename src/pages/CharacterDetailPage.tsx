import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCharactersById } from '../services/api';
import type { Character } from '../types/character';

const CharacterDetailPage =  () => {
    const {id } = useParams<{id: string}>();
    const [responseCharacter, setResponseCharacter] = React.useState<Character | null>(null);

    useEffect(()=>{
        if(!id){
        return ;
    }
     const getCharacterDetails = async () => {
        try {
        const responseCharacter = await getCharactersById( parseInt(id));
            setResponseCharacter(responseCharacter);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
        }
    }
   

    getCharacterDetails();

    },[id])

    if(!responseCharacter){
        return <div>
            Character not found.
        </div>
    }
  return (
    <main>
       
    </main>
  )
}

export default CharacterDetailPage