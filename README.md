# SvletKit and KeyCloak

## init a basic sveltekit projekt

```bash
npm init svelte@next
```

## local KeyCloak setup with docker

used the docker-compose.yaml from here https://github.com/keycloak/keycloak-containers/blob/main/docker-compose-examples/keycloak-mysql.yml

Make sure you have docker installed on your local machine, then run:
Then run Keycloak and mysql by entering:

```bash
docker-compose up -d
```

To stop keycloak and mysql run:

```bash
docker-compose down
```

note: you find the credentials for the keycloak admin in the docker-compose.yaml 
admin / Pa55w0rd

