import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const LaunchItem = ({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) => {
  return (
    <div className='launch-item'>
      <div className='launch-details'>
        <h4 className='mission-name'>
          Mission: {mission_name}
          <span
            className={classNames({
              'mission-success': launch_success,
              'mission-danger': !launch_success,
            })}
          ></span>
        </h4>
        <p>
          Date: <Moment format='MM-DD-YYYY hh:mm'>{launch_date_local}</Moment>
        </p>
      </div>

      <Link className='link-button' to={`/launch/${flight_number}`}>
        Launch Details &#8594;
      </Link>
    </div>
  );
};

export default LaunchItem;
