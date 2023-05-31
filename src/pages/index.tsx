import Link from "next/link";
import api from '../services/api';
import { useEffect, useState } from "react";

interface Data {
  id:string;
  name: string;
}

export default function Dashboard(){

  const[data, setData] = useState<Data[]>([]);
  const[loading, setLoading] = useState(true)

  useEffect(()=>{

    async function loadApi(){
      const response = await api.get("/cursos")
      console.log(response.data)

      setData(response.data)
      setLoading(false)

      const names = data.map(item=> item.name)

      console.log(names)
    }

    loadApi()
    

  },[])

  


    if(!loading){
      return(
        <>

          <h2>Home Page</h2>

            {data.map(item=>{
              return(

                <article>

                <strong>{item.name}</strong>

                </article>

              )
          })}


       

    


      <Link href='/about'> Link About </Link>
    </>
  )
    }else{
      return(
        <>
          <p>Loading...</p>
        </>
      )
    }
}