<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size,
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

    require_once('PHPMailer_5.2.1/class.phpmailer.php');

    define('GUSER', 'noreply@sosbattery.com.br');	// <-- Insira aqui o seu GMail
    define('GPWD', '201620.14.26');		// <-- Insira aqui a senha do seu GMail

$titulo = "Dados ". $_POST['empresa'];

    //     $subject2 = "Copy of your form submission";
    $message = "<p>Nome:". $_POST['nome']. "<\p><p> E-mail: ". $_POST['email']. "<\p><p> CPF: ". $_POST['cpf'].
    "<\p><p> Telefone: ". $_POST['tel']. "<\p><p> Nome da Empresa: ". $_POST['empresa'].
    "<\p><p> CNPJ: ". $_POST['cnpj']. "<\p>" ;

$titulo2 = "Obrigado por se cadastrar no SOS Battery!";
 $message2 = "Em breve nossa equipe vai entrar em contato para definir os detalhes e concretizar nossa parceria.
  SerÃ¡ um prazer tÃª-lo(a) conosco!<br><br>Att, <br> Equipe SOS Battery";




function sendEmail($para, $titulo, $corpo) {

  try {
    $mail = new PHPMailer(true); //New instance, with exceptions enabled

    $mail->IsSMTP();                           // tell the class to use SMTP
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Port       = 465;                    // set the SMTP server port, geralmente porta 25 ou 587
    $mail->SMTPDebug = 0;
    $mail->Host = 'a2plcpnl0617.prod.iad2.secureserver.net';	// SMTP utilizado
    $mail->SMTPSecure = 'ssl';	// SSL REQUERIDO pelo GMail
    $mail->Username   = GUSER;     // SMTP server username
    $mail->Password   = GPWD;            // SMTP server password

    $mail->From       = GUSER; //De E-mail
    $mail->FromName   = "SOS Battery";  //De Nome

    $to = $para; //Para

    $mail->AddAddress($para);

    $mail->Subject  = $titulo; //Assunto

    $mail->IsHTML(true); // send as HTML

    $mail->Body = $corpo;

    $mail->Send();

  } catch (phpmailerException $e) {
    echo $e->errorMessage(); //retorno devolvido para o ajax caso erro
  }

}


sendEmail("rafaeladugin@sosbattery.com.br", $titulo1, $message);

sendEmail($_POST['email'],$titulo2 , $message2);



    ?>
