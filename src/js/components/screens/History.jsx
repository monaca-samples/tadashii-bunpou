import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import BottomNavigator from "js/components/BottomNavigator";
import Bar from "js/components/Bar";

const History = ({ changeTheme }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("history") === null) {
      let history = [];
      localStorage.setItem("history", JSON.stringify(history));
    }
    setHistory(JSON.parse(localStorage.getItem("history")));
  }, []);

  const onDeleteHistory = () => {
    localStorage.clear();
    setHistory([]);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCopy = (text) => {
    setOpenSnackbar(true);
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      <Bar changeTheme={changeTheme} />
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Snackbar
            open={openSnackbar}
            onClose={() => setOpenSnackbar(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
          <Typography variant="h5" gutterBottom>
            Correction History
          </Typography>
          <Container>
            {history.map((correction, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: 2,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, wordWrap: "break-word" }}>
                    <Typography>Input sentence:</Typography>
                    <Typography>{correction.text}</Typography>
                    <Typography>Corrected sentence:</Typography>
                    <Typography>{correction.fixedText}</Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container justifyContent="flex-end">
                      <Button
                        endIcon={<ContentCopyIcon />}
                        onClick={() => handleCopy(correction.fixedText)}
                      >
                        Copy correction
                      </Button>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Container>
          { history.length === 0 ?
            <></>
            :
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
              onClick={onDeleteHistory}
            >
              Delete History
            </Button>
          }
        </Box>
      </Container>
      <BottomNavigator />
    </Box>
  );
};

export default History;
