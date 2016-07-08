angular.module('sosbattery', [])


.controller('sosbatteryCtrl', function ($scope) {
        
   
   

    $scope.onRegister = function () {

        $('#myModal').modal('show');
      
    }

    var tamArray = [];
    var tam;

    $scope.onCPFchange = function () {
  
        tamArray.push($scope.cpf.length);
        tam = $scope.cpf.length;
      

        if ( (tam == 3 || tam == 7) && (tamArray[tamArray.length-1] >tamArray[tamArray.length-2]) ) 
            $scope.cpf += '.';

        else if (tam == 4 && $scope.cpf.charAt(3) != '.') {
            var p2 = $scope.cpf.slice(3);
            var p = $scope.cpf.slice(0, 3);
           
            $scope.cpf = p+'.'+p2;

        }

        else if (tam == 8 && $scope.cpf.charAt(7) != '.') {
            var p2 = $scope.cpf.slice(7);
            var p = $scope.cpf.slice(0, 7);

            $scope.cpf = p + '.' + p2;

        }
        
        else if (tam == 11 && (tamArray[tamArray.length - 1] > tamArray[tamArray.length - 2]))
            $scope.cpf += '-';

        else if (tam == 12 && $scope.cpf.charAt(11) != '-') {
            var p2 = $scope.cpf.slice(11);
            var p = $scope.cpf.slice(0, 11);

            $scope.cpf = p + '-' + p2;

        }
    }

    var telArray = [];
    var tel;

    $scope.onTelFocus = function () {

        if ($scope.tel == null)
            $scope.tel = '(';
    }

    $scope.onTelchange = function () {

        telArray.push($scope.tel.length);
        tel = $scope.tel.length;
       
        if ($scope.tel.charAt(0) != '(') {
            var p = $scope.tel;
            $scope.tel = '(' + p;
        }
         

        if ((tel == 3) && (telArray[telArray.length - 1] > telArray[telArray.length - 2]))
            $scope.tel += ") ";

        else if (tel == 4 && $scope.tel.charAt(3) != ')') {
            var p2 = $scope.tel.slice(3);
            var p = $scope.tel.slice(0, 3);

            $scope.tel = p + ") " + p2;

        }

        else if (tel > 4 && $scope.tel.charAt(4) !=' '  ) {
            var p2 = $scope.tel.slice(4);
            var p = $scope.tel.slice(0, 4);

            $scope.tel = p + ' ' + p2;

        }

        if ((tel == 9) && (telArray[telArray.length - 1] > telArray[telArray.length - 2]))
            $scope.tel += "-";

        else if (tel == 10 && $scope.tel.charAt(9) != '-') {
            var p2 = $scope.tel.slice(9);
            var p = $scope.tel.slice(0, 9);

            $scope.tel = p + "-" + p2;

        }

      
    }


    var cnpjArray = [];
    var cnpj;

    $scope.onCNPJchange = function () {

        cnpjArray.push($scope.cnpj.length);
        cnpj = $scope.cnpj.length;


        if ((cnpj == 2 || cnpj == 6) && (cnpjArray[cnpjArray.length - 1] > cnpjArray[cnpjArray.length - 2]))
            $scope.cnpj += '.';

        else if (cnpj == 3 && $scope.cnpj.charAt(2) != '.') {
            var p2 = $scope.cnpj.slice(2);
            var p = $scope.cnpj.slice(0, 2);

            $scope.cnpj = p + '.' + p2;

        }

        else if (cnpj == 7 && $scope.cnpj.charAt(6) != '.') {
            var p2 = $scope.cnpj.slice(6);
            var p = $scope.cnpj.slice(0, 6);

            $scope.cnpj = p + '.' + p2;

        }

        else if (cnpj == 10 && (cnpjArray[cnpjArray.cnpjArray - 1] > cnpjArray[cnpjArray.length - 2]))
            $scope.cnpj += '/';

        else if (cnpj == 11 && $scope.cnpj.charAt(10) != '/') {
            var p2 = $scope.cnpj.slice(10);
            var p = $scope.cnpj.slice(0, 10);

            $scope.cnpj = p + '/' + p2;

        }




        else if (cnpj == 15 && (cnpjArray[cnpjArray.cnpjArray - 1] > cnpjArray[cnpjArray.length - 2]))
            $scope.cnpj += '-';

        else if (cnpj == 16 && $scope.cnpj.charAt(15) != '-') {
            var p2 = $scope.cnpj.slice(15);
            var p = $scope.cnpj.slice(0, 15);

            $scope.cnpj = p + '-' + p2;

        }
    }

    $scope.registrar = function () {
       
      

        if ($scope.nome == null || $scope.email == null || $scope.emailRepete == null || $scope.cpf == null ||
            $scope.tel == null || $scope.empresa == null || $scope.cnpj == null) {

            $scope.titulo = "Atenção";
            $scope.mensagem = "Um ou mais campos não foram preenchidos";
            $('#myModal2').modal('show');

        }
        else if ($scope.tel.length < 14) {
            $scope.titulo = "Atenção";
            $scope.mensagem = "Número de Telefone inválido";
            $('#myModal2').modal('show');
        }

        else if (!$scope.email.includes('@') || !$scope.email.includes('.com') ) {
            $scope.titulo = "Atenção";
            $scope.mensagem = "E-mail inválido";
            $('#myModal2').modal('show');
        }

        else if ($scope.email.localeCompare($scope.emailRepete) != 0) {
            $scope.titulo = "Atenção";
            $scope.mensagem = "E-mails não conferem";
            $('#myModal2').modal('show');
        }

        else if ($scope.cpf.length != 14) {
            $scope.titulo = "Atenção";
            $scope.mensagem = "Número de CPF inválido";
            $('#myModal2').modal('show');
        }

        else if ($scope.cnpj.length != 18) {
            $scope.titulo = "Atenção";
            $scope.mensagem = "Número de CNPJ inválido";
            $('#myModal2').modal('show');
        }

        else {
            waitingDialog.show('Cadastrando...', { progressType: 'success' });
            $scope.titulo = "Obrigado!";
            $scope.mensagem = "Seu cadastro foi recebido com sucesso!";

            $.ajax({
                url: 'mail_handler.php',
                data: {
                    nome: $scope.nome,
                    email: $scope.email,
                    cpf: $scope.cpf,
                    tel: $scope.tel,
                    empresa: $scope.empresa,
                    cnpj: $scope.cnpj
                },
                type: 'POST',
                success: function (output) {
                  
                    waitingDialog.hide();
                    $('#myModal2').modal('show');
                }
            });

            $('#myModal').modal('hide');

        }


       

    }

    

});
