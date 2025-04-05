<?php
    if ($_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/"; // Create an "uploads" folder in your project
        $fileName = basename($_FILES["image"]["name"]);
        $filePath = $uploadDir . $fileName;
        
        // Move uploaded file to the "uploads" directory
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $filePath)) {
            echo "File uploaded successfully: " . $filePath;
        } else {
            echo "Error uploading file.";
        }
    } else {
        echo "No file uploaded or an error occurred.";
    }
//     if(isset($_POST["img"])){
// }
?>
