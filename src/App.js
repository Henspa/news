import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Detail from './Details';

const URL = 'https://newsapi.org/v2';
const APIKEY = 'API KEY HERE';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);


  useEffect(() => {
    const criteria = 'top-headlines?country=us&category=business';
    const address = URL + '/' + criteria + '&apikey=' + APIKEY;

    axios.get(address)
      .then((response) => {
        //console.log(response.data); tällä pääset tarkistamaan mitä tietoja tulee
        setError(null);
        setIsLoaded(true);
        setItems(response.data.articles);
      }
    )
  }, [])

  function close() {
    setSelectedItem(null);
  }

  if (selectedItem != null) {
    return <Detail
    title={selectedItem.title}
    image={selectedItem.urlToImage}
    description={selectedItem.description}
    close={close}
    />;
  }
  else if (error) {
    return <p>{error.message}</p>;
  }  
  else if (!isLoaded) {
    return <p>Loading...</p>;
  }
  else {
    return (
      <div>
        {items?.map(item =>(
          <div key={item.title} onClick={e => setSelectedItem(item)}>
            <h3>{item.title}</h3>
            <img src={item.urlToImage}></img>
            <p>{item.description}</p>
          </div>  
        ) )}
      </div>
    );
  }
}

export default App;
