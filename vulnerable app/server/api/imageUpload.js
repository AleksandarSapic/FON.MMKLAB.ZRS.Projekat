const axios = require('axios');

const imageUpload = async (req, res) => {
    const url = req.get('Location');

    if (url) {
        try {
            const response = await axios.get(url, { maxRedirects: 0 });
            // ...
            res.status(200).json({ message: 'Updated successfully' });
        } catch (error) {
            console.log("Error", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request' });
    }
}

module.exports = imageUpload;