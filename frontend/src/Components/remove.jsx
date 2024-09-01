import React from 'react';
import { useNavigate } from 'react-router-dom';
import './remove.css';

const Remove = ({ friendUsername, onRemove, onCancel }) => {
  const navigate = useNavigate();

  const handleRemove = () => {
    onRemove(friendUsername);
    navigate('/home');
  };

  return (
    <div className='remove-overlay'>
      <div className='remove-modal'>
        <div className="modal-header">
          <h3>Remove Friend</h3>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to remove #{friendUsername} from your friends list?</p>
        </div>
        <div className="modal-footer">
          <button className='cancel-btn' onClick={onCancel}>Cancel</button>
          <button className='remove-btn' onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default Remove;
