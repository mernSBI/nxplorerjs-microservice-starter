export const database = (mongoose: any) => {
  mongoose.connect(process.env.MONGO_URI, (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('DB Connected Successfully!');
    }
  });
};
