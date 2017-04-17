# Modulo de login 

## Endpoints

### Post @ /login

endpoint publico para obtener el JWT como credencial de las rutas privadas

**recibe:**

```javascript
{
	"username": "user",
	"password": "user"
}
```

### Post @ /users

endpoint privado para crear un nuevo usuario

**recibe:**

```javascript
 {
   	"username": "user",
   	"password": "user",
   	"roles": [{
   		"id": 1,
   		"authority": "ROLE_ADMIN"
   	}]
   } 
```


## Como loguearse

- Usar usuario en memoria ( username: admin, password: admin )
- Crear un usuario con el endpoint

## Como inicializar la base de datos

```sql
INSERT INTO authorities VALUES
  (1, 'ROLE_ADMIN'),
  (2, 'ROLE_USER');
```

## Como usar el JWT

**Agregar al header de todas las request sobre rutas privadas:**

```javascript
Authorization:Bearer xxx
```

Donde xxx es el token

## Consideraciones

- Parametrizar la duracion del token y secreto en net.folderit.security >> TokenAuthenticationService
- No se esta considerando el comportamiento del refresh token