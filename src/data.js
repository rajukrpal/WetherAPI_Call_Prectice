import axios from 'axios';

export const getApiData = async(city) =>{
    try {
        const ApiData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_SOME_KEY}`,{
            headers: {
                'Content-Type': 'application/json'
                }
        })
    const res = await ApiData.data
    console.log(res)
    return res;
    } catch (error) {
        console.log("api error chack",error)
    }
    
}


