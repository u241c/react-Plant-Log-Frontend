import { useState, useEffect } from "react";
import './App.css';



export default function App() {
  const [state, setState] = useState({
    plants: [{ plant: "JavaScript", cycle: "4" }],
    newPlant: {
      plant: "",
      cycle: "3",
    },
  });

  async function getAppData() {
    try {
      const BASE_URL = 'http://localhost:3001/api/plants';
      const plants = await fetch(BASE_URL).then(res => res.json());
      setState((prevState) => ({
        ...prevState,
        plants,
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAppData();
  }, []);

  async function addPlant(e) {
    e.preventDefault();
    
    const BASE_URL = 'http://localhost:3001/api/plants';
    
    const plant = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify(state.newPlant)
    }).then(res => res.json());

    setState((prevState) => ({
      ...prevState,
      plants: [...prevState.plants, prevState.newPlant],
      newPlant: {
        plant: "",
        cycle: "3",
      },
    }));
  }

  function handleChange(e) {
    setState((prevState) => ({
      ...prevState, 
      newPlant: {
        ...prevState.newPlant,
        [e.target.name]: e.target.value 
      }
    })) 
  }

  return (
    <section>
      <h2>PLANT LOG</h2>
      <hr />
      {state.plants.map((s) => (
        <article key={s.plant}>
          <div>{s.plant}</div> 
          <div>{s.cycle}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addPlant}>
        <label>
          <span>PLANT</span>
          <input name="plant" value={state.newPlant.plant} onChange={handleChange} />
        </label>
        <label>
          <span>CYCLE</span>
          <select name="cycle" value={state.newPlant.cycle} onChange={handleChange} >
            <option value="Annual">a</option>
            <option value="Perrenial">p</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD PLANT</button>
      </form>
    </section>
  );
}