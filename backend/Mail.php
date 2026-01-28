<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

class Mail
{

    private $mail;

    public function __construct()
    {
        $this->mail = new PHPMailer(true);
        $this->mail->setLanguage('es');
        $this->serverSettings();

    }

    private function serverSettings(): void
    {
        //Server settings
        $this->mail->SMTPDebug  = SMTP::DEBUG_SERVER;                     //Enable verbose debug output
        $this->mail->isSMTP();                                            //Send using SMTP
        $this->mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
        $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $this->mail->Username   = 'hectorvenalvarez@gmail.com';           //SMTP username
        $this->mail->Password   = 'jzsl zetr xavq xtti';                  //SMTP password
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $this->mail->Port       = 465;

    }

    private function sendMail(): string
    {
        try {
            $this->mail->send();
            return 'Mensaje enviado';
        } catch (Exception $e) {
            return 'El mensaje no pudo ser enviado. Error: ' . $e->getMessage();
        }
        
    }

    public function makeMail(
        string $body, 
        string $subject, 
        string $recipient, 
        string $name_recipient, 
        string $origin, 
        string $name_origin
        ): string   {
        $this->mail->clearAddresses();
        $this->mail->clearAttachments();

        $this->mail->isHTML(true);                                  //Set email format to HTML
        $this->mail->Subject = $subject;
        $this->mail->Body    = $body;
        $this->mail->AltBody = strip_tags($body);

        // Origen
        $this->mail->setFrom($origin, $name_origin);

        // Destinatario
        $this->mail->addAddress($recipient, $name_recipient);   
        
        return $this->sendMail();

    }

}

