
import Card from "react-bootstrap/Card";
import { Trash, Pencil } from "react-bootstrap-icons";

function CustomCard({ name, description, direction, img }) {
  return (
  
      <div className="container  card card-body p-4">
        <div className="d-flex row justify-content-between  align-items-center">
          <div className="text-start col-6 ">
            <h4 className="">{name}</h4>
            <p>
              <i className="bi bi-geo-alt-fill"></i>
              {direction}
            </p>
            <p>
              <i className="bi bi-house-door-fill "></i>
              {description}
            </p>
          </div>
          <div className="col-4">
          <img src={img} className="w-100 rounded-1" />
          </div>
          <div className="align-items-center col-2">
            <Trash className="me-2" />
            <Pencil />
          </div>
        </div>
      </div>

  );
}

export default CustomCard;