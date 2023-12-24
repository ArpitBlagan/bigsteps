import React from 'react'
import Transition from '../Transition'
import { useLocation } from 'react-router-dom'
import { useGetInofIdQuery } from '../services/pokemon';
import { Puff } from 'react-loading-icons';
import ProgressLine from './progress/ProgressLine';
const Detail = () => {
  const location=useLocation();
  const id=location.state.id;
  const {data,isLoading}=useGetInofIdQuery(id);
  console.log(data);
  if(isLoading){
    return <div className='flex justify-center'><Puff stroke="#98ff98" strokeOpacity={.125} speed={.75} /></div>
  }
  return (
    <div 
      className='mx-5 border-[2px] font-thin rounded-lg  h-[70vh] mt-20 bg-violet-400'>
     <div className='flex justify-center'>
      <h1 className='font-heading text-[40px] underline'>{data&&data.name}</h1>
    </div> 
    <div className='flex md:flex-row flex-col justify-around '>
      <div className='flex justify-center items-center  my-10 p-3 rounded-lg'
      style={{backgroundColor: '#8EC5FC',
      backgroundImage: 'linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 50%, #ffffff 100%)'
      }}
      >
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`} 
            alt="default"
            className='object-cover' height="200px" width="250px"/>
      </div>
      <div className='flex flex-col justify-center items-start p-2 shadow-2xl rounded-xl'>
          <h1 className='text-center w-full text-[30px] font-heading'>Stats</h1>
          {data.stats.map((ele,index)=>{
            const val=ele.base_stat;
            let col=""
            if(val<=25){
              col="red"
            }
            else if(val<=65){
              col="yellow"
            }
            else{
              col="lightgreen"
            }
            return <div className='' key={index}>
              <ProgressLine
                label={(ele.stat.name+'('+val+')').toUpperCase()}
                backgroundColor="white"
                visualParts={[
                  {
                    percentage: val,
                    color: col
                  }
                ]}
              />
            </div>
          })}
      </div>
    </div>
    </div> 
  )
}

export default Transition(Detail)