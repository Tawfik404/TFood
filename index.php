<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TFood</title>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>

    <div class="container-fluid">
        <form action="" method="post" enctype="multipart/form-data">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>Choose a food picture or take one below </h1>
                    <p>make sure the product in picture is exposed to enough light and not blurry</p>
                </div>
                <div class="col-12 text-center" >
                    <label for="img">
                        <span class="material-symbols-outlined" >
                            photo_library
                        </span>
                        
                    </label>
                        <input type="file" accept="image/*" id="img" name="up-img">
                        
                    <label for="camera">
                        <span class="material-symbols-outlined">
                            add_a_photo
                        </span>
                    </label>
                        <input type="file" accept="image/*" capture="camera" id="camera" name="cam-img">
                </div>
        </form>
        </div>
    </div>
    <?php
    if(isset($_FILES['up-img'])){
        echo $_FILES['up-img'];
    }
    ?>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>

</html>