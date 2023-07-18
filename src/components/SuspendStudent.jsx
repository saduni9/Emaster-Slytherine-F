import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SuspendStudent() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    suspendStudent();
  }, []);

  const suspendStudent = async () => {
    try {
      const response = await axios.post('/suspend-student', {
        user_id: 'student_id_here',
      });
      setStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Suspend Student</h1>
      <p>Status: {status}</p>
    </div>
  );
}

export default SuspendStudent;