import { Box, CssBaseline, Grid, Tab, Tabs } from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import React, { useState } from "react";

import AudioAnalysisComponent from "../audio/AudioAnalysis";
import SidebarNav from "../base/SidebarNav";
import VideoAnalysisComponent from "../video/VideoAnalysis";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const defaultTheme = createTheme();

function Analysis() {
  const [selectedModel, setSelectedModel] = useState("face");

  const handleTabChange = (event, newValue) => {
    setSelectedModel(newValue);
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <SidebarNav />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Grid
                  sx={{ mt: 3 }}
                  container
                  rowSpacing={4}
                  columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}
                  justifyContent={"center"}
                >
                <Tabs value={selectedModel} onChange={handleTabChange} centered>
                  <Tab label="Face" value="face" />
                  <Tab label="Speech" value="burst" />
                  <Tab label="Prosody" value="prosody" />
                </Tabs>
              </Grid>
              <Box>
                {selectedModel === "face" && <VideoAnalysisComponent />}
                {(selectedModel === "burst" || selectedModel === "prosody") && <AudioAnalysisComponent selectedModel={selectedModel} />}
              </Box>
            </Box>
        </Box>
      </ThemeProvider>
  );
}

export default Analysis;
