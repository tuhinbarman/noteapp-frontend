import React from 'react';
import {ReactComponent as AddCustomButton} from '../assets/add.svg';
import { Link } from 'react-router-dom';

function AddButton() {
  return (
    <div>
        <Link to='/note/new'  className='floating-button'>
            <AddCustomButton />  
        </Link>
        
    </div>
  )
}

export default AddButton
