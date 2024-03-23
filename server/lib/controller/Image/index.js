// controllers/imageController.js
const jwt = require('jsonwebtoken');
const path = require('path');

// Function to send image based on JWT authorization
exports.getImage = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '..', 'public', 'avatar', filename);

  // ตรวจสอบการตรวจสอบ Token ก่อน
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization Token is required' });
  }

  jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1zLnRyZWF6ekBnbWFpbC5jb20iLCJ1c2VyX2lkIjoiNmQxOWQ0YzAtYTAyNS00MWNmLWE4OTgtOGE2Yzc4ZDFkN2EzIiwicm9sZSI6InN1cGVyX2FkbWluIiwiaWF0IjoxNjk2NzQ4NTc4LCJleHAiOjE2OTY4MzQ5Nzh9.tuJKDj_QLR8srxRslatwooDQswUs6rzC47WYABj9PNI', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    // ส่งไฟล์รูปภาพกลับไปยัง Frontend
    res.sendFile(imagePath);
  });
};
