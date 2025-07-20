import PropTypes from 'prop-types';
import React from 'react'
import { arrow_left } from '../imagepath';
import { Link, useNavigate } from 'react-router-dom';

function BasicHero(props) {
    const { title } = props;
    const navigate = useNavigate();
  return (
    <div className="card-box profile-header mb-3 mt-3 d-flex align-items-center">
      <div className='basic-hero-header'>
        <Link to onClick={() => navigate(-1)}>
          <img src={arrow_left} alt="" />
        </Link>
        <span className="ms-3">{title}</span>
      </div>
    </div>
  )
}

BasicHero.propTypes = {
    title: PropTypes.node,
  };

export default BasicHero