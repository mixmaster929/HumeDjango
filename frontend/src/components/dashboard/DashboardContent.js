import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";

// custom components
import APICard from "./AnalysisCard";
import Documentation from "./Documentation";


export default function Main() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" mb={3}>
              Explore our API
            </Typography>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 8 }}
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
              >
                <APICard
                  difference={12}
                  sx={{ height: '100%' }}
                  value="image"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
              >
                <APICard
                  difference={12}
                  sx={{ height: '100%' }}
                  value="video"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <Documentation />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
