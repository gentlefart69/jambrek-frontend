import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddNewBelt from "../components/AddNewBelt";
import "./Home.css";

const Home = () => {
  const [belts, setBelts] = useState([]);
  const [isNewBeltModalShown, setIsNewBeltModalShown] = useState(false);

  const fetchAllBelts = () => {
    fetch("http://localhost:8000/api/belts")
      .then((response) => response.json())
      .then((data) => setBelts(data));
  };

  useEffect(() => {
    fetchAllBelts();
  }, []);

  const showNewBeltModal = () => {
    setIsNewBeltModalShown(true);
  };

  const deleteBelt = (beltId) => {
    // Remove from state
    const oldBelts = [...belts];
    const newBelts = oldBelts.filter((belt) => belt.id !== beltId);
    setBelts(newBelts);

    // Remove from backend
    fetch(`http://localhost:8000/api/belts/${beltId}/delete`, {
      method: "DELETE",
    });
  };

  const renderBelt = (belt) => {
    return (
      <Card key={belt.id} className="belts__card" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {belt.name}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            {belt.category} - {belt.color}
          </Typography>
          <Typography variant="body2">{belt.type}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart ({belt.price})</Button>
          <Button
            onClick={() => deleteBelt(belt.id)}
            size="small"
            variant="text"
            color="error"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <div className="belts-wrapper">
      <h1>Ovde su kaisevi...</h1>
      <div className="belts">
        {belts.length > 0 && belts.map((belt) => renderBelt(belt))}
      </div>

      <Fab
        onClick={showNewBeltModal}
        style={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <AddNewBelt isShown={isNewBeltModalShown} />
    </div>
  );
};

export default Home;
