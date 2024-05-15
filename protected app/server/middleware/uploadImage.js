const uploadImage = (req, res, next) => {
    const url = req.get('Location');
    if (!url)
        return res.status(400).json({ error: 'Bad Request' });

    // URL schema
    const allowedSchemes = [
        'http:',
        'https:'
    ];

    // White list
    const allowedDomains = [
        'res.cloudinary.com',
        'docs.google.com'
    ];

    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Check if the request is attempting non HTTP request
    if (!allowedSchemes.includes(parsedUrl.protocol)) {
        console.log(`Unauthorized SSRF attempt with non-HTTP protocol: ${url}`);
        return res.status(403).json({ message: 'Unauthorized protocol' });
    }

    // Check if the hostname is in the list of trusted domains
    if (!allowedDomains.includes(hostname))
        return res.status(403).json({ message: 'Unauthorized domain' });

    next();
}

module.exports = uploadImage;