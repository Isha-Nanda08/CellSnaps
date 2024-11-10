import React from 'react';
import '../Styles/Report.css';
import BloodCountsTable from './BloodCountTable';
import MyComponent from './Response';

export default function Report({gemini_res,setGeminiRes, data}) {

  const downloadImage = (url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `image_${index + 1}.jpg`;
    link.click();
  };

  const rbc_value = data.density_data? data.density_data.RBC.average_cell_density_uL : "N/A";
  const wbc_value = data.density_data? data.density_data.WBC.average_cell_density_uL/100 : "N/A";
  const platelet_value = data.density_data? data.density_data.Platelet.average_cell_density_uL: "N/A";

  return (
    <div className='main_report'>
        <h1>Report</h1>
        <div>      <BloodCountsTable
        rbc={rbc_value}
        wbc={wbc_value}
        platelets={platelet_value}
      />
</div>
        <div className='text_div'>
            <MyComponent text={gemini_res}/>
        </div>
        <div>
            <button onClick={()=>setGeminiRes("")}>reupload</button>
            {data.output_images? data.output_images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={`Image ${index + 1}`} width="100" />
          <button onClick={() => downloadImage(image.url, index)}>
            Image {index + 1}
          </button>
        </div>
      )): ""}
        </div>
    </div>
  )
}
