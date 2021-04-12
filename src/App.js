import { useState, useEffect } from "react";
import './App.css';





export default function App() {
  // this is use state defintion
  const [state, setState] = useState({
    plants: [],
    newPlant: {
      plant: "",
      cycle: "🌷",
    },
  });

  async function getAppData() {
    try {
      const BASE_URL = 'https://backend-plant-log.herokuapp.com/api/plants';
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
    
    const BASE_URL = 'https://backend-plant-log.herokuapp.com/api/plants';
    
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
        cycle: "🌷",
      },
    }));
    window.location.reload()
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


  async function handleDelete(plantId) {
    // if(!state.user) return; 
    const URL = `https://backend-plant-log.herokuapp.com/api/plants/${plantId}`;

    const plants = await fetch(URL, {
      method: 'DELETE'
    }).then(res => res.json());

    setState(prevState => ({
      ...prevState,
      plants,
    }))
}

  return (
    
    <section >
      {/* <div>
      <img src="./images/bg_image.png">
      </div> */}
      <div className="section-head">
       
     
      <h2>Plant Type</h2>
      </div>
      <hr />
      {/* the output */}
      {state.plants.map((s) => (
        <article key={s.plant}>
          <div>{s.plant}</div> 
          <div>{s.cycle}</div>
          <div onClick={() => handleDelete(s._id)}>{'🗑'}</div>
          
        </article>
      ))}
      <hr />
      <form onSubmit={addPlant}>
        <label>
          <span>PLANT</span>
          <input name="plant" value={state.newPlant.plant} onChange={handleChange} />
        </label><br></br>
        <label>
          <p>
          <span>CYCLE</span>
          <select name="cycle" value={state.newPlant.cycle} onChange={handleChange} >
            <option value="Annual">a</option>
            <option value="Perrenial">p</option>
            <option value="🌷">🌷</option>
            {/* <option value="4">4</option>
            <option value="5">5</option> */}
          </select>         
          </p>
        </label>
        <button>ADD PLANT</button>
        
      </form>
    </section>
  );
}