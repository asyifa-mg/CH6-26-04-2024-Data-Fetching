import { useEffect, useState } from "react";
import Places from "./Places.jsx";

const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); //untuk bagian loading
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        //logic jika ada error dari hit api backend
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch data, please try again later!",
        });
      }

      setIsFetching(false);
    }
    fetchData(); //function
  }, []);

  if (error) {
    return <Error tittle="An error occured!" mesage={error.message} />;
  }

  return (
    <Places
      title="Available Places" //propterty
      places={availablePlaces} //propterty
      isLoading={isFetching} //propterty untuk loading
      loadingText="Data is fetching..." //propterty untuk loading data
      fallbackText="No places available." //propterty dan tidak menampilkan ini jika datanya tdak ada
      onSelectPlace={onSelectPlace} //propt
    />
  );
}
