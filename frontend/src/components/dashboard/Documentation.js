import { Button, Card, CardActions, CardContent, Link, Typography } from "@mui/material";


export default function Documentation(){
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Accessing our API
                </Typography>
                <Link href="#" sx={{ mb: 1.5 }} variant="h5" underline="none">
                Documentation
                </Link>
                <Typography variant="body2">
                Read more about the API and available methods.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}