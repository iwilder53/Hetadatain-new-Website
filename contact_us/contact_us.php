
<?php
$servername = "localhost";
$username = "heta_website";
$password = "website@123";
$dbname = "heta_website";

$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'From: Your name <jayprmr27@gmail>' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$msg = "First line of text\nSecond line of text";

// use wordwrap() if lines are longer than 70 characters
$msg = wordwrap($msg,70);

mail("jayprmr27@gmail.com", "My subject", $msg, $headers);

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$sql = "INSERT INTO contact_us (first_name, last_name, email,phone,message)
VALUES ('$first_name', '$last_name', '$email','$phone','$message')";

if (mysqli_query($conn, $sql)) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>