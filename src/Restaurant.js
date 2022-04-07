import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardDeck } from 'react-bootstrap';

function Restaurant(props) {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`http://assignment1web422.herokuapp.com/api/restaurants/${props.id}`
        ).then(res => res.json()).then((result) => {
            setRestaurant(result);
        }).catch(() => {
            setRestaurant(null);
        }
        ).finally(()=>{
            setLoading(false);
        });

    }, [props.id]);

    return (<>
        {(loading === true) ? (
            <>
                <Card bg='light'>
                    <Card.Body><b>Loading Restaurant Data...</b></Card.Body>
                </Card>
            </>
        ) : (restaurant === null && loading === false) ? (<Card bg='light'>
            <Card.Body><b>Unable to find Restaurant with id: {props.id}</b></Card.Body>
        </Card>) : (
                    <>
                        <Card bg='light'>
                            <Card.Body><h2><b>{restaurant.name}</b></h2>{restaurant.address.building} {restaurant.address.street}</Card.Body>
                        </Card>
                        <br></br>
                        <MapContainer style={{ "height": "400px" }} center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
                            zoom={13} scrollWheelZoom={false}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                        </MapContainer>
                        <br></br>
                        <h4><b>Ratings</b></h4>
                        <hr></hr>
                        <CardDeck>
                            {restaurant.grades.map((rest) => (
                                <Card>
                                    <Card.Header>Grade: {rest.grade}</Card.Header>
                                    <Card.Body>Completed: {new Date(rest.date).toLocaleDateString()}</Card.Body>
                                </Card>
                            ))}
                        </CardDeck>
                    </>)

        }


    </>
    );
}

export default Restaurant;