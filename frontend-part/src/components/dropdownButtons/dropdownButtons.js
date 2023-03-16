import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';


function DropdownButtons() {
  let nav = useNavigate();
    return (
        <DropdownButton id="dropdown-basic-button"  title="Profile">
          <Dropdown.Item onClick={() => nav("/profile")}>Profile</Dropdown.Item>
          <Dropdown.Item href="/" onClick={()=> localStorage.removeItem("jwtToken")}>Log out</Dropdown.Item>
        </DropdownButton>
      );
}

export default DropdownButtons;
