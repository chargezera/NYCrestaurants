import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import { Table, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
function Restaurants(props) {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    let history = useHistory();
    useEffect(() => {
        const parsed = queryString.parse(props.query);
        fetch(queryString.stringifyUrl({ url: `http://assignment1web422.herokuapp.com/api/restaurants`, query: { page, perPage, borough: parsed.borough } })
        ).then(res => res.json()).then((result) => {
            setRestaurants(result);
        });
    }, [props.query, page]);

    useEffect(() => { setPage(1) }, [props.query]);

    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage() {
        setPage(page + 1);
    }
    return (<>
        {(restaurants === null) ? (
            <Card bg='light'>
                <Card.Body>
                    <Card.Text>Loading Restaurants...</Card.Text>
                </Card.Body>
            </Card>
        ) : (restaurants.length === 0) ? (
            <Card bg='light'>
                <Card.Body>
                    <Card.Text>No Restaurants Found</Card.Text>
                </Card.Body>
            </Card>
        ) : (
                    <>
                        <Card bg='light'>
                            <Card.Body><b><h2>Restaurant List</h2>
                            Full list of restaurants. Optionally sorted by borough</b>
                            </Card.Body>
                        </Card>
                        <br></br>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Borough</th>
                                    <th>Cuisine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((restaurant) => (
                                    <tr key={restaurant._id} onClick={() => { history.push(`/restaurant/${restaurant._id}`) }}>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.address.building} {restaurant.address.street}</td>
                                        <td>{restaurant.borough}</td>
                                        <td>{restaurant.cuisine}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage} />
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage} />
                        </Pagination>
                    </>
                )}
    </>
    );
}

export default Restaurants;