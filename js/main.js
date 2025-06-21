// const myImage = document.querySelector("#my_image");
// const originalImageContainer = document.querySelector("#original_image_container");
// const compressedImageContainer = document.querySelector("#compressed_image_container");

// myImage.addEventListener("change", (evt) => {
//     const image = evt.target.files[0];

//     const reader = new FileReader();
//     reader.onload = () => {
//         const newImage = new Image();
//         newImage.src = reader.result;
//         newImage.onload = () => {
//             const canvas = document.createElement('canvas');
//             canvas.height = newImage.height;
//             canvas.width = newImage.width;
//             const ctx = canvas.getContext('2d');

//             newImage.width = 150;
//             originalImageContainer.appendChild(newImage);

//             ctx.drawImage(newImage, 0, 0);

//             const newUrl = canvas.toDataURL('image/jpeg', 0.5);

//             compressedImageContainer.innerHTML = `<img src="${newUrl}" width="150" onclick="downloadImage(event)">`;
//         };

//     };
//     reader.readAsDataURL(image);
// });

// const downloadImage = (evt) => {
//     const a = document.createElement('a');
//     a.download = 'compressed_image.jpeg';
//     a.href = evt.target.src;
//     a.target = '_blank';
//     a.click();
// };


//both png  n jpeg 




const dropArea = document.querySelector("#drop_area"); // The area where users can drag and drop the image
const originalImageContainer = document.querySelector("#original_image_container");
const compressedImageContainer = document.querySelector("#compressed_image_container");
const myImageInput = document.querySelector("#my_image"); // The file input for selecting files

// Prevent default behavior for dragover and drop events
dropArea.addEventListener("dragover", (evt) => {
    evt.preventDefault(); // Prevent the default behavior to allow dropping
    dropArea.classList.add('dragging'); // Optional: Add a visual effect when dragging over
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove('dragging'); // Remove visual effect when drag leaves
});

dropArea.addEventListener("drop", (evt) => {
    evt.preventDefault(); // Prevent the default behavior (e.g., opening the file)
    dropArea.classList.remove('dragging'); // Remove visual effect when drop occurs

    const image = evt.dataTransfer.files[0]; // Get the dropped file
    handleImage(image);
});

// File input change event listener
myImageInput.addEventListener("change", (evt) => {
    const image = evt.target.files[0]; // Get the selected file
    handleImage(image);
});

// Handle the image file processing
const handleImage = (image) => {
    const fileType = image.type; // Get the file MIME type

    const reader = new FileReader();
    reader.onload = () => {
        const newImage = new Image();
        newImage.src = reader.result;
        newImage.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.height = newImage.height;
            canvas.width = newImage.width;
            const ctx = canvas.getContext('2d');

            // Resize the image width to 150 while maintaining aspect ratio
            newImage.width = 150;
            originalImageContainer.appendChild(newImage);

            // Draw the image on the canvas
            ctx.drawImage(newImage, 0, 0);

            let newUrl;
            let fileExtension;

            // Auto-detect if the image is PNG or JPEG and compress accordingly
            if (fileType === "image/png") {
                // Compress as PNG (lossless compression)
                newUrl = canvas.toDataURL('image/png',0.8);
                fileExtension = 'png';
            } else if (fileType === "image/jpeg") {
                // Compress as JPEG (lossy compression)
                newUrl = canvas.toDataURL('image/jpeg', 0.8); // 50% quality
                fileExtension = 'jpeg';
                
            }

            // Display the compressed image
            compressedImageContainer.innerHTML = `<img src="${newUrl}" width="150" onclick="downloadImage(event, '${fileExtension}')">`;
        };
    };
    reader.readAsDataURL(image);

};

const downloadImage = (evt, fileExtension) => {
    const a = document.createElement('a');
    a.download = `compressed_image.${fileExtension}`; // Set file extension based on the image type (PNG or JPEG)
    a.href = evt.target.src;
    a.target = '_blank';
    a.click();
    
};




// function handleFile(file) {
//     // Clear previous images
//     const containers = document.querySelectorAll('#original_image_container, #compressed_image_container');
//     containers.forEach(container => container.innerHTML = '');
  
//     // Display original image
//     const reader = new FileReader();
//     reader.onload = function(e) {
//       // Create image wrapper with remove icon
//       const wrapper = document.createElement('div');
//       wrapper.className = 'image-wrapper';
      
//       const img = document.createElement('img');
//       img.src = e.target.result;
      
//       const removeIcon = document.createElement('div');
//       removeIcon.className = 'remove-icon';
//       removeIcon.innerHTML = `<svg><use href="#cross-icon"/></svg>`;
//       removeIcon.onclick = () => {
//         containers.forEach(container => container.innerHTML = '');
//         document.querySelector('#my_image').value = '';
//       };
      
//       wrapper.appendChild(img);
//       wrapper.appendChild(removeIcon);
//       document.getElementById('original_image_container').appendChild(wrapper);
  
//       // For demo purpose, we'll just copy the image to compressed container
//       // Replace this with your actual compression logic
//       const compressedWrapper = wrapper.cloneNode(true);
//       compressedWrapper.querySelector('.remove-icon').remove();
//       document.getElementById('compressed_image_container').appendChild(compressedWrapper);
//     };
//     reader.readAsDataURL(file);
//   }
  
//   // Update your existing event listeners to use handleFile
//   document.getElementById('my_image').addEventListener('change', function(e) {
//     handleFile(e.target.files[0]);
//   });
  
//   // Add this to your existing drop event handler where you get the file
//   // Replace the file handling part with: handleFile(file);