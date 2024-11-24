import { useState } from 'react';
import { Container, Table, Button, Modal, Form, Badge, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

function Dashboard() {
  const userRole = localStorage.getItem('userRole');
  const username = localStorage.getItem('username');
  const isAdmin = userRole === 'admin';
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [data, setData] = useState([
    { id: 1, name: 'Ram Kumar', jobRole: 'Full Stack Developer', status: 'Active' },
    { id: 2, name: 'Arun Prakash', jobRole: 'HR Manager', status: 'Active' },
    { id: 3, name: 'Priya Sharma', jobRole: 'Project Manager', status: 'Active' },
    { id: 4, name: 'Karthik Raja', jobRole: 'UI/UX Designer', status: 'Inactive' },
    { id: 5, name: 'Deepa Lakshmi', jobRole: 'QA Engineer', status: 'Active' },
    { id: 6, name: 'Suresh Kumar', jobRole: 'Backend Developer', status: 'Active' },
    { id: 7, name: 'Lakshmi Priya', jobRole: 'Business Analyst', status: 'Inactive' },
    { id: 8, name: 'Vijay Kumar', jobRole: 'DevOps Engineer', status: 'Active' },
    { id: 9, name: 'Meena Kumari', jobRole: 'Frontend Developer', status: 'Active' },
    { id: 10, name: 'Rajesh Singh', jobRole: 'System Architect', status: 'Inactive' }
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    toast.success('Employee removed successfully');
  };

  const handleEdit = (item) => {
    setEditItem(item ? { ...item } : { id: data.length + 1, name: '', jobRole: '', status: 'Active' });
    setShowModal(true);
  };

  const handleStatusToggle = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        const newStatus = item.status === 'Active' ? 'Inactive' : 'Active';
        return { ...item, status: newStatus };
      }
      return item;
    }));
    toast.success('Status updated successfully');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editItem.name || !editItem.jobRole) {
      toast.error('Please fill all fields');
      return;
    }

    if (editItem.id > data.length) {
      setData([...data, editItem]);
      toast.success('Employee added successfully');
    } else {
      setData(data.map(item => 
        item.id === editItem.id ? editItem : item
      ));
      toast.success('Employee updated successfully');
    }
    
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center mb-4">
                <Col>
                  <h4 className="mb-1">Employee Management</h4>
                  <p className="text-muted mb-0">Welcome, {username}</p>
                </Col>
                {isAdmin && (
                  <Col xs="auto">
                    <Button variant="primary" onClick={() => handleEdit(null)}>
                      <i className="bi bi-plus-lg me-2"></i>
                      Add Employee
                    </Button>
                  </Col>
                )}
              </Row>

              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="bg-light">
                    <tr>
                      <th width="50">#</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th width="100">Status</th>
                      {isAdmin && <th className="text-end" width="200">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id}>
                        <td className="fw-bold text-muted">{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.jobRole}</td>
                        <td>
                          <Badge bg={item.status === 'Active' ? 'success' : 'danger'}>
                            {item.status}
                          </Badge>
                        </td>
                        {isAdmin && (
                          <td>
                            <div className="d-none d-md-flex gap-2 justify-content-end">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleEdit(item)}
                              >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                              </Button>
                              <Button 
                                variant={item.status === 'Active' ? 'outline-danger' : 'outline-success'} 
                                size="sm"
                                onClick={() => handleStatusToggle(item.id)}
                              >
                                <i className={`bi ${item.status === 'Active' ? 'bi-x-lg' : 'bi-check-lg'} me-1`}></i>
                                {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                <i className="bi bi-trash me-1"></i>
                                Delete
                              </Button>
                            </div>
                            <div className="d-flex d-md-none flex-column gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={() => handleEdit(item)}
                              >
                                <i className="bi bi-pencil me-2"></i>
                                Edit
                              </Button>
                              <Button 
                                variant={item.status === 'Active' ? 'outline-danger' : 'outline-success'} 
                                size="sm"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={() => handleStatusToggle(item.id)}
                              >
                                <i className={`bi ${item.status === 'Active' ? 'bi-x-lg' : 'bi-check-lg'} me-2`}></i>
                                {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                className="w-100 d-flex align-items-center justify-content-center"
                                onClick={() => handleDelete(item.id)}
                              >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editItem?.id > data.length ? 'Add Employee' : 'Edit Employee'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editItem?.name || ''}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job role"
                value={editItem?.jobRole || ''}
                onChange={(e) => setEditItem({ ...editItem, jobRole: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editItem?.status || 'Active'}
                onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editItem?.id > data.length ? 'Add' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Dashboard;