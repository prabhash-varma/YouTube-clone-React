import React,{useState} from 'react'
import Axios from 'axios'
import './App.css';
import yt2 from './yt2.png'

function App() {


  const [list,setList]=useState([]);

  const [name,setName]=useState('');

  const [loader,setLoader]=useState(false);

 
  const maxResults=20;

  const search = async ()=>{

    setLoader(true)

    if(search===''){
      alert('Enter Valid text');
    }
    else{
    
     await Axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${name}`).then((res)=>{
        setList(res.data.items);
        console.log(list);
        console.log(res.data.items);
      }).then(()=>{
        setLoader(false);
      })

    }
  }



  return (
    <div className="App">
      <div className="header">
      <img src={yt2}></img> 
      <h1>YouTube</h1>
      </div>
    <hr></hr>
      <div className="body">
        <input id="input" type="text" onChange={(e)=>{
          setName(e.target.value);
        }}></input>
        <button onClick={search}>Search</button>
      </div>

      <div className="result">
      {loader ? ( <div class="ld"><div class="loader"></div></div> ) : (list.map((obj)=>{
          return (
            <>
              <iframe title="video" width="390" height="224" src={`https://www.youtube.com/embed/${obj.id.videoId}`} frameborder="0"></iframe>      
            </> 
          )
        }
        ))
      }
       
      </div>
    </div>
  );
}

export default App;
