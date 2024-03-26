import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import database from './database.js';
import multer from 'multer';
import { config as dotenvConfig } from 'dotenv';

//AWS
import s3 from './bucket.js';

// Configuring dotenv
dotenvConfig();
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const bucketName = process.env.AWS_BUCKET_NAME;
//---
import sharp from 'sharp';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5173;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`starting server at port ${port}`);
});

// Post request at /exercise will add extitle, extpye, bodypart, summar, video_id into the database from front end form, will add picture to s3 bucket
app.post('/exercise', upload.single('imgfile'), async (req, res) => {
  try {
    const sql = `INSERT INTO exercises (extitle, extype, bodypart, summary, videoid) VALUES (?, ?, ?, ?, ?)`;

    // Using mysql2's execute for prepared statements
    const [insertResult] = await database.execute(sql, [
      req.body.extitle,
      req.body.extype,
      req.body.bodypart,
      req.body.summary,
      req.body.videoid,
    ]);

    const newId = insertResult.insertId;
    let imgFileName = `${newId}.jpeg`;

    const fileBuffer = req.file.buffer;

    // Get the original width and height of the image
    // const { width, height } = await sharp(fileBuffer).metadata();

    // Calculate the new dimensions by halving both width and height
    const newWidth = 352;
    const newHeight = 224;

    // Convert and resize the image using sharp
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: newWidth, height: newHeight })
      .jpeg({ quality: 100 })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imgFileName,
      Body: resizedImageBuffer,
    };
    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      console.log('Object successfully uploaded to S3');
    } catch (error) {
      console.error('Error uploading object to S3:', error);
    }

    return res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

app.get('/exercise/:category', async (req, res) => {
  const bodyPartArray = ['hand', 'wrist', 'elbow', 'shoulder'];
  const exerciseTypeArray = ['aarom', 'arom', 'prom', 'resistance', 'stretch'];
  const category = req.params.category;

  try {
    let sql;
    let queryParameters = [];

    // Handle fetching all exercises
    if (category === 'all') {
      sql = `SELECT * FROM exercises ORDER BY extitle`;
    } else if (
      bodyPartArray.includes(category) ||
      exerciseTypeArray.includes(category)
    ) {
      // Determine the SQL query based on the category type
      sql = `SELECT * FROM exercises WHERE ${bodyPartArray.includes(category) ? 'bodypart' : 'extype'} = ? ORDER BY extitle`;
      queryParameters = [category];
    } else {
      // If category does not match any known category, return an error
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Execute the determined SQL query
    const [rows] = await database.execute(sql, queryParameters);
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete request
app.delete('/exercise/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Delete the associated image from the S3 bucket
    const imageFileName = `${id}.jpg`;
    const params = {
      Bucket: bucketName,
      Key: imageFileName,
    };

    await s3.send(new DeleteObjectCommand(params));
    console.log(`Object ${imageFileName} successfully deleted from S3`);

    // Delete the record from the database
    const sqlDelete = `DELETE FROM exercises WHERE id = ?`;
    await database.execute(sqlDelete, [id]);
    console.log(
      `Exercise with ID ${id} successfully deleted from the database`,
    );

    res.json({
      status: 200,
      success: true,
      message: 'Exercise deleted successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({
      status: 400,
      success: false,
      message: 'Failed to delete exercise',
    });
  }
});

//edit (patch) database (text)

app.patch('/exercise/:id', upload.none(), async (req, res) => {
  const id = req.params.id;

  try {
    // Update videoid if provided
    if (req.body.videoid) {
      await database.execute('UPDATE exercises SET videoid = ? WHERE id = ?', [
        req.body.videoid,
        id,
      ]);
    }

    // Update extitle if provided
    if (req.body.extitle) {
      await database.execute('UPDATE exercises SET extitle = ? WHERE id = ?', [
        req.body.extitle,
        id,
      ]);
    }

    // Update summary if provided
    if (req.body.summary) {
      await database.execute('UPDATE exercises SET summary = ? WHERE id = ?', [
        req.body.summary,
        id,
      ]);
    }

    // Update bodypart if provided
    if (req.body.bodypart) {
      await database.execute('UPDATE exercises SET bodypart = ? WHERE id = ?', [
        req.body.bodypart,
        id,
      ]);
    }

    // Update extype if provided
    if (req.body.extype) {
      await database.execute('UPDATE exercises SET extype = ? WHERE id = ?', [
        req.body.extype,
        id,
      ]);
    }

    console.log('Update successful');
    res.json({
      status: 200,
      success: true,
      message: 'Exercise updated successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({
      status: 400,
      success: false,
      message: 'Failed to update exercise',
    });
  }
});

//edit image path

app.patch('/exercise/image/:id', upload.single('imgfile'), async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Use the ID to name the image file for S3
    const imgFileName = `${id}.jpeg`;

    // Process the image with Sharp
    const fileBuffer = req.file.buffer;

    // Get the original width and height of the image
    //const { width, height } = await sharp(fileBuffer).metadata();

    // Calculate the new dimensions by halving both width and height
    const newWidth = 352;
    const newHeight = 224;

    // Convert and resize the image using sharp
    const resizedImageBuffer = await sharp(fileBuffer)
      .resize({ width: newWidth, height: newHeight })
      .jpeg({ quality: 100 })
      .toBuffer();

    // Delete existing image from S3 (if any)
    try {
      await s3.send(
        new DeleteObjectCommand({ Bucket: bucketName, Key: imgFileName }),
      );
      console.log(`Existing image ${imgFileName} deleted from S3`);
    } catch (deleteError) {
      console.error('Error deleting existing object from S3:', deleteError);
      return;
    }

    // Upload the new image to S3
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: imgFileName,
          Body: resizedImageBuffer,
        }),
      );
      console.log(`New image ${imgFileName} uploaded to S3`);
    } catch (uploadError) {
      console.error('Error uploading new object to S3:', uploadError);
      return res.status(500).json({ error: 'Failed to upload image to S3' });
    }

    return res.json({
      status: 200,
      success: true,
      message: 'Image updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
});
