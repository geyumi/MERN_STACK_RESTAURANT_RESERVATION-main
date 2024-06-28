import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "RESERVATIONS",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log(`Some error occured while connecing to database: ${err}`);
    });
};


//PORT = 4000

//MONGO_URI = mongodb+srv://geyumisrisara:geyumisrisara@cluster0.melp4yz.mongodb.net/?retryWrites=true