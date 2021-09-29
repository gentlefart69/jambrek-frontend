import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddNewBeltModal from "../components/AddNewBeltModal";
import { BASE_API_URL, BASE_URL, ENDPOINTS } from "../constants/apiConstants";
import "./Home.css";
import { useAuth } from "../components/Auth/auth";
import client from "../lib/client";
import { CardMedia } from "@mui/material";

const Home = () => {
  const auth = useAuth();
  const [belts, setBelts] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [selectedBelt, setSelectedBelt] = useState(null);

  const fetchAllBelts = async () => {
    const path = `${BASE_API_URL}${ENDPOINTS.BELTS.ALL}`;

    const data = await client.belts();
    setBelts(data);
  };

  useEffect(() => {
    fetchAllBelts();
  }, []);

  const handleShowModal = () => {
    setIsShown(true);
  };

  const handleCloseModal = () => {
    setShouldUpdate(false);
    setSelectedBelt(null);
    setIsShown(false);
  };

  const updateBelt = (belt) => {
    setShouldUpdate(true);
    setSelectedBelt(belt);
    setIsShown(true);
  };

  const deleteBelt = async (beltId) => {
    // Remove from state
    const oldBelts = [...belts];
    const newBelts = oldBelts.filter((belt) => belt.id !== beltId);
    setBelts(newBelts);

    await client.deleteBelt(beltId);
  };

  const renderBelt = (belt) => {
    return (
      <Card key={belt.id} className="belts__card" sx={{ minWidth: 275 }}>
        <CardMedia
          component="img"
          height="140"
          image={`${BASE_URL}/storage/${belt.image}`}
        />
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
          <Button onClick={() => updateBelt(belt)} size="small" variant="text">
            Edit
          </Button>
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
      CurrentUser: {JSON.stringify(auth.currentUser)}
      <div className="belts">
        {belts.length > 0 && belts.map((belt) => renderBelt(belt))}
      </div>
      <AddNewBeltModal
        isShown={isShown}
        handleClose={handleCloseModal}
        update={shouldUpdate}
        selectedBelt={selectedBelt}
      />
      <Fab
        onClick={handleShowModal}
        style={{ position: "fixed", bottom: 20, right: 20 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Home;
