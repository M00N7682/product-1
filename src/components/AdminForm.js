import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AdminForm = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ question, options, answer });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          label={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          required
        />
      ))}
      <TextField
        label="Correct Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add Quiz
      </Button>
    </Box>
  );
};

export default AdminForm;
