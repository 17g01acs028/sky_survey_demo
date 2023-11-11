// Import required modules
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import multer from "multer"


//import routes
import questionsRouter from './routes/questions.js';
import { addResponse } from './controllers/questions.js';
import { prisma } from './prisma/client/index.js';


//Middleware
/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });
/* ROUTES WITH FILES */
app.post("/api/questions/response",upload.any(), addResponse);

// Include the questions route
app.use('/api/questions', questionsRouter);

//Download file


// An endpoint to initiate file download
// app.get('/api/questions/response/download/:filename', (req, res) => {
//   const fileName = req.params.filename;
//   const filePath = path.join(__dirname, 'public/uploads', fileName);

//   res.download(filePath, (err) => {
//     if (err) {
//       res.status(404).send('File not found');
//     }
//   });
// });

async function CheckDbConnection(){
  try {
   await prisma.$connect
   console.log("Db Successfully Connected");
  } catch (error) {
    console.log("Db connection error",error);
  }
  
}

//show this if Route is not found 

app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  CheckDbConnection();
  console.log(`Server is running on port ${PORT}`);
});
  

