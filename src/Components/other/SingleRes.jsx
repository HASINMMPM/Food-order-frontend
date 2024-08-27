import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ContextList } from '../commen/ContextListProvider'

const SingleRes = () => {
    const {id} =useParams()
    const{URL}= useContext(ContextList)
    const [singleRes, setSingleRes] = React.useState(null);
    const fetchSingleRes = async () => {
        try {
          const response = await axios.get(
            `${URL}/restuarant/restuarant/${id}`
          );
          const resData = response.data;
          setSingleRes(resData);
          console.log(resData)
        } catch (error) {
          console.error("Error fetching restaurant data:", error);
        }
      };
useEffect(()=>{
    fetchSingleRes();
}, []);

    
  return (
    <div>
        singleRes

    </div>
  )
}

export default SingleRes