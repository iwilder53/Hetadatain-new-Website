
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_hetasite";

$headers =  'MIME-Version: 1.0' . "\r\n"; 
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}
// $first_name = $_POST['first_name'];
// $last_name = $_POST['last_name'];
// $email = $_POST['email'];
// $phone = $_POST['phone'];
// $message = $_POST['message'];

// //$message = wordwrap($message,70);
// echo $first_name;
// //mail("jayprmr27@gmail.com", "Hello! Enquiry from website ", $message, $headers);



// $sql = "INSERT INTO contact_us (first_name, last_name, email,phone,message)
// VALUES ('$first_name', '$last_name', '$email','$phone','$message')";

// if (mysqli_query($conn, $sql)) {
  // echo "New record created successfully";
// } else {
  // echo "Error: " . $sql . "<br>" . mysqli_error($conn);
// }

mysqli_close($conn);
?>