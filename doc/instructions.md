# replicar el proyecto nextjs dockerized 

# instalar prisma
    npm install @prisma/client
    npm install -D prisma
    npm install -D ts-node

# Inicializar Prisma:
    npx prisma init o npx prisma init --datasource-provider postgresql

# Mover schema.prisma 
    a tu estructura src/db/ y eliminar la carpeta prisma generada inicialmente

# Configurar Postgres 
    En .env define la conexión a tu Postgres local o remoto (puede ser Docker si quieres reproducible):

    DATABASE_URL="postgresql://user:password@localhost:5432/mycruddb?schema=public"

# Configurar schema.prisma (En src/db/schema.prisma):
    Nota: si encuentras el output lleno ( output   = "../src/generated/prisma" ), eliminar esa linea
  

# Scafolding
    crear archivos y carpetas relacionados a prisma

        src/
        ├─ app/           # App Router (UI y API)
        ├─ db/            # Infraestructura de base de datos
        │   ├─ schema.prisma
        │   ├─ migrations/
        │   └─ seed.ts
        ├─ lib/           # Utilidades y clientes compartidos
        │   ├─ prisma.ts
        │   ├─ auth.ts
        │   └─ ...
        ├─ services/      # Lógica de negocio
        └─ ...

src/db/schema.prisma
src/db/migrations/    # se generará al correr migrate
src/db/seed.ts        # opcional, lo creas tú


# se crea un tsconfig.node.json 
    para no generar conflicto con el tsc de Next

# se installa ts-node typescript (confirmar si es necesario en el futuro)
    npm install --save-dev ts-node typescript

# Configurar package.json para que Prisma sepa dónde está el schema 

    {
    "prisma": {
        "schema": "src/db/schema.prisma"
    },
    }

    Luego hay que investigar como usar prisma config pues prisma en el package.json estara deprecado
    https://www.prisma.io/docs/orm/reference/prisma-config-reference


# Configurar package.json para tener comandos mas practicos
    incluyendo el compilador de ts de node para que no haga conflicto con el compilador de Next
    
    {
    ...
    "scripts": {
        "db:migrate": "prisma migrate dev --name init",
        "db:generate": "prisma generate",
        "db:studio": "prisma studio",
        "db:seed": "npm run tsc:node && node dist/seed.js",
        "tsc:node": "tsc --project tsconfig.node.json"
    }
    ...
    }


# Generamos el cliente Prisma

    npm run db:generate

# Migramos (o actualizamos) lo que tenemos en nuestro schema.prisma a nuestra BD
    npm run db:migrate


# para ver prisma studio, un UI web para visualizar el contenido de las tablas
    npx prisma studio


 


