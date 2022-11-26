# Endpoint: /users

## Tworzenie użytkownika (POST)

**URL:** ```/users```

### Body:

```
body: {
	name: String,
	email: String,
	password: String
}
```

### Responses:

- ```status: 201 - message: { user, token }```
- ```status: 400 - message: { error }```

## Logowanie użytkownika (POST)

### **URL:** ```/users/login```

**Body:**

```
body: {
	email: String,
	password: String
}
```

**Responses:**

- ```status: 201 - message: { user, token }```
- ```status: 400 - message: { error }```

## Wylogowywanie użytkownika (POST)

**URL:** ```/users/logout```

**Auth:** Bearer Token

**Responses:** 

- ```status: 201 - message: { none }```
- ```status: 500 - message: { error }```

## Update użytkownika (PATCH)

**URL:** ```/users/me```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String,
	email: String,
	password: String
}
```

**Responses:**

- ```status: 400 - message: { error: 'Invalid updates' }```
- ```status: 500 - message: { error }```
- ```status: 201 - message: { user }```

## Usuwanie użytkownika (DELETE)

**URL:** ```/users/me```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { user }```
- ```status: 400 - message: { error }```

# Endpoint: /rootcollections

## Pobranie wszystkich rootcollections użytkownika (GET)

**URL:** ```/rootcollections```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { rootcollections }```
- ```status: 400 - message: { error }```

## Pobranie konkretnej rootcollection użytkownika (GET)

**URL: ** ```/rootcollections/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { rootcollection }```
- ```status: 400 - message: { error }```

## Pobranie collections należące do konkretnej rootcollection użytkownika (GET)

**URL:** ```/rootcollections/collections/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { collections }```
- ```status: 400 - message: { error }```

## Stworzenie nowej rootcollection użytkownika (POST)

**URL: ** ```/rootcollections```

**Auth: ** Bearer Token

**Body:**

```
body: {
	name: String
}
```

**Responses:**

- ```status: 201 - message: { rootcollection }```
- ```status: 400 - message: { error }```

## Update rootcollection użytkownika (PATCH)

**URL:** ```/rootcollections/:id```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String
}
```

**Responses:**

- ```status: 201 - message: { rootcollection }```
- ```status: 500 - message: { error }```

## Usunięcie rootcollection użytkownika (DELETE)

**URL:** ```/rootcollections/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { rootcollection }```
- ```status: 400 - message: { error }```

# Endpoint: /collections

## Stworzenie nowej collection użytkownika (POST)

**URL:** ```/collection```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String,
	rootcollection: ObjectID,
	parent: ObjectID // optional, default: null
}
```

**Responses:**

- ```status: 400 - message: { error: 'Can't find rootcollection by given id' }```
- ```status: 400 - message: { error: 'Can't find parent collection by given id' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { collection }```

## Update collection użytkownika (PATCH)

**URL:** ```/collection/:id```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String
}
```

**Responses:**

- ```status: 400 - message: { error: 'Invalid updates' }```
- ```status: 500 - message: { error }```
- ```status: 201 - message: { collection }```

## Usunięcie collection użytkownika (DELETE)

**URL:** ```/collection/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 400 - message: { error: 'Can't find collection for delete' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { collection }```