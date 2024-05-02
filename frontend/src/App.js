import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [nameFilter, setNameFilter] = useState('');
  const [marksFilter, setMarksFilter] = useState('');

  const pageSize = 10;
  const totalPages = Math.ceil(totalStudents / pageSize);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page,
      pageSize,
      name: nameFilter.trim(),
      total_marks: marksFilter
    }).toString();

    const url = `http://localhost:8000/api/students?${queryParams}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('API Data:', data);
        setStudents(data.data || []);
        setTotalStudents(data.total || 0);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [page, pageSize, nameFilter, marksFilter]);

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Student Details</h1>
      <div className="filters mb-3">
        <input
          type="text"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          placeholder="Filter by name"
          className="form-control mb-2"
        />
        <input
          type="number"
          value={marksFilter}
          onChange={(e) => setMarksFilter(e.target.value)}
          placeholder="Filter by total marks"
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={() => setPage(1)}>Apply Filters</button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setNameFilter('');
            setMarksFilter('');
            setPage(1);
          }}
        >
          Clear Filters
        </button>
      </div>
      <div className="row">
        {students?.length > 0 ? (
          students.map(student => (
            <div key={student.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{student.name}</h5>
                  <p className="card-text">Total Marks: {student.total_marks}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No students match the filter criteria.</p>
        )}
      </div>
      <div className="pagination">
        <button
          className="btn btn-primary"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="page-info mx-2">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
