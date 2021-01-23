import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewEntryModal = ({ show, onAdd, onClose }) => {
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const data = new FormData(form);
      const values = Object.fromEntries(data.entries());
      onAdd({
        ...values,
        range_l: parseInt(values.range_l),
        range_u: parseInt(values.range_u),
        reading: parseInt(values.reading),
      });
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header>Add New Entry</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="id">
            <Form.Label>Id</Form.Label>
            <Form.Control required type="text" name="id" />
          </Form.Group>
          <Form.Group controlId="box_id">
            <Form.Label>Box Id</Form.Label>
            <Form.Control required type="text" name="box_id" />
          </Form.Group>
          <Form.Group controlId="sensor_type">
            <Form.Label>Sensor Type</Form.Label>
            <Form.Control required type="text" name="sensor_type" />
          </Form.Group>
          <Form.Group controlId="unit">
            <Form.Label>Unit</Form.Label>
            <Form.Control required type="text" name="unit" />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" name="name" />
          </Form.Group>
          <Form.Group controlId="range_l">
            <Form.Label>Range L</Form.Label>
            <Form.Control required type="text" name="range_l" />
          </Form.Group>
          <Form.Group controlId="range_u">
            <Form.Label>Range U</Form.Label>
            <Form.Control required type="text" name="range_u" />
          </Form.Group>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control required type="text" name="longitude" />
          </Form.Group>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control required type="text" name="latitude" />
          </Form.Group>
          <Form.Group controlId="reading">
            <Form.Label>Reading</Form.Label>
            <Form.Control required type="text" name="reading" />
          </Form.Group>
          <Form.Group controlId="reading_ts">
            <Form.Label>Reading TS</Form.Label>
            <Form.Control required type="text" name="reading_ts" />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewEntryModal;
