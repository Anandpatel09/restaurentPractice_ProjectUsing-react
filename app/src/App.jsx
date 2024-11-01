import styled from "styled-components";
import { useEffect, useState } from "react"
import SearchResult from "./components/SearchResults/SearchResult";


export const BASE_URL = "http://localhost:9000";


const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  
  
useEffect(()=>{
  const fetchFoodData = async () => {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      
      setData(json);
      setFilteredData(json);
      setLoading(false);
      
    } catch (error) {
      setError("Unable to fetch data")
    }
  };
  fetchFoodData();
},[]);

const searchFood=(e)=>{
  const searchValue = e.target.value;
  // console.log(searchValue)
if(searchValue === ""){
  setFilteredData(null);
}
const filter = data?.filter((food)=>
food.name.toLowerCase().includes(searchValue.toLowerCase())
);
setFilteredData(filter)
};

// const temp=[
//   {
//       "name": "Boilded Egg",
//       "price": 10,
//       "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//       "image": "/images/egg.png",
//       "type": "breakfast"
//   },
// ];
if (error) return <div>{error}</div>;
if(loading) return <div>loading.....</div>



  return (

    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input onChange={searchFood} placeholder="Seach Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
      </FilterContainer>
     <SearchResult  data={filteredData} />
    </Container>
  )
};
export default App;


const Container = styled.div`
max-width:1200px;
margin: 0 auto;
`;
const TopContainer = styled.section`
min-height:140px;
display:flex;
justify-content:space-between;
padding:16px;
align-items:center;


.search{
input{
background-color:transparent;
border:1px solid red;
color:white;
boder-radius:5px;
height:40px;
font-size:16px;
padding:0 10px;
}
}
`;

const FilterContainer = styled.section`
display: flex;
justify-content:center;
gap:12px;
padding-bottom:40px;

`;


export const Button = styled.button`
background:#ff4343;
boder-radius:5px;
padding:6px 12px;
border:none;
color:white;
`;



