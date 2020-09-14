import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = (props) => {
  let { flight_number } = props.match.params;
  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    mission_name,
    // flight_number,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <div className='launch-details-wrapper'>
      <Link className='link-button' to='/'>
        &#8592; Back
      </Link>
      <h1>Mission: {mission_name}</h1>
      <div>
        <h4>Launch Details</h4>
        <ul>
          <li>Flight Number: {flight_number}</li>
          <li>Launch Year: {launch_year}</li>
          <li>
            Launch Successful:{' '}
            <span
              className={classNames({
                'mission-success': launch_success,
                'mission-danger': !launch_success,
              })}
            ></span>
          </li>
        </ul>
      </div>
      <div>
        <h4>Rocket Details</h4>
        <ul>
          <li>Rocket ID: {rocket_id}</li>
          <li>Rocket Name: {rocket_name}</li>
          <li>Rocket Type: {rocket_type}</li>
        </ul>
      </div>
    </div>
  );
};

export default Launch;
