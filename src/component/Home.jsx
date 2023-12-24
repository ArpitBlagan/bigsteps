import { useState,useEffect } from 'react';
import { useGetAllQuery } from '../services/pokemon';
import {motion} from 'framer-motion'
import Transition from '../Transition';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { Puff } from 'react-loading-icons';
const Home = () => {
  const navigate=useNavigate();
    const [limit,setL]=useState(21);
  const [loading,setLl]=useState(false);
  const {data,isLoading}=useGetAllQuery(limit);
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrolledToBottom = scrollTop + windowHeight+1 >= documentHeight;
    if (scrolledToBottom) {
      console.log("okok");
      setLl(true);
      setL(limit+21);
      setTimeout(()=>{setLl(false)},2000);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll,limit]);
  console.log(data);
  if(isLoading){return <div className='flex justify-center'><Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} /></div>}
  return (
    <div className=''>
      <Search/>
      <h1 className='text-[50px] text-violet-500 font-heading text-center'>
          List of Pokemons
        </h1>
      <div className="grid md:grid-cols-3 gap-4  mx-10 my-5">
      {data.results.map((ele,index)=>{
        const url=ele.url;
        let idd='';
                if(url){
                for (let i = url.length - 2 ; i >= 0; i--) {
                  if(url[i]!='/'){ idd = url[i]+idd;}
                  else{break;}
                }
                  console.log("id",idd);
                }
        return <motion.div initial={{scale:0.8}} whileHover={{scale:0.9}} transition={{duration:0.4}} key={index} 
        className='flex flex-col justify-around bg-violet-300 rounded-lg h-[300px]'>
            <div className='flex justify-around items-center m-2 rounded-lg'
              style={{backgroundColor: '#8EC5FC',
              backgroundImage: 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 50%, #ffffff 100%)'
            }}
            ><img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index+1}.svg`} 
            alt="default"
            className='object-cover' height="150px" width="120px"/>
            <h1 className="text-2xl color-gray-600 font-thin  underline">{ele.name}</h1>
            </div><div className='flex justify-center'><motion.button onClick={(e)=>{
              e.preventDefault();
              navigate("/detail",{state:{id:idd}});
              
            }} whileHover={{scale:1.1}} className="px-2 py-1 rounded-md bg-violet-500">See Stats</motion.button></div>
        </motion.div>
      })}</div>
      {loading?<div className='flex justify-center'><Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} /></div>:""}
    </div>
  )
}

export default Transition(Home)