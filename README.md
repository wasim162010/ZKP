# ZKP

# This project is intended to demonstrate a simple way to implement the concept of login into the application using the Zero knowledge proof.It should be noted that it's a prod ready application but a sort of MVP to portray how we can implement ZKP and would require further refinement.

# ZKP.js : It is a file which contains the code to implement login using the zero knowledge proof.

# How it is implemented : 
    a) As a part of registration process, user has been assigned a random number which serves as a password for it. In the backend, the private key is encrypted by using the password and the encrypted value is saved in the data storage[will reside on client's memory],and pub;ic key will be stored in server side.
    b) For the login part, the user enters the password and it is used in backend to fetch the encrypted private key value from the data storage and is decrypted. After that, public key is generated using the private key and is matched with the public key stored in the server.  If it is successful, the login is successful and then the password,message and the signature is returned,else null value.
    c) The user does not need to share any other info to make system identify itself. 
    4) the [password, message, signature] returned, can be also used to authenticate user by below code :
        // load public key from PEM
        var publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        // base64-decode signature
        var signature = forge.util.decode64(signature64);
        // verify data with a public key
        // (defaults to RSASSA PKCS#1 v1.5)
        var md = forge.md.sha256.create();
        md.update(message, 'utf8');
          // verified is true/false
        var verified = publicKey.verify(md.digest().bytes(), signature);
      

# Libraries used : 1) node-forge for keys creation and management. 2) express-js : for a sample web app, 3) node-localstorage 4) nodemon

# Assumptions :for the ease, node-localstorage is used in order to store the key.But it's must not be used in the enhanced/prod application.It is just used in the sample/MVP application.

# Screenshots :
<img width="1683" alt="image" src="https://user-images.githubusercontent.com/47940538/176033182-70a53a0c-9999-479b-8095-5275aaa219ac.png">

<img width="1685" alt="image" src="https://user-images.githubusercontent.com/47940538/176033239-cebf0a9e-99eb-409e-9c39-632744f1c50b.png">

<img width="1675" alt="image" src="https://user-images.githubusercontent.com/47940538/176033366-541d83be-a4c4-49b5-9f60-d7ee51174c55.png">

<img width="1011" alt="image" src="https://user-images.githubusercontent.com/47940538/176033438-2d0a118d-b162-4d49-906b-e5ff6434bb68.png">

<img width="1695" alt="image" src="https://user-images.githubusercontent.com/47940538/176033500-b562b6fd-4198-46d3-951c-ab24cc82232a.png">

<img width="1695" alt="image" src="https://user-images.githubusercontent.com/47940538/176033573-3ffdbbb6-a4f9-4fcc-83a3-e7e972a1693a.png">
