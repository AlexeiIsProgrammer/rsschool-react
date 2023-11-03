import React from 'react';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <Link to="react-hook-form">React Hook Form</Link>
      <Link to="uncontrolled">Uncontrolled</Link>
    </div>
  );
}
