
<?php
error_reporting(0);
$servername = "localhost";
$username = "heta_website";
$password = "website@123";
$dbname = "heta_website";

$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['form_email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$basic_info = "Hello team Hetadatain ! I am $first_name  $last_name. " ."<br>". "Email : $email" ."<br>".  "Mobile : $phone ";

$message = $basic_info . "<br>" . $message; 
$message = wordwrap($message,70);
echo $message ;
mail("monikavarshe34@gmail.com", "Hello! Enquiry from website ", $message, $headers);

$sql = "INSERT INTO contact_us (first_name, last_name, email,phone,message)
VALUES ('$first_name', '$last_name', '$email','$phone','$message')";

if (mysqli_query($conn, $sql)) {
   echo "success";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>