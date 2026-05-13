import axios from "axios"
import { useEffect, useState } from "react"

const useData = () => {
    const [skill,setSkill]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    
    const fetchSkills = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/data.json');
            
            // Get all user-created skills from localStorage
            const allUserSkills = [];
            if (typeof window !== 'undefined') {
                // Get all localStorage keys
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    // Check if key is for user-created skills
                    if (key && key.startsWith('skillswap.mySkills.')) {
                        try {
                            const userSkills = JSON.parse(localStorage.getItem(key));
                            if (Array.isArray(userSkills)) {
                                allUserSkills.push(...userSkills);
                            }
                        } catch (e) {
                            console.error('Error parsing user skills:', e);
                        }
                    }
                }
            }
            
            // Merge API skills with user-created skills
            const combinedSkills = [...response.data, ...allUserSkills];
            setSkill(combinedSkills);
            console.log('Skills loaded:', combinedSkills);
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }
    
    useEffect(()=>{
        fetchSkills();
        
        // Listen for skill published event to refresh the list
        const handleSkillPublished = () => {
            fetchSkills();
        };
        
        window.addEventListener('skillPublished', handleSkillPublished);
        
        return () => {
            window.removeEventListener('skillPublished', handleSkillPublished);
        };
    },[])
    
    return {skill, loading, error}
}
export default useData