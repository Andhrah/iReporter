import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
  });
});

router.post('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
  });
});

router.patch('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
  });
});

router.delete('*', (req, res) => {
  res.status(404).json({
    error: '404 Not Found',
  });
});
