import {createContext, ReactNode, useState, Dispatch} from 'react';
import api from "../services/api";

type AuthContextData = {
    createCurso: (credentials: CursoProps) => Promise<void>;
    deleteCurso: (id: string) => Promise<void>;
    editCurso: (credentials: UpdateProps)=> Promise<void>;
    setEditCursoId: Dispatch<string>;
}

type CursoProps = {
    name: string;
}

type UpdateProps = {
    name: string;
    id: string;
}




type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}:AuthProviderProps){
    const[editCursoId, setEditCursoId]= useState("")

    async function createCurso({name}: CursoProps ){
        try{

            const response = await api.post("/curso", {
                name})

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

    async function editCurso({name, id}: UpdateProps){
        try{
           const response =  await api.put(`/curso/update/${id}`,{name})

           setTimeout(()=>{
            window.location.reload()
        },1);
            
        }
        catch(err){
            console.log("erro", err)
        }
    }
       
   return(
    <AuthContext.Provider value={{createCurso, deleteCurso, editCurso, setEditCursoId }}>
    {children}
    </AuthContext.Provider>

   )

}