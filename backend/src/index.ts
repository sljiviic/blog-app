import app from "./app";

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`Server running on port ${port}`);
});
