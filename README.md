[TOC]

# Endpoint: /users

## Tworzenie użytkownika (POST)

**URL:** ```/users```

**Body:**

```
body: {
	name: String,
	email: String,
	password: String
}
```

**Responses:**

- ```status: 201 - message: { user, token }```
- ```status: 400 - message: { error }```

## Logowanie użytkownika (POST)

**URL:** ```/users/login```

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

**URL:** ```/rootcollections/:id```

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

## Pobranie main collections należące do konkretnej rootcollection użytkownika (GET)

**URL:** ```/rootcollections/collections/main/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { collections }```
- ```status: 400 - message: { error }```

## Stworzenie nowej rootcollection użytkownika (POST)

**URL:** ```/rootcollections```

**Auth:** Bearer Token

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

## Pobranie collection należącej do użytkownika (GET)

**URL:** ```/collections/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 201 - message: { collection }```
- ```status: 400 - message: { error }```

## Pobranie wszystkich item należących do collection użytkownika (GET)

**URL:** ```/collections/items/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 400 - message: { error }```
- ```status: 201 - message: { items }```

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

# Endpoint: /items

## Stworzenie nowego item użytkownika (POST)

**URL:** ```/items```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String,
	parent_collection: ObjectID
}
```

**Responses:**

- ```status: 400 - message: { error: 'Can't find collection by given id' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { item }```

## Update item użytkownika (PATCH)

**URL:** ```/items/:id```

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
- ```status: 201 - message: { item }```

## Usunięcie item użytkownika (DELETE)

**URL:** ```/items/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 400 - message: { error: 'Can't find item for delete' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { item }```

# Endpoint: /attributes

## Stworzenie nowego attribute użytkownika (POST)

**URL:** ```/attributes```

**Auth:** Bearer Token

**Body:**

```
body: {
	name: String,
	parent_collection: ObjectID
}
```

**Responses:**

- ```status: 400 - message: { error: 'Can't find collection by given id' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { attribute }```

## Update attribute użytkowanika (PATCH)

**URL:** ```/attributes/:id```

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
- ```status: 201 - message: { attribute }```

## Usunięcie attribute użytkownika (DELETE)

**URL:** ```/attributes/:id```

**Auth:** Bearer Token

**Responses:**

- ```status: 400 - message: { error: 'Can't find attribute for delete' }```
- ```status: 400 - message: { error }```
- ```status: 201 - message: { attribute }```

# Endpoint /values

## Stworzenie nowego value użytkownika (POST)

**URL:** ```/values```

**Auth:** Bearer Token

**Body:**

```
body: {
	value: String,
	attribute: ObjectID
	item: ObjectID
}
```

**Responses:**

- ```status: 400 - message { error: 'Can't find attribute by given id' }```
- ```status: 400 - message { error: 'Can't find item by given id' }```
- ```status: 400 - message { error: 'Given attribute have this value' }```
- ```status: 400 - message { error }```
- ```status: 201 - message { value }```

## Update value użytkownika (PATCH)

**URL:** ```/values/:id```

**Auth:** Bearer Token

**Body:**

```
body: {
	removeItem: ObjectID,
	addItem: ObjectID
}
```

**Responses:**

- ```status: 400 - message { error: 'Can't find item removed from value' }```
- ```status: 400 - message { error: 'Can't find item added to value' }```
- ```status: 400 - message { error: 'Added item have value belong to given value attribute' }```
- ```status: 400 - message { error }```
- ```status: 201 - message { value }```

