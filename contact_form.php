<?php

$mail_to = "abdellah.ennajari.23@ump.ac.ma";

$name     = isset($_POST['name']) ? $_POST['name'] : '';
$email    = isset($_POST['email']) ? $_POST['email'] : '';
$phone    = isset($_POST['phone']) ? $_POST['phone'] : '';
$message  = isset($_POST['message']) ? $_POST['message'] : '';

$subject = "Contact Request From: " . $name;

$body   = "New Message From: " . $name . " <" . $email . ">\n\n";
$body   .= "----------------\n\n";
$body   .= "Name: " . $name . "\n\n";
$body   .= "Email: " . $email . "\n\n";
$body   .= "Phone: " . $phone . "\n\n";
$body   .= "Message: \n\n" . $message . "\n\n";

$headers  = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($mail_to, $subject, $body, $headers)) {
  echo "success";
} else {
  echo "error";
}
?>
