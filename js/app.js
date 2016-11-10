$(document).ready(function(){
	//  funcion captura el valor de los formularios
	$('#boton_registrar').click(function(){
		var ingresado = document.getElementById('usuario').value;
		var password = document.getElementById('clave').value;
		var msj = ingresado +''+ password;
		DAO(ingresado,password);
		//document.getElementById('usuarios_registrados').innerHTML = msj; 
	});

	function DAO(usuario,clave){

		var db = openDatabase('sivDB','1.0','database for SIV app',5*1024*1024);
		db.transaction(function(tx){
			//tx.executeSql('DROP TABLE REGISTROS');
			tx.executeSql('CREATE TABLE IF NOT EXISTS REGISTROS (nombre CHAR(8) UNIQUE NOT NULL,contrasena CHAR(10) NOT NULL)');
		});
		var usuarioDAO = usuario;
		var claveDAO = clave;
		db.transaction(function(tx){
			tx.executeSql('INSERT INTO REGISTROS (nombre,contrasena) VALUES (?,?)',[usuarioDAO,claveDAO]);
			//SELECT 
			//INSERT 
			//UPDATE 
			//DELETE
		});
		//*********************
		var cl_ave ="1234";
		var consulta='SELECT * FROM REGISTROS WHERE contrasena ="'+cl_ave+'"';

		    db.transaction(function (tx) {
            tx.executeSql(consulta, [], function (tx, results) {
               var len = results.rows.length, i;
               if(len != 0){
               	 $('#usuarios_registrados').append('<h1> indices que coinciden'+len+'</h1>');
               }
               			
               for (i = 0; i < len; i++){
                  msj=results.rows.item(i).nombre+i+'<hr>';
                  $('#usuarios_registrados').append('<p>'+msj+'</p>');
                  //document.getElementById('usuarios_registrados').innerHTML += msj; 
               }
            },null);
         });	
		//********************
	};
	//********
	//prueba verbos irregulares autocompletar
	var verb =['d','r','e','a','m','e','d'];
	var verbo_probar=[];
	$('#prueba_verbos').append('<label> past :</label>');
	for (var i = 0; i < verb.length; i++) {
		if (i%2 === 0) {
			$('#prueba_verbos').append('<input id="'+i+verb[i]+'" class ="espacios_vacios" type="text" placeholder="?">');
		} else{
			$('#prueba_verbos').append(verb[i]);
		};
	};
	$('#boton_comparar').click(function(){
			//probar los valores de un formulario
	for (var i = 0; i < verb.length; i++) {
		if (i%2 === 0) {
			verbo_probar.push(document.getElementById(''+i+verb[i]+'').value);
		} else{
			verbo_probar.push(verb[i]);
		};
		
	};
	verb=verb.join('');
	
	console.log(verbo_probar.join(''));	
	if (verbo_probar === verb) {
		$('#resultado_comparacion').append('<h3>es correcto</h3>');
	} else{
		$('#resultado_comparacion').append('<h3>es incorrecto</h3>');
	};
	});

	
	//usar join para unir array
	//usar split separar array


});
   
