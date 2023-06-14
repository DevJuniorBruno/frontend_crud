import {createContext, ReactNode, useState, useEffect} from 'react';
import api from "../services/api";

type AuthContextData = {
    createCurso: (credentials: CursoProps) => Promise<void>;
    deleteCurso: (id: string) => Promise<void>;
}

type CursoProps = {
    name: string;
}




type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){

    async function createCurso({name}: CursoProps ){
        try{

            const response = await api.post("/curso", {
                name
            })

            setTimeout(()=>{
                window.location.reload()
            },1);

        }
        catch(err){
            console.log("erro ao criar curso", err)
        }
    }

    async function deleteCurso(id:string ){
      try{
        const response =   await api.delete(`/curso/delete/${id}`)

        setTimeout(()=>{
            window.location.reload()
        },1);

      }
      catch(err){
        console.log("erro:", err)
      }
    }
       
   return(
    <AuthContext.Provider value={{createCurso, deleteCurso }}>
    {children}
    </AuthContext.Provider>

   )

}