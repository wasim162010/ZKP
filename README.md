# ZKP

# This project is intended to demonstrate a simple way to implement the concept of login into the application using the Zero knowledge proof.

# ZKP.js : It is a file which contains the code to implement login using the zero knowledge proof.

# How it is implemented : 
    a) As a part of registration process, user has been assigned a random number which serves as a password for it. In the backend, the private key is encrypted by using the password and the encrypted value is saved in the data storage[will reside on client's memory],and pub;ic key will be stored in server side.
    b) For the login part, the user enters the password and it is used in backend to fetch the encrypted private key value from the data storage and is decrypted. After that, public key is generated using the private key and is matched with the public key stored in the server.  If it is successful, the login is successful and then the password,message and the signature is returned,else null value.
    c) The user does not need to share any other info to make system identify itself. 

