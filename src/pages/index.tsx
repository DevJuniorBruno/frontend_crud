import Link from "next/link";
import api from '../services/api';
import { useEffect, useState, FormEvent, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";

interface Data {
  id:string;
  name: string;
}

export default function Dashboard(){

  

  const { createCurso, deleteCurso, editCurso, setEditCursoId} = useContext(AuthContext)

  const [name, setName] = useState("")
  const [itemId, setItemId] = useState("")
  const[data, setData] = useState<Data[]>([]);
  const[loading, setLoading] = useState(true);
  
  useEffect(()=>{

    async function loadApi(){
      const response = await api.get("/cursos")
      console.log(response.data)
      
      setLoading(false)
      setData(response.data)
    }
    
    loadApi()
    

  },[])

  async function handleAddCurso(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    let dataSubmit = {
      name    
    }

    if(itemId){
      await editCurso({name, id:itemId})


    }else{
      await createCurso(dataSubmit)
    }

    
  }

  async function handleRmCurso(id:string){
    

    await deleteCurso(id)

    console.log(id)

  }

  async function handleEditCurso(id:string, name:string){

    setEditCursoId(id)
    setName(name)
    setItemId(id)


    console.log(id, name)
  }


    if(loading){

      return(

        
        <div>
           <Head>
            <title>TODO LIST</title>
          </Head>
          <h2>carregando filmes</h2>
        </div>
      )

    }
      return(

        
        <div>

          <Head>
            <title>TODO LIST</title>
          </Head>

          <h2>Home Page</h2>

          <form onSubmit={handleAddCurso} >
            <input 
              placeholder="Digite seu curso"
              value={name}
              
              onChange={(e)=> setName(e.target.value)}

              >
            </input>

            <button>{itemId ? "Atualizar" : "Add"}</button>
          </form>
  
            {data.map(item=>{
              return(

                <article key={item.id}>

                <strong>{item.name} </strong>

                <button onClick={()=> handleEditCurso(item.id, item.name)} >Edit</button>


                <button onClick={()=> handleRmCurso(item.id)}>Delete</button>

                </article>

              )
          })}


       

    


      <Link href='/about'> Link About </Link>
    </div>
  )
    }
