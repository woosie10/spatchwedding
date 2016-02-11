<?php

$errors = array(); // array to hold validation errors
$data = array(); // array to pass back data

// validate the variables ======================================================
if (empty($_POST['attending']))
$errors['attending'] = 'RSVP is required';
if (empty($_POST['name']))
$errors['name'] = 'Name is required';
if (empty($_POST['email']) OR $_POST['email']=='undefined')
$errors['email'] = 'Email is required';
if ($_POST['size']=='' AND $_POST['attending']=='Yes')
$errors['size'] = 'Party size is required';

// return a response ===========================================================
if ( ! empty($errors)) {
  // if there are items in our errors array, return those errors
  $data['success'] = false;
  $data['errors'] = $errors;
  $data['messageError'] = '';
  
} else {
  // if there are no errors, return a message
  $data['success'] = true;
  $data['messageSuccess'] = 'Your RSVP has been recieved, thank you';

  $email_to = "rsvp@spatchwedding.com";
  $email_subject = "RSVP";
  $attending = $_POST['attending']; // required
  $name = $_POST['name']; // required
  $email_from = $_POST['email']; // required
  $size = $_POST['size']; // required
  $additional = $_POST['additional'];
  $song1 = $_POST['song1'];
  $song2 = $_POST['song2'];
  $song3 = $_POST['song3'];
  $email_message = "RSVP details below.\n";
  $email_message .= "\nAttending: ".$attending."\n";
  $email_message .= "\nName: ".$name."\n";
  $email_message .= "Email: ".$email_from."\n";
  $email_message .= "Size: ".$size."\n";
  $email_message .= "Additional Comments: ".$additional."\n";
  $email_message .= "\nSong 1: ".$song1."\n";
  $email_message .= "Song 2: ".$song2."\n";
  $email_message .= "Song 3: ".$song3."\n";
  $headers = 'From: '.$email_from."\rn".
  'Reply-To: '.$email_from."\rn" .
  'X-Mailer: PHP/' . phpversion();
  @mail($email_to, $email_subject, $email_message, $headers);
  
  $myfile = fopen("log/emailLogFile.txt", "a") or die("Unable to open file");
  $txt =  "\nTimeStamp ".date("Y-m-d h:i:sa")."\n".
          "Name: ".$name."\n".
          "Email: ".$email_from."\n".
          "Attending: ".$attending."\n".
          "Size: ".$size."\n".
          "Additional Comments: ".$additional."\n".
          "Song 1: ".$song1."\n".
          "Song 2: ".$song2."\n".
          "Song 3: ".$song3."\n";
  fwrite($myfile, $txt);
  fclose($myfile);
}

// return all our data to an AJAX call

echo json_encode($data);

?>