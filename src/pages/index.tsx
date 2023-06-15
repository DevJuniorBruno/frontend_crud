import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import api from '../services/api';
import { useEffect, useState, FormEvent, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import styles from '../../styles/home.module.scss'

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
      const response = await api.get("/cursos");
      
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
        <div className={styles.container} >
           <Head>
            <title>TODO LIST</title>
          </Head>
          <h2>carregando tarefas</h2>
        </div>
      )
    }
      return( 
        <div className={styles.container} >
          <Head>
            <title>TO DO LIST</title>
          </Head>
          <div className={styles.containerSection} >
          <div className={styles.todoList} >
            <h2 className={styles.h2} >Tarefas</h2>
              <form className={styles.form} onSubmit={handleAddCurso} >
                <input 
                  placeholder="Escreva sua tarefa"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                  >
                </input>
                <button>{itemId ? <AiFillEdit /> : <AiOutlinePlus />}</button>
              </form>
          </div>
            {data.map(item=>{
              return(
                <article className={styles.list}  key={item.id}>
                <strong>{item.name} </strong>
                <div>
                <button onClick={()=> handleEditCurso(item.id, item.name)} ><AiFillEdit/></button>
                <button onClick={()=> handleRmCurso(item.id)}><AiFillDelete/></button>
                </div>
                </article>
              )
          })}
          </div>    
    </div>
  )
    }