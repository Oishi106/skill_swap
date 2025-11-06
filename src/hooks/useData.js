import axios from "axios"
import { useEffect, useState } from "react"

const useData = () => {
    const [skill,setSkill]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
        setLoading(true)
        axios.get('/data.json')
            .then(response => {
                setSkill(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    },[])
    return {skill,loading,error}
}
export default useData