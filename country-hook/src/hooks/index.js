import { useEffect, useState } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        // skip if name is empty
        if (name) {
            axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                .then(res => res.data)
                .then(returnedCountry => {
                    const country = {
                        ...returnedCountry,
                        found: true
                    }
                    setCountry(country)
                })
                .catch(error => {
                    const country = {
                        found: false
                    }
                    setCountry(country)
                })
        }
    }, [name])

    return country
}