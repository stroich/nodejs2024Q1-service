# Home Library Service

# Getting Started

1. Install Node.js

2. Clone the repository:

```
git clone https://github.com/stroich/nodejs2024Q1-service.git
```

3. Install the dependencies

```
npm install
```

4. Create .env

```
PORT=4000

CRYPT_SALT=10
JWT_SECRET_KEY=secret123123
JWT_SECRET_REFRESH_KEY=secret123123
TOKEN_EXPIRE_TIME=1h
TOKEN_REFRESH_EXPIRE_TIME=24h
```

5. Start the server

```
npm run start:dev
```

# Technologies

- Language: TypeScript
- Frameworks/Libraries: Node.js 20 LTS, dotenv, cross-env, uuid, Nest.js
- Development Tools: eslint, prettier, webpack, nodemon
- Testing: Jest

# API endpoints

The API has the following endpoints:

### /user

**- POST: /user**

1. Data Params

```typescript
{
  login: string;
  password: string;
}
```

2. Success Response:

Code: 201 CREATED <br />
Content:

```json
{
  "id": "68911d03-f942-4218-a462-cc53c91b56ec",
  "login": "username",
  "version": 1,
  "createdAt": 1710159657560,
  "updatedAt": 1710159657560
}
```

**- PUT: /user/:id**

1. Data Params

```typescript
{
  oldPassword: string;
  newPassword: string;
}
```

2. Success Response:

Code: 200 <br />
Content:

```json
{
  "id": "68911d03-f942-4218-a462-cc53c91b56ec",
  "login": "username",
  "version": 1,
  "createdAt": 1710159657560,
  "updatedAt": 1710159657560
}
```

| Method | Endpoint  |                         Description |
| ------ | :-------: | ----------------------------------: |
| GET    |   /user   | Get all the users from the database |
| GET    | /user/:id |             Get a single user by ID |
| POST   |   /user   |   Create a new user in the database |
| PUT    | /user/:id |                 Update a user by ID |
| DELETE | /user/:id |                 Delete a user by ID |

### /track

**- POST: /track**

1. Data Params

```typescript
{
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;
}
```

2. Success Response:

Code: 201 CREATED <br />
Content:

```json
{
  "id": "f9798ae3-d19a-4f05-b622-fc7fdf60526f",
  "name": "Track",
  "artistId": null,
  "albumId": null,
  "duration": 335
}
```

**- PUT: /track/:id**

1. Data Params

```typescript
{
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;
}
```

2. Success Response:

Code: 200 <br />
Content:

```json
{
  "id": "f9798ae3-d19a-4f05-b622-fc7fdf60526f",
  "name": "Track",
  "artistId": null,
  "albumId": null,
  "duration": 335
}
```

| Method |  Endpoint  |                          Description |
| ------ | :--------: | -----------------------------------: |
| GET    |   /track   | Get all the tracks from the database |
| GET    | /track/:id |             Get a single track by ID |
| POST   |   /track   |   Create a new track in the database |
| PUT    | /track/:id |                 Update a track by ID |
| DELETE | /track/:id |                 Delete a track by ID |

### /album

**- POST: /album**

1. Data Params

```typescript
{
  name: string;
  year: number;
  artistId: string | null;
}
```

2. Success Response:

Code: 201 CREATED <br />
Content:

```json
{
  "id": "f283369f-e324-401f-b6b2-a92e49c48572",
  "name": "ALBUM",
  "artistId": null,
  "year": 2022
}
```

**- PUT: /album/:id**

1. Data Params

```typescript
{
  name: string;
  year: number;
  artistId: string | null;
}
```

2. Success Response:

Code: 200 <br />
Content:

```json
{
  "id": "f283369f-e324-401f-b6b2-a92e49c48572",
  "name": "ALBUM",
  "artistId": null,
  "year": 2022
}
```

| Method |  Endpoint  |                          Description |
| ------ | :--------: | -----------------------------------: |
| GET    |   /album   | Get all the albums from the database |
| GET    | /album/:id |             Get a single album by ID |
| POST   |   /album   |   Create a new album in the database |
| PUT    | /album/:id |                 Update a album by ID |
| DELETE | /album/:id |                 Delete a album by ID |

### /artist

**- POST: /artist**

1. Data Params

```typescript
{
  name: string;
  grammy: boolean;
}
```

2. Success Response:

Code: 201 CREATED <br />
Content:

```json
{
  "id": "c52e70e4-ca22-456d-8e84-85c5f5b1f5ba",
  "name": "Michael Jackson",
  "grammy": true
}
```

**- PUT: /artist/:id**

1. Data Params

```typescript
{
  name: string;
  grammy: boolean;
}
```

2. Success Response:

Code: 200 <br />
Content:

```json
{
  "id": "c52e70e4-ca22-456d-8e84-85c5f5b1f5ba",
  "name": "Michael Jackson",
  "grammy": true
}
```

| Method |  Endpoint   |                           Description |
| ------ | :---------: | ------------------------------------: |
| GET    |   /artist   | Get all the artists from the database |
| GET    | /artist/:id |             Get a single artist by ID |
| POST   |   /artist   |   Create a new artist in the database |
| PUT    | /artist/:id |                 Update a artist by ID |
| DELETE | /artist/:id |                 Delete a artist by ID |

### /favs

| Method |     Endpoint     |                                 Description |
| ------ | :--------------: | ------------------------------------------: |
| GET    |      /favs       |     Get all the favorites from the database |
| GET    | /favs/track/:id  |     Get a single track from favorites by ID |
| GET    | /favs/album/:id  |     Get a single album from favorites by ID |
| GET    | /favs/artist/:id |    Get a single artist from favorites by ID |
| POST   | /favs/track/:id  |  Add new track to favorites in the database |
| POST   | /favs/album/:id  |  Add new album to favorites in the database |
| POST   | /favs/artist/:id | Add new artist to favorites in the database |
| DELETE | /favs/track/:id  |         Delete a track by ID from favorites |
| DELETE | /favs/album/:id  |         Delete a album by ID from favorites |
| DELETE | /favs/artist/:id |        Delete a artist by ID from favorites |

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
