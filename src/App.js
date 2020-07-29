import React, {useState} from 'react';
import getWeather from './weatherService';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './weather.css';

function SearchBar(props) {
  const [cityTerm, setCityTerm] = useState("");
  const [stateTerm, setStateTerm] = useState("")
  const {setWeather, setLoading} = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    getWeather(cityTerm + ',' + stateTerm)
    .then(data => {
      if (data.cod === 200) {
        setWeather(data)
      } else {
        console.log(data.cod)
      }
    })
    .then(() => setLoading(false))
  }
  const handleCityChange = (e) => {
    setCityTerm(e.target.value);
  }

  const handleStateChange = (e) => {
    setStateTerm(e.target.value);
  }

  return (
    <Form onSubmit={ handleSubmit }>
      <Form.Row>
        <Col>
          <Form.Control type="location" placeholder="City..." name="city" onChange = { handleCityChange }/>
          <Form.Text className="text-muted">Enter a city and state</Form.Text>
        </Col>
        <Col>
          <Form.Control type="location" placeholder="State..." name="state" onChange = { handleStateChange }/>
        </Col>
        <Col sm={2}>
          <Button variant="primary" type="submit" >Search</Button>
        </Col>
      </Form.Row>
    </Form>
  )
}

function Loading(props) {
  if (props.loading) {
    return (
      <p>loading...</p>
    )
  } else {
    return null
  }
}

function WeatherDisplay(props) {
  const data = props.weather;
  if (data.weather) {
    const imgSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    return (
      <Row>
        <Table className="customTable">
          <tr>
            <td><img src={imgSrc} alt="icon"/></td>
            <td>{data.name}</td>
            <td>{data.main.temp} F</td>
          </tr>
          <tr>
            <td>{data.weather[0].main}</td>
            <td>{data.weather[0].description}</td>
            <td>Feels like {data.main.feels_like} F</td>
          </tr>
        </Table>
      </Row>
    )
  } else {
    return null
  }
}

function App() {
  const [weather, setWeather] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Container>
      <SearchBar setWeather={setWeather} setLoading={setLoading}/>
      <Loading loading={loading} />
      <WeatherDisplay weather={weather} />
    </Container>
  )
}


export default App;
