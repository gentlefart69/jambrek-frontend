import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { BASE_API_URL, ENDPOINTS } from "../constants/apiConstants";
import "./AddNewBeltModal.css";
import client from "../lib/client";

const AddNewBeltModal = ({
  isShown = false,
  handleClose,
  update = false,
  selectedBelt,
}) => {
  const [beltData, setBeltData] = useState({
    name: "",
    category: "",
    color: "",
    type: "",
    price: "",
  });

  useEffect(() => {
    if (selectedBelt) {
      setBeltData(selectedBelt);
    }
  }, [selectedBelt]);

  const handleModalClose = () => {
    setBeltData({
      name: "",
      category: "",
      color: "",
      type: "",
      price: "",
    });
    handleClose();
  };

  const handleBeltData = (field, value) => {
    const newData = { ...beltData };
    newData[field] = value;
    setBeltData(newData);
  };

  const handleSubmit = async () => {
    if (update) {
      const path = `${BASE_API_URL}${ENDPOINTS.BELTS.BELT}`.replace(
        "{belt}",
        selectedBelt.id
      );
      fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...beltData, id: selectedBelt.id }),
      });
    } else {
      await client.createBelt(beltData);
    }

    handleModalClose();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const modalStyle = {
    display: "flex",
    flexFlow: "column nowrap",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: "background.paper",
    boxShadow: 24,
    padding: [20, 4, 20, 4],
  };

  return (
    <Modal
      open={isShown}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {update ? "Update belt" : "Add a new belt"}
        </Typography>

        <Input
          className="input-field"
          placeholder="Name"
          value={beltData.name}
          onChange={(event) => handleBeltData("name", event.target.value)}
        />
        <Input
          className="input-field"
          placeholder="Category"
          value={beltData.category}
          onChange={(event) => handleBeltData("category", event.target.value)}
        />
        <Input
          className="input-field"
          placeholder="Color"
          value={beltData.color}
          onChange={(event) => handleBeltData("color", event.target.value)}
        />
        <Input
          className="input-field"
          placeholder="Type"
          value={beltData.type}
          onChange={(event) => handleBeltData("type", event.target.value)}
        />
        <Input
          className="input-field"
          placeholder="Price"
          value={beltData.price}
          onChange={(event) => handleBeltData("price", event.target.value)}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
};

export default AddNewBeltModal;
