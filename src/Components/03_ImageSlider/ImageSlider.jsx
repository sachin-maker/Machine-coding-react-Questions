import React from 'react'
import ImageSliderCard from './ImageSliderCard'

const ImageSlider = () => {



  return (
    <div>
         <ImageSliderCard url={"https://picsum.photos/v2/list"} page={1} limit={20}/>
    </div>
  )
}

export default ImageSlider