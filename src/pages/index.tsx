import Link from "next/link";
import api from '../services/api';
import { useEffect, useState, FormEvent, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

interface Data {
  id:string;
  name: string;
}

export default function Dashboard(){

  const { createCurso, deleteCurso} = useContext(AuthContext)

  const [name, setName] = useState("")
  const[data, setData] = useState<Data[]>([]);
  const[loading, setLoading] = useState(true);
  const [ buttonId, setButtonId] = useState("")


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
    
    await createCurso(dataSubmit)
      console.log(name)
  }

  async function handleRmCurso(id:string){
    

    await deleteCurso(id)

    console.log(id)

  }

    if(loading){

      return(
        <div>
          <h2>carregando filmes</h2>
        </div>
      )

    }
      return(
        <div>

          <h2>Home Page</h2>

          <form onSubmit={handleAddCurso} >
            <input 
              placeholder="Digite seu curso"
              onChange={(e)=> setName(e.target.value)}
              >
            </input>

            <button>
              Add
            </button>

          </form>
  
            {data.map(item=>{
              return(

                <article key={item.id}>

                <strong>{item.name} </strong>
                <button onClick={()=> handleRmCurso(item.id)}>Excluir</button>

                </article>

              )
          })}


       

    


      <Link href='/about'> Link About </Link>
    </div>
  )
    }
