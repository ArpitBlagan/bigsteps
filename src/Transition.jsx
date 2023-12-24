import React from 'react'
import {motion} from 'framer-motion'
function Transition(Og){
  return (
    <>
        <Og/>
        <motion.div
            className='fixed top-0 left-0 w-full h-[100vh] bg-violet-400 z-50 
            flex justify-center items-center text-[50px] font-heading'
            style={{transformOrigin:'bottom'}}
            initial={{scaleY:0}}
            animate={{scaleY:0}}
            exit={{scaleY:1}}
            tarnsition={{duration:2.5,ease:[0.22,1,0.36,1]}}
        ><h1>Pokemon</h1></motion.div>
        <motion.div
            className='fixed top-0 left-0 w-full h-[100vh] bg-violet-400 z-50'
            style={{transformOrigin:'top'}}
            initial={{scaleY:1}}
            animate={{scaleY:0}}
            exit={{scaleY:0}}
            tarnsition={{duration:2.5,ease:[0.22,1,0.36,1]}}
        />
    </>
  )
}

export default Transition