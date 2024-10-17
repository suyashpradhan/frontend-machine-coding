import {useState} from "react";
import {COUNTRIES} from "./data";

const countries = Object.entries(COUNTRIES)

export const Select = () => {
    const [country, setCountry] = useState('')

    return (
        <>
            <h1>Country List</h1>
            <form onSubmit={(event) => event.preventDefault()}>
                <select required name="countries" value={country}
                        onChange={(event) => setCountry(event.target.value)}>
                    <option value="">Select country</option>
                    <optgroup label="Countries">
                        {countries.map(([id, label]) => {
                            return (
                                <option value={id} key={id}>
                                    {label}
                                </option>
                            )
                                ;
                        })}
                    </optgroup>
                </select>
                <p className="country-display">
                    Selected country: {COUNTRIES[country as keyof typeof COUNTRIES]}
                </p>
                <button>Submit</button>
            </form>
        </>
    )
}