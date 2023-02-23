import "./list.css"
import Button from "react-bootstrap/esm/Button";
import Logo from "../logo/logo";

function List() {
    return (
        <div>
            <div className="wrapper">
                <Logo />
                <Button className="button filter_button" type="submit">Filter</Button>
                <Button className="button profile_button" type="submit">Profile</Button>
                <Button className="button logout_button" type="submit">Logout</Button>
            </div>
        </div>
       
    )
}

export default List;