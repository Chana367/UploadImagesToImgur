# UploadImagesToImgur

This script allows you to upload images to Imgur and export the resulting links in a .xlsx file.

## Usage

1. **Installation**

    Run the following command to install the necessary dependencies:

    ```
    npm install
    ```

2. **Prepare Images**

    Create an "img" folder in the project directory and add the images you want to upload to Imgur.

3. **JSON File**

    Create a JSON file containing information about the images. This file will be used by the script to match image names with Imgur URLs.

4. **Run the Script**

    Execute the script to upload the images to Imgur and export the links in a .xlsx file:

    ```
    node upload.js
    ```

## Notes

- Ensure you have Node.js installed on your system.
- You'll need an Imgur Client ID. Replace `'YOUR_CLIENT_ID'` in the `index.js` file with your actual Client ID.
