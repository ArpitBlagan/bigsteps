import React,{useState} from 'react'
import { useGetByNameQuery, useGetByTypeQuery } from '../services/pokemon';
import {motion} from 'framer-motion'
import { Puff } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom';
const Search = () => {
  const [show,setS]=useState(false);
  const navigate=useNavigate();
  const types=["none","normal","fighting","flying","poison","ground","rock","bug",
  "ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"];
  const[click,setC]=useState(false);
  const [val,setVal]=useState({vall:"none",index:-1});
  const [text,setT]=useState("");
  const [ff,setFf]=useState({text:"",index:-1});
  const [loading,setL]=useState(false);
  const {data:data1,isLoading:load1}=useGetByNameQuery(ff.text); console.log("text",data1);
  const {data:data2,isLoading:load2}=useGetByTypeQuery(ff.index); console.log("filter",data2);

  const handleClick=()=>{
    setL(true);
    setFf({text:text,index:val.index});
    setTimeout(()=>{setL(false)},2000);
    setS(true);
  }
  return (
    <div className='font-thin mt-2'>
      <div className='flex flex-col gap-2 md:flex-row items-center justify-around mx-2 md:mt-3'>
          <input className='border-[2px] border-gray-300 p-3 rounded-lg w-full md:w-[50%]' 
          placeholder='search valid pokemon by their name or id...' value={text} onChange={(e)=>{
            setT(e.target.value);setS(false);
          }}/>
          <div className='relative'><button 
            className='flex items-center bg-violet-500 py-3 px-4 rounded-lg'
            onClick={(e)=>{
              e.preventDefault();
              setC(!click);
            }}
          >Filter by ID: &nbsp;<span className=' font-bold text-red-400'> {val.vall.toUpperCase()}</span>
          <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>
        {click?<div className='absolute z-50 bg-white p-2 mt-1 h-[140px] w-full overflow-y-scroll border-[2px] border-violet-300 rounded-xl'>
            <ul className='px-2'>
              {types.map((ele,index)=>{
                  return <li key={index} 
                  onClick={()=>{
                    setS(false);
                    setVal({vall:ele,index});
                    setC(false);
                  }}
                  className=' cursor-pointer my-2 text-lg'>{ele.toUpperCase()}</li>
              })}
            </ul>
        </div>:""}
        </div>
          <button className='bg-violet-500 py-3 px-4  rounded-lg '
          onClick={(e)=>{
            e.preventDefault();
            handleClick();
          }}
          >{loading?<Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} />:"Search"}</button>
      </div>
      
      {show&&(text!=""||val.vall!="none")?
      <div className='my-2 p-2 rounded-lg border-[2px] mx-1'>
        {loading?
          <div className='flex justify-center'><Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} /></div>:<div>
          <h1 className='text-[50px] text-violet-500 font-heading text-center'>
          Searched Result
        </h1>
          {
            (text==""||val.vall!="none")?
            <div className="grid md:grid-cols-3 gap-4  mx-10 my-5">
            {data2&&data2?.pokemon.map((ele,index)=>{
                const url=ele?.pokemon.url;
                let idd='';
                if(url){
                for (let i = url.length - 2 ; i >= 0; i--) {
                  if(url[i]!='/'){ idd = url[i]+idd;}
                  else{break;}
                }
                  console.log("id",idd);
                }
                if(text==""||idd==text||text==ele?.pokemon.name){
                return <motion.div initial={{scale:0.8}} whileHover={{scale:0.9}} transition={{duration:0.4}} key={index} 
                className='flex flex-col justify-around bg-violet-300 rounded-lg h-[250px]'>
            <div className='flex justify-around items-center'><img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${idd}.svg`}
            alt="default" 
            className='object-cover' height="150px" width="120px"/>
            <h1 className="text-2xl color-gray-600 font-thin  underline">{ele.pokemon.name}</h1>
            </div><div className='flex justify-center'><motion.button onClick={(e)=>{
              e.preventDefault();
              navigate("/detail",{state:{id:idd}});
              
            }} whileHover={{scale:1.1}} className="px-2 py-1 rounded-md bg-violet-500">See Stats</motion.button></div>
        </motion.div>}
            })}</div>
            :<div className="flex justify-center  mx-10 my-5">
              {data1?<motion.div initial={{scale:0.8}} whileHover={{scale:0.9}} transition={{duration:0.4}} key={1} 
                className='flex flex-col w-full md:w-[50%] justify-around bg-violet-300 rounded-lg h-[250px]'>
                <div className='flex justify-around items-center'><img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data1.id}.svg`} 
            className='object-cover' height="150px" width="120px"/>
            <h1 className="text-2xl color-gray-600 font-thin  underline">{data1.name}</h1>
            </div><div className='flex justify-center'><motion.button onClick={(e)=>{
              e.preventDefault();
              navigate("/detail",{state:{id:idd}});
              
            }} whileHover={{scale:1.1}} className="px-2 py-1 rounded-md bg-violet-500">See Stats</motion.button></div>
              </motion.div>:""}
            </div>
          }</div>
        } <h1 className='text-[50px] text-violet-500 font-heading text-center'>OOPs That's It</h1>
      </div>:""}

    </div>
  )
}

export default Search