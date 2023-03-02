import "./list.css"
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import StudentCard from "../studentCard/studentCard";

function List() {
  const nav = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => {
        if (!res.ok) {
          throw new Error("Something bad with connection");
        }
        return res.json();
      })
      .then(
        data => {
          setStudents(data);
          setLoading(false);
        },
        error => {
          setError(error.toString());
          console.log(error);
          setLoading(false);
        }
      );
  }, []);

 

    return (
        <div>
            <div className="wrapper">
              <div className="main_header">
                    <Logo />
                    <div className="button_container">
                    <Button className="button profile_button" type="submit">Profile</Button>
                    <Button className="button logout_button" type="submit" onClick={() => nav("/")}>Logout</Button>
                    </div>
              </div>

              <Button className="button filter_button" type="submit">Filter</Button>
            
                
              <div className="card-container">
                  { loading ? ( <p>The list of students is loading...</p> ) : error != "" ? ( <p>{error}</p> ) : (
                      students.map((student, index) => <StudentCard students={student} key={index} />)
                  )}
              </div>
              
            </div>
        </div>
       
    )
}

export default List;