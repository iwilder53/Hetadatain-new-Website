<?php 

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['form_email'];

$basic_info = "Hello team Hetadatain ! I am $first_name  $last_name. " ."<br>". "Email : $email";

$message = $basic_info . "<br>" . $message; 
$message = wordwrap($message,70);
echo $message ;
mail("yashbgdi@gmail.com", "Hi! Someone just viewed a presentation", $message, $headers);
?>