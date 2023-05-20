import { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from 'react-bootstrap/Spinner';
import { API_BASE } from "../assets/utils";

export default function DogImage({imageId, dogName}) {
  const [dogImage, setDogImage] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchImageData = async () => {
      try {
        const response = await fetch(`${API_BASE}images/${imageId}`);
        const jsonData = await response.json();
        setDogImage(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    fetchImageData();
  },[imageId]);

  return ! isLoading ? 
    <Image
      className="dogs__image"
      src={dogImage?.url}
      alt={dogName}
      width={dogImage?.width}
      height={dogImage?.height}
    /> : <Spinner/>;
}