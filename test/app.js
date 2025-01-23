const mime = require('mime-types');

// Function to fetch the image and convert it to Data URL
async function urlToDataUrl(imageUrl) {
	try {
		// Fetch the image from the URL
		const response = await fetch(imageUrl);

		if (!response.ok) {
			throw new Error('Image not found or unable to fetch');
		}

		// Get the image as a binary array buffer
		const arrayBuffer = await response.arrayBuffer();

		// Convert array buffer to a Buffer
		const imageBuffer = Buffer.from(arrayBuffer);

		// Get the MIME type of the image
		const mimeType = mime.lookup(imageUrl) || 'image/png'; // Default to 'image/png'

		// Convert image buffer to Base64 string
		const base64Image = imageBuffer.toString('base64');

		// Return the Data URL with the MIME type
		return `data:${mimeType};base64,${base64Image}`;
	} catch (error) {
		console.error('Error fetching or processing the image:', error);
		throw error;
	}
}

// Example usage:
const imageUrl =
	'https://sigara.kiev.ua/cache/product_big/data/odnorazki/Ibar/ibar-smart-pod-carbon/xibar-smart-pod.webp.pagespeed.ic.G7SZ2wEw3m.webp';

urlToDataUrl(imageUrl)
	.then((dataUrl) => {
		console.log('Data URL:', dataUrl);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
