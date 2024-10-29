import React from 'react';
import Card from 'react-bootstrap/Card';
import { Trash, Pencil } from 'react-bootstrap-icons';

function CustomCard() {
  return (
    <Card>
      <div className="card-body border-dark ">
        <div className="d-flex justify-content-between  align-items-center">
          <div className="text-start">
            <h4 className="">Casa Playa</h4>
            <p><i className="bi bi-geo-alt-fill"></i> Av. Costa 123</p>
            <p><i className="bi bi-house-door-fill"></i> Hermosa casa frente al mar</p>
          </div>
          <div className="align-items-center">
            <Trash className="me-2" />
            <Pencil />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CustomCard;