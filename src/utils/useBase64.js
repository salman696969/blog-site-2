import React, { useEffect, useState } from 'react'

export default function useBase64(file) {
  
    let [base64URL,setBase64URL]=useState('')
    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          console.log(reader)
          console.log(file)
reader.readAsDataURL(file[0])
        //   console.log(reader.result)
        console.log("Called", reader);
        //   baseURL = reader.result;
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };
    useEffect(()=>{
      console.log(file)
      getBase64(file)
        .then(result => {
          file["base64"] = result;
          console.log("File Is", file);
          setBase64URL( file )
        })
        .catch(err => {
          console.log(err);
        });
        console.log(base64URL)
    },[file])
  return (
    base64URL
  )
}
