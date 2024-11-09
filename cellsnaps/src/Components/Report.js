import React from 'react'
import '../Styles/Report.css'
import MyComponent from './Response'
export default function Report({gemini_res,setGeminiRes}) {
  return (
    <div className='main_report'>
        <h1>Report</h1>
        <div className='text_div'>
            <MyComponent text={gemini_res}/>
        </div>
        <div>
            <button onClick={()=>setGeminiRes("")}>reupload</button>
        </div>
    </div>
  )
}
