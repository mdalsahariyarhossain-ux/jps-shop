import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <TextField
        variant="outlined"
        size="small"
        value={keyword}
        placeholder="Search products..."
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};

export default SearchBox;
