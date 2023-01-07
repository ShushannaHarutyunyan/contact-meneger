import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../const";
import Loader from "../../Loader/Loader";
import ShowContact from "../../shared/ShowContact/ShowContact";


const Contact=()=>{
    const [contact, setContact] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {id} = useParams();
    useEffect(() => {
        setIsLoading(true);
        axios
          .get(`${BASE_URL}contacts/${id}`)
          .then((res) => {
            
            setContact(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      }, []);
    return isLoading ? (
      <Loader />):
      (<ShowContact title={'firstName'} value={[contact.firstName, contact.lastName]}/>
      
      )
}
export default Contact;