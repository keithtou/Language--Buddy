import "./people.css"
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Logo from "../logo/logo";
import StudentCard from "../studentCard/studentCard";
import Profile from "../profile/profile";
import DropdownButtons from "../dropdownButtons/dropdownButtons";


function People() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  useEffect( () => {
     fetch("http://localhost:4000/users")
      .then(res => {
        if (!res.ok) {
          throw new Error("Something bad with connection");
        }
        return res.json();
      })
      .then(
        data => {
          data.pop();
          setStudents(data);
          console.log(data)
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
                      <Button className="button people_button" type="submit" disabled >People</Button>
                      <DropdownButtons />
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

export default People;