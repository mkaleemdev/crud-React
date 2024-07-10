import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

const Crud = () => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        name: "",
        dob: "",
        email: "",
        mobNo: "",
        address: "",
    });
    const [data, setData] = useState([]);
    const [editIndex, setEditIndex] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, });
    };

    const handleSubmit = () => {
        if (editIndex !== null) {
            const updatedData = data.map((item, index) =>
                index === editIndex ? user : item
            );
            setData(updatedData);
            setEditIndex(null);
            toast.success('Student updated successfully');
        } else {
            setData([...data, user]);
            toast.success('Student added successfully');
        }
        setUser({
            name: "",
            dob: "",
            email: "",
            mobNo: "",
            address: "",
        });
        setShow(false);
    };

    const delData = (id) => {
        const delData = data.filter((_, i) => i !== id)
        setData(delData);
        setEditIndex(id)
        toast.success('Student Delete successfully')
    }

    const editData = (id) => {
        setShow(true)
        setUser(data[id])
        setEditIndex(id)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            <section className='mt-5'>
                <div className="container">
                    <div className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={handleShow}> <IoAdd /> Add Student</Button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDob">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={user.dob}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email ID"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMobNo">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter Mobile No"
                                    name="mobNo"
                                    value={user.mobNo}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            {editIndex !== null ? 'Update' : 'Submit'} 
                        </Button>
                    </Modal.Footer>
                </Modal>
            </section>

            <section className='mt-5'>
                <div className="container border-top pt-3">
                    <div className='row justify-content-between mb-3'>
                        <div className="col-md-1">
                            <Form.Select aria-label="Default select example">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </Form.Select>
                        </div>
                        <div className="col-md-2">
                            <Form.Control type="search" placeholder="Search" />
                        </div>
                    </div>
                    <Table striped bordered hover variant="" id='myTable'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Sr. No</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Email</th>
                                <th>Mobile No</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.dob}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobNo}</td>
                                    <td className='d-flex justify-content-evenly'>
                                        <Button variant="secondary" onClick={() => editData(index)}>
                                            <FaRegEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => delData(index)}>
                                            <MdDeleteForever />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
};

export default Crud;
